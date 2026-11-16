import type { Metadata } from "next";
import { resume } from "@/data/resume";
import { ui } from "@/data/ui";
import type { Locale } from "@/data/types";
import ResumeView, { countFallbacks } from "@/components/ResumeView";
import TopBar from "@/components/TopBar";

// 문서형 이력서: 인쇄·PDF 저장과 채용 시스템(ATS) 제출용으로 단순하게 유지합니다.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const name = l === "ko" ? resume.profile.nameKo : resume.profile.nameEn;
  return {
    title: `${name} · ${l === "ko" ? "이력서" : "Resume"}`,
    alternates: { canonical: `/${l}/resume`, languages: { ko: "/ko/resume", en: "/en/resume" } },
  };
}

export default async function ResumePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = ui[l];
  const fallbacks = l === "ko" ? 0 : countFallbacks(resume, l);
  return (
    <>
      <TopBar locale={l} t={t} view="resume" />
      <main className="page">
        {fallbacks > 0 && <p className="notice">{t.fallbackNotice}</p>}
        <ResumeView resume={resume} locale={l} t={t} />
        <footer className="foot">
          <span>© {new Date().getFullYear()} {l === "ko" ? resume.profile.nameKo : resume.profile.nameEn}</span>
          <span>{t.updated}: {process.env.NEXT_PUBLIC_BUILD_DATE ?? new Date().toISOString().slice(0, 10)}</span>
        </footer>
      </main>
    </>
  );
}
