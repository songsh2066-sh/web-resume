"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale, Project } from "@/data/types";
import { period, tx } from "@/lib/i18n";
import DeltaBar from "./DeltaBar";
import Flow from "./Flow";

type T = Record<string, string>;

function Status({ p, t }: { p: Project; t: T }) {
  const building = p.status === "building";
  return (
    <span className={`status ${building ? "is-wip" : "is-live"}`}>
      <span className="status-dot" aria-hidden="true" />
      {building ? t.statusBuilding : t.statusLive}
    </span>
  );
}

function host(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

function Visual({ p, l }: { p: Project; l: Locale }) {
  if (p.image) {
    const url = p.links?.[0]?.url;
    return (
      <div className="shot">
        <div className="shot-bar" aria-hidden="true">
          <span className="shot-url">{url ? host(url) : ""}</span>
        </div>
        <img src={p.image.src} alt={tx(p.image.alt, l)} width={p.image.width} height={p.image.height} loading="lazy" />
      </div>
    );
  }
  if (p.flow) return <Flow steps={p.flow} l={l} variant="diagram" />;
  return null;
}

function Evidence({ p, l, t, all }: { p: Project; l: Locale; t: T; all: boolean }) {
  if (p.deltas?.length) {
    const list = all ? p.deltas : p.deltas.slice(0, 2);
    return (
      <div className="evidence">
        <h4 className="mini-h">{t.measured}</h4>
        <div className={`deltas ${all ? "is-all" : ""}`}>
          {list.map((d, i) => (
            <DeltaBar key={i} d={d} l={l} t={t} />
          ))}
        </div>
      </div>
    );
  }
  if (p.facts?.length) {
    return (
      <div className="evidence">
        <h4 className="mini-h">{t.checked}</h4>
        <dl className="facts">
          {p.facts.map((f, i) => (
            <div className="fact" key={i}>
              <dt className="fact-v">{f.value}</dt>
              <dd>
                <span className="fact-l">{tx(f.label, l)}</span>
                {f.source && <span className="fact-s">{tx(f.source, l)}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }
  return null;
}

function Links({ p, t }: { p: Project; t: T }) {
  return (
    <>
      {p.links?.map((k) => (
        <a key={k.url} className="btn" href={k.url} target="_blank" rel="noopener noreferrer">
          {k.label} <span aria-hidden="true">↗</span>
        </a>
      ))}
      {p.privateRepo && !p.links?.length && <span className="note">{t.privateRepo}</span>}
    </>
  );
}

export default function Projects({ projects, l, t }: { projects: Project[]; l: Locale; t: T }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const open = projects.find((p) => p.slug === openId) ?? null;

  const close = useCallback(() => {
    setOpenId(null);
    if (location.hash) history.replaceState(null, "", location.pathname);
    triggerRef.current?.focus();
  }, []);

  // 주소에 #erlink처럼 프로젝트가 있으면 열린 채로 시작합니다 (공유 링크).
  useEffect(() => {
    const h = location.hash.replace("#", "");
    if (projects.some((p) => p.slug === h)) setOpenId(h);
  }, [projects]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  function show(p: Project, btn: HTMLButtonElement) {
    triggerRef.current = btn;
    setOpenId(p.slug ?? null);
    if (p.slug) history.replaceState(null, "", `#${p.slug}`);
  }

  return (
    <>
      <div className="cards">
        {projects.map((p) => (
          <article className="card" key={p.id}>
            <div className="card-visual">
              <Visual p={p} l={l} />
            </div>
            <div className="card-body">
              <div className="card-meta">
                <Status p={p} t={t} />
                <span className="mono">{period(p.period, l)}</span>
                <span className="card-role">{tx(p.role, l)}</span>
              </div>
              <h3 className="card-title">{tx(p.title ?? p.name, l)}</h3>
              <p className="card-sum">{tx(p.summary ?? p.purpose, l)}</p>
              <Evidence p={p} l={l} t={t} all={false} />
              {p.featuredTech?.length ? (
                <ul className="chips" aria-label={t.techAll}>
                  {p.featuredTech.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              ) : null}
              <div className="card-actions">
                <button type="button" className="btn btn-ink" onClick={(e) => show(p, e.currentTarget)} aria-haspopup="dialog">
                  {t.detail} <span aria-hidden="true">→</span>
                </button>
                <Links p={p} t={t} />
              </div>
            </div>
          </article>
        ))}
      </div>

      {open && (
        <div className="drawer-wrap" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
            <header className="drawer-head">
              <div className="card-meta">
                <Status p={open} t={t} />
                <span className="mono">{period(open.period, l)}</span>
                <span className="card-role">{tx(open.role, l)}</span>
              </div>
              <button ref={closeRef} type="button" className="icon-btn" onClick={close} aria-label={t.close}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </header>
            <div className="drawer-body">
              <h2 id="drawer-title" className="drawer-title">{tx(open.title ?? open.name, l)}</h2>
              <p className="drawer-lead">{tx(open.purpose, l)}</p>
              {open.image && (
                <div className="drawer-shot">
                  <Visual p={open} l={l} />
                </div>
              )}
              {open.problem && (
                <section>
                  <h4 className="mini-h">{t.problem}</h4>
                  <p>{tx(open.problem, l)}</p>
                </section>
              )}
              {open.flow && (
                <section>
                  <h4 className="mini-h">{t.flow}</h4>
                  <Flow steps={open.flow} l={l} variant="list" />
                </section>
              )}
              <Evidence p={open} l={l} t={t} all />
              <section>
                <h4 className="mini-h">{t.did}</h4>
                <ul className="did">
                  {open.results.map((r, i) => (
                    <li key={i}>{tx(r, l)}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h4 className="mini-h">{t.techAll}</h4>
                <ul className="chips">
                  {open.tech.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </section>
              <div className="card-actions">
                <Links p={open} t={t} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
