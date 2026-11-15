# Dashboard Markom — Implementation Plan V1

## 1. Scope and current state

- Existing repository: https://github.com/frqwuzhere/dashboard_markom
- Visual reference: https://github.com/Daymychen/art-design-pro
- Social analytics spreadsheet: https://docs.google.com/spreadsheets/d/1Baza-FhKcfIFJujwYohv6aOihVV0XC416-POe--8w-g/edit
- Based on uploaded repository archive commit `fe6486e34d5d914b997860a19e8121bd5b5eb96f`, latest provided Master/Audience Apps Script files, and user's confirmation that Google Sheets is ready. Verify the live checkout and headers before editing. The live post-ETL sheet has not been re-audited for this brief.
- Goal: deliver working Social Media Dashboard MVP. No redesign of other menus and no additional API collection work. Python backfill is out of scope.

## 2. Production architecture

```text
Instagram / Facebook / YouTube APIs -> Apps Script daily sync
TikTok third-party import -> tiktok_fix (semi-automatic)
                         |
Raw sheets: post, facebook_page, tiktok_fix, youtube
                         |
Apps Script daily ETL -> master
Account snapshots -> audience_snapshot
                         |
Authenticated Netlify API (read-only)
                         |
Dashboard menu / Vanilla JS / Apache ECharts
```

Raw collection begins around 01:00 WIB. Master ETL is intended to run once daily after raw collection, around 03:00–04:00 WIB. Time-based triggers do not guarantee successful upstream completion. The website never triggers collection or writes back to analytics sheets. TikTok snapshot is captured after confirmed fresh import, not simply at midnight. No new triggers required for the website. Do not assume all platforms are equally fresh.

## 3. Repository integration

Verified in the supplied archive (recheck current branch):

- `public/js/app.js`: `VIEWS.dashboard` = Beranda; `VIEWS.dashboardView` = Dashboard; `VIEWS.analytics` = existing planner Analytics. In `render()` near line 378 the target is `dashboardView:()=>''`. Replace only that empty route with Social Media Dashboard and mount after `#view.innerHTML` is assigned. Preserve all other mappings and current planner account scope behavior. Dashboard platform filter is independent of planner account selection; label its scope explicitly.
- Existing `api(fn,...args)` posts `{action,args}` to `/.netlify/functions/api`, with Bearer token, returns `result.data`. Use this helper; do not bypass authentication.
- `netlify/functions/api.mjs`: add `getSocialDashboardData` case in `dispatch` **after existing validToken check**. Do not alter `authenticate`, planner schema, `ensureSheets`, or `syncMetrics` behavior. Existing planner `GOOGLE_SHEET_ID` stays unchanged.
- Existing theme uses `applyPrefs()` and CSS variables; inspect light/dark/system behavior and left/right sidebar. Reuse host variables (`--ac`, `--bg`, `--card`, `--card2`, `--line`, `--ink`, `--ink2`, `--ink3`, `--r-lg`, `--sh`, `--fd`, `--fb`) where present.
- Netlify publishes `public/`; no bundler in supplied archive. Load pinned licensed ECharts browser distribution before app integration, locally under `public/vendor/` with license notice. Do not assume npm-installed files are publicly served. Choose and record compatible version after checking current project.

Proposed files (adapt only if checkout requires):

```text
AGENTS.md
DASHBOARD_IMPLEMENTATION.md
public/index.html                         # asset loading
public/js/app.js                          # route/lifecycle hooks
public/js/social-dashboard.js             # dashboard only
public/css/social-dashboard.css           # scoped styles
public/vendor/echarts.min.js               # pinned browser distribution
public/vendor/echarts.LICENSE             # upstream notice
netlify/functions/api.mjs                 # authenticated dispatch
netlify/functions/lib/social-metrics.mjs  # parsing, filters, aggregation
tests/social-metrics.test.mjs             # synthetic fixtures
```

## 4. Environment and read-only data access

Set server-only Netlify variable:

```dotenv
GOOGLE_SOCIAL_SHEET_ID=1Baza-FhKcfIFJujwYohv6aOihVV0XC416-POe--8w-g
```

