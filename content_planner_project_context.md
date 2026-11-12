# Project Context — Content Planner Marketing

**Last updated:** 12 November 2026

## 1. Project overview

This is a Content Planner dashboard for the Marketing division. It is **not** the user's CRM project.

The application already exists and is operational. The goal is not to rebuild it from scratch, but to assess its current architecture and gradually move development away from the constraints of Google Apps Script (GAS).

## 2. Current architecture

| Layer | Current implementation |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Google Apps Script |
| Database | Google Sheets |
| Backend responsibilities | CRUD operations and business logic |
| Authentication | One shared account for all users |

The main problem is the flexibility of the Apps Script development environment, not a backend that is failing to work.

## 3. User's goals and preferences

- Develop in a more flexible JavaScript environment.
- Use VS Code and OpenCode for AI-assisted coding.
- Use Git/GitHub for version control and deployment workflow.
- Prefer a simple development and deployment setup.
- Avoid unnecessary infrastructure and operational complexity.
- Preserve the existing working application and migrate incrementally.
- Do not assume a database migration is immediately necessary.

## 4. Options discussed

### Hosting and deployment platforms

| Platform | Frontend hosting | Backend capability | Notes |
|---|---|---|---|
| Netlify | Yes | Netlify Functions | Supports serverless JavaScript/TypeScript functions; suitable for a simple integrated frontend + functions workflow. |
| Vercel | Yes | Vercel Functions | Supports serverless functions and modern frontend frameworks. |
| GitHub Pages | Yes | No server-side backend | Static hosting only; backend must be hosted elsewhere. |

Netlify is the tentative preference for simplicity, but this is not a final decision. Check current plan limits, pricing, and commercial-use terms before production deployment.

### Backend approaches

1. **Keep Apps Script:** Move the frontend to Netlify/Vercel while Apps Script continues to provide the API and access Google Sheets.
2. **Serverless backend:** Move CRUD and business logic into Netlify Functions (or Vercel Functions), while retaining Google Sheets through the Google Sheets API.
3. **Conventional Node.js server:** Use Express/Fastify on a separate hosting service or VPS. This provides a persistent server and more runtime control, but adds operational responsibilities.

Given the current requirements and the user's simplicity priority, the tentative recommendation is approach 2, with a gradual migration. A conventional server is not currently necessary unless requirements such as long-running processes, persistent connections, or background workers emerge.

## 5. Tentative target architecture

```text
GitHub repository
       |
       v
Netlify
  ├── Frontend: HTML + CSS + JavaScript
  └── Functions: JavaScript / Node.js
           |
           v
     Google Sheets API
           |
           v
      Google Sheets
```

Possible later evolution:

```text
Netlify frontend
       |
       v
Backend functions
       |
       v
PostgreSQL / Supabase
```

PostgreSQL/Supabase is a future option, not a requirement for the first migration stage.

## 6. Suggested migration strategy

### Stage 0 — Audit the existing application

Before changing anything, inspect:
- Current repository and file/folder structure.
- Apps Script functions and responsibilities.
- CRUD operations and business rules.
- Frontend-to-backend request flow.
- Google Sheets structure, sheet names, columns, and relationships.
- Current deployment and configuration.

### Stage 1 — Separate frontend deployment

Deploy the existing frontend to Netlify (or another selected static host) while keeping Apps Script as the backend and Google Sheets as the database.

### Stage 2 — Replace Apps Script backend incrementally

Move business logic and CRUD into JavaScript serverless functions. Use the Google Sheets API to continue reading and writing the existing spreadsheet.

Map each existing GAS function to its replacement and test behavior before switching production traffic.

### Stage 3 — Reassess the database

Only consider PostgreSQL/Supabase if Google Sheets becomes a meaningful limitation in data integrity, concurrency, query complexity, performance, or maintainability.

## 7. Development workflow

A possible local workflow:

```bash
npm install
npx netlify dev
```

This can run the frontend and Netlify Functions locally for development and testing.

Suggested Git workflow:
1. Keep production code on a production branch (for example, `main`).
2. Develop changes on a separate development branch or feature branches.
3. Test locally.
4. Use deployment previews where available.
5. Merge only after validation.

OpenCode can assist with editing and refactoring the project files, while VS Code remains the development environment.

## 8. Security considerations

- Never expose Google Service Account private keys or backend credentials in frontend JavaScript.
- Store secrets in the hosting platform's environment variables.
- Route database access through backend functions.
- Do not treat an obscure API URL as authentication.
- The current shared-account approach can be retained temporarily if required, but backend endpoints still need access verification.
- Consider individual accounts and authorization later if activity attribution, audit logs, or role-based access become necessary.

## 9. Decisions not yet made

- Final hosting provider: Netlify, Vercel, or another option.
- Whether to keep Apps Script temporarily as the API.
- Whether to use serverless functions or a conventional Node.js server.
- Whether and when to migrate Google Sheets to PostgreSQL.
- Whether to introduce individual user authentication.

Do not treat the tentative architecture as a final implementation decision.

## 10. Next action

The user plans to share the current architecture, project structure, source code, or workflow.

Once provided:
1. Audit the existing implementation first.
2. Identify which parts are tightly coupled to Apps Script.
3. Map existing GAS CRUD/business logic to potential Node.js functions.
4. Assess the Google Sheets data model and API access requirements.
5. Recommend the smallest safe migration plan.
6. Avoid rewriting working components without a clear reason.

---

**Instruction for future conversations:** Use this file as the project context. Continue from the existing Content Planner implementation; do not confuse it with the user's separate CRM/data analytics work. Treat all architecture choices above as provisional until the current source code and architecture have been reviewed.
