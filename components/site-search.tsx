"use client";

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";

const searchablePages = [
  { title: "Início", description: "Casa Sol, valores, acolhimento e projetos sociais", href: "/", keywords: "casa sol endereço curitiba consciência altruísmo não violência" },
  { title: "Nossa história", description: "Trajetória, princípios e história da Casa", href: "/historia", keywords: "origem fundação memória valores" },
  { title: "Ritualística", description: "Práticas, atendimentos e caminhos espirituais", href: "/ritualistica", keywords: "ritual umbanda espiritualidade práticas" },
  { title: "Gira e perguntas frequentes", description: "Orientações para os atendimentos de segunda-feira", href: "/gira", keywords: "faq dúvidas cirurgia espiritual segunda inscrição atendimento" },
  { title: "Amalá", description: "Preparo, elementos e entrega de oferendas", href: "/amala", keywords: "orixá oferenda componentes entrega ritual" },
  { title: "Projetos sociais", description: "Acolhimento, Hospital Terapêutico, rede de apoio e Pão Solidário", href: "/projetos", keywords: "a vida continua luto terapia terapeuta kit higiene rosas falam inscrição cuidado firmando trabalhos pão vó margarida" },
  { title: "A vida continua", description: "Projeto de acolhimento ao luto", href: "/projetos/a-vida-continua", keywords: "perda escuta acolhimento luto" },
  { title: "Hospital Terapêutico", description: "Terapias, inscrições e contribuição de troca", href: "/projetos/hospital-terapeutico", keywords: "terapia terapeuta kit higiene rosas falam inscrição cuidado" },
  { title: "Firmando os trabalhos", description: "Rede profissional e comunitária", href: "/projetos/firmando-os-trabalhos", keywords: "profissional empreendedor oportunidade trabalho apoio" },
  { title: "Pão solidário da Vó Margarida", description: "Preparo e distribuição comunitária de pães", href: "/projetos/pao-solidario", keywords: "pão alimento doação voluntário solidariedade" },
  { title: "Apometria", description: "Informações e orientações sobre os atendimentos", href: "/projetos/apometria", keywords: "tratamento espiritual indicação atendimento energético" },
  { title: "Musicalidade", description: "Playlists, pontos, apostila e toques básicos", href: "/musicalidade", keywords: "youtube música atabaque umbanda preto velho caboclo boiadeiro cigano marinheiro baiano quimbanda" },
  { title: "Calendário", description: "Datas, horários e próximos encontros", href: "/calendario", keywords: "agenda evento programação gira curso palestra data" },
  { title: "Ingresso", description: "Orientações para integrar a corrente mediúnica", href: "/ingresso", keywords: "ingressar médium corrente mediúnica participação documentos" },
  { title: "Estatuto", description: "Documento institucional da Casa", href: "/ingresso/estatuto", keywords: "estatuto documento regras organização" },
  { title: "Regimento Interno", description: "Normas de funcionamento e convivência", href: "/ingresso/regimento-interno", keywords: "regimento interno normas deveres direitos médium" },
];

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const term = normalize(query);
    if (!term) return searchablePages.slice(0, 5);
    const words = term.split(/\s+/);
    return searchablePages.filter((page) => {
      const content = normalize(`${page.title} ${page.description} ${page.keywords}`);
      return words.every((word) => content.includes(word));
    }).slice(0, 6);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  const navigate = (href: string) => { window.location.assign(href); };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (results[active]) navigate(results[active].href);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") { setOpen(false); setQuery(""); }
    if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => Math.min(value + 1, results.length - 1)); }
    if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)); }
  };

  return (
    <div className="site-search" data-open={open} ref={rootRef}>
      {open ? (
        <form className="site-search-form" role="search" onSubmit={submit}>
          <Search aria-hidden="true" />
          <label className="sr-only" htmlFor="site-search-input">Buscar no site</label>
          <input id="site-search-input" ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); }} onKeyDown={onKeyDown} type="search" role="combobox" placeholder="O que você procura?" autoComplete="off" aria-controls="site-search-results" aria-expanded="true" aria-autocomplete="list" />
          <button type="button" onClick={() => { setOpen(false); setQuery(""); }} aria-label="Fechar busca"><X /></button>
        </form>
      ) : (
        <button className="site-search-trigger" type="button" onClick={() => setOpen(true)} aria-label="Abrir busca no site"><Search /></button>
      )}

      {open && (
        <div className="site-search-results" id="site-search-results" role="listbox" aria-label="Resultados da busca">
          {results.length ? results.map((result, index) => (
            <button key={result.href} type="button" role="option" aria-selected={index === active} className={index === active ? "active" : undefined} onMouseEnter={() => setActive(index)} onClick={() => navigate(result.href)}>
              <span><strong>{result.title}</strong><small>{result.description}</small></span><ArrowRight aria-hidden="true" />
            </button>
          )) : <p>Nenhum conteúdo encontrado. Tente outra palavra.</p>}
        </div>
      )}
    </div>
  );
}
