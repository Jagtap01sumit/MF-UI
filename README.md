GET    /api/amcs

GET    /api/amcs/:amcId/schemes

GET    /api/schemes/:schemeId/dashboard

GET    /api/schemes/:schemeId/top-holdings

GET    /api/schemes/:schemeId/top-increases

GET    /api/schemes/:schemeId/top-reductions

GET    /api/schemes/:schemeId/new-entries

GET    /api/schemes/:schemeId/exits

GET    /api/schemes/:schemeId/sector-allocation

GET    /api/schemes/:schemeId/monthly-trend


Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database


| # | Layer          | Responsibility                                                                                   |
| - | -------------- | ------------------------------------------------------------------------------------------------ |
| 1 | **Route**      | Receives HTTP request (`GET`, `POST`, etc.) and forwards it to the controller.                   |
| 2 | **Controller** | Handles request/response logic. Reads params, query params, body, and returns `Response.json()`. |
| 3 | **Service**    | Contains business logic and application rules.                                                   |
| 4 | **Repository** | Handles database access and SQL queries only.                                                    |
| 5 | **Database**   | Stores and retrieves actual data.                                                                |


GET /api/amcs/1/dashboard

GET /api/amcs/1/top-holdings

GET /api/amcs/1/top-increases

GET /api/amcs/1/top-reductions

GET /api/amcs/1/new-entries

GET /api/amcs/1/exits

GET /api/amcs/1/sector-allocation

GET /api/amcs/1/monthly-trend


components/
│
├── filters/
│   ├── AmcDropdown.jsx
│   ├── SchemeDropdown.jsx
│   └── FilterBar.jsx
│
├── cards/
│   ├── MetricCard.jsx
│   └── SummaryCards.jsx
│
├── charts/
│   ├── MonthlyTrendChart.jsx
│   └── SectorAllocationChart.jsx
│
├── tables/
│   ├── TopHoldingsTable.jsx
│   ├── TopIncreasesTable.jsx
│   ├── TopReductionsTable.jsx
│   ├── NewEntriesTable.jsx
│   └── ExitsTable.jsx
│
├── common/
│   ├── Loader.jsx
│   ├── ErrorState.jsx
│   └── EmptyState.jsx
│
└── dashboard/
    └── DashboardContent.jsx# PostgreSQL Local → Supabase Migration Guide

## Prerequisites

* Local PostgreSQL database running
* pgAdmin installed
* Supabase account

---

## Step 1: Create Supabase Project

1. Login to Supabase.

2. Create a new project.

3. Wait for the database setup to complete.

4. Open:

   Settings → Database

5. Keep the connection details handy.

---

## Step 2: Backup Local PostgreSQL Database

Using pgAdmin:

1. Right-click Database.
2. Select Backup.
3. Format: Custom.
4. Save file as:

```text
database.backup
```

---

## Step 3: Restore Backup to Supabase

### Method A (Recommended)

In pgAdmin:

1. Create a new server connection.

Server Details:

```text
Host: db.<project-ref>.supabase.co
Port: 5432
Database: postgres
Username: postgres
Password: <database-password>
```

2. Connect to Supabase.
3. Right-click the target database.
4. Click Restore.
5. Select:

```text
database.backup
```

6. Start Restore.

---

## Step 4: Verify Migration

Run:

```sql
SELECT * FROM amcs;
```

Verify:

* Tables exist
* Data exists
* Relationships exist

---

## Step 5: Get Supabase Connection String

Navigate to:

Settings → Database → Connection String

Example:

```text
postgresql://postgres.xxxxx:password@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
```

---

## Step 6: Update Local Environment Variables



###  Using Separate Variables

```env
DB_HOST=aws-0-ap-south-1.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres.xxxxx
DB_PASSWORD=your_password
```

Connection:

```js
import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});
```

---

## Step 7: Test Locally

Restart Next.js:

```bash
npm run dev
```



## Migration Checklist

* [ ] Create Supabase project
* [ ] Backup local database
* [ ] Restore backup to Supabase
* [ ] Verify tables and data
* [ ] Copy Supabase connection string
* [ ] Update .env.local
* [ ] Test locally
* [ ] Update Vercel environment variables
* [ ] Redeploy
* [ ] Verify production API responses
