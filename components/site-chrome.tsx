"use client";

import { useState } from "react";
import { AtSign, CalendarDays, MapPin, Menu, X } from "lucide-react";
import styles from "../app/internal.module.css";
import { SiteSearch } from "./site-search";
import { ProjectsMenu } from "./projects-menu";
import { IngressoMenu } from "./ingresso-menu";
import { RitualisticaMenu } from "./ritualistica-menu";

const links = [
  ["Início", "/"],
  ["História", "/historia"],
  ["Ingresso", "/ingresso"],
  ["Projetos", "/projetos"],
  ["Ritualística", "/ritualistica"],
  ["Musicalidade", "/musicalidade"],
  ["Calendário", "/calendario"],
] as const;

export function SiteHeader({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.siteHeader}>
      <button className={styles.menuButton} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"}>
        {open ? <X /> : <Menu />}
      </button>
      <a className={styles.brand} href="/" aria-label="Casa Sol do Oriente — início">
        <img src="/casa-sol/logo.png" alt="Casa Sol do Oriente" />
      </a>
      <nav className={styles.desktopNav} aria-label="Navegação principal">
        {links.map(([label, href]) => href === "/projetos" ? <ProjectsMenu key={href} active={active === href} /> : href === "/ingresso" ? <IngressoMenu key={href} active={active === href} /> : href === "/ritualistica" ? <RitualisticaMenu key={href} active={active === href} /> : <a key={href} href={href} aria-current={active === href ? "page" : undefined}>{label}</a>)}
      </nav>
      <SiteSearch />
      <a className={styles.headerCta} href="/calendario" aria-label="Ver próximos encontros"><CalendarDays aria-hidden="true" /><span>Ver próximos encontros</span></a>
      {open && (
        <nav className={styles.mobileNav} aria-label="Navegação mobile">
          {links.map(([label, href]) => href === "/projetos" ? <ProjectsMenu key={href} active={active === href} /> : href === "/ingresso" ? <IngressoMenu key={href} active={active === href} /> : href === "/ritualistica" ? <RitualisticaMenu key={href} active={active === href} /> : <a key={href} href={href}>{label}</a>)}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div className={styles.footerBrand}>
          <img src="/casa-sol/logo.png" alt="Casa Sol do Oriente" />
          <a href="https://maps.app.goo.gl/fiymuvcitenE4DKF7" target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /><span>Rua Francisco Nunes, 437<br />Rebouças · Curitiba / PR</span></a>
        </div>
        <div className={styles.footerColumn}><strong>Casa Sol</strong><a href="/historia">Nossa história</a><a href="/ritualistica">Ritualística</a><a href="/projetos">Projetos</a><a href="/musicalidade">Musicalidade</a></div>
        <div className={styles.footerColumn}><strong>Participe</strong><a href="/calendario">Calendário</a><a href="/ingresso">Ingresso</a><a href="/gira">Gira de segunda</a><a href="/projetos/hospital-terapeutico">Hospital Terapêutico</a></div>
        <div className={styles.footerColumn}><strong>Conecte-se</strong><a href="https://www.instagram.com/casasoldooriente/" target="_blank" rel="noreferrer"><AtSign aria-hidden="true" />Instagram</a></div>
      </div>
      <div className={styles.footerBottom}><small>© {new Date().getFullYear()} Casa Universalista Sol do Oriente.</small><a className={styles.footerCredit} href="http://www.tatiramos.com.br" target="_blank" rel="noreferrer">Desenvolvido por @tatiramos</a><span>Curitiba · Paraná</span></div>
    </footer>
  );
}
