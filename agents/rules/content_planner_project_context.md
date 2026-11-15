# Project Context — Content Planner Marketing

**Last updated:** 15 November 2026

## 1. Project overview

This is a Content Planner dashboard for the Marketing division. It is **not** the user's CRM project.

The application already exists and is operational. Refactor incrementally: preserve its behavior and vanilla frontend while improving separation of concerns and maintainability. The active API has moved to Netlify Functions; Apps Script is legacy/reference material and still owns external social-metrics ETL.

## 2. Current architecture

| Layer | Current implementation |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Netlify Functions (Node.js ESM) |
| Storage | Google Sheets API |
| Backend responsibilities | API authentication, planner CRUD, social dashboard reads |
| Authentication | One shared account for all users |

The deployed application is operational. The planner backend uses Netlify Functions; Apps Script remains relevant as a legacy reference and for upstream social analytics ETL.

## 3. User's goals and preferences

- Develop in a more flexible JavaScript environment.
- Use VS Code and OpenCode for AI-assisted coding.
- Use Git/GitHub for version control and deployment workflow.
- Prefer a simple development and deployment setup.
- Avoid unnecessary infrastructure and operational complexity.
- Preserve the existing working application and migrate incrementally.
- Do not assume a database migration is immediately necessary.

## 4. Current operating choices

### Hosting and deployment platforms

| Platform | Frontend hosting | Backend capability | Notes |
|---|---|---|---|
| Netlify | Current | Netlify Functions | Hosts the static frontend and serverless API in this repository. |
| Vercel | Yes | Vercel Functions | Supports serverless functions and modern frontend frameworks. |
| GitHub Pages | Yes | No server-side backend | Static hosting only; backend must be hosted elsewhere. |

Netlify is the current deployment configuration (`netlify.toml`). Reassess only if a concrete requirement or cost/plan limit calls for it.

### Backend approaches

1. **Keep Apps Script as reference/ETL:** Apps Script remains responsible for external social analytics collection and ETL; it is not the website CRUD API.
2. **Serverless backend (current):** Netlify Functions provide the authenticated CRUD API and social analytics read endpoint, using Google Sheets API.
3. **Conventional Node.js server:** Use Express/Fastify on a separate hosting service or VPS. This provides a persistent server and more runtime control, but adds operational responsibilities.

The current implementation uses approach 2. A conventional server is not currently necessary unless requirements such as long-running processes, persistent connections, or background workers emerge.

## 5. Current architecture

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

## 6. Refactor strategy

### Preserve first

Before changing anything, inspect:
- Current repository and file/folder structure.
- Apps Script functions and responsibilities.
- CRUD operations and business rules.
- Frontend-to-backend request flow.
- Google Sheets structure, sheet names, columns, and relationships.
- Current deployment and configuration.

- Preserve browser behavior, sheet names/headers, API action names and response shapes, authentication, and social analytics read-only access.
- Keep the vanilla stack and Netlify deployment. Do not migrate frameworks, hosting, or databases for tidiness alone.
- Improve boundaries incrementally (HTTP handler, action dispatch, session auth, planner store, social analytics) and cover changes with synthetic tests.
- Reassess PostgreSQL/Supabase only if Sheets creates demonstrated integrity, concurrency, query, performance, or maintenance problems.

## 7. Development workflow

A local workflow:

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

## 9. Decisions to revisit only when requirements change

- Whether Netlify remains the best hosting choice.
- Whether Sheets remains adequate as storage.
- Whether individual user authentication is needed beyond the current shared access model.

Do not treat the tentative architecture as a final implementation decision.

## 10. Ongoing development guidance

Audit the current implementation and existing rules before changes. Prefer small, testable architecture improvements over rewrites. Never expose secrets, write to the social analytics spreadsheet, or invent data contracts.

---

**Instruction for future conversations:** Use this file as project context. Continue from the existing Content Planner implementation; do not confuse it with the user's separate CRM/data analytics work.