Reuse existing Google service account credentials through `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY`, or local `GOOGLE_APPLICATION_CREDENTIALS` as supported by existing app. Share analytics spreadsheet with service account as Viewer. Prefer a read-only Sheets OAuth scope for the social reader, without changing planner write access. Existing API_TOKEN_SECRET remains unchanged. Missing analytics configuration must return a clear sanitized error; do not fall back to planner spreadsheet. Never publish spreadsheet or credentials to browser.

Use Sheets `values.batchGet` (or separate reads with equivalent semantics) for `master!A:Y` and `audience_snapshot!A:F`, `valueRenderOption: UNFORMATTED_VALUE`, `dateTimeRenderOption: SERIAL_NUMBER`. Map headers dynamically, not offsets. No writes or `ensureSheets` against analytics spreadsheet. Explicitly distinguish absent source/error from legitimate empty data. If audience is unavailable, allow content dashboard with audience error; if master is unavailable, report error rather than displaying zero KPIs.

## 5. Data contract — master

One row = one publication on one platform. Cross-posts count separately. IDs are strings; do not cast to Number. Preserve zero versus blank/null. Required header schema matches supplied `master_social_media.gs`:

| Column | Type / semantics |
|---|---|
| content_id | string, unique, `ig_`, `fb_`, `tt_`, `yt_` prefix plus native ID |
| platform_content_id | string, native ID |
| platform | Instagram / Facebook / TikTok / YouTube |
| published_date | ISO local date `YYYY-MM-DD` (Asia/Jakarta) |
| published_time | `HH:mm:ss`, null if unknown |
| title | string or null |
| caption | string or null |
| content_type | Image, Carousel, Reels, Video, Shorts, Live Stream, Story, Mixed, Other, Unknown |
| url | http(s) URL or null |
| views | nonnegative number or null; reported cumulative views |
| views_type | source definition, e.g. views, post_media_view, legacy_mixed_views, provider_viewers_unverified |
| reach | optional numeric or null |
| unique_views | optional numeric or null; suspect historical FB zero excluded by ETL |
| likes | numeric or null; not FB total reactions |
| reactions | numeric or null; FB reactions separate |
| comments | numeric or null |
| shares | numeric or null |
| saves | numeric or null; unavailable for some platforms |
| interactions | sum of available primary reactions/likes, comments, shares, saves; null if none |
| common_interactions | primary likes/reactions + comments, only if both available |
| interaction_completeness | Complete / Partial / Unavailable |
| duration_seconds | optional numeric or null |
| avg_watch_time_seconds | optional numeric or null |
| category | optional string; may be blank |
| last_updated | source-local datetime text `YYYY-MM-DD HH:mm:ss` or null |

Validate the headers and unique IDs. Fail on duplicate IDs or invalid publication dates rather than silently double-count. Optional metrics with invalid values should become null with a quality warning, not zero. Numeric cells preferred; do not guess ambiguous formatted strings. Keep publication dates as local ISO strings; do not parse date-only values using local browser timezone. For `last_updated`, distinguish source time from fetch time. Do not infer Shorts by duration or invent categories. Existing ETL is authority for mapping, including Facebook legacy views fallback and TikTok provider viewers. Do not rebuild ETL in browser.

## 6. Data contract — audience_snapshot

| Column | Type / semantics |
|---|---|
| snapshot_date | native Sheets date (serial in API); accept legacy ISO text |
| platform | same enum as master |
| account_id | string; TikTok may use handle |
| followers | nonnegative count or null |
| subscribers | nonnegative count or null; YouTube |
| captured_at | native Sheets datetime serial or valid source timestamp |

Normalize serial dates using epoch 1899-12-30; interpret date/time serial as sheet-local calendar values, not UTC instants. Normalize text and numeric dates to identical `YYYY-MM-DD` keys. Deduplicate by platform + account_id + snapshot_date; keep latest valid captured_at, warn on ambiguity. No fabricated historical snapshots. Use followers for IG/FB/TT and subscribers for YT; never sum per-content snapshots. For selected period, show most recent actual observation at or before end date with its date, flag stale data and indicate if observation predates start. Growth only if two actual observations exist in relevant window; show dates and change, otherwise N/A. Do not interpolate TikTok missing days or treat no observation as zero. For multiple accounts, calculate per-account and only sum comparable latest observations with coverage disclosed. Label any total as combined account audiences, not unique people. Current archive/source uses one account per platform, verify live data.

