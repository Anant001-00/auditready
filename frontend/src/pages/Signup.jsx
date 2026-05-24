// // src/pages/Signup.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../supabaseClient';

// const Signup = () => {
//   const [form, setForm] = useState({
//     startup_name: '',
//     founder_name: '',
//     email: '',
//     password: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     // 1️⃣ Create Supabase Auth user first
//     const { data: authData, error: signUpError } = await supabase.auth.signUp({
//       email: form.email,
//       password: form.password,
//     });

//     if (signUpError) {
//       setError('Auth signup failed: ' + signUpError.message);
//       setLoading(false);
//       return;
//     }

//     const userId = authData.user?.id;
//     if (!userId) {
//       setError('No user ID returned from auth.');
//       setLoading(false);
//       return;
//     }

//     // 2️⃣ Insert startup record linked to that user_id
//     const { error: insertError } = await supabase.from('startups').insert([
//       {
//         user_id: userId, // ✅ directly link to auth user
//         startup_name: form.startup_name,
//         founder_name: form.founder_name,
//         email: form.email,
//       },
//     ]);

//     if (insertError) {
//       setError('Failed to save startup info: ' + insertError.message);
//       setLoading(false);
//       return;
//     }

//     alert(
//       'Signup successful! Please check your email to confirm your account.'
//     );
//     setLoading(false);
//     navigate('/login');
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
//       <h2 className="text-2xl font-semibold mb-4">Startup Signup</h2>
//       {error && <p className="text-red-600 mb-4">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <div>
//           <label className="block">Startup Name</label>
//           <input
//             name="startup_name"
//             value={form.startup_name}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//             disabled={loading}
//           />
//         </div>
//         <div>
//           <label className="block">Founder Name</label>
//           <input
//             name="founder_name"
//             value={form.founder_name}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//             disabled={loading}
//           />
//         </div>
//         <div>
//           <label className="block">Email</label>
//           <input
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//             disabled={loading}
//           />
//         </div>
//         <div>
//           <label className="block">Password</label>
//           <input
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//             disabled={loading}
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-600 text-white p-2 rounded"
//         >
//           {loading ? 'Registering...' : 'Register'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;


// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Signup() {
  const [form, setForm] = useState({
    startup_name: "",
    founder_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data: authData, error: signUpError } =
      await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const userId = authData.user?.id;
    if (!userId) {
      setError("No user ID returned");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("startups")
      .insert([{
        user_id:       userId,
        startup_name:  form.startup_name,
        founder_name:  form.founder_name,
        email:         form.email,
      }]);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    alert("Signup successful! Please verify your email.");
    setLoading(false);
    navigate("/login");
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

        .sg-grid {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
        }
        .sg-scanline {
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,212,255,0.07), transparent);
          animation: scanline 10s linear infinite;
          pointer-events: none;
        }
        .sg-glow {
          position: fixed;
          width: 500px; height: 500px;
          border-radius: 50%;
          pointer-events: none;
        }

        /* ── Card ── */
        .sg-card {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 440px;
          background: #0b0d14;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
          animation: fadeUp 0.65s ease both;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.05);
        }
        .sg-top-bar {
          height: 2px;
          background: linear-gradient(90deg, transparent, #00d4ff 40%, #7dd3fc 60%, transparent);
        }
        .sg-body {
          padding: 2.25rem 2.25rem 2rem;
        }

        /* ── Header ── */
        .sg-role-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,212,255,0.7);
          margin-bottom: 1rem;
        }
        .sg-role-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #00d4ff;
        }
        .sg-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.9rem;
          color: white;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin-bottom: 0.4rem;
        }
        .sg-subtitle {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.35);
          font-weight: 300;
          margin-bottom: 2rem;
        }

        /* ── Two-column row ── */
        .sg-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
          margin-bottom: 0.85rem;
        }
        @media (max-width: 420px) {
          .sg-row { grid-template-columns: 1fr; }
        }

        /* ── Field ── */
        .sg-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 0.85rem;
        }
        .sg-field-last { margin-bottom: 0; }
        .sg-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
        }
        .sg-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 6px;
          padding: 10px 13px;
          font-size: 0.875rem;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          width: 100%;
        }
        .sg-input::placeholder { color: rgba(255,255,255,0.18); }
        .sg-input:focus {
          border-color: rgba(0,212,255,0.45);
          background: rgba(0,212,255,0.04);
          box-shadow: 0 0 0 3px rgba(0,212,255,0.08);
        }
        .sg-input:disabled { opacity: 0.45; cursor: not-allowed; }

        /* ── Error ── */
        .sg-error {
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

        /* ── Divider ── */
        .sg-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 1.5rem 0;
        }

        /* ── Button ── */
        .sg-btn {
          width: 100%;
          padding: 12px;
          border-radius: 6px;
          background: #00d4ff;
          color: #000;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          font-family: 'DM Sans', sans-serif;
          transition: opacity 0.2s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .sg-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .sg-btn:active:not(:disabled) { transform: translateY(0); }
        .sg-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .sg-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(0,0,0,0.25);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* ── Footer ── */
        .sg-footer {
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          text-align: center;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
        }
        .sg-link {
          color: #00d4ff;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.8rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          transition: opacity 0.2s;
        }
        .sg-link:hover { opacity: 0.75; }

        /* ── Brand ── */
        .sg-brand {
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
        .sg-brand-name {
          font-family: 'DM Serif Display', serif;
          font-size: 1.15rem;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .sg-brand-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d4ff, #f59e0b);
        }
      `}</style>

      {/* ── Atmosphere ── */}
      <div className="sg-grid" />
      <div className="sg-scanline" />
      <div className="sg-glow" style={{
        top: "-160px", left: "-160px",
        background: "radial-gradient(circle, rgba(0,212,255,0.08), transparent 70%)",
      }} />
      <div className="sg-glow" style={{
        bottom: "-160px", right: "-160px",
        background: "radial-gradient(circle, rgba(0,212,255,0.05), transparent 70%)",
      }} />

      {/* ── Brand ── */}
      <div className="sg-brand">
        <span className="sg-brand-name">AuditReady</span>
        <div className="sg-brand-dot" />
      </div>

      {/* ── Card ── */}
      <div className="sg-card">
        <div className="sg-top-bar" />
        <div className="sg-body">

          <div className="sg-role-tag">
            <div className="sg-role-dot" />
            Startup Portal
          </div>
          <h1 className="sg-title">Create your account</h1>
          <p className="sg-subtitle">Register your startup and start managing your growth.</p>

          {error && (
            <div className="sg-error">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
                <circle cx="7" cy="7" r="6.5" stroke="rgba(252,165,165,0.7)" strokeWidth="1" />
                <path d="M7 4v3.5M7 9.5v.5" stroke="rgba(252,165,165,0.9)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Row: Startup Name + Founder Name */}
            <div className="sg-row">
              <div className="sg-field" style={{ marginBottom: 0 }}>
                <label className="sg-label">Startup Name</label>
                <input
                  className="sg-input"
                  name="startup_name"
                  value={form.startup_name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Acme Inc."
                />
              </div>
              <div className="sg-field" style={{ marginBottom: 0 }}>
                <label className="sg-label">Founder Name</label>
                <input
                  className="sg-input"
                  name="founder_name"
                  value={form.founder_name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Jane Doe"
                />
              </div>
            </div>

            <div className="sg-divider" />

            {/* Email */}
            <div className="sg-field">
              <label className="sg-label">Email</label>
              <input
                className="sg-input"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="you@startup.com"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="sg-field sg-field-last">
              <label className="sg-label">Password</label>
              <input
                className="sg-input"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <button type="submit" className="sg-btn" disabled={loading}>
                {loading
                  ? <><div className="sg-spinner" /> Creating account…</>
                  : "Create Account"
                }
              </button>
            </div>

          </form>

          <div className="sg-footer">
            Already have an account?{" "}
            <button className="sg-link" onClick={() => navigate("/login")}>
              Sign in
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}