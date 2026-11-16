"use client";

import { useState } from "react";

// 이메일 등 텍스트를 클립보드에 복사합니다. 복사가 막힌 환경에서는 텍스트를 선택해 줍니다.
export default function CopyButton({
  text,
  label,
  doneLabel,
  className = "btn",
}: {
  text: string;
  label: string;
  doneLabel: string;
  className?: string;
}) {
  const [done, setDone] = useState(false);

  async function copy(e: React.MouseEvent<HTMLButtonElement>) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const span = e.currentTarget.querySelector("[data-copy]");
      if (span) {
        const range = document.createRange();
        range.selectNodeContents(span);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
    setDone(true);
    setTimeout(() => setDone(false), 1800);
  }

  return (
    <button type="button" className={className} onClick={copy}>
      <span data-copy className="sr-only">{text}</span>
      <span aria-live="polite">{done ? doneLabel : label}</span>
    </button>
  );
}
