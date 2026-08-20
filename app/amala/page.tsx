import { InternalHero } from "../../components/internal-hero";
import { FaqAccordion } from "../../components/faq-accordion";
import { SiteFooter, SiteHeader } from "../../components/site-chrome";
import styles from "../internal.module.css";

const offerings = [
  [
    "Oxalá",
    "Água, canjica branca cozida, flores brancas, sete velas brancas e incenso.",
  ],
  [
    "Ogum",
    "Cerveja branca, água ou suco; amendoim vermelho, manga espada, goiaba, espada-de-são-jorge, sete velas vermelhas e brancas e charuto.",
  ],
  [
    "Iemanjá",
    "Água ou espumante, manjar de coco, flores brancas, alfazema, sete velas azul-claras e incenso.",
  ],
  [
    "Oxóssi",
    "Cerveja branca, água ou suco; maracujá, carambola, kiwi, samambaia, sete velas verdes e charuto.",
  ],
  [
    "Oxum",
    "Água, melão, canjica amarela cozida com mel, flores amarelas, sete velas amarelas e incenso.",
  ],
  [
    "Xangô",
    "Cerveja preta, água ou suco; caqui, coroa de abacaxi, folhas de limão e café, quiabo cozido, sete velas marrons e charuto.",
  ],
  [
    "Iansã",
    "Água, flores e frutas laranjas, milho cozido, moranga, espada-de-santa-bárbara, sete velas laranjas e incenso.",
  ],
] as const;

export default function Amala() {
  return (
    <div className={styles.page}>
      <SiteHeader active="/ritualistica" />
      <main>
        <InternalHero
          eyebrow="Conhecimento ritualístico"
          title="Amalá"
          description="Orientações para preparar e entregar oferendas com intenção, respeito e consciência dentro das práticas da Casa."
          image="/casa-sol/banner-amala.webp"
        />
        <section className={styles.sectionNarrow}>
          <div className={styles.content}>
            <p className={styles.sectionLabel}>Fundamentos</p>
            <h2>O que é o Amalá?</h2>
            <p>
              Amalá é um conjunto de elementos que oferece ectoplasma com um
              propósito determinado. O preparo deve ser feito com presença: ao
              cozinhar ou escolher os alimentos, direcione pensamento, atenção e
              energia à intenção da entrega.
            </p>
            <h3>Quais elementos devem estar presentes?</h3>
            <p>
              Todo Amalá representa os cinco elementos — Água, Terra, Fogo, Ar e
              Éter — por meio de elementos da natureza. O Éter se manifesta na
              intenção e na forma-pensamento de conexão com o guia ou com a
              força do Orixá.
            </p>
            <h3>Onde a entrega deve ser feita?</h3>
            <p>
              A entrega pode ser organizada em alguidar, tábua ou folha grande.
              Na Casa, peça sempre a orientação de um capitão para saber qual
              velário utilizar. As velas são acesas no velário correspondente e
              não seguem junto da entrega.
            </p>
            <h2>Compondo o Amalá</h2>
            <p>
              Encontre abaixo os elementos que podem compor sua entrega de
              Amalá, de acordo com o Orixá ao qual ela será destinada.
            </p>
          </div>
          <FaqAccordion
            items={offerings.map(([name, text]) => ({
              question: name,
              answer: text,
            }))}
            initialOpen={null}
          />
          <div className={styles.alert}>
            Estas orientações registram a prática adotada pela Casa SOL. Em caso
            de dúvida, consulte a hierarquia antes de preparar ou realizar uma
            entrega.
          </div>
        </section>
        <section className={styles.cta}>
          <div>
            <h2>Precisa de orientação?</h2>
            <p>
              Converse com a hierarquia da Casa ou fale conosco antes de
              realizar sua entrega.
            </p>
          </div>
          <a
            className={styles.primaryButton}
            href="https://wa.me/5541984247771?text=Ol%C3%A1...%20Gostaria%20de%20obter%20maiores%20informa%C3%A7%C3%B5es%20sobre..."
            target="_blank"
            rel="noreferrer"
          >
            Falar com a Casa
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
