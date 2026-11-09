import type { Locale, Localized, Resume, SectionKey } from "@/data/types";

type T = Record<string, string>;

// 번역 폴백 (PRD P-03): 해당 언어 번역이 없으면 한글 원문 + "원문" 배지
function L({ v, l, t }: { v: Localized | undefined; l: Locale; t: T }) {
  if (!v) return null;
  const text = v[l];
  if (text) return <>{text}</>;
  return (
    <>
      {v.ko}
      {l !== "ko" && <span className="fb">{t.fallback}</span>}
    </>
  );
}

// 기간 문자열의 "현재"를 영문 페이지에서는 "Present"로 바꿉니다.
function per(period: string | undefined, l: Locale) {
  if (!period) return "";
  return l === "en" ? period.replace("현재", "Present") : period;
}

function pick(v: Localized | undefined, l: Locale) {
  return v ? v[l] ?? v.ko : "";
}

// 미번역 필드 수 (안내 문구 표시용)
export function countFallbacks(r: Resume, l: Locale): number {
  const vals: (Localized | undefined)[] = [r.profile.headline, r.profile.summary, r.profile.location, r.profile.availability];
  r.skills.forEach((s) => vals.push(s.category, s.level));
  r.experience.forEach((e) => vals.push(e.company, e.title, e.location, e.type, ...e.responsibilities, ...e.achievements));
  r.education.forEach((e) => vals.push(e.school, e.degree, ...(e.notes ?? [])));
  r.projects.filter((p) => p.visible !== false).forEach((p) => vals.push(p.name, p.role, p.purpose, ...p.results));
  r.certificates.forEach((c) => vals.push(c.name, c.issuer));
  r.languages.forEach((x) => vals.push(x.language, x.level));
  r.activities.forEach((a) => vals.push(a.title, a.org, a.detail));
  return vals.filter((v) => v && !v[l]).length;
}

export default function ResumeView({ resume: r, locale: l, t }: { resume: Resume; locale: Locale; t: T }) {
  const p = r.profile;
  const cv = p.contactVisibility;
  const projects = r.projects.filter((x) => x.visible !== false);
  // 해외(en) 페이지에서는 사진을 넣지 않는 것이 관행 (항목 세분화 문서 1절)
  const showPhoto = !!p.photo && l === "ko";

  const sections: Record<SectionKey, React.ReactNode | null> = {
    summary: (
      <section key="summary">
        <h2>{t.summary}</h2>
        <p className="summary"><L v={p.summary} l={l} t={t} /></p>
      </section>
    ),
    skills: r.skills.length ? (
      <section key="skills">
        <h2>{t.skills}</h2>
        {r.skills.map((s, i) => (
          <div className="skillrow" key={i}>
            <span className="k"><L v={s.category} l={l} t={t} /></span>
            <span>
              {s.items.join(" · ")}
              {s.level && <span className="sub"> ({pick(s.level, l)})</span>}
            </span>
          </div>
        ))}
      </section>
    ) : null,
    experience: r.experience.length ? (
      <section key="experience">
        <h2>{t.experience}</h2>
        {r.experience.map((e, i) => (
          <div className="item" key={i}>
            <div className="t">
              <b><L v={e.company} l={l} t={t} /> · <L v={e.title} l={l} t={t} /></b>
              <span className="when">{per(e.period, l)}</span>
            </div>
            {(e.location || e.type) && (
              <div className="sub">{[pick(e.location, l), pick(e.type, l)].filter(Boolean).join(" · ")}</div>
            )}
            <ul>
              {e.responsibilities.map((x, j) => <li key={"r" + j}><L v={x} l={l} t={t} /></li>)}
              {e.achievements.map((x, j) => <li key={"a" + j}><b><L v={x} l={l} t={t} /></b></li>)}
            </ul>
            {e.tech?.length ? <div className="tags">{e.tech.map((x) => <span className="tag" key={x}>{x}</span>)}</div> : null}
          </div>
        ))}
      </section>
    ) : null,
    projects: projects.length ? (
      <section key="projects">
        <h2>{t.projects}</h2>
        {projects.map((pj) => (
          <div className="item" key={pj.id}>
            <div className="t">
              <b><L v={pj.name} l={l} t={t} /></b>
              <span className="when">{per(pj.period, l)}</span>
            </div>
            <div className="sub"><L v={pj.role} l={l} t={t} /></div>
            <div><L v={pj.purpose} l={l} t={t} /></div>
            {pj.results.length ? (
              <ul>{pj.results.map((x, j) => <li key={j}><L v={x} l={l} t={t} /></li>)}</ul>
            ) : null}
            {pj.tech.length ? <div className="tags">{pj.tech.map((x) => <span className="tag" key={x}>{x}</span>)}</div> : null}
            {pj.links?.length ? (
              <div className="links">{pj.links.map((k) => <a key={k.url} href={k.url} target="_blank" rel="noopener noreferrer">{k.label}</a>)}</div>
            ) : null}
          </div>
        ))}
      </section>
    ) : null,
    education: r.education.length ? (
      <section key="education">
        <h2>{t.education}</h2>
        {r.education.map((e, i) => (
          <div className="item" key={i}>
            <div className="t">
              <b><L v={e.school} l={l} t={t} /></b>
              {e.period && <span className="when">{per(e.period, l)}</span>}
            </div>
            <div className="sub"><L v={e.degree} l={l} t={t} />{e.gpa && ` · GPA ${e.gpa}`}</div>
            {e.notes?.length ? <ul>{e.notes.map((x, j) => <li key={j}><L v={x} l={l} t={t} /></li>)}</ul> : null}
          </div>
        ))}
      </section>
    ) : null,
    certificates: r.certificates.length ? (
      <section key="certificates">
        <h2>{t.certificates}</h2>
        {r.certificates.map((c, i) => (
          <div className="item" key={i}>
            <div className="t">
              <b><L v={c.name} l={l} t={t} /></b>
              {c.date && <span className="when">{per(c.date, l)}</span>}
            </div>
            <div className="sub"><L v={c.issuer} l={l} t={t} /></div>
          </div>
        ))}
      </section>
    ) : null,
    languages: r.languages.length ? (
      <section key="languages">
        <h2>{t.languages}</h2>
        {r.languages.map((x, i) => (
          <div className="skillrow" key={i}>
            <span className="k"><L v={x.language} l={l} t={t} /></span>
            <span>{[x.test && `${x.test} ${x.score ?? ""}`.trim(), pick(x.level, l)].filter(Boolean).join(" · ")}</span>
          </div>
        ))}
      </section>
    ) : null,
    activities: r.activities.length ? (
      <section key="activities">
        <h2>{t.activities}</h2>
        {r.activities.map((a, i) => (
          <div className="item" key={i}>
            <div className="t">
              <b><L v={a.title} l={l} t={t} /></b>
              {a.period && <span className="when">{per(a.period, l)}</span>}
            </div>
            {a.org && <div className="sub"><L v={a.org} l={l} t={t} /></div>}
            {a.detail && <div><L v={a.detail} l={l} t={t} /></div>}
          </div>
        ))}
      </section>
    ) : null,
  };

  return (
    <article className="resume" lang={l}>
      <header className="head">
        {showPhoto && <img className="photo" src={p.photo} alt={p.nameKo} />}
        <div className="who">
          <h1 className="name">
            {l === "ko" ? p.nameKo : p.nameEn}
            <small>{l === "ko" ? p.nameEn : p.nameKo}</small>
          </h1>
          <div className="headline"><L v={p.headline} l={l} t={t} /></div>
          <div className="contact">
            {cv.email && <span><b>{t.email}</b> <a href={`mailto:${p.email}`}>{p.email}</a></span>}
            {cv.phone && <span><b>{t.phone}</b> <a href={`tel:${p.phone.replace(/[^+\d]/g, "")}`}>{p.phone}</a></span>}
            {cv.location && <span><b>{t.location}</b> <L v={p.location} l={l} t={t} /></span>}
            {p.availability && <span><b>{t.availability}</b> <L v={p.availability} l={l} t={t} /></span>}
          </div>
          {p.links.length ? (
            <div className="links">{p.links.map((k) => <a key={k.url} href={k.url} target="_blank" rel="noopener noreferrer">{k.label}</a>)}</div>
          ) : null}
        </div>
      </header>
      <div className="body">
        {r.sections.filter((s) => s.visible).map((s) => sections[s.key])}
      </div>
    </article>
  );
}
