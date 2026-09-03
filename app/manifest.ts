import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Casa Universalista Sol do Oriente",
    short_name: "Casa Sol",
    description: "Acolhimento espiritual, projetos sociais e expansão da consciência em Curitiba.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5ef",
    theme_color: "#123d52",
    lang: "pt-BR",
    icons: [
      { src: "/icon-casa-sol-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-casa-sol-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
