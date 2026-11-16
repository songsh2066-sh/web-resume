import Link from "next/link";
import type { Locale } from "@/data/types";
import { locales, ui } from "@/data/ui";
import { resume } from "@/data/resume";
import PdfButton from "./PdfButton";
import ThemeToggle from "./ThemeToggle";

// 상단 바. view="profile"이면 섹션 이동 링크를, view="resume"이면 PDF 버튼을 보여 줍니다.
export default function TopBar({
  locale,
  t,
  view,
}: {
  locale: Locale;
  t: Record<string, string>;
  view: "profile" | "resume";
}) {
  const suffix = view === "resume" ? "/resume" : "";
  const name = locale === "ko" ? resume.profile.nameKo : resume.profile.nameEn;
  return (
    <header className="topbar">
      <div className="topbar-in">
        <Link className="brand" href={`/${locale}`}>
          <span className="brand-mark" aria-hidden="true" />
          {name}
        </Link>

        {view === "profile" ? (
          <nav className="sectnav" aria-label={t.navAbout}>
            <a href="#how">{t.navHow}</a>
            <a href="#projects">{t.navProjects}</a>
            <a href="#edu">{t.navEdu}</a>
            <a href="#contact">{t.navContact}</a>
          </nav>
        ) : (
          <span className="spacer" />
        )}

        <div className="topbar-tools">
          <Link className="btn btn-quiet" href={view === "resume" ? `/${locale}` : `/${locale}/resume`}>
            {view === "resume" ? t.webProfile : t.docResume}
          </Link>
          <div className="langs" role="group" aria-label="Language">
            {locales.map((l) => (
              <Link key={l} href={`/${l}${suffix}`} hrefLang={l} aria-current={l === locale ? "page" : undefined}>
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <ThemeToggle label={t.theme} />
          {view === "resume" && <PdfButton label={t.pdf} />}
        </div>
      </div>
    </header>
  );
}
