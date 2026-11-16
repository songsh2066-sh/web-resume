import type { Locale, Localized } from "@/data/types";
import { tx } from "@/lib/i18n";

// 프로젝트 구조를 순서대로 잇는 단계도. variant="diagram"은 카드 그림 자리에, "list"는 상세 패널에 씁니다.
export default function Flow({
  steps,
  l,
  variant,
  caption,
}: {
  steps: Localized[];
  l: Locale;
  variant: "diagram" | "list";
  caption?: string;
}) {
  return (
    <figure className={`flow flow-${variant}`}>
      <ol>
        {steps.map((s, i) => (
          <li key={i}>
            <span className="flow-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="flow-t">{tx(s, l)}</span>
          </li>
        ))}
      </ol>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