## 7. Aggregation rules (V1)

- Content count = number of filtered publication rows. Global filters: inclusive `startDate`, `endDate` (WIB), platform (all or subset); optional content type, if useful. Same filtered cohort for all content cards/charts/table. Audience filters use snapshot dates, not publication dates; label separately.
- Reported views = sum of available views. If none, null. Show coverage (valid/total) and definition/provenance warnings for mixed or unverified views. Never label as unique reach. Facebook legacy mixed views and TikTok viewer definition require caveat.
- Primary engagement = Facebook `reactions`, other platforms `likes`. Show label “Likes / Reactions” for combined views; never double count. Interactions = sum of available primary + comments + shares + saves. Validate stored total against components; use computed value on mismatch and report issue. Do not add native total on top. Component totals with no data are null (N/A); explicit zero remains zero. Show completeness coverage; no implication saves are supported on every platform.
- Comparable engagement rate: `100 * sum(common_interactions) / sum(views)` over same eligible rows where primary + comments exist and reported views > 0. Call it “Likes/Reactions + Comments per reported view”. This is a proxy, not strict cross-platform equivalence; caveat reactions and mixed view definitions. Exclude invalid/missing rows and disclose denominator coverage. For platform-specific optional total interaction rate, label separately and disclose completeness. Do not average per-post rates or compare mismatched numerators.
- Trend: group cumulative views/interactions by **publication** day/week/month. Label “Performa konten berdasarkan tanggal publikasi”, not views gained during period. No daily growth of views/interactions until actual historical metric snapshots exist. Prior-period deltas/sparklines only if backed by actual comparable cohorts; default omit misleading growth arrows.
- Platform comparison: content count, reported views, interactions, proxy rate, coverage. Top content ranking by chosen metric; null last, stable ID tie-break. Content distribution based on normalized content type, include Unknown. Donut shares only if positive total; no slices for unavailable metrics, explicitly display N/A in legend. Posting consistency counts publication dates, not engagement.
- No fundraising attribution, campaign KPI targets or donation metrics without validated mapping. No mocked data in production.

## 8. Proposed API contract

Single authenticated action for MVP; no separate public REST routes needed.

```js
api('getSocialDashboardData', {
    startDate: '2026-01-01',
    endDate: '2026-11-13',
    platforms: ['Instagram', 'Facebook', 'TikTok', 'YouTube'],
    granularity: 'month',
    sortBy: 'views',
    page: 1,
    pageSize: 20
});
```

Dates above are examples only. Default to current year-to-date WIB dynamically, not hardcoded 2026. Validate allowed enum/date/order/range and cap pageSize (e.g. 100). Allow all available years in filter. Response under existing `{data: ...}` envelope:

```text
filters, fetchedAt, sourceUpdatedAtByPlatform, warnings
kpis: contentCount, views, primaryEngagement, comments, shares, saves,
      interactions, commonEngagementRate, coverage
trends: [{period, platform, contentCount, views, interactions}]
platforms: [{platform, contentCount, views, interactions, commonEngagementRate, coverage}]
contentTypes: [{contentType, count}]
interactionBreakdown: [{metric, value, validCount, totalCount}]
audience: {latest: [...], trends: [...], growth: [...], warnings: [...]}
topContent: {rows: [...], total, page, pageSize}
```

This is a proposed contract, not existing endpoint. Keep nulls in JSON and numeric values numeric. Use pure functions for filtering and aggregation. Bound response size, paginate top table, escape all text, validate URLs, no credential leakage in errors. Keep private data cache session-scoped, clear on logout; avoid repeated requests on every shell render. If server caches, use short TTL and authenticated access, never public cache; refresh control re-reads source. Debounce filters and ignore stale responses. Avoid sending raw spreadsheet rows unnecessarily.

## 9. Dashboard design and priorities

