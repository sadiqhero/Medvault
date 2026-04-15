// lib/db.ts
import Database from 'better-sqlite3';
import { Patient, PatientStats } from "@/types/patient";
import path from 'path';

// Initialize database
const db = new Database(path.join(process.cwd(), 'patients.db'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS patients (
    id TEXT PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    dateOfBirth TEXT NOT NULL,
    gender TEXT NOT NULL,
    phone TEXT NOT NULL,
    diagnosis TEXT NOT NULL,
    bloodType TEXT NOT NULL,
    ward TEXT NOT NULL,
    status TEXT NOT NULL,
    registeredAt TEXT NOT NULL,
    image TEXT,
    age INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_patients_status ON patients(status);
  CREATE INDEX IF NOT EXISTS idx_patients_registeredAt ON patients(registeredAt);
  CREATE INDEX IF NOT EXISTS idx_patients_name ON patients(firstName, lastName);
`);

// Insert sample data
const samplePatients: Omit<Patient, 'id'>[] = [
  { firstName: "Amara",   lastName: "Okafor",   dateOfBirth: "1990-03-15", gender: "Female", phone: "+234 801 234 5678", diagnosis: "Hypertension follow-up",      bloodType: "O+",  ward: "Cardiology",  status: "pending",    registeredAt: new Date(Date.now() - 3600000).toISOString(), image: "/image1.png", age: 34 },
  { firstName: "Chidi",   lastName: "Nwosu",    dateOfBirth: "1972-07-22", gender: "Male",   phone: "+234 802 345 6789", diagnosis: "Type 2 diabetes management", bloodType: "A+",  ward: "General",     status: "pending",   registeredAt: new Date(Date.now() - 3600000).toISOString(), image: "/image1.png", age: 52 },
  { firstName: "Fatima",  lastName: "Hassan",   dateOfBirth: "1997-11-08", gender: "Female", phone: "+234 803 456 7890", diagnosis: "Prenatal checkup",           bloodType: "B+",  ward: "Pediatrics",  status: "active",    registeredAt: new Date(Date.now() - 7200000).toISOString(), image: "/image1.png", age: 27 },
  { firstName: "Emeka",   lastName: "Eze",      dateOfBirth: "1963-01-30", gender: "Male",   phone: "+234 804 567 8901", diagnosis: "Prostate cancer treatment",  bloodType: "AB-", ward: "Oncology",    status: "critical",  registeredAt: new Date(Date.now() - 10800000).toISOString(), image: "/image1.png", age: 61 },
  { firstName: "Ngozi",   lastName: "Adeyemi",  dateOfBirth: "1979-05-18", gender: "Female", phone: "+234 805 678 9012", diagnosis: "Migraine evaluation",        bloodType: "O-",  ward: "Neurology",   status: "active",    registeredAt: new Date(Date.now() - 86400000).toISOString(), image: "/image1.png", age: 45 },
  { firstName: "Yusuf",   lastName: "Bello",    dateOfBirth: "1986-09-12", gender: "Male",   phone: "+234 806 789 0123", diagnosis: "Acute appendicitis",         bloodType: "A-",  ward: "General",     status: "pending",   registeredAt: new Date(Date.now() - 172800000).toISOString(), image: "/image1.png", age: 38 },
  { firstName: "Ifeoma",  lastName: "Ogbu",     dateOfBirth: "1995-12-03", gender: "Female", phone: "+234 807 890 1234", diagnosis: "Asthma management",          bloodType: "B-",  ward: "Cardiology",  status: "active",    registeredAt: new Date(Date.now() - 259200000).toISOString(), image: "/image1.png", age: 29 },
  { firstName: "Taiwo",   lastName: "Akinola",  dateOfBirth: "1988-06-25", gender: "Male",   phone: "+234 808 901 2345", diagnosis: "Knee replacement surgery",   bloodType: "O+",  ward: "General",     status: "discharged",registeredAt: new Date(Date.now() - 345600000).toISOString(), image: "/image1.png", age: 36 },
  { firstName: "Blessing",lastName: "Obi",      dateOfBirth: "2001-02-14", gender: "Female", phone: "+234 809 012 3456", diagnosis: "Anemia treatment",           bloodType: "AB+", ward: "General",     status: "active",    registeredAt: new Date(Date.now() - 432000000).toISOString(), image: "/image1.png", age: 23 },
  { firstName: "Musa",    lastName: "Garba",    dateOfBirth: "1958-08-07", gender: "Male",   phone: "+234 810 123 4567", diagnosis: "Cardiac arrhythmia",         bloodType: "A+",  ward: "Cardiology",  status: "critical",  registeredAt: new Date(Date.now() - 518400000).toISOString(), image: "/image1.png", age: 66 },
];

// Check if table is empty before inserting sample data
const count = db.prepare('SELECT COUNT(*) as count FROM patients').get() as { count: number };
if (count.count === 0) {
  const insertStmt = db.prepare(`
    INSERT INTO patients (id, firstName, lastName, dateOfBirth, gender, phone, diagnosis, bloodType, ward, status, registeredAt, image, age)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  let nextId = 41; // Start from PT-0042 (since samples go to PT-0032)
  for (const patient of samplePatients) {
    const id = `PT-${String(++nextId).padStart(4, "0")}`;
    insertStmt.run(
      id, patient.firstName, patient.lastName, patient.dateOfBirth,
      patient.gender, patient.phone, patient.diagnosis, patient.bloodType,
      patient.ward, patient.status, patient.registeredAt, patient.image, patient.age
    );
  }
}



// ✅ Replace with a function that reads the real max from DB:
function getNextId(): number {
  const row = db.prepare(`
    SELECT MAX(CAST(REPLACE(id, 'PT-', '') AS INTEGER)) as maxId 
    FROM patients
  `).get() as { maxId: number | null };
  return (row.maxId ?? 41) + 1;
}


export function getAllPatients(): Patient[] {
  const stmt = db.prepare(`
    SELECT * FROM patients 
    ORDER BY datetime(registeredAt) DESC
  `);
  return stmt.all() as Patient[];
}

export function searchPatients(query: string): Patient[] {
  const q = `%${query.toLowerCase().trim()}%`;
  if (!query.trim()) return getAllPatients();
  
  const stmt = db.prepare(`
    SELECT * FROM patients 
    WHERE LOWER(firstName) LIKE ? 
       OR LOWER(lastName) LIKE ?
       OR LOWER(firstName || ' ' || lastName) LIKE ?
       OR LOWER(id) LIKE ?
       OR LOWER(diagnosis) LIKE ?
       OR LOWER(ward) LIKE ?
    ORDER BY datetime(registeredAt) DESC
  `);
  
  return stmt.all(q, q, q, q, q, q) as Patient[];
}

export function getPatientById(id: string): Patient | undefined {
  const stmt = db.prepare('SELECT * FROM patients WHERE id = ?');
  return stmt.get(id) as Patient | undefined;
}

export function getStats(): PatientStats {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  
  const totalStmt = db.prepare('SELECT COUNT(*) as count FROM patients');
  const monthStmt = db.prepare('SELECT COUNT(*) as count FROM patients WHERE registeredAt >= ?');
  const todayStmt = db.prepare('SELECT COUNT(*) as count FROM patients WHERE registeredAt >= ?');
  
  const total = (totalStmt.get() as { count: number }).count;
  const currentMonth = (monthStmt.get(startOfMonth) as { count: number }).count;
  const today = (todayStmt.get(startOfDay) as { count: number }).count;
  
  return { total, currentMonth, today };
}

export function addPatient(input: Omit<Patient, "id" | "registeredAt" | "age" | "status">): Patient {
  const dob = new Date(input.dateOfBirth);
  const now = new Date();
  const age = now.getFullYear() - dob.getFullYear() -
    (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);

  const id = `PT-${String(getNextId()).padStart(4, "0")}`; // ✅ dynamic

  const newPatient: Patient = {
    ...input,
    id,
    age,
    status: "pending",
    registeredAt: now.toISOString(),
  };

  const insertStmt = db.prepare(`
    INSERT INTO patients (id, firstName, lastName, dateOfBirth, gender, phone, diagnosis, bloodType, ward, status, registeredAt, image, age)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertStmt.run(
    newPatient.id, newPatient.firstName, newPatient.lastName, newPatient.dateOfBirth,
    newPatient.gender, newPatient.phone, newPatient.diagnosis, newPatient.bloodType,
    newPatient.ward, newPatient.status, newPatient.registeredAt, newPatient.image, newPatient.age
  );

  return newPatient;
}

export function getRecentPatients(limit = 5): Patient[] {
  const stmt = db.prepare(`
    SELECT * FROM patients 
    ORDER BY datetime(registeredAt) DESC 
    LIMIT ?
  `);
  return stmt.all(limit) as Patient[];
}

// Optional: Add update and delete functions
export function updatePatientStatus(id: string, status: Patient['status']): void {
  const stmt = db.prepare('UPDATE patients SET status = ? WHERE id = ?');
  stmt.run(status, id);
}

export function deletePatient(id: string): void {
  const stmt = db.prepare('DELETE FROM patients WHERE id = ?');
  stmt.run(id);
}

// Close database connection when needed (for graceful shutdown)
export function closeDatabase(): void {
  db.close();
}