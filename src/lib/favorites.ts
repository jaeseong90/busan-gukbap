"use client";

import { useEffect, useState, useCallback } from "react";

const KEY = "busan-gukbap:favorites";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function write(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent("busan-gukbap:favorites"));
}

export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIds(read());
    setHydrated(true);
    const onChange = () => setIds(read());
    window.addEventListener("busan-gukbap:favorites", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("busan-gukbap:favorites", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const cur = read();
    const next = cur.includes(id)
      ? cur.filter((x) => x !== id)
      : [...cur, id];
    write(next);
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, has, toggle, hydrated, count: ids.length };
}
