"use client";
import useSWR from "swr";
import { PatientStats } from "@/types/patient";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function StatsCard() {
  const { data, isLoading } = useSWR<PatientStats>("/api/patients/stats", fetcher, { refreshInterval: 5000 });

  return (
    <div style={{
      background: "var(--g-dark)",
      borderRadius: 14,
      padding: "1.25rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.85rem",
    }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1px", color: "var(--g-mid)", textTransform: "uppercase", marginBottom: 4 }}>
          Total Patients
        </p>
        <p style={{ fontSize: 42, fontWeight: 700, color: "#fff", lineHeight: 1 }}>
          {isLoading ? "—" : (data?.total ?? 0).toLocaleString()}
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[
          { label: "This Month", value: data?.currentMonth },
          { label: "Today",      value: data?.today },
        ].map(({ label, value }) => (
          <div key={label} style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: 9, padding: "10px 12px",
          }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.8px", color: "var(--g-mid)", textTransform: "uppercase", marginBottom: 4 }}>
              {label}
            </p>
            <p style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>
              {isLoading ? "—" : (value ?? 0)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
