import { ArrowRight, FileText, ListChecks } from "lucide-react";
import { InternalHero } from "../../components/internal-hero";
import { SiteFooter, SiteHeader } from "../../components/site-chrome";
import styles from "../internal.module.css";

const documents = [
  { href: "/ingresso/regimento-interno", title: "Regimento Interno", description: "Normas de funcionamento, convivência, direitos e deveres da comunidade mediúnica." },
  { href: "/ingresso/estatuto", title: "Estatuto", description: "Princípios, finalidades e organização institucional da Casa Universalista Sol do Oriente." },
] as const;

export default function Ingresso() {
  return <div className={styles.page}><SiteHeader active="/ingresso" /><main>
    <InternalHero eyebrow="Participação e compromisso" title="Ingresso" description="Um caminho de preparação, conhecimento e responsabilidade para quem deseja integrar a corrente mediúnica da Casa Sol do Oriente." image="/casa-sol/hero-ingresso-ritual.jpg" />
    <section className={styles.section}>
      <div className={styles.sectionHeader}><p className={styles.sectionLabel}>Como participar</p><h2>Tem interesse em participar da nossa corrente mediúnica?</h2><p>O ingresso acontece por meio de um processo de orientação, presença e preparação. Conheça abaixo as etapas necessárias para dar início a essa caminhada.</p></div>
      <div className={styles.ingressoGuidance}>
        <div className={styles.ingressoGuidanceHeader}>
          <span><ListChecks aria-hidden="true" /></span>
          <div><h3>Orientações para ingresso</h3></div>
        </div>
        <ul>
          <li>Procurar o <strong>Capitão responsável</strong> pela orientação e coleta das assinaturas.</li>
          <li>Participar de <strong>4 giras consecutivas</strong>, permanecendo até o final de cada gira para validação e assinando a ficha de presença.</li>
          <li>Conhecer seu <strong>Orixá</strong>. Caso ainda não saiba, será orientado o agendamento do <strong>jogo de Obi</strong> em uma gira de Caboclo.</li>
          <li>Participar do <strong>Curso de Umbanda I da Casa Sol do Oriente</strong>, requisito para a realização do <strong>AMACI</strong>.</li>
          <li>Na 3ª gira, o Capitão responsável efetuará o agendamento de uma <strong>consulta com as entidades chefes</strong>.</li>
          <li>Somente após a autorização das entidades será realizado o preenchimento da <strong>Ficha de Inscrição</strong> para ingresso na Casa.</li>
          <li>É obrigatória a leitura do <strong>Estatuto</strong> e do <strong>Regimento Interno</strong> para todos os novos ingressantes na corrente mediúnica.</li>
        </ul>
      </div>
    </section>
    <section className={`${styles.section} ${styles.documentSection}`}>
      <div className={styles.sectionHeader}><p className={styles.sectionLabel}>Leitura obrigatória</p><h2>Documentação para médiuns e ingressantes.</h2><p>Conheça os documentos que orientam a organização, a convivência e o compromisso de quem integra a Casa.</p></div>
      <div className={styles.documentGrid}>{documents.map((document) => <a className={styles.documentCard} key={document.href} href={document.href}><div className={styles.documentIcon}><FileText aria-hidden="true" /></div><div><strong>{document.title}</strong><p>{document.description}</p><span>Consultar documento <ArrowRight aria-hidden="true" /></span></div></a>)}</div>
    </section>
  </main><SiteFooter /></div>;
}
