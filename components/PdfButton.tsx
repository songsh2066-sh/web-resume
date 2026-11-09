"use client";

// 브라우저 인쇄 대화상자를 열어 PDF로 저장합니다 (인쇄 CSS 적용).
export default function PdfButton({ label }: { label: string }) {
  return (
    <button className="btn noprint" type="button" onClick={() => window.print()}>
      {label}
    </button>
  );
}
