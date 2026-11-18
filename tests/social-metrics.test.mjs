import test from "node:test";
import assert from "node:assert/strict";
import {
  buildDashboardResponse,
  normalizeAudienceRows,
  normalizeMasterRows,
} from "../netlify/functions/lib/social-metrics.mjs";

const makeContent = (id, platform, overrides = {}) => ({
  content_id: id,
  platform_content_id: "9007199254740993123",
  platform,
  published_date: "2026-11-13",
  published_time: "10:00:00",
  content_type: "Video",
  views: 100,
  views_type: "views",
  likes: platform === "Facebook" ? null : 10,
  reactions: platform === "Facebook" ? 8 : null,
  comments: 2,
  shares: 1,
  saves: null,
  interactions: 13,
  common_interactions: 12,
  interaction_completeness: "Partial",
  ...overrides,
});

test("master normalization preserves large IDs, Facebook reactions, zeroes, and missing metrics", () => {
  const [row] = normalizeMasterRows([
    makeContent("fb_1", "Facebook", {
      platform_content_id: "9007199254740993123",
      views: 0,
      reactions: 0,
      comments: 0,
      shares: null,
      saves: null,
      interactions: 0,
    }),
  ]);
  assert.equal(row.platformContentId, "9007199254740993123");
  assert.equal(row.views, 0);
  assert.equal(row.primaryEngagement, 0);
  assert.equal(row.shares, null);
  assert.equal(row.interactions, 0);
});

test("master normalization includes duration seconds, preserving zero and missing values", () => {
  const [withDuration, withoutDuration] = normalizeMasterRows([
    makeContent("ig_duration", "Instagram", { duration_seconds: 95 }),
    makeContent("ig_no_duration", "Instagram"),
  ]);
  assert.equal(withDuration.durationSeconds, 95);
  assert.equal(withoutDuration.durationSeconds, null);
});

test("master validation rejects duplicate IDs and invalid publication dates", () => {
  assert.throws(
    () =>
      normalizeMasterRows([
        makeContent("same", "Instagram"),
        makeContent("same", "Instagram"),
      ]),
    /duplikat/,
  );
  assert.throws(
    () =>
      normalizeMasterRows([
        makeContent("bad", "Instagram", { published_date: "13/11/2026" }),
      ]),
    /Tanggal/,
  );
});

test("dashboard uses a weighted comparable engagement rate and inclusive filters", () => {
  const data = buildDashboardResponse(
    [
      makeContent("ig_a", "Instagram", { views: 100, likes: 10, comments: 10 }),
      makeContent("ig_b", "Instagram", { views: 300, likes: 30, comments: 10 }),
      makeContent("tt_old", "TikTok", { published_date: "2026-11-12" }),
    ],
    [],
    {
      startDate: "2026-11-13",
      endDate: "2026-11-13",
      platforms: ["Instagram"],
      granularity: "day",
    },
  );
  assert.equal(data.kpis.contentCount, 2);
  assert.equal(data.kpis.views, 400);
  assert.equal(data.kpis.commonEngagementRate, 15);
  assert.equal(data.kpis.coverage.views.validCount, 2);
});

test("audience dates accept serials and Indonesian captured_at strings; growth requires two observations", () => {
  const snapshot = normalizeAudienceRows([
    {
      snapshot_date: 46339,
      platform: "Instagram",
      account_id: "account",
      followers: 10,
      captured_at: "13/11/2026",
    },
    {
      snapshot_date: "2026-11-13",
      platform: "Instagram",
      account_id: "account",
      followers: 12,
      captured_at: "13/11/2026 21:02:58",
    },
  ]);
  assert.equal(snapshot.rows.length, 1);
  assert.equal(snapshot.rows[0].snapshotDate, "2026-11-13");
  assert.equal(snapshot.rows[0].followers, 12);
  assert.ok(snapshot.warnings.length);
  const data = buildDashboardResponse(
    [makeContent("ig_a", "Instagram")],
    [
      {
        snapshot_date: 46339,
        platform: "Instagram",
        account_id: "account",
        followers: 10,
        captured_at: "13/11/2026",
      },
      {
        snapshot_date: "2026-11-13",
        platform: "Instagram",
        account_id: "account",
        followers: 12,
        captured_at: "13/11/2026 21:02:58",
      },
    ],
    {
      startDate: "2026-11-13",
      endDate: "2026-11-13",
      platforms: ["Instagram"],
    },
  );
  assert.equal(data.audience.latest[0].value, 12);
  assert.equal(data.audience.growth.length, 0);
});

test("ranking paginates and places unavailable metric values last", () => {
  const data = buildDashboardResponse(
    [
      makeContent("ig_missing", "Instagram", { views: null }),
      makeContent("ig_high", "Instagram", { views: 300 }),
      makeContent("ig_low", "Instagram", { views: 200 }),
    ],
    [],
    { startDate: "2026-01-01", endDate: "2026-12-31", page: 2, pageSize: 1 },
  );
  assert.equal(data.topContent.total, 3);
  assert.equal(data.topContent.rows[0].contentId, "ig_low");
});
