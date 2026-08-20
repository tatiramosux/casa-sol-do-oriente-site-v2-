import { createPageMetadata } from "../../lib/site";

export const metadata = createPageMetadata({
  title: "Musicalidade",
  description: "Pontos cantados, toques, playlists e materiais de apoio da musicalidade da Casa Sol do Oriente.",
  path: "/musicalidade",
  image: "/casa-sol/banner-musicalidade.webp",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
