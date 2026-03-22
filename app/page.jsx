"use client";

import { useState } from "react";

const C = {
  bg: "#07070F",
  card: "#0F0F1C",
  border: "#1C1C2E",
  blue: "#3BADE4",
  blue2: "#5BC0F0",
  cream: "#F5F1EA",
  muted: "#6B6B8A",
  dim: "#9999BB",
  green: "#2ECC71",
  tag: "#161624",
  red: "#E74C3C",
};

const ANIM = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px #3BADE433; }
    50% { box-shadow: 0 0 44px #3BADE466; }
  }
  @keyframes dot {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
    40% { transform: translateY(-5px); opacity: 1; }
  }
  .fu  { animation: fadeUp 0.5s ease both; }
  .fu1 { animation: fadeUp 0.5s ease 0.1s both; }
  .fu2 { animation: fadeUp 0.5s ease 0.2s both; }
  .fu3 { animation: fadeUp 0.5s ease 0.3s both; }
  .fu4 { animation: fadeUp 0.5s ease 0.4s both; }
  .fu5 { animation: fadeUp 0.5s ease 0.5s both; }
  .fu6 { animation: fadeUp 0.5s ease 0.6s both; }
  .glowpulse { animation: glow 2.5s ease-in-out infinite; }
`;

function Blue({ children }) {
  return <span style={{ color: C.blue2 }}>{children}</span>;
}
function Label({ children }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: C.blue, textTransform: "uppercase", marginBottom: 16 }}>
      {children}
    </div>
  );
}
function Divider() {
  return <div style={{ width: 36, height: 2, background: `linear-gradient(90deg,${C.blue},${C.blue2})`, borderRadius: 2, margin: "14px 0" }} />;
}
function Card({ children, accent, style: s, className }) {
  return (
    <div className={className} style={{
      background: accent ? "#0A0F1E" : C.card,
      border: `1px solid ${accent ? C.blue + "55" : C.border}`,
      borderRadius: 16, padding: "16px", ...s,
    }}>{children}</div>
  );
}
function Btn({ onClick, children }) {
  return (
    <button onClick={onClick} style={{
      width: "100%",
      background: `linear-gradient(135deg, ${C.blue}, ${C.blue2})`,
      color: C.bg, border: "none", borderRadius: 30,
      padding: "14px", fontSize: 14, fontWeight: 800,
      cursor: "pointer", letterSpacing: "0.02em",
      boxShadow: `0 4px 24px ${C.blue}44`,
      fontFamily: "'DM Sans', system-ui",
    }}>{children}</button>
  );
}
function Dots() {
  return (
    <div style={{ display: "flex", gap: 5, padding: "4px 0" }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width: 5, height: 5, borderRadius: "50%", background: C.blue,
          animation: `dot 1.2s ease ${i*0.2}s infinite`,
        }}/>
      ))}
    </div>
  );
}

// ── SCREEN 0 — Opening Statement ──────────────────────────────
function S0({ next }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", padding:"0 28px", textAlign:"center" }}>
      <div className="fu1" style={{ fontSize: 10, letterSpacing: "0.2em", color: C.blue, fontWeight: 700, textTransform: "uppercase", marginBottom: 28 }}>
        Fanded · Pre-Seed
      </div>

      <div className="fu2 glowpulse" style={{
        width: 68, height: 68, borderRadius: 18,
        background: `linear-gradient(135deg, ${C.blue}, ${C.blue2})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 30, marginBottom: 28,
      }}>🤖</div>

      <h1 className="fu3" style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 30, fontWeight: 900, color: C.cream,
        lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 18px",
      }}>
        The future of artist<br />& athlete management<br />
        <Blue>is self-managed.</Blue>
      </h1>

      <p className="fu4" style={{ fontSize: 14, color: C.dim, lineHeight: 1.65, margin: "0 0 32px", maxWidth: 300 }}>
        Powered by agentic AI.<br />
        We&apos;re building the infrastructure.<br />
        <span style={{ color: C.cream }}>It&apos;s already working.</span>
      </p>

      <div className="fu5" style={{ width: "100%" }}>
        <Btn onClick={next}>See How It Works →</Btn>
      </div>
    </div>
  );
}

// ── SCREEN 1 — The Problem ────────────────────────────────────
function S1({ next }) {
  return (
    <div style={{ padding:"32px 24px 100px", overflowY:"auto", height:"100%" }}>
      <Label>The Problem</Label>
      <h2 className="fu2" style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 26, fontWeight: 900, color: C.cream,
        lineHeight: 1.15, margin: "0 0 6px",
      }}>
        The artist builds<br />the audience.<br />
        <Blue>Everyone else captures the value.</Blue>
      </h2>
      <Divider />

      <p className="fu3" style={{ fontSize: 13, color: C.dim, lineHeight: 1.65, marginBottom: 20 }}>
        Talent has always had the best customer acquisition economics in the world — audiences built at zero marginal cost, over decades of performing. Streaming platforms captured that relationship. Management takes a third of what&apos;s left.
      </p>

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {[
          { who:"Label deal",      take:"80%",   note:"of recorded music revenue", color: C.red },
          { who:"Management",      take:"15–20%", note:"of gross income", color:"#E67E22" },
          { who:"Booking agent",   take:"10%",   note:"per live appearance", color:"#F39C12" },
          { who:"Publisher",       take:"25%",   note:"of composition rights", color:"#8E44AD" },
          { who:"Artist keeps",    take:"~9¢",   note:"on the dollar", color: C.blue2 },
        ].map((r, i) => (
          <div key={i} className="fu" style={{ animationDelay:`${0.25+i*0.09}s` }}>
            <Card>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:13, color:C.cream, fontWeight:700 }}>{r.who}</div>
                  <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{r.note}</div>
                </div>
                <div style={{ fontSize:22, fontWeight:900, color:r.color }}>{r.take}</div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <Card accent style={{ marginTop:16 }} className="fu6">
        <p style={{ fontSize:13, color:C.dim, lineHeight:1.65 }}>
          Streaming platforms didn&apos;t build audiences. Artists did. The platform just owned the relationship.<br /><br />
          <span style={{ color:C.cream, fontWeight:700 }}>Fanded returns the relationship — and its economics — directly to talent.</span>
        </p>
      </Card>

      <div style={{ marginTop:20 }}><Btn onClick={next}>Meet MAWD →</Btn></div>
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
    <div style={{ padding:"32px 24px 100px", overflowY:"auto", height:"100%" }}>
      <Label>The Solution</Label>
      <h2 className="fu2" style={{
        fontFamily:"'Playfair Display', serif",
        fontSize:24, fontWeight:900, color:C.cream,
        lineHeight:1.15, margin:"0 0 6px",
      }}>
        MAWD — your AI<br />
        <Blue>Chief of Staff.</Blue><br />
        5 specialist agents. One brain.
      </h2>
      <p className="fu3" style={{ fontSize:13, color:C.dim, lineHeight:1.6, margin:"8px 0 20px" }}>
        Not a chatbot. A private, sandboxed AI system trained on each talent&apos;s proprietary data — catalog, contracts, audience, income. Tap an agent.
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
        {agents.map((a, i) => (
          <div key={a.id} onClick={() => tap(a)}
            className="fu" style={{ animationDelay:`${0.15+i*0.08}s`, cursor:"pointer" }}>
            <div style={{
              background: active===a.id ? "#0C1020" : C.tag,
              border:`1px solid ${active===a.id ? a.color+"66" : C.border}`,
              borderRadius:12, padding:"12px 14px",
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4 }}>
                <span style={{ fontSize:15 }}>{a.emoji}</span>
                <span style={{ fontSize:11, fontWeight:800, color:active===a.id ? a.color : C.cream, letterSpacing:"0.05em" }}>{a.id}</span>
              </div>
              <div style={{ fontSize:11, color:C.muted, lineHeight:1.4 }}>{a.role}</div>
            </div>
          </div>
        ))}
      </div>

      {(typing || text) && (
        <Card accent style={{ marginTop:14 }} className="fu">
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <div style={{
              width:28, height:28, borderRadius:8,
              background:`linear-gradient(135deg,${C.blue},${C.blue2})`,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:14,
            }}>🤖</div>
            <span style={{ fontSize:11, fontWeight:800, color:C.blue, letterSpacing:"0.05em" }}>
              MAWD {cur && `· ${cur.id}`}
            </span>
          </div>
          {typing ? <Dots /> : (
            <p style={{ fontSize:13, color:C.cream, lineHeight:1.65 }}>{text}</p>
          )}
        </Card>
      )}

      {!active && (
        <Card style={{ marginTop:14 }} className="fu4">
          <p style={{ fontSize:13, color:C.muted, lineHeight:1.6 }}>
            Each MAWD instance is fully containerized — no shared model, no data leakage. Trained on that talent&apos;s data only. The architecture an entertainment attorney would actually sign off on.
          </p>
        </Card>
      )}

      {done && <div style={{ marginTop:16 }}><Btn onClick={next}>See It Live →</Btn></div>}
      {!done && !typing && !text && (
        <p style={{ textAlign:"center", fontSize:12, color:C.muted, marginTop:12 }}>↑ Tap an agent above</p>
      )}
    </div>
  );
}

// ── SCREEN 3 — The Proof ──────────────────────────────────────
function S3({ next }) {
  return (
    <div style={{ padding:"32px 24px 100px", overflowY:"auto", height:"100%" }}>
      <Label>Already Working</Label>
      <h2 className="fu2" style={{
        fontFamily:"'Playfair Display', serif",
        fontSize:24, fontWeight:900, color:C.cream,
        lineHeight:1.15, margin:"0 0 8px",
      }}>
        The founder is<br />
        <Blue>the first install.</Blue>
      </h2>
      <p className="fu3" style={{ fontSize:13, color:C.dim, lineHeight:1.6, margin:"0 0 20px" }}>
        Travis Atreo — founder, CEO, and professional artist — runs Fanded entirely on MAWD. Every feature built on himself before any other talent sees it.
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:16 }}>
        {[
          { v:"148",  l:"Members",  s:"+6 this wk", c:C.blue2 },
          { v:"96%",  l:"Retained", s:"4× avg",     c:C.green },
          { v:"$740", l:"Mo. Rev",  s:"+12%",        c:C.blue },
        ].map((s,i) => (
          <div key={i} className="fu" style={{ animationDelay:`${0.2+i*0.1}s`, textAlign:"center" }}>
            <div style={{ fontSize:22, fontWeight:800, color:s.c }}>{s.v}</div>
            <div style={{ fontSize:10, color:C.green, fontWeight:600 }}>{s.s}</div>
            <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{s.l}</div>
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
        <Card key={i} className="fu" style={{ animationDelay:`${0.3+i*0.1}s`, marginBottom:10 }}>
          <div style={{ display:"flex", gap:12 }}>
            <span style={{ fontSize:19, flexShrink:0 }}>{item.emoji}</span>
            <div>
              <div style={{ fontSize:13, color:C.cream, fontWeight:700, marginBottom:4 }}>{item.title}</div>
              <div style={{ fontSize:12, color:C.muted, lineHeight:1.5 }}>{item.body}</div>
            </div>
          </div>
        </Card>
      ))}

      <div style={{ marginTop:8 }}><Btn onClick={next}>The Opportunity →</Btn></div>
    </div>
  );
}

// ── SCREEN 4 — The Business ───────────────────────────────────
function S4({ next }) {
  return (
    <div style={{ padding:"32px 24px 100px", overflowY:"auto", height:"100%" }}>
      <Label>The Opportunity</Label>
      <h2 className="fu2" style={{
        fontFamily:"'Playfair Display', serif",
        fontSize:24, fontWeight:900, color:C.cream,
        lineHeight:1.15, margin:"0 0 8px",
      }}>
        <Blue>$250B+</Blue> flows through<br />
        talent management<br />every year.
      </h2>
      <Divider />
      <p className="fu3" style={{ fontSize:13, color:C.dim, lineHeight:1.65, marginBottom:20 }}>
        None of it is automated. None of it is AI-native. None of it is owned by the talent. That&apos;s the market.
      </p>

      <Card accent className="fu3" style={{ marginBottom:14 }}>
        <div style={{ fontSize:11, color:C.blue, fontWeight:700, marginBottom:10, letterSpacing:"0.06em" }}>LTV:CAC RATIO</div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>Streaming platform</div>
            <div style={{ fontSize:22, fontWeight:900, color:C.red }}>~1:1</div>
          </div>
          <div style={{ width:1, background:C.border }} />
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>Fanded (blended)</div>
            <div style={{ fontSize:22, fontWeight:900, color:C.blue2 }}>20:1</div>
          </div>
        </div>
        <div style={{ fontSize:12, color:C.muted, lineHeight:1.5 }}>
          The artist already paid the CAC — decades of performing, recording, posting. Fanded just closes the loop on the economics.
        </div>
      </Card>

      {[
        { icon:"🎪", label:"100 clubs live", note:"Goal: 1,000 by EOY 2026" },
        { icon:"📊", label:"$15K+ revenue through platform", note:"Before MAWD subscription fees launch" },
        { icon:"⭐", label:"Manny Jacinto · Darren Hayes · Anna Akana", note:"Flagship talent on platform" },
        { icon:"🏛️", label:"Cal State LA · Emerson · BCMNY · FPAC LA", note:"Active enterprise pipeline" },
        { icon:"🤝", label:"Hyphen Capital · Jason Kwon (CSO, OpenAI)", note:"Pre-seed investors committed" },
      ].map((item, i) => (
        <Card key={i} className="fu" style={{ animationDelay:`${0.2+i*0.1}s`, marginBottom:9 }}>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ fontSize:17 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize:12, color:C.cream, fontWeight:700 }}>{item.label}</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{item.note}</div>
            </div>
          </div>
        </Card>
      ))}

      <div style={{ marginTop:12 }}><Btn onClick={next}>The Ask →</Btn></div>
    </div>
  );
}

// ── SCREEN 5 — The Ask ────────────────────────────────────────
function S5() {
  return (
    <div style={{ padding:"32px 24px 100px", overflowY:"auto", height:"100%" }}>
      <Label>Pre-Seed Round</Label>
      <h2 className="fu2" style={{
        fontFamily:"'Playfair Display', serif",
        fontSize:32, fontWeight:900, color:C.cream,
        lineHeight:1.1, margin:"0 0 6px",
      }}>
        <Blue>$500K</Blue><br />
        to prove the model<br />at scale.
      </h2>
      <Divider />

      <p className="fu3" style={{ fontSize:13, color:C.dim, lineHeight:1.65, marginBottom:20 }}>
        Infrastructure is built. First install is live. We&apos;re raising to expand — not to start.
      </p>

      {[
        { label:"Founder ops + salary",       pct:"30%", note:"$150K — keeps the machine running full-time" },
        { label:"MAWD installs (5–10 talent)", pct:"30%", note:"Each becomes a replicable, documented template" },
        { label:"Enterprise sales",            pct:"25%", note:"Close Cal State LA + 2 more contracts" },
        { label:"Infrastructure + dev",        pct:"15%", note:"Kevin + server costs at scale" },
      ].map((item, i) => (
        <div key={i} className="fu" style={{ animationDelay:`${0.2+i*0.1}s`, marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
            <span style={{ fontSize:13, color:C.cream, fontWeight:600 }}>{item.label}</span>
            <span style={{ fontSize:13, color:C.blue2, fontWeight:800 }}>{item.pct}</span>
          </div>
          <div style={{ height:4, background:C.border, borderRadius:4, overflow:"hidden" }}>
            <div style={{
              height:"100%", width:item.pct,
              background:`linear-gradient(90deg,${C.blue},${C.blue2})`,
              borderRadius:4,
            }}/>
          </div>
          <div style={{ fontSize:11, color:C.muted, marginTop:4 }}>{item.note}</div>
        </div>
      ))}

      <Card accent className="fu5" style={{ marginBottom:12 }}>
        <div style={{ fontSize:11, color:C.blue, fontWeight:700, marginBottom:10, letterSpacing:"0.06em" }}>
          12-MONTH MILESTONES
        </div>
        {[
          "Travis as validated, live MAWD install with real unit economics",
          "5–10 talent accounts with measurable outcomes",
          "One enterprise contract closed ($250K+ ARR)",
          "$10K+ MRR to anchor a seed round from conviction, not desperation",
        ].map((m, i) => (
          <div key={i} style={{ display:"flex", gap:8, marginBottom:8 }}>
            <span style={{ color:C.blue, flexShrink:0, fontSize:13 }}>→</span>
            <span style={{ fontSize:12, color:C.dim, lineHeight:1.5 }}>{m}</span>
          </div>
        ))}
      </Card>

      <Card accent className="fu6" style={{ marginBottom:12, textAlign:"center" }}>
        <div style={{
          fontFamily:"'Playfair Display', serif",
          fontSize:15, color:C.cream, fontWeight:700,
          lineHeight:1.55, marginBottom:14,
        }}>
          &ldquo;Every platform in history<br />was a better tool.<br />
          <span style={{ color:C.blue2 }}>Fanded is the first team.&rdquo;</span>
        </div>
        <div style={{ fontSize:13, color:C.muted, marginBottom:2 }}>travis@fanded.com</div>
        <div style={{ fontSize:13, color:C.muted }}>mawd.fanded.com</div>
      </Card>

      <Card style={{ textAlign:"center", background:"#090912" }} className="fu6">
        <div style={{ fontSize:10, color:C.muted, marginBottom:8, letterSpacing:"0.1em", textTransform:"uppercase" }}>
          Advisors & Investors
        </div>
        <div style={{ fontSize:12, color:C.dim, lineHeight:1.9 }}>
          Ted Schilowitz · Co-founder, RED Digital Cinema<br />
          Dr. Chris Mattmann · Head of AI, UCLA / Former CTIO, NASA JPL<br />
          Eric Toda · Head of Communications, Meta<br />
          Dave Lu · Hyphen Capital<br />
          Jason Kwon · CSO, OpenAI
        </div>
      </Card>
    </div>
  );
}

// ── SHELL ─────────────────────────────────────────────────────
const SCREENS = [S0, S1, S2, S3, S4, S5];
const NAV = [
  { icon:"✦", label:"Intro" },
  { icon:"⚡", label:"Problem" },
  { icon:"🤖", label:"MAWD" },
  { icon:"📊", label:"Live" },
  { icon:"🌐", label:"Market" },
  { icon:"💼", label:"Ask" },
];

export default function App() {
  const [screen, setScreen] = useState(0);
  const next = () => setScreen(s => Math.min(SCREENS.length - 1, s + 1));
  const Screen = SCREENS[screen];

  return (
    <div style={{ background:C.bg, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      <style>{ANIM}</style>
      <div style={{ width:"100%", maxWidth:390, minHeight:"100vh", background:C.bg, position:"relative", display:"flex", flexDirection:"column", overflow:"hidden" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 22px 12px", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:26, height:26, borderRadius:7, background:`linear-gradient(135deg,${C.blue},${C.blue2})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>🤖</div>
            <span style={{ fontSize:12, fontWeight:800, color:C.cream, letterSpacing:"0.03em" }}>fanded</span>
          </div>
          <div style={{ display:"flex", gap:5 }}>
            {SCREENS.map((_,i) => (
              <div key={i} onClick={() => setScreen(i)} style={{
                width: i===screen ? 18 : 6, height:6, borderRadius:3, cursor:"pointer",
                background: i===screen ? `linear-gradient(90deg,${C.blue},${C.blue2})` : i<screen ? C.blue+"55" : C.border,
                transition:"all 0.3s ease",
              }}/>
            ))}
          </div>
          <span style={{ fontSize:11, color:C.muted }}>{screen+1}/{SCREENS.length}</span>
        </div>

        {/* Content */}
        <div key={screen} style={{ flex:1, overflowY:"auto", position:"relative" }}>
          <Screen next={next} />
        </div>

        {/* Bottom Nav */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0,
          background:`${C.bg}EE`, backdropFilter:"blur(12px)",
          borderTop:`1px solid ${C.border}`,
          display:"flex", justifyContent:"space-around",
          padding:"9px 0 13px",
        }}>
          {NAV.map((n,i) => (
            <button key={i} onClick={() => setScreen(i)} style={{
              background:"none", border:"none", cursor:"pointer",
              display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"0 8px",
            }}>
              <span style={{ fontSize:17, opacity: i===screen ? 1 : 0.35 }}>{n.icon}</span>
              <span style={{
                fontSize:9, letterSpacing:"0.07em",
                color: i===screen ? C.blue : C.muted,
                fontWeight: i===screen ? 700 : 400,
                textTransform:"uppercase",
              }}>{n.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
