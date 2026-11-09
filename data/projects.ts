import type { Project } from "./types";

// ─────────────────────────────────────────────────────────────
// 프로젝트 목록
// 청년취업사관학교 AI Agent 과정에서 프로젝트가 완성될 때마다
// 아래 배열에 항목을 하나씩 추가하세요. 최신 프로젝트를 맨 위에 둡니다.
//
// 작성 원칙 (PRD 9절):
//  - results에는 실제로 측정한 수치만 적습니다. 없으면 "무엇을 만들었는지"만 적습니다.
//  - tech에는 실제로 사용한 기술만 적습니다.
//  - en을 비우면 영문 페이지에서 한글 원문이 "원문" 배지와 함께 표시됩니다.
// ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "p001",
    name: {
      ko: "[예시] 웹 이력서 플랫폼 PRD 작성 및 배포",
      en: "[Example] Web Resume Platform PRD and Deployment",
    },
    period: "2026.11",
    role: { ko: "개인 프로젝트 · 기획 및 개발", en: "Solo project · planning and development" },
    purpose: {
      ko: "경력 원장 기반 AI 이력서 생성 플랫폼의 제안서와 PRD를 작성하고, 공개 이력서 페이지를 Next.js로 구현해 Vercel에 배포",
      en: "Wrote the proposal and PRD for a ledger-based AI resume platform, built the public resume page with Next.js, and deployed it on Vercel",
    },
    tech: ["Next.js", "TypeScript", "Vercel"],
    results: [
      { ko: "다국어(ko/en) 경로 기반 이력서 페이지와 인쇄용 PDF 레이아웃 구현", en: "Built locale-routed (ko/en) resume pages with a print-ready PDF layout" },
    ],
    links: [],
    visible: true,
  },
  // 다음 프로젝트는 아래에 같은 형식으로 추가하세요:
  // {
  //   id: "p002",
  //   name: { ko: "프로젝트 이름", en: "Project name" },
  //   period: "2026.12",
  //   role: { ko: "역할 (팀 4명 중 백엔드 담당)", en: "Role" },
  //   purpose: { ko: "목적과 배경 한두 줄", en: "Purpose" },
  //   tech: ["Python", "LangGraph"],
  //   results: [{ ko: "결과 (수치가 있으면 수치)", en: "Result" }],
  //   links: [{ label: "GitHub", url: "https://github.com/..." }],
  //   visible: true,
  // },
];
