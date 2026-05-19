"use client";

import { useState } from "react";

export function ShareButton({ title, text }: { title: string; text: string }) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const share = { title, text, url };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(share);
        return;
      } catch {
        /* fall through to clipboard */
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-full border border-orange/40 px-4 py-2 text-sm font-semibold text-orange hover:bg-orange/10"
    >
      {copied ? "✓ 복사됨" : "🔗 공유"}
    </button>
  );
}
