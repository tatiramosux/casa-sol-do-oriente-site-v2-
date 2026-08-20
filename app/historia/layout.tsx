import { createPageMetadata } from "../../lib/site";
export const metadata = createPageMetadata({ title: "Nossa História", description: "Conheça a trajetória, a tradição espiritual e o compromisso comunitário da Casa Sol do Oriente.", path: "/historia", image: "/casa-sol/banner-historia.webp" });
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
