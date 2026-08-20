import { FaqAccordion } from "../../../components/faq-accordion";
import { InternalHero } from "../../../components/internal-hero";
import { SiteFooter, SiteHeader } from "../../../components/site-chrome";
import styles from "../../internal.module.css";

const therapies = [
  ["Reiki", "icon-reiki.png", "Técnica de imposição de mãos voltada ao equilíbrio da energia vital, relaxamento e harmonização emocional."],
  ["Araporã", "icon-arapora.png", "Terapia energética que trabalha pontos do corpo para apoiar o fluxo da energia vital."],
  ["Auriculoterapia", "icon-auriculo.png", "Prática que estimula pontos específicos da orelha como apoio a diferentes necessidades de cuidado."],
  ["Constelação familiar", "icon-constelacao.png", "Abordagem voltada à compreensão de padrões emocionais e relacionais presentes no sistema familiar."],
  ["Barra de Access", "icon-barra-access.png", "Toques suaves em pontos da cabeça como prática de relaxamento, clareza e bem-estar."],
  ["Atendimento psicológico", "icon-psico.png", "Escuta conduzida por profissionais da psicologia para apoiar questões emocionais e o autoconhecimento."],
] as const;
const faq = [
  { question: "Quando acontecem os atendimentos?", answer: "Na primeira quinta-feira de cada mês. Consulte sempre o calendário antes de se deslocar." },
  { question: "Como funciona o atendimento?", answer: "A equipe de terapeutas voluntários acolhe e analisa cada caso, indicando a prática mais adequada. Por isso, a terapia não é escolhida antecipadamente pelo participante." },
  { question: "É necessário agendamento?", answer: "Sim. Os atendimentos devem ser previamente agendados pelo formulário de inscrição do Hospital Terapêutico." },
  { question: "O que faço ao chegar?", answer: "Apresente-se à recepção e informe seu nome. A equipe orientará o atendimento e o horário correspondente." },
];

export default function HospitalTerapeutico() { return <div className={styles.page}><SiteHeader active="/projetos" /><main>
  <InternalHero eyebrow="Projeto social" title="Hospital Terapêutico" description="Terapias integrativas e suporte psicológico oferecidos à comunidade em um ambiente de acolhimento, escuta e cuidado." image="/casa-sol/banner-hospital.webp" />
  <section className={styles.section}><div className={styles.sectionHeader}><p className={styles.sectionLabel}>Sobre o projeto</p><h2>Cuidado complementar, acessível à comunidade.</h2><p>O Hospital Terapêutico acontece na primeira quinta-feira do mês e reúne terapeutas voluntários. O projeto também atua como apoio complementar às cirurgias espirituais realizadas às segundas-feiras.</p></div><div className={styles.therapyGrid}>{therapies.map(([name,image,text]) => <article className={styles.therapyCard} key={name}><img src={`/casa-sol/terapias/${image}`} alt="" /><h3>{name}</h3><p>{text}</p></article>)}</div></section>
  <section className={`${styles.section} ${styles.exchangeSection}`}><div className={styles.sectionHeader}><p className={styles.sectionLabel}>Cuidado que circula</p><h2>Contribuição de troca.</h2><p>Como forma de troca pelo atendimento, convidamos cada pessoa inscrita a contribuir com um kit de higiene destinado ao projeto As Rosas Falam, da Casa do Pai Chico.</p><p>O projeto atende mulheres em situação de vulnerabilidade na Vila Torres. A lista atualizada de itens é publicada no Instagram junto com o anúncio de cada nova data.</p><a className={styles.outlineButton} href="https://www.instagram.com/casasoldooriente/" target="_blank" rel="noreferrer">Consultar a lista no Instagram</a></div></section>
  <section className={styles.sectionNarrow}><div className={styles.sectionHeader}><p className={styles.sectionLabel}>Como participar</p><h2>Orientações para o atendimento.</h2></div><FaqAccordion items={faq} /><div className={styles.alert}><strong>Importante:</strong> as práticas integrativas são complementares e não substituem diagnóstico, acompanhamento ou tratamento médico e psicológico convencional.</div><div className={styles.formAction}><a className={styles.outlineButton} href="https://docs.google.com/forms/d/e/1FAIpQLSdmSTuoVCW4-dr_w6_j1GYfQdTlTAyQz5KLL7UXIKGSiOGmpg/viewform" target="_blank" rel="noreferrer">Abrir formulário de inscrição</a><p><strong>Quando as inscrições abrem?</strong> O formulário é liberado somente após a divulgação da nova data, geralmente cerca de dois a três dias antes do atendimento.</p></div></section>
  <section className={styles.cta}><div><h2>Quer contribuir como terapeuta?</h2><p>Profissionais voluntários ajudam a ampliar essa rede de cuidado e apoio à comunidade.</p></div><a className={styles.primaryButton} href="https://wa.me/5541984247771?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20Hospital%20Terap%C3%AAutico." target="_blank" rel="noreferrer">Falar com a Casa</a></section>
  </main><SiteFooter /></div>; }
