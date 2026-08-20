import { createPageMetadata } from "../../lib/site";
export const metadata = createPageMetadata({ title: "Calendário", description: "Consulte datas, horários e orientações para giras, cursos, projetos sociais e atendimentos da Casa SOL.", path: "/calendario", image: "/casa-sol/banner-calendar.webp" });
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
