import type { Delta, Locale } from "@/data/types";
import { tx } from "@/lib/i18n";

// 숫자의 소수 자릿수를 입력값 그대로 맞춥니다 (0.705 → 3자리).
function decimals(n: number) {
  const s = String(n);
  return s.includes(".") ? s.split(".")[1].length : 0;
}

function fmt(n: number, d: number) {
  return n.toFixed(d);
}

// 측정한 변화(전 → 후)를 두 줄 막대로 보여 줍니다.
// 전은 회색, 후는 '확인됨' 색. 눈금(max)이 같아서 길이를 그대로 비교할 수 있습니다.
export default function DeltaBar({ d, l, t }: { d: Delta; l: Locale; t: Record<string, string> }) {
  const dp = Math.max(decimals(d.before), decimals(d.after));
  const unit = d.unit === "분" && l === "en" ? " min" : d.unit ?? "";
  const diff = d.after - d.before;
  const diffUnit = d.unit === "%" ? "%p" : unit;
  const sign = diff > 0 ? "+" : "−";
  const pct = (v: number) => `${Math.max(2, Math.min(100, (v / d.max) * 100))}%`;

  return (
    <div className="delta">
      <div className="delta-head">
        <span className="delta-label">{tx(d.label, l)}</span>
        <span className="delta-change">
          {sign}
          {fmt(Math.abs(diff), dp)}
          {diffUnit}
        </span>
      </div>
      <div className="delta-rows" aria-hidden="true">
        <div className="delta-row">
          <span className="delta-tag">{t.before}</span>
          <span className="delta-track">
            <span className="delta-fill is-before" style={{ width: pct(d.before) }} />
          </span>
          <span className="delta-val">{fmt(d.before, dp)}{unit}</span>
        </div>
        <div className="delta-row">
          <span className="delta-tag">{t.after}</span>
          <span className="delta-track">
            <span className="delta-fill is-after" style={{ width: pct(d.after) }} />
          </span>
          <span className="delta-val is-after">{fmt(d.after, dp)}{unit}</span>
        </div>
      </div>
      <p className="sr-only">
        {tx(d.label, l)}: {fmt(d.before, dp)}{unit} → {fmt(d.after, dp)}{unit}
      </p>
      <span className="delta-src">{t.source} · {tx(d.source, l)}</span>
    </div>
  );
}