Use Art Design Pro ECharts visual language; adapt to existing host shell. Inspect upstream code and record commit before copying any implementation. No framework migration.

Desktop 12-column responsive grid, tablet two columns, mobile one column:

| Component | Display | Priority |
|---|---|---|
| Filter toolbar | Period preset/custom dates, platform, refresh, freshness label | P0 |
| KPI cards | Published content, reported views, interactions, proxy engagement rate | P0 |
| Interaction breakdown | Likes/Reactions, comments, shares, saves; donut or bars with N/A | P0 |
| Performance trend | Line/area by publication date, selectable views/interactions | P0 |
| Platform comparison | Horizontal bars or grouped bars, metric selector | P0 |
| Content distribution | Donut, include Unknown | P0 |
| Top performing content | Rank, caption/title, platform, date, type, views, interactions, metric details, safe link | P0 |
| Audience summary | Latest observed per platform, dates and stale status | P0 |
| Audience growth | Actual dated observations, gaps visible, N/A with insufficient history | P1 |
| Posting consistency | Calendar heatmap using publication counts | P1 |
| Best posting time, retention, reach, categories, KPI targets | Later, only with verified data | Out of MVP |

Show compact numbers in cards and exact Indonesian-formatted values in tooltips. Use restrained gradients, rounded bars, theme-aware axes, readable legends and responsive padding. Donut center total only with valid positive sum. Use actual data for sparklines or omit. Keep captions as escaped text, links safe with rel=noopener noreferrer. Provide loading, error/retry, empty-filter, unavailable and true-zero states. Accessible labels, focus, contrast, table scrolling; no color-only indicators.

## 10. Lifecycle requirements

Initialize charts after dashboard DOM is mounted. Dispose chart instances and disconnect observers before `render()` replaces `#view` or route leaves; ensure no duplicate listeners. Resize with container/sidebar, update theme on `applyPrefs()` and system changes. Do not trigger collection on Refresh, only re-read analytics. Guard asynchronous fetches against unmount and out-of-order results. Keep dashboard state independent of existing planner state. Test navigation away and back repeatedly, logout, theme toggling, mobile and empty datasets.

## 11. Implementation sequence and acceptance criteria

1. **Plan only first:** inspect checkout, existing AGENTS instructions and upstream reference; confirm actual route, dependencies, data access and file-level plan. Report blockers and stop before editing if in Plan mode.
2. **Backend:** create social read-only reader and pure aggregation helpers, add authenticated dispatch case; test synthetic fixtures. Configure environment and verify read access with user-provided credentials locally if available.
3. **Frontend:** route integration, KPI layout, filter state, chart lifecycle, ranking table; adapt Art Design Pro patterns. No unrelated refactors.
4. **Testing:** run `node --check` on changed JS/MJS, `node --test` for aggregation tests; inspect actual package scripts (archive has `npm run dev` for Netlify, no assumed lint/build). Verify ECharts assets, auth, mobile and themes using browser if available.
5. **Release:** user reviews plan/results; deploy via existing Netlify workflow only after approval. Do not commit/push without explicit approval.

Minimum test cases: 4 platforms, numeric zero vs missing, mixed FB reactions/likes, missing saves, legacy views warnings, invalid dates, duplicate IDs, date serials, exact large IDs, partial audience failure, empty filter, weighted denominator, inclusive boundaries, snapshots same day in mixed types, stale TikTok, ranking pagination, XSS captions/URLs, unauthorized request, planner regression, resize and chart cleanup. Report exact tests run and any missing live credentials or browser checks. No claim of live validation without evidence.

## 12. Out of scope / decisions

- Python migration tools stay local, no runtime dependency or repository inclusion.
- No new platform API metrics, no forced YouTube content type, no changes to Apps Script or sheet layout unless separately requested.
- No automatic audience interpolation, historical growth reconstruction, or donation attribution.
- Google Sheets is reported ready by user; live header and data check remains a deployment gate. Last audit counts are historical and must not be hardcoded.
- Single authenticated endpoint, default year-to-date filter and P0/P1 priorities are recommended design decisions; revise if user explicitly requests otherwise.
