import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Check investors table
      const { data: investor } = await supabase
        .from("investors")
        .select("name")
        .eq("auth_id", user.id)
        .single();

      if (investor) {
        setUserName(investor.name);
        setRole("investor");
        return;
      }

      // Check startups table
      const { data: startup } = await supabase
        .from("startups")
        .select("startup_name")
        .eq("user_id", user.id)
        .single();

      if (startup) {
        setUserName(startup.startup_name);
        setRole("startup");
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    navigate("/");
  };

  // Role-based accent colors
  const isInvestor = role === "investor";
  const accentColor = isInvestor ? "#D4AF37" : "#22d3ee";
  const accentRgb = isInvestor ? "212,175,55" : "34,211,238";
  const accentDim = isInvestor ? "rgba(212,175,55,0.15)" : "rgba(34,211,238,0.12)";
  const accentBorder = isInvestor ? "rgba(212,175,55,0.35)" : "rgba(34,211,238,0.3)";
  const accentGlow = isInvestor
    ? "0 0 24px rgba(212,175,55,0.2)"
    : "0 0 24px rgba(34,211,238,0.15)";

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Josefin+Sans:wght@300;400;600&display=swap');

        .nav-link-item {
          position: relative;
          font-family: 'Josefin Sans', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 12px 20px;
          color: #cbd5e1;
          transition: color 0.25s ease, background 0.25s ease;
          overflow: hidden;
        }
        .nav-link-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 2px;
          background: ${accentColor};
          transform: scaleY(0);
          transition: transform 0.25s ease;
          transform-origin: bottom;
        }
        .nav-link-item:hover {
          color: ${accentColor};
          background: ${accentDim};
        }
        .nav-link-item:hover::before {
          transform: scaleY(1);
        }

        .logout-link {
          position: relative;
          font-family: 'Josefin Sans', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 12px 20px;
          text-align: left;
          color: #f87171;
          transition: color 0.25s ease, background 0.25s ease;
          overflow: hidden;
        }
        .logout-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 2px;
          background: #f87171;
          transform: scaleY(0);
          transition: transform 0.25s ease;
          transform-origin: bottom;
        }
        .logout-link:hover {
          background: rgba(248,113,113,0.1);
        }
        .logout-link:hover::before {
          transform: scaleY(1);
        }

        .hamburger-line {
          display: block;
          width: 22px;
          height: 1.5px;
          background: ${accentColor};
          transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
          transform-origin: center;
        }

        .dropdown-enter {
          animation: dropIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }

        .logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          font-size: 1.45rem;
          letter-spacing: 0.04em;
          background: linear-gradient(120deg, #ffffff 0%, ${accentColor} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }
        .logo-text:hover { opacity: 0.85; }

        .role-badge {
          font-family: 'Josefin Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${accentColor};
          opacity: 0.85;
        }

        .avatar-ring {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1.5px solid ${accentColor};
          background: ${accentDim};
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: ${accentColor};
          box-shadow: 0 0 10px rgba(${accentRgb}, 0.25);
          flex-shrink: 0;
        }

        /* Subtle grid on the navbar itself */
        .nav-grid-bg {
          background-image:
            linear-gradient(rgba(${accentRgb}, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${accentRgb}, 0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          background-color: #0b0e1a;
        }
      `}</style>

      <nav
        className="nav-grid-bg relative z-50 flex items-center justify-between px-7 py-4"
        style={{
          borderBottom: `1px solid ${accentBorder}`,
          boxShadow: accentGlow,
        }}
      >
        {/* LOGO */}
        <div className="flex flex-col leading-none" onClick={() => navigate("/home")}>
          <span className="logo-text">AuditReady</span>
          {role && (
            <span className="role-badge" style={{ marginTop: "1px" }}>
              {role} portal
            </span>
          )}
        </div>

        {/* HAMBURGER — three refined lines */}
        <button
          onClick={() => setOpen(!open)}
          className="focus:outline-none flex flex-col gap-[5px] items-end p-1"
          aria-label="Toggle menu"
        >
          <span className="hamburger-line" style={{ width: open ? "22px" : "22px" }} />
          <span className="hamburger-line" style={{ width: "15px", opacity: open ? 0 : 1 }} />
          <span className="hamburger-line" style={{ width: "22px" }} />
        </button>

        {/* DROPDOWN */}
        {open && (
          <div
            className="dropdown-enter absolute right-6 top-[68px] w-64"
            style={{
              background: "linear-gradient(160deg, #0d1120 0%, #0b0e1a 100%)",
              border: `1px solid ${accentBorder}`,
              borderRadius: "16px",
              boxShadow: `0 20px 60px rgba(0,0,0,0.5), ${accentGlow}`,
              overflow: "hidden",
            }}
          >
            {/* Thin accent top bar */}
            <div style={{ height: "2px", background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />

            <div className="flex flex-col py-2">
              <Link
                to="/home"
                onClick={() => setOpen(false)}
                className="nav-link-item"
              >
                Home
              </Link>

              <Link
                to={role === "investor" ? "/investor/dashboard" : "/dashboard"}
                onClick={() => setOpen(false)}
                className="nav-link-item"
              >
                Dashboard
              </Link>

              {/* Upload only for Startups */}
              {role === "startup" && (
                <Link
                  to="/upload"
                  onClick={() => setOpen(false)}
                  className="nav-link-item"
                >
                  Upload
                </Link>
              )}

              <button onClick={handleLogout} className="logout-link">
                Logout
              </button>
            </div>

            {/* PROFILE SECTION */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{
                borderTop: `1px solid ${accentBorder}`,
                background: accentDim,
              }}
            >
              <div className="avatar-ring">
                {userName ? userName.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="flex flex-col leading-tight">
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#f1f5f9",
                    letterSpacing: "0.02em",
                  }}
                >
                  {userName || "User"}
                </p>
                <p className="role-badge">{role || "Loading..."}</p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}