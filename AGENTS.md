# AGENTS.md — Dashboard Markom

## Objective
Implement the Social Media Dashboard V1 in the existing Dashboard menu (`dashboardView`). Use Art Design Pro as the chart/UI reference, not a new application framework. Preserve Beranda, Content Planner, existing Analytics, navigation, authentication, settings and API contracts. Read `DASHBOARD_IMPLEMENTATION.md` before making changes. Its data contract supersedes older raw-sheet mapping guidance.

## Project constraints
- Existing stack: vanilla HTML/CSS/JavaScript, Netlify Functions (Node ESM), Google Sheets, googleapis, Apache ECharts browser distribution. No Vue/Vite migration or new database.
- Production source: `master` and `audience_snapshot` in `get_data_markom`; Apps Script owns ETL and writes. Backend is read-only for this spreadsheet. Raw platform sheets are not dashboard API sources.
- Daily data collection starts around 01:00 WIB; Master ETL scheduled after collection (03:00–04:00 WIB). TikTok import is semi-automatic; capture audience only after fresh data arrives. Do not add hourly ETL or collection jobs.
- Python historical backfill is a one-time local utility, not a production dependency, deployment, or repository component.
- MVP metrics: published content, reported views, likes/reactions, comments, shares, saves, interactions; audience separately. Do not require reach, retention, watch time, category or YouTube classification to release V1.
- Write readable multiline code, consistent indentation with host conventions, clear function names, small helpers, meaningful comments, and centralized configuration. No minified custom source or one-line functions. Vendored third-party minified distribution is an exception.
- Keep secrets in server-side environment variables; never commit credentials or expose tokens. No actual user data in fixtures. Never write to social analytics sheets from the website.
- Use the existing authenticated POST API transport. Prefer a single dashboard action, with shared pure aggregation functions and tests. Do not create a second auth scheme.
- Report missing values and metric provenance; do not convert blanks to zero, treat reactions as exact likes, or represent cumulative lifetime views as daily growth.

## Upstream reference
- Repository: https://github.com/Daymychen/art-design-pro (MIT)
- Demo: https://www.artd.pro
- Docs: https://www.artd.pro/docs
- Upstream stack: Vue 3, TypeScript, Vite, Element Plus, Tailwind CSS, Apache ECharts.
- Inspect the actual upstream revision before implementation; paths and APIs may change.

## Modern web platform guidance
- Reference repository: https://github.com/GoogleChrome/modern-web-guidance
- The repository is checked out as a Git submodule at `references/modern-web-guidance/`, outside Netlify's `public/` directory.
- Consult relevant guidance for browser APIs, accessibility, performance, and compatibility when changing frontend code.
- Apply guidance selectively to this vanilla HTML/CSS/JavaScript application. Do not introduce a framework, polyfill, or dependency solely because a guide demonstrates it.
- Keep the submodule commit pinned in Git; review upstream changes before updating it. Do not copy its guide content into the deployed site.

Reference paths (verify against checkout):
- `src/components/core/charts/` — reusable chart components; inspect available line, bar, donut/pie and other chart types.
- `src/components/core/charts/art-bar-chart/index.vue` — verified example of shared chart styling, gradients, rounded bars, multi-series and stacking.
- `src/hooks/core/useChart` — shared chart lifecycle and options helpers, imported by the bar chart.
- `src/plugins/echarts` — ECharts integration.
- `src/types/component/chart` — typed chart props.
- `src/views/dashboard/console/` and `src/views/dashboard/analysis/` — dashboard composition references; inspect actual files.
- `src/components/core/cards/` — chart card and KPI card references.

If network access is available, clone the reference outside the working project (do not overwrite the current repo):
```sh
git clone --depth 1 https://github.com/Daymychen/art-design-pro.git art-design-pro-reference
```
Run that command from a separate temporary/reference directory. Record the upstream commit with `git rev-parse HEAD`. If unavailable, report the limitation rather than inventing upstream details.

## Workflow
1. Inspect the current project: framework, package manager, chart library, theme tokens, dashboard routes, chart components, data sources and existing AGENTS.md instructions.
2. Compare the actual upstream chart components and dashboard examples with the current implementation. Identify reusable visual patterns and gaps.
3. Present a short implementation plan with affected files, chart mappings and dependency changes before editing. In plan-only mode, stop after the plan. Ask before changing framework, replacing a chart library, or altering data contracts.
4. Implement in small, focused changes. If current project is Vue/ECharts, reuse compatible abstractions; otherwise adapt the visual patterns to the existing stack rather than copying Vue code blindly.
5. Run existing lint, typecheck, tests and production build scripts as applicable. Inspect rendered dashboard at desktop and mobile sizes if browser tooling is available. Report what was actually verified.

## Visual requirements
- Clean card layout with clear title, optional subtitle, compact period filter and sufficient chart padding. Match the host design tokens; avoid hard-coded light backgrounds.
- Use restrained palette, primary-color accents, rounded bars, subtle gridlines, readable axes, and consistent legend/tooltip styling. Use gradients and smooth curves only where appropriate; avoid misleading smoothing of discrete values.
- Line/area charts: thin clear strokes, optional subtle area fill, comparison series distinguishable by color and line style.
- Bar charts: rounded ends, consistent spacing, grouped or stacked only when semantically appropriate; baseline zero for magnitude comparisons.
- Donut charts: clear category legend, values and shares, optional center total. Do not imply meaningful percentages for zero totals or negative values.
- Responsive chart containers: sensible heights, no clipped labels or overflow, resize on container/sidebar changes, dispose instances and observers on unmount.
- Light/dark theme support, accessible contrast, non-color-only distinctions, reduced-motion support where feasible.
- Loading, empty, error and zero-value states must be distinct. A valid zero is not missing data.
- Use consistent locale-aware number/date formatting. For Indonesian financial dashboards use `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })` where applicable. Compact axis labels may use abbreviations, but tooltips should show exact values.

## Suggested chart mapping (adapt to actual dashboard data)
| Data purpose | Chart | Behavior |
|---|---|---|
| Trend over time | Line / area | Period filter; actual and target where available |
| Category comparison | Grouped bar / horizontal bar | Clear labels and values |
| Contribution share | Donut | Exact values and percentage |
| Actual vs target | Grouped bar or progress indicator | Consistent units; target visible |
| KPI trend | Sparkline | Compact, no redundant labels |

Do not invent metrics or add charts without a valid data source. Preserve existing calculations, filters, drilldowns and date ranges. If mock data is necessary, isolate it and label it clearly. Do not silently replace real data. Keep shared chart styling separate from business-specific data transformations.

## Acceptance criteria
- Charts visually follow Art Design Pro patterns while fitting the existing dashboard.
- Existing data, filters, navigation and business logic continue to work.
- Charts respond to viewport and container size changes, and both themes if supported by the host.
- Tooltips, legends, units, missing values and zero values are correct.
- No unnecessary dependency or framework migration; retain MIT copyright/license notices for copied upstream code.
- Final report lists changed files, upstream commit if available, checks run and results, and remaining limitations. Do not claim tests or visual inspection that were not performed.
