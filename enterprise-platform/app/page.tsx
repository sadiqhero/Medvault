"use client";
import { useState } from "react";
import { mutate } from "swr";
import Navbar from "@/components/ui/Navbar";
import StatsCard from "@/components/dashboard/StatsCard";
import LiveClock from "@/components/dashboard/LiveClock";
import SearchBar from "@/components/dashboard/SearchBar";
import ActionButtons from "@/components/dashboard/ActionButtons";
import RecentPatients from "@/components/patients/RecentPatients";
import NewPatientModal from "@/components/patients/NewPatientModal";
import AllPatientsTable from "@/components/patients/AllPatientsTable";
import Toast from "@/components/ui/Toast";

export default function Home() {
  const [modal, setModal]   = useState<"none" | "new" | "all">("none");
  const [toast, setToast]   = useState<{ msg: string; type?: "success" | "error" } | null>(null);

  const handleSuccess = (msg: string) => {
    mutate("/api/patients");
    mutate("/api/patients/stats");
    setToast({ msg, type: "success" });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Top row: stats | search | clock */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 2fr", gap: "2rem", alignItems: "stretch" }}>
          <StatsCard />
          <SearchBar />
          <LiveClock />
        </div>

        {/* Action buttons */}
        <ActionButtons
          onNewPatient={() => setModal("new")}
          onAllPatients={() => setModal("all")}
          onAnalytics={() => setToast({ msg: "Analytics dashboard coming soon", type: "success" })}
        />

        {/* Recent patients strip */}
        <RecentPatients />
      </main>

      {/* Modals */}
      {modal === "new" && (
        <NewPatientModal onClose={() => setModal("none")} onSuccess={handleSuccess} />
      )}
      {modal === "all" && (
        <AllPatientsTable onClose={() => setModal("none")} />
      )}

      {/* Toast */}
      {toast && (
        <Toast message={toast.msg} type={toast.type} onDone={() => setToast(null)} />
      )}
    </div>
  );
}
