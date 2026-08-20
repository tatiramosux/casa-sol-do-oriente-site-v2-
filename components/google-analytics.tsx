"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const consentKey = "casa-sol-analytics-consent";
type Consent = "accepted" | "rejected" | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setConsent(localStorage.getItem(consentKey) as Consent);
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;

    const trackClick = (event: MouseEvent) => {
      const element = (event.target as HTMLElement).closest("a, button");
      if (!element || !window.gtag) return;

      const href = element instanceof HTMLAnchorElement ? element.href : "";
      const label = element.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) || "sem rótulo";
      const isWhatsApp = href.includes("wa.me") || href.includes("whatsapp");
      const isCta = isWhatsApp || element.matches("a[class*='button' i], button[class*='button' i]");

      if (isCta) {
        window.gtag("event", isWhatsApp ? "whatsapp_click" : "cta_click", {
          link_text: label,
          link_url: href || undefined,
          page_path: window.location.pathname,
        });
      }
    };

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, [consent]);

  if (!ready || !measurementId) return null;

  const saveConsent = (value: Exclude<Consent, null>) => {
    localStorage.setItem(consentKey, value);
    setConsent(value);
  };

  return (
    <>
      {consent === "accepted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              analytics_storage: 'granted',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });
            gtag('js', new Date());
            gtag('config', '${measurementId}', { anonymize_ip: true });
          `}</Script>
        </>
      )}

      {consent === null ? (
        <section className="cookie-consent" aria-label="Preferências de cookies">
          <div>
            <strong>Privacidade e análise de acesso</strong>
            <p>Usamos cookies opcionais do Google Analytics para entender visitas e cliques e melhorar o site. Você pode aceitar ou recusar.</p>
          </div>
          <div className="cookie-consent-actions">
            <button type="button" className="cookie-reject" onClick={() => saveConsent("rejected")}>Recusar</button>
            <button type="button" className="cookie-accept" onClick={() => saveConsent("accepted")}>Aceitar análise</button>
          </div>
        </section>
      ) : (
        <button className="cookie-settings" type="button" onClick={() => setConsent(null)} aria-label="Alterar preferências de cookies">
          Cookies
        </button>
      )}
    </>
  );
}
