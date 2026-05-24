// src/pages/InvestorDashboard.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

/* ================= CUSTOM TOOLTIP ================= */
const GoldTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#0d0b08",
      border: "1px solid rgba(245,158,11,0.2)",
      borderRadius: "8px",
      padding: "10px 14px",
      fontSize: "0.78rem",
      fontFamily: "'DM Sans', sans-serif",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    }}>
      <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "5px", letterSpacing: "0.05em" }}>{label}</p>
      <p style={{ color: "#f59e0b", fontWeight: 600 }}>
        Balance: ₹{Number(payload[0]?.value ?? 0).toLocaleString()}
      </p>
    </div>
  );
};

/* ================= INVESTOR DASHBOARD ================= */
const InvestorDashboard = () => {
  const [investor,        setInvestor]        = useState(null);
  const [startups,        setStartups]        = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [chartData,       setChartData]       = useState([]);
  const [chartLoading,    setChartLoading]    = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: investorData, error: investorError } = await supabase
          .from("investors")
          .select("*")
          .eq("auth_id", user.id)
          .single();

        if (investorError) throw investorError;
        setInvestor(investorData);

        const { data: startupData, error: startupError } = await supabase
          .from("startups")
          .select("*")
          .order("created_at", { ascending: false });

        if (startupError) throw startupError;
        setStartups(startupData || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔹 Fetch transactions for selected startup
  const fetchGrowthData = async (startupId, startupName) => {
    setChartLoading(true);
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("date, balance")
        .eq("startup_id", startupId)
        .order("date", { ascending: true });

      if (error) throw error;

      const formattedData = data.map((item) => ({
        date:    new Date(item.date).toLocaleDateString(),
        balance: item.balance,
      }));

      setChartData(formattedData);
      setSelectedStartup(startupName);
    } catch (err) {
      console.error("Error fetching growth data:", err);
    } finally {
      setChartLoading(false);
    }
  };

  /* ── Shared recharts styling ── */
  const axisStyle = { fill: "rgba(255,255,255,0.28)", fontSize: 11, fontFamily: "'DM Sans', sans-serif" };
  const gridProps = { stroke: "rgba(255,255,255,0.05)", strokeDasharray: "4 4" };

  /* ── Full-page states ── */
  if (loading) return (
    <div style={{
      minHeight: "100vh", background: "#07090f",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          border: "2px solid rgba(245,158,11,0.15)",
          borderTopColor: "#f59e0b",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 1rem",
        }} />
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", letterSpacing: "0.08em" }}>
          Loading dashboard…
        </p>
      </div>
    </div>
  );

  if (!investor) return (
    <div style={{
      minHeight: "100vh", background: "#07090f",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)",
      fontSize: "0.9rem",
    }}>
      No investor data found.
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "#07090f",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflowX: "hidden",
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
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-dot {
          0%,100% { opacity:0.5; transform:scale(1); }
          50%      { opacity:1;   transform:scale(1.35); }
        }

        .id-grid {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none; z-index: 0;
        }
        .id-scanline {
          position: fixed; top:0; left:0; right:0; height:2px;
          background: linear-gradient(90deg, transparent, rgba(245,158,11,0.06), transparent);
          animation: scanline 10s linear infinite;
          pointer-events: none; z-index: 1;
        }
        .id-glow-tr {
          position: fixed; top:-140px; right:-140px;
          width:480px; height:480px; border-radius:50%;
          background: radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .id-glow-bl {
          position: fixed; bottom:-140px; left:-140px;
          width:480px; height:480px; border-radius:50%;
          background: radial-gradient(circle, rgba(245,158,11,0.05), transparent 70%);
          pointer-events: none; z-index: 0;
        }

        /* ── Layout ── */
        .id-wrap {
          position: relative; z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 5rem;
        }

        /* ── Header ── */
        .id-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2.5rem;
          animation: fadeUp 0.6s ease both;
        }
        .id-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(245,158,11,0.75); margin-bottom: 0.5rem;
        }
        .id-eyebrow-dot {
          width:5px; height:5px; border-radius:50%;
          background:#f59e0b;
          animation: pulse-dot 2s ease infinite;
        }
        .id-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.75rem, 3vw, 2.4rem);
          color: white; letter-spacing: -0.025em; line-height: 1.1;
        }
        .id-title span { color: #f59e0b; }
        .id-investor-badge {
          display: flex; align-items: center; gap: 8px;
          padding: 7px 14px;
          border: 1px solid rgba(245,158,11,0.2);
          border-radius: 20px;
          background: rgba(245,158,11,0.05);
          font-size: 0.78rem;
          color: rgba(245,158,11,0.8);
          font-weight: 500;
          white-space: nowrap;
        }
        .id-investor-avatar {
          width: 22px; height: 22px; border-radius: 50%;
          background: rgba(245,158,11,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem; font-weight: 700; color: #f59e0b;
          text-transform: uppercase; flex-shrink: 0;
        }

        /* ── Welcome strip ── */
        .id-welcome {
          background: #0d0b08;
          border: 1px solid rgba(245,158,11,0.1);
          border-left: 3px solid #f59e0b;
          border-radius: 12px;
          padding: 1.25rem 1.75rem;
          margin-bottom: 2.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.05s;
        }
        .id-welcome-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(245,158,11,0.08);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .id-welcome-name {
          font-family: 'DM Serif Display', serif;
          font-size: 1.1rem; color: white; letter-spacing: -0.01em;
        }
        .id-welcome-sub {
          font-size: 0.8rem; color: rgba(255,255,255,0.35);
          font-weight: 300; margin-top: 2px;
        }

        /* ── Section label ── */
        .id-section-label {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 1.25rem;
        }
        .id-section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.3rem; color: white;
          letter-spacing: -0.02em; white-space: nowrap;
        }
        .id-section-line {
          flex:1; height:1px;
          background: linear-gradient(to right, rgba(255,255,255,0.07), transparent);
        }

        /* ── Stats row ── */
        .id-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 2.5rem;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.08s;
        }
        @media(max-width:640px){ .id-stats { grid-template-columns: 1fr; } }

        .id-stat {
          background: #07090f;
          padding: 1.4rem 1.75rem;
          display: flex; flex-direction: column; gap: 5px;
          transition: background 0.25s;
        }
        .id-stat:hover { background: rgba(245,158,11,0.03); }
        .id-stat-label {
          font-size: 0.67rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.28);
        }
        .id-stat-value {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem; color: white; line-height: 1;
        }
        .id-stat-value span { color: #f59e0b; }
        .id-stat-sub {
          font-size: 0.71rem; color: rgba(255,255,255,0.25); font-weight: 300;
        }

        /* ── Startups Table ── */
        .id-table-wrap {
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 2.5rem;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.12s;
        }
        .id-table-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.1rem 1.5rem;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .id-table-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.1rem; color: white; letter-spacing: -0.01em;
        }
        .id-table-badge {
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(245,158,11,0.7);
          background: rgba(245,158,11,0.06);
          border: 1px solid rgba(245,158,11,0.15);
          border-radius: 20px; padding: 3px 10px;
        }
        .id-table { width: 100%; border-collapse: collapse; }
        .id-table thead tr {
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .id-table th {
          padding: 10px 16px;
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.28); text-align: left; white-space: nowrap;
        }
        .id-table tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s; cursor: default;
        }
        .id-table tbody tr:last-child { border-bottom: none; }
        .id-table tbody tr:hover { background: rgba(245,158,11,0.02); }
        .id-table td {
          padding: 12px 16px;
          font-size: 0.82rem; color: rgba(255,255,255,0.5); font-weight: 400;
        }
        .id-table td.startup-name {
          color: #f59e0b; font-weight: 600; cursor: pointer;
          transition: opacity 0.15s;
        }
        .id-table td.startup-name:hover { opacity: 0.75; text-decoration: underline; text-underline-offset: 3px; }
        .id-table td.founder { color: rgba(255,255,255,0.7); font-weight: 500; }

        /* ── View Chart hint pill ── */
        .id-view-pill {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(245,158,11,0.55);
          border: 1px solid rgba(245,158,11,0.12);
          border-radius: 10px; padding: 2px 8px;
          margin-left: 8px; vertical-align: middle;
        }

        /* ── Chart card ── */
        .id-chart-card {
          background: #0d0b08;
          border: 1px solid rgba(245,158,11,0.1);
          border-radius: 14px;
          overflow: hidden;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.18s;
        }
        .id-chart-top-bar {
          height: 2px;
          background: linear-gradient(90deg, transparent, #f59e0b 40%, #fcd34d 60%, transparent);
        }
        .id-chart-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 1.5rem 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          flex-wrap: wrap; gap: 0.75rem;
        }
        .id-chart-head-left {
          display: flex; align-items: center; gap: 10px;
        }
        .id-chart-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(245,158,11,0.08);
          display: flex; align-items: center; justify-content: center;
        }
        .id-chart-name {
          font-size: 0.9rem; font-weight: 600; color: white; letter-spacing: -0.01em;
        }
        .id-chart-sub {
          font-size: 0.72rem; color: rgba(245,158,11,0.65);
          font-weight: 500; margin-top: 1px;
        }
        .id-chart-close {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          padding: 5px 10px;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .id-chart-close:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); }
        .id-chart-body { padding: 1.5rem 0.5rem 1.25rem; }

        /* ── Empty / no-data states ── */
        .id-empty {
          text-align: center; padding: 3rem;
          color: rgba(255,255,255,0.25); font-size: 0.85rem;
        }

        /* ── Chart spinner ── */
        .id-chart-spinner {
          display: flex; align-items: center; justify-content: center;
          height: 200px; gap: 0.75rem;
        }
        .id-spin {
          width: 22px; height: 22px;
          border: 2px solid rgba(245,158,11,0.15);
          border-top-color: #f59e0b;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .recharts-legend-item-text { color: rgba(255,255,255,0.45) !important; font-size: 0.75rem !important; }
      `}</style>

      {/* ── Atmosphere ── */}
      <div className="id-grid" />
      <div className="id-scanline" />
      <div className="id-glow-tr" />
      <div className="id-glow-bl" />

      <div className="id-wrap">

        {/* ── Header ── */}
        <div className="id-header">
          <div>
            <div className="id-eyebrow">
              <div className="id-eyebrow-dot" />
              Investor Portal
            </div>
            <h1 className="id-title">
              Investor <span>Dashboard</span>
            </h1>
          </div>
          <div className="id-investor-badge">
            <div className="id-investor-avatar">
              {(investor.name || investor.email || "I")[0].toUpperCase()}
            </div>
            {investor.name || investor.email}
          </div>
        </div>

        {/* ── Welcome strip ── */}
        <div className="id-welcome">
          <div className="id-welcome-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <polyline points="3,15 7,9 10,12 14,6 17,8"
                stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="14" cy="6" r="2.5" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="1.2"/>
            </svg>
          </div>
          <div>
            <div className="id-welcome-name">Welcome back, {investor.name || "Investor"}</div>
            <div className="id-welcome-sub">Explore and track promising startups on the platform.</div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="id-stats">
          <div className="id-stat">
            <div className="id-stat-label">Total Startups</div>
            <div className="id-stat-value">{startups.length}<span>+</span></div>
            <div className="id-stat-sub">Listed on AuditReady</div>
          </div>
          <div className="id-stat">
            <div className="id-stat-label">Viewing</div>
            <div className="id-stat-value" style={{ fontSize: "1.4rem", paddingTop: "4px" }}>
              {selectedStartup
                ? <span style={{ fontSize: "1.1rem" }}>{selectedStartup}</span>
                : <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "1rem" }}>None selected</span>}
            </div>
            <div className="id-stat-sub">Click a startup name to view its chart</div>
          </div>
          <div className="id-stat">
            <div className="id-stat-label">Chart Data Points</div>
            <div className="id-stat-value">{chartData.length}<span>{chartData.length > 0 ? "" : ""}</span></div>
            <div className="id-stat-sub">{chartData.length > 0 ? "Balance records loaded" : "Select a startup to load"}</div>
          </div>
        </div>

        {/* ── Startups Table ── */}
        <div className="id-section-label">
          <h2 className="id-section-title">Current Startups</h2>
          <div className="id-section-line" />
        </div>

        <div className="id-table-wrap">
          <div className="id-table-header">
            <span className="id-table-title">Registered Startups</span>
            <span className="id-table-badge">{startups.length} startups</span>
          </div>

          {startups.length === 0 ? (
            <div className="id-empty">No startups available.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="id-table">
                <thead>
                  <tr>
                    <th>Startup Name</th>
                    <th>Founder</th>
                    <th>Email</th>
                    <th>Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {startups.map((startup) => (
                    <tr key={startup.id}>
                      <td
                        className="startup-name"
                        onClick={() => fetchGrowthData(startup.id, startup.startup_name)}
                      >
                        {startup.startup_name}
                        <span className="id-view-pill">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <polyline points="1,4 3.5,6.5 7,1.5" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          View
                        </span>
                      </td>
                      <td className="founder">{startup.founder_name}</td>
                      <td>{startup.email}</td>
                      <td>{new Date(startup.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Growth Chart ── */}
        {selectedStartup && (
          <>
            <div className="id-section-label">
              <h2 className="id-section-title">Growth Chart</h2>
              <div className="id-section-line" />
            </div>

            <div className="id-chart-card">
              <div className="id-chart-top-bar" />
              <div className="id-chart-head">
                <div className="id-chart-head-left">
                  <div className="id-chart-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <polyline points="2,14 5,8 9,11 13,5 16,7"
                        stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      <circle cx="13" cy="5" r="2" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1.2"/>
                    </svg>
                  </div>
                  <div>
                    <div className="id-chart-name">{selectedStartup}</div>
                    <div className="id-chart-sub">Balance over time · {chartData.length} data points</div>
                  </div>
                </div>
                <button className="id-chart-close" onClick={() => { setSelectedStartup(null); setChartData([]); }}>
                  Close
                </button>
              </div>

              <div className="id-chart-body">
                {chartLoading ? (
                  <div className="id-chart-spinner">
                    <div className="id-spin" />
                    <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>Loading chart data…</span>
                  </div>
                ) : chartData.length === 0 ? (
                  <div className="id-empty">No transaction data available for this startup.</div>
                ) : (
                  <ResponsiveContainer width="100%" height={380}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid {...gridProps} />
                      <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
                      <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                      <Tooltip content={<GoldTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="balance"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        fill="url(#goldGrad)"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default InvestorDashboard;