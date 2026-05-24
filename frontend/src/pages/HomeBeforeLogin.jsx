// src/pages/HomeBeforeLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeBeforeLogin = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null); // 'startup' | 'investor' | null

  return (
    <div style={{ minHeight: "100vh", display: "flex", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Google Fonts + Global Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .ar-panel {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: default;
          transition: flex 0.65s cubic-bezier(0.77, 0, 0.175, 1);
          padding: 2rem;
        }

        .ar-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
        }

        .ar-scanline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none;
        }

        .ar-content {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          animation: fadeUp 0.8s ease both;
        }

        .ar-icon-ring {
          position: relative;
          width: 72px;
          height: 72px;
          margin-bottom: 1.75rem;
        }
        .ar-icon-ring::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px solid currentColor;
          opacity: 0.2;
          animation: pulse-ring 2.5s ease-out infinite;
        }

        .ar-role-title {
          font-family: 'DM Serif Display', serif;
          font-size: 2.6rem;
          color: white;
          margin-bottom: 0.6rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .ar-role-desc {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.42);
          max-width: 260px;
          line-height: 1.7;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }

        .ar-btns {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 200px;
        }

        .ar-btn {
          padding: 13px 0;
          border-radius: 3px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          transition: transform 0.2s ease, opacity 0.2s ease, background 0.2s ease;
          width: 100%;
        }
        .ar-btn:hover { transform: translateY(-2px); opacity: 0.9; }
        .ar-btn:active { transform: translateY(0); }

        .ar-btn-ghost {
          background: transparent;
          border-width: 1px;
          border-style: solid;
        }

        .ar-watermark {
          font-family: 'DM Serif Display', serif;
          font-size: 8rem;
          font-weight: 400;
          position: absolute;
          bottom: -1.5rem;
          opacity: 0.04;
          letter-spacing: 0.05em;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }

        .ar-bottom-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          pointer-events: none;
        }

        .ar-divider {
          width: 1px;
          flex-shrink: 0;
          position: relative;
          z-index: 10;
          background: linear-gradient(to bottom, transparent 5%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.12) 60%, transparent 95%);
        }

        .ar-or-badge {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #0d0d14;
          border: 1px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.3);
        }

        .ar-brand {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 1.75rem;
          pointer-events: none;
        }
        .ar-brand-name {
          font-family: 'DM Serif Display', serif;
          font-size: 1.35rem;
          color: rgba(255,255,255,0.9);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .ar-brand-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d4ff, #f59e0b);
        }

        @media (max-width: 768px) {
          .ar-panel {
            flex: none !important;
            min-height: 50vh;
            width: 100%;
          }
          .ar-divider {
            width: 100%;
            height: 1px;
            background: linear-gradient(to right, transparent 5%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.12) 60%, transparent 95%);
          }
          .ar-or-badge {
            top: 50%;
            left: 50%;
          }
          .ar-watermark { font-size: 4rem; }
          .ar-role-title { font-size: 2rem; }
          div[style*="display: flex"][style*="overflow: hidden"] {
            flex-direction: column !important;
          }
        }
      `}</style>

      {/* ── Brand Header ── */}
      <div className="ar-brand">
        <span className="ar-brand-name">AuditReady</span>
        <div className="ar-brand-dot" />
      </div>

      {/* ══════════════════════════════════════════
          LEFT PANEL — STARTUP  (teal / cyan)
      ══════════════════════════════════════════ */}
      <div
        className="ar-panel"
        style={{
          flex: hovered === "investor" ? 0.6 : 1,
          background: "#07090f",
        }}
        onMouseEnter={() => setHovered("startup")}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Depth glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(0,212,255,0.09), transparent)"
        }} />

        <div className="ar-grid" />
        <div className="ar-scanline" />
        <div className="ar-watermark" style={{ color: "#00d4ff" }}>STARTUP</div>

        <div className="ar-content" style={{ animationDelay: "0.1s" }}>

          {/* Icon */}
          <div className="ar-icon-ring" style={{ color: "#00d4ff" }}>
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <circle cx="36" cy="36" r="35" stroke="#00d4ff" strokeWidth="0.6" strokeDasharray="5 5" />
              <polygon points="36,18 50,44 22,44" stroke="#00d4ff" strokeWidth="1.5"
                fill="rgba(0,212,255,0.08)" strokeLinejoin="round" />
              <circle cx="36" cy="29" r="4" fill="#00d4ff" fillOpacity="0.9" />
              <line x1="22" y1="50" x2="50" y2="50" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.3" />
            </svg>
          </div>

          <h2 className="ar-role-title">Startup</h2>
          <p className="ar-role-desc">
            Manage compliance documents, track audit readiness, and showcase your startup to investors.
          </p>

          <div className="ar-btns">
            <button
              className="ar-btn"
              style={{ background: "#00d4ff", color: "#000" }}
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              className="ar-btn ar-btn-ghost"
              style={{ color: "#00d4ff", borderColor: "rgba(0,212,255,0.35)" }}
              onClick={() => navigate("/signup")}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="ar-bottom-bar"
          style={{ background: "linear-gradient(90deg, transparent, #00d4ff 50%, transparent)" }} />
      </div>

      {/* ── Divider ── */}
      <div className="ar-divider">
        <div className="ar-or-badge">OR</div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT PANEL — INVESTOR  (gold / amber)
      ══════════════════════════════════════════ */}
      <div
        className="ar-panel"
        style={{
          flex: hovered === "startup" ? 0.6 : 1,
          background: "#0d0906",
        }}
        onMouseEnter={() => setHovered("investor")}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Depth glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(245,158,11,0.08), transparent)"
        }} />

        <div className="ar-grid" />
        <div className="ar-scanline" style={{ animationDelay: "-4s" }} />
        <div className="ar-watermark" style={{ color: "#f59e0b" }}>INVESTOR</div>

        <div className="ar-content" style={{ animationDelay: "0.2s" }}>

          {/* Icon */}
          <div className="ar-icon-ring" style={{ color: "#f59e0b" }}>
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <circle cx="36" cy="36" r="35" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="5 5" />
              <polyline points="16,50 26,36 34,42 44,26 56,32"
                stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="44" cy="26" r="4" fill="#f59e0b" fillOpacity="0.9" />
              <line x1="16" y1="54" x2="56" y2="54" stroke="#f59e0b" strokeWidth="0.8" strokeOpacity="0.3" />
            </svg>
          </div>

          <h2 className="ar-role-title">Investor</h2>
          <p className="ar-role-desc">
            Explore audit-ready startup profiles, review key metrics, and make confident investment decisions.
          </p>

          <div className="ar-btns">
            <button
              className="ar-btn"
              style={{ background: "#f59e0b", color: "#000" }}
              onClick={() => navigate("/investor/login")}
            >
              Log In
            </button>
            <button
              className="ar-btn ar-btn-ghost"
              style={{ color: "#f59e0b", borderColor: "rgba(245,158,11,0.35)" }}
              onClick={() => navigate("/investor/signup")}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="ar-bottom-bar"
          style={{ background: "linear-gradient(90deg, transparent, #f59e0b 50%, transparent)" }} />
      </div>

    </div>
  );
};

export default HomeBeforeLogin;