import { Download } from "lucide-react";
import { InternalHero } from "../../../components/internal-hero";
import { SiteFooter, SiteHeader } from "../../../components/site-chrome";
import styles from "../../internal.module.css";

const pdf = "/casa-sol/documentos/regimento-interno-casa-sol-2023.pdf";
export default function RegimentoInterno() { return <div className={styles.page}><SiteHeader active="/ingresso" /><main><InternalHero eyebrow="Documentação institucional" title="Regimento Interno" description="Normas de funcionamento, convivência, direitos e deveres da comunidade mediúnica." image="/casa-sol/banner-hero.webp" /><section className={styles.section}><div className={styles.sectionHeader}><p className={styles.sectionLabel}>Documento oficial</p><h2>Regimento Interno da Casa Sol do Oriente.</h2><p>Documento de novembro de 2023. A leitura é obrigatória para médiuns da Casa e pessoas em processo de ingresso.</p><a className={styles.outlineButton} href={pdf} download><Download aria-hidden="true" /> Baixar Regimento em PDF</a></div><iframe className={styles.documentViewer} src={pdf} title="Regimento Interno da Casa Sol do Oriente" /></section></main><SiteFooter /></div>; }
