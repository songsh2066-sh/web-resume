import type { Project } from "./types";

// ─────────────────────────────────────────────────────────────
// 프로젝트 목록 (최신순)
// 청년취업사관학교 AI Agent 과정에서 프로젝트가 완성될 때마다
// 아래 배열 맨 위에 항목을 하나씩 추가하세요.
//
// 작성 원칙 (PRD 9절):
//  - results에는 실제로 측정한 수치만 적습니다. 없으면 "무엇을 만들었는지"만 적습니다.
//  - tech에는 실제로 사용한 기술만 적습니다.
//  - en을 비우면 영문 페이지에서 한글 원문이 "KO" 배지와 함께 표시됩니다.
//
// 출처: ERLink README(claude_cowork/erlink), 서울 메이트 정리 문서(Google Drive "seoulmate"),
//       기억 탐정 Apps Script 코드(Code.gs)와 배포 기록. 2026-11-16 기준.
// ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "p003",
    name: { ko: "ERLink AI — 응급이송 의사결정 지원 멀티 에이전트 (개발 중)", en: "ERLink AI — Multi-Agent Decision Support for Emergency Transport (in progress)" },
    period: "2026.11 – 현재",
    role: { ko: "청년취업사관학교 과정 프로젝트 · 설계·구현", en: "Academy course project · design and implementation" },
    purpose: {
      ko: "119 신고 긴급도 판정, 응급실 수용 가능성 확인, 이송 병원 선정, 환자 인계까지 한 흐름으로 잇는 시스템입니다. 이송 시간·치료 역량·수용 여력·지침 준수를 함께 따져 근거가 붙은 병원 후보 3곳을 제시하고, 최종 결정은 구급대원이 승인합니다(진단하지 않음).",
      en: "Connects 119 call triage, ER capacity checks, hospital selection, and patient handover in one flow. Weighs transport time, clinical capability, capacity, and protocol compliance to propose three evidence-backed hospitals; the paramedic approves the final decision (no diagnosis).",
    },
    tech: ["Python", "FastAPI", "LangGraph", "PostgreSQL · PostGIS · pgvector", "Redis", "Next.js", "MapLibre", "OSRM", "Docker Compose", "GitHub Actions", "Playwright"],
    results: [
      {
        ko: "LangGraph로 중증도·병상·병원 역량·이송 시간·근거 검색 Agent와 Supervisor·Critic을 구성하고, 구급대원 승인(interrupt)과 해시 체인 감사 기록까지 연결",
        en: "Built triage, bed, capability, route, and evidence agents with a Supervisor and Critic in LangGraph, plus paramedic approval (interrupt) and a hash-chained audit log",
      },
      {
        ko: "응급의료법·지침 1,231개 청크 하이브리드 RAG(로컬 임베딩 + pgvector + BM25, RRF): 평가셋 50문항 MRR 0.705 → 0.884, Hit@5 50/50, 평균 응답 23ms",
        en: "Hybrid RAG over 1,231 law and guideline chunks (local embeddings + pgvector + BM25, RRF): MRR 0.705 → 0.884 and Hit@5 50/50 on a 50-question set, 23 ms average",
      },
      {
        ko: "AI Hub 119 신고 데이터로 중증도 판정 규칙 실측·개선: 과소평가 66.7% → 19.3%, 중증('상') Recall 0.28 → 0.48",
        en: "Measured and improved triage rules on AI Hub 119 call data: under-triage 66.7% → 19.3%, severe-class recall 0.28 → 0.48",
      },
      {
        ko: "서울 OSM 도로망 + OSRM 이송 시간 계산(병원 100곳 약 11ms), 도로망 밖 직선거리 추정 오차 8.1분 → 3.8분",
        en: "Transport-time estimates on Seoul OSM roads with OSRM (~11 ms for 100 hospitals); fallback straight-line error 8.1 → 3.8 min",
      },
      {
        ko: "신고 원문 개인정보 가림(원문 미저장), 실제 데이터 스냅샷 회귀 시험, pytest 테스트 함수 465개·Playwright 화면 시험 40개를 GitHub Actions CI로 실행",
        en: "PII masking before agents (raw text not stored), snapshot regression tests, 465 pytest tests and 40 Playwright UI tests in GitHub Actions CI",
      },
    ],
    links: [],
    visible: true,
  },
  {
    id: "p002",
    name: { ko: "서울 메이트 — 실시간 데이터 기반 서울 나들이 코스 AI 에이전트", en: "Seoul Mate — AI Agent for Seoul Outing Plans on Live Data" },
    period: "2026.10",
    role: { ko: "청년취업사관학교 과정 프로젝트 · 설계·구현·배포", en: "Academy course project · design, implementation, deployment" },
    purpose: {
      ko: "\"오늘 서울 어디 갈까?\"라는 질문에 날씨·장소별 혼잡도·운영시간을 도구로 직접 확인한 뒤 가볼 곳과 먹을 곳을 한 코스로 제안합니다. 기억에 의존하지 않고 확인한 데이터만 근거로 답합니다.",
      en: "Answers \"Where should I go in Seoul today?\" by checking weather, crowd levels, and opening hours with tools, then proposes a route of places to visit and eat. It answers only from data it has checked.",
    },
    tech: ["Python", "FastAPI (SSE)", "Claude API", "OpenAI API", "Google Apps Script", "Seoul Open Data (citydata)", "TourAPI", "Vercel", "GitHub Actions"],
    results: [
      {
        ko: "도구 호출 에이전트 루프와 도구 6종(날씨·혼잡도·혼잡 예측·장소 검색·운영시간·관광지 검색), 서울 실시간 121곳 데이터와 한국관광공사 TourAPI 실연동",
        en: "Tool-calling agent loop with 6 tools (weather, crowd, forecast, place search, opening hours, tourist-spot search), live data for 121 Seoul areas and the Korea Tourism TourAPI",
      },
      {
        ko: "같은 에이전트를 Python(FastAPI, Vercel)과 Google Apps Script 웹 앱 두 가지로 배포하고, 동기화 테스트로 두 화면을 일치시킴",
        en: "Deployed the same agent as a Python service (FastAPI, Vercel) and a Google Apps Script web app, kept in sync by a test",
      },
      {
        ko: "121곳 실시간 혼잡 지도·시간 슬라이더(지금~+6시간), 모델이 만든 코스를 서버가 장소 목록으로 검증해 없는 장소는 버림",
        en: "Live crowd map of 121 areas with a time slider (now to +6 h); the server validates model-made routes against the catalog and drops unknown places",
      },
      {
        ko: "pytest 83개(실제 서울 API·TourAPI 통합 테스트 포함)와 실제 모델 검수 시나리오 6개(5회 중 4회 전체 통과), 입력 검증·인젝션 1차 필터·레이트 리밋·비밀키 마스킹",
        en: "83 pytest tests (incl. live Seoul API and TourAPI integration) and 6 live-model eval scenarios (all passed in 4 of 5 runs); input validation, injection filter, rate limits, secret masking",
      },
    ],
    links: [{ label: "Live demo", url: "https://seoulmate-six.vercel.app" }],
    visible: true,
  },
  {
    id: "p001",
    name: { ko: "기억 탐정 AI — 흐릿한 기억으로 영화·애니메이션 찾기", en: "Memory Detective AI — Find Movies and Anime from Vague Memories" },
    period: "2026.10",
    role: { ko: "설계·구현·배포", en: "Design, implementation, deployment" },
    purpose: {
      ko: "제목은 기억나지 않고 장면만 떠오를 때, 기억나는 장면과 힌트 카드(본 시기·주인공·배경·결정적 장면·분위기·그림체)를 입력하면 후보 작품을 근거와 함께 찾아 줍니다.",
      en: "When you remember a scene but not the title, enter the scene and hint cards (when you watched it, protagonist, setting, key scene, mood, art style) to get candidate titles with reasons.",
    },
    tech: ["Google Apps Script", "JavaScript", "HTML/CSS", "OpenAI API (gpt-4.1-mini)"],
    results: [
      {
        ko: "Next.js 버전의 판별 API를 Google Apps Script 웹 앱으로 옮겨 배포하고, 1.0부터 1.3까지 4개 버전을 배포하며 힌트 카드·공유 링크·비슷한 작품 추천·익명 이용 통계를 추가",
        en: "Ported the Next.js detection API to a Google Apps Script web app and shipped 4 versions (1.0 to 1.3) adding hint cards, share links, similar-title recommendations, and anonymous usage stats",
      },
      {
        ko: "API 키는 스크립트 속성에만 저장, 분당·일일 전체 요청 한도(CacheService + LockService), 서버에 입력·결과를 저장하지 않고 검색 기록은 사용자 브라우저에만 보관",
        en: "API key kept only in script properties, global per-minute and daily limits (CacheService + LockService), no server-side storage of inputs or results; history stays in the browser",
      },
    ],
    links: [{ label: "Web app", url: "https://script.google.com/macros/s/AKfycbxQjsRZW1-UDQfN7ywW4rqMgDL-blAU6RKvAYGjGwj2rLLNMfTSRPapeKHV_gZEnhI9/exec" }],
    visible: true,
  },
  {
    // 이 이력서 사이트 자체. 공개하려면 visible을 true로 바꾸세요.
    id: "p000",
    name: { ko: "웹 이력서 플랫폼 PRD 작성 및 배포", en: "Web Resume Platform PRD and Deployment" },
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
    visible: false,
  },
];
