"use client";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "motion/react";
import { SiteSearch } from "../../components/site-search";
import { ProjectsMenu } from "../../components/projects-menu";
import { IngressoMenu } from "../../components/ingresso-menu";
import { RitualisticaMenu } from "../../components/ritualistica-menu";
import {
  Activity,
  ArrowRight,
  AtSign,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  GraduationCap,
  Flower2,
  Info,
  LoaderCircle,
  MapPin,
  Menu,
  PartyPopper,
  RefreshCw,
  Shirt,
  Sun,
  TreePalm,
  Users,
  X,
} from "lucide-react";
type Cat =
  | "giras"
  | "cursos"
  | "internalDevelopment"
  | "paidPartner"
  | "apometria"
  | "social"
  | "commemorative"
  | "noGira";
type Item = {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  category: Cat;
  isOpen: boolean;
  description: string;
  location: string;
  guidance: string[];
  googleUrl: string;
};
function projectPageFor(item: Item) {
  const text = `${item.title} ${item.description}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  if (item.category === "apometria" || text.includes("apometria"))
    return "/projetos/apometria";
  if (text.includes("hospital terapeutico"))
    return "/projetos/hospital-terapeutico";
  if (
    text.includes("a vida continua") ||
    text.includes("grupo de apoio") ||
    text.includes("apoio ao luto") ||
    /\bluto\b/.test(text)
  )
    return "/projetos/a-vida-continua";
  return null;
}
const giraFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSfar3yA_Ql379-qLmO0kzfjhNjTSQLtP2LJ-FTJz2bGNecAeQ/viewform";
const hospitalFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdmSTuoVCW4-dr_w6_j1GYfQdTlTAyQz5KLL7UXIKGSiOGmpg/viewform";
function registrationFormFor(item: Item) {
  const text = `${item.title} ${item.description}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  if (text.includes("hospital terapeutico")) return hospitalFormUrl;
  if (item.category === "giras") return giraFormUrl;
  return null;
}
function registrationLabelFor(item: Item) {
  const text = `${item.title} ${item.description}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return text.includes("hospital terapeutico")
    ? "Inscrição para terapia"
    : "Inscrição para cirurgia";
}
const cats = {
  giras: {
    label: "Giras e atividades espirituais",
    short: "Giras",
    color: "amber",
    Icon: Sun,
  },
  cursos: {
    label: "Cursos e palestras gratuitos",
    short: "Cursos gratuitos",
    color: "orange",
    Icon: GraduationCap,
  },
  internalDevelopment: {
    label: "Desenvolvimento mediúnico interno",
    short: "Desenvolvimento mediúnico interno",
    color: "green",
    Icon: GraduationCap,
  },
  paidPartner: {
    label: "Cursos pagos",
    short: "Cursos pagos",
    color: "brown",
    Icon: GraduationCap,
  },
  apometria: {
    label: "Grupo de Apometria",
    short: "Apometria",
    color: "blue",
    Icon: Activity,
  },
  social: {
    label: "Projetos sociais, Apoio ao Luto e Hospital Terapêutico",
    short: "Projetos sociais",
    color: "purple",
    Icon: Flower2,
  },
  commemorative: {
    label: "Data comemorativa",
    short: "Datas comemorativas",
    color: "lavender",
    Icon: PartyPopper,
  },
  noGira: {
    label: "Não haverá gira",
    short: "Não haverá gira",
    color: "dark-gray",
    Icon: X,
  },
} satisfies Record<
  Cat,
  { label: string; short: string; color: string; Icon: typeof Sun }
>;
function iconFor(item: Item) {
  return /recesso/i.test(item.title) ? TreePalm : cats[item.category].Icon;
}
function isInternalEvent(item: Item) {
  const title = item.title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  return (
    /\bcafe com macumba\b/.test(title) ||
    /\bcurso de umbanda (?:i|1)\b/.test(title)
  );
}
function isPaidPartnerEvent(item: Item) {
  const title = item.title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  return title === "curso sementes espirituais com prof. wagner borges";
}
function isKoiFreeLecture(item: Item) {
  const title = item.title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  return title ===
    "palestra estudos animicos e mediunicos com prof. wagner borges";
}
function isKoiEvent(item: Item) {
  return isPaidPartnerEvent(item) || isKoiFreeLecture(item);
}
function eventColorFor(item: Item) {
  if (isInternalEvent(item)) return "green";
  if (isPaidPartnerEvent(item)) return "brown";
  return cats[item.category].color;
}
function accessFor(item: Item) {
  if (
    item.category === "commemorative" ||
    item.category === "noGira" ||
    /recesso/i.test(item.title)
  )
    return null;
  if (item.category === "apometria")
    return {
      card: "Somente sob indicação",
      detail: "Somente sob indicação",
      important: true,
    };
  if (isInternalEvent(item))
    return {
      card: "Evento interno",
      detail: "Evento interno",
      important: false,
    };
  if (isPaidPartnerEvent(item))
    return {
      card: "Curso pago",
      detail: "Curso pago",
      important: false,
    };
  return {
    card: "Aberto ao público",
    detail: "Aberto ao público",
    important: false,
  };
}
const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  weekdays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
function asDate(value: string, allDay = false) {
  return new Date(
    allDay && /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00` : value,
  );
}
function timeOf(item: Item) {
  return item.allDay
    ? "Dia todo"
    : asDate(item.start).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
}
function eventLastDate(item: Item) {
  const end = asDate(item.end, item.allDay);
  if (item.allDay) end.setDate(end.getDate() - 1);
  return end;
}
function spansMultipleDays(item: Item) {
  return (
    asDate(item.start, item.allDay).toDateString() !==
    eventLastDate(item).toDateString()
  );
}
function dateOf(item: Item) {
  const start = asDate(item.start, item.allDay);
  const end = eventLastDate(item);
  if (!spansMultipleDays(item))
    return start.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  return `${start.toLocaleDateString("pt-BR", { day: "numeric", month: "short" })} – ${end.toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" })}`;
}
function cardSchedule(item: Item) {
  return spansMultipleDays(item) ? dateOf(item) : timeOf(item);
}
function samples(year: number, month: number) {
  const iso = (day: number, hour: string) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}T${hour}:00-03:00`;
  const make = (
    id: string,
    day: number,
    title: string,
    hour: string,
    category: Cat,
    isOpen = true,
  ): Item => ({
    id,
    start: iso(day, hour),
    end: iso(day, hour),
    title,
    category,
    isOpen,
    allDay: false,
    description:
      "Atividade de acolhimento e cuidado promovida pela Casa Sol do Oriente.",
    location: "Rua Francisco Nunes, 437 · Rebouças · Curitiba / PR",
    guidance: [
      "Chegue com antecedência para o acolhimento",
      "Use roupas confortáveis e discretas",
    ],
    googleUrl: "https://calendar.google.com/",
  });
  return [
    make("demo-1", 2, "Cirurgia Espiritual", "19:30", "giras"),
    make("demo-2", 4, "Desenvolvimento Mediúnico", "19:00", "cursos", false),
    make("demo-3", 5, "Gira de Caboclos", "20:00", "giras"),
    make("demo-4", 7, "Grupo de Apometria", "14:00", "apometria", false),
    make("demo-5", 8, "Hospital Terapêutico", "09:00", "social"),
    make("demo-6", 12, "Gira de Pretos-Velhos", "20:00", "giras"),
    make("demo-7", 15, "A vida continua", "15:00", "social"),
    make("demo-8", 18, "Orixás e suas forças", "19:00", "cursos", false),
    make("demo-9", 21, "Grupo de Apometria", "14:00", "apometria", false),
    make("demo-10", 26, "Gira de Exus e Pombagiras", "20:00", "giras"),
    make(
      "demo-11",
      29,
      "Pão Solidário da Vó Margarida",
      "08:30",
      "social",
      false,
    ),
  ];
}
function calendarCells(year: number, month: number) {
  const first = new Date(year, month, 1);
  const gridStart = new Date(year, month, 1 - first.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return {
      date,
      day: date.getDate(),
      outside: date.getMonth() !== month,
      key: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    };
  });
}
export default function Home() {
  const [today, setToday] = useState(() => new Date());
  const todayRef = useRef(today);
  const [view, setView] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [active, setActive] = useState(
    new Set<Cat>([
      "giras",
      "cursos",
      "internalDevelopment",
      "paidPartner",
      "apometria",
      "social",
      "commemorative",
      "noGira",
    ]),
  );
  const [items, setItems] = useState<Item[]>([]);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState(false);
  const [selected, setSelected] = useState<Item | null>(null);
  const [menu, setMenu] = useState(false);
  const [reload, setReload] = useState(0);
  const year = view.getFullYear(),
    month = view.getMonth();
  useEffect(() => {
    let timer = 0;
    const scheduleMonthCheck = () => {
      const now = new Date();
      const nextDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        1,
      );
      timer = window.setTimeout(() => {
        const updated = new Date();
        const previous = todayRef.current;
        setView((current) =>
          current.getFullYear() === previous.getFullYear() &&
          current.getMonth() === previous.getMonth()
            ? new Date(updated.getFullYear(), updated.getMonth(), 1)
            : current,
        );
        todayRef.current = updated;
        setToday(updated);
        scheduleMonthCheck();
      }, nextDay.getTime() - now.getTime());
    };
    scheduleMonthCheck();
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const refresh = () => setReload((value) => value + 1);
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") refresh();
    };
    const interval = window.setInterval(refresh, 5 * 60 * 1000);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setSyncError(false);
    fetch(`/api/calendar?year=${year}&month=${month + 1}`, {
      cache: "no-store",
    })
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error);
        return d;
      })
      .then((d) => {
        if (!cancelled) {
          setConfigured(d.configured);
          setItems(d.configured ? d.events : samples(year, month));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSyncError(true);
          setItems(samples(year, month));
        }
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [year, month, reload]);
  const visible = useMemo(
      () => items.filter((i) => active.has(i.category)),
      [items, active],
    ),
    cells = useMemo(() => calendarCells(year, month), [year, month]);
  const toggle = (cat: Cat) =>
    setActive((old) => {
      const next = new Set(old);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  const showCalendar = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMenu(false);
    document.getElementById("calendario")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", "#calendario");
  };
  const eventsOn = (date: Date) =>
    visible.filter((item) => {
      const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const startKey = item.start.slice(0, 10);
      const lastKey = item.allDay
        ? eventLastDate(item).toLocaleDateString("sv-SE")
        : item.end.slice(0, 10);
      return dayKey >= startKey && dayKey <= lastKey;
    });
  return (
    <Tooltip.Provider delayDuration={250}>
      <div className="page calendar-page">
        <a className="calendar-skip-link" href="#calendario">
          Ir para o calendário
        </a>
        <header className="calendar-site-header">
          <button
            className="calendar-menu"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
          >
            {menu ? <X /> : <Menu />}
          </button>
          <a
            className="calendar-brand"
            href="/"
            aria-label="Casa Sol do Oriente — início"
          >
            <img src="/casa-sol/logo.png" alt="Casa Sol do Oriente" />
          </a>
          <nav className="calendar-main-nav" aria-label="Navegação principal">
            <a href="/">Início</a>
            <a href="/historia">História</a>
            <IngressoMenu />
            <ProjectsMenu />
            <RitualisticaMenu />
            <a href="/musicalidade">Musicalidade</a>
            <a
              className="active"
              href="#calendario"
              onClick={showCalendar}
              aria-current="page"
            >
              Calendário
            </a>
          </nav>
          <SiteSearch />
          <a
            className="calendar-header-cta"
            href="#calendario"
            onClick={showCalendar}
            aria-label="Ver próximos encontros"
          >
            <CalendarDays aria-hidden="true" />
            <span>Ver próximos encontros</span>
          </a>
          {menu && (
            <motion.div
              className="calendar-mobile-nav"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <a href="/">Início</a>
              <a href="/historia">História</a>
              <IngressoMenu />
              <ProjectsMenu />
              <RitualisticaMenu />
              <a href="/musicalidade">Musicalidade</a>
              <a href="#calendario" onClick={showCalendar}>
                Calendário
              </a>
              <a href="#orientacoes">Orientações</a>
            </motion.div>
          )}
        </header>
        <main id="inicio">
          <section className="hero calendar-hero">
            <motion.div
              className="calendar-hero-copy"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="eyebrow">Agenda da Casa</p>
              <h1>Calendário da Casa</h1>
              <p className="intro">
                Acompanhe nossas giras, cursos, palestras e projetos sociais.
                Encontre o seu momento de conexão, cuidado e partilha.
              </p>
              <a
                className="calendar-hero-cta"
                href="#calendario"
                onClick={showCalendar}
              >
                Explorar agenda de {months[month]}
                <ChevronRight />
              </a>
            </motion.div>
            <span className="calendar-hero-month" aria-hidden="true">
              {months[month]}
            </span>
          </section>
          <section id="calendario" className="calendar-section">
            <div className="toolbar">
              <div className="month">
                <Tip text="Mês anterior">
                  <button
                    onClick={() => setView(new Date(year, month - 1, 1))}
                    aria-label="Mês anterior"
                  >
                    <ChevronLeft />
                  </button>
                </Tip>
                <div>
                  <span>{months[month]}</span>
                  <strong>{year}</strong>
                </div>
                <Tip text="Próximo mês">
                  <button
                    onClick={() => setView(new Date(year, month + 1, 1))}
                    aria-label="Próximo mês"
                  >
                    <ChevronRight />
                  </button>
                </Tip>
                <button
                  className="today"
                  onClick={() =>
                    setView(new Date(today.getFullYear(), today.getMonth(), 1))
                  }
                >
                  Hoje
                </button>
              </div>
              <div className="calendar-status">
                <button
                  className="calendar-refresh-button"
                  onClick={() => setReload((v) => v + 1)}
                  aria-label={
                    loading ? "Atualizando calendário" : "Atualizar calendário"
                  }
                  aria-busy={loading}
                >
                  <RefreshCw
                    className={loading ? "spin" : undefined}
                    aria-hidden="true"
                  />
                  <span className="refresh-label-desktop">
                    {loading
                      ? "Atualizando calendário"
                      : "Atualizar calendário"}
                  </span>
                  <span className="refresh-label-mobile">
                    {loading ? "Atualizando" : "Atualizar"}
                  </span>
                </button>
              </div>
            </div>
            <div className="filters">
              <span>Filtrar:</span>
              {(Object.keys(cats) as Cat[])
                .filter(
                  (cat) =>
                    cat !== "noGira" ||
                    items.some((item) => item.category === "noGira"),
                )
                .map((cat) => {
                  const item = cats[cat],
                    Icon = item.Icon,
                    on = active.has(cat);
                  return (
                    <button
                      key={cat}
                      className={`filter ${item.color} ${on ? "" : "off"}`}
                      onClick={() => toggle(cat)}
                      aria-pressed={on}
                    >
                      <Icon />
                      {item.short}
                    </button>
                  );
                })}
              <button className="clear" onClick={() => setActive(new Set())}>
                Limpar filtros
              </button>
            </div>
            <div className="calendar">
              <div className="week">
                {weekdays.map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>
              <motion.div
                className="grid"
                key={`${year}-${month}-${loading ? "loading" : "ready"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {cells.map((cell) => {
                  const list = eventsOn(cell.date),
                    current =
                      cell.date.getDate() === today.getDate() &&
                      cell.date.getMonth() === today.getMonth() &&
                      cell.date.getFullYear() === today.getFullYear();
                  return (
                    <div
                      className={`cell ${cell.outside ? "outside" : ""}`}
                      key={cell.key}
                    >
                      <span className={current ? "current" : ""}>
                        {cell.day}
                      </span>
                      <div>
                        {loading ? (
                          <CellSkeleton index={cell.date.getDate()} />
                        ) : (
                          list.map((item) => (
                            <EventCard
                              key={item.id}
                              item={item}
                              onClick={() => setSelected(item)}
                            />
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
            <div className="mobile-agenda">
              {loading ? (
                <MobileSkeleton />
              ) : (
                Array.from(
                  { length: new Date(year, month + 1, 0).getDate() },
                  (_, i) => i + 1,
                ).map((day) => {
                  const date = new Date(year, month, day),
                    list = eventsOn(date),
                    current =
                      day === today.getDate() &&
                      month === today.getMonth() &&
                      year === today.getFullYear();
                  return list.length || current ? (
                    <div
                      className={`mobile-day ${current ? "mobile-today" : ""}`}
                      key={day}
                    >
                      <div className="date">
                        <strong>{String(day).padStart(2, "0")}</strong>
                        <span>{weekdays[date.getDay()]}</span>
                      </div>
                      <div>
                        {current && (
                          <div className="today-line" aria-label="Hoje">
                            <span>Hoje</span>
                          </div>
                        )}
                        {list.map((item) => (
                          <EventCard
                            mobile
                            key={item.id}
                            item={item}
                            onClick={() => setSelected(item)}
                          />
                        ))}
                      </div>
                    </div>
                  ) : null;
                })
              )}
              {!loading && !visible.length && (
                <div className="empty-state">
                  <CalendarDays />
                  <strong>Nenhuma atividade neste mês</strong>
                  <span>Use as setas para consultar os próximos meses.</span>
                </div>
              )}
            </div>
            <p className="calendar-results-count">
              <b>{visible.length}</b> registros neste mês
            </p>
          </section>
          <section id="orientacoes" className="notice">
            <div>
              <Info />
              <span>
                <strong>Antes de vir à Casa</strong>Consulte as orientações de
                cada atividade e programe sua chegada com tranquilidade.
              </span>
            </div>
            <a href="/gira">Ver orientações gerais →</a>
          </section>
        </main>
        <footer className="calendar-site-footer" id="contato">
          <div className="calendar-footer-main">
            <div className="calendar-footer-brand">
              <img src="/casa-sol/logo.png" alt="Casa Sol do Oriente" />
              <a
                href="https://maps.app.goo.gl/fiymuvcitenE4DKF7"
                target="_blank"
                rel="noreferrer"
              >
                <MapPin aria-hidden="true" />
                <span>
                  Rua Francisco Nunes, 437
                  <br />
                  Rebouças · Curitiba / PR
                </span>
              </a>
            </div>
            <div className="calendar-footer-column">
              <strong>Casa SOL</strong>
              <a href="/historia">Nossa história</a>
              <a href="/ritualistica">Ritualística</a>
              <a href="/projetos">Projetos</a>
              <a href="/musicalidade">Musicalidade</a>
            </div>
            <div className="calendar-footer-column">
              <strong>Participe</strong>
              <a href="/calendario">Calendário</a>
              <a href="/ingresso">Ingresso</a>
              <a href="/gira">Gira de segunda</a>
              <a href="/projetos/hospital-terapeutico">Hospital Terapêutico</a>
            </div>
            <div className="calendar-footer-column">
              <strong>Conecte-se</strong>
              <a
                href="https://www.instagram.com/casasoldooriente/"
                target="_blank"
                rel="noreferrer"
              >
                <AtSign aria-hidden="true" />
                Instagram
              </a>
            </div>
          </div>
          <div className="calendar-footer-bottom">
            <small>
              © {today.getFullYear()} Casa Universalista Sol do Oriente.
            </small>
            <a
              className="calendar-footer-credit"
              href="http://www.tatiramos.com.br"
              target="_blank"
              rel="noreferrer"
            >
              Desenvolvido por @tatiramos
            </a>
            <span>Curitiba · Paraná</span>
          </div>
        </footer>
        <Dialog.Root
          open={!!selected}
          onOpenChange={(open) => !open && setSelected(null)}
        >
          <AnimatePresence>
            {selected && (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild>
                  <motion.div
                    className="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </Dialog.Overlay>
                <Dialog.Content asChild aria-describedby="description">
                  <motion.div
                    className="dialog"
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  >
                    <i className={`accent ${eventColorFor(selected)}`} />
                    <Dialog.Close className="close" aria-label="Fechar">
                      <X />
                    </Dialog.Close>
                    <div className="dialog-title">
                      <span className={`icon ${eventColorFor(selected)}`}>
                        {(() => {
                          const Icon = iconFor(selected);
                          return <Icon />;
                        })()}
                      </span>
                      <div>
                        <small>{cats[selected.category].label}</small>
                        <Dialog.Title>{selected.title}</Dialog.Title>
                      </div>
                    </div>
                    <div className="meta">
                      <span>
                        <CalendarDays /> {dateOf(selected)}
                      </span>
                      <span>
                        <Clock3 /> {timeOf(selected)}
                      </span>
                      {selected.category !== "commemorative" &&
                        selected.location && (
                          <span>
                            <MapPin /> {selected.location}
                          </span>
                        )}
                    </div>
                    {accessFor(selected) && (
                      <b
                        className={`badge ${isPaidPartnerEvent(selected) ? "paid" : accessFor(selected)?.important ? "closed" : "public"}`}
                      >
                        {accessFor(selected)?.important ? (
                          <AccessInfo />
                        ) : (
                          <Users />
                        )}
                        {accessFor(selected)?.detail}
                      </b>
                    )}
                    <Dialog.Description id="description">
                      {selected.description}
                    </Dialog.Description>
                    {isKoiEvent(selected) && (
                      <div className="partnership-notice">
                        <Info aria-hidden="true" />
                        <p>
                          {isPaidPartnerEvent(selected)
                            ? "As inscrições e as informações complementares deste curso são administradas exclusivamente pela Editora KOI."
                            : "Evento gratuito administrado pela Editora KOI. A Casa SOL apenas cede o espaço e não realiza reservas nem fornece informações adicionais."}
                        </p>
                      </div>
                    )}
                    {selected.category !== "commemorative" &&
                      selected.guidance.length > 0 && (
                        <div className="guidance">
                          <h3>
                            <Shirt /> Orientações gerais
                          </h3>
                          {selected.guidance.map((g) => (
                            <p key={g}>
                              <Check />
                              {g}
                            </p>
                          ))}
                        </div>
                      )}
                    {selected.category !== "commemorative" &&
                      !/curso de umbanda i/i.test(selected.title) &&
                      (isKoiEvent(selected) ? (
                        <a
                          className="google"
                          href="https://wagnerborges.koieditora.com.br/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink />
                          {isPaidPartnerEvent(selected)
                            ? "Inscrições e informações na Editora KOI"
                            : "Informações na Editora KOI"}
                        </a>
                      ) : registrationFormFor(selected) ? (
                        <a
                          className="google"
                          href={registrationFormFor(selected)!}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink />
                          {registrationLabelFor(selected)}
                        </a>
                      ) : projectPageFor(selected) ? (
                        <a className="google" href={projectPageFor(selected)!}>
                          <ArrowRight />
                          Conhecer este projeto
                        </a>
                      ) : (
                        <a
                          className="google"
                          href="https://www.instagram.com/casasoldooriente/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink />
                          Acesse nosso Instagram para mais detalhes
                        </a>
                      ))}
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>
      </div>
    </Tooltip.Provider>
  );
}
function Tip({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className="tooltip" sideOffset={6}>
          {text}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
function CellSkeleton({ index }: { index: number }) {
  if (index % 3 === 0) return null;
  return (
    <div className="event-skeleton" aria-hidden="true">
      <i />
      <span />
      <small />
    </div>
  );
}
function MobileSkeleton() {
  return (
    <div className="mobile-skeleton" aria-label="Carregando atividades">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index}>
          <i />
          <span />
        </div>
      ))}
    </div>
  );
}
function AccessInfo() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <span
          className="access-info"
          tabIndex={0}
          aria-label="Informações sobre a indicação"
          onClick={(event) => event.stopPropagation()}
        >
          <Info />
        </span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className="tooltip access-tooltip" sideOffset={7}>
          Esse tratamento deve ser indicado pela espiritualidade que rege nossa
          casa e não é aberto ao público em geral.
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
function EventCard({
  item,
  onClick,
  mobile = false,
}: {
  item: Item;
  onClick: () => void;
  mobile?: boolean;
}) {
  const Icon = iconFor(item),
    past = asDate(item.end, item.allDay).getTime() <= Date.now(),
    access = accessFor(item);
  return (
    <motion.button
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: past ? 0.5 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`${mobile ? "mobile-event" : "event"} ${eventColorFor(item)} ${past ? "past-event" : ""}`}
      onClick={onClick}
    >
      <span className="event-heading">
        <Icon />
        <b>{item.title}</b>
      </span>
      <span className="event-details">
        <small>
          <Clock3 />
          {cardSchedule(item)}
        </small>
        {item.category === "commemorative" && (
          <em>
            <PartyPopper />
            Data comemorativa
          </em>
        )}
      </span>
      {access && (
        <span className={`access-tag ${access.important ? "important" : ""}`}>
          {access.important ? <AccessInfo /> : <Users />}
          {access.card}
        </span>
      )}
    </motion.button>
  );
}
