import { BookOpen, CirclePlay, Download, Music2 } from "lucide-react";
import { InternalHero } from "../../components/internal-hero";
import { SiteFooter, SiteHeader } from "../../components/site-chrome";
import styles from "../internal.module.css";

const playlists = [
  ["Ritual de Umbanda", "Pontos que acompanham a abertura, o desenvolvimento e o encerramento dos trabalhos de Umbanda.", "https://www.youtube.com/playlist?list=PLyQtzmZv-BuLZhHydgRKbpmnAk6_6A_je"],
  ["Pretos-Velhos", "Pontos de firmeza, acolhimento e sabedoria dedicados às linhas de Pretos-Velhos.", "https://youtube.com/playlist?list=PLyQtzmZv-BuJV9zEDM_HmHTWWSE3VTZ_B"],
  ["Caboclos", "Cantigas que sustentam a força, a cura e a presença das linhas de Caboclos.", "https://youtube.com/playlist?list=PLyQtzmZv-BuKKWPxVeKAHPNN7aGhLBLt1"],
  ["Cirurgia espiritual", "Seleção musical utilizada nos trabalhos de cuidado e cirurgia espiritual da Casa.", "https://www.youtube.com/playlist?list=PLyQtzmZv-BuJxGuOCMh9hUmzXY0rDlJjU"],
  ["Boiadeiros", "Pontos dedicados à força, à proteção e ao trabalho das linhas de Boiadeiros.", "https://youtube.com/playlist?list=PLyQtzmZv-BuLjJXwl-JQZbPAD1w82YsEK"],
  ["Ciganos, Marinheiros e Baianos", "Cantigas que reúnem a alegria e o movimento dos Ciganos, o balanço dos Marinheiros e a força espontânea dos Baianos.", "https://www.youtube.com/playlist?list=PLyQtzmZv-BuKEaTp6ZI4KMnntGE8K9NCP"],
  ["Quimbanda", "Seleção de pontos relacionados aos trabalhos e fundamentos de Quimbanda da Casa.", "https://youtube.com/playlist?list=PLyQtzmZv-BuIdj0qvvU28IaUWLqSNB1v6"],
] as const;

const bookletPdf = "/casa-sol/documentos/apostila-pontos-casa-sol-2026.pdf";

const drumLessons = [
  ["Samba Cabula", "https://youtu.be/eEs6o8v4v9A"],
  ["Ijexá", "https://youtu.be/Y08tJfHYShk"],
  ["Nagô", "https://youtu.be/XK_TZdYf5HE"],
  ["Congo", "https://www.youtube.com/watch?v=W1X6knDtMRI"],
  ["Congo de Ouro", "https://youtu.be/7BPpJwe8kf4"],
  ["Barravento", "https://youtu.be/H1H0LgZWVt8"],
] as const;

function AtabaqueIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="6.5" ry="2.5" />
      <path d="M5.5 5.2 7.3 19c.15 1.15 2.2 2 4.7 2s4.55-.85 4.7-2l1.8-13.8" />
      <path d="M6.4 11.5c3.5 1.2 7.7 1.2 11.2 0M7.1 17.2c3.1 1 6.7 1 9.8 0" />
      <path d="m8 7 1.2 13M16 7l-1.2 13" />
    </svg>
  );
}

function MediaCreditNote() {
  return (
    <aside className={styles.mediaCreditNote} aria-label="Créditos dos conteúdos externos">
      <strong>Sobre os conteúdos externos</strong>
      <p>As playlists e videoaulas reunidas nesta página são referências de estudo. A autoria e os respectivos créditos pertencem aos criadores e canais de origem. A Casa Sol do Oriente apenas organiza e disponibiliza os links de acesso para que pessoas interessadas possam conhecer e usufruir desses conteúdos.</p>
    </aside>
  );
}

export default function Musicalidade() {
  return (
    <div className={styles.page}>
      <SiteHeader active="/musicalidade" />
      <main>
        <InternalHero eyebrow="Cantigas, ritmo e fundamento" title="Musicalidade" description="Um espaço para aprender, escutar e preservar os pontos e toques que sustentam os trabalhos da Casa Sol do Oriente." image="/casa-sol/banner-musicalidade.webp" />

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Playlists da Casa</p>
            <h2>Pontos cantados para acompanhar cada caminho.</h2>
            <p>Organizamos nosso repertório por linhas e momentos do trabalho para facilitar a escuta, o estudo e a prática das cantigas utilizadas pela Casa.</p>
          </div>
          <MediaCreditNote />
          <div className={styles.musicGrid}>
            {playlists.map(([title, description, href]) => (
              <a className={styles.musicCard} key={title} href={href} target="_blank" rel="noreferrer" aria-label={`Ouvir playlist ${title} no YouTube`}>
                <div className={styles.musicIcon}><Music2 aria-hidden="true" /></div>
                <p className={styles.musicType}><CirclePlay aria-hidden="true" /> Playlist no YouTube</p>
                <h2>{title}</h2>
                <p>{description}</p>
                <span className={styles.comingSoon}>Ouvir playlist <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.musicResources}`}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Materiais de apoio</p>
            <h2>Aprendizado para além das giras.</h2>
            <p>Conteúdos de consulta para conhecer o repertório, compreender os fundamentos e praticar os ritmos adotados pela Casa.</p>
          </div>
          <div className={`${styles.resourceGrid} ${styles.resourceGridSingle}`}>
            <article className={styles.resourceCard}>
              <BookOpen aria-hidden="true" />
              <div><p className={styles.musicType}>Material de estudo</p><h3>Apostila do terreiro</h3><p>Baixe a apostila para acompanhar os pontos cantados e tocados em nossa Casa.</p><a className={styles.outlineButton} href={bookletPdf} download><Download aria-hidden="true" /> Download apostila de pontos</a></div>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Vídeos de aprendizado</p>
            <h2>Toques básicos usados na Casa.</h2>
            <p>Se você chegou até aqui, é porque deseja conhecer e aprender os toques de atabaque que acompanham os trabalhos da Casa. Esse aprendizado nasce da prática: são a dedicação, a constância e o tempo que desenvolvem a segurança, a escuta e a presença necessárias para tocar.</p>
            <p>O caminho de um Ogã, porém, não se limita ao domínio dos ritmos. Ele também pede aprofundamento nos fundamentos, disposição para continuar aprendendo e compromisso com o trabalho coletivo. Ao ampliar seu conhecimento, você contribui para o próprio aprimoramento, para o fortalecimento da Casa e para o engrandecimento da nossa religião.</p>
          </div>
          <MediaCreditNote />
          <div className={styles.drumGrid}>
            {drumLessons.map(([title, href]) => (
              <a className={styles.musicCard} key={title} href={href} target="_blank" rel="noreferrer" aria-label={`Assistir à videoaula do toque ${title} no YouTube`}>
                <div className={styles.musicIcon}><AtabaqueIcon /></div>
                <p className={styles.musicType}><CirclePlay aria-hidden="true" /> Videoaula no YouTube</p>
                <h2>{title}</h2>
                <p>Orientação prática para conhecer e exercitar o toque {title}.</p>
                <span className={styles.comingSoon}>Assistir à aula <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.cta}><div><h2>Venha vivenciar essa musicalidade.</h2><p>Consulte o calendário para conhecer as próximas atividades e orientações de participação.</p></div><a className={styles.primaryButton} href="/calendario">Ver próximos encontros</a></section>
      </main>
      <SiteFooter />
    </div>
  );
}
