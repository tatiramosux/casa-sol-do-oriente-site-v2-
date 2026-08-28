import {
  Activity,
  Armchair,
  BriefcaseBusiness,
  Flower2,
  Wheat,
} from "lucide-react";
import { InternalHero } from "../../components/internal-hero";
import { SiteFooter, SiteHeader } from "../../components/site-chrome";
import styles from "../internal.module.css";

const projects = [
  { href: "/projetos/a-vida-continua", title: "A vida continua", label: "Acolhimento ao luto", Icon: Flower2 },
  { href: "/projetos/hospital-terapeutico", title: "Hospital Terapêutico", label: "Terapias integrativas", Icon: Activity },
  { href: "/projetos/firmando-os-trabalhos", title: "Firmando os trabalhos", label: "Rede de apoio", Icon: BriefcaseBusiness },
  { href: "/projetos/pao-solidario", title: "Pão solidário da Vó Margarida", label: "Ação comunitária", Icon: Wheat },
  { href: "/projetos/apometria", title: "Apometria", label: "Cuidado espiritual", Icon: Armchair },
] as const;

export default function Projetos() {
  return <div className={styles.page}><SiteHeader active="/projetos" /><main>
    <InternalHero eyebrow="Presença, cuidado e serviço" title="Projetos sociais" description="Iniciativas que acolhem necessidades reais e transformam o cuidado recebido em cuidado compartilhado com toda a comunidade." image="/casa-sol/banner-hero.webp" />
    <section className={styles.section}><div className={styles.sectionHeader}><p className={styles.sectionLabel}>Nossa rede de apoio</p><h2>Cinco caminhos, um mesmo compromisso.</h2><p>Cada projeto nasce da escuta e do trabalho voluntário. Escolha uma iniciativa para conhecer sua história, orientações e formas de participação.</p></div><div className={styles.projectIndex}>{projects.map(({ href, title, label, Icon }) => <a key={href} href={href} aria-label={`Conhecer o projeto ${title}`}><div className={styles.projectCardIcon}><Icon aria-hidden="true" /></div><div className={styles.projectCardContent}><small>{label}</small><strong>{title}</strong><span>Conhecer o projeto <b aria-hidden="true">→</b></span></div></a>)}</div></section>
    <section className={styles.cta}><div><h2>Quer contribuir com os projetos?</h2><p>Tempo, conhecimento, presença e doações ajudam essa rede de cuidado a chegar mais longe.</p></div><a className={styles.primaryButton} href="https://wa.me/5541984247771?text=Ol%C3%A1%2C%20gostaria%20de%20contribuir%20com%20os%20projetos%20da%20Casa%20SOL." target="_blank" rel="noreferrer">Falar com a Casa</a></section>
  </main><SiteFooter /></div>;
}
