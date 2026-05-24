// src/pages/InvestorLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const InvestorLogin = () => {
  const [form, setForm]       = useState({ email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1️⃣ Sign in
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      const user = signInData.user;

      // 2️⃣ Check if investor record exists
      const { data: investor, error: fetchError } = await supabase
        .from("investors")
        .select("*")
        .eq("auth_id", user.id)
        .maybeSingle();

      if (fetchError) {
        setError(fetchError.message);
        return;
      }

      // 3️⃣ If not exists → create it
      if (!investor) {
        const { error: insertError } = await supabase
          .from("investors")
          .insert([{
            auth_id: user.id,
            email:   user.email,
            name:    user.email.split("@")[0],
          }]);

        if (insertError) {
          setError(insertError.message);
          return;
        }
      }

      navigate("/home");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#07090f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
      padding: "1.5rem",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .il-grid {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
        }
        .il-scanline {
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(245,158,11,0.07), transparent);
          animation: scanline 10s linear infinite;
          pointer-events: none;
        }
        .il-glow {
          position: fixed;
          width: 500px; height: 500px;
          border-radius: 50%;
          pointer-events: none;
        }

        /* ── Card ── */
        .il-card {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 420px;
          background: #0d0b08;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
          animation: fadeUp 0.65s ease both;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.05);
        }
        .il-top-bar {
          height: 2px;
          background: linear-gradient(90deg, transparent, #f59e0b 40%, #fcd34d 60%, transparent);
        }
        .il-body {
          padding: 2.5rem 2.25rem 2.25rem;
        }

        /* ── Header ── */
        .il-role-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,158,11,0.75);
          margin-bottom: 1.1rem;
        }
        .il-role-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #f59e0b;
        }
        .il-title {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          color: white;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }
        .il-subtitle {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.35);
          font-weight: 300;
          margin-bottom: 2.25rem;
        }

        /* ── Fields ── */
        .il-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 1.1rem;
        }
        .il-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
        }
        .il-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 6px;
          padding: 11px 14px;
          font-size: 0.875rem;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          width: 100%;
        }
        .il-input::placeholder { color: rgba(255,255,255,0.18); }
        .il-input:focus {
          border-color: rgba(245,158,11,0.5);
          background: rgba(245,158,11,0.04);
          box-shadow: 0 0 0 3px rgba(245,158,11,0.08);
        }
        .il-input:disabled { opacity: 0.45; cursor: not-allowed; }

        /* ── Error ── */
        .il-error {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 6px;
          padding: 10px 12px;
          margin-bottom: 1.25rem;
          font-size: 0.78rem;
          color: rgba(252,165,165,0.9);
          line-height: 1.5;
        }

        /* ── Button ── */
        .il-btn {
          width: 100%;
          padding: 12px;
          border-radius: 6px;
          background: #f59e0b;
          color: #000;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          font-family: 'DM Sans', sans-serif;
          margin-top: 0.5rem;
          transition: opacity 0.2s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .il-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .il-btn:active:not(:disabled) { transform: translateY(0); }
        .il-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .il-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(0,0,0,0.25);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* ── Footer ── */
        .il-footer {
          margin-top: 1.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          text-align: center;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
        }
        .il-link {
          color: #f59e0b;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.8rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          transition: opacity 0.2s;
        }
        .il-link:hover { opacity: 0.75; }

        /* ── Brand ── */
        .il-brand {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 1.5rem;
          pointer-events: none;
        }
        .il-brand-name {
          font-family: 'DM Serif Display', serif;
          font-size: 1.15rem;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .il-brand-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d4ff, #f59e0b);
        }
      `}</style>

      {/* ── Atmosphere ── */}
      <div className="il-grid" />
      <div className="il-scanline" />
      <div className="il-glow" style={{
        top: "-160px", right: "-160px",
        background: "radial-gradient(circle, rgba(245,158,11,0.09), transparent 70%)",
      }} />
      <div className="il-glow" style={{
        bottom: "-160px", left: "-160px",
        background: "radial-gradient(circle, rgba(245,158,11,0.05), transparent 70%)",
      }} />

      {/* ── Brand ── */}
      <div className="il-brand">
        <span className="il-brand-name">AuditReady</span>
        <div className="il-brand-dot" />
      </div>

      {/* ── Card ── */}
      <div className="il-card">
        <div className="il-top-bar" />
        <div className="il-body">

          <div className="il-role-tag">
            <div className="il-role-dot" />
            Investor Portal
          </div>
          <h1 className="il-title">Welcome back</h1>
          <p className="il-subtitle">Sign in to your investor account to continue.</p>

          {error && (
            <div className="il-error">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
                <circle cx="7" cy="7" r="6.5" stroke="rgba(252,165,165,0.7)" strokeWidth="1" />
                <path d="M7 4v3.5M7 9.5v.5" stroke="rgba(252,165,165,0.9)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="il-field">
              <label className="il-label">Email</label>
              <input
                className="il-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="investor@example.com"
                autoComplete="email"
              />
            </div>

            <div className="il-field">
              <label className="il-label">Password</label>
              <input
                className="il-input"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="il-btn" disabled={loading}>
              {loading
                ? <><div className="il-spinner" /> Signing in…</>
                : "Sign In"
              }
            </button>
          </form>

          <div className="il-footer">
            Don't have an account?{" "}
            <button className="il-link" onClick={() => navigate("/investor/signup")}>
              Create one
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InvestorLogin;