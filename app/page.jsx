"use client";

import { useState, useEffect, useRef } from "react";

// ── COLORS ────────────────────────────────────────────────────
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
  orange: "#E67E22",
  purple: "#9B59B6",
  yellow: "#F39C12",
};

// ── ANIMATIONS ────────────────────────────────────────────────
const ANIM = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 0; }
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
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .fu  { animation: fadeUp 0.5s ease both; }
  .fu1 { animation: fadeUp 0.5s ease 0.1s both; }
  .fu2 { animation: fadeUp 0.5s ease 0.2s both; }
  .fu3 { animation: fadeUp 0.5s ease 0.3s both; }
  .fu4 { animation: fadeUp 0.5s ease 0.4s both; }
  .fu5 { animation: fadeUp 0.5s ease 0.5s both; }
  .fu6 { animation: fadeUp 0.5s ease 0.6s both; }
  .glowpulse { animation: glow 2.5s ease-in-out infinite; }
  .fadein { animation: fadeIn 0.4s ease both; }
`;

// ── SYNTHETIC DATA ────────────────────────────────────────────
const ARTIST = { name: "Nia", genre: "R&B / Neo-Soul", members: 2340, revenue: 4280, retention: 94.2, growth: 6.4 };

const AGENTS = [
  { id: "DOLLAR", emoji: "💰", role: "Revenue", color: C.green },
  { id: "SCOUT",  emoji: "🔍", role: "Deals",   color: "#3498DB" },
  { id: "COMPASS",emoji: "🧭", role: "Strategy", color: C.purple },
  { id: "PULSE",  emoji: "📊", role: "Fans",     color: C.red },
  { id: "HYPE",   emoji: "📣", role: "Content",  color: C.yellow },
];

const CONVERSATIONS = {
  DOLLAR: [
    { from: "agent", text: "Your top revenue source this month is direct memberships at $2,840. Merch is second at $1,120. No label split." },
    { from: "agent", text: "Projected Q2 revenue: $14,200. That\u2019s 22% above last quarter with no additional spend." },
  ],
  SCOUT: [
    { from: "agent", text: "Lumina Headphones wants a 90-day ambassador deal. Offer is $8,500 + product. Their audience skews 18-25, 62% overlap with yours." },
    { from: "agent", text: "I flagged a sync licensing opportunity for \u2018Midnight Hour.\u2019 TV placement, cable drama, est. $3,200." },
  ],
  COMPASS: [
    { from: "agent", text: "Your next milestone: hit 3,000 members before your EP drops. You\u2019re 660 away. At current growth, that\u2019s 5\u20136 weeks." },
    { from: "agent", text: "Recommendation: move the Manila show from September to August. Your Philippines audience peaks in summer." },
  ],
  PULSE: [
    { from: "agent", text: "Top 3 cities this week: Los Angeles, Manila, Ho Chi Minh City. Vietnam grew 19% with zero paid promotion." },
    { from: "agent", text: "Your core demo shifted: 22\u201328 now leads at 41%, up from 35% last quarter. They spend 2.3\u00d7 more on merch." },
  ],
  HYPE: [
    { from: "agent", text: "Your cover of \u2018Golden Hour\u2019 has 12,400 saves \u2014 3.2\u00d7 your average. Posting another cover this month would capitalize on the momentum." },
    { from: "agent", text: "Content calendar: Tuesday reel (behind-the-scenes), Thursday cover drop, Saturday member-only livestream." },
  ],
};

const FOLLOW_UPS = {
  DOLLAR: "Your merch margin is 68% after fulfillment costs. If you shift to print-on-demand for the lower-volume items, that goes to 74%. Want me to model it?",
  SCOUT: "The Lumina deal has a 48-hour response window. Based on your brand alignment score (8.2/10) and audience overlap, I recommend accepting with a counter on exclusivity.",
  COMPASS: "If you hit 3,000 members before the EP, you\u2019ll have enough data to prove the direct-to-fan model works at scale. That\u2019s your seed narrative.",
  PULSE: "Maya R. hits her 1-year anniversary tomorrow. She\u2019s in your top 2% for engagement. I drafted a personalized voice note \u2014 want to review it?",
  HYPE: "Optimal post time for your audience: Thursday 7pm EST. That\u2019s when your 22\u201328 demo is most active. I\u2019ve scheduled the cover drop.",
};

const NOTIFICATIONS = [
  { agent: "SCOUT", title: "Brand deal response deadline tomorrow", desc: "Lumina Headphones \u2014 $8,500 ambassador deal. SCOUT recommends accepting with exclusivity counter.", time: "1h ago", isNew: true },
  { agent: "PULSE", title: "Vietnam streaming milestone", desc: "You crossed 10K monthly listeners in Vietnam. 19% week-over-week growth, entirely organic.", time: "3h ago", isNew: true },
  { agent: "DOLLAR", title: "March revenue report ready", desc: "Total: $4,280. Memberships: $2,840 (+18%). Merch: $1,120. Sync: $320.", time: "5h ago", isNew: true },
  { agent: "HYPE", title: "Cover video rendered and scheduled", desc: "\u2018Golden Hour\u2019 cover drops Thursday 7pm EST. Thumbnail A/B test ready.", time: "Yesterday", isNew: false },
  { agent: "COMPASS", title: "Quarterly strategy doc updated", desc: "Key focus: hit 3K members before EP drop. Manila show timing recommendation included.", time: "Yesterday", isNew: false },
  { agent: "DOLLAR", title: "New member: Jordan T. from Chicago", desc: "Joined via your Instagram link. Premium tier. Estimated LTV: $180.", time: "2 days ago", isNew: false },
  { agent: "PULSE", title: "Fan anniversary: Maya R. \u2014 1 year", desc: "Top 2% engagement. Voice note draft ready for review.", time: "2 days ago", isNew: false },
  { agent: "SCOUT", title: "Sync inquiry archived", desc: "\u2018Neon Dusk\u2019 for indie film \u2014 no response from licensor after 14 days. Auto-archived.", time: "3 days ago", isNew: false },
];

const DEALS = {
  inbox: [
    { name: "Lumina Headphones", type: "Ambassador", amount: "$8,500", agent: "SCOUT", status: "Awaiting review", color: C.blue },
    { name: "Sync: \u2018Midnight Hour\u2019", type: "TV Placement", amount: "$3,200", agent: "SCOUT", status: "SCOUT recommends", color: C.green },
  ],
  active: [
    { name: "Manila Festival", type: "Performance", amount: "$5,000", agent: "SCOUT", status: "Contract sent", color: C.orange },
    { name: "Studio Mura Collab", type: "Merch", amount: "Rev share TBD", agent: "DOLLAR", status: "Sampling", color: C.purple },
  ],
  closed: [
    { name: "Greenline Coffee", type: "Sponsorship", amount: "$2,200", agent: "SCOUT", status: "Completed", color: C.muted },
    { name: "Portland Venue", type: "Guarantee", amount: "$3,800", agent: "SCOUT", status: "Completed", color: C.muted },
    { name: "Fan Memberships", type: "Recurring", amount: "$2,840/mo", agent: "DOLLAR", status: "Active", color: C.green },
  ],
};

const FAN_SOURCES = [
  { platform: "Spotify", listeners: "18.4K", converted: 420, rate: "2.3%", color: "#1DB954" },
  { platform: "Instagram", followers: "12.1K", converted: 680, rate: "5.6%", color: "#E1306C" },
  { platform: "YouTube", subs: "8.2K", converted: 310, rate: "3.8%", color: "#FF0000" },
  { platform: "TikTok", followers: "22.6K", converted: 190, rate: "0.8%", color: "#69C9D0" },
];

const CONVERSION_FUNNEL = [
  { stage: "Total audience reach", count: "61.3K", pct: 100, color: C.muted },
  { stage: "Visited Fanded page", count: "4,820", pct: 38, color: C.dim },
  { stage: "Started signup", count: "3,100", pct: 24, color: C.blue },
  { stage: "Active members", count: "2,340", pct: 18, color: C.blue2 },
  { stage: "Paying members", count: "1,890", pct: 15, color: C.green },
];

const MEMBER_SPOTLIGHT = [
  { name: "Maya R.", detail: "Converted from Spotify. 1-year anniversary tomorrow. Top 2% engagement. Upgraded to premium after 3 months.", emoji: "🎂", source: "Spotify" },
  { name: "Jordan T.", detail: "Came from Instagram DM link. Joined 3 days ago. Already purchased merch. $42 LTV in first week.", emoji: "⭐", source: "Instagram" },
  { name: "Alex K.", detail: "YouTube subscriber \u2192 Fanded member. 11 months. Shared invite link 47 times \u2014 responsible for 12 conversions.", emoji: "📣", source: "YouTube" },
];

const REVENUE_MONTHS = [
  { label: "Sep", val: 2100 },
  { label: "Oct", val: 2400 },
  { label: "Nov", val: 2850 },
  { label: "Dec", val: 3100 },
  { label: "Jan", val: 3400 },
  { label: "Feb", val: 3820 },
  { label: "Mar", val: 4280 },
];

// ── PRIMITIVES ────────────────────────────────────────────────
function Card({ children, accent, style: s, className }) {
  return (
    <div className={className} style={{
      background: accent ? "#0A0F1E" : C.card,
      border: `1px solid ${accent ? C.blue + "55" : C.border}`,
      borderRadius: 16, padding: "16px", ...s,
    }}>{children}</div>
  );
}

function Badge({ children, color }) {
  return (
    <span style={{
      display: "inline-block", fontSize: 10, fontWeight: 700,
      color: color || C.blue, background: (color || C.blue) + "18",
      padding: "3px 8px", borderRadius: 6, letterSpacing: "0.03em",
    }}>{children}</span>
  );
}

function Dots() {
  return (
    <div style={{ display: "flex", gap: 5, padding: "4px 0" }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width: 5, height: 5, borderRadius: "50%", background: C.blue,
          animation: `dot 1.2s ease ${i * 0.2}s infinite`,
        }}/>
      ))}
    </div>
  );
}

function Typewriter({ text, speed = 16, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  useEffect(() => {
    setDisplayed(""); setIsDone(false);
    let i = 0;
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, i + 1)); i++;
      if (i >= text.length) { clearInterval(iv); setIsDone(true); onDone && onDone(); }
    }, speed);
    return () => clearInterval(iv);
  }, [text]);
  return <span>{displayed}{!isDone && <span style={{ opacity: 0.5 }}>|</span>}</span>;
}

function AgentTag({ agent, small }) {
  const a = AGENTS.find(x => x.id === agent);
  if (!a) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: small ? 4 : 6 }}>
      <span style={{ fontSize: small ? 12 : 14 }}>{a.emoji}</span>
      <span style={{ fontSize: small ? 10 : 11, fontWeight: 800, color: a.color, letterSpacing: "0.05em" }}>{a.id}</span>
    </span>
  );
}

// ── TAB 0: HOME ───────────────────────────────────────────────
function HomeTab() {
  const [briefingDone, setBriefingDone] = useState(false);
  const briefing = "Your Vietnam streaming is up 23% week-over-week. SCOUT flagged a brand deal worth reviewing. Two fan anniversaries tomorrow \u2014 drafts are ready.";

  return (
    <div style={{ padding: "24px 20px 100px", overflowY: "auto", height: "100%" }}>
      {/* Greeting */}
      <div className="fu1">
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>March 22, 2026</div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900,
          color: C.cream, lineHeight: 1.15, margin: "0 0 20px",
        }}>
          Good evening, <span style={{ color: C.blue2 }}>Nia.</span>
        </h1>
      </div>

      {/* Stats */}
      <div className="fu2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          { v: "$4,280", l: "Mo. Revenue", s: "+18%", c: C.blue2 },
          { v: "2,340", l: "Members", s: "+142", c: C.green },
          { v: "94.2%", l: "Retention", s: "3.8\u00d7 avg", c: C.blue },
        ].map((s, i) => (
          <Card key={i} style={{ textAlign: "center", padding: "14px 8px" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 10, color: C.green, fontWeight: 600, marginTop: 2 }}>{s.s}</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{s.l}</div>
          </Card>
        ))}
      </div>

      {/* MAWD Briefing */}
      <Card accent className="fu3" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7,
            background: `linear-gradient(135deg, ${C.blue}, ${C.blue2})`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
          }}>🤖</div>
          <span style={{ fontSize: 11, fontWeight: 800, color: C.blue, letterSpacing: "0.05em" }}>MAWD BRIEFING</span>
        </div>
        <p style={{ fontSize: 13, color: C.cream, lineHeight: 1.65 }}>
          <Typewriter text={briefing} onDone={() => setBriefingDone(true)} />
        </p>
      </Card>

      {/* Revenue Chart */}
      <Card className="fu4" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 12, letterSpacing: "0.05em" }}>REVENUE TREND</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
          {REVENUE_MONTHS.map((m, i) => {
            const maxVal = 4280;
            const h = (m.val / maxVal) * 70;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ fontSize: 9, color: C.dim, fontWeight: 600 }}>${(m.val / 1000).toFixed(1)}k</div>
                <div style={{
                  width: "100%", height: h, borderRadius: 4,
                  background: i === REVENUE_MONTHS.length - 1
                    ? `linear-gradient(180deg, ${C.blue}, ${C.blue2})`
                    : C.border,
                }} />
                <div style={{ fontSize: 9, color: C.muted }}>{m.label}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Activity Feed */}
      <div className="fu5" style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 10, letterSpacing: "0.05em" }}>RECENT ACTIVITY</div>
      {[
        { agent: "DOLLAR", text: "Membership revenue crossed $4K for the first time", time: "2h ago" },
        { agent: "SCOUT", text: "New brand inquiry \u2014 Lumina Headphones", time: "5h ago" },
        { agent: "HYPE", text: "Cover video scheduled for Thursday 7pm EST", time: "Yesterday" },
        { agent: "COMPASS", text: "Quarterly strategy update ready for review", time: "Yesterday" },
      ].map((item, i) => (
        <Card key={i} className="fu" style={{ animationDelay: `${0.5 + i * 0.08}s`, marginBottom: 8, padding: "12px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
              <AgentTag agent={item.agent} small />
              <span style={{ fontSize: 12, color: C.cream, flex: 1 }}>{item.text}</span>
            </div>
            <span style={{ fontSize: 10, color: C.muted, flexShrink: 0, marginLeft: 8 }}>{item.time}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ── TAB 1: MAWD CHAT ──────────────────────────────────────────
function MawdTab() {
  const [activeAgent, setActiveAgent] = useState("DOLLAR");
  const [messages, setMessages] = useState({});
  const [typing, setTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const scrollRef = useRef(null);

  const getMessages = () => messages[activeAgent] || CONVERSATIONS[activeAgent] || [];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [activeAgent, messages, typing]);

  const handleSend = () => {
    if (typing) return;
    const current = [...getMessages()];
    const userMsg = inputVal.trim() || "Tell me more";
    current.push({ from: "user", text: userMsg });
    setMessages(prev => ({ ...prev, [activeAgent]: current }));
    setInputVal("");
    setTyping(true);

    setTimeout(() => {
      const followUp = FOLLOW_UPS[activeAgent];
      setMessages(prev => ({
        ...prev,
        [activeAgent]: [...(prev[activeAgent] || current), { from: "agent", text: followUp }],
      }));
      setTyping(false);
    }, 1200);
  };

  const cur = AGENTS.find(a => a.id === activeAgent);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Agent selector */}
      <div style={{
        display: "flex", gap: 6, padding: "12px 16px", overflowX: "auto",
        borderBottom: `1px solid ${C.border}`, flexShrink: 0,
      }}>
        {AGENTS.map(a => (
          <button key={a.id} onClick={() => setActiveAgent(a.id)} style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "7px 12px", borderRadius: 20, border: "none", cursor: "pointer",
            background: activeAgent === a.id ? a.color + "20" : C.tag,
            outline: activeAgent === a.id ? `1px solid ${a.color}55` : `1px solid ${C.border}`,
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 13 }}>{a.emoji}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: activeAgent === a.id ? a.color : C.muted, letterSpacing: "0.04em" }}>{a.id}</span>
          </button>
        ))}
      </div>

      {/* Chat messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px" }}>
        {/* Agent intro */}
        <div className="fadein" style={{ textAlign: "center", margin: "8px 0 20px" }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, margin: "0 auto 8px",
            background: `linear-gradient(135deg, ${C.blue}, ${C.blue2})`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
          }}>🤖</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: cur.color, letterSpacing: "0.06em" }}>MAWD · {cur.id}</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{cur.role} Agent</div>
        </div>

        {getMessages().map((msg, i) => (
          <div key={`${activeAgent}-${i}`} style={{
            display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
            marginBottom: 10,
          }}>
            <div style={{
              maxWidth: "85%", padding: "10px 14px", borderRadius: 14,
              background: msg.from === "user" ? C.blue + "22" : C.card,
              border: `1px solid ${msg.from === "user" ? C.blue + "44" : C.border}`,
              fontSize: 13, color: C.cream, lineHeight: 1.6,
              borderBottomRightRadius: msg.from === "user" ? 4 : 14,
              borderBottomLeftRadius: msg.from === "user" ? 14 : 4,
            }}>{msg.text}</div>
          </div>
        ))}

        {typing && (
          <div style={{ display: "flex", marginBottom: 10 }}>
            <div style={{
              padding: "10px 14px", borderRadius: 14, borderBottomLeftRadius: 4,
              background: C.card, border: `1px solid ${C.border}`,
            }}><Dots /></div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div style={{
        display: "flex", gap: 8, padding: "10px 16px 68px",
        borderTop: `1px solid ${C.border}`, flexShrink: 0,
      }}>
        <input
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Ask MAWD anything..."
          style={{
            flex: 1, background: C.tag, border: `1px solid ${C.border}`,
            borderRadius: 20, padding: "10px 16px", fontSize: 13,
            color: C.cream, outline: "none", fontFamily: "'DM Sans', system-ui",
          }}
        />
        <button onClick={handleSend} style={{
          width: 38, height: 38, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.blue}, ${C.blue2})`,
          border: "none", cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0,
        }}>↑</button>
      </div>
    </div>
  );
}

