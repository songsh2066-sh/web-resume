import type { Locale, Localized } from "@/data/types";

// 해당 언어 문구를 고르고, 없으면 한글 원문으로 대체합니다.
export function tx(v: Localized | undefined, l: Locale): string {
  if (!v) return "";
  return v[l] ?? v.ko;
}

// 기간 문자열의 "현재"를 영문 페이지에서 "Present"로 바꿉니다.
export function period(p: string | undefined, l: Locale): string {
  if (!p) return "";
  return l === "en" ? p.replace("현재", "Present") : p;
}
