// // src/pages/Dashboard.jsx
// import React, { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import {
//   Tooltip,
//   Legend,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   LineChart,
//   Line,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   ScatterChart,
//   Scatter,
// } from "recharts";

// // ✅ Supabase client
// const supabaseUrl = "https://ttjorlieygyiqsjynsjy.supabase.co";
// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0am9ybGlleWd5aXFzanluc2p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjQ4MTYsImV4cCI6MjA2OTY0MDgxNn0.JFKUIND5m7RtYLHStWqXoI6bM60UxSPIsfdBakVWWCA";

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export default function Dashboard() {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Filters
//   const [filterType, setFilterType] = useState("all");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from("transactions")
//         .select("*")
//         .order("date", { ascending: true });

//       if (error) {
//         console.error("Error fetching transactions:", error.message);
//       } else {
//         setTransactions(data);
//       }
//       setLoading(false);
//     };
//     fetchTransactions();
//   }, []);

//   // ✅ Apply filters
//   const filteredTransactions = transactions.filter((t) => {
//     const tDate = new Date(t.date);
//     const matchesType = filterType === "all" || t.type === filterType;
//     const matchesStart = startDate ? tDate >= new Date(startDate) : true;
//     const matchesEnd = endDate ? tDate <= new Date(endDate) : true;
//     return matchesType && matchesStart && matchesEnd;
//   });

//   // ✅ Summary data
//   const credits = filteredTransactions
//     .filter((t) => t.type === "credit")
//     .reduce((sum, t) => sum + Number(t.amount), 0);

//   const debits = filteredTransactions
//     .filter((t) => t.type === "debit")
//     .reduce((sum, t) => sum + Number(t.amount), 0);

//   // ✅ Cashflow by date
//   const cashflowData = Object.values(
//     filteredTransactions.reduce((acc, t) => {
//       const d = new Date(t.date).toLocaleDateString();
//       if (!acc[d]) acc[d] = { date: d, credit: 0, debit: 0 };
//       if (t.type === "credit") acc[d].credit += Number(t.amount);
//       else acc[d].debit += Number(t.amount);
//       return acc;
//     }, {})
//   );

//   // ✅ Balance Trend (Area chart)
//   const balanceTrend = filteredTransactions.map((t) => ({
//     date: new Date(t.date).toLocaleDateString(),
//     balance: Number(t.balance ?? 0),
//   }));

//   // ✅ Scatter Data
//   const scatterData = filteredTransactions.map((t) => ({
//     date: new Date(t.date).toLocaleDateString(),
//     amount: Number(t.amount),
//     type: t.type,
//   }));

//   // ✅ Heatmap-style data (frequency of transactions per day)
//   const heatmapData = Object.values(
//     filteredTransactions.reduce((acc, t) => {
//       const d = new Date(t.date).toLocaleDateString();
//       if (!acc[d]) acc[d] = { date: d, count: 0 };
//       acc[d].count += 1;
//       return acc;
//     }, {})
//   );

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow mt-6">
//       <div className="max-w-7xl mx-auto p-8 rounded-2xl glass-dark shadow-2xl">
//       <h2 className="text-4xl font-extrabold mb-8 text-white drop-shadow-lg">
//         📊 Startup Finance Dashboard 
//       </h2> 


//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 mb-6">
//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//           className="border px-3 py-2 rounded"
//         >
//           <option value="all">All</option>
//           <option value="credit">Credits</option>
//           <option value="debit">Debits</option>
//         </select>
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="border px-3 py-2 rounded"
//         />
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="border px-3 py-2 rounded"
//         />
//       </div>

//       {loading ? (
//         <p>Loading transactions...</p>
//       ) : filteredTransactions.length === 0 ? (
//         <p>No transactions found.</p>
//       ) : (
//         <div className="space-y-12">
//           {/* ✅ Transaction Table */}
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-300 px-3 py-2 text-left">
//                   Date
//                 </th>
//                 <th className="border border-gray-300 px-3 py-2 text-left">
//                   Category
//                 </th>
//                 <th className="border border-gray-300 px-3 py-2 text-right">
//                   Amount
//                 </th>
//                 <th className="border border-gray-300 px-3 py-2 text-center">
//                   Type
//                 </th>
//                 <th className="border border-gray-300 px-3 py-2 text-right">
//                   Balance
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTransactions.map((tx) => (
//                 <tr key={tx.id} className="hover:bg-gray-50">
//                   <td className="border border-gray-300 px-3 py-2">
//                     {new Date(tx.date).toLocaleString()}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-2">
//                     {tx.category || "-"}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-2 text-right">
//                     ₹{tx.amount}
//                   </td>
//                   <td
//                     className={`border border-gray-300 px-3 py-2 text-center ${
//                       tx.type === "credit" ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {tx.type}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-2 text-right">
//                     {tx.balance !== null ? `₹${tx.balance}` : "-"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* ✅ Summary */}
//           <div>
//             <h3 className="text-xl font-semibold mb-2">💡 Summary</h3>
//             <p>
//               Total Credits:{" "}
//               <strong className="text-green-600">₹{credits}</strong>
//             </p>
//             <p>
//               Total Debits:{" "}
//               <strong className="text-red-600">₹{debits}</strong>
//             </p>
//             <p>
//               Net Balance Change: <strong>₹{credits - debits}</strong>
//             </p>
//           </div>

//           {/* ✅ Visualizations */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//             {/* Line Chart: Cashflow Trend */}
//             <div className="p-4 border rounded shadow-sm">
//               <h3 className="text-lg font-semibold mb-4">📈 Cashflow Trend</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={cashflowData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="credit" stroke="#4CAF50" />
//                   <Line type="monotone" dataKey="debit" stroke="#F44336" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Bar Chart: Daily Credits vs Debits */}
//             <div className="p-4 border rounded shadow-sm md:col-span-2">
//               <h3 className="text-lg font-semibold mb-4">
//                 📊 Daily Credits vs Debits
//               </h3>
//               <ResponsiveContainer width="100%" height={350}>
//                 <BarChart data={cashflowData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="credit" fill="#4CAF50" />
//                   <Bar dataKey="debit" fill="#F44336" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Area Chart: Balance Trend */}
//             <div className="p-4 border rounded shadow-sm md:col-span-2">
//               <h3 className="text-lg font-semibold mb-4">📉 Balance Trend</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <AreaChart data={balanceTrend}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Area
//                     type="monotone"
//                     dataKey="balance"
//                     stroke="#8884d8"
//                     fill="#8884d8"
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Scatter Plot */}
//             <div className="p-4 border rounded shadow-sm">
//               <h3 className="text-lg font-semibold mb-4">
//                 📍 Transactions Scatter
//               </h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <ScatterChart>
//                   <CartesianGrid />
//                   <XAxis dataKey="date" name="Date" />
//                   <YAxis dataKey="amount" name="Amount" />
//                   <Tooltip cursor={{ strokeDasharray: "3 3" }} />
//                   <Legend />
//                   <Scatter
//                     name="Credits"
//                     data={scatterData.filter((d) => d.type === "credit")}
//                     fill="#00C49F"
//                   />
//                   <Scatter
//                     name="Debits"
//                     data={scatterData.filter((d) => d.type === "debit")}
//                     fill="#FF8042"
//                   />
//                 </ScatterChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Heatmap-style Calendar */}
//             <div className="p-4 border rounded shadow-sm md:col-span-2">
//               <h3 className="text-lg font-semibold mb-4">
//                 🔥 Transaction Frequency Heatmap
//               </h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={heatmapData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#a855f7" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       )}
//       </div>
//     </div>
//   );
// }


// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
} from "recharts";

/* ================= SUPABASE (UNCHANGED) ================= */
const supabaseUrl = "https://ttjorlieygyiqsjynsjy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0am9ybGlleWd5aXFzanluc2p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjQ4MTYsImV4cCI6MjA2OTY0MDgxNn0.JFKUIND5m7RtYLHStWqXoI6bM60UxSPIsfdBakVWWCA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ================= 3D WRAPPER (UNCHANGED LOGIC) ================= */
function ThreeDWrapper({ children }) {
  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -4;
    const rotateY = ((x / rect.width) - 0.5) * 4;
    e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  const reset = (e) => {
    e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
  };
  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="transform-gpu transition-transform duration-200"
    >
      {children}
    </div>
  );
}