// ── TAB 2: ALERTS ─────────────────────────────────────────────
function AlertsTab() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ padding: "24px 20px 100px", overflowY: "auto", height: "100%" }}>
      <div className="fu1" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: C.cream }}>Alerts</h2>
        <Badge color={C.blue}>{NOTIFICATIONS.filter(n => n.isNew).length} NEW</Badge>
      </div>

      {NOTIFICATIONS.map((n, i) => {
        const agent = AGENTS.find(a => a.id === n.agent);
        const isOpen = expanded === i;
        return (
          <div key={i} className="fu" style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
            <Card
              style={{ marginBottom: 8, padding: "12px 14px", cursor: "pointer" }}
              accent={n.isNew}
            >
              <div onClick={() => setExpanded(isOpen ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ display: "flex", gap: 10, flex: 1 }}>
                    {n.isNew && <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.blue, marginTop: 5, flexShrink: 0 }} />}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <AgentTag agent={n.agent} small />
                        <span style={{ fontSize: 10, color: C.muted }}>{n.time}</span>
                      </div>
                      <div style={{ fontSize: 13, color: C.cream, fontWeight: 600, lineHeight: 1.4 }}>{n.title}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: C.muted, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginTop: 4 }}>▾</span>
                </div>
                {isOpen && (
                  <div className="fadein" style={{ fontSize: 12, color: C.dim, lineHeight: 1.6, marginTop: 10, paddingLeft: n.isNew ? 16 : 0 }}>
                    {n.desc}
                  </div>
                )}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

