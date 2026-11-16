import type { Localized } from "./types";

// ─────────────────────────────────────────────────────────────
// 웹 프로필(첫 화면) 전용 문구
// 콘셉트: "근거 노트" — 모든 숫자에 출처를 붙이고, 핵심은 형광펜으로 표시합니다.
// 여기 있는 숫자는 모두 각 프로젝트 기록(README, 정리 문서, 배포 기록)에서 가져왔습니다.
// 바꾸고 싶으면 이 파일만 고치면 됩니다.
// ─────────────────────────────────────────────────────────────

export interface Tagline {
  before: string; // 형광펜 앞
  mark: string; // 형광펜 칠할 부분
  after: string; // 형광펜 뒤
}

export interface LogLine {
  state: "ok" | "wip"; // ok = 확인됨, wip = 진행 중
  text: Localized;
  source: Localized; // 어느 프로젝트의 기록인지
}

export interface Metric {
  value: string;
  label: Localized;
  source: Localized;
}

export interface Principle {
  title: Localized;
  body: Localized;
  evidence: Localized; // 어떤 프로젝트에서 그렇게 했는지
}

export const profileContent = {
  eyebrow: { ko: "AI 에이전트 개발자", en: "AI Agent Developer" } as Localized,

  tagline: {
    ko: { before: "", mark: "확인한 데이터로만", after: " 답하는 AI 에이전트를 만듭니다." },
    en: { before: "I build AI agents that answer ", mark: "only from data they've checked", after: "." },
  } as Record<"ko" | "en", Tagline>,

  intro: {
    ko: "모의 데이터로 시작해도 끝은 실제 API로 바꾸고, 개선은 평가셋으로 숫자를 확인합니다. 지금은 청년취업사관학교 AI Agent 과정에서 119 응급이송 의사결정 지원 시스템 ERLink를 만들고 있습니다.",
    en: "I may start with mock data, but I finish on real APIs and measure every improvement against an evaluation set. Right now I'm building ERLink, a decision-support system for 119 emergency transport, in the Youth Employment Academy AI Agent program.",
  } as Localized,

  log: [
    { state: "ok", text: { ko: "서울 실시간 121곳 데이터 연동", en: "Live data for 121 Seoul areas connected" }, source: { ko: "서울 메이트", en: "Seoul Mate" } },
    { state: "ok", text: { ko: "근거 검색 평가셋 50문항 · Hit@5 50/50", en: "Evidence retrieval eval: 50 questions · Hit@5 50/50" }, source: { ko: "ERLink", en: "ERLink" } },
    { state: "ok", text: { ko: "중증 과소평가 66.7% → 19.3%", en: "Under-triage 66.7% → 19.3%" }, source: { ko: "ERLink", en: "ERLink" } },
    { state: "ok", text: { ko: "자동 테스트 548개 작성 (pytest)", en: "548 automated tests written (pytest)" }, source: { ko: "ERLink · 서울 메이트", en: "ERLink · Seoul Mate" } },
    { state: "ok", text: { ko: "Apps Script 웹 앱 4개 버전 배포", en: "4 versions of an Apps Script web app shipped" }, source: { ko: "기억 탐정", en: "Memory Detective" } },
    { state: "wip", text: { ko: "4주차 완료 · 보강 진행 중", en: "Week 4 done · hardening in progress" }, source: { ko: "ERLink", en: "ERLink" } },
  ] as LogLine[],

  metrics: [
    { value: "3", label: { ko: "AI 에이전트 프로젝트", en: "AI agent projects" }, source: { ko: "ERLink · 서울 메이트 · 기억 탐정", en: "ERLink · Seoul Mate · Memory Detective" } },
    { value: "548", label: { ko: "자동 테스트 (pytest)", en: "automated tests (pytest)" }, source: { ko: "ERLink 465 + 서울 메이트 83", en: "ERLink 465 + Seoul Mate 83" } },
    { value: "0.884", label: { ko: "근거 검색 MRR", en: "evidence retrieval MRR" }, source: { ko: "ERLink · 0.705에서 개선", en: "ERLink · up from 0.705" } },
    { value: "121", label: { ko: "실시간 연동 장소", en: "live areas connected" }, source: { ko: "서울 메이트 · 서울 열린데이터", en: "Seoul Mate · Seoul Open Data" } },
  ] as Metric[],

  principles: [
    {
      title: { ko: "실데이터에 연결한다", en: "Connect to real data" },
      body: {
        ko: "모의 데이터는 시작점일 뿐입니다. 실제 API의 응답 구조와 오류까지 확인한 뒤에 판단을 맡깁니다.",
        en: "Mock data is only a starting point. I check real API responses and failure modes before an agent relies on them.",
      },
      evidence: {
        ko: "서울 메이트: 서울 열린데이터 121곳·TourAPI 실연동 · ERLink: 응급실 병상 10분 주기 수집",
        en: "Seoul Mate: live Seoul Open Data and TourAPI · ERLink: ER beds collected every 10 minutes",
      },
    },
    {
      title: { ko: "평가로 증명한다", en: "Prove it with evaluation" },
      body: {
        ko: "좋아졌다는 느낌 대신 평가셋을 먼저 만들고, 바꾼 뒤에는 같은 기준으로 다시 잽니다.",
        en: "Instead of a feeling that it got better, I build an evaluation set first and re-measure after every change.",
      },
      evidence: {
        ko: "ERLink: 근거 검색 MRR 0.705 → 0.884 · 서울 메이트: 검수 시나리오 6개 반복 실행",
        en: "ERLink: retrieval MRR 0.705 → 0.884 · Seoul Mate: 6 eval scenarios run repeatedly",
      },
    },
    {
      title: { ko: "사람이 결정하게 한다", en: "Keep people in the decision" },
      body: {
        ko: "AI는 근거와 후보를 내고, 결정은 사람이 합니다. 모델의 출력은 서버가 한 번 더 검증합니다.",
        en: "The AI provides evidence and options; a person makes the call. The server checks model output once more.",
      },
      evidence: {
        ko: "ERLink: 구급대원 승인 단계 · 수정하면 드러나는 감사 기록 · 서울 메이트: 없는 장소는 서버가 제거",
        en: "ERLink: paramedic approval and a tamper-evident audit log · Seoul Mate: server drops unknown places",
      },
    },
    {
      title: { ko: "끝까지 배포한다", en: "Ship it" },
      body: {
        ko: "만든 것은 누구나 써 볼 수 있게 올리고, 검사는 CI가 매번 자동으로 돌립니다.",
        en: "I put what I build where anyone can try it, and CI runs the checks on every change.",
      },
      evidence: {
        ko: "Vercel · Google Apps Script 웹 앱 · Docker Compose · GitHub Actions CI",
        en: "Vercel · Google Apps Script web app · Docker Compose · GitHub Actions CI",
      },
    },
  ] as Principle[],

  asOf: "2026-11-16",
};