/* ================= CUSTOM TOOLTIP ================= */
const DarkTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#0b0d14",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "8px",
      padding: "10px 14px",
      fontSize: "0.78rem",
      fontFamily: "'DM Sans', sans-serif",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    }}>
      <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: "6px", letterSpacing: "0.05em" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontWeight: 600, margin: "2px 0" }}>
          {p.name}: ₹{Number(p.value).toLocaleString()}
        </p>
      ))}
    </div>
  );
};

const CountTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#0b0d14",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "8px",
      padding: "10px 14px",
      fontSize: "0.78rem",
      fontFamily: "'DM Sans', sans-serif",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    }}>
      <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: "6px" }}>{label}</p>
      <p style={{ color: "#00d4ff", fontWeight: 600 }}>Transactions: {payload[0]?.value}</p>
    </div>
  );
};

/* ================= DASHBOARD ================= */
export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [filterType, setFilterType]     = useState("all");
  const [startDate, setStartDate]       = useState("");
  const [endDate, setEndDate]           = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("date", { ascending: true });
      if (!error) setTransactions(data);
      setLoading(false);
    };
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((t) => {
    const tDate = new Date(t.date);
    return (
      (filterType === "all" || t.type === filterType) &&
      (!startDate || tDate >= new Date(startDate)) &&
      (!endDate   || tDate <= new Date(endDate))
    );
  });

  const credits = filteredTransactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const debits = filteredTransactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const cashflowData = Object.values(
    filteredTransactions.reduce((acc, t) => {
      const d = new Date(t.date).toLocaleDateString();
      if (!acc[d]) acc[d] = { date: d, credit: 0, debit: 0 };
      t.type === "credit"
        ? (acc[d].credit += Number(t.amount))
        : (acc[d].debit  += Number(t.amount));
      return acc;
    }, {})
  );

  const balanceTrend = filteredTransactions.map((t) => ({
    date:    new Date(t.date).toLocaleDateString(),
    balance: Number(t.balance ?? 0),
  }));

  const scatterData = filteredTransactions.map((t) => ({
    date:   new Date(t.date).toLocaleDateString(),
    amount: Number(t.amount),
    type:   t.type,
  }));

  const heatmapData = Object.values(
    filteredTransactions.reduce((acc, t) => {
      const d = new Date(t.date).toLocaleDateString();
      if (!acc[d]) acc[d] = { date: d, count: 0 };
      acc[d].count += 1;
      return acc;
    }, {})
  );

  /* ── Recharts shared axis/grid props ── */
  const axisStyle  = { fill: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "'DM Sans', sans-serif" };
  const gridProps  = { stroke: "rgba(255,255,255,0.05)", strokeDasharray: "4 4" };
  const legendStyle = { fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" };

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
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-dot {
          0%,100% { opacity:0.5; transform:scale(1); }
          50%      { opacity:1;   transform:scale(1.3); }
        }

        .db-grid {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none; z-index: 0;
        }
        .db-scanline {
          position: fixed; top:0; left:0; right:0; height:2px;
          background: linear-gradient(90deg, transparent, rgba(0,212,255,0.06), transparent);
          animation: scanline 10s linear infinite;
          pointer-events: none; z-index: 1;
        }
        .db-glow-tl {
          position: fixed; top:-140px; left:-140px;
          width:480px; height:480px; border-radius:50%;
          background: radial-gradient(circle, rgba(0,212,255,0.07), transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .db-glow-br {
          position: fixed; bottom:-140px; right:-140px;
          width:480px; height:480px; border-radius:50%;
          background: radial-gradient(circle, rgba(245,158,11,0.05), transparent 70%);
          pointer-events: none; z-index: 0;
        }

        /* ── Layout ── */
        .db-wrap {
          position: relative; z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 4rem;
        }

        /* ── Header ── */
        .db-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2.5rem;
          animation: fadeUp 0.6s ease both;
        }
        .db-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(0,212,255,0.7); margin-bottom: 0.5rem;
        }
        .db-eyebrow-dot {
          width:5px; height:5px; border-radius:50%;
          background:#00d4ff;
          animation: pulse-dot 2s ease infinite;
        }
        .db-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.75rem, 3vw, 2.4rem);
          color: white;
          letter-spacing: -0.025em;
          line-height: 1.1;
        }
        .db-title span { color: #00d4ff; }
        .db-tx-count {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.3);
          font-weight: 400;
          padding: 6px 12px;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          white-space: nowrap;
        }

        /* ── Filters ── */
        .db-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.05s;
        }
        .db-filter-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          display: block;
          margin-bottom: 5px;
        }
        .db-select, .db-date-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 6px;
          padding: 9px 12px;
          font-size: 0.82rem;
          color: white;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .db-select:focus, .db-date-input:focus {
          border-color: rgba(0,212,255,0.4);
          box-shadow: 0 0 0 3px rgba(0,212,255,0.07);
        }
        .db-select option { background: #0b0d14; }
        .db-date-input::-webkit-calendar-picker-indicator { filter: invert(0.4); cursor: pointer; }

        /* ── Summary Cards ── */
        .db-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 2.5rem;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.1s;
        }
        @media(max-width:640px){ .db-summary { grid-template-columns: 1fr; } }

        .db-stat {
          background: #07090f;
          padding: 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: background 0.25s;
        }
        .db-stat:hover { background: rgba(255,255,255,0.02); }
        .db-stat-label {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .db-stat-value {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          line-height: 1;
          font-weight: 400;
        }
        .db-stat-sub {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.25);
          font-weight: 300;
        }

        /* ── Table ── */
        .db-table-wrap {
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 2.5rem;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.15s;
        }
        .db-table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.5rem;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .db-table-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.1rem;
          color: white;
          letter-spacing: -0.01em;
        }
        .db-table-badge {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(0,212,255,0.6);
          background: rgba(0,212,255,0.06);
          border: 1px solid rgba(0,212,255,0.15);
          border-radius: 20px;
          padding: 3px 10px;
        }
        .db-table {
          width: 100%;
          border-collapse: collapse;
        }
        .db-table thead tr {
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .db-table th {
          padding: 10px 16px;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          text-align: left;
          white-space: nowrap;
        }
        .db-table tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
        }
        .db-table tbody tr:last-child { border-bottom: none; }
        .db-table tbody tr:hover { background: rgba(255,255,255,0.02); }
        .db-table td {
          padding: 11px 16px;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.6);
          font-weight: 400;
        }
        .db-table td.amount { color: white; font-weight: 500; }
        .db-table td.credit-type {
          color: #4ade80;
          font-weight: 600;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .db-table td.debit-type {
          color: #f87171;
          font-weight: 600;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .db-table td.balance-col { color: rgba(0,212,255,0.8); font-weight: 500; }

        /* ── Chart Cards ── */
        .db-charts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.2s;
        }
        @media(max-width:768px){ .db-charts-grid { grid-template-columns: 1fr; } }

        .db-chart-card {
          background: #0b0d14;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.25s;
        }
        .db-chart-card:hover { border-color: rgba(0,212,255,0.15); }
        .db-chart-card.span2 { grid-column: span 2; }
        @media(max-width:768px){ .db-chart-card.span2 { grid-column: span 1; } }

        .db-chart-head {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 1.1rem 1.5rem 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .db-chart-icon {
          width: 30px; height: 30px;
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,212,255,0.07);
          flex-shrink: 0;
        }
        .db-chart-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: white;
          letter-spacing: -0.01em;
        }
        .db-chart-body { padding: 1.25rem 0.5rem 1rem; }

        /* ── Loading ── */
        .db-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem;
          gap: 1rem;
        }
        .db-loading-spinner {
          width: 32px; height: 32px;
          border: 2px solid rgba(255,255,255,0.08);
          border-top-color: #00d4ff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        .db-loading-text {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.08em;
        }

        /* ── Section label ── */
        .db-section-label {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 1.25rem;
        }
        .db-section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.3rem; color: white;
          letter-spacing: -0.02em; white-space: nowrap;
        }
        .db-section-line {
          flex:1; height:1px;
          background: linear-gradient(to right, rgba(255,255,255,0.07), transparent);
        }

        /* recharts legend text override */
        .recharts-legend-item-text { color: rgba(255,255,255,0.45) !important; font-size: 0.75rem !important; }
      `}</style>

      {/* ── Atmosphere ── */}
      <div className="db-grid" />
      <div className="db-scanline" />
      <div className="db-glow-tl" />
      <div className="db-glow-br" />

      <div className="db-wrap">

        {/* ── Header ── */}
        <div className="db-header">
          <div>
            <div className="db-eyebrow">
              <div className="db-eyebrow-dot" />
              Startup Portal
            </div>
            <h1 className="db-title">
              Finance <span>Dashboard</span>
            </h1>
          </div>
          {!loading && (
            <div className="db-tx-count">
              {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* ── Filters ── */}
        <div className="db-filters">
          <div>
            <span className="db-filter-label">Type</span>
            <select
              className="db-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Transactions</option>
              <option value="credit">Credits Only</option>
              <option value="debit">Debits Only</option>
            </select>
          </div>
          <div>
            <span className="db-filter-label">From</span>
            <input
              className="db-date-input"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <span className="db-filter-label">To</span>
            <input
              className="db-date-input"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="db-loading">
            <div className="db-loading-spinner" />
            <p className="db-loading-text">Loading transactions…</p>
          </div>
        ) : (
          <>
            {/* ── Summary Stats ── */}
            <div className="db-summary">
              <div className="db-stat">
                <div className="db-stat-label">Total Credits</div>
                <div className="db-stat-value" style={{ color: "#4ade80" }}>
                  ₹{credits.toLocaleString()}
                </div>
                <div className="db-stat-sub">
                  {filteredTransactions.filter(t => t.type === "credit").length} credit entries
                </div>
              </div>
              <div className="db-stat">
                <div className="db-stat-label">Total Debits</div>
                <div className="db-stat-value" style={{ color: "#f87171" }}>
                  ₹{debits.toLocaleString()}
                </div>
                <div className="db-stat-sub">
                  {filteredTransactions.filter(t => t.type === "debit").length} debit entries
                </div>
              </div>
              <div className="db-stat">
                <div className="db-stat-label">Net Balance Change</div>
                <div
                  className="db-stat-value"
                  style={{ color: (credits - debits) >= 0 ? "#00d4ff" : "#f87171" }}
                >
                  {(credits - debits) >= 0 ? "+" : ""}₹{(credits - debits).toLocaleString()}
                </div>
                <div className="db-stat-sub">
                  {(credits - debits) >= 0 ? "Positive cashflow" : "Negative cashflow"}
                </div>
              </div>
            </div>

            {/* ── Transaction Table ── */}
            <div className="db-section-label">
              <h2 className="db-section-title">Transaction Ledger</h2>
              <div className="db-section-line" />
            </div>

            <div className="db-table-wrap">
              <div className="db-table-header">
                <span className="db-table-title">All Transactions</span>
                <span className="db-table-badge">{filteredTransactions.length} records</span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table className="db-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Type</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((tx) => (
                      <tr key={tx.id}>
                        <td>{new Date(tx.date).toLocaleString()}</td>
                        <td>{tx.category || "—"}</td>
                        <td className="amount">₹{Number(tx.amount).toLocaleString()}</td>
                        <td className={tx.type === "credit" ? "credit-type" : "debit-type"}>
                          {tx.type}
                        </td>
                        <td className="balance-col">
                          {tx.balance !== null ? `₹${Number(tx.balance).toLocaleString()}` : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Charts ── */}
            <div className="db-section-label">
              <h2 className="db-section-title">Visualizations</h2>
              <div className="db-section-line" />
            </div>

            <div className="db-charts-grid">

              {/* 1 — Cashflow Trend */}
              <ThreeDWrapper>
                <div className="db-chart-card">
                  <div className="db-chart-head">
                    <div className="db-chart-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <polyline points="2,12 5,7 8,9 11,4 14,6" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      </svg>
                    </div>
                    <span className="db-chart-name">Cashflow Trend</span>
                  </div>
                  <div className="db-chart-body">
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={cashflowData}>
                        <CartesianGrid {...gridProps} />
                        <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
                        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                        <Tooltip content={<DarkTooltip />} />
                        <Legend wrapperStyle={legendStyle} />
                        <Line dataKey="credit" stroke="#4ade80" strokeWidth={2} dot={false} />
                        <Line dataKey="debit"  stroke="#f87171" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </ThreeDWrapper>

              {/* 2 — Daily Credits vs Debits */}
              <ThreeDWrapper>
                <div className="db-chart-card">
                  <div className="db-chart-head">
                    <div className="db-chart-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="2" y="9" width="3" height="5" rx="1" fill="#00d4ff" fillOpacity="0.7"/>
                        <rect x="6.5" y="6" width="3" height="8" rx="1" fill="#00d4ff" fillOpacity="0.85"/>
                        <rect x="11" y="3" width="3" height="11" rx="1" fill="#00d4ff"/>
                      </svg>
                    </div>
                    <span className="db-chart-name">Daily Credits vs Debits</span>
                  </div>
                  <div className="db-chart-body">
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={cashflowData}>
                        <CartesianGrid {...gridProps} />
                        <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
                        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                        <Tooltip content={<DarkTooltip />} />
                        <Legend wrapperStyle={legendStyle} />
                        <Bar dataKey="credit" fill="#4ade80" radius={[3,3,0,0]} />
                        <Bar dataKey="debit"  fill="#f87171" radius={[3,3,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </ThreeDWrapper>

              {/* 3 — Balance Trend (full width) */}
              <ThreeDWrapper>
                <div className="db-chart-card span2">
                  <div className="db-chart-head">
                    <div className="db-chart-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 13 Q5 6 8 8 Q11 10 14 3" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                        <path d="M2 13 Q5 6 8 8 Q11 10 14 3 V14 H2 Z" fill="rgba(0,212,255,0.08)"/>
                      </svg>
                    </div>
                    <span className="db-chart-name">Balance Trend</span>
                  </div>
                  <div className="db-chart-body">
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={balanceTrend}>
                        <defs>
                          <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#00d4ff" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid {...gridProps} />
                        <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
                        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                        <Tooltip content={<DarkTooltip />} />
                        <Legend wrapperStyle={legendStyle} />
                        <Area dataKey="balance" stroke="#00d4ff" strokeWidth={2} fill="url(#balanceGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </ThreeDWrapper>

              {/* 4 — Scatter */}
              <ThreeDWrapper>
                <div className="db-chart-card">
                  <div className="db-chart-head">
                    <div className="db-chart-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="4"  cy="11" r="1.5" fill="#4ade80"/>
                        <circle cx="8"  cy="6"  r="1.5" fill="#4ade80"/>
                        <circle cx="6"  cy="13" r="1.5" fill="#f87171"/>
                        <circle cx="12" cy="4"  r="1.5" fill="#f87171"/>
                        <circle cx="10" cy="9"  r="1.5" fill="#4ade80"/>
                      </svg>
                    </div>
                    <span className="db-chart-name">Transaction Scatter</span>
                  </div>
                  <div className="db-chart-body">
                    <ResponsiveContainer width="100%" height={280}>
                      <ScatterChart>
                        <CartesianGrid {...gridProps} />
                        <XAxis dataKey="date"   tick={axisStyle} axisLine={false} tickLine={false} />
                        <YAxis dataKey="amount" tick={axisStyle} axisLine={false} tickLine={false} />
                        <Tooltip content={<DarkTooltip />} />
                        <Legend wrapperStyle={legendStyle} />
                        <Scatter name="credit" data={scatterData.filter((d) => d.type === "credit")} fill="#4ade80" opacity={0.8} />
                        <Scatter name="debit"  data={scatterData.filter((d) => d.type === "debit")}  fill="#f87171" opacity={0.8} />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </ThreeDWrapper>

              {/* 5 — Heatmap (full width) */}
              <ThreeDWrapper>
                <div className="db-chart-card span2">
                  <div className="db-chart-head">
                    <div className="db-chart-icon" style={{ background: "rgba(168,85,247,0.08)" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="2" y="2" width="3" height="3" rx="1" fill="#a855f7" fillOpacity="0.4"/>
                        <rect x="6.5" y="2" width="3" height="3" rx="1" fill="#a855f7" fillOpacity="0.7"/>
                        <rect x="11" y="2" width="3" height="3" rx="1" fill="#a855f7"/>
                        <rect x="2" y="6.5" width="3" height="3" rx="1" fill="#a855f7" fillOpacity="0.7"/>
                        <rect x="6.5" y="6.5" width="3" height="3" rx="1" fill="#a855f7"/>
                        <rect x="11" y="6.5" width="3" height="3" rx="1" fill="#a855f7" fillOpacity="0.4"/>
                        <rect x="2" y="11" width="3" height="3" rx="1" fill="#a855f7"/>
                        <rect x="6.5" y="11" width="3" height="3" rx="1" fill="#a855f7" fillOpacity="0.4"/>
                        <rect x="11" y="11" width="3" height="3" rx="1" fill="#a855f7" fillOpacity="0.7"/>
                      </svg>
                    </div>
                    <span className="db-chart-name">Transaction Frequency Heatmap</span>
                  </div>
                  <div className="db-chart-body">
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={heatmapData}>
                        <defs>
                          <linearGradient id="heatGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <CartesianGrid {...gridProps} />
                        <XAxis dataKey="date"  tick={axisStyle} axisLine={false} tickLine={false} />
                        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                        <Tooltip content={<CountTooltip />} />
                        <Bar dataKey="count" fill="url(#heatGrad)" radius={[3,3,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </ThreeDWrapper>

            </div>
          </>
        )}
      </div>
    </div>
  );
}