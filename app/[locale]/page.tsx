import { resume } from "@/data/resume";
import { profileContent as pc } from "@/data/profile";
import { ui } from "@/data/ui";
import type { Locale } from "@/data/types";
import { period, tx } from "@/lib/i18n";
import TopBar from "@/components/TopBar";
import CopyButton from "@/components/CopyButton";
import Projects from "@/components/profile/Projects";

// 웹 프로필 (첫 화면). 콘셉트 "근거 노트": 핵심은 형광펜, 모든 숫자에는 출처.
export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = ui[l];
  const p = resume.profile;
  const tg = pc.tagline[l];
  const projects = resume.projects.filter((x) => x.visible !== false && x.slug);
  const github = p.links.find((k) => /github/i.test(k.url));
  const name = l === "ko" ? p.nameKo : p.nameEn;
  const altName = l === "ko" ? p.nameEn : p.nameKo;

  return (
    <>
      <TopBar locale={l} t={t} view="profile" />
      <main id="main" className="pf">
        {/* ── 소개 ── */}
        <section id="about" className="hero" aria-labelledby="hero-name">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{tx(pc.eyebrow, l)}</p>
              <h1 id="hero-name" className="hero-name">
                {name}
                <span className="hero-alt">{altName}</span>
              </h1>
              <p className="tagline">
                {tg.before}
                <mark className="hl">{tg.mark}</mark>
                {tg.after}
              </p>
              <p className="hero-intro">{tx(pc.intro, l)}</p>
              <div className="hero-cta">
                {github && (
                  <a className="btn btn-ink" href={github.url} target="_blank" rel="noopener noreferrer">
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                )}
                {p.contactVisibility.email && <CopyButton text={p.email} label={t.copyEmail} doneLabel={t.copied} />}
                <a className="btn" href={`/${l}/resume`}>
                  {t.docResume}
                </a>
              </div>
            </div>

            <aside className="log" aria-labelledby="log-title">
              <div className="log-head">
                <h2 id="log-title" className="log-title">{t.logTitle}</h2>
                <span className="log-cap">{t.logCaption}</span>
              </div>
              <ul className="log-list">
                {pc.log.map((x, i) => (
                  <li key={i} className={x.state === "ok" ? "is-ok" : "is-wip"}>
                    <span className="log-icon" aria-hidden="true">{x.state === "ok" ? "✓" : ""}</span>
                    <span className="log-text">{tx(x.text, l)}</span>
                    <span className="log-src">{tx(x.source, l)}</span>
                  </li>
                ))}
              </ul>
              <p className="log-foot mono">
                {t.asOf} {pc.asOf}
              </p>
            </aside>
          </div>

          <div className="wrap">
            <dl className="metrics">
              {pc.metrics.map((m, i) => (
                <div className="metric" key={i}>
                  <dt className="metric-v">
                    <span className="hl-num">{m.value}</span>
                  </dt>
                  <dd>
                    <span className="metric-l">{tx(m.label, l)}</span>
                    <span className="metric-s">{tx(m.source, l)}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── 작업 방식 ── */}
        <section id="how" className="band" aria-labelledby="how-title">
          <div className="wrap">
            <header className="sec-head">
              <h2 id="how-title" className="sec-title">{t.howTitle}</h2>
              <p className="sec-lead">{t.howLead}</p>
            </header>
            <ol className="principles">
              {pc.principles.map((x, i) => (
                <li key={i} className="principle">
                  <span className="principle-n mono">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="principle-t">{tx(x.title, l)}</h3>
                  <p className="principle-b">{tx(x.body, l)}</p>
                  <p className="principle-e">{tx(x.evidence, l)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 프로젝트 ── */}
        <section id="projects" className="band band-plain" aria-labelledby="projects-title">
          <div className="wrap">
            <header className="sec-head">
              <h2 id="projects-title" className="sec-title">{t.projectsTitle}</h2>
              <p className="sec-lead">{t.projectsLead}</p>
            </header>
            <Projects projects={projects} l={l} t={t} />
          </div>
        </section>

        {/* ── 교육 · 자격 · 기술 ── */}
        <section id="edu" className="band" aria-labelledby="edu-title">
          <div className="wrap">
            <header className="sec-head">
              <h2 id="edu-title" className="sec-title">{t.eduTitle}</h2>
            </header>
            <div className="edu-grid">
              <div className="edu-col">
                {resume.education.map((e, i) => (
                  <div className="entry" key={i}>
                    <div className="entry-top">
                      <h3 className="entry-t">{tx(e.school, l)}</h3>
                      {e.period && <span className="mono entry-when">{period(e.period, l)}</span>}
                    </div>
                    <p className="entry-sub">{tx(e.degree, l)}</p>
                    {e.notes?.map((n, j) => (
                      <p className="entry-note" key={j}>{tx(n, l)}</p>
                    ))}
                  </div>
                ))}
                {resume.certificates.map((c, i) => (
                  <div className="entry" key={`c${i}`}>
                    <div className="entry-top">
                      <h3 className="entry-t">{tx(c.name, l)}</h3>
                      {c.date && <span className="mono entry-when">{c.date}</span>}
                    </div>
                    <p className="entry-sub">{tx(c.issuer, l)}</p>
                  </div>
                ))}
              </div>
              <div className="edu-col">
                <h3 className="mini-h">{t.skillsTitle}</h3>
                <dl className="skills">
                  {resume.skills.map((s, i) => (
                    <div className="skill" key={i}>
                      <dt>{tx(s.category, l)}</dt>
                      <dd>
                        <ul className="chips">
                          {s.items.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ── 연락 ── */}
        <section id="contact" className="reach" aria-labelledby="contact-title">
          <div className="wrap reach-grid">
            <div>
              <h2 id="contact-title" className="sec-title">{t.contactTitle}</h2>
              <p className="reach-lead">{t.contactLead}</p>
            </div>
            <dl className="reach-list">
              {p.contactVisibility.email && (
                <div>
                  <dt>{t.email}</dt>
                  <dd>
                    <span className="mono">{p.email}</span>
                    <CopyButton text={p.email} label={t.copyEmail} doneLabel={t.copied} className="btn btn-sm" />
                  </dd>
                </div>
              )}
              {p.contactVisibility.phone && (
                <div>
                  <dt>{t.phone}</dt>
                  <dd className="mono">{p.phone}</dd>
                </div>
              )}
              {github && (
                <div>
                  <dt>GitHub</dt>
                  <dd>
                    <a href={github.url} target="_blank" rel="noopener noreferrer" className="mono">
                      {github.url.replace("https://", "")}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <div className="wrap">
            <p className="footnote">
              <mark className="hl">{t.footNote}</mark> <span className="mono">({t.asOf} {pc.asOf})</span>
            </p>
            <p className="copyright">
              © {new Date().getFullYear()} {name}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
