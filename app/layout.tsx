import type {Metadata} from "next";
import {Cormorant_Garamond,DM_Sans} from "next/font/google";
import "./globals.css";
const display=Cormorant_Garamond({variable:"--font-display",subsets:["latin"],weight:["500","600","700"],style:["normal","italic"]});
const sans=DM_Sans({variable:"--font-sans",subsets:["latin"],weight:["400","500","600","700"]});
export const metadata:Metadata={title:"Calendário | Casa Sol do Oriente",description:"Agenda mensal de giras, cursos, palestras, apometria e projetos sociais da Casa Universalista Sol do Oriente.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>}
