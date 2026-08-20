"use client";

import { usePathname } from "next/navigation";

function skeletonProfile(pathname = "") {
  if (pathname === "/projetos") return { cards: 4, columns: 4 };
  if (pathname === "/ritualistica") return { cards: 2, columns: 2 };
  if (pathname === "/ingresso") return { cards: 1, columns: 1 };
  if (pathname === "/historia") return { cards: 2, columns: 1 };
  if (pathname === "/musicalidade") return { cards: 6, columns: 3 };
  if (pathname.startsWith("/projetos/")) return { cards: 3, columns: 3 };
  return { cards: 3, columns: 3 };
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
        <div className="page-loading-cards" data-columns={profile.columns}>
          {Array.from({ length: profile.cards }, (_, index) => <div key={index} />)}
        </div>
      </div>
    </div>
  );
}
