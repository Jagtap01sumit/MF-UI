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
    └── DashboardContent.jsx