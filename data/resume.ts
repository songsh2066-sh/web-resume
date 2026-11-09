import type { Resume } from "./types";
import { projects } from "./projects";

// ─────────────────────────────────────────────────────────────
// 이력서 본문 데이터
// 이 파일만 수정하면 /ko, /en 페이지가 모두 바뀝니다.
// "입력 필요"로 표시된 곳은 실제 값으로 채워 주세요.
// ─────────────────────────────────────────────────────────────

export const resume: Resume = {
  profile: {
    nameKo: "송상헌",
    nameEn: "SONG SANGHEON",
    headline: {
      ko: "AI 개발자 · 소프트웨어 개발자",
      en: "AI Developer · Software Developer",
    },
    summary: {
      ko: "한림대학교 소프트웨어학부에서 빅데이터·데이터사이언스를 전공했습니다. 정보처리기사 자격을 보유하고 있으며, 현재 청년취업사관학교 AI Agent 과정에서 LLM 기반 에이전트 프로젝트를 수행하고 있습니다. 데이터 처리부터 AI 서비스 구현·배포까지 직접 만드는 개발자를 지향합니다.",
      en: "Studied Big Data and Data Science in the School of Software at Hallym University. Holds the Engineer Information Processing certification and is currently building LLM-based agent projects in the Youth Employment Academy AI Agent program. Aims to be a developer who delivers end to end, from data processing to AI service implementation and deployment.",
    },
    email: "songsh0529@gmail.com",
    phone: "+82-10-2724-6130",
    location: { ko: "대한민국", en: "South Korea" },
    links: [
      // GitHub, LinkedIn, 블로그 주소가 있으면 추가하세요.
      // { label: "GitHub", url: "https://github.com/..." },
    ],
    availability: { ko: "즉시 근무 가능", en: "Available immediately" },
    contactVisibility: { email: true, phone: true, location: true },
    // photo: "/photo.jpg", // 국내용 증명사진을 쓰려면 public/photo.jpg를 넣고 주석을 해제하세요.
  },

  skills: [
    // 실제로 사용해 본 기술만 남기고 나머지는 지우세요. level은 선택입니다.
    { category: { ko: "프로그래밍 언어", en: "Languages" }, items: ["Python", "SQL", "TypeScript"] },
    { category: { ko: "AI · 데이터", en: "AI · Data" }, items: ["LLM Agent", "pandas", "scikit-learn"] },
    { category: { ko: "웹 · 배포", en: "Web · Deployment" }, items: ["Next.js", "Git", "Vercel"] },
  ],

  experience: [
    // 경력이 생기면 아래 형식으로 추가하세요. 비어 있으면 섹션이 표시되지 않습니다.
    // {
    //   company: { ko: "회사명", en: "Company" },
    //   title: { ko: "직위", en: "Title" },
    //   period: "2025.01 – 현재",
    //   responsibilities: [{ ko: "주요 업무", en: "Responsibility" }],
    //   achievements: [{ ko: "수치 성과", en: "Quantified achievement" }],
    //   tech: ["Python"],
    // },
  ],

  education: [
    {
      school: { ko: "한림대학교", en: "Hallym University" },
      degree: {
        ko: "소프트웨어학부 빅데이터전공 / 데이터사이언스전공",
        en: "School of Software, Big Data Major / Data Science Major",
      },
      period: "", // 입력 필요: 예 "2019.03 – 2025.02"
      // gpa: "3.8/4.5",
    },
    {
      school: { ko: "청년취업사관학교", en: "Youth Employment Academy (Seoul)" },
      degree: { ko: "AI Agent 개발 과정", en: "AI Agent Development Program" },
      period: "2026 – 현재", // 입력 필요: 정확한 기간
      notes: [
        { ko: "LLM 기반 에이전트 설계·구현 실습, 프로젝트 기반 학습", en: "Hands-on LLM agent design and implementation, project-based learning" },
      ],
    },
  ],

  projects,

  certificates: [
    {
      name: { ko: "정보처리기사", en: "Engineer Information Processing" },
      issuer: { ko: "한국산업인력공단", en: "Human Resources Development Service of Korea" },
      date: "", // 입력 필요: 예 "2024.11"
    },
  ],

  languages: [
    // 예: { language: { ko: "영어", en: "English" }, test: "TOEIC", score: "850", level: { ko: "비즈니스 회화", en: "Business conversation" } },
  ],

  activities: [
    // 수상, 논문, 강연, 오픈소스, 해커톤 등
  ],

  // 섹션 순서와 표시 여부. 순서를 바꾸거나 visible을 false로 두면 숨겨집니다.
  sections: [
    { key: "summary", visible: true },
    { key: "skills", visible: true },
    { key: "projects", visible: true },
    { key: "experience", visible: true },
    { key: "education", visible: true },
    { key: "certificates", visible: true },
    { key: "languages", visible: true },
    { key: "activities", visible: true },
  ],
};
