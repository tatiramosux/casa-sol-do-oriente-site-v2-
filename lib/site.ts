import type { Metadata } from "next";

export const siteConfig = {
  name: "Casa Universalista Sol do Oriente",
  shortName: "Casa SOL",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.casasoldooriente.com.br",
  description:
    "Casa Universalista Sol do Oriente: expansão da consciência, altruísmo, não violência, projetos sociais e acolhimento espiritual em Curitiba.",
  address: "Rua Francisco Nunes, 437 · Rebouças · Curitiba / PR",
  instagram: "https://www.instagram.com/casasoldooriente/",
};

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image: string;
};

export function createPageMetadata({ title, description, path, image }: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: path,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
