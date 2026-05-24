// // import React from 'react';

// // const HomeAfterLogin = () => {
// //   return (
// //     <div className="max-w-4xl mx-auto mt-16 px-4">
// //       <section className="mb-12 text-center">
// //         <h1 className="text-4xl font-bold mb-4">
// //           Welcome back to AuditReady
// //         </h1>
// //         <p className="text-lg text-gray-700">
// //           AuditReady helps startups stay audit-ready by organizing your
// //           financial documents, tracking uploads, and simplifying compliance.
// //         </p>
// //       </section>

// //       <section className="bg-white rounded-lg shadow p-8">
// //         <h2 className="text-2xl font-semibold mb-4">About Us</h2>
// //         <p className="text-gray-700 leading-relaxed">
// //           AuditReady was founded with the mission to empower startups with
// //           seamless financial documentation and audit readiness. Our platform
// //           automates document storage, milestone tracking, and real-time audit
// //           preparation, so you can focus on growing your business.
// //         </p>
// //       </section>
// //     </div>
// //   );
// // };

// // export default HomeAfterLogin;

// import React from "react";

// const AboutAndOffer = () => {
//   return (
//     <div className="w-full min-h-screen bg-[#0b0f1a] flex flex-col">

//       {/* MAIN CONTENT */}
//       <div className="flex-grow px-6 py-20">
//         <div className="max-w-5xl mx-auto space-y-16">

//           {/* WHAT WE OFFER */}
//           <section
//             className="rounded-2xl p-10
//                        bg-[#0f1424]
//                        border border-cyan-400/30
//                        shadow-[0_0_30px_rgba(34,211,238,0.15)]"
//           >
//             <h2 className="text-3xl font-semibold text-white mb-6">
//               What We Offer
//             </h2>

//             <div className="space-y-5 text-gray-300 leading-relaxed">
//               <p>
//                 <span className="text-cyan-400 font-medium">
//                   Secure Financial Data Management:
//                 </span>{" "}
//                 Robust backend infrastructure for storing and managing startup
//                 transaction records with high standards of security,
//                 scalability, and reliability.
//               </p>

//               <p>
//                 <span className="text-cyan-400 font-medium">
//                   Interactive Investment Dashboards:
//                 </span>{" "}
//                 Clear, actionable financial visibility using advanced
//                 visualizations such as bar charts, line graphs, area charts,
//                 and transaction heatmaps.
//               </p>

//               <p>
//                 <span className="text-cyan-400 font-medium">
//                   Smart Data Filtering & Exploration:
//                 </span>{" "}
//                 Filter financial data by transaction type, date range, and
//                 activity patterns for deeper insights.
//               </p>

//               <p>
//                 <span className="text-cyan-400 font-medium">
//                   Real-Time Transparency for Investors:
//                 </span>{" "}
//                 Immediate access to structured, visual financial data that
//                 builds trust and accountability.
//               </p>

//               <p>
//                 <span className="text-cyan-400 font-medium">
//                   AI-Driven Financial Insights (Coming Soon):
//                 </span>{" "}
//                 AI/ML models for trend forecasting, anomaly detection, and
//                 spending behavior analysis.
//               </p>

//               <p>
//                 <span className="text-cyan-400 font-medium">
//                   Scalable & Future-Ready Architecture:
//                 </span>{" "}
//                 Built using React, Supabase, and Recharts to scale seamlessly
//                 as startups grow.
//               </p>
//             </div>
//           </section>

//           {/* ABOUT AUDITREADY */}
//           <section
//             className="rounded-2xl p-10
//                        bg-[#0f1424]
//                        border border-cyan-400/30
//                        shadow-[0_0_30px_rgba(34,211,238,0.15)]"
//           >
//             <h2 className="text-3xl font-semibold text-white mb-6">
//               About AuditReady
//             </h2>

//             <p className="text-gray-300 leading-relaxed">
//               We are building an AI-powered investment transparency platform
//               designed to bring clarity, trust, and data-driven insights into
//               the startup–investor ecosystem.
//               <br /><br />
//               Our platform combines a secure cloud backend, interactive
//               financial dashboards, and advanced analytics to transform raw
//               transaction data into meaningful intelligence.
//               <br /><br />
//               Our long-term vision is to redefine investment transparency
//               through intelligent automation and predictive financial
//               insights.
//             </p>
//           </section>

//         </div>
//       </div>

