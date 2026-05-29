import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  { label: "Início", id: "home" },
  { label: "Soluções", id: "solutions" },
  { label: "Projetos", id: "projects" },
  { label: "Sobre", id: "about" },
  { label: "Contato", id: "contact" },
];

const PROBLEMS = [
  { icon: "⚡", title: "Atendimento Lento", desc: "Clientes esperando horas por uma resposta simples." },
  { icon: "🔁", title: "Processos Manuais", desc: "Tarefas repetitivas consumindo tempo e energia da equipe." },
  { icon: "💬", title: "WhatsApp Desorganizado", desc: "Mensagens perdidas, leads ignorados, caos na comunicação." },
  { icon: "📉", title: "Perda de Clientes", desc: "Sem automação, o cliente vai para o concorrente." },
  { icon: "🔗", title: "Falta de Integração", desc: "Sistemas que não se conversam, dados espalhados." },
  { icon: "🌀", title: "Ineficiência Operacional", desc: "Operações lentas, custo alto, resultado baixo." },
];

const SOLUTIONS = [
  { icon: "📲", title: "Automação WhatsApp", desc: "Bots inteligentes que atendem, qualificam e fecham vendas 24/7 via WhatsApp.", color: "#3B82F6" },
  { icon: "🧩", title: "Sistemas SaaS", desc: "Plataformas sob medida que escalam com o seu negócio, do zero ao enterprise.", color: "#8B5CF6" },
  { icon: "🔗", title: "Integrações Inteligentes", desc: "Conectamos seus sistemas via APIs para um ecossistema digital unificado.", color: "#06B6D4" },
  { icon: "🤖", title: "IA Aplicada", desc: "Inteligência artificial integrada nos seus fluxos de trabalho reais.", color: "#10B981" },
  { icon: "⚙️", title: "APIs & Workflows", desc: "Automações de ponta a ponta que eliminam gargalos operacionais.", color: "#F59E0B" },
  { icon: "📊", title: "Dashboards & Gestão", desc: "Painéis de controle em tempo real para decisões mais rápidas e precisas.", color: "#EF4444" },
];

const PROJECTS = [
  {
    title: "Evolution Bot",
    desc: "Bot de automação completo para WhatsApp com IA conversacional, atendimento 24/7 e integração com CRM.",
    tags: ["Node.js", "Evolution API", "OpenAI", "PostgreSQL"],
    color: "#3B82F6",
    emoji: "🤖",
  },
  {
    title: "SaaS Restaurante",
    desc: "Sistema completo de gestão para restaurantes com cardápio digital, pedidos automáticos e relatórios em tempo real.",
    tags: ["Next.js", "Supabase", "TypeScript", "TailwindCSS"],
    color: "#8B5CF6",
    emoji: "🍽️",
  },
  {
    title: "AtlasOps AI",
    desc: "Plataforma de operações com IA para otimização de rotas, controle de frota e automação logística.",
    tags: ["Python", "FastAPI", "Docker", "PostgreSQL"],
    color: "#06B6D4",
    emoji: "🗺️",
  },
  {
    title: "WhatsApp Burger Bot",
    desc: "Automação completa de pedidos para hamburgueria com cardápio interativo, pagamento integrado e rastreamento.",
    tags: ["Node.js", "Evolution API", "Webhooks", "Redis"],
    color: "#10B981",
    emoji: "🍔",
  },
];

