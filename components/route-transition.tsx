"use client";

import { useEffect, useState } from "react";
import { PageLoadingSkeleton } from "./page-loading-skeleton";

export function RouteTransition() {
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  useEffect(() => {
    const reset = () => setLoadingPath(null);
    const show = () => setLoadingPath(window.location.pathname);
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as Element | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const next = new URL(anchor.href, window.location.href);
      const current = new URL(window.location.href);
      if (next.origin !== current.origin) return;
      if (next.pathname === current.pathname && next.search === current.search) return;

      event.preventDefault();
      setLoadingPath(next.pathname);
      window.requestAnimationFrame(() => window.location.assign(next.href));
    };

    document.addEventListener("click", navigate);
    window.addEventListener("pageshow", reset);
    window.addEventListener("popstate", show);
    return () => {
      document.removeEventListener("click", navigate);
      window.removeEventListener("pageshow", reset);
      window.removeEventListener("popstate", show);
    };
  }, []);

  return loadingPath ? <PageLoadingSkeleton pathname={loadingPath} /> : null;
}