//       {/* FOOTER */}
//       <footer
//         className="w-full bg-[#0f1424]
//                    border-t border-cyan-400/20
//                    px-6 py-12"
//       >
//         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

//           {/* BRAND */}
//           <div>
//             <h3 className="text-xl font-semibold text-white mb-3">
//               Audit<span className="text-cyan-400">Ready</span>
//             </h3>
//             <p className="text-gray-400 text-sm leading-relaxed">
//               Building trust and transparency through secure, intelligent
//               financial platforms.
//             </p>
//           </div>

//           {/* CONTACT & LEGAL */}
//           <div>
//             <h4 className="text-lg font-semibold text-white mb-3">
//               Support
//             </h4>
//             <ul className="space-y-2 text-gray-300 text-sm">
//               <li className="hover:text-cyan-400 cursor-pointer transition">
//                 Contact Us
//               </li>
//               <li className="hover:text-cyan-400 cursor-pointer transition">
//                 Terms of Use
//               </li>
//             </ul>
//           </div>

//           {/* SOCIAL MEDIA */}
//           <div>
//             <h4 className="text-lg font-semibold text-white mb-3">
//               Social Media
//             </h4>
//             <ul className="space-y-2 text-gray-300 text-sm">
//               <li className="hover:text-cyan-400 cursor-pointer transition">
//                 LinkedIn
//               </li>
//               <li className="hover:text-cyan-400 cursor-pointer transition">
//                 X (Twitter)
//               </li>
//               <li className="hover:text-cyan-400 cursor-pointer transition">
//                 Instagram
//               </li>
//               <li className="hover:text-cyan-400 cursor-pointer transition">
//                 Telegram
//               </li>
//               <li className="hover:text-cyan-400 cursor-pointer transition">
//                 WhatsApp
//               </li>
//             </ul>
//           </div>

//         </div>

//         <div className="mt-10 text-center text-sm text-gray-500">
//           © {new Date().getFullYear()} AuditReady. All rights reserved.
//         </div>
//       </footer>

//     </div>
//   );
// };

// export default AboutAndOffer;






// src/pages/AboutAndOffer.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const buildFeatures = (accent, accentAlt) => [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="7" width="22" height="16" rx="2" stroke={accent} strokeWidth="1.4" fill={`${accent}0f`} />
        <path d="M9 12h10M9 16h6" stroke={accent} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="21" cy="8" r="3.5" fill={`${accent}26`} stroke={accent} strokeWidth="1.2" />
        <path d="M20 8l.8.8 1.6-1.6" stroke={accent} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Secure Financial Data Management",
    desc: "Robust backend infrastructure for storing and managing startup transaction records with high standards of security, scalability, and reliability.",
    accent,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polyline points="4,22 9,15 13,18 18,10 24,13" stroke={accent} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="22" width="20" height="1.2" rx="0.6" fill={`${accent}40`} />
        <circle cx="18" cy="10" r="2.5" fill={`${accent}33`} stroke={accent} strokeWidth="1.2" />
      </svg>
    ),
    label: "Interactive Investment Dashboards",
    desc: "Clear, actionable financial visibility using advanced visualizations — bar charts, line graphs, area charts, and transaction heatmaps.",
    accent,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="13" cy="13" r="8" stroke={accent} strokeWidth="1.4" fill={`${accent}0d`} />
        <path d="M19 19l4 4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 13h6M13 10v6" stroke={accent} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    label: "Smart Data Filtering & Exploration",
    desc: "Filter financial data by transaction type, date range, and activity patterns for deeper, context-aware insights.",
    accent,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4v4M14 20v4M4 14h4M20 14h4" stroke={accent} strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="14" cy="14" r="6" stroke={accent} strokeWidth="1.4" fill={`${accent}0f`} />
        <circle cx="14" cy="14" r="2.5" fill={`${accent}80`} />
      </svg>
    ),
    label: "Real-Time Transparency for Investors",
    desc: "Immediate access to structured, visual financial data that builds trust and accountability across your portfolio.",
    accent,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="3" stroke={accentAlt} strokeWidth="1.4" fill={`${accentAlt}0d`} strokeDasharray="4 2"/>
        <path d="M9 14l3 3 7-7" stroke={accentAlt} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="6" r="3" fill={`${accentAlt}4d`} stroke={accentAlt} strokeWidth="1" />
        <text x="20.5" y="8" fontSize="4" fill={accentAlt} fontWeight="bold">!</text>
      </svg>
    ),
    label: "AI-Driven Financial Insights",
    desc: "Coming soon — AI/ML models for trend forecasting, anomaly detection, and spending behaviour analysis.",
    accent: accentAlt,
    badge: "Coming Soon",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="16" width="5" height="8" rx="1" fill={`${accent}1a`} stroke={accent} strokeWidth="1.3" />
        <rect x="11.5" y="11" width="5" height="13" rx="1" fill={`${accent}1a`} stroke={accent} strokeWidth="1.3" />
        <rect x="19" y="6" width="5" height="18" rx="1" fill={`${accent}26`} stroke={accent} strokeWidth="1.3" />
      </svg>
    ),
    label: "Scalable & Future-Ready Architecture",
    desc: "Built using React, Supabase, and Recharts — designed to scale seamlessly as your startup grows.",
    accent,
  },
];

const AboutAndOffer = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: investor } = await supabase
        .from("investors")
        .select("name")
        .eq("auth_id", user.id)
        .single();

      if (investor) { setRole("investor"); return; }

      const { data: startup } = await supabase
        .from("startups")
        .select("startup_name")
        .eq("user_id", user.id)
        .single();

      if (startup) setRole("startup");
    };
    fetchRole();
  }, []);

  // ── Accent token system ──────────────────────────────────────────────────
  const isInvestor = role === "investor";

  // Primary accent
  const accent     = isInvestor ? "#D4AF37" : "#00d4ff";
  const accentRgb  = isInvestor ? "212,175,55"  : "0,212,255";
  // Secondary / "coming soon" accent (always the opposite identity)
  const accentAlt  = isInvestor ? "#22d3ee"  : "#f59e0b";
  const accentAltRgb = isInvestor ? "34,211,238" : "245,158,11";

  const features = buildFeatures(accent, accentAlt);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07090f",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.3); }
        }

        .ao-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(${accentRgb},0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${accentRgb},0.028) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
          z-index: 0;
        }
        .ao-glow-tl {
          position: fixed;
          top: -120px; left: -120px;
          width: 480px; height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(${accentRgb},0.08), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .ao-glow-br {
          position: fixed;
          bottom: -120px; right: -120px;
          width: 480px; height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(${accentAltRgb},0.06), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .ao-scanline {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(${accentRgb},0.07), transparent);
          animation: scanline 10s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .ao-content {
          position: relative;
          z-index: 2;
          max-width: 960px;
          margin: 0 auto;
          padding: 7rem 1.5rem 5rem;
        }

        /* ── Hero ── */
        .ao-hero {
          text-align: center;
          margin-bottom: 5rem;
          animation: fadeUp 0.7s ease both;
        }
        .ao-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(${accentRgb},0.75);
          margin-bottom: 1.2rem;
        }
        .ao-eyebrow-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: ${accent};
          animation: pulse-dot 2s ease infinite;
        }
        .ao-hero-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          color: white;
          line-height: 1.08;
          letter-spacing: -0.025em;
          margin-bottom: 1.25rem;
        }
        .ao-hero-title span {
          background: linear-gradient(90deg, ${accent}, ${isInvestor ? "#fde68a" : "#7dd3fc"});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ao-hero-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.42);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.75;
          font-weight: 300;
        }
        .ao-hero-divider {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, ${accent}, transparent);
          margin: 2rem auto 0;
        }

        /* ── Section Label ── */
        .ao-section-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 2.5rem;
          animation: fadeUp 0.7s ease both;
        }
        .ao-section-label-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, rgba(255,255,255,0.08), transparent);
        }
        .ao-section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.9rem;
          color: white;
          letter-spacing: -0.02em;
          white-space: nowrap;
        }

        /* ── Feature Grid ── */
        .ao-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(${accentRgb},0.08);
          border: 1px solid rgba(${accentRgb},0.1);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 5rem;
        }
        @media (max-width: 768px) {
          .ao-features-grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .ao-features-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .ao-feature-card {
          background: #07090f;
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          position: relative;
          transition: background 0.3s ease;
          animation: fadeUp 0.7s ease both;
        }
        .ao-feature-card:hover {
          background: rgba(${accentRgb},0.04);
        }
        .ao-feature-card.alt:hover {
          background: rgba(${accentAltRgb},0.04);
        }
        .ao-feature-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 1.75rem; right: 1.75rem;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
        }

        .ao-feature-icon-wrap {
          width: 48px; height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ao-feature-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: white;
          letter-spacing: -0.01em;
          line-height: 1.35;
        }
        .ao-feature-desc {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.38);
          line-height: 1.7;
          font-weight: 300;
        }
        .ao-feature-badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 3px;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(${accentAltRgb},0.12);
          color: ${accentAlt};
          border: 1px solid rgba(${accentAltRgb},0.28);
          width: fit-content;
        }

        /* ── About Section ── */
        .ao-about {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
          animation: fadeUp 0.7s ease both;
          animation-delay: 0.2s;
        }
        @media (max-width: 768px) {
          .ao-about { grid-template-columns: 1fr; }
        }
        .ao-about-body {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.85;
          font-weight: 300;
        }
        .ao-about-body p + p { margin-top: 1.1rem; }

        .ao-stat-list {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: rgba(${accentRgb},0.07);
          border: 1px solid rgba(${accentRgb},0.1);
          border-radius: 12px;
          overflow: hidden;
        }
        .ao-stat {
          background: #07090f;
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: background 0.25s;
        }
        .ao-stat:hover { background: rgba(${accentRgb},0.04); }
        .ao-stat-value {
          font-family: 'DM Serif Display', serif;
          font-size: 1.9rem;
          color: white;
          line-height: 1;
        }
        .ao-stat-value span { color: ${accent}; }
        .ao-stat-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.35);
          font-weight: 400;
          letter-spacing: 0.04em;
        }

        .ao-brand-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 64px;
          background: linear-gradient(to bottom, #07090f 60%, transparent);
          z-index: 10;
          pointer-events: none;
        }
      `}</style>

      {/* Atmosphere */}
      <div className="ao-grid" />
      <div className="ao-glow-tl" />
      <div className="ao-glow-br" />
      <div className="ao-scanline" />
      <div className="ao-brand-bar" />

      <div className="ao-content">

        {/* ── Hero ── */}
        <div className="ao-hero">
          <div className="ao-eyebrow">
            <div className="ao-eyebrow-dot" />
            {isInvestor ? "Investor Intelligence Platform" : "Investment Transparency Platform"}
          </div>
          <h1 className="ao-hero-title">
            Welcome to <span>AuditReady</span>
          </h1>
          <p className="ao-hero-sub">
            Empowering transparent, data-driven collaboration between startups and investors.
          </p>
          <div className="ao-hero-divider" />
        </div>

        {/* ── What We Offer ── */}
        <div className="ao-section-label" style={{ animationDelay: "0.05s" }}>
          <h2 className="ao-section-title">What We Offer</h2>
          <div className="ao-section-label-line" />
        </div>

        <div className="ao-features-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className={`ao-feature-card${f.badge ? " alt" : ""}`}
              style={{ animationDelay: `${0.08 + i * 0.05}s` }}
            >
              <div
                className="ao-feature-icon-wrap"
                style={{
                  background: f.badge
                    ? `rgba(${accentAltRgb},0.08)`
                    : `rgba(${accentRgb},0.07)`,
                }}
              >
                {f.icon}
              </div>
              <div className="ao-feature-name">{f.label}</div>
              {f.badge && <div className="ao-feature-badge">{f.badge}</div>}
              <div className="ao-feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* ── About ── */}
        <div className="ao-section-label" style={{ animationDelay: "0.15s" }}>
          <h2 className="ao-section-title">About AuditReady</h2>
          <div className="ao-section-label-line" />
        </div>

        <div className="ao-about">
          <div className="ao-about-body">
            <p>
              We are building an AI-powered investment transparency platform designed to bring
              clarity, trust, and data-driven insights into the startup–investor ecosystem.
            </p>
            <p>
              Our platform combines a secure cloud backend, interactive financial dashboards,
              and advanced analytics to transform raw transaction data into meaningful intelligence.
            </p>
            <p>
              Our long-term vision is to redefine investment transparency through intelligent
              automation and predictive financial insights — putting the right data in front of
              the right people at the right time.
            </p>
          </div>

          {/* Stats panel */}
          <div className="ao-stat-list">
            {[
              { value: "100", unit: "%", label: "Audit-Ready Compliance Tracking" },
              { value: "6",   unit: "+", label: "Advanced Visualization Types" },
              { value: "AI",  unit: "",  label: "Trend Forecasting — Coming Soon" },
              { value: "∞",   unit: "",  label: "Scalable Cloud Architecture" },
            ].map((s, i) => (
              <div className="ao-stat" key={i}>
                <div className="ao-stat-value">
                  {s.value}<span>{s.unit}</span>
                </div>
                <div className="ao-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutAndOffer;