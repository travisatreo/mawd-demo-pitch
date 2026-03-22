"use client";

import { useState } from "react";

const C = {
  bg: "#07070F",
  cream: "#F5F1EA",
  gold: "#C4953A",
  gold2: "#E8B84B",
  muted: "rgba(245, 241, 234, 0.55)",
  body: "rgba(245, 241, 234, 0.88)",
  dim: "rgba(245, 241, 234, 0.35)",
  rule: "rgba(196, 149, 58, 0.2)",
  green: "#2ECC71",
  red: "#E74C3C",
};

const serif = "'EB Garamond', Georgia, serif";
const display = "'Playfair Display', serif";

const ANIM = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes dot {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
    40% { transform: translateY(-5px); opacity: 1; }
  }
  .fu  { animation: fadeUp 0.8s ease both; }
  .fu1 { animation: fadeUp 0.8s ease 0.15s both; }
  .fu2 { animation: fadeUp 0.8s ease 0.3s both; }
  .fu3 { animation: fadeUp 0.8s ease 0.45s both; }
  .fu4 { animation: fadeUp 0.8s ease 0.6s both; }
  .fu5 { animation: fadeUp 0.8s ease 0.75s both; }
  .fu6 { animation: fadeUp 0.8s ease 0.9s both; }
`;

const GRAIN_SVG = "data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E";

function Gold({ children }) {
  return <span style={{ color: C.gold2 }}>{children}</span>;
}
function Kicker({ children }) {
  return (
    <span className="fu1" style={{
      fontFamily: serif, fontStyle: "italic", fontSize: 14,
      letterSpacing: "0.15em", color: C.gold2, textTransform: "uppercase",
      display: "block", marginBottom: 20,
    }}>{children}</span>
  );
}
function Rule() {
  return <div style={{ width: 60, height: 2, background: `linear-gradient(90deg, ${C.gold}, transparent)`, margin: "24px 0 32px" }} />;
}
function Btn({ onClick, children }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", background: "transparent",
      color: C.gold2, border: `1px solid ${C.gold}`,
      borderRadius: 0, padding: "16px", fontSize: 16,
      cursor: "pointer", letterSpacing: "0.12em",
      fontFamily: serif, fontStyle: "italic",
      textTransform: "uppercase",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={e => { e.target.style.background = C.gold; e.target.style.color = C.bg; }}
    onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = C.gold2; }}
    >{children}</button>
  );
}
function Pull({ children }) {
  return (
    <div style={{
      fontFamily: display, fontStyle: "italic", fontWeight: 700,
      fontSize: "clamp(24px, 5vw, 32px)", lineHeight: 1.2,
      color: C.gold2, textAlign: "center",
      padding: "40px 0", margin: "32px 0",
      borderTop: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}`,
    }}>{children}</div>
  );
}
function Quote({ children }) {
  return (
    <blockquote style={{
      borderLeft: `2px solid ${C.gold}`, padding: "4px 0 4px 28px", margin: "32px 0",
    }}>
      <p style={{
        fontFamily: display, fontStyle: "italic", fontSize: 20,
        lineHeight: 1.4, color: C.cream, margin: 0,
      }}>{children}</p>
    </blockquote>
  );
}
function Dots() {
  return (
    <div style={{ display: "flex", gap: 5, padding: "4px 0" }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width: 5, height: 5, borderRadius: "50%", background: C.gold,
          animation: `dot 1.2s ease ${i*0.2}s infinite`,
        }}/>
      ))}
    </div>
  );
}

// ── SCREEN 0 — Opening Statement ──────────────────────────────
function S0({ next }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", height:"100%", padding:"0 32px" }}>
      <Kicker>Fanded · Pre-Seed</Kicker>

      <h1 className="fu2" style={{
        fontFamily: display, fontSize: "clamp(36px, 8vw, 52px)", fontWeight: 900,
        color: C.cream, lineHeight: 1.0, letterSpacing: "-0.02em", margin: "0 0 20px",
      }}>
        The future of<br />artist management<br />
        is <em style={{ fontStyle:"italic", color: C.gold2 }}>self-managed.</em>
      </h1>

      <p className="fu3" style={{
        fontFamily: serif, fontStyle: "italic", fontSize: 19,
        color: C.muted, lineHeight: 1.55, margin: "0 0 40px", maxWidth: 340,
      }}>
        Powered by agentic AI.<br />
        We&apos;re building the infrastructure.<br />
        <span style={{ color: C.cream }}>It&apos;s already working.</span>
      </p>

      <Rule />

      <div className="fu4" style={{ maxWidth: 320 }}>
        <Btn onClick={next}>See How It Works →</Btn>
      </div>
    </div>
  );
}

// ── SCREEN 1 — The Problem ────────────────────────────────────
function S1({ next }) {
  return (
    <div style={{ padding:"40px 32px 120px", overflowY:"auto", height:"100%" }}>
      <Kicker>The Problem</Kicker>
      <h2 className="fu2" style={{
        fontFamily: display, fontSize: 32, fontWeight: 900, color: C.cream,
        lineHeight: 1.05, margin: "0 0 20px",
      }}>
        The artist builds<br />the audience.<br />
        <em style={{ fontStyle:"italic", color: C.gold2 }}>Everyone else<br />captures the value.</em>
      </h2>
      <Rule />

      <p className="fu3" style={{ fontFamily: serif, fontSize: 18, color: C.body, lineHeight: 1.75, marginBottom: 32 }}>
        Talent has always had the best customer acquisition economics in the world — audiences built at zero marginal cost, over decades of performing. Streaming platforms captured that relationship. Management takes a third of what&apos;s left.
      </p>

      <div style={{ margin:"24px 0 32px" }}>
        {[
          { who:"Label deal",      take:"80%",    note:"of recorded music revenue",  color: C.red },
          { who:"Management",      take:"15–20%", note:"of gross income",            color:"#E67E22" },
          { who:"Booking agent",   take:"10%",    note:"per live appearance",        color:"#F39C12" },
          { who:"Publisher",       take:"25%",    note:"of composition rights",      color:"#8E44AD" },
          { who:"Artist keeps",    take:"~9¢",    note:"on the dollar",              color: C.gold2 },
        ].map((r, i) => (
          <div key={i} className="fu" style={{
            animationDelay:`${0.3+i*0.1}s`,
            display:"flex", justifyContent:"space-between", alignItems:"baseline",
            padding:"14px 0",
            borderBottom: i < 4 ? `1px solid ${C.rule}` : "none",
          }}>
            <div>
              <span style={{ fontFamily: serif, fontSize:17, color: C.cream }}>{r.who}</span>
              <span style={{ fontFamily: serif, fontStyle:"italic", fontSize:14, color: C.muted, marginLeft:10 }}>{r.note}</span>
            </div>
            <span style={{ fontFamily: display, fontSize:24, fontWeight:700, color: r.color }}>{r.take}</span>
          </div>
        ))}
      </div>

      <Quote>
        &ldquo;Streaming platforms didn&apos;t build audiences. Artists did. The platform just owned the relationship.&rdquo;
      </Quote>

      <p style={{ fontFamily: serif, fontSize: 18, color: C.body, lineHeight: 1.75, marginBottom: 36 }}>
        <strong style={{ color: C.cream, fontWeight: 500 }}>Fanded returns the relationship — and its economics — directly to talent.</strong>
      </p>

      <Btn onClick={next}>Meet MAWD →</Btn>
    </div>
  );
}

// ── SCREEN 2 — MAWD ───────────────────────────────────────────
function S2({ next }) {
  const [active, setActive] = useState(null);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);

  const agents = [
    { id:"DOLLAR", emoji:"💰", role:"Revenue intelligence",
      color:"#2ECC71",
      line:"Membership revenue is up 12% with zero new marketing spend. Your music is doing the CAC work. No label split. No manager cut." },
    { id:"SCOUT",  emoji:"🔍", role:"Deal & opportunity finder",
      color:"#3498DB",
      line:"Brand partnership inquiry flagged — CPG company with Vietnam distribution. Matches your 12% Southeast Asia audience growth. Draft response ready for review." },
    { id:"COMPASS",emoji:"🧭", role:"Career strategy",
      color:"#9B59B6",
      line:"Next 90 days: validate MAWD with 3 installs, close Cal State LA enterprise deal, then raise seed on real traction. This is the arc that closes checks." },
    { id:"PULSE",  emoji:"📊", role:"Fan & audience analytics",
      color:C.red,
      line:"96% retention. 4× industry average. Vietnam listeners up 12% organically. Someone over there is sharing your music — no ads, no push." },
    { id:"HYPE",   emoji:"📣", role:"Content & marketing ops",
      color:"#F39C12",
      line:"Cover content outperforms originals 3:1 on saves across 6 months of data. One cover per month — interpreted standards. Scheduled for peak engagement window." },
  ];

  const tap = (a) => {
    setActive(a.id); setTyping(true); setText(""); setDone(false);
    setTimeout(() => {
      setTyping(false);
      let i = 0;
      const iv = setInterval(() => {
        setText(a.line.slice(0, i+1)); i++;
        if (i >= a.line.length) { clearInterval(iv); setDone(true); }
      }, 16);
    }, 800);
  };

  const cur = agents.find(a => a.id === active);

  return (
    <div style={{ padding:"40px 32px 120px", overflowY:"auto", height:"100%" }}>
      <Kicker>The Solution</Kicker>
      <h2 className="fu2" style={{
        fontFamily: display, fontSize: 30, fontWeight: 900, color: C.cream,
        lineHeight: 1.05, margin: "0 0 8px",
      }}>
        MAWD — your AI<br />
        <em style={{ fontStyle:"italic", color: C.gold2 }}>Chief of Staff.</em>
      </h2>
      <p className="fu3" style={{ fontFamily: display, fontStyle:"italic", fontSize: 18, color: C.muted, margin:"4px 0 8px" }}>
        Five specialist agents. One brain.
      </p>
      <Rule />

      <p className="fu3" style={{ fontFamily: serif, fontSize: 18, color: C.body, lineHeight: 1.75, marginBottom: 28 }}>
        Not a chatbot. A private, sandboxed AI system trained on each talent&apos;s proprietary data — catalog, contracts, audience, income. <em>Tap an agent.</em>
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, border:`1px solid ${C.rule}`, marginBottom:20 }}>
        {agents.map((a, i) => (
          <div key={a.id} onClick={() => tap(a)}
            className="fu" style={{
              animationDelay:`${0.2+i*0.08}s`, cursor:"pointer",
              padding:"16px 14px",
              background: active===a.id ? "rgba(196, 149, 58, 0.08)" : "transparent",
              borderRight: i % 2 === 0 ? `1px solid ${C.rule}` : "none",
              borderBottom: i < 4 ? `1px solid ${C.rule}` : "none",
              transition: "background 0.3s ease",
            }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
              <span style={{ fontSize:14 }}>{a.emoji}</span>
              <span style={{
                fontFamily: display, fontSize:13, fontWeight:700,
                color: active===a.id ? a.color : C.cream,
                letterSpacing:"0.05em",
              }}>{a.id}</span>
            </div>
            <div style={{ fontFamily: serif, fontStyle:"italic", fontSize:14, color: C.muted, lineHeight:1.4 }}>{a.role}</div>
          </div>
        ))}
      </div>

      {(typing || text) && (
        <div className="fu" style={{
          borderLeft: `2px solid ${C.gold}`, padding:"16px 0 16px 24px", margin:"24px 0",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <span style={{
              fontFamily: display, fontSize:12, fontWeight:700,
              color: C.gold, letterSpacing:"0.1em", textTransform:"uppercase",
            }}>
              MAWD {cur && `· ${cur.id}`}
            </span>
          </div>
          {typing ? <Dots /> : (
            <p style={{ fontFamily: serif, fontSize:17, color: C.cream, lineHeight:1.7, margin:0 }}>{text}</p>
          )}
        </div>
      )}

      {!active && (
        <p className="fu4" style={{ fontFamily: serif, fontStyle:"italic", fontSize: 16, color: C.muted, lineHeight:1.65 }}>
          Each MAWD instance is fully containerized — no shared model, no data leakage. Trained on that talent&apos;s data only. The architecture an entertainment attorney would actually sign off on.
        </p>
      )}

      {done && <div style={{ marginTop:24 }}><Btn onClick={next}>See It Live →</Btn></div>}
      {!done && !typing && !text && (
        <p style={{ textAlign:"center", fontFamily: serif, fontStyle:"italic", fontSize:15, color: C.dim, marginTop:16 }}>↑ Tap an agent above</p>
      )}
    </div>
  );
}

// ── SCREEN 3 — The Proof ──────────────────────────────────────
function S3({ next }) {
  return (
    <div style={{ padding:"40px 32px 120px", overflowY:"auto", height:"100%" }}>
      <Kicker>Already Working</Kicker>
      <h2 className="fu2" style={{
        fontFamily: display, fontSize: 32, fontWeight: 900, color: C.cream,
        lineHeight: 1.05, margin: "0 0 8px",
      }}>
        The founder is<br />
        <em style={{ fontStyle:"italic", color: C.gold2 }}>the first install.</em>
      </h2>
      <Rule />

      <p className="fu3" style={{ fontFamily: serif, fontSize: 18, color: C.body, lineHeight: 1.75, marginBottom: 32 }}>
        Travis Atreo — founder, CEO, and professional artist — runs Fanded entirely on MAWD. Every feature built on himself before any other talent sees it.
      </p>

      <div style={{ display:"flex", justifyContent:"space-between", padding:"28px 0", borderTop:`1px solid ${C.rule}`, borderBottom:`1px solid ${C.rule}`, marginBottom:32 }}>
        {[
          { v:"148",  l:"Members",  s:"+6 this wk", c:C.gold2 },
          { v:"96%",  l:"Retained", s:"4× avg",     c:C.green },
          { v:"$740", l:"Mo. Rev",  s:"+12%",        c:C.gold },
        ].map((s,i) => (
          <div key={i} className="fu" style={{ animationDelay:`${0.3+i*0.12}s`, textAlign:"center" }}>
            <div style={{ fontFamily: display, fontSize:28, fontWeight:700, color:s.c }}>{s.v}</div>
            <div style={{ fontFamily: serif, fontStyle:"italic", fontSize:13, color:C.green, marginTop:2 }}>{s.s}</div>
            <div style={{ fontFamily: serif, fontSize:13, color:C.muted, marginTop:4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {[
        { emoji:"🌏", title:"Vietnam audience up 12% — organically",
          body:"MAWD flagged the signal before Travis noticed. Someone over there is sharing his music. No ads. No push." },
        { emoji:"💿", title:"Cover content outperforms originals 3:1",
          body:"6 months of catalog data. MAWD identified the pattern and recommended a monthly cover strategy." },
        { emoji:"🎂", title:"3 fan anniversaries auto-flagged",
          body:"Sarah, Marcus, Alex — each hit 1 year. MAWD drafted personalized voice notes before Travis asked." },
        { emoji:"🏫", title:"Cal State LA enterprise deal in pipeline",
          body:"MAWD tracks deal state, preps the briefing before every meeting. It thinks ahead so Travis doesn\u2019t have to." },
      ].map((item, i) => (
        <div key={i} className="fu" style={{
          animationDelay:`${0.4+i*0.1}s`,
          padding:"20px 0",
          borderBottom: i < 3 ? `1px solid ${C.rule}` : "none",
        }}>
          <div style={{ display:"flex", gap:14 }}>
            <span style={{ fontSize:20, flexShrink:0, lineHeight:1.4 }}>{item.emoji}</span>
            <div>
              <div style={{ fontFamily: display, fontSize:16, color:C.cream, fontWeight:700, marginBottom:6, lineHeight:1.3 }}>{item.title}</div>
              <div style={{ fontFamily: serif, fontSize:16, color:C.muted, lineHeight:1.6 }}>{item.body}</div>
            </div>
          </div>
        </div>
      ))}

      <div style={{ marginTop:32 }}><Btn onClick={next}>The Opportunity →</Btn></div>
    </div>
  );
}

// ── SCREEN 4 — The Business ───────────────────────────────────
function S4({ next }) {
  return (
    <div style={{ padding:"40px 32px 120px", overflowY:"auto", height:"100%" }}>
      <Kicker>The Opportunity</Kicker>
      <h2 className="fu2" style={{
        fontFamily: display, fontSize: 32, fontWeight: 900, color: C.cream,
        lineHeight: 1.05, margin: "0 0 8px",
      }}>
        <em style={{ fontStyle:"italic", color: C.gold2 }}>$250B+</em> flows<br />
        through talent<br />management every year.
      </h2>
      <Rule />

      <p className="fu3" style={{ fontFamily: serif, fontSize: 18, color: C.body, lineHeight: 1.75, marginBottom: 32 }}>
        None of it is automated. None of it is AI-native. None of it is owned by the talent. That&apos;s the market.
      </p>

      <div className="fu3" style={{
        borderTop:`1px solid ${C.rule}`, borderBottom:`1px solid ${C.rule}`,
        padding:"28px 0", marginBottom:32,
      }}>
        <div style={{
          fontFamily: serif, fontStyle:"italic", fontSize:13,
          letterSpacing:"0.1em", color:C.gold, textTransform:"uppercase", marginBottom:20,
        }}>LTV:CAC Ratio</div>
        <div style={{ display:"flex", justifyContent:"space-around", marginBottom:16 }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily: serif, fontStyle:"italic", fontSize:14, color:C.muted, marginBottom:6 }}>Streaming platform</div>
            <div style={{ fontFamily: display, fontSize:28, fontWeight:700, color:C.red }}>~1:1</div>
          </div>
          <div style={{ width:1, background:C.rule }} />
          <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily: serif, fontStyle:"italic", fontSize:14, color:C.muted, marginBottom:6 }}>Fanded (blended)</div>
            <div style={{ fontFamily: display, fontSize:28, fontWeight:700, color:C.gold2 }}>20:1</div>
          </div>
        </div>
        <p style={{ fontFamily: serif, fontStyle:"italic", fontSize:15, color:C.muted, lineHeight:1.6, margin:0 }}>
          The artist already paid the CAC — decades of performing, recording, posting. Fanded just closes the loop on the economics.
        </p>
      </div>

      {[
        { icon:"🎪", label:"100 clubs live", note:"Goal: 1,000 by EOY 2026" },
        { icon:"📊", label:"$15K+ revenue through platform", note:"Before MAWD subscription fees launch" },
        { icon:"⭐", label:"Manny Jacinto · Darren Hayes · Anna Akana", note:"Flagship talent on platform" },
        { icon:"🏛️", label:"Cal State LA · Emerson · BCMNY · FPAC LA", note:"Active enterprise pipeline" },
        { icon:"🤝", label:"Hyphen Capital · Jason Kwon (CSO, OpenAI)", note:"Pre-seed investors committed" },
      ].map((item, i) => (
        <div key={i} className="fu" style={{
          animationDelay:`${0.3+i*0.1}s`,
          display:"flex", gap:12, alignItems:"baseline",
          padding:"14px 0",
          borderBottom:`1px solid ${C.rule}`,
        }}>
          <span style={{ fontSize:16, flexShrink:0 }}>{item.icon}</span>
          <div>
            <span style={{ fontFamily: serif, fontSize:16, color:C.cream }}>{item.label}</span>
            <span style={{ fontFamily: serif, fontStyle:"italic", fontSize:14, color:C.muted, display:"block", marginTop:2 }}>{item.note}</span>
          </div>
        </div>
      ))}

      <div style={{ marginTop:32 }}><Btn onClick={next}>The Ask →</Btn></div>
    </div>
  );
}

// ── SCREEN 5 — The Ask ────────────────────────────────────────
function S5() {
  return (
    <div style={{ padding:"40px 32px 120px", overflowY:"auto", height:"100%" }}>
      <Kicker>Pre-Seed Round</Kicker>
      <h2 className="fu2" style={{
        fontFamily: display, fontSize: "clamp(36px, 8vw, 44px)", fontWeight: 900,
        color: C.cream, lineHeight: 1.05, margin: "0 0 8px",
      }}>
        <em style={{ fontStyle:"italic", color: C.gold2 }}>$500K</em><br />
        to prove the model<br />at scale.
      </h2>
      <Rule />

      <p className="fu3" style={{ fontFamily: serif, fontSize: 18, color: C.body, lineHeight: 1.75, marginBottom: 32 }}>
        Infrastructure is built. First install is live. We&apos;re raising to expand — not to start.
      </p>

      {[
        { label:"Founder ops + salary",       pct:"30%", note:"$150K — keeps the machine running full-time", w:"30%" },
        { label:"MAWD installs (5–10 talent)", pct:"30%", note:"Each becomes a replicable, documented template", w:"30%" },
        { label:"Enterprise sales",            pct:"25%", note:"Close Cal State LA + 2 more contracts", w:"25%" },
        { label:"Infrastructure + dev",        pct:"15%", note:"Kevin + server costs at scale", w:"15%" },
      ].map((item, i) => (
        <div key={i} className="fu" style={{ animationDelay:`${0.3+i*0.12}s`, marginBottom:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontFamily: serif, fontSize:16, color:C.cream }}>{item.label}</span>
            <span style={{ fontFamily: display, fontSize:16, fontWeight:700, color:C.gold2 }}>{item.pct}</span>
          </div>
          <div style={{ height:2, background:C.rule, overflow:"hidden" }}>
            <div style={{
              height:"100%", width:item.w,
              background:`linear-gradient(90deg, ${C.gold}, ${C.gold2})`,
            }}/>
          </div>
          <div style={{ fontFamily: serif, fontStyle:"italic", fontSize:14, color:C.muted, marginTop:6 }}>{item.note}</div>
        </div>
      ))}

      <div style={{
        borderTop:`1px solid ${C.rule}`, borderBottom:`1px solid ${C.rule}`,
        padding:"28px 0", margin:"24px 0 28px",
      }}>
        <div style={{
          fontFamily: serif, fontStyle:"italic", fontSize:13,
          letterSpacing:"0.1em", color:C.gold, textTransform:"uppercase", marginBottom:16,
        }}>12-Month Milestones</div>
        {[
          "Travis as validated, live MAWD install with real unit economics",
          "5–10 talent accounts with measurable outcomes",
          "One enterprise contract closed ($250K+ ARR)",
          "$10K+ MRR to anchor a seed round from conviction, not desperation",
        ].map((m, i) => (
          <div key={i} style={{ display:"flex", gap:12, marginBottom:10 }}>
            <span style={{ color:C.gold, flexShrink:0, fontFamily: serif, fontSize:16 }}>→</span>
            <span style={{ fontFamily: serif, fontSize:16, color:C.body, lineHeight:1.6 }}>{m}</span>
          </div>
        ))}
      </div>

      <Pull>
        &ldquo;Every platform in history<br />was a better tool.<br />
        <em>Fanded is the first team.</em>&rdquo;
      </Pull>

      <div style={{ textAlign:"center", marginBottom:32 }}>
        <div style={{ fontFamily: serif, fontSize:16, color:C.muted, marginBottom:4 }}>travis@fanded.com</div>
        <div style={{ fontFamily: serif, fontSize:16, color:C.muted }}>mawd.fanded.com</div>
      </div>

      <div style={{ borderTop:`1px solid ${C.rule}`, paddingTop:28 }}>
        <div style={{
          fontFamily: serif, fontStyle:"italic", fontSize:12,
          letterSpacing:"0.1em", color:C.dim, textTransform:"uppercase",
          textAlign:"center", marginBottom:16,
        }}>Advisors & Investors</div>
        <div style={{ fontFamily: serif, fontSize:15, color:C.muted, lineHeight:2.0, textAlign:"center" }}>
          Ted Schilowitz · Co-founder, RED Digital Cinema<br />
          Dr. Chris Mattmann · Head of AI, UCLA / Former CTIO, NASA JPL<br />
          Eric Toda · Head of Communications, Meta<br />
          Dave Lu · Hyphen Capital<br />
          Jason Kwon · CSO, OpenAI
        </div>
      </div>
    </div>
  );
}

// ── SHELL ─────────────────────────────────────────────────────
const SCREENS = [S0, S1, S2, S3, S4, S5];
const NAV_LABELS = ["Intro", "Problem", "MAWD", "Live", "Market", "Ask"];

export default function App() {
  const [screen, setScreen] = useState(0);
  const next = () => setScreen(s => Math.min(SCREENS.length - 1, s + 1));
  const Screen = SCREENS[screen];

  return (
    <div style={{
      background: C.bg, minHeight:"100vh",
      display:"flex", flexDirection:"column", alignItems:"center",
      fontFamily: serif,
    }}>
      <style>{ANIM}</style>

      {/* Film grain overlay */}
      <div style={{
        position:"fixed", inset:0, pointerEvents:"none", zIndex:100,
        opacity:0.03, backgroundImage:`url("${GRAIN_SVG}")`,
      }} />

      <div style={{
        width:"100%", maxWidth:480, minHeight:"100vh", background:C.bg,
        position:"relative", display:"flex", flexDirection:"column", overflow:"hidden",
      }}>

        {/* Header */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"20px 32px 16px",
          borderBottom:`1px solid ${C.rule}`, flexShrink:0,
        }}>
          <span style={{
            fontFamily: display, fontSize:12, fontWeight:700,
            letterSpacing:"0.4em", textTransform:"uppercase", color:C.gold,
          }}>Fanded</span>

          <div style={{ display:"flex", gap:6 }}>
            {SCREENS.map((_,i) => (
              <div key={i} onClick={() => setScreen(i)} style={{
                width: i===screen ? 20 : 6, height:2, cursor:"pointer",
                background: i===screen ? `linear-gradient(90deg,${C.gold},${C.gold2})` : i<screen ? C.gold+"55" : C.rule,
                transition:"all 0.4s ease",
              }}/>
            ))}
          </div>

          <span style={{ fontFamily: serif, fontStyle:"italic", fontSize:13, color:C.dim }}>
            {screen+1}/{SCREENS.length}
          </span>
        </div>

        {/* Content */}
        <div key={screen} style={{ flex:1, overflowY:"auto", position:"relative" }}>
          <Screen next={next} />
        </div>

        {/* Bottom Nav */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0,
          background:`${C.bg}EE`, backdropFilter:"blur(12px)",
          borderTop:`1px solid ${C.rule}`,
          display:"flex", justifyContent:"space-around",
          padding:"10px 0 16px",
        }}>
          {NAV_LABELS.map((label, i) => (
            <button key={i} onClick={() => setScreen(i)} style={{
              background:"none", border:"none", cursor:"pointer",
              padding:"0 6px",
            }}>
              <span style={{
                fontFamily: serif, fontStyle:"italic",
                fontSize:12, letterSpacing:"0.04em",
                color: i===screen ? C.gold : C.dim,
                transition:"color 0.3s ease",
              }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
