import { createPageMetadata } from "../../lib/site";

export const metadata = createPageMetadata({
  title: "Projetos sociais",
  description: "Conheça os projetos sociais e comunitários da Casa Sol do Oriente: acolhimento ao luto, Hospital Terapêutico, rede de apoio e Pão Solidário.",
  path: "/projetos",
  image: "/casa-sol/banner-hero.webp",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
