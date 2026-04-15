export type PatientStatus = "active" | "pending" | "critical" | "discharged";
export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type Ward = "General" | "Cardiology" | "Pediatrics" | "Oncology" | "Neurology" | "Emergency";
export type Gender = "Male" | "Female" | "Other";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  dateOfBirth: string;
  gender: Gender;
  phone: string;
  diagnosis: string;
  bloodType: BloodType;
  ward: Ward;
  status: PatientStatus;
  registeredAt: string;
  age: number;
}

export interface NewPatientInput {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  phone: string;
  image: string;
  diagnosis: string;
  bloodType: BloodType;
  ward: Ward;
}

export interface PatientStats {
  total: number;
  currentMonth: number;
  today: number;
}
