// // src/pages/Login.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../supabaseClient';

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     // Sign in with Supabase Auth
//     const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
//       email: form.email,
//       password: form.password,
//     });

//     if (signInError) {
//       setError(signInError.message);
//       setLoading(false);
//       return;
//     }

//     const user = signInData.user;

//     // Check if startup record exists by email
//     const { data: startup, error: startupError } = await supabase
//       .from('startups')
//       .select('*')
//       .eq('email', user.email)
//       .single();

//     if (startupError || !startup) {
//       setError('No startup record found for this user. Please sign up first.');
//       setLoading(false);
//       return;
//     }

//     navigate('/dashboard');
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-8">
//         <h1 className="text-2xl font-medium mb-6 text-center">Login to AuditReady</h1>
//         {error && <p className="text-red-600 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div className="flex flex-col">
//             <label htmlFor="email" className="text-sm font-semibold mb-1">Email</label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               placeholder="you@startup.com"
//               disabled={loading}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="password" className="text-sm font-semibold mb-1">Password</label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               placeholder="••••••••"
//               disabled={loading}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//         <div className="mt-4 text-center text-sm text-gray-500">
//           Don't have an account?{' '}
//           <button
//             onClick={() => navigate('/signup')}
//             className="text-blue-600 hover:underline"
//           >
//             Sign up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// src/pages/Login.jsx
// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Login = () => {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    const user = signInData.user;

    const { data: startup, error: startupError } = await supabase
      .from('startups')
      .select('*')
      .eq('email', user.email)
      .single();

    if (startupError || !startup) {
      setError('No startup record found for this user. Please sign up first.');
      setLoading(false);
      return;
    }

    navigate('/home');
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#07090f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      padding: '1.5rem',
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

        .lg-grid {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
        }
        .lg-scanline {
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,212,255,0.07), transparent);
          animation: scanline 10s linear infinite;
          pointer-events: none;
        }
        .lg-glow {
          position: fixed;
          width: 500px; height: 500px;
          border-radius: 50%;
          pointer-events: none;
        }

        .lg-card {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 420px;
          background: #0b0d14;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
          animation: fadeUp 0.65s ease both;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.05);
        }

        .lg-card-top-bar {
          height: 2px;
          background: linear-gradient(90deg, transparent, #00d4ff 40%, #7dd3fc 60%, transparent);
        }

        .lg-card-body {
          padding: 2.5rem 2.25rem 2.25rem;
        }

        .lg-role-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,212,255,0.7);
          margin-bottom: 1.1rem;
        }
        .lg-role-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #00d4ff;
        }

        .lg-title {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          color: white;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }
        .lg-subtitle {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.35);
          font-weight: 300;
          margin-bottom: 2.25rem;
        }

        .lg-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 1.1rem;
        }
        .lg-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .lg-input {
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
        .lg-input::placeholder { color: rgba(255,255,255,0.2); }
        .lg-input:focus {
          border-color: rgba(0,212,255,0.45);
          background: rgba(0,212,255,0.04);
          box-shadow: 0 0 0 3px rgba(0,212,255,0.08);
        }
        .lg-input:disabled { opacity: 0.5; cursor: not-allowed; }

        .lg-error {
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
          font-weight: 400;
        }

        .lg-btn {
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
          margin-top: 0.5rem;
          transition: opacity 0.2s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .lg-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .lg-btn:active:not(:disabled) { transform: translateY(0); }
        .lg-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .lg-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .lg-footer {
          margin-top: 1.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          text-align: center;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
        }
        .lg-link {
          color: #00d4ff;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.8rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .lg-link:hover { opacity: 0.75; }

        .lg-brand {
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
        .lg-brand-name {
          font-family: 'DM Serif Display', serif;
          font-size: 1.15rem;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .lg-brand-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d4ff, #f59e0b);
        }
      `}</style>

      {/* Atmosphere */}
      <div className="lg-grid" />
      <div className="lg-scanline" />
      <div className="lg-glow" style={{
        top: '-160px', left: '-160px',
        background: 'radial-gradient(circle, rgba(0,212,255,0.08), transparent 70%)',
      }} />
      <div className="lg-glow" style={{
        bottom: '-160px', right: '-160px',
        background: 'radial-gradient(circle, rgba(0,212,255,0.05), transparent 70%)',
      }} />

      {/* Brand */}
      <div className="lg-brand">
        <span className="lg-brand-name">AuditReady</span>
        <div className="lg-brand-dot" />
      </div>

      {/* Card */}
      <div className="lg-card">
        <div className="lg-card-top-bar" />
        <div className="lg-card-body">

          <div className="lg-role-tag">
            <div className="lg-role-dot" />
            Startup Portal
          </div>

          <h1 className="lg-title">Welcome back</h1>
          <p className="lg-subtitle">Sign in to your startup account to continue.</p>

          {error && (
            <div className="lg-error">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
                <circle cx="7" cy="7" r="6.5" stroke="rgba(252,165,165,0.7)" strokeWidth="1"/>
                <path d="M7 4v3.5M7 9.5v.5" stroke="rgba(252,165,165,0.9)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="lg-field">
              <label className="lg-label">Email</label>
              <input
                className="lg-input"
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

            <div className="lg-field">
              <label className="lg-label">Password</label>
              <input
                className="lg-input"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="lg-btn" disabled={loading}>
              {loading
                ? <><div className="lg-spinner" /> Signing in…</>
                : 'Sign In'
              }
            </button>
          </form>

          <div className="lg-footer">
            Don't have an account?{' '}
            <button className="lg-link" onClick={() => navigate('/signup')}>
              Create one
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;