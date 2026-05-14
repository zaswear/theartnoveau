/* ============================================================
   THE ART NOVEAU — app
   ============================================================ */

const { useState, useEffect, useMemo, useRef } = React;

const CLOUD_NAME = "dkn49zkfr";
const CLOUD_TAG = "arquitecturanoveau";

// ------------------ tweak defaults ------------------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "default",
  "typography": "cormorant",
  "galleryLayout": "grid",
  "language": "es"
}/*EDITMODE-END*/;

// ------------------ helpers ------------------
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: .08 });
    const observeAll = () => {
      document.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
    };
    observeAll();
    // re-observe whenever DOM changes (e.g. gallery resolves async, language toggle re-renders)
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}

function Ornament({ size = 24, color = "currentColor" }) {
  // small decorative SVG flourish (allowed: geometric, simple)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1" aria-hidden="true">
      <path d="M2 16 C 8 8, 14 8, 16 16 C 18 24, 24 24, 30 16" />
      <circle cx="16" cy="16" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

// ------------------ NAV ------------------
function Nav({ lang, setLang, t }) {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="brand">
          <span className="ornament">&amp;</span>
          The Art Noveau
          <small>archive</small>
        </a>
        <nav className="nav-links" aria-label="primary">
          <a href="#essay">{t.nav.essay}</a>
          <a href="#timeline">{t.nav.timeline}</a>
          <a href="#gallery">{t.nav.gallery}</a>
          <a href="#plans">{t.nav.plans}</a>
          <a href="#map">{t.nav.map}</a>
          <a href="#architects">{t.nav.architects}</a>
          <a href="#compare">{t.nav.compare}</a>
          <a href="#glossary">{t.nav.glossary}</a>
          <a href="#obras">{t.nav.obras}</a>
          <a href="#quiz">{t.nav.quiz}</a>
        </nav>
        <div className="lang-switch" role="group" aria-label="language">
          <button className={lang === "es" ? "active" : ""} onClick={() => setLang("es")}>ES</button>
          <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
      </div>
    </header>
  );
}

// ------------------ HERO ------------------
function Hero({ t }) {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div>
          <div className="hero-eyebrow">{t.hero.eyebrow}</div>
          <h1>
            <span>{t.hero.title[0]} </span>
            <em>{t.hero.title[1]}</em>
            <br />
            <span>{t.hero.title[2]}</span>
          </h1>
          <div className="hero-meta">
            {t.hero.meta.map((m, i) => (
              <span key={i}>{m.k}<strong>{m.v}</strong></span>
            ))}
          </div>
        </div>
        <p className="hero-lede">{t.hero.lede}</p>
      </div>
      <svg className="hero-curl" viewBox="0 0 600 600" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
        <path d="M 80 540 C 80 380, 200 320, 300 320 C 400 320, 520 260, 520 120 C 520 60, 470 30, 420 30 C 350 30, 320 90, 320 150 C 320 230, 380 270, 460 270" />
        <path d="M 80 540 C 80 480, 120 460, 160 460 C 200 460, 240 480, 240 520" />
        <circle cx="460" cy="270" r="4" fill="currentColor" stroke="none" />
        <circle cx="240" cy="520" r="3" fill="currentColor" stroke="none" />
      </svg>
    </section>
  );
}

// ------------------ SECTION HEAD ------------------
function SectionHead({ num, title, tag, id }) {
  return (
    <div className="section-head reveal" id={id}>
      <div className="section-num">{num}</div>
      <h2>
        {title.map((part, i) => part === "—" ? <em key={i}>—</em> : <span key={i}>{part}</span>)}
      </h2>
      <div className="section-tag">{tag}</div>
    </div>
  );
}

function Flourish() {
  return <div className="flourish" aria-hidden="true"><span>~&nbsp;&amp;&nbsp;~</span></div>;
}

