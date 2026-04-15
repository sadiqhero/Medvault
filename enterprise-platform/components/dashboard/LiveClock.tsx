"use client";
import { useEffect, useState } from "react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = now.getHours();
  const ap = h >= 12 ? "PM" : "AM";
  const hh = String(h % 12 || 12).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return (
    <div style={{
      background: "var(--g-light)",
      borderRadius: 14,
      border: "0.5px solid var(--g-mid)",
      padding: "1.25rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    }} suppressHydrationWarning>
      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--g-muted)", letterSpacing: "0.5px" }}>
        {now.getDate()} {MONTHS[now.getMonth()]} {now.getFullYear()}
      </p>
      <p style={{
        fontSize: 36, fontWeight: 700, color: "var(--g-dark)",
        letterSpacing: "-1px", fontVariantNumeric: "tabular-nums",
      }} suppressHydrationWarning>
        {hh}:{mm}:{ss} {ap}
      </p>
      <span className="animate-pulse-dot" style={{
        width: 13, height: 13, borderRadius: "50%", background: "#9cb802",
        display: "inline-block",
      }} />
    </div>
  );
}
