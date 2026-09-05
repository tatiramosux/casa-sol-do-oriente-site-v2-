"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  CalendarDays,
  ChevronDown,
  CircleUserRound,
  Hand,
  Heart,
  MapPin,
  Menu,
  Star,
  Sun,
  X,
} from "lucide-react";
import styles from "./page.module.css";
import { SiteSearch } from "../components/site-search";
import { ProjectsMenu } from "../components/projects-menu";
import { IngressoMenu } from "../components/ingresso-menu";
import { RitualisticaMenu } from "../components/ritualistica-menu";

const projects = [
  {
    title: "Cirurgias espirituais",
    badge: "Atendimento gratuito à comunidade",
    eyebrow: "Atendimentos às segundas",
    image: "/casa-sol/banner-gira.webp",
    href: "/gira",
    external: false,
    actionLabel: "Saiba mais",
    dateKey: "nextGira",
    fixedDate: null,
    showUntil: null,
    alt: "Corrente mediúnica reunida durante a gira na Casa Sol do Oriente",
    description:
      "Um encontro de acolhimento, orientação e cuidado espiritual, aberto a quem busca atendimento na Casa.",
  },
  {
    title: "Palestra com Prof. Wagner Borges",
    badge: "Evento",
    eyebrow: "Parceria Editora KOI",
    image: "/casa-sol/wagner-borges-palestra.jpg",
    href: "https://wagnerborges.koieditora.com.br/",
    external: true,
    actionLabel: "Saiba mais",
    dateKey: null,
    fixedDate: "09, 10 e 11 de outubro",
    // Ultimo dia em que o slide aparece. Depois disso ele sai do carrossel
    // sozinho e a numeracao dos demais se reorganiza.
    showUntil: "2026-10-11",
    alt: "Arte do evento Sakuras Espirituais, da Editora KOI, com o Prof. Wagner Borges",
    description:
      "Esse evento é realizado em parceria com a Editora KOI. A editora administra todas as informações do evento.",
  },
  {
    title: "Hospital Terapêutico",
    badge: "Projeto social",
    eyebrow: "Terapias integrativas",
    image: "/casa-sol/banner-hospital.webp",
    href: "/projetos/hospital-terapeutico",
    external: false,
    actionLabel: "Conheça o projeto",
    dateKey: "hospital",
    fixedDate: null,
    showUntil: null,
    alt: "Arte do projeto Hospital Terapêutico da Casa Sol do Oriente",
    description:
      "Terapias complementares e suporte psicológico oferecidos à comunidade por uma rede de terapeutas voluntários.",
  },
  {
    title: "A vida continua",
    badge: "Projeto social",
    eyebrow: "Acolhimento ao luto",
    image: "/casa-sol/projeto-4-uhd.jpg",
    href: "/projetos/a-vida-continua",
    external: false,
    actionLabel: "Conheça o projeto",
    dateKey: "griefSupport",
    fixedDate: null,
    showUntil: null,
    alt: "Arte do projeto A Vida Continua, da Casa Sol do Oriente",
    description:
      "Um espaço seguro de escuta para quem atravessa o luto — pela perda de uma pessoa, uma relação, um sonho ou uma grande mudança de vida.",
  },
  {
    title: "Firmando os trabalhos",
    badge: "Projeto social",
    eyebrow: "Rede de apoio",
    image: "/casa-sol/projeto-3-uhd.jpg",
    href: "/projetos/firmando-os-trabalhos",
    external: false,
    actionLabel: "Conheça o projeto",
    dateKey: null,
    fixedDate: null,
    showUntil: null,
    alt: "Arte do projeto Firmando os Trabalhos da Casa Sol do Oriente",
    description:
      "Uma rede que aproxima profissionais, empreendedores e a comunidade para compartilhar oportunidades e fortalecer novos caminhos.",
  },
  {
    title: "Pão solidário da Vó Margarida",
    badge: "Projeto social",
    eyebrow: "Ação comunitária",
    image: "/casa-sol/projeto-2-uhd.jpg",
    href: "/projetos/pao-solidario",
    external: false,
    actionLabel: "Conheça o projeto",
    dateKey: null,
    fixedDate: null,
    showUntil: null,
    alt: "Arte do projeto Pão Solidário da Vó Margarida",
    description:
      "Médiuns voluntários preparam e distribuem pães à comunidade dos arredores da Casa, levando alimento, presença e cuidado.",
  },
] as const;

