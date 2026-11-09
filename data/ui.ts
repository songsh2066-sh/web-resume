import type { Locale, SectionKey } from "./types";

// 화면에 쓰이는 UI 문자열 (i18n)
export const ui: Record<Locale, Record<string, string>> = {
  ko: {
    summary: "소개",
    skills: "핵심 역량",
    experience: "경력",
    projects: "프로젝트",
    education: "학력",
    certificates: "자격증",
    languages: "어학",
    activities: "수상 · 활동",
    email: "이메일",
    phone: "연락처",
    location: "위치",
    availability: "근무 가능",
    pdf: "PDF 저장",
    fallback: "원문",
    fallbackNotice: "일부 항목은 아직 번역되지 않아 한국어로 표시됩니다.",
    role: "역할",
    tech: "사용 기술",
    results: "결과",
    langName: "한국어",
    updated: "최종 수정",
  },
  en: {
    summary: "Summary",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    education: "Education",
    certificates: "Certifications",
    languages: "Languages",
    activities: "Awards · Activities",
    email: "Email",
    phone: "Phone",
    location: "Location",
    availability: "Availability",
    pdf: "Save as PDF",
    fallback: "KO",
    fallbackNotice: "Some items are not translated yet and are shown in Korean.",
    role: "Role",
    tech: "Tech",
    results: "Results",
    langName: "English",
    updated: "Last updated",
  },
};

export const locales: Locale[] = ["ko", "en"];
export const sectionKeys: SectionKey[] = [
  "summary", "skills", "experience", "projects", "education", "certificates", "languages", "activities",
];
