import { InternalHero } from "../../components/internal-hero";
import { SiteFooter, SiteHeader } from "../../components/site-chrome";
import styles from "../internal.module.css";

const paths = [
  {
    tag: "Segundas-feiras",
    title: "Gira e cirurgia espiritual",
    text: "Atendimentos espirituais com acolhimento inicial, orientação e acompanhamento conforme cada caso.",
    href: "/gira",
  },
  {
    tag: "Conhecimento ritualístico",
    title: "Amalá",
    text: "Orientações sobre preparo, elementos e entrega das oferendas dentro das práticas adotadas pela Casa.",
    href: "/amala",
  },
];
export default function Ritualistica() {
  return (
    <div className={styles.page}>
      <SiteHeader active="/ritualistica" />
      <main>
        <InternalHero
          eyebrow="Cuidado espiritual"
          title="Nossa ritualística"
          description="Conheça as práticas, os atendimentos e as orientações que sustentam os trabalhos da Casa Sol do Oriente."
          image="/casa-sol/banner-ritualistica.webp"
        />
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Caminhos de cuidado</p>
            <h2>Tradição, orientação e acolhimento.</h2>
            <p>
              Cada atividade possui uma finalidade e uma forma própria de
              participação. Reunimos aqui os principais caminhos para você
              encontrar a orientação adequada.
            </p>
          </div>
          <div className={styles.pathGrid}>
            {paths.map((p) => (
              <a className={styles.pathCard} key={p.title} href={p.href}>
                <span className={styles.pathTag}>{p.tag}</span>
                <h2>{p.title}</h2>
                <p>{p.text}</p>
                <span className={styles.cardAction}>Conhecer esta prática <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>
        </section>
        <section className={styles.cta}>
          <div>
            <h2>Planeje sua visita.</h2>
            <p>
              Datas, horários e condições de acesso estão sempre atualizados na
              agenda.
            </p>
          </div>
          <a className={styles.primaryButton} href="/calendario">
            Ver próximos encontros
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
