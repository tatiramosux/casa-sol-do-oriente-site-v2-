"use client";

import { useCallback, useEffect, useState } from "react";
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
    title: "Palestra com Prof. Wagner Borges",
    badge: "Evento",
    eyebrow: "Parceria Editora KOI",
    image: "/casa-sol/projeto-5.webp",
    href: "https://wagnerborges.koieditora.com.br/",
    external: true,
    actionLabel: "Saiba mais",
    dateKey: null,
    fixedDate: "09, 10 e 11 de outubro",
    alt: "Altar da Casa Sol do Oriente iluminado, com o hexagrama e a espada ao centro",
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
    alt: "Arte do projeto Hospital Terapêutico da Casa Sol do Oriente",
    description:
      "Terapias complementares e suporte psicológico oferecidos à comunidade por uma rede de terapeutas voluntários.",
  },
  {
    title: "A vida continua",
    badge: "Projeto social",
    eyebrow: "Acolhimento ao luto",
    image: "/casa-sol/projeto-4-hd.jpg",
    href: "/projetos/a-vida-continua",
    external: false,
    actionLabel: "Conheça o projeto",
    dateKey: "griefSupport",
    fixedDate: null,
    alt: "Arte do projeto A Vida Continua, da Casa Sol do Oriente",
    description:
      "Um espaço seguro de escuta para quem atravessa o luto — pela perda de uma pessoa, uma relação, um sonho ou uma grande mudança de vida.",
  },
  {
    title: "Firmando os trabalhos",
    badge: "Projeto social",
    eyebrow: "Rede de apoio",
    image: "/casa-sol/projeto-3-hd.jpg",
    href: "/projetos/firmando-os-trabalhos",
    external: false,
    actionLabel: "Conheça o projeto",
    dateKey: null,
    fixedDate: null,
    alt: "Arte do projeto Firmando os Trabalhos da Casa Sol do Oriente",
    description:
      "Uma rede que aproxima profissionais, empreendedores e a comunidade para compartilhar oportunidades e fortalecer novos caminhos.",
  },
  {
    title: "Pão solidário da Vó Margarida",
    badge: "Projeto social",
    eyebrow: "Ação comunitária",
    image: "/casa-sol/projeto-2-hd.jpg",
    href: "/projetos/pao-solidario",
    external: false,
    actionLabel: "Conheça o projeto",
    dateKey: null,
    fixedDate: null,
    alt: "Arte do projeto Pão Solidário da Vó Margarida",
    description:
      "Médiuns voluntários preparam e distribuem pães à comunidade dos arredores da Casa, levando alimento, presença e cuidado.",
  },
] as const;

type ProjectDateKey = Exclude<(typeof projects)[number]["dateKey"], null>;
type UpcomingProjectDates = Partial<Record<ProjectDateKey, string>>;

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

const googleMapsUrl = "https://www.google.com/maps/place/Casa+Sol+do+Oriente/@-25.4451668,-49.2570482,17z/data=!4m8!3m7!1s0x94dce567845c3b19:0x7897c51f987ed45f!8m2!3d-25.4451668!4d-49.2570482!9m1!1b1!16s%2Fg%2F11l2z0qzrp";

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [paused, setPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [upcomingProjectDates, setUpcomingProjectDates] =
    useState<UpcomingProjectDates | null>(null);

  const goTo = useCallback((index: number) => {
    setActiveProject((index + projects.length) % projects.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(
      () => setActiveProject((current) => (current + 1) % projects.length),
      10000,
    );
    return () => window.clearTimeout(timer);
  }, [activeProject, paused]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/calendar/upcoming-projects", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled && data?.dates) setUpcomingProjectDates(data.dates);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const project = projects[activeProject];

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
            {projects.map((item, index) => (
              <img
                key={item.title}
                className={`${styles.projectImage} ${index === activeProject ? styles.projectImageActive : ""}`}
                src={item.image}
                alt={index === activeProject ? item.alt : ""}
                aria-hidden={index !== activeProject}
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
              {projects.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={index === activeProject ? styles.activeNumber : undefined}
                  aria-label={`Mostrar ${item.badge.toLocaleLowerCase("pt-BR")} ${index + 1}: ${item.title}`}
                  aria-current={index === activeProject ? "true" : undefined}
                  onClick={() => goTo(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{item.title}</small>
                </button>
              ))}
            </div>
            <div className={styles.carouselControls}>
              <button type="button" onClick={() => goTo(activeProject - 1)} aria-label="Projeto anterior"><ArrowLeft /></button>
              <button type="button" onClick={() => goTo(activeProject + 1)} aria-label="Próximo projeto"><ArrowRight /></button>
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
                Nossa Casa é muito mais do que um local para giras e cirurgias espirituais. Aqui,
                trabalhamos para oferecer projetos e iniciativas sociais que dão suporte à comunidade.
              </p>
              <p>
                Nossa missão é transformar vidas e proporcionar um espaço de acolhimento e esperança.
                Consulte as datas dos próximos encontros e venha fazer parte dessa jornada de amor e
                solidariedade.
              </p>
              <a className={styles.outlineButton} href="/historia">
                Conheça nossa história <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className={styles.valuesSection} aria-labelledby="values-title">
            <div className={styles.sectionLabel}>Valores</div>
            <h2 id="values-title" className={styles.valuesTitle}>O que orienta nossa caminhada.</h2>
            <div className={styles.values}>
              <article>
                <Sun aria-hidden="true" />
                <h3>Expansão da consciência</h3>
                <p>Aprender, despertar e aprofundar a conexão consigo, com o próximo e com o sagrado.</p>
              </article>
              <article>
                <Heart aria-hidden="true" />
                <h3>Altruísmo</h3>
                <p>Colocar conhecimento, tempo e cuidado a serviço do bem-estar de toda a comunidade.</p>
              </article>
              <article>
                <Hand aria-hidden="true" />
                <h3>Não violência</h3>
                <p>Agir com respeito, escuta e responsabilidade, acolhendo cada pessoa e sua jornada.</p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.testimonials} aria-labelledby="testimonials-title">
          <div className={styles.testimonialsHeader}>
            <span className={styles.sectionLabel}>Depoimentos</span>
            <h2 id="testimonials-title">O que dizem sobre a Casa.</h2>
            <p>Experiências compartilhadas por pessoas que encontraram acolhimento, cuidado e conexão na Casa SOL.</p>
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
            <h2 id="visit-title">Venha conhecer a Casa SOL.</h2>
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
            <strong>Casa SOL</strong>
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
