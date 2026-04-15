"use client";
import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onDone: () => void;
}

export default function Toast({ message, type = "success", onDone }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 300); }, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  const bg = type === "error" ? "#a32d2d" : type === "info" ? "var(--g-dark)" : "var(--g-dark)";

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 999,
      background: bg, color: "#fff",
      padding: "11px 20px", borderRadius: 10,
      fontSize: 13, fontWeight: 500,
      display: "flex", alignItems: "center", gap: 8,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 0.3s, transform 0.3s",
    }}>
      <span>{type === "success" ? "✓" : type === "error" ? "✕" : "ℹ"}</span>
      {message}
    </div>
  );
}
