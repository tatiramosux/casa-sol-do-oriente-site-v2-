import { NextResponse } from "next/server";
import {
  isGoogleCalendarConfigured,
  listGoogleCalendarEvents,
  type SiteCalendarEvent,
} from "@/lib/google-calendar";

export const dynamic = "force-dynamic";

function developmentNoGiraPreview() {
  if (process.env.NODE_ENV !== "development") return null;

  const start = process.env.CALENDAR_PREVIEW_NO_GIRA_START;
  const end = process.env.CALENDAR_PREVIEW_NO_GIRA_END;
  const holidayName = process.env.CALENDAR_PREVIEW_NO_GIRA_HOLIDAY;

  if (!start || !end || !holidayName) return null;

  return { start, end, allDay: true, holidayName };
}

function normalizedTitle(event: SiteCalendarEvent) {
  return event.title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function localDateKey(event: SiteCalendarEvent) {
  if (event.allDay) return event.start.slice(0, 10);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(event.start));
}

function eventEndTime(event: SiteCalendarEvent) {
  return Date.parse(
    event.allDay ? `${event.end.slice(0, 10)}T00:00:00-03:00` : event.end,
  );
}

export async function GET() {
  if (!isGoogleCalendarConfigured()) {
    return NextResponse.json({
      configured: false,
      dates: {},
      noGira: developmentNoGiraPreview(),
    });
  }

  const now = new Date();
  // Inclui avisos de dia inteiro que começaram à meia-noite local e ainda
  // estão vigentes quando a página é aberta.
  const start = new Date(now);
  start.setUTCDate(start.getUTCDate() - 1);
  const end = new Date(start);
  end.setUTCFullYear(end.getUTCFullYear() + 1);

  try {
    const events =
      (await listGoogleCalendarEvents(start.toISOString(), end.toISOString())) ||
      [];
    const upcomingEvents = events.filter(
      (event) => eventEndTime(event) > now.getTime(),
    );
    const hospital = upcomingEvents.find((event) =>
      normalizedTitle(event).includes("hospital terapeutico"),
    );
    const griefSupport = upcomingEvents.find((event) => {
      const title = normalizedTitle(event);
      return (
        title.includes("grupo de apoio ao luto") ||
        title.includes("a vida continua")
      );
    });
    // Proxima gira, qualquer que seja: as de segunda na Casa e tambem as
    // especiais, como a Gira de Mata, que acontecem em outro dia ou local.
    const nextGira = upcomingEvents.find(
      (event) => event.category === "giras",
    );
    const nextGiraStatus = upcomingEvents.find(
      (event) => event.category === "giras" || event.category === "noGira",
    );
    // Um aviso distante não deve ocultar giras que acontecerão antes dele.
    const noGira =
      nextGiraStatus?.category === "noGira" ? nextGiraStatus : undefined;
    const holiday = noGira
      ? upcomingEvents.find(
          (event) =>
            event.category === "commemorative" &&
            localDateKey(event) === localDateKey(noGira),
        )
      : undefined;

    return NextResponse.json(
      {
        configured: true,
        dates: {
          hospital: hospital?.start,
          griefSupport: griefSupport?.start,
          nextGira: nextGira?.start,
        },
        noGira: noGira
          ? {
              start: noGira.start,
              end: noGira.end,
              allDay: noGira.allDay,
              holidayName: holiday?.title || noGira.title,
            }
          : null,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Upcoming project dates sync failed", error);
    return NextResponse.json(
      { configured: true, dates: {}, error: "Agenda indisponível." },
      { status: 502 },
    );
  }
}
