import type { LucideIcon } from "lucide-react";
import { InternalHero } from "./internal-hero";
import { SiteFooter, SiteHeader } from "./site-chrome";
import styles from "../app/internal.module.css";

type Highlight = { icon: LucideIcon; title: string; description: string };
type ProjectDetailPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  sectionLabel: string;
  sectionTitle: string;
  paragraphs: string[];
  highlights: Highlight[];
  ctaTitle?: string;
  ctaText?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function ProjectDetailPage(props: ProjectDetailPageProps) {
  return (
    <div className={styles.page}>
      <SiteHeader active="/projetos" />
      <main>
        <InternalHero eyebrow={props.eyebrow} title={props.title} description={props.description} image={props.image} />
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>{props.sectionLabel}</p>
            <h2>{props.sectionTitle}</h2>
            {props.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className={`${styles.featureGrid} ${styles.featureGridCompact}`}>
            {props.highlights.map(({ icon: Icon, title, description }) => <article className={styles.featureCard} key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </section>
        {props.ctaTitle && props.ctaText && props.ctaLabel && props.ctaHref && <section className={styles.cta}><div><h2>{props.ctaTitle}</h2><p>{props.ctaText}</p></div><a className={styles.primaryButton} href={props.ctaHref} target={props.ctaHref.startsWith("http") ? "_blank" : undefined} rel={props.ctaHref.startsWith("http") ? "noreferrer" : undefined}>{props.ctaLabel}</a></section>}
      </main>
      <SiteFooter />
    </div>
  );
}