type ProjectDateKey = Exclude<(typeof projects)[number]["dateKey"], null>;
type UpcomingProjectDates = Partial<Record<ProjectDateKey, string>>;
type NoGiraNotice = {
  start: string;
  end: string;
  allDay: boolean;
  holidayName: string;
};
type CarouselProject = {
  title: string;
  badge: string;
  eyebrow: string;
  image: string;
  href: string;
  external: boolean;
  actionLabel: string;
  dateKey: ProjectDateKey | null;
  fixedDate: string | null;
  showUntil: string | null;
  alt: string;
  description: string;
  isNoGira?: boolean;
};

function formatProjectDate(value: string) {
  const date = new Date(value);
  const day = date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
  });
  const time = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${day} · ${time}`;
}

function formatNoGiraDate(value: string, allDay: boolean) {
  const date = allDay
    ? new Date(`${value.slice(0, 10)}T12:00:00-03:00`)
    : new Date(value);
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
  });
}

function noGiraEndTime(notice: NoGiraNotice) {
  return Date.parse(
    notice.allDay
      ? `${notice.end.slice(0, 10)}T00:00:00-03:00`
      : notice.end,
  );
}

const navItems = [
  { label: "Início", href: "/" },
  { label: "História", href: "/historia" },
  { label: "Ingresso", href: "/ingresso" },
  { label: "Projetos", href: "/projetos" },
  { label: "Ritualística", href: "/ritualistica" },
  { label: "Musicalidade", href: "/musicalidade" },
  { label: "Calendário", href: "/calendario" },
] as const;

const googleReviews = [
  {
    author: "Solange Stecki Rodrigues",
    quote: "Comecei a ir ano passado, me sinto acolhida sempre que participo, lugar extremamente fraternal.",
  },
  {
    author: "Clauluz",
    quote: "Lugar abençoado, com muitas curas e bençãos.",
  },
  {
    author: "Camila Ramasine",
    quote: "Energia incrível, trabalho feito com comprometimento em prol do amor e a caridade. Uma verdadeira família espiritual!",
  },
] as const;

// A data do dispositivo nao muda sozinha durante a visita, entao nao ha o que
// assinar: a store existe so para ler o valor no cliente sem quebrar a hidratacao.
const subscribeToNothing = () => () => {};

const googleMapsUrl = "https://www.google.com/maps/place/Casa+Sol+do+Oriente/@-25.4451668,-49.2570482,17z/data=!4m8!3m7!1s0x94dce567845c3b19:0x7897c51f987ed45f!8m2!3d-25.4451668!4d-49.2570482!9m1!1b1!16s%2Fg%2F11l2z0qzrp";

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [paused, setPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [upcomingProjectDates, setUpcomingProjectDates] =
    useState<UpcomingProjectDates | null>(null);
  const [noGiraNotice, setNoGiraNotice] =
    useState<NoGiraNotice | null>(null);
  // A data so existe no cliente: no servidor ela seria outra e causaria
  // divergencia de hidratacao. Ate a hidratacao, o servidor devolve null e
  // todos os slides aparecem.
  const today = useSyncExternalStore(
    subscribeToNothing,
    () => new Date().toLocaleDateString("en-CA"),
    () => null,
  );

  // Slides com prazo saem do carrossel sozinhos depois de showUntil, e a
  // numeracao dos demais se reorganiza porque vem da posicao na lista.
  const visibleProjects = useMemo(() => {
    const carouselProjects: CarouselProject[] = noGiraNotice
      ? projects.map((item, index) =>
          index === 0
            ? {
                ...item,
                title: "Não haverá gira — Feriado",
                badge: "Aviso de agenda",
                eyebrow: noGiraNotice.holidayName,
                href: "/calendario",
                actionLabel: "Ver calendário",
                dateKey: null,
                fixedDate: formatNoGiraDate(
                  noGiraNotice.start,
                  noGiraNotice.allDay,
                ),
                description: `Feriado: ${noGiraNotice.holidayName}. Não haverá gira nesta data.`,
                alt: `Imagem da Casa Sol em tons de cinza para informar que não haverá gira em razão de ${noGiraNotice.holidayName}`,
                isNoGira: true,
              }
            : item,
        )
      : [...projects];
    return carouselProjects.filter(
        (item) => !item.showUntil || today === null || item.showUntil >= today,
      );
  }, [noGiraNotice, today]);
  // Se a lista encolher, o indice ativo pode ficar fora dela.
  const currentIndex =
    activeProject < visibleProjects.length ? activeProject : 0;

  const goTo = useCallback(
    (index: number) => {
      setActiveProject((index + visibleProjects.length) % visibleProjects.length);
    },
    [visibleProjects.length],
  );

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(
      () => setActiveProject((currentIndex + 1) % visibleProjects.length),
      10000,
    );
    return () => window.clearTimeout(timer);
  }, [currentIndex, paused, visibleProjects.length]);

  useEffect(() => {
    let cancelled = false;
    let refreshTimer: number | undefined;
    const refreshInterval = 15 * 60 * 1000;

    const loadCalendar = () => {
      fetch("/api/calendar/upcoming-projects", { cache: "no-store" })
        .then((response) => (response.ok ? response.json() : null))
        .then((data) => {
          if (cancelled) return;
          if (!data?.dates) {
            refreshTimer = window.setTimeout(loadCalendar, refreshInterval);
            return;
          }
          setUpcomingProjectDates(data.dates);
          setNoGiraNotice(data.noGira || null);

          const timeUntilExpiry = data.noGira
            ? Math.max(1000, noGiraEndTime(data.noGira) - Date.now() + 1000)
            : refreshInterval;
          refreshTimer = window.setTimeout(
            loadCalendar,
            Math.min(refreshInterval, timeUntilExpiry),
          );
        })
        .catch(() => {
          if (!cancelled) {
            refreshTimer = window.setTimeout(loadCalendar, refreshInterval);
          }
        });
    };

    loadCalendar();
    return () => {
      cancelled = true;
      if (refreshTimer) window.clearTimeout(refreshTimer);
    };
  }, []);

  const project = visibleProjects[currentIndex] ?? visibleProjects[0];

  return (
    <div className={styles.siteShell}>
      <a className={styles.skipLink} href="#conteudo">
        Ir para o conteúdo
      </a>

      <header className={styles.header}>
        <button
          className={styles.menuButton}
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <a className={styles.brand} href="/" aria-label="Casa Sol do Oriente — início">
          <img src="/casa-sol/logo.png" alt="Casa Sol do Oriente — Casa Universalista" />
        </a>

        <nav className={styles.desktopNav} aria-label="Navegação principal">
          {navItems.map((item) => item.href === "/projetos" ? <ProjectsMenu key={item.href} /> : item.href === "/ingresso" ? <IngressoMenu key={item.href} /> : item.href === "/ritualistica" ? <RitualisticaMenu key={item.href} /> : <a key={item.href} href={item.href} aria-current={item.href === "/" ? "page" : undefined}>{item.label}</a>)}
        </nav>

        <SiteSearch />

        <a className={styles.headerCta} href="/calendario" aria-label="Ver próximos encontros">
          <CalendarDays aria-hidden="true" /><span>Ver próximos encontros</span>
        </a>

        {menuOpen && (
          <nav className={styles.mobileNav} aria-label="Navegação mobile">
            {navItems.map((item) => item.href === "/projetos" ? <ProjectsMenu key={item.href} /> : item.href === "/ingresso" ? <IngressoMenu key={item.href} /> : item.href === "/ritualistica" ? <RitualisticaMenu key={item.href} /> : <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          </nav>
        )}
      </header>

      <main id="conteudo">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div
            className={styles.carousel}
            aria-roledescription="carrossel"
            aria-label="Projetos e iniciativas sociais"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
            }}
          >
            {visibleProjects.map((item, index) => (
              <img
                key={item.title}
                className={`${styles.projectImage} ${item.isNoGira ? styles.projectImageNoGira : ""} ${index === currentIndex ? styles.projectImageActive : ""}`}
                src={item.image}
                alt={index === currentIndex ? item.alt : ""}
                aria-hidden={index !== currentIndex}
              />
            ))}
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroCopy} aria-live="polite" aria-atomic="true">
              <div className={styles.eyebrow}>
                {project.badge}
              </div>
              <span className={styles.heroProjectLabel}>{project.eyebrow}</span>
              <h1 id="hero-title" key={project.title}>{project.title}</h1>
              <p key={project.description}>{project.description}</p>
              <div className={styles.heroActions}>
                {project.fixedDate && (
                  <div className={styles.upcomingDate}>
                    <CalendarDays aria-hidden="true" />
                    <span>
                      <small>Data</small>
                      <strong>{project.fixedDate}</strong>
                    </span>
                  </div>
                )}
                {project.dateKey && upcomingProjectDates && (
                  <div
                    className={styles.upcomingDate}
                    role="status"
                    aria-live="polite"
                  >
                    <CalendarDays aria-hidden="true" />
                    <span>
                      <small>Próxima data</small>
                      <strong>
                        {upcomingProjectDates[project.dateKey]
                          ? formatProjectDate(
                              upcomingProjectDates[project.dateKey]!,
                            )
                          : "Aguardando nova data"}
                      </strong>
                    </span>
                  </div>
                )}
                <a
                  className={styles.textButton}
                  href={project.href}
                  {...(project.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {project.actionLabel}
                  <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>

          </div>
          <div className={styles.carouselRail} data-paused={paused || undefined} aria-label="Selecionar destaque">
            <div className={styles.numberedNav}>
              {visibleProjects.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={index === currentIndex ? styles.activeNumber : undefined}
                  aria-label={`Mostrar ${item.badge.toLocaleLowerCase("pt-BR")} ${index + 1}: ${item.title}`}
                  aria-current={index === currentIndex ? "true" : undefined}
                  onClick={() => goTo(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{item.title}</small>
                </button>
              ))}
            </div>
            <div className={styles.carouselControls}>
              <button type="button" onClick={() => goTo(currentIndex - 1)} aria-label="Projeto anterior"><ArrowLeft /></button>
              <button type="button" onClick={() => goTo(currentIndex + 1)} aria-label="Próximo projeto"><ArrowRight /></button>
            </div>
          </div>
          <a className={styles.scrollCue} href="#sobre">
            Descubra nossa Casa <ChevronDown aria-hidden="true" />
          </a>
        </section>

        <section className={styles.about} id="sobre" aria-labelledby="about-title">
          <div className={styles.aboutIntro}>
            <div className={styles.sectionLabel}>Acolhimento que transforma</div>
            <h2 id="about-title">Uma Casa feita de presença, cuidado e serviço.</h2>
            <Dialog.Root>
              <figure className={styles.aboutPhoto}>
                <Dialog.Trigger asChild>
                  <button className={styles.aboutPhotoTrigger} type="button" aria-label="Ampliar foto da Gira da Mata 2025">
                    <img
                      src="/casa-sol/comunidade-casa-sol.jpg"
                      alt="Comunidade da Casa Sol do Oriente reunida em uma celebração ao ar livre"
                      width="1800"
                      height="1200"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                </Dialog.Trigger>
                <figcaption>Morretes, corrente mediúnica na Gira da Mata 2025.</figcaption>
              </figure>
              <Dialog.Portal>
                <Dialog.Overlay className={styles.photoLightboxOverlay} />
                <Dialog.Content className={styles.photoLightbox} aria-describedby={undefined}>
                  <img
                    src="/casa-sol/comunidade-casa-sol.jpg"
                    alt="Comunidade da Casa Sol do Oriente reunida na Gira da Mata de 2025"
                    width="1800"
                    height="1200"
                  />
                  <Dialog.Title>Morretes, corrente mediúnica na Gira da Mata 2025.</Dialog.Title>
                  <Dialog.Close className={styles.photoLightboxClose} aria-label="Fechar foto ampliada">
                    <X aria-hidden="true" />
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <div className={styles.aboutCopy}>
              <p>
                Nossa Casa é muito mais do que um local para giras e cirurgias espirituais, é um
                espaço onde louvamos a Deus de forma universalista, respeitando diferentes formas de
                culto e a crença individual de cada um. Aqui, trabalhamos para oferecer projetos e
                iniciativas sociais que dão suporte à comunidade, sob o viés da cura de maneira
                integrativa.
              </p>
              <p>
                Nossa missão é lhe proporcionar um espaço seguro e sagrado onde você poderá trilhar a
                sua cura e autodesenvolvimento. Consulte as datas dos próximos encontros e venha fazer
                parte dessa jornada de amor e solidariedade.
              </p>
              <a className={styles.outlineButton} href="/historia">
                Conheça nossa história <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <section className={styles.quoteSection} aria-label="Citação">
            <figure className={styles.valuesQuote}>
              <blockquote>“O Caminho da Luz não tem volta!”</blockquote>
              <figcaption>Sathya Sai Baba</figcaption>
            </figure>
          </section>

          <div className={styles.valuesSection} aria-labelledby="values-title">
            <div className={styles.sectionLabel}>Valores</div>
            <h2 id="values-title" className={styles.valuesTitle}>O que orienta nossa caminhada.</h2>
            <div className={styles.values}>
              <article>
                <Sun aria-hidden="true" />
                <h3>Expansão da consciência</h3>
                <p>Compreender de maneira mais clara e profunda o processo da alma e do espírito, na certeza de que tudo é passageiro e que somos todos integrantes de um projeto espiritual que nos dá a oportunidade de nos curar e de sermos também a manifestação da cura em movimento. Quanto mais consciência temos, mais a alma se expandirá.</p>
              </article>
              <article>
                <Heart aria-hidden="true" />
                <h3>Altruísmo</h3>
                <p>Colocar conhecimento, tempo e cuidado a serviço de toda a comunidade, de maneira desinteressada e alinhada aos princípios da caridade.</p>
              </article>
              <article>
                <Hand aria-hidden="true" />
                <h3>Não violência</h3>
                <p>Também conhecida como Ahimsa, que significa não causar dano às pessoas, à natureza ou aos animais. Optamos por escolher a vida, alinhada aos princípios da compaixão, compreendendo que todos os seres merecem ser vistos com respeito, escuta e acolhimento.</p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.testimonials} aria-labelledby="testimonials-title">
          <div className={styles.testimonialsHeader}>
            <span className={styles.sectionLabel}>Depoimentos</span>
            <h2 id="testimonials-title">O que dizem sobre a Casa.</h2>
            <p>Experiências compartilhadas por pessoas que encontraram acolhimento, cuidado e conexão na Casa Sol.</p>
          </div>
          <div className={styles.testimonialGrid}>
            {googleReviews.map((review) => (
              <article className={styles.testimonialCard} key={review.author}>
                <div className={styles.reviewStars} aria-label="Avaliação de 5 estrelas">
                  {Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden="true" />)}
                </div>
                <blockquote>“{review.quote}”</blockquote>
                <footer>
                  <CircleUserRound aria-hidden="true" />
                  <div>
                    <strong>{review.author}</strong>
                    <span>Avaliação publicada no Google</span>
                  </div>
                </footer>
              </article>
            ))}
          </div>
          <a className={styles.reviewsLink} href={googleMapsUrl} target="_blank" rel="noreferrer">
            Ver avaliações no Google <ArrowRight aria-hidden="true" />
          </a>
        </section>

        <section className={styles.visit} aria-labelledby="visit-title">
          <div>
            <span className={styles.sectionLabel}>Próximo passo</span>
            <h2 id="visit-title">Venha conhecer a Casa Sol.</h2>
            <p>Confira nossa agenda para encontrar giras, projetos sociais e atividades abertas ao público.</p>
          </div>
          <a className={styles.sunButton} href="/calendario">
            Abrir calendário <ArrowRight aria-hidden="true" />
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <img src="/casa-sol/logo.png" alt="Casa Sol do Oriente" />
            <a href="https://maps.app.goo.gl/fiymuvcitenE4DKF7" target="_blank" rel="noreferrer">
              <MapPin aria-hidden="true" />
              <span>Rua Francisco Nunes, 437<br />Rebouças · Curitiba / PR</span>
            </a>
          </div>
          <div className={styles.footerColumn}>
            <strong>Casa Sol</strong>
            <a href="/historia">Nossa história</a>
            <a href="/ritualistica">Ritualística</a>
            <a href="/projetos">Projetos</a>
            <a href="/musicalidade">Musicalidade</a>
          </div>
          <div className={styles.footerColumn}>
            <strong>Participe</strong>
            <a href="/calendario">Calendário</a>
            <a href="/ingresso">Ingresso</a>
            <a href="/gira">Gira de segunda</a>
            <a href="/projetos/hospital-terapeutico">Hospital Terapêutico</a>
          </div>
          <div className={styles.footerColumn}>
            <strong>Conecte-se</strong>
            <a href="https://www.instagram.com/casasoldooriente/" target="_blank" rel="noreferrer">
              <AtSign aria-hidden="true" /> Instagram
            </a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <small>© {new Date().getFullYear()} Casa Universalista Sol do Oriente.</small>
          <a className={styles.footerCredit} href="http://www.tatiramos.com.br" target="_blank" rel="noreferrer">Desenvolvido por @tatiramos</a>
          <span>Curitiba · Paraná</span>
        </div>
      </footer>
    </div>
  );
}
