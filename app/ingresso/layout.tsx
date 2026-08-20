import { createPageMetadata } from "../../lib/site";

export const metadata = createPageMetadata({
  title: "Ingresso na Casa",
  description: "Orientações para ingresso na corrente mediúnica e documentos de leitura obrigatória da Casa Sol do Oriente.",
  path: "/ingresso",
  image: "/casa-sol/hero-ingresso-ritual.jpg",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
