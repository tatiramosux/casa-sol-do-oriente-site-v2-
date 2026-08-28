"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const projectLinks = [
  ["A vida continua", "/projetos/a-vida-continua"],
  ["Hospital Terapêutico", "/projetos/hospital-terapeutico"],
  ["Firmando os trabalhos", "/projetos/firmando-os-trabalhos"],
  ["Pão solidário da Vó Margarida", "/projetos/pao-solidario"],
  ["Apometria", "/projetos/apometria"],
] as const;

export function ProjectsMenu({ active = false }: { active?: boolean }) {
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (menuRef.current?.open && !menuRef.current.contains(event.target as Node)) {
        menuRef.current.open = false;
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuRef.current?.open) {
        menuRef.current.open = false;
        menuRef.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <details ref={menuRef} className="projects-menu" data-active={active || undefined}>
      <summary>Projetos <ChevronDown aria-hidden="true" /></summary>
      <div className="projects-menu-panel" onClick={() => { if (menuRef.current) menuRef.current.open = false; }}>
        <a href="/projetos"><strong>Todos os projetos</strong><small>Conheça nossa rede de apoio</small></a>
        {projectLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </div>
    </details>
  );
}