// ── TAB 3: DEALS ──────────────────────────────────────────────
function DealsTab() {
  const [openSection, setOpenSection] = useState("inbox");

  const sections = [
    { key: "inbox", label: "Inbox", count: DEALS.inbox.length, deals: DEALS.inbox },
    { key: "active", label: "In Progress", count: DEALS.active.length, deals: DEALS.active },
    { key: "closed", label: "Closed", count: DEALS.closed.length, deals: DEALS.closed },
  ];

  return (
    <div style={{ padding: "24px 20px 100px", overflowY: "auto", height: "100%" }}>
      <div className="fu1" style={{ marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: C.cream, marginBottom: 4 }}>Deals</h2>
        <div style={{ fontSize: 12, color: C.dim }}>Tracked by SCOUT &amp; DOLLAR</div>
      </div>

      {/* Pipeline summary */}
      <div className="fu2" style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {sections.map(s => (
          <button key={s.key} onClick={() => setOpenSection(s.key)} style={{
            flex: 1, padding: "10px 8px", borderRadius: 10, border: "none", cursor: "pointer",
            background: openSection === s.key ? C.blue + "18" : C.tag,
            outline: openSection === s.key ? `1px solid ${C.blue}44` : `1px solid ${C.border}`,
          }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: openSection === s.key ? C.blue2 : C.cream }}>{s.count}</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{s.label}</div>
          </button>
        ))}
      </div>

      {/* Deals list */}
      {sections.find(s => s.key === openSection)?.deals.map((deal, i) => (
        <Card key={i} className="fu" style={{ animationDelay: `${0.2 + i * 0.08}s`, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: C.cream, fontWeight: 700, marginBottom: 3 }}>{deal.name}</div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>{deal.type}</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Badge color={deal.color}>{deal.status}</Badge>
                <AgentTag agent={deal.agent} small />
              </div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.blue2, flexShrink: 0 }}>{deal.amount}</div>
          </div>
        </Card>
      ))}

      {/* Total pipeline */}
      <Card accent className="fu4" style={{ marginTop: 8, textAlign: "center" }}>
        <div style={{ fontSize: 10, color: C.blue, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 4 }}>TOTAL PIPELINE VALUE</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: C.blue2 }}>$25,740</div>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>across 7 deals</div>
      </Card>
    </div>
  );
}

