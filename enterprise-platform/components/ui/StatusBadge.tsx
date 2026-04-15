import { PatientStatus } from "@/types/patient";

const configs: Record<PatientStatus, { bg: string; color: string; label: string }> = {
  active:     { bg: "#dcf5e8", color: "#0c8347", label: "Active" },
  pending:    { bg: "#fef3dc", color: "#9a6500", label: "Pending" },
  critical:   { bg: "#fde8e8", color: "#a32d2d", label: "Critical" },
  discharged: { bg: "#f0f0f0", color: "#5a5a5a", label: "Discharged" },
};

export default function StatusBadge({ status }: { status: PatientStatus }) {
  const { bg, color, label } = configs[status];
  return (
    <span style={{
      background: bg, color, fontSize: 11, fontWeight: 600,
      padding: "3px 10px", borderRadius: 20, letterSpacing: "0.3px",
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}
