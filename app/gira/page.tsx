import { InternalHero } from "../../components/internal-hero";
import { FaqAccordion } from "../../components/faq-accordion";
import { SiteFooter, SiteHeader } from "../../components/site-chrome";
import styles from "../internal.module.css";
const faq = [
  {
    q: "Quando ocorrem os atendimentos?",
    a: "Todas as segundas-feiras, a partir das 18h30, conforme as datas publicadas no calendário da Casa.",
  },
  {
    q: "Como posso agendar meu atendimento?",
    a: "Todos os atendimentos devem ser previamente agendados pelo formulário de inscrição disponibilizado para a gira.",
  },
  {
    q: "O que devo fazer quando chegar?",
    a: "Ao chegar, dirija-se à mesa de anamnese. A equipe fará o acolhimento e orientará os próximos passos.",
  },
  {
    q: "Como funciona a solicitação para cirurgia espiritual?",
    a: "Leia atentamente as orientações e a quantidade de sessões indicadas em sua ficha. Em caso de dúvida, procure a hierarquia da Casa.",
  },
  {
    q: "Preciso de mais informações. E agora?",
    a: "Fale conosco pelo WhatsApp no botão flutuante desta página ou pelo Instagram da Casa.",
  },
];
export default function Gira() {
  return (
    <div className={styles.page}>
      <SiteHeader active="/ritualistica" />
      <main>
        <InternalHero
          eyebrow="Atendimentos às segundas"
          title="Gira de segunda"
          description="Um encontro de acolhimento, orientação e cuidado espiritual, realizado com respeito à tradição e à jornada de cada pessoa."
          image="/casa-sol/banner-gira.webp"
        />
        <section className={styles.sectionNarrow}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>
              Orientações para o atendimento
            </p>
            <h2>Perguntas frequentes</h2>
            <p>
              Reunimos as principais informações para você se preparar, chegar
              com tranquilidade e compreender como funciona o atendimento.
            </p>
          </div>
          <FaqAccordion
            items={faq.map((item) => ({ question: item.q, answer: item.a }))}
          />
          <div className={styles.alert}>
            <strong>Importante:</strong> os atendimentos terapêuticos e
            espirituais são complementares e não substituem diagnóstico,
            acompanhamento ou tratamento médico e psicológico convencional.
          </div>
          <a
            className={styles.outlineButton}
            href="https://docs.google.com/forms/d/e/1FAIpQLSfar3yA_Ql379-qLmO0kzfjhNjTSQLtP2LJ-FTJz2bGNecAeQ/viewform?usp=sf_link"
            target="_blank"
            rel="noreferrer"
          >
            Abrir formulário de inscrição
          </a>
        </section>
        <section className={styles.cta}>
          <div>
            <h2>Confira a próxima gira.</h2>
            <p>Consulte datas, horários e orientações atualizadas.</p>
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
