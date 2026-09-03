import { InternalHero } from "../../components/internal-hero";
import { SiteFooter, SiteHeader } from "../../components/site-chrome";
import styles from "../internal.module.css";

export default function Historia() {
  return (
    <div className={styles.page}>
      <SiteHeader active="/historia" />
      <main>
        <InternalHero
          eyebrow="Sobre a Casa"
          title="Nossa história"
          description="Uma caminhada de ancestralidade, aprendizados e altruísmo que encontrou no Sol do Oriente a união entre a força Ocidental e a sabedoria do Oriente a serviço da cura e da transformação."
          image="/casa-sol/banner-historia.webp"
        />
        <section className={styles.section}>
          <div className={styles.historyStack}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel}>Como tudo começou</p>
              <h2>Uma Casa jovem, sustentada por uma longa caminhada.</h2>
              <p>Fundada em outubro de 2023, a Casa Sol do Oriente nasceu da união, dedicação e propósito de seus fundadores, Mãe Roberta de Iemanjá, diretora-geral e espiritual, e Pai William de Oxóssi, presidente da Casa. Juntos, são o alicerce dessa história e seguem conduzindo e fortalecendo a Casa, preservando seus princípios e mantendo vivo o propósito que deu origem a este espaço de fé, acolhimento e espiritualidade.</p>
              <div className={styles.historyPeopleGrid}>
                <article className={styles.historyPersonCard}>
                  <figure>
                  <img
                    src="/casa-sol/mae-roberta-iemanja.jpg"
                    alt="Mãe Roberta de Iemanjá"
                    width="697"
                    height="718"
                    loading="lazy"
                    decoding="async"
                  />
                  </figure>
                  <h3>Mãe Roberta de Iemanjá</h3>
                  <p>Caminha na Umbanda desde 2008 e é filha de Pai Jussaro de Ogum, do Terreiro do Pai Maneco. Sua trajetória espiritual também a levou à Índia, onde, por meio do Mestre Sathya Sai Baba, aprofundou os conhecimentos sobre a Bhagavad Gita e os valores humanos, experiências que contribuíram para ampliar a sua visão e caminho dentro da espiritualidade.</p>
                  <div className={styles.historyEntities}>
                    <h4>Entidades de trabalho</h4>
                    <ul>
                      <li><strong>Ogum:</strong> Caboclo Peri</li>
                      <li><strong>Oxóssi:</strong> Caboclo Junco Verde</li>
                      <li><strong>Xangô:</strong> Caboclo Serra Dourada</li>
                      <li><strong>Preto-velho(a):</strong> Vovó Margarida</li>
                      <li><strong>Erê:</strong> Mariazinha</li>
                      <li><strong>Baiano:</strong> Maria do Tacho</li>
                      <li><strong>Marinheiro:</strong> Tonho</li>
                      <li><strong>Boiadeiro:</strong> Seu Tião</li>
                      <li><strong>Cigana:</strong> Mama Rosa</li>
                      <li><strong>Oriente:</strong> Dr. Kiroto</li>
                      <li><strong>Exu:</strong> Tata Caveira e Tranca Rua das Almas</li>
                      <li><strong>Pomba-Gira:</strong> Maria Mulambro da Lixeira</li>
                      <li><strong>Pomba-Gira Mirim:</strong> Menina da Praia</li>
                    </ul>
                  </div>
                </article>
                <article className={styles.historyPersonCard}>
                  <figure>
                    <img
                      src="/casa-sol/pai-willian-ramasine-oxossi.jpg"
                      alt="Pai William de Oxóssi"
                      width="697"
                      height="718"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  <h3>Pai William de Oxóssi</h3>
                  <p>Também conhecido como Pai Hare, é filho de Pai Jussaro de Ogum e pai de santo desde 2022. Sua trajetória espiritual inclui estudos em geometria sagrada, terapias sonoras e física quântica, além de conhecimentos em alquimia e na manipulação do elemento fogo, experiências que ampliam sua compreensão e sua atuação dentro da espiritualidade.</p>
                  <div className={styles.historyEntities}>
                    <h4>Entidades de trabalho</h4>
                    <ul>
                      <li><strong>Ogum:</strong> Caboclo Titza</li>
                      <li><strong>Oxóssi:</strong> Caboclo Pena Verde</li>
                      <li><strong>Xangô:</strong> Caboclo Sete Trovoadas</li>
                      <li><strong>Preto-velho(a):</strong> Pai Dito</li>
                      <li><strong>Erê:</strong> Pedrinho</li>
                      <li><strong>Baiano:</strong> Negro Malandro do Pelourinho</li>
                      <li><strong>Marinheiro:</strong> Josué</li>
                      <li><strong>Boiadeiro:</strong> Luis</li>
                      <li><strong>Cigano:</strong> Juanito</li>
                      <li><strong>Oriente:</strong> Mestre Chong</li>
                      <li><strong>Exu:</strong> Seu Sete Brasas e Tranca Ruas da Encruzilhada</li>
                      <li><strong>Pomba-Gira:</strong> Pombagira cigana</li>
                      <li><strong>Exu Mirim:</strong> Brasinha</li>
                    </ul>
                  </div>
                </article>
              </div>
              <p>Juntos, Mãe Roberta e Pai William atuam diretamente na condução espiritual da Casa. Ao lado dos demais pais pequenos e da corrente mediúnica, preservam a linhagem do Terreiro do Pai Maneco com respeito às suas raízes, responsabilidade e compromisso com a comunidade, construindo diariamente a história da Casa Sol do Oriente.</p>
            </div>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel}>Espiritualidade e serviço</p>
              <h2>Espiritualidade colocada a serviço.</h2>
              <p>Além da tradição espiritual, a Casa Sol é comprometida com a caridade e o serviço à comunidade. Seus trabalhos são orientados pela expansão da consciência, pelo altruísmo e pela não violência.</p>
              <p>Por meio das práticas religiosas, terapias e ações sociais, buscamos fortalecer laços espirituais e contribuir com o bem-estar de quem procura luz, acolhimento e sabedoria em seu caminho.</p>
            </div>
          </div>
        </section>
        <section className={styles.cta}>
          <div>
            <h2>Conheça a Casa de perto.</h2>
            <p>
              Confira a agenda de giras, projetos e atividades abertas ao
              público.
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