// ------------------ ESSAY ------------------
function Essay({ t }) {
  return (
    <section>
      <div className="container">
        <SectionHead num={`${t.essay.num} · ${t.nav.essay}`} title={t.essay.title} tag={t.essay.tag} id="essay" />
        <div className="essay reveal">
          <aside>
            <dl>
              {t.essay.aside.map((row, i) => (
                <React.Fragment key={i}>
                  <dt>{row.k}</dt>
                  <dd>{row.v}</dd>
                </React.Fragment>
              ))}
            </dl>
          </aside>
          <div className="essay-body" dangerouslySetInnerHTML={{ __html: t.essay.body }} />
        </div>
      </div>
    </section>
  );
}

// ------------------ TIMELINE ------------------
function Timeline({ t }) {
  const years = [];
  for (let y = 1890; y <= 1914; y++) years.push(y);
  const events = t.timeline.events;
  // alternate above/below stems? all above for readability
  // assign vertical heights cyclically
  return (
    <section>
      <div className="container">
        <SectionHead num={`${t.timeline.num} · ${t.nav.timeline}`} title={t.timeline.title} tag={t.timeline.tag} id="timeline" />
        <div className="timeline reveal">
          <div className="timeline-track">
            <div className="timeline-axis" />
            <div className="timeline-ticks">
              {years.map(y => <div key={y} />)}
            </div>
            <div className="timeline-years">
              {years.map(y => <div className="year" key={y}>{y % 5 === 0 ? y : ""}</div>)}
            </div>
            {events.map((ev, i) => {
              const pct = ((ev.year - 1890) / 24) * 100;
              const above = i % 2 === 1;
              // 4-cycle stem heights so consecutive same-side labels sit at very different distances from axis
              const cycle = i % 4;
              const stemH = (cycle === 0 || cycle === 3) ? 110 : 210;
              return (
                <div
                  className={"tl-marker " + (above ? "above" : "below")}
                  key={i}
                  style={{ left: pct + "%", "--stem-h": stemH + "px" }}
                >
                  <div className="dot" />
                  <div className="stem" style={{ height: stemH }} />
                  <div className="label">
                    <small>{ev.year}</small>
                    {ev.label}
                    <span className="sub">{ev.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="timeline-legend">
            <span>← {t.timeline.legend[0]}</span>
            <span>{t.timeline.legend[1]}</span>
            <span>{t.timeline.legend[2]} →</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------ GALLERY ------------------
function buildCloudinaryUrl(publicId, w = 800) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_fill,w_${w},q_auto,f_auto/${publicId}`;
}

function Gallery({ t, layout }) {
  const [state, setState] = useState({ status: "loading", items: [] });
  const [lb, setLb] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${CLOUD_TAG}.json`;
    fetch(url)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => {
        if (cancelled) return;
        const items = (data.resources || []).map(r => ({
          id: r.public_id,
          format: r.format,
          version: r.version,
          context: r.context || {}
        }));
        setState({ status: items.length ? "ok" : "empty", items });
      })
      .catch(err => {
        if (cancelled) return;
        setState({ status: "empty", items: [], err });
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!lb) return;
    const onKey = (e) => { if (e.key === "Escape") setLb(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lb]);

  return (
    <section>
      <div className="container">
        <SectionHead num={`${t.gallery.num} · ${t.nav.gallery}`} title={t.gallery.title} tag={t.gallery.tag} id="gallery" />

        <div className="gallery-toolbar reveal">
          <div className="count">
            <strong>{state.status === "ok" ? String(state.items.length).padStart(2, "0") : "—"}</strong>
            {t.gallery.toolbarLabel}
          </div>
          <div>tag · <span style={{ color: "var(--accent)" }}>{CLOUD_TAG}</span> · {t.gallery.sourceLabel}</div>
        </div>

        {state.status === "loading" && (
          <div className="gallery-empty">{t.gallery.loading}</div>
        )}

        {state.status === "empty" && (
          <div className="gallery-empty">
            <h3 style={{ marginBottom: 12, fontSize: 28 }}>{t.gallery.emptyTitle}</h3>
            <p>{t.gallery.emptyText} <code>{CLOUD_TAG}</code></p>
            <p style={{ marginTop: 16, fontSize: 14, color: "var(--ink-faint)" }}>{t.gallery.emptyHint}</p>
            {/* placeholder tiles so the page doesn't feel broken */}
            <div className="gallery-grid" data-layout="grid" style={{ marginTop: 36 }}>
              {Array.from({ length: t.gallery.placeholderCount }).map((_, i) => (
                <div className="tile tile-placeholder" key={i}>
                  Imagen · {String(i + 1).padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
        )}

        {state.status === "ok" && (
          <div className="gallery-grid" data-layout={layout}>
            {state.items.map((it) => {
              const url = buildCloudinaryUrl(it.id, 900);
              const big = buildCloudinaryUrl(it.id, 1800);
              const caption = it.context?.custom?.caption || it.context?.caption || prettyName(it.id);
              const alt = it.context?.custom?.alt || caption;
              return (
                <div className="tile" key={it.id} onClick={() => setLb({ url: big, caption })}>
                  <img src={url} alt={alt} loading="lazy" />
                  <div className="caption">
                    {caption}
                    <small>{CLOUD_TAG}</small>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {lb && (
        <div className="lightbox" onClick={() => setLb(null)}>
          <button className="lb-close" onClick={(e) => { e.stopPropagation(); setLb(null); }}>Esc · cerrar</button>
          <img src={lb.url} alt={lb.caption} />
          <div className="lb-cap">{lb.caption}</div>
        </div>
      )}
    </section>
  );
}

function prettyName(publicId) {
  return publicId.split("/").pop().replace(/[-_]/g, " ").replace(/\.\w+$/, "");
}

// ------------------ PLANS (schematic diagrams) ------------------
function PlanFigure({ kind }) {
  switch (kind) {
    case "whiplash":
      return (
        <svg viewBox="0 0 400 300" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M 30 240 C 100 240, 120 200, 140 160 C 160 110, 220 80, 270 110 C 320 140, 320 200, 290 230" />
          <circle cx="30" cy="240" r="3" fill="currentColor" stroke="none" />
          <circle cx="290" cy="230" r="5" fill="currentColor" stroke="none" />
          {/* axis */}
          <line x1="30" y1="270" x2="370" y2="270" stroke="currentColor" strokeDasharray="2 4" opacity="0.4" />
          <text x="30" y="285" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6">A</text>
          <text x="370" y="285" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6" textAnchor="end">A'</text>
          {/* knot */}
          <circle cx="140" cy="160" r="10" stroke="currentColor" opacity="0.4" />
          <text x="155" y="158" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6">knot · nudo</text>
        </svg>
      );
    case "stem":
      return (
        <svg viewBox="0 0 400 300" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* central stem */}
          <line x1="200" y1="270" x2="200" y2="40" />
          {/* bulb at base */}
          <ellipse cx="200" cy="270" rx="22" ry="8" />
          {/* nodes */}
          {[210, 170, 130, 90].map((y, i) => (
            <g key={i}>
              <circle cx="200" cy={y} r="3" fill="currentColor" stroke="none" />
              <path d={`M 200 ${y} Q ${200 + (i%2===0?60:-60)} ${y-10}, ${200 + (i%2===0?80:-80)} ${y-2}`} />
            </g>
          ))}
          {/* flower */}
          <circle cx="200" cy="40" r="8" />
          <circle cx="200" cy="40" r="14" opacity="0.4" />
          {/* labels */}
          <text x="232" y="274" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6">bulbo</text>
          <text x="232" y="212" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6">nodo</text>
          <text x="232" y="134" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6">hoja</text>
          <text x="232" y="44" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6">flor</text>
        </svg>
      );
    case "iron":
      return (
        <svg viewBox="0 0 400 300" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* column trunk */}
          <line x1="120" y1="40" x2="120" y2="260" />
          <line x1="118" y1="40" x2="118" y2="260" />
          {/* capital — splaying branches */}
          <path d="M 120 60 C 80 50, 60 80, 50 110" />
          <path d="M 120 60 C 160 50, 180 80, 190 110" />
          <path d="M 120 80 C 90 80, 70 110, 70 140" />
          <path d="M 120 80 C 150 80, 170 110, 170 140" />
          {/* base */}
          <line x1="80" y1="260" x2="160" y2="260" />
          <line x1="90" y1="270" x2="150" y2="270" />
          {/* annotation */}
          <line x1="220" y1="60" x2="260" y2="60" stroke="currentColor" opacity="0.5" />
          <text x="265" y="64" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">capitel orgánico</text>
          <line x1="220" y1="170" x2="260" y2="170" stroke="currentColor" opacity="0.5" />
          <text x="265" y="174" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">tronco · hierro</text>
          <line x1="220" y1="265" x2="260" y2="265" stroke="currentColor" opacity="0.5" />
          <text x="265" y="269" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">base · pétrea</text>
        </svg>
      );
    case "arches":
      return (
        <svg viewBox="0 0 400 300" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* segmental arch */}
          <g transform="translate(20,40)">
            <path d="M 0 120 L 0 80 Q 40 30, 80 80 L 80 120 Z" />
            <text x="40" y="140" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="currentColor" opacity="0.7">rebajado</text>
          </g>
          {/* parabolic — Gaudí */}
          <g transform="translate(120,40)">
            <path d="M 0 120 L 0 100 C 0 30, 80 30, 80 100 L 80 120 Z" />
            <text x="40" y="140" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="currentColor" opacity="0.7">parabólico</text>
          </g>
          {/* trefoil — Guimard */}
          <g transform="translate(220,40)">
            <path d="M 0 120 L 0 60 Q 0 30, 25 30 Q 40 30, 40 50 Q 40 30, 55 30 Q 80 30, 80 60 L 80 120 Z" />
            <text x="40" y="140" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="currentColor" opacity="0.7">trifolio</text>
          </g>
          {/* dissolved square */}
          <g transform="translate(20,180)">
            <rect x="0" y="0" width="80" height="80" />
            <path d="M 0 20 Q 20 0, 40 20 Q 60 40, 80 20" opacity="0.5" />
            <path d="M 0 60 Q 20 40, 40 60 Q 60 80, 80 60" opacity="0.5" />
            <text x="40" y="100" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="currentColor" opacity="0.7">cuadrado disuelto</text>
          </g>
          {/* ferro round */}
          <g transform="translate(120,180)">
            <circle cx="40" cy="40" r="40" />
            <path d="M 8 40 Q 24 24, 40 40 Q 56 56, 72 40" opacity="0.5" />
            <text x="40" y="100" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="currentColor" opacity="0.7">óculo</text>
          </g>
          {/* tudor mouth */}
          <g transform="translate(220,180)">
            <path d="M 0 80 L 0 30 Q 20 0, 40 25 Q 60 0, 80 30 L 80 80 Z" />
            <text x="40" y="100" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="currentColor" opacity="0.7">flor invertida</text>
          </g>
        </svg>
      );
    case "facade":
      return (
        <svg viewBox="0 0 400 300" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* facade rectangle */}
          <rect x="120" y="20" width="160" height="260" />
          {/* plinth */}
          <line x1="120" y1="240" x2="280" y2="240" />
          <rect x="180" y="245" width="40" height="35" />
          {/* piano nobile */}
          <line x1="120" y1="170" x2="280" y2="170" />
          <path d="M 150 200 Q 175 175, 200 200" />
          <path d="M 250 200 Q 225 175, 200 200" opacity="0" />
          <rect x="140" y="180" width="40" height="55" />
          <rect x="220" y="180" width="40" height="55" />
          {/* mid */}
          <line x1="120" y1="100" x2="280" y2="100" />
          <rect x="140" y="110" width="40" height="55" />
          <rect x="220" y="110" width="40" height="55" />
          {/* attic */}
          <path d="M 120 100 C 160 60, 240 60, 280 100" opacity="0.4" />
          <circle cx="200" cy="50" r="14" />
          <path d="M 200 36 Q 215 50, 200 64 Q 185 50, 200 36" opacity="0.4" />
          {/* axis */}
          <line x1="200" y1="20" x2="200" y2="280" stroke="currentColor" strokeDasharray="2 3" opacity="0.3" />
          {/* labels */}
          <text x="310" y="265" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">zócalo · raíz</text>
          <text x="310" y="200" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">piano nobile</text>
          <text x="310" y="135" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">tronco</text>
          <text x="310" y="60" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">ático florido</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 400 300" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* ferronnerie grille */}
          {[0,1,2,3,4].map(i => (
            <path key={i} d={`M ${40+i*72} 40 Q ${60+i*72} 80, ${40+i*72} 120 Q ${20+i*72} 160, ${40+i*72} 200 Q ${60+i*72} 240, ${40+i*72} 280`} />
          ))}
          <line x1="20" y1="40" x2="380" y2="40" />
          <line x1="20" y1="280" x2="380" y2="280" />
          <text x="200" y="30" fontSize="9" fontFamily="monospace" textAnchor="middle" fill="currentColor" opacity="0.6">ferronnerie · trama libre</text>
        </svg>
      );
  }
}

function Plans({ t }) {
  return (
    <section>
      <div className="container">
        <SectionHead num={`${t.plans.num} · ${t.nav.plans}`} title={t.plans.title} tag={t.plans.tag} id="plans" />
        <div className="plans-grid reveal">
          {t.plans.plates.map((p) => (
            <article className="plate" key={p.n}>
              <span className="plate-corner" />
              <span className="plate-corner bl" />
              <div className="plate-head">
                <span className="plate-num">{p.n}</span>
                <span>{p.tag}</span>
              </div>
              <div className="plate-figure"><PlanFigure kind={p.fig} /></div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------ MAP ------------------
function CityMap({ t }) {
  const [active, setActive] = useState(t.map.defaultCity || 0);
  const city = t.map.cities[active];
  return (
    <section>
      <div className="container">
        <SectionHead num={`${t.map.num} · ${t.nav.map}`} title={t.map.title} tag={t.map.tag} id="map" />
        <div className="map-wrap reveal">
          <div className="map-canvas">
            {/* abstract europe outline — VERY loose */}
            <svg viewBox="0 0 100 75" preserveAspectRatio="none" fill="none" stroke="currentColor" opacity="0.35" strokeWidth="0.3">
              <path d="M 8 12 L 18 8 L 30 6 L 42 10 L 50 6 L 60 8 L 72 12 L 80 18 L 78 28 L 84 36 L 80 46 L 70 54 L 62 60 L 50 64 L 38 66 L 30 70 L 22 64 L 18 56 L 12 50 L 8 42 L 10 32 L 6 22 Z" />
              <path d="M 8 12 L 6 22 L 10 32" />
              {/* iberian peninsula */}
              <path d="M 30 56 L 28 64 L 38 66 L 44 62 L 44 56 L 38 54 Z" />
              {/* italy boot */}
              <path d="M 56 50 L 58 64 L 60 66 L 62 60 L 60 54 Z" />
              {/* uk */}
              <path d="M 30 12 L 28 22 L 36 24 L 40 16 L 38 10 Z" />
              {/* meridians */}
              {[20,40,60,80].map(x => (
                <line key={x} x1={x} y1="4" x2={x} y2="72" strokeDasharray="0.4 0.8" opacity="0.5" />
              ))}
              {[15,30,45,60].map(y => (
                <line key={y} x1="4" y1={y} x2="96" y2={y} strokeDasharray="0.4 0.8" opacity="0.5" />
              ))}
            </svg>
            {/* connecting lines between cities */}
            <svg viewBox="0 0 100 75" preserveAspectRatio="none" fill="none" stroke="currentColor" opacity="0.18" strokeWidth="0.2" style={{ pointerEvents: "none" }}>
              {t.map.cities.map((c, i) =>
                t.map.cities.slice(i+1).map((c2, j) => (
                  <line key={`${i}-${j}`} x1={c.x} y1={c.y} x2={c2.x} y2={c2.y} />
                ))
              )}
            </svg>
            {t.map.cities.map((c, i) => (
              <button
                key={i}
                className={"map-pin " + (i === active ? "active" : "")}
                style={{ left: c.x + "%", top: c.y + "%" }}
                onClick={() => setActive(i)}
                aria-label={c.name}
              >
                <span className="ring" />
                <span className="pin-label">{c.name}</span>
              </button>
            ))}
          </div>
          <div className="map-info">
            <div className="eye">{t.map.eye} · {city.country}</div>
            <h3>{city.name}</h3>
            <ul>
              {city.works.map((w, j) => (
                <li key={j}><span>{w.t}</span><small>{w.v}</small></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------ ARCHITECTS ------------------
function Architects({ t }) {
  return (
    <section>
      <div className="container">
        <SectionHead num={`${t.architects.num} · ${t.nav.architects}`} title={t.architects.title} tag={t.architects.tag} id="architects" />
        <div className="architects reveal">
          {t.architects.list.map((a, i) => (
            <article className="bio" key={i}>
              <div className="bio-head">
                <span>{a.tag}</span>
                <span>{a.years}</span>
              </div>
              <h3>
                {a.name}
                <em>{a.subtitle}</em>
              </h3>
              <div className="portrait" data-name={a.name + " · " + a.place}>
                {a.photo && <img src={a.photo} alt={a.name} loading="lazy" />}
              </div>
              <p>{a.bio}</p>
              <div className="works">
                <span>obras · works</span>
                <br />
                {a.works.join(" · ")}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------ COMPARE ------------------
function Compare({ t }) {
  return (
    <section>
      <div className="container">
        <SectionHead num={`${t.compare.num} · ${t.nav.compare}`} title={t.compare.title} tag={t.compare.tag} id="compare" />
        <div className="compare-grid reveal">
          {t.compare.list.map((c, i) => (
            <article key={i} className={"museum-card" + (c.subject ? " is-subject" : "")}>
              <div className="mc-eye">{c.eye}</div>
              <h3>{c.name}</h3>
              <div className="mc-date">{c.date}</div>
              <div className="mc-rule" />
              <p>{c.text}</p>
              <div className="mc-where">{c.where}</div>
              <ul className="mc-tags">
                {c.tags.map((tag, j) => <li key={j}>{tag}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------ GLOSSARY ------------------
function Glossary({ t }) {
  return (
    <section>
      <div className="container">
        <SectionHead num={`${t.glossary.num} · ${t.nav.glossary}`} title={t.glossary.title} tag={t.glossary.tag} id="glossary" />
        <dl className="glossary reveal">
          {t.glossary.items.map((it, i) => (
            <div className="gloss-item" key={i}>
              <dt>{it.term}<small>{it.sub}</small></dt>
              <dd>{it.def}</dd>
            </div>
          ))}
        </dl>
        <Flourish />
      </div>
    </section>
  );
}

// ------------------ OBRAS ------------------
function Obras({ t }) {
  return (
    <section>
      <div className="container">
        <SectionHead num={`${t.obras.num} · ${t.nav.obras}`} title={t.obras.title} tag={t.obras.tag} id="obras" />
        <div className="obras-grid reveal">
          {t.obras.list.map((o, i) => (
            <article className="obra-card" key={i}>
              <div className="obra-photo">
                <img src={o.photo} alt={o.name} loading="lazy" />
                <span className="obra-year">{o.year}</span>
              </div>
              <div className="obra-body">
                <div className="obra-meta">
                  <span className="obra-tag">{o.tag}</span>
                  <span className="obra-city">{o.city} · {o.country}</span>
                </div>
                <h3>{o.name}</h3>
                <p className="obra-architect">{o.architect}</p>
                <p className="obra-desc">{o.desc}</p>
                <dl className="obra-ficha">
                  <dt>Estilo · Style</dt><dd>{o.ficha.estilo}</dd>
                  <dt>Uso · Use</dt><dd>{o.ficha.uso}</dd>
                  <dt>Estado · Status</dt><dd>{o.ficha.estado}</dd>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------ QUIZ ------------------
function Quiz({ t }) {
  const q = t.quiz.q;
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function restart() {
    setStarted(false);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  function pick(idx) {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q[current].answer) setScore(s => s + 1);
  }

  function next() {
    if (current + 1 >= q.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  }

  const pct = Math.round((score / q.length) * 100);
  const verdict = pct === 100 ? t.quiz.perfect : pct >= 70 ? t.quiz.great : pct >= 40 ? t.quiz.good : t.quiz.low;

  if (!started) {
    return (
      <section>
        <div className="container">
          <SectionHead num={`${t.quiz.num} · ${t.nav.quiz}`} title={t.quiz.title} tag={t.quiz.tag} id="quiz" />
          <div className="quiz-intro reveal">
            <p>{t.quiz.intro}</p>
            <button className="quiz-btn-start" onClick={() => setStarted(true)}>{t.quiz.btnStart}</button>
          </div>
        </div>
      </section>
    );
  }

  if (finished) {
    return (
      <section>
        <div className="container">
          <SectionHead num={`${t.quiz.num} · ${t.nav.quiz}`} title={t.quiz.title} tag={t.quiz.tag} id="quiz" />
          <div className="quiz-result reveal">
            <div className="quiz-score-circle">
              <span className="quiz-score-num">{score}</span>
              <span className="quiz-score-sep">{t.quiz.of}</span>
              <span className="quiz-score-total">{q.length}</span>
            </div>
            <p className="quiz-verdict">{verdict}</p>
            <button className="quiz-btn-start" onClick={restart}>{t.quiz.btnRetry}</button>
          </div>
        </div>
      </section>
    );
  }

  const item = q[current];
  return (
    <section>
      <div className="container">
        <SectionHead num={`${t.quiz.num} · ${t.nav.quiz}`} title={t.quiz.title} tag={t.quiz.tag} id="quiz" />
        <div className="quiz-wrap reveal">
          <div className="quiz-progress">
            <div className="quiz-bar" style={{ width: `${((current) / q.length) * 100}%` }} />
            <span>{current + 1} / {q.length}</span>
          </div>
          <div className="quiz-stage">
            <div className="quiz-photo">
              <img src={item.photo} alt="edificio" />
            </div>
            <div className="quiz-panel">
              <p className="quiz-q">{item.q}</p>
              <div className="quiz-options">
                {item.options.map((opt, i) => {
                  let cls = "quiz-opt";
                  if (selected !== null) {
                    if (i === item.answer) cls += " correct";
                    else if (i === selected) cls += " wrong";
                    else cls += " dim";
                  }
                  return (
                    <button key={i} className={cls} onClick={() => pick(i)}>{opt}</button>
                  );
                })}
              </div>
              {selected !== null && (
                <button className="quiz-btn-next" onClick={next}>{t.quiz.btnNext} →</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------ FOOTER ------------------
function Footer({ t, lang }) {
  return (
    <footer className="foot">
      <div className="container">
        <div>
          <div className="ornament">&amp;</div>
          <h4>{t.footer.title}</h4>
          <p>{t.footer.blurb}</p>
        </div>
        {t.footer.cols.map((col, i) => (
          <div className="col" key={i}>
            <h5>{col.h}</h5>
            <ul>
              {col.links.map((l, j) => <li key={j}><a href={l[0]}>{l[1]}</a></li>)}
            </ul>
          </div>
        ))}
        <div className="fine">
          <span>{t.footer.fine[0]}</span>
          <span>{t.footer.fine[1]} · {lang.toUpperCase()}</span>
        </div>
      </div>
    </footer>
  );
}

// ------------------ TWEAKS ------------------
function Tweaks({ tweaks, setTweak, t }) {
  return (
    <TweaksPanel title="Tweaks · The Art Noveau">
      <TweakSection label="Idioma · Language">
        <TweakRadio
          options={[{ value: "es", label: "ES" }, { value: "en", label: "EN" }]}
          value={tweaks.language}
          onChange={(v) => setTweak("language", v)}
        />
      </TweakSection>
      <TweakSection label="Paleta">
        <TweakColor
          options={[
            ["#6b2737", "#a8853a", "#f3ead8"],
            ["#4a5a2b", "#8a6b2c", "#ebe5d4"],
            ["#1c2231", "#6b2737", "#ebe5d4"],
            ["#8a3a4a", "#b0884a", "#f5ebe0"]
          ]}
          value={
            tweaks.palette === "default" ? ["#6b2737", "#a8853a", "#f3ead8"] :
            tweaks.palette === "moss"    ? ["#4a5a2b", "#8a6b2c", "#ebe5d4"] :
            tweaks.palette === "ink"     ? ["#1c2231", "#6b2737", "#ebe5d4"] :
                                            ["#8a3a4a", "#b0884a", "#f5ebe0"]
          }
          onChange={(v) => {
            const map = {
              "#6b2737": "default", "#4a5a2b": "moss",
              "#1c2231": "ink",     "#8a3a4a": "rose"
            };
            setTweak("palette", map[v[0]] || "default");
          }}
        />
      </TweakSection>
      <TweakSection label="Tipografía">
        <TweakSelect
          options={[
            { value: "cormorant",  label: "Cormorant Garamond + Lora" },
            { value: "dmserif",    label: "DM Serif Display + Spectral" },
            { value: "ebgaramond", label: "EB Garamond (única)" }
          ]}
          value={tweaks.typography}
          onChange={(v) => setTweak("typography", v)}
        />
      </TweakSection>
      <TweakSection label="Layout galería">
        <TweakRadio
          options={[
            { value: "grid",    label: "Cuadrícula" },
            { value: "masonry", label: "Mosaico" },
            { value: "strip",   label: "Cinta" }
          ]}
          value={tweaks.galleryLayout}
          onChange={(v) => setTweak("galleryLayout", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// ------------------ ROOT ------------------
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState(tweaks.language || "es");
  useReveal();

  // sync lang <-> tweak
  useEffect(() => { setTweak("language", lang); }, [lang]);
  useEffect(() => {
    if (tweaks.language && tweaks.language !== lang) setLang(tweaks.language);
  }, [tweaks.language]);

  // apply palette + type
  useEffect(() => {
    document.documentElement.setAttribute("data-palette", tweaks.palette);
    document.documentElement.setAttribute("data-type", tweaks.typography);
    document.documentElement.setAttribute("lang", lang);
  }, [tweaks.palette, tweaks.typography, lang]);

  const t = window.CONTENT[lang];

  return (
    <React.Fragment>
      <Nav lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <Essay t={t} />
      <Timeline t={t} />
      <Gallery t={t} layout={tweaks.galleryLayout} />
      <Plans t={t} />
      <CityMap t={t} />
      <Architects t={t} />
      <Compare t={t} />
      <Glossary t={t} />
      <Obras t={t} />
      <Quiz t={t} />
      <Footer t={t} lang={lang} />
      <Tweaks tweaks={tweaks} setTweak={setTweak} t={t} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
