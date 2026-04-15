"use client";
import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Patient } from "@/types/patient";
import StatusBadge from "@/components/ui/StatusBadge";

function initials(p: Patient) {
  return (p.firstName[0] + p.lastName[0]).toUpperCase();
}

export default function SearchBar() {
  const router                = useRouter(); 
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen]       = useState(false);
  const debounceRef           = useRef<ReturnType<typeof setTimeout>>(undefined);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); setOpen(false); return; }
    setLoading(true);
    const res  = await fetch(`/api/patients/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setResults(data);
    setOpen(true);
    setLoading(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 280);
  };
  const handleResultClick = (id: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/patients/${id}`);
  };

  return (
    <div style={{
      background: "#fff", borderRadius: 14,
      border: "0.5px solid var(--g-mid)",
      padding: "1.25rem",
      display: "flex", flexDirection: "column",
      alignItems: "center",
      justifyContent: "center", gap: "0.9rem",
      position: "relative",
    }}>
      {/* Input */}
      <div style={{ position: "relative" }}>
        <svg style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", width: 18, height: 18, color: "var(--g-dark)", pointerEvents: "none" }}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          value={query}
          onChange={handleChange}
          onFocus={e => { if (query.length >= 2) setOpen(true); e.currentTarget.style.borderColor = "var(--g-dark)"; e.currentTarget.style.background = "#fff"; }}
          onBlur={e => { e.currentTarget.style.borderColor = "var(--g-mid)"; e.currentTarget.style.background = "var(--g-light)"; setTimeout(() => setOpen(false), 180); }}
          placeholder="Search by name, ID, ward or diagnosis…"
          style={{
            width: "700px", padding: "12px 16px 12px 42px",
            border: "1.5px solid var(--g-mid)", borderRadius: 10,
            fontSize: 14, background: "var(--g-light)",
            color: "var(--g-text)", outline: "none",
            transition: "border-color 0.15s, background 0.15s",
          }}
        />
        {loading && (
          <span className="animate-spin" style={{
            position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)",
            width: 16, height: 16, border: "2px solid var(--g-mid)",
            borderTopColor: "var(--g-dark)", borderRadius: "50%", display: "block",
          }} />
        )}
      </div>

      {/* Dropdown results */}
      {open && results.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
          background: "#fff", border: "0.5px solid var(--g-mid)",
          borderRadius: 12, overflow: "hidden",
          boxShadow: "0 8px 24px rgba(12,131,71,0.12)",
          zIndex: 50, maxHeight: 280, overflowY: "auto",
        }} className="animate-fadeIn">
          {results.slice(0, 8).map((p) => (
            <div
              key={p.id}
              onClick={() => handleResultClick(p.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 14px", cursor: "pointer",
                borderBottom: "0.5px solid var(--g-light)",
                transition: "background 0.12s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--g-light)")}
              onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
            >
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "var(--g-dark)", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, flexShrink: 0,
              }}>{initials(p)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--g-text)" }}>
                  {p.firstName} {p.lastName}
                </p>
                <p style={{ fontSize: 11, color: "var(--g-hint)" }}>
                  {p.id} · {p.ward} · Age {p.age}
                </p>
              </div>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      )}

      {open && results.length === 0 && !loading && query.length >= 2 && (
        <p style={{ fontSize: 13, color: "var(--g-hint)", textAlign: "center", padding: "8px 0" }}>
          No patients found for &ldquo;{query}&rdquo;
        </p>
      )}

      {!open && (
        <p style={{ fontSize: 12, color: "var(--g-hint)", textAlign: "center" }}>
          Type at least 2 characters to search records
        </p>
      )}

      <button
        onClick={() => search(query)}
        style={{
          background: "var(--g-dark)", color: "#fff", border: "none",
          padding: "11px 24px", borderRadius: 10,
          width: "300px",
          fontSize: 14, fontWeight: 600, cursor: "pointer",
          transition: "background 0.15s", letterSpacing: "0.4px",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--g-darker)")}
        onMouseLeave={e => (e.currentTarget.style.background = "var(--g-dark)")}
      >
        Search Records
      </button>
    </div>
  );
}