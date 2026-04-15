import { notFound } from "next/navigation";
import { getPatientById } from "@/lib/data"; // Changed from data to db
import StatusBadge from "@/components/ui/StatusBadge";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";


// Loading component for Suspense fallback
function PatientProfileSkeleton() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--g-bg, #f7f8fa)", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 13, color: "var(--g-muted)", marginBottom: "1.5rem",
        }}>
          ← Back to Dashboard
        </div>
        <div style={{
          background: "#fff", borderRadius: 16,
          border: "0.5px solid var(--g-mid)", overflow: "hidden",
        }}>
          <div style={{
            background: "var(--g-dark)", padding: "2rem 2rem 1.75rem",
            display: "flex", alignItems: "center", gap: "1.25rem",
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, fontWeight: 700, flexShrink: 0,
              border: "2px solid rgba(255,255,255,0.25)",
            }}>
              ...
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: 28, width: "60%", background: "rgba(255,255,255,0.1)", borderRadius: 4 }}></div>
              <div style={{ height: 16, width: "40%", background: "rgba(255,255,255,0.08)", borderRadius: 4, marginTop: 8 }}></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default async function PatientProfilePage({
  params,
}: {
  params: { id: string };
}) {
  // Since params might be a Promise in Next.js 15+, await it
  const resolvedParams = await params;
  const patient = await getPatientById(resolvedParams.id);

  if (!patient) notFound();

  const fields: { label: string; value: string | number }[] = [
    { label: "Patient ID",    value: patient.id },
    { label: "Date of Birth", value: patient.dateOfBirth },
    { label: "Age",           value: patient.age },
    { label: "Gender",        value: patient.gender },
    { label: "Phone",         value: patient.phone },
    { label: "Blood Type",    value: patient.bloodType },
    { label: "Ward",          value: patient.ward },
    { label: "Diagnosis",     value: patient.diagnosis },
    { label: "Registered",    value: new Date(patient.registeredAt).toLocaleString() },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "var(--g-bg, #f7f8fa)" }}>

<Navbar />
      <div style={{ maxWidth: 760, margin: "0 auto", paddingTop:"10px" }}>

        {/* Back */}
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 13, color: "#fff", textDecoration: "none",
          marginBottom: "1.5rem",
        }}>

<div style={{ display:"flex", flexFlow:"row", gap:"5px", width:"100px", fontSize:"20px", alignItems:"center", justifyContent:"center",
   height:"50px", borderRadius:"20px", background:"var(--g-darker)"}}> ← Back  </div>

        </Link>
        {/* Card */}
        <div style={{
          background: "#fff", borderRadius: 16,
          border: "0.5px solid var(--g-mid)", overflow: "hidden",
        }}>
          {/* Hero header */}
          <div style={{
            background: "var(--g-dark)", padding: "2rem 2rem 1.75rem",
            display: "flex", alignItems: "center", gap: "1.25rem",
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, fontWeight: 700, flexShrink: 0,
              border: "2px solid rgba(255,255,255,0.25)",
            }}>


 <Image
            src={patient.image} 
            alt={`${patient.firstName} ${patient.lastName}`}
            width = {100}
            height={100}
             />
            
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>
                {patient.firstName} {patient.lastName}
              </h1>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>
                {patient.id} · {patient.ward} Ward
              </p>
            </div>
            <StatusBadge status={patient.status} />
          </div>

          {/* Fields grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "0.5px", background: "#ffffff",
          }}>
            {fields.map(({ label, value }) => (
              <div key={label} style={{ background: "#fff", padding: "1.1rem 1.5rem" }}>
                <p style={{
                  fontSize: 10, fontWeight: 700, color: "var(--g-muted)",
                  textTransform: "uppercase", letterSpacing: "0.7px", margin: 0,
                }}>
                  {label}
                </p>
                <p style={{
                  fontSize: 15, fontWeight: 500, color: "var(--g-text)",
                  marginTop: 5, wordBreak: "break-word",
                }}>
                  {value}
                </p>
              </div>
            ))}

            {/* Diagnosis spans full width */}
            <div style={{ background: "#fff", padding: "1.1rem 1.5rem", gridColumn: "1 / -1" }}>
              <p style={{
                fontSize: 10, fontWeight: 700, color: "var(--g-muted)",
                textTransform: "uppercase", letterSpacing: "0.7px", margin: 0,
              }}>
                Diagnosis
              </p>
              <p style={{ fontSize: 15, fontWeight: 500, color: "var(--g-text)", marginTop: 5 }}>
                {patient.diagnosis}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}