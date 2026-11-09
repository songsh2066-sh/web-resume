import Link from "next/link";
import type { Locale } from "@/data/types";
import { locales, ui } from "@/data/ui";
import PdfButton from "./PdfButton";

// 상단 바: 언어 전환(PRD P-02) + PDF 저장(P-04)
export default function TopBar({ locale, t }: { locale: Locale; t: Record<string, string> }) {
  return (
    <header className="topbar">
      <div className="in">
        <Link className="brand" href={`/${locale}`}><span className="dot" />Resume</Link>
        <span className="spacer" />
        <nav className="langs" aria-label="Language">
          {locales.map((l) => (
            <Link key={l} className="btn" href={`/${l}`} aria-current={l === locale ? "page" : undefined} hrefLang={l}>
              {ui[l].langName}
            </Link>
          ))}
        </nav>
        <PdfButton label={t.pdf} />
      </div>
    </header>
  );
}
