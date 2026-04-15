"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Patient, PatientStatus, Ward } from "@/types/patient";
import StatusBadge from "@/components/ui/StatusBadge";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const ALL_WARDS: Ward[] = ["General","Cardiology","Pediatrics","Oncology","Neurology","Emergency"];
const ALL_STATUSES: PatientStatus[] = ["active","pending","critical","discharged"];

export default function AllPatientsTable({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { data, isLoading } = useSWR<Patient[]>("/api/patients", fetcher);
  const [wardFilter, setWardFilter]     = useState<Ward | "">("");
  const [statusFilter, setStatusFilter] = useState<PatientStatus | "">("");
  const [sort, setSort] = useState<"name" | "id" | "age">("id");

  const patients = (data ?? [])
    .filter(p => !wardFilter   || p.ward   === wardFilter)
    .filter(p => !statusFilter || p.status === statusFilter)
    .sort((a, b) => {
      if (sort === "name") return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      if (sort === "age")  return b.age - a.age;
      return a.id.localeCompare(b.id);
    });

  const handlePatientClick = (id: string) => {
    onClose();
    router.push(`/patients/${id}`);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.42)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="animate-slideUp" style={{
        background: "#fff", borderRadius: 16,
        width: "min(1900px, 200vw)", maxHeight: "200vh", minHeight: "90vh",
        display: "flex", flexDirection: "column",
        border: "0.5px solid var(--g-mid)",
      }}>
        {/* Header */}
        <div style={{
          padding: "1.25rem 1.5rem", borderBottom: "0.5px solid var(--g-light)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--g-text)" }}>All Patients</h2>
            <p style={{ fontSize: 12, color: "var(--g-hint)", marginTop: 2 }}>
              {patients.length} record{patients.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select style={selectStyle} value={wardFilter} onChange={e => setWardFilter(e.target.value as Ward | "")}>
              <option value="">All Wards</option>
              {ALL_WARDS.map(w => <option key={w}>{w}</option>)}
            </select>
            <select style={selectStyle} value={statusFilter} onChange={e => setStatusFilter(e.target.value as PatientStatus | "")}>
              <option value="">All Status</option>
              {ALL_STATUSES.map(s => <option key={s} style={{ textTransform: "capitalize" }}>{s}</option>)}
            </select>
            <select style={selectStyle} value={sort} onChange={e => setSort(e.target.value as "name"|"id"|"age")}>
              <option value="id">Sort: ID</option>
              <option value="name">Sort: Name</option>
              <option value="age">Sort: Age</option>
            </select>
            <button onClick={onClose} style={{
              background: "var(--g-light)", border: "none",
              width: 32, height: 32, borderRadius: "50%",
              cursor: "pointer", fontSize: 15, color: "var(--g-dark)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {isLoading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "var(--g-hint)" }}>Loading…</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--g-light)", position: "sticky", top: 0 }}>
                  {["ID","Patient","Age","Gender","Ward","Diagnosis","Blood","Status"].map(h => (
                    <th key={h} style={{
                      padding: "10px 14px", textAlign: "left",
                      fontSize: 11, fontWeight: 700, color: "var(--g-muted)",
                      letterSpacing: "0.6px", textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {patients.map((p, i) => (
                  <tr
                    key={p.id}
                    onClick={() => handlePatientClick(p.id)}
                    style={{
                      background: i % 2 === 0 ? "#fff" : "#fafcfb",
                      borderBottom: "0.5px solid var(--g-light)",
                      transition: "background 0.12s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--g-light)")}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafcfb")}
                  >
                    <td style={{ padding: "10px 14px", fontWeight: 600, color: "var(--g-dark)", fontFamily: "monospace" }}>{p.id}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: "50%",
                          background: "var(--g-dark)", color: "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, fontWeight: 700, flexShrink: 0,
                        }}>
                          {(p.firstName[0] + p.lastName[0]).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 500, color: "var(--g-text)" }}>{p.firstName} {p.lastName}</span>
                      </div>
                    </td>
                    <td style={{ padding: "10px 14px", color: "var(--g-muted)" }}>{p.age}</td>
                    <td style={{ padding: "10px 14px", color: "var(--g-muted)" }}>{p.gender}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={{
                        background: "var(--g-light)", color: "var(--g-dark)",
                        fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20,
                      }}>{p.ward}</span>
                    </td>
                    <td style={{ padding: "10px 14px", color: "var(--g-muted)", maxWidth: 200 }}>
                      <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {p.diagnosis}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px", fontWeight: 600, color: "var(--g-text)" }}>{p.bloodType}</td>
                    <td style={{ padding: "10px 14px" }}><StatusBadge status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  padding: "6px 10px", border: "1px solid var(--g-mid)",
  borderRadius: 8, fontSize: 12, background: "var(--g-light)",
  color: "var(--g-text)", cursor: "pointer", outline: "none",
};