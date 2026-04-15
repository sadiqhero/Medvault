# Platform Insights — Healthcare Backend Integration
> Personal engineering notes from building a hospital patient management system.
---

## Domain: Why Healthcare Is Different

Healthcare software operates under constraints that most web applications never face. Data isn't just sensitive — it's legally protected. A patient record isn't a user profile; it carries diagnosis history, treatment data, and identifiers that can affect someone's insurance, employment, and personal safety. Building in this domain forced a shift in mindset: **correctness and auditability matter more than speed of delivery**.

---

## HIPAA Compliance — What I Learned

**HIPAA (Health Insurance Portability and Accountability Act)** governs how Protected Health Information (PHI) must be handled in the United States. PHI includes any data that can identify a patient — name, date of birth, phone number, diagnosis, medical record ID.

### Key rules that directly affected this project:

| Rule | What it means in practice |
|---|---|
| **Minimum Necessary** | Only collect and expose data that is actually needed for the task |
| **Access Controls** | Patient records should only be accessible to authorized roles |
| **Audit Trails** | Every read and write to PHI should be logged with timestamp and actor |
| **Data at Rest Encryption** | The SQLite `patients.db` file should be encrypted in a production deployment |
| **Data in Transit** | All API routes must be served over HTTPS — never plain HTTP |
| **Breach Notification** | Any unauthorized access must be reported within 72 hours |

---

## Technical Decisions & Why

### SQLite over PostgreSQL
Chose `better-sqlite3` for zero-config local development. The synchronous API simplified error handling in early stages. In production, a healthcare system would migrate to PostgreSQL with row-level security and encrypted storage.

### Patient ID Format (`PT-XXXX`)
Human-readable IDs help clinical staff reference records verbally — a meaningful design choice in healthcare. The format mirrors real Medical Record Numbers (MRNs) used in hospitals.

### Status Model (`active` / `pending` / `critical` / `discharged`)
Derived from real triage and ward management workflows. The `critical` status in particular should trigger escalation logic in a real system — alerts to on-call staff, priority queue placement, and automatic audit logging.

### Age Calculated at Write Time
Age is stored alongside date of birth rather than computed on every read. This trades slight staleness (age won't auto-increment on a patient's birthday) for query simplicity — a deliberate tradeoff noted for future improvement.

---

## Challenges Faced

**1. Import path mismatch crashing the API**
The route file imported from `@/lib/data` while the actual module lived at `@/lib/db`. This caused a silent 500 on every POST request. Lesson: in Next.js API routes, errors are swallowed unless you explicitly log `error.message` — always add debug logging early.

**2. ID counter resetting on server restart**
The `nextId` variable was initialized statically at module load, meaning after a restart it would start at 42 again and collide with existing records. Fixed by querying `MAX(id)` from the database at runtime. Lesson: never trust in-memory counters for persistent IDs.

**3. Search dropdown closing before click registered**
The `onBlur` event on the search input fired before the result's `onClick`, causing the dropdown to vanish before navigation. Fixed with a `setTimeout(() => setOpen(false), 180)` delay. A known browser event-ordering quirk worth remembering.

---

## Healthcare UX Insights

- **Density matters** — clinical staff scan large amounts of information quickly. Dense tables with clear hierarchy outperform card-heavy layouts in ward contexts.
- **Status visibility is critical** — color-coded status badges (`critical` in red, `active` in green) aren't decoration; they're functional signals in a high-pressure environment.
- **Search must be fast and forgiving** — nurses and doctors search by partial name, ward, or diagnosis. Fuzzy, multi-field search is a usability requirement, not a nice-to-have.
- **No dead ends** — every patient entry point (search result, recent card, table row) should navigate to the full record. Users should never have to backtrack to find a route to the data they need.

---

## What I Would Build Next

- [ ] Audit log table — record every `GET /patients/:id` with user ID and timestamp
- [ ] Encrypt `patients.db` at rest using SQLCipher
- [ ] Patient vitals timeline — append-only records attached to each patient
- [ ] Discharge workflow with summary report generation (PDF export)
- [ ] HIPAA-compliant activity dashboard for administrators

---

*Built during the Qwasar SV Backend Integration module — applying real-world healthcare domain constraints to a full-stack Next.js project.*