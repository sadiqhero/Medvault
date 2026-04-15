# Welcome to 07 Backend Integration
***
## Task
Building a hospital patient management dashboard requires persisting patient records across sessions. The challenge is connecting a Next.js frontend to a real database — handling data reads, writes, search, and live updates without data loss on server restart.

## Description
Solved using **better-sqlite3** as a lightweight local database. A `lib/db.ts` module initializes the schema, seeds sample patients, and exposes typed functions (`addPatient`, `getAllPatients`, `searchPatients`). Next.js API routes (`/api/patients`) bridge the frontend to the database. SWR handles client-side fetching and cache revalidation after mutations.

## Installation
```bash
npm install
```
Requires Node.js 18+. The SQLite database file (`patients.db`) is auto-created in the project root on first run.

## Usage
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Register a patient** → click "New Patient", fill the form, submit
- **Search records** → type 2+ characters in the search bar to query by name, ID, ward, or diagnosis
- **View a patient** → click any patient card or search result to navigate to `/patients/[id]`
- **Browse all records** → click "All Patients" to open the filterable, sortable table
- **About** → click "About" to know more about MedVault
- **Logout** → click "logout" to navigate to the login page
- **CICD** → click "TESTING"

### The Core Team
**Abubakar Ibrahim**

<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>