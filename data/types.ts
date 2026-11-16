// 이력서 데이터 타입 정의
// PRD의 "국내·해외 공용 이력서 항목 세분화"를 따른 구조입니다.

export type Locale = "ko" | "en";

export interface Localized {
  ko: string;
  en?: string; // 영문이 없으면 한글 원문이 표시되고 "원문" 배지가 붙습니다 (번역 폴백)
}

export interface Link {
  label: string;
  url: string;
}

export interface Profile {
  nameKo: string;
  nameEn: string;
  headline: Localized;
  summary: Localized;
  email: string;
  phone: string;
  location: Localized;
  links: Link[];
  availability?: Localized;
  // 연락처 노출 제어 (PRD P-09): false면 HTML에 아예 포함되지 않습니다.
  contactVisibility: { email: boolean; phone: boolean; location: boolean };
  photo?: string; // public/ 아래 파일 경로, 예: "/photo.jpg". 해외 지원용(en)에서는 자동으로 숨깁니다.
}

export interface SkillGroup {
  category: Localized;
  items: string[];
  level?: Localized; // 예: "상" / "Advanced"
}

export interface Experience {
  company: Localized;
  title: Localized;
  period: string; // "2024.03 – 2025.06" 또는 "2024.03 – 현재"
  location?: Localized;
  type?: Localized; // 정규직, 인턴 등
  responsibilities: Localized[];
  achievements: Localized[]; // 수치가 있는 성과를 우선
  tech?: string[];
}

export interface Education {
  school: Localized;
  degree: Localized;
  period?: string;
  gpa?: string;
  notes?: Localized[];
}

// 측정한 변화 (전 → 후). 웹 프로필에서 막대로 그려집니다.
export interface Delta {
  label: Localized;
  before: number;
  after: number;
  unit?: string; // "%", "분" 등. 표시용
  better: "up" | "down"; // 커질수록 좋은지, 작아질수록 좋은지
  max: number; // 막대 길이 기준(전체 눈금)
  source: Localized; // 이 숫자를 어디서 쟀는지
}

// 확인한 사실 (큰 숫자 + 설명)
export interface Fact {
  value: string;
  label: Localized;
  source?: Localized;
}

export interface Project {
  id: string; // 고유 ID (예: "p001")
  name: Localized;
  period: string;
  role: Localized;
  purpose: Localized;
  tech: string[];
  results: Localized[];
  links?: Link[];
  visible?: boolean; // false면 공개 페이지에서 숨김

  // ── 웹 프로필 화면용 (없으면 문서형 이력서에만 나옵니다) ──
  slug?: string; // 상세 패널 주소용 (예: /ko#erlink)
  title?: Localized; // 카드 제목 (짧은 이름)
  status?: "building" | "live";
  summary?: Localized; // 카드 한 줄 설명
  problem?: Localized; // 왜 만들었나
  flow?: Localized[]; // 구조 (단계 순서)
  deltas?: Delta[];
  facts?: Fact[];
  featuredTech?: string[]; // 카드에 보일 대표 기술 4~5개
  image?: { src: string; alt: Localized; width: number; height: number };
  privateRepo?: boolean;
}

export interface Certificate {
  name: Localized;
  issuer: Localized;
  date?: string;
}

export interface Language {
  language: Localized;
  test?: string;
  score?: string;
  level?: Localized;
}

export interface Activity {
  title: Localized;
  org?: Localized;
  period?: string;
  detail?: Localized;
}

export interface Resume {
  profile: Profile;
  skills: SkillGroup[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certificates: Certificate[];
  languages: Language[];
  activities: Activity[];
  // 섹션 순서와 표시 여부 (PRD A-11)
  sections: { key: SectionKey; visible: boolean }[];
}

export type SectionKey =
  | "summary"
  | "skills"
  | "experience"
  | "projects"
  | "education"
  | "certificates"
  | "languages"
  | "activities";
