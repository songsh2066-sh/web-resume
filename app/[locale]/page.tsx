import { resume } from "@/data/resume";
import { ui } from "@/data/ui";
import type { Locale } from "@/data/types";
import ResumeView, { countFallbacks } from "@/components/ResumeView";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = ui[l];
  const fallbacks = l === "ko" ? 0 : countFallbacks(resume, l);
  return (
    <main className="page">
      {fallbacks > 0 && <p className="notice">{t.fallbackNotice}</p>}
      <ResumeView resume={resume} locale={l} t={t} />
      <footer className="foot">
        <span>© {new Date().getFullYear()} {l === "ko" ? resume.profile.nameKo : resume.profile.nameEn}</span>
        <span>{t.updated}: {process.env.NEXT_PUBLIC_BUILD_DATE ?? new Date().toISOString().slice(0, 10)}</span>
      </footer>
    </main>
  );
}
