"use client";

import { usePathname } from "next/navigation";

/**
 * Espelha o primeiro grupo de cards ou blocos de cada página de destino:
 * mesma quantidade, mesmas colunas e mesma forma (card ou linha de accordion).
 * Ao criar ou alterar uma página, atualize também o perfil correspondente.
 */
const profiles = {
  "/": { cards: 3, columns: 3, shape: "card" }, // Valores
  "/historia": { cards: 2, columns: 1, shape: "card" }, // cards de pessoas
  "/gira": { cards: 5, columns: 1, shape: "row" }, // FAQ
  "/amala": { cards: 7, columns: 1, shape: "row" }, // ofertas por Orixá
  "/ritualistica": { cards: 2, columns: 2, shape: "card" }, // caminhos
  "/musicalidade": { cards: 7, columns: 3, shape: "card" }, // playlists
  "/projetos": { cards: 5, columns: 3, shape: "card" }, // índice de projetos
  "/ingresso": { cards: 2, columns: 2, shape: "card" }, // documentos oficiais
  "/ingresso/estatuto": { cards: 1, columns: 1, shape: "card" }, // visualizador de PDF
  "/ingresso/regimento-interno": { cards: 1, columns: 1, shape: "card" },
  "/calendario": { cards: 1, columns: 1, shape: "card" }, // grade do calendário
} as const;

function skeletonProfile(pathname = "") {
  const exact = profiles[pathname as keyof typeof profiles];
  if (exact) return exact;
  // Páginas de detalhe de projeto: três destaques em três colunas.
  if (pathname.startsWith("/projetos/"))
    return { cards: 3, columns: 3, shape: "card" } as const;
  return { cards: 3, columns: 3, shape: "card" } as const;
}

export function PageLoadingSkeleton({ pathname = "" }: { pathname?: string }) {
  const currentPathname = usePathname();
  const profile = skeletonProfile(pathname || currentPathname);
  return (
    <div className="page-loading-skeleton" role="status" aria-live="polite" aria-label="Carregando página">
      <span className="sr-only">Carregando página…</span>
      <div className="page-loading-header">
        <div className="page-loading-menu" />
        <div className="page-loading-logo" />
        <div className="page-loading-nav">
          <i /><i /><i /><i /><i /><i /><i />
        </div>
        <div className="page-loading-search" />
        <div className="page-loading-calendar" />
      </div>
      <div className="page-loading-hero">
        <div className="page-loading-hero-inner">
          <div className="page-loading-eyebrow" />
          <div className="page-loading-title" />
          <div className="page-loading-subtitle"><span /><span /></div>
        </div>
      </div>
      <div className="page-loading-content">
        <div className="page-loading-content-copy">
          <div className="page-loading-section-label" />
          <div className="page-loading-section-title" />
          <div className="page-loading-section-text"><span /><span /></div>
        </div>
        <div
          className="page-loading-cards"
          data-columns={profile.columns}
          data-shape={profile.shape}
        >
          {Array.from({ length: profile.cards }, (_, index) => <div key={index} />)}
        </div>
      </div>
    </div>
  );
}
