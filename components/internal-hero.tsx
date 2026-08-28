import styles from "../app/internal.module.css";

export function InternalHero({ eyebrow, title, description, image, watermark = title }: { eyebrow: string; title: string; description: string; image: string; watermark?: string }) {
  const watermarkSize = watermark.length > 22 ? styles.heroWatermarkLong : watermark.length > 13 ? styles.heroWatermarkMedium : "";
  return (
    <section className={styles.hero} style={{ "--hero-image": `url(${image})` } as React.CSSProperties}>
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.heroDescription}>{description}</p>
      </div>
      <span className={`${styles.heroWatermark} ${watermarkSize}`} aria-hidden="true">{watermark}</span>
    </section>
  );
}