// ── TAB 4: CLUB ───────────────────────────────────────────────
function FansTab() {
  return (
    <div style={{ padding: "24px 20px 100px", overflowY: "auto", height: "100%" }}>
      <div className="fu1" style={{ marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: C.cream, marginBottom: 4 }}>Fanded Club</h2>
        <div style={{ fontSize: 12, color: C.dim }}>Convert fans into members · Powered by PULSE</div>
      </div>

      {/* Conversion overview */}
      <div className="fu2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        <Card style={{ textAlign: "center", padding: "14px 8px" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.blue2 }}>61.3K</div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>Total Audience</div>
          <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>across all platforms</div>
        </Card>
        <Card style={{ textAlign: "center", padding: "14px 8px" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.green }}>2,340</div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>Fanded Members</div>
          <div style={{ fontSize: 10, color: C.green, marginTop: 2 }}>3.8% converted</div>
        </Card>
      </div>

      <div className="fu2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[
          { v: "94.2%", l: "Retention", c: C.blue },
          { v: "$22.40", l: "Avg LTV", c: C.blue2 },
          { v: "+142", l: "This Month", c: C.green },
        ].map((s, i) => (
          <Card key={i} style={{ textAlign: "center", padding: "10px 6px" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 9, color: C.muted, marginTop: 3 }}>{s.l}</div>
          </Card>
        ))}
      </div>

      {/* Conversion funnel */}
      <Card className="fu3" style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 14, letterSpacing: "0.05em" }}>CONVERSION FUNNEL</div>
        {CONVERSION_FUNNEL.map((step, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: C.cream }}>{step.stage}</span>
              <span style={{ fontSize: 12, color: step.color, fontWeight: 700 }}>{step.count}</span>
            </div>
            <div style={{ height: 6, background: C.border, borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${step.pct}%`, borderRadius: 4,
                background: step.color, transition: "width 0.6s ease",
              }} />
            </div>
          </div>
        ))}
      </Card>

      {/* Platform sources */}
      <Card className="fu4" style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 14, letterSpacing: "0.05em" }}>CONVERTING FROM</div>
        {FAN_SOURCES.map((src, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 0",
            borderBottom: i < FAN_SOURCES.length - 1 ? `1px solid ${C.border}` : "none",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: src.color }} />
                <span style={{ fontSize: 13, color: C.cream, fontWeight: 600 }}>{src.platform}</span>
              </div>
              <span style={{ fontSize: 11, color: C.muted, marginLeft: 14 }}>
                {src.listeners || src.followers || src.subs} reach
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.blue2 }}>{src.converted}</div>
              <div style={{ fontSize: 10, color: C.green }}>{src.rate} conv.</div>
            </div>
          </div>
        ))}
      </Card>

      {/* MAWD insight */}
      <Card accent className="fu5" style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <AgentTag agent="PULSE" />
          <span style={{ fontSize: 10, color: C.muted }}>Insight</span>
        </div>
        <p style={{ fontSize: 13, color: C.cream, lineHeight: 1.65, margin: 0 }}>
          Instagram converts at 5.6% — 2.4&times; higher than any other platform. Your IG Stories with the Fanded link in bio drive 72% of signups. MAWD recommends a weekly Story prompt to push conversion to 7%.
        </p>
      </Card>

      {/* Member spotlight */}
      <div className="fu5" style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 10, letterSpacing: "0.05em" }}>MEMBER SPOTLIGHT</div>
      {MEMBER_SPOTLIGHT.map((fan, i) => (
        <Card key={i} className="fu" style={{ animationDelay: `${0.5 + i * 0.08}s`, marginBottom: 8 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ fontSize: 19, flexShrink: 0 }}>{fan.emoji}</span>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 13, color: C.cream, fontWeight: 700 }}>{fan.name}</span>
                <Badge color={C.muted}>{fan.source}</Badge>
              </div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{fan.detail}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ── SPLASH ────────────────────────────────────────────────────
function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div onClick={onDone} style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      height: "100%", cursor: "pointer", textAlign: "center", padding: "0 28px",
    }}>
      <div className="fu1 glowpulse" style={{
        width: 68, height: 68, borderRadius: 18,
        background: `linear-gradient(135deg, ${C.blue}, ${C.blue2})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 30, marginBottom: 24,
      }}>🤖</div>
      <h1 className="fu2" style={{
        fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900,
        color: C.cream, lineHeight: 1.15, marginBottom: 10,
      }}>
        Welcome back, <span style={{ color: C.blue2 }}>Nia.</span>
      </h1>
      <p className="fu3" style={{ fontSize: 14, color: C.dim, lineHeight: 1.6, marginBottom: 20 }}>
        MAWD has <span style={{ color: C.cream, fontWeight: 700 }}>4 updates</span> since you last checked.
      </p>
      <p className="fu4" style={{ fontSize: 12, color: C.muted }}>Tap anywhere to continue</p>
    </div>
  );
}