const TECHS = [
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Node.js", icon: "⬡" },
  { name: "Python", icon: "🐍" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "TailwindCSS", icon: "🎨" },
  { name: "Evolution API", icon: "📡" },
  { name: "Docker", icon: "🐳" },
  { name: "GitHub", icon: "⚙️" },
  { name: "OpenAI", icon: "🤖" },
];

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrollY;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Navbar({ active, onNav }) {
  const scrollY = useScrollY();
  const [open, setOpen] = useState(false);
  const scrolled = scrollY > 40;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.4s ease",
      background: scrolled ? "rgba(5,8,22,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(59,130,246,0.12)" : "none",
      padding: "0 clamp(1rem, 5vw, 3rem)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => onNav("home")}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 16, color: "#fff", letterSpacing: -1,
            boxShadow: "0 0 20px rgba(59,130,246,0.4)",
          }}>A</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: -0.5 }}>
            Akylla <span style={{ color: "#3B82F6" }}>Solutions</span>
          </span>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center", "@media(max-width:768px)": { display: "none" } }} className="desktop-nav">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => onNav(item.id)} style={{
              background: active === item.id ? "rgba(59,130,246,0.15)" : "transparent",
              border: active === item.id ? "1px solid rgba(59,130,246,0.3)" : "1px solid transparent",
              color: active === item.id ? "#3B82F6" : "#94A3B8",
              padding: "6px 16px", borderRadius: 8, cursor: "pointer",
              fontSize: 14, fontWeight: 500, transition: "all 0.2s",
              fontFamily: "'Inter', sans-serif",
            }}
              onMouseEnter={e => { if (active !== item.id) { e.target.style.color = "#fff"; e.target.style.background = "rgba(255,255,255,0.05)"; } }}
              onMouseLeave={e => { if (active !== item.id) { e.target.style.color = "#94A3B8"; e.target.style.background = "transparent"; } }}
            >{item.label}</button>
          ))}
          <button onClick={() => onNav("contact")} style={{
            background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            border: "none", color: "#fff", padding: "8px 20px", borderRadius: 8,
            cursor: "pointer", fontSize: 14, fontWeight: 600, marginLeft: 8,
            boxShadow: "0 0 20px rgba(59,130,246,0.3)", fontFamily: "'Inter', sans-serif",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.boxShadow = "0 0 30px rgba(59,130,246,0.5)"; e.target.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.target.style.boxShadow = "0 0 20px rgba(59,130,246,0.3)"; e.target.style.transform = "none"; }}
          >Falar Agora</button>
        </div>

        <button onClick={() => setOpen(!open)} className="mobile-only" style={{
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8, padding: "8px 10px", cursor: "pointer", color: "#fff", fontSize: 20,
        }}>☰</button>
      </div>

      {open && (
        <div style={{
          position: "absolute", top: 64, left: 0, right: 0,
          background: "rgba(5,8,22,0.98)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(59,130,246,0.15)",
          padding: "1rem", display: "flex", flexDirection: "column", gap: 4,
        }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => { onNav(item.id); setOpen(false); }} style={{
              background: "transparent", border: "none", color: "#94A3B8",
              padding: "12px 16px", textAlign: "left", cursor: "pointer",
              fontSize: 16, fontFamily: "'Inter', sans-serif", borderRadius: 8,
            }}>{item.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection({ onNav }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const words = ["Automação", "Inteligência", "Eficiência", "Inovação"];
  const current = words[tick % words.length];

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      padding: "100px clamp(1rem, 5vw, 3rem) 60px",
    }}>
      {/* Animated BG */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", width: 600, height: 600,
          borderRadius: "50%", top: -200, right: -100,
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400,
          borderRadius: "50%", bottom: -100, left: -50,
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          animation: "float 10s ease-in-out infinite reverse",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.04) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="hero-grid">

          {/* Left */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)",
              borderRadius: 100, padding: "6px 16px", marginBottom: "2rem",
              animation: "fadeInUp 0.8s ease forwards",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3B82F6", display: "inline-block", boxShadow: "0 0 8px #3B82F6", animation: "pulse 2s infinite" }} />
              <span style={{ color: "#3B82F6", fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif", letterSpacing: 0.5 }}>Automação Inteligente para Negócios</span>
            </div>

            <h1 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.1,
              color: "#fff", margin: "0 0 1.5rem", letterSpacing: -2,
              animation: "fadeInUp 0.8s ease 0.1s both",
            }}>
              <span style={{ display: "block" }}>
                <span style={{
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  display: "inline-block", minWidth: "10ch",
                  transition: "all 0.4s ease",
                }}>{current}</span>
              </span>
              <span style={{ display: "block", color: "#fff" }}>para Negócios</span>
              <span style={{ display: "block", color: "#fff" }}>Modernos</span>
            </h1>

            <p style={{
              color: "#94A3B8", fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.7,
              margin: "0 0 2.5rem", maxWidth: 520,
              fontFamily: "'Inter', sans-serif",
              animation: "fadeInUp 0.8s ease 0.2s both",
            }}>
              Soluções em automação, integração e sistemas inteligentes para empresas que querem crescer com tecnologia.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeInUp 0.8s ease 0.3s both" }}>
              <button onClick={() => onNav("projects")} style={{
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                border: "none", color: "#fff", padding: "14px 32px",
                borderRadius: 12, cursor: "pointer", fontSize: 15, fontWeight: 700,
                fontFamily: "'Inter', sans-serif", letterSpacing: 0.3,
                boxShadow: "0 0 30px rgba(59,130,246,0.35)",
                transition: "all 0.3s ease",
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 50px rgba(59,130,246,0.5)"; }}
                onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 0 30px rgba(59,130,246,0.35)"; }}
              >Ver Projetos →</button>

              <button onClick={() => window.open("https://wa.me/5562999999999", "_blank")} style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff", padding: "14px 32px", borderRadius: 12,
                cursor: "pointer", fontSize: 15, fontWeight: 600,
                fontFamily: "'Inter', sans-serif", transition: "all 0.3s ease",
              }}
                onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.borderColor = "rgba(59,130,246,0.3)"; }}
                onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.05)"; e.target.style.borderColor = "rgba(255,255,255,0.12)"; }}
              >💬 Falar no WhatsApp</button>
            </div>

            <div style={{ display: "flex", gap: 32, marginTop: "3rem", animation: "fadeInUp 0.8s ease 0.4s both" }}>
              {[["50+", "Automações criadas"], ["24/7", "Uptime garantido"], ["100%", "Foco em resultados"]].map(([n, l]) => (
                <div key={n}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#3B82F6" }}>{n}</div>
                  <div style={{ fontSize: 12, color: "#64748B", fontFamily: "'Inter', sans-serif", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }} className="hero-visual">
            <div style={{
              width: 400, height: 400, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
              position: "absolute",
              animation: "spin 20s linear infinite",
            }} />

            {/* Center card */}
            <div style={{
              background: "rgba(11,17,32,0.9)",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: 24, padding: "2rem", width: 300,
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 60px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
              animation: "float 6s ease-in-out infinite",
              position: "relative", zIndex: 2,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981" }} />
                <span style={{ color: "#94A3B8", fontSize: 13, fontFamily: "'Inter', sans-serif" }}>Sistema Ativo</span>
              </div>
              <div style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: "1rem" }}>WhatsApp Bot</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Mensagens/dia", value: "1.2k", color: "#3B82F6" },
                  { label: "Taxa de resposta", value: "99.8%", color: "#10B981" },
                  { label: "Leads gerados", value: "47", color: "#8B5CF6" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#64748B", fontSize: 12, fontFamily: "'Inter', sans-serif" }}>{item.label}</span>
                    <span style={{ color: item.color, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14 }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: "1.5rem", height: 4, borderRadius: 2,
                background: "rgba(255,255,255,0.05)",
              }}>
                <div style={{
                  height: "100%", width: "78%", borderRadius: 2,
                  background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
                  boxShadow: "0 0 10px rgba(59,130,246,0.5)",
                }} />
              </div>
            </div>

            {/* Floating badges */}
            {[
              { label: "🤖 IA Ativa", top: "10%", left: "-10%", color: "#8B5CF6" },
              { label: "⚡ Automação", bottom: "15%", right: "-8%", color: "#06B6D4" },
              { label: "✅ 24/7", top: "65%", left: "-15%", color: "#10B981" },
            ].map(b => (
              <div key={b.label} style={{
                position: "absolute", top: b.top, left: b.left, bottom: b.bottom, right: b.right,
                background: "rgba(11,17,32,0.9)",
                border: `1px solid ${b.color}30`,
                borderRadius: 10, padding: "8px 14px",
                color: b.color, fontSize: 12, fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                backdropFilter: "blur(10px)",
                animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
                whiteSpace: "nowrap",
              }}>{b.label}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ tag, title, sub, light }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      textAlign: "center", marginBottom: "4rem",
      opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
      transition: "all 0.7s ease",
    }}>
      {tag && (
        <div style={{
          display: "inline-block", background: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.25)",
          borderRadius: 100, padding: "4px 16px", marginBottom: "1rem",
          color: "#3B82F6", fontSize: 12, fontWeight: 600, letterSpacing: 1,
          fontFamily: "'Inter', sans-serif", textTransform: "uppercase",
        }}>{tag}</div>
      )}
      <h2 style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#fff",
        margin: "0 0 1rem", letterSpacing: -1,
      }}>{title}</h2>
      {sub && <p style={{ color: "#64748B", fontSize: "1.05rem", fontFamily: "'Inter', sans-serif", maxWidth: 560, margin: "0 auto" }}>{sub}</p>}
    </div>
  );
}

