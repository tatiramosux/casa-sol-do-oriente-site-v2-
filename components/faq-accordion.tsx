"use client";

import { useEffect, useState } from "react";
import styles from "../app/internal.module.css";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items, initialOpen = 0 }: { items: FaqItem[]; initialOpen?: number | null }) {
  const [openItems, setOpenItems] = useState<Set<number>>(
    () => new Set(initialOpen === null ? [] : [initialOpen]),
  );
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const sync = () => {
      setMobile(media.matches);
      if (media.matches) {
        setOpenItems((current) => new Set([...current].slice(0, 1)));
      }
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const toggle = (index: number) => {
    setOpenItems((current) => {
      if (current.has(index)) {
        const next = new Set(current);
        next.delete(index);
        return next;
      }
      if (mobile) return new Set([index]);
      return new Set(current).add(index);
    });
  };

  return (
    <div className={styles.faq}>
      {items.map((item, index) => (
        <details key={item.question} open={openItems.has(index)}>
          <summary onClick={(event) => { event.preventDefault(); toggle(index); }}>
            {item.question}
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
