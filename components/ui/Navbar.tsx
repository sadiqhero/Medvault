"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [alertsOpen, setAlertsOpen] = useState(false);

  return (
    <nav style={{
      background: "var(--g-dark)",
      padding: "0 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100px",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: 38, height: 38, background: "#fff",
          borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0c8347" strokeWidth="2.2" strokeLinecap="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <span style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: "0.2px" }}>
          Med<span style={{ color: "var(--g-mid)" }}>Vault</span>
        </span>

<Image
            src={"/hipaa_i.png"} 
            alt={"hipaa"}
            width = {100}
            height={100}

            />

      </div>






      {/* Nav links */}
      <div style={{ display: "flex", gap: 6 }}>
<Link href="/"><div style={navBtnStyle}>Home</div></Link>

        {[ "Profile"].map((label) => (
          <button key={label} style={navBtnStyle}>{label}</button>
        ))}

<Link href="/about">
 <button style={navBtnStyle}>
            About
      </button>
</Link>

        {/* Alerts */}
        <div style={{ position: "relative" }}>
          <button style={navBtnStyle} onClick={() => setAlertsOpen(!alertsOpen)}>
            Alerts
            <span style={{
              position: "absolute", top: -4, right: -4,
              width: 17, height: 17, background: "#e24b4a",
              borderRadius: "50%", fontSize: 10, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
            }}>3</span>
          </button>
          {alertsOpen && (
            <div style={{
              position: "absolute", right: 0, top: "calc(100% + 8px)",
              background: "#fff", borderRadius: 12, border: "0.5px solid var(--g-mid)",
              width: 280, boxShadow: "0 8px 24px rgba(12,131,71,0.15)",
              overflow: "hidden", zIndex: 100,
            }} className="animate-fadeIn">
              {[
                { msg: "Emeka Eze — critical vitals update", time: "2 min ago", dot: "#e24b4a" },
                { msg: "Musa Garba — missed medication alert", time: "18 min ago", dot: "#ef9f27" },
                { msg: "New lab results: PT-0039", time: "1 hr ago", dot: "var(--g-dark)" },
              ].map((a, i) => (
                <div key={i} style={{
                  padding: "10px 14px", borderBottom: i < 2 ? "0.5px solid var(--g-light)" : "none",
                  display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--g-light)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: a.dot, flexShrink: 0, marginTop: 5 }} />
                  <div>
                    <p style={{ fontSize: 13, color: "var(--g-text)", fontWeight: 500 }}>{a.msg}</p>
                    <p style={{ fontSize: 11, color: "var(--g-hint)", marginTop: 2 }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button style={{ ...navBtnStyle, background: "rgba(255,255,255,0.18)" }}><Link href="/login">Logout</Link></button>
      </div>
    </nav>
  );
}

const navBtnStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.12)",
  border: "none",
  color: "#fff",
  padding: "7px 16px",
  borderRadius: 20,
  fontSize: 13,
  fontFamily: "inherit",
  cursor: "pointer",
  position: "relative",
  transition: "background 0.15s",
};
