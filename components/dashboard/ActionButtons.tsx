"use client";

interface Props {
  onNewPatient: () => void;
  onAllPatients: () => void;
  onAnalytics: () => void;
}

export default function ActionButtons({ onNewPatient, onAllPatients, onAnalytics }: Props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
      <ActionBtn variant="primary" onClick={onNewPatient}>
        <PlusIcon />
        New Patient
      </ActionBtn>
      <ActionBtn variant="secondary" onClick={onAllPatients}>
        All Patients
      </ActionBtn>
      <ActionBtn variant="outline" onClick={onAnalytics}>
        Analytics
      </ActionBtn>
    </div>
  );
}

function ActionBtn({
  variant, onClick, children,
}: {
  variant: "primary" | "secondary" | "outline";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const styles: Record<string, React.CSSProperties> = {
    primary:   { background: "var(--g-dark)",  color: "#fff",           border: "none" },
    secondary: { background: "var(--g-mid)",   color: "var(--g-text)",  border: "none" },
    outline:   { background: "#fff",            color: "var(--g-dark)",  border: "2px solid var(--g-dark)" },
  };
  const hovers: Record<string, string> = {
    primary: "var(--g-darker)", secondary: "#9dcfb0", outline: "var(--g-light)",
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...styles[variant],
        borderRadius: 14, padding: "1.1rem 1.5rem",
        fontSize: 15, fontWeight: 600, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        fontFamily: "inherit", transition: "background 0.15s, transform 0.12s",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = hovers[variant])}
      onMouseLeave={e => (e.currentTarget.style.background = styles[variant].background as string)}
      onMouseDown={e => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  );
}

function PlusIcon() {
  return (
    <span style={{
      width: 24, height: 24, borderRadius: "50%",
      background: "rgba(255,255,255,0.22)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 18, fontWeight: 300, lineHeight: 1,
    }}>+</span>
  );
}