// ── SHELL ─────────────────────────────────────────────────────
const TABS = [
  { icon: "⌂", label: "Home", Component: HomeTab },
  { icon: "🤖", label: "MAWD", Component: MawdTab },
  { icon: "🔔", label: "Alerts", Component: AlertsTab },
  { icon: "🤝", label: "Deals", Component: DealsTab },
  { icon: "👥", label: "Club", Component: FansTab },
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const Tab = TABS[activeTab].Component;

  return (
    <div style={{
      background: C.bg, minHeight: "100vh",
      display: "flex", flexDirection: "column", alignItems: "center",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <style>{ANIM}</style>
      <div style={{
        width: "100%", maxWidth: 390, minHeight: "100vh", background: C.bg,
        position: "relative", display: "flex", flexDirection: "column", overflow: "hidden",
      }}>

        {showSplash ? (
          <Splash onDone={() => setShowSplash(false)} />
        ) : (
          <>
            {/* Demo Banner */}
            <div style={{
              background: C.blue + "12", borderBottom: `1px solid ${C.blue}22`,
              padding: "5px 16px", textAlign: "center", flexShrink: 0,
            }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: C.blue, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Demo — All data is synthetic
              </span>
            </div>

            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 20px 10px", borderBottom: `1px solid ${C.border}`, flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 7,
                  background: `linear-gradient(135deg, ${C.blue}, ${C.blue2})`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
                }}>🤖</div>
                <span style={{ fontSize: 12, fontWeight: 800, color: C.cream, letterSpacing: "0.03em" }}>MAWD</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: C.dim }}>Nia&apos;s workspace</span>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: C.purple, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 800, color: C.cream,
                }}>N</div>
              </div>
            </div>

            {/* Content */}
            <div key={activeTab} style={{ flex: 1, overflowY: "auto", position: "relative" }}>
              <Tab />
            </div>

            {/* Bottom Nav */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: `${C.bg}EE`, backdropFilter: "blur(12px)",
              borderTop: `1px solid ${C.border}`,
              display: "flex", justifyContent: "space-around",
              padding: "8px 0 14px",
            }}>
              {TABS.map((tab, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "0 8px",
                }}>
                  <span style={{ fontSize: 17, opacity: i === activeTab ? 1 : 0.35 }}>{tab.icon}</span>
                  <span style={{
                    fontSize: 9, letterSpacing: "0.07em",
                    color: i === activeTab ? C.blue : C.muted,
                    fontWeight: i === activeTab ? 700 : 400,
                    textTransform: "uppercase",
                  }}>{tab.label}</span>
                  {i === 2 && (
                    <div style={{
                      position: "absolute", top: 6, marginLeft: 14,
                      width: 6, height: 6, borderRadius: "50%", background: C.blue,
                    }} />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
