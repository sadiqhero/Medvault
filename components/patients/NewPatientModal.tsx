"use client";
import { useState } from "react";
import { NewPatientInput, BloodType, Ward, Gender, Patient } from "@/types/patient";

interface Props {
  onClose: () => void;
  onSuccess: (msg: string) => void;
  onPatientAdded?: (patient: Patient) => void;
}

const BLOOD_TYPES: BloodType[] = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
const WARDS: Ward[]            = ["General","Cardiology","Pediatrics","Oncology","Neurology","Emergency"];
const GENDERS: Gender[]        = ["Male","Female","Other"];

const empty: NewPatientInput = {
  firstName: "", lastName: "", dateOfBirth: "", gender: "Male",
  phone: "", diagnosis: "", bloodType: "O+", ward: "General", image: "/default-avatar.jpg",
};

export default function NewPatientModal({ onClose, onSuccess, onPatientAdded }: Props) {
  const [form, setForm]     = useState<NewPatientInput>(empty);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof NewPatientInput, string>>>({});

  const set = (k: keyof NewPatientInput, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.firstName.trim())  e.firstName  = "Required";
    if (!form.lastName.trim())   e.lastName   = "Required";
    if (!form.dateOfBirth)       e.dateOfBirth = "Required";
    if (!form.phone.trim())      e.phone      = "Required";
    if (!form.diagnosis.trim())  e.diagnosis  = "Required";
    
    if (form.dateOfBirth) {
      const dob = new Date(form.dateOfBirth);
      const today = new Date();
      if (dob > today) {
        e.dateOfBirth = "Date of birth cannot be in the future";
      }
    }
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    
    try {
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        dateOfBirth: form.dateOfBirth,
        gender: form.gender,
        phone: form.phone.trim(),
        diagnosis: form.diagnosis.trim(),
        bloodType: form.bloodType,
        ward: form.ward,
        image: "/default-avatar.png",
      };
      
      console.log("Sending payload:", payload); // Debug log
      
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      console.log("Response status:", res.status); // Debug log
      
      // Try to get the response text first
      const responseText = await res.text();
      console.log("Response text:", responseText); // Debug log
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        throw new Error(`Server returned invalid JSON: ${responseText}`);
      }
      
      if (!res.ok) {
        throw new Error(data.error || data.message || `HTTP ${res.status}: Failed to register patient`);
      }
      
      onSuccess(`${data.firstName} ${data.lastName} registered as ${data.id}`);
      
      if (onPatientAdded) {
        onPatientAdded(data);
      }
      
      onClose();
    } catch (error) {
      console.error("Registration error details:", error);
      onSuccess(error instanceof Error ? error.message : "Registration failed — please try again");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.42)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 200,
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="animate-slideUp" style={{
        background: "#fff",
        borderRadius: 16,
        padding: "1.75rem",
        width: "min(500px, 94vw)",
        border: "0.5px solid var(--g-mid)",
        maxHeight: "90vh",
        overflowY: "auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--g-text)" }}>Register New Patient</h2>
            <p style={{ fontSize: 12, color: "var(--g-hint)", marginTop: 2 }}>Fill in all fields to create a patient record</p>
          </div>
          <button onClick={onClose} style={{
            background: "var(--g-light)", border: "none",
            width: 32, height: 32, borderRadius: "50%",
            cursor: "pointer", fontSize: 15, color: "var(--g-dark)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="First Name" error={errors.firstName}>
            <input style={inputStyle(!!errors.firstName)} placeholder="e.g. Amara"
              value={form.firstName} onChange={e => set("firstName", e.target.value)} />
          </Field>
          <Field label="Last Name" error={errors.lastName}>
            <input style={inputStyle(!!errors.lastName)} placeholder="e.g. Okafor"
              value={form.lastName} onChange={e => set("lastName", e.target.value)} />
          </Field>

          <Field label="Date of Birth" error={errors.dateOfBirth}>
            <input type="date" style={inputStyle(!!errors.dateOfBirth)}
              value={form.dateOfBirth} onChange={e => set("dateOfBirth", e.target.value)} />
          </Field>
          <Field label="Gender">
            <select style={inputStyle()} value={form.gender} onChange={e => set("gender", e.target.value as Gender)}>
              {GENDERS.map(g => <option key={g}>{g}</option>)}
            </select>
          </Field>

          <Field label="Phone Number" error={errors.phone} full>
            <input style={inputStyle(!!errors.phone)} placeholder="+234 800 000 0000"
              value={form.phone} onChange={e => set("phone", e.target.value)} />
          </Field>

          <Field label="Primary Diagnosis / Reason for Visit" error={errors.diagnosis} full>
            <input style={inputStyle(!!errors.diagnosis)} placeholder="e.g. Hypertension follow-up"
              value={form.diagnosis} onChange={e => set("diagnosis", e.target.value)} />
          </Field>

          <Field label="Blood Type">
            <select style={inputStyle()} value={form.bloodType} onChange={e => set("bloodType", e.target.value as BloodType)}>
              {BLOOD_TYPES.map(b => <option key={b}>{b}</option>)}
            </select>
          </Field>
          <Field label="Assigned Ward">
            <select style={inputStyle()} value={form.ward} onChange={e => set("ward", e.target.value as Ward)}>
              {WARDS.map(w => <option key={w}>{w}</option>)}
            </select>
          </Field>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: "1.25rem", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            background: "var(--g-light)", border: "1px solid var(--g-mid)",
            padding: "10px 22px", borderRadius: 9,
            fontSize: 13, fontWeight: 500, cursor: "pointer", color: "var(--g-text)",
          }}>Cancel</button>
          <button onClick={handleSubmit} disabled={saving} style={{
            background: saving ? "var(--g-muted)" : "var(--g-dark)",
            border: "none", padding: "10px 26px", borderRadius: 9,
            fontSize: 13, fontWeight: 600, cursor: saving ? "default" : "pointer",
            color: "#fff", transition: "background 0.15s",
          }}>
            {saving ? "Registering…" : "Register Patient"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, full, children }: {
  label: string; error?: string; full?: boolean; children: React.ReactNode;
}) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : undefined, display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: "var(--g-muted)", letterSpacing: "0.4px", textTransform: "uppercase" }}>
        {label}
      </label>
      {children}
      {error && <span style={{ fontSize: 11, color: "#a32d2d" }}>{error}</span>}
    </div>
  );
}

const inputStyle = (hasError = false): React.CSSProperties => ({
  padding: "9px 12px",
  border: `1.5px solid ${hasError ? "#e24b4a" : "var(--g-mid)"}`,
  borderRadius: 8,
  fontSize: 13,
  background: hasError ? "#fff5f5" : "var(--g-light)",
  color: "var(--g-text)",
  outline: "none",
  width: "100%",
});