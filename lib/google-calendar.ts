export type CalendarCategory =
  | "giras"
  | "cursos"
  | "internalDevelopment"
  | "paidPartner"
  | "apometria"
  | "social"
  | "commemorative"
  | "noGira";

export type SiteCalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  category: CalendarCategory;
  isOpen: boolean;
  description: string;
  location: string;
  guidance: string[];
  googleUrl: string;
};

type GoogleEvent = {
  id?: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  status?: string;
  start?: { date?: string; dateTime?: string };
  end?: { date?: string; dateTime?: string };
};

const encoder = new TextEncoder();

function base64Url(value: string | Uint8Array) {
  const bytes = typeof value === "string" ? encoder.encode(value) : value;
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function privateKeyBytes(pem: string) {
  const body = pem.replace(
    /-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g,
    "",
  );
  const binary = atob(body);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function createServiceAccountToken(email: string, privateKey: string) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(
    JSON.stringify({
      iss: email,
      scope: "https://www.googleapis.com/auth/calendar.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${payload}`;
  const key = await crypto.subtle.importKey(
    "pkcs8",
    privateKeyBytes(privateKey),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    encoder.encode(unsigned),
  );
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${base64Url(new Uint8Array(signature))}`,
    }),
  });
  if (!response.ok)
    throw new Error(
      `Não foi possível autenticar no Google (${response.status}).`,
    );
  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

function credentials() {
  const encoded = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;
  if (encoded) {
    const parsed = JSON.parse(atob(encoded)) as {
      client_email?: string;
      private_key?: string;
    };
    return { email: parsed.client_email, key: parsed.private_key };
  }
  return {
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };
}

function categoryFor(summary: string, description: string): CalendarCategory {
  const text = `${summary} ${description}`.toLocaleLowerCase("pt-BR");
  if (/\[sem gira\]|n[aã]o haver[aá] gira|sem gira/.test(text)) return "noGira";
  if (/curso sementes espirituais com prof\.? wagner borges/.test(text))
    return "paidPartner";
  if (
    /café com macumba|cafe com macumba|curso de umbanda (?:i|1)\b/.test(text)
  )
    return "internalDevelopment";
  if (/\[apometria\]|apometria/.test(text)) return "apometria";
  if (
    /\[social\]|hospital terapêutico|hospital terapeutico|projeto social|pão solidário|pao solidario|a vida continua|apoio ao luto|\bluto\b|firmando os trabalhos/.test(
      text,
    )
  )
    return "social";
  if (
    /\[curso\]|\[palestra\]|curso|palestra|workshop|estudo|desenvolvimento mediúnico|desenvolvimento mediunico|roda de conversa/.test(
      text,
    )
  )
    return "cursos";
  if (/\[gira\]|\bgira\b|cirurgia espiritual/.test(text)) return "giras";
  if (
    /\[data comemorativa\]|\bpost dia (?:de|da|do|dos|das)\b|\bdia (?:de|da|do|dos|das)\b|homenagem|aniversário|aniversario/.test(
      text,
    )
  )
    return "commemorative";
  return "cursos";
}

function cleanTitle(summary: string) {
  return summary
    .replace(
      /^\s*\[(gira|curso|palestra|apometria|social|data comemorativa|sem gira)\]\s*/i,
      "",
    )
    .trim();
}

function entityCelebrationDescription(title: string) {
  const normalized = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const celebrations: Array<[RegExp, string]> = [
    [
      /oxossi/,
      "Oxóssi representa a força das matas, o conhecimento, a fartura e o sustento. Saravá Oxóssi!",
    ],
    [
      /iemanja/,
      "Iemanjá representa o acolhimento, a proteção maternal e a força das águas do mar. Saravá Iemanjá!",
    ],
    [
      /ogum/,
      "Ogum representa a coragem, o trabalho, a proteção e a abertura dos caminhos. Saravá Ogum!",
    ],
    [
      /preto.?velho/,
      "Pretos-Velhos representam a ancestralidade, a humildade, a paciência e a caridade. Saravá Pretos-Velhos!",
    ],
    [
      /santa sara/,
      "Santa Sara Kali representa a fé, a proteção, a esperança e a devoção do povo cigano. Saravá Santa Sara Kali!",
    ],
    [
      /linha do oriente/,
      "A Linha do Oriente reúne forças de sabedoria, cura, equilíbrio e elevação espiritual. Saravá a Linha do Oriente!",
    ],
    [
      /nana/,
      "Nanã Buruquê representa a ancestralidade, a sabedoria, a maturidade e os ciclos da vida. Saravá Nanã Buruquê!",
    ],
    [
      /\bexu\b/,
      "Exu representa a guarda, a comunicação, o movimento e a abertura dos caminhos. Saravá Exu!",
    ],
    [
      /\bere\b|cosme.*damiao/,
      "Erês representam a alegria, a pureza, a esperança e a renovação. Saravá os Erês!",
    ],
    [
      /xango/,
      "Xangô representa a justiça, o equilíbrio, a firmeza e a sabedoria nas decisões. Saravá Xangô!",
    ],
    [
      /omolu|obaluae/,
      "Omolu representa a cura, a transformação, a superação e a renovação da vida. Saravá Omolu!",
    ],
    [
      /iansa/,
      "Iansã representa a coragem, o movimento, a transformação e a força dos ventos. Saravá Iansã!",
    ],
    [
      /oxum/,
      "Oxum representa o amor, a prosperidade, o cuidado e a força das águas doces. Saravá Oxum!",
    ],
    [
      /oxala/,
      "Oxalá representa a paz, a fé, a harmonia e a força da criação. Saravá Oxalá!",
    ],
    [
      /aniversario da umbanda/,
      "Celebramos a Umbanda, sua diversidade, sua fé e seu compromisso com a caridade. Saravá a Umbanda!",
    ],
  ];
  return (
    celebrations.find(([pattern]) => pattern.test(normalized))?.[1] || null
  );
}

function details(description = "") {
  const lines = description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const isClosed = lines.some((line) =>
    /\b(fe[cs]hado|inscri[cç][aã]o|somente.*m[eé]diuns|grupo fechado)\b/i.test(
      line,
    ),
  );
  const guidance = lines
    .filter((line) =>
      /^(orienta[cç][aã]o|chegada|vestu[aá]rio|roupa|observa[cç][aã]o)\s*:/i.test(
        line,
      ),
    )
    .map((line) => line.replace(/^[^:]+:\s*/, ""));
  const publicDescription = lines
    .filter(
      (line) =>
        !/^(categoria|acesso|orienta[cç][aã]o|chegada|vestu[aá]rio|roupa|observa[cç][aã]o)\s*:/i.test(
          line,
        ),
    )
    .join("\n");
  return {
    isOpen: !isClosed,
    description:
      publicDescription ||
      "Atividade promovida pela Casa Universalista Sol do Oriente.",
    guidance: guidance.length
      ? guidance
      : [
          "Chegue com antecedência para o acolhimento",
          "Use roupas confortáveis e discretas",
        ],
  };
}

function normalize(event: GoogleEvent): SiteCalendarEvent | null {
  const start = event.start?.dateTime ?? event.start?.date;
  const end = event.end?.dateTime ?? event.end?.date;
  if (!event.id || !start || !end || event.status === "cancelled") return null;
  const summary = event.summary || "Atividade da Casa";
  const parsed = details(event.description);
  const category = categoryFor(summary, event.description || "");
  const celebrationDescription =
    category === "commemorative" ? entityCelebrationDescription(summary) : null;
  const guidance =
    category === "apometria"
      ? Array.from(
          new Set([
            ...parsed.guidance,
            "Traga todos os materiais solicitados",
            "É obrigatório fazer o preceito conforme indicado",
          ]),
        )
      : parsed.guidance;
  return {
    id: event.id,
    title: cleanTitle(summary),
    start,
    end,
    allDay: Boolean(event.start?.date && !event.start.dateTime),
    category,
    isOpen: parsed.isOpen,
    description: celebrationDescription || parsed.description,
    location: celebrationDescription
      ? ""
      : event.location || "Casa Sol do Oriente",
    guidance: celebrationDescription ? [] : guidance,
    googleUrl: event.htmlLink || "https://calendar.google.com/",
  };
}

export function isGoogleCalendarConfigured() {
  const auth = credentials();
  return Boolean(process.env.GOOGLE_CALENDAR_ID && auth.email && auth.key);
}

export async function listGoogleCalendarEvents(
  timeMin: string,
  timeMax: string,
) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const auth = credentials();
  if (!calendarId || !auth.email || !auth.key) return null;
  const token = await createServiceAccountToken(auth.email, auth.key);
  const params = new URLSearchParams({
    timeMin,
    timeMax,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "250",
    timeZone: process.env.GOOGLE_CALENDAR_TIME_ZONE || "America/Sao_Paulo",
  });
  const fetchEvents = async (id: string) => {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events?${params}`,
      { headers: { authorization: `Bearer ${token}` } },
    );
    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Google Calendar respondeu ${response.status}: ${body.slice(0, 180)}`,
      );
    }
    const data = (await response.json()) as { items?: GoogleEvent[] };
    return (data.items || [])
      .map(normalize)
      .filter((item): item is SiteCalendarEvent => Boolean(item));
  };

  const primaryEvents = await fetchEvents(calendarId);
  const brazilianDatesCalendar =
    "pt.brazilian#holiday@group.v.calendar.google.com";
  const commemorativeEvents = (
    await fetchEvents(brazilianDatesCalendar).catch(() => [])
  )
    .map((event) => ({
      ...event,
      id: `br-date-${event.id}`,
      category: "commemorative" as const,
    }));

  return [...primaryEvents, ...commemorativeEvents].sort((a, b) =>
    a.start.localeCompare(b.start),
  );
}