function ProblemsSection() {
  return (
    <section style={{ padding: "6rem clamp(1rem, 5vw, 3rem)", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle tag="Diagnóstico" title="Problemas que resolvemos" sub="Identificamos os principais gargalos do seu negócio e entregamos automação cirúrgica." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {PROBLEMS.map((p, i) => <ProblemCard key={i} item={p} delay={i * 80} />)}
        </div>
      </div>
    </section>
  );
}

function ProblemCard({ item, delay }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} style={{
      background: hov ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.03)",
      border: hov ? "1px solid rgba(59,130,246,0.25)" : "1px solid rgba(255,255,255,0.06)",
      borderRadius: 16, padding: "1.5rem",
      transition: "all 0.3s ease", cursor: "default",
      opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)",
      transitionDelay: `${delay}ms`,
      boxShadow: hov ? "0 0 30px rgba(59,130,246,0.08)" : "none",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ fontSize: 28, marginBottom: "0.8rem" }}>{item.icon}</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: 8 }}>{item.title}</div>
      <div style={{ color: "#64748B", fontSize: 14, lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{item.desc}</div>
    </div>
  );
}

function SolutionsSection({ onNav }) {
  return (
    <section id="solutions" style={{ padding: "6rem clamp(1rem, 5vw, 3rem)", background: "rgba(11,17,32,0.5)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle tag="O que fazemos" title="Soluções que transformam" sub="Cada serviço foi criado para resolver um problema real de negócio com tecnologia de ponta." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {SOLUTIONS.map((s, i) => <SolutionCard key={i} item={s} delay={i * 80} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button onClick={() => onNav("contact")} style={{
            background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            border: "none", color: "#fff", padding: "14px 40px",
            borderRadius: 12, cursor: "pointer", fontSize: 15, fontWeight: 700,
            fontFamily: "'Inter', sans-serif", boxShadow: "0 0 30px rgba(59,130,246,0.3)",
            transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 50px rgba(59,130,246,0.5)"; }}
            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 0 30px rgba(59,130,246,0.3)"; }}
          >Solicitar consultoria gratuita →</button>
        </div>
      </div>
    </section>
  );
}

function SolutionCard({ item, delay }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} style={{
      background: hov ? "rgba(11,17,32,0.9)" : "rgba(11,17,32,0.6)",
      border: hov ? `1px solid ${item.color}40` : "1px solid rgba(255,255,255,0.07)",
      borderRadius: 20, padding: "2rem",
      transition: "all 0.35s ease", cursor: "default",
      opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(25px)",
      transitionDelay: `${delay}ms`,
      boxShadow: hov ? `0 0 40px ${item.color}15` : "none",
      position: "relative", overflow: "hidden",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {hov && <div style={{
        position: "absolute", top: -40, right: -40, width: 120, height: 120,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />}
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: `${item.color}15`, border: `1px solid ${item.color}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, marginBottom: "1.25rem",
        transition: "all 0.3s",
        boxShadow: hov ? `0 0 20px ${item.color}30` : "none",
      }}>{item.icon}</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: 10 }}>{item.title}</div>
      <div style={{ color: "#64748B", fontSize: 14, lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{item.desc}</div>
      <div style={{ marginTop: "1.5rem", color: item.color, fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
        Saiba mais <span style={{ transition: "transform 0.2s", transform: hov ? "translateX(4px)" : "none" }}>→</span>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [filter, setFilter] = useState("Todos");
  const filters = ["Todos", "WhatsApp", "SaaS", "IA"];
  return (
    <section id="projects" style={{ padding: "6rem clamp(1rem, 5vw, 3rem)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle tag="Portfólio" title="Projetos em destaque" sub="Automações reais que geraram resultados reais para negócios reais." />
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.04)",
              border: filter === f ? "1px solid rgba(59,130,246,0.35)" : "1px solid rgba(255,255,255,0.08)",
              color: filter === f ? "#3B82F6" : "#64748B",
              padding: "8px 20px", borderRadius: 100,
              cursor: "pointer", fontSize: 14, fontWeight: 500,
              fontFamily: "'Inter', sans-serif", transition: "all 0.2s",
            }}>{f}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={i} item={p} delay={i * 100} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ item, delay }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} style={{
      background: hov ? "rgba(11,17,32,0.95)" : "rgba(11,17,32,0.7)",
      border: hov ? `1px solid ${item.color}35` : "1px solid rgba(255,255,255,0.07)",
      borderRadius: 20, overflow: "hidden",
      transition: "all 0.35s ease",
      opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(25px)",
      transitionDelay: `${delay}ms`,
      boxShadow: hov ? `0 8px 50px ${item.color}15` : "none",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Thumbnail */}
      <div style={{
        height: 160, display: "flex", alignItems: "center", justifyContent: "center",
        background: `linear-gradient(135deg, ${item.color}15, ${item.color}05)`,
        borderBottom: `1px solid ${item.color}20`,
        position: "relative", overflow: "hidden",
        transition: "all 0.3s",
      }}>
        <div style={{
          fontSize: 60, filter: hov ? "drop-shadow(0 0 20px rgba(255,255,255,0.3))" : "none",
          transition: "all 0.3s", transform: hov ? "scale(1.1)" : "scale(1)",
        }}>{item.emoji}</div>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${item.color}10 0%, transparent 60%)`,
        }} />
      </div>

      <div style={{ padding: "1.5rem" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: 10 }}>{item.title}</div>
        <div style={{ color: "#64748B", fontSize: 13, lineHeight: 1.7, fontFamily: "'Inter', sans-serif", marginBottom: "1.25rem" }}>{item.desc}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.5rem" }}>
          {item.tags.map(tag => (
            <span key={tag} style={{
              background: `${item.color}10`, border: `1px solid ${item.color}25`,
              color: item.color, fontSize: 11, fontWeight: 600,
              padding: "3px 10px", borderRadius: 6, fontFamily: "'Inter', sans-serif",
            }}>{tag}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{
            flex: 1, background: `${item.color}15`, border: `1px solid ${item.color}30`,
            color: item.color, padding: "8px", borderRadius: 8, cursor: "pointer",
            fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif",
          }}>Ver Projeto</button>
          <button style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#64748B", padding: "8px 14px", borderRadius: 8, cursor: "pointer",
            fontSize: 13, fontFamily: "'Inter', sans-serif",
          }}>GitHub</button>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section id="about" style={{ padding: "6rem clamp(1rem, 5vw, 3rem)", background: "rgba(11,17,32,0.4)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="about-grid">
          {/* Left */}
          <div ref={ref} style={{
            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-30px)",
            transition: "all 0.8s ease",
          }}>
            <div style={{
              display: "inline-block", background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.25)",
              borderRadius: 100, padding: "4px 16px", marginBottom: "1.5rem",
              color: "#3B82F6", fontSize: 12, fontWeight: 600,
              fontFamily: "'Inter', sans-serif", letterSpacing: 1, textTransform: "uppercase",
            }}>Sobre a Akylla</div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#fff",
              margin: "0 0 1.5rem", letterSpacing: -1, lineHeight: 1.15,
            }}>Especialistas em automação inteligente</h2>
            <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.8, fontFamily: "'Inter', sans-serif", marginBottom: "1.5rem" }}>
              A Akylla Solutions nasceu da missão de democratizar a automação inteligente para negócios de todos os portes. Combinamos tecnologia de ponta com visão estratégica para entregar sistemas que realmente transformam operações.
            </p>
            <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.8, fontFamily: "'Inter', sans-serif", marginBottom: "2rem" }}>
              Nosso fundador tem experiência sólida em desenvolvimento de sistemas, automação de processos e criação de soluções SaaS que escalam. Cada projeto é tratado como um produto — não como serviço pontual.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Automação WhatsApp de ponta a ponta", "Sistemas SaaS escaláveis", "Integrações via API com qualquer sistema", "IA aplicada a fluxos de trabalho reais"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#3B82F6", flexShrink: 0 }}>✓</div>
                  <span style={{ color: "#94A3B8", fontSize: 14, fontFamily: "'Inter', sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — tech grid */}
          <div>
            <div style={{
              background: "rgba(11,17,32,0.8)", border: "1px solid rgba(59,130,246,0.12)",
              borderRadius: 24, padding: "2rem",
              boxShadow: "0 0 60px rgba(59,130,246,0.05)",
            }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#64748B", marginBottom: "1.5rem", letterSpacing: 2, textTransform: "uppercase" }}>Stack Tecnológico</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                {TECHS.map((t, i) => <TechBadge key={i} tech={t} delay={i * 50} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechBadge({ tech, delay }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} style={{
      display: "flex", alignItems: "center", gap: 10,
      background: hov ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.03)",
      border: hov ? "1px solid rgba(59,130,246,0.2)" : "1px solid rgba(255,255,255,0.06)",
      borderRadius: 10, padding: "10px 14px",
      transition: "all 0.25s ease", cursor: "default",
      opacity: inView ? 1 : 0, transform: inView ? "none" : "scale(0.95)",
      transitionDelay: `${delay}ms`,
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={{ fontSize: 16 }}>{tech.icon}</span>
      <span style={{ color: hov ? "#fff" : "#94A3B8", fontSize: 13, fontWeight: 500, fontFamily: "'Inter', sans-serif", transition: "color 0.2s" }}>{tech.name}</span>
    </div>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", email: "", message: "" });
    }
  };

  const [ref, inView] = useInView();
  return (
    <section id="contact" style={{ padding: "6rem clamp(1rem, 5vw, 3rem)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionTitle tag="Contato" title="Vamos automatizar seu negócio?" sub="Fale com a gente e descubra como a automação pode transformar seus resultados." />
        <div ref={ref} style={{
          display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "3rem",
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
          transition: "all 0.8s ease",
        }} className="contact-grid">
          {/* Info */}
          <div>
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#fff", fontSize: "1.1rem", marginBottom: "1.5rem" }}>Entre em contato</div>
              {[
                { icon: "💬", label: "WhatsApp", val: "+55 (62) 9 9999-9999", link: "https://wa.me/5562999999999" },
                { icon: "📧", label: "E-mail", val: "contato@akylla.com.br", link: "mailto:contato@akylla.com.br" },
                { icon: "💻", label: "GitHub", val: "@akylla-solutions", link: "#" },
              ].map(item => (
                <a key={item.label} href={item.link} target="_blank" rel="noreferrer" style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
                  textDecoration: "none", transition: "all 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.paddingLeft = "6px"}
                  onMouseLeave={e => e.currentTarget.style.paddingLeft = "0"}
                >
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div>
                    <div style={{ color: "#64748B", fontSize: 11, fontFamily: "'Inter', sans-serif", marginBottom: 2 }}>{item.label}</div>
                    <div style={{ color: "#94A3B8", fontSize: 14, fontFamily: "'Inter', sans-serif" }}>{item.val}</div>
                  </div>
                </a>
              ))}
            </div>

            <button onClick={() => window.open("https://wa.me/5562999999999", "_blank")} style={{
              width: "100%", background: "linear-gradient(135deg, #25D366, #128C7E)",
              border: "none", color: "#fff", padding: "14px",
              borderRadius: 12, cursor: "pointer", fontSize: 15, fontWeight: 700,
              fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: "0 0 30px rgba(37,211,102,0.25)", transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(37,211,102,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 30px rgba(37,211,102,0.25)"; }}
            >💬 Falar no WhatsApp</button>
          </div>

          {/* Form */}
          <div style={{
            background: "rgba(11,17,32,0.7)", border: "1px solid rgba(59,130,246,0.12)",
            borderRadius: 20, padding: "2rem",
          }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: 48, marginBottom: "1rem" }}>✅</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#10B981", fontSize: "1.2rem" }}>Mensagem enviada!</div>
                <div style={{ color: "#64748B", fontSize: 14, fontFamily: "'Inter', sans-serif", marginTop: 8 }}>Retornaremos em breve.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { name: "name", placeholder: "Seu nome", type: "text" },
                  { name: "email", placeholder: "Seu e-mail", type: "email" },
                ].map(f => (
                  <input key={f.name} name={f.name} type={f.type} value={form[f.name]} onChange={handleChange}
                    placeholder={f.placeholder} style={{
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14,
                      fontFamily: "'Inter', sans-serif", outline: "none", transition: "all 0.2s",
                    }}
                    onFocus={e => { e.target.style.border = "1px solid rgba(59,130,246,0.35)"; e.target.style.background = "rgba(59,130,246,0.04)"; }}
                    onBlur={e => { e.target.style.border = "1px solid rgba(255,255,255,0.08)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                  />
                ))}
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder="Como podemos ajudar seu negócio?" rows={5} style={{
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14,
                    fontFamily: "'Inter', sans-serif", outline: "none", resize: "vertical",
                    transition: "all 0.2s",
                  }}
                  onFocus={e => { e.target.style.border = "1px solid rgba(59,130,246,0.35)"; e.target.style.background = "rgba(59,130,246,0.04)"; }}
                  onBlur={e => { e.target.style.border = "1px solid rgba(255,255,255,0.08)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                />
                <button onClick={handleSubmit} style={{
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                  border: "none", color: "#fff", padding: "14px",
                  borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 700,
                  fontFamily: "'Inter', sans-serif", boxShadow: "0 0 25px rgba(59,130,246,0.3)",
                  transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 0 40px rgba(59,130,246,0.5)"; }}
                  onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 0 25px rgba(59,130,246,0.3)"; }}
                >Enviar mensagem →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onNav }) {
  return (
    <footer style={{
      borderTop: "1px solid rgba(59,130,246,0.1)",
      background: "rgba(5,8,22,0.95)",
      padding: "3rem clamp(1rem, 5vw, 3rem) 2rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem", cursor: "pointer" }} onClick={() => onNav("home")}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 14, color: "#fff",
              }}>A</div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>
                Akylla <span style={{ color: "#3B82F6" }}>Solutions</span>
              </span>
            </div>
            <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.7, fontFamily: "'Inter', sans-serif", maxWidth: 280 }}>
              Automação inteligente para negócios que querem crescer com tecnologia.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#94A3B8", fontSize: 13, marginBottom: "1rem", letterSpacing: 1, textTransform: "uppercase" }}>Navegação</div>
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => onNav(item.id)} style={{
                display: "block", background: "none", border: "none", cursor: "pointer",
                color: "#475569", fontSize: 14, fontFamily: "'Inter', sans-serif",
                padding: "4px 0", textAlign: "left", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = "#94A3B8"}
                onMouseLeave={e => e.target.style.color = "#475569"}
              >{item.label}</button>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#94A3B8", fontSize: 13, marginBottom: "1rem", letterSpacing: 1, textTransform: "uppercase" }}>Contato</div>
            {[
              { label: "WhatsApp", href: "https://wa.me/5562999999999" },
              { label: "E-mail", href: "mailto:contato@akylla.com.br" },
              { label: "GitHub", href: "#" },
              { label: "LinkedIn", href: "#" },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
                display: "block", color: "#475569", fontSize: 14, fontFamily: "'Inter', sans-serif",
                padding: "4px 0", textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = "#94A3B8"}
                onMouseLeave={e => e.target.style.color = "#475569"}
              >{l.label}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "#334155", fontSize: 13, fontFamily: "'Inter', sans-serif" }}>© 2025 Akylla Solutions. Todos os direitos reservados.</span>
          <span style={{ color: "#334155", fontSize: 12, fontFamily: "'Inter', sans-serif" }}>Feito com ⚡ para negócios modernos</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("home");

  const scrollTo = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #050816; }
      ::placeholder { color: #334155 !important; }
      @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes pulse { 0%,100%{opacity:1;box-shadow:0 0 8px #3B82F6} 50%{opacity:0.6;box-shadow:0 0 16px #3B82F6} }
      @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
      .desktop-nav { display: flex !important; }
      .mobile-only { display: none !important; }
      @media(max-width:768px){
        .desktop-nav { display: none !important; }
        .mobile-only { display: flex !important; }
        .hero-grid { grid-template-columns: 1fr !important; }
        .hero-visual { display: none !important; }
        .about-grid { grid-template-columns: 1fr !important; }
        .contact-grid { grid-template-columns: 1fr !important; }
        .footer-grid { grid-template-columns: 1fr !important; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ background: "#050816", minHeight: "100vh", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <Navbar active={active} onNav={scrollTo} />
      <HeroSection onNav={scrollTo} />
      <ProblemsSection />
      <SolutionsSection onNav={scrollTo} />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <Footer onNav={scrollTo} />
    </div>
  );
}
