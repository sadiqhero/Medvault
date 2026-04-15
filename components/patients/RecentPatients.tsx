"use client";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { Patient } from "@/types/patient";
import StatusBadge from "@/components/ui/StatusBadge";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function initials(p: Patient) {
  return (p.firstName[0] + p.lastName[0]).toUpperCase();
}

export default function RecentPatients() {
  const { data, isLoading } = useSWR<Patient[]>("/api/patients", fetcher, { refreshInterval: 5000 });
  const recent = (data ?? []).slice(0, 10);

  return (
    <section>
      <h2 style={{
        fontSize: 12, fontWeight: 700, letterSpacing: "1.2px",
        color: "var(--g-muted)", textTransform: "uppercase", marginBottom: "0.75rem",
      }}>
        Recent Patients
      </h2>

      <div style={{
        background: "var(--g-dark)", borderRadius: 14, padding: "1.25rem",
        display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem",
      }}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
          : recent.map((p) => <PatientCard key={p.id} patient={p} />)
        }
      </div>
    </section>
  );
}

function PatientCard({ patient: p }: { patient: Patient }) {
  const router = useRouter();

  return (
    <div
      className="animate-fadeIn"
      onClick={() => router.push(`/patients/${p.id}`)}
      style={{
        background: "rgba(255,255,255,0.1)",
        borderRadius: 10,
        padding: "1rem 0.75rem",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: "0.55rem",
        cursor: "pointer", textAlign: "center",
        border: "0.5px solid rgba(255,255,255,0.1)",
        transition: "background 0.15s, transform 0.12s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "rgba(255,255,255,0.2)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(255,255,255,0.1)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Avatar with image fallback */}
      {p.image ? (
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid rgba(255,255,255,0.3)",
        }}>
          <Image
            src={p.image}
            alt={`${p.firstName} ${p.lastName}`}
            width={100}
            height={100}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const fallbackDiv = document.createElement("div");
                fallbackDiv.style.cssText = `
                  width: 56px; height: 56px; border-radius: 50%;
                  background: var(--g-mid); color: var(--g-text);
                  display: flex; align-items: center; justify-content: center;
                  font-size: 18px; font-weight: 700;
                  border: 2px solid rgba(255,255,255,0.3);
                `;
                fallbackDiv.textContent = initials(p);
                parent.appendChild(fallbackDiv);
                e.currentTarget.remove();
              }
            }}
          />
        </div>
      ) : (
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "var(--g-mid)", color: "var(--g-text)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 700,
          border: "2px solid rgba(255,255,255,0.3)",
        }}>
          {initials(p)}
        </div>
      )}

      <p style={{ fontSize: 12, fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>
        {p.firstName} {p.lastName}
      </p>
      <p style={{ fontSize: 10, color: "var(--g-mid)" }}>{p.id}</p>
      <StatusBadge status={p.status} />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.06)", borderRadius: 10,
      padding: "1rem 0.75rem", display: "flex", flexDirection: "column",
      alignItems: "center", gap: "0.55rem",
    }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
      <div style={{ width: "70%", height: 10, borderRadius: 4, background: "rgba(255,255,255,0.1)" }} />
      <div style={{ width: "50%", height: 8, borderRadius: 4, background: "rgba(255,255,255,0.08)" }} />
    </div>
  );
}