import type { Metadata } from "next";
export const metadata: Metadata = { title: "Hospital Terapêutico", robots: { index: false, follow: true }, alternates: { canonical: "/projetos/hospital-terapeutico" } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
