import { createGoogleSheetsClient } from "./google-sheets-client.mjs";

const SOCIAL_SHEET_ID = process.env.GOOGLE_SOCIAL_SHEET_ID;
const PLATFORMS = ["Instagram", "Facebook", "TikTok", "YouTube"];
const CONTENT_HEADERS = [
  "content_id",
  "platform_content_id",
  "platform",
  "published_date",
  "published_time",
  "title",
  "caption",
  "content_type",
  "url",
  "views",
  "views_type",
  "reach",
  "unique_views",
  "likes",
  "reactions",
  "comments",
  "shares",
  "saves",
  "interactions",
  "common_interactions",
  "interaction_completeness",
  "duration_seconds",
  "avg_watch_time_seconds",
  "category",
  "last_updated",
];
const AUDIENCE_HEADERS = [
  "snapshot_date",
  "platform",
  "account_id",
  "followers",
  "subscribers",
  "captured_at",
];
const DAY_MS = 24 * 60 * 60 * 1000;

function requiredValue(value, label) {
  if (value === undefined || value === null || String(value).trim() === "") {
    throw new Error(`Kolom wajib ${label} kosong.`);
  }
  return String(value).trim();
}

function normalizeMetric(value) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value === "number")
    return Number.isFinite(value) && value >= 0 ? value : null;
  const normalized = String(value).trim();
  if (!/^\d+(?:\.\d+)?$/.test(normalized)) return null;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function parseISODate(value, label) {
  const date = String(value ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
    throw new Error(`Tanggal ${label} tidak valid.`);
  const [year, month, day] = date.split("-").map(Number);
  const check = new Date(Date.UTC(year, month - 1, day));
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    throw new Error(`Tanggal ${label} tidak valid.`);
  }
  return date;
}

function serialToDate(serial) {
  if (!Number.isFinite(serial) || serial < 0) return null;
  const date = new Date(Date.UTC(1899, 11, 30) + Math.floor(serial) * DAY_MS);
  return date.toISOString().slice(0, 10);
}

function parseSheetDate(value) {
  if (typeof value === "number") return serialToDate(value);

  const text = String(value ?? "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    try {
      return parseISODate(text, "snapshot_date");
    } catch {
      return null;
    }
  }
  const localDate = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s|$)/);
  if (localDate) {
    const [, day, month, year] = localDate;
    const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    try {
      return parseISODate(iso, "captured_at");
    } catch {
      return null;
    }
  }
  return null;
}

function parseCapturedAt(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const text = String(value ?? "").trim();
  const local = text.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/,
  );
  if (local) {
    const [, day, month, year, hour = "0", minute = "0", second = "0"] = local;
    return Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second),
    );
  }
  const parsed = Date.parse(text);
  return Number.isFinite(parsed) ? parsed : null;
}

function rowsToObjects(values, requiredHeaders, sheetName) {
  const [headers = [], ...rows] = values || [];
  const normalizedHeaders = headers.map((header) => String(header).trim());
  const missing = requiredHeaders.filter(
    (header) => !normalizedHeaders.includes(header),
  );
  if (missing.length)
    throw new Error(
      `Header ${sheetName} tidak lengkap: ${missing.join(", ")}.`,
    );

  const populatedRows = rows.filter((row) =>
    row.some((cell) => cell !== "" && cell !== null && cell !== undefined),
  );
  return populatedRows.map((row) =>
    Object.fromEntries(
      normalizedHeaders.map((header, index) => [header, row[index] ?? null]),
    ),
  );
}

export function normalizeMasterRows(rows) {
  const ids = new Set();
  return rows.map((row, index) => {
    const contentId = requiredValue(
      row.content_id,
      `content_id pada baris ${index + 2}`,
    );
    if (ids.has(contentId))
      throw new Error(`ID konten duplikat ditemukan: ${contentId}.`);
    ids.add(contentId);
    const platform = requiredValue(
      row.platform,
      `platform pada baris ${index + 2}`,
    );
    if (!PLATFORMS.includes(platform))
      throw new Error(`Platform tidak dikenal pada konten ${contentId}.`);
    const publishedDate = parseISODate(
      row.published_date,
      `publikasi konten ${contentId}`,
    );
    const primary =
      platform === "Facebook"
        ? normalizeMetric(row.reactions)
        : normalizeMetric(row.likes);
    const comments = normalizeMetric(row.comments);
    const shares = normalizeMetric(row.shares);
    const saves = normalizeMetric(row.saves);
    const components = [primary, comments, shares, saves].filter(
      (value) => value !== null,
    );
    const computedInteractions = components.length
      ? components.reduce((sum, value) => sum + value, 0)
      : null;
    const storedInteractions = normalizeMetric(row.interactions);
    return {
      contentId,
      platformContentId:
        row.platform_content_id == null
          ? null
          : String(row.platform_content_id),
      platform,
      publishedDate,
      publishedTime:
        row.published_time == null ? null : String(row.published_time),
      title: row.title == null ? "" : String(row.title),
      caption: row.caption == null ? "" : String(row.caption),
      contentType: String(row.content_type || "Unknown").trim() || "Unknown",
      durationSeconds: normalizeMetric(row.duration_seconds),
      url: row.url == null ? "" : String(row.url),
      views: normalizeMetric(row.views),
      viewsType: row.views_type == null ? null : String(row.views_type),
      primaryEngagement: primary,
      likes: normalizeMetric(row.likes),
      reactions: normalizeMetric(row.reactions),
      comments,
      shares,
      saves,
      interactions: computedInteractions,
      commonInteractions:
        primary !== null && comments !== null ? primary + comments : null,
      interactionCompleteness:
        row.interaction_completeness == null
          ? null
          : String(row.interaction_completeness),
      interactionMismatch:
        storedInteractions !== null &&
        computedInteractions !== null &&
        storedInteractions !== computedInteractions,
      lastUpdated: row.last_updated == null ? null : String(row.last_updated),
    };
  });
}

export function normalizeAudienceRows(rows) {
  const deduplicated = new Map();
  const warnings = [];
  rows.forEach((row, index) => {
    const platform = String(row.platform ?? "").trim();
    const accountId = String(row.account_id ?? "").trim();
    const snapshotDate = parseSheetDate(row.snapshot_date);
    if (!PLATFORMS.includes(platform) || !accountId || !snapshotDate) {
      warnings.push(
        `Snapshot audience baris ${index + 2} dilewati karena tanggal/platform/akun tidak valid.`,
      );
      return;
    }
    const key = `${platform}\u0000${accountId}\u0000${snapshotDate}`;
    const current = {
      platform,
      accountId,
      snapshotDate,
      followers: normalizeMetric(row.followers),
      subscribers: normalizeMetric(row.subscribers),
      capturedAt: parseCapturedAt(row.captured_at),
    };
    const previous = deduplicated.get(key);
    if (
      !previous ||
      (current.capturedAt ?? -Infinity) > (previous.capturedAt ?? -Infinity)
    ) {
      if (previous)
        warnings.push(
          `Snapshot ganda untuk ${platform} pada ${snapshotDate}; observasi terbaru dipakai.`,
        );
      deduplicated.set(key, current);
    } else if (current.capturedAt === previous.capturedAt) {
      warnings.push(
        `Waktu capture ambigu untuk ${platform} pada ${snapshotDate}.`,
      );
    }
  });
  return { rows: [...deduplicated.values()], warnings };
}

function validateRequest(request = {}) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(new Date())
      .map((part) => [part.type, part.value]),
  );
  const today = `${parts.year}-${parts.month}-${parts.day}`;
  const startDate = parseISODate(
    request.startDate || `${today.slice(0, 4)}-01-01`,
    "awal filter",
  );
  const endDate = parseISODate(request.endDate || today, "akhir filter");
  if (startDate > endDate)
    throw new Error(
      "Tanggal awal harus sebelum atau sama dengan tanggal akhir.",
    );
  const platforms = request.platforms == null ? PLATFORMS : request.platforms;
  if (
    !Array.isArray(platforms) ||
    platforms.some((platform) => !PLATFORMS.includes(platform))
  ) {
    throw new Error("Filter platform tidak valid.");
  }
  const granularity = ["day", "week", "month"].includes(request.granularity)
    ? request.granularity
    : "month";
  const sortBy = [
    "views",
    "interactions",
    "comments",
    "publishedDate",
  ].includes(request.sortBy)
    ? request.sortBy
    : "views";
  const page = Math.max(1, Math.floor(Number(request.page) || 1));
  const pageSize = Math.min(
    100,
    Math.max(1, Math.floor(Number(request.pageSize) || 20)),
  );
  return { startDate, endDate, platforms, granularity, sortBy, page, pageSize };
}

function periodKey(date, granularity) {
  if (granularity === "day") return date;
  if (granularity === "month") return date.slice(0, 7);
  const [year, month, day] = date.split("-").map(Number);
  const current = new Date(Date.UTC(year, month - 1, day));
  current.setUTCDate(current.getUTCDate() - ((current.getUTCDay() + 6) % 7));
  return current.toISOString().slice(0, 10);
}

function sumAvailable(rows, key) {
  const available = rows
    .map((row) => row[key])
    .filter((value) => value !== null);
  return {
    value: available.length
      ? available.reduce((sum, value) => sum + value, 0)
      : null,
    validCount: available.length,
    totalCount: rows.length,
  };
}

function aggregateRows(rows) {
  const views = sumAvailable(rows, "views");
  const primaryEngagement = sumAvailable(rows, "primaryEngagement");
  const comments = sumAvailable(rows, "comments");
  const shares = sumAvailable(rows, "shares");
  const saves = sumAvailable(rows, "saves");
  const interactions = sumAvailable(rows, "interactions");
  const eligible = rows.filter(
    (row) =>
      row.commonInteractions !== null && row.views !== null && row.views > 0,
  );
  const denominator = eligible.reduce((sum, row) => sum + row.views, 0);
  const numerator = eligible.reduce(
    (sum, row) => sum + row.commonInteractions,
    0,
  );
  return {
    contentCount: rows.length,
    views: views.value,
    primaryEngagement: primaryEngagement.value,
    comments: comments.value,
    shares: shares.value,
    saves: saves.value,
    interactions: interactions.value,
    commonEngagementRate:
      denominator > 0 ? (100 * numerator) / denominator : null,
    coverage: {
      views,
      primaryEngagement,
      comments,
      shares,
      saves,
      interactions,
      rateEligibleCount: eligible.length,
      rateTotalCount: rows.length,
    },
  };
}

export function buildDashboardResponse(
  masterRows,
  audienceInput,
  request = {},
  options = {},
) {
  const filters = validateRequest(request);
  const allRows = normalizeMasterRows(masterRows);
  const rows = allRows.filter(
    (row) =>
      row.publishedDate >= filters.startDate &&
      row.publishedDate <= filters.endDate &&
      filters.platforms.includes(row.platform),
  );
  const kpis = aggregateRows(rows);
  const warnings = [...(options.warnings || [])];
  const invalidMetricRows = masterRows.reduce((count, row) => {
    const metricKeys = [
      "views",
      "likes",
      "reactions",
      "comments",
      "shares",
      "saves",
      "interactions",
    ];
    return (
      count +
      (metricKeys.some(
        (key) =>
          row[key] !== undefined &&
          row[key] !== null &&
          row[key] !== "" &&
          normalizeMetric(row[key]) === null,
      )
        ? 1
        : 0)
    );
  }, 0);
  if (invalidMetricRows)
    warnings.push(
      `${invalidMetricRows} baris memiliki nilai metrik yang tidak valid; nilai tersebut diperlakukan sebagai tidak tersedia.`,
    );
  if (rows.some((row) => row.interactionMismatch))
    warnings.push(
      "Sebagian total interaksi berbeda dari komponen; dashboard memakai hasil hitung komponen yang tersedia.",
    );
  const viewTypes = [
    ...new Set(rows.map((row) => row.viewsType).filter(Boolean)),
  ];
  if (
    viewTypes.some(
      (type) =>
        /unverified/i.test(type) &&
        !/^provider_viewers_unverified$/i.test(type.trim()),
    )
  )
    warnings.push(
      "Definisi reported views belum terverifikasi pada sebagian konten.",
    );

  const grouped = new Map();
  rows.forEach((row) => {
    const period = periodKey(row.publishedDate, filters.granularity);
    const key = `${period}\u0000${row.platform}`;
    if (!grouped.has(key))
      grouped.set(key, { period, platform: row.platform, sourceRows: [] });
    grouped.get(key).sourceRows.push(row);
  });
  const trends = [...grouped.values()]
    .map((group) => ({
      period: group.period,
      platform: group.platform,
      ...aggregateRows(group.sourceRows),
    }))
    .sort(
      (a, b) =>
        a.period.localeCompare(b.period) ||
        a.platform.localeCompare(b.platform),
    );
  const platforms = PLATFORMS.filter((platform) =>
    filters.platforms.includes(platform),
  ).map((platform) => ({
    platform,
    ...aggregateRows(rows.filter((row) => row.platform === platform)),
  }));
  const typeCounts = new Map();
  rows.forEach((row) =>
    typeCounts.set(row.contentType, (typeCounts.get(row.contentType) || 0) + 1),
  );
  const contentTypes = [...typeCounts].map(([contentType, count]) => ({
    contentType,
    count,
  }));
  const interactionBreakdown = [
    ["Likes / Reactions", "primaryEngagement"],
    ["Komentar", "comments"],
    ["Shares", "shares"],
    ["Saves", "saves"],
  ].map(([metric, field]) => ({ metric, ...sumAvailable(rows, field) }));
  const rankingMetric =
    filters.sortBy === "publishedDate" ? "publishedDate" : filters.sortBy;
  const ranked = [...rows].sort((a, b) => {
    if (rankingMetric === "publishedDate")
      return (
        b.publishedDate.localeCompare(a.publishedDate) ||
        a.contentId.localeCompare(b.contentId)
      );
    const left =
      rankingMetric === "interactions"
        ? a.interactions
        : rankingMetric === "comments"
          ? a.comments
          : a.views;
    const right =
      rankingMetric === "interactions"
        ? b.interactions
        : rankingMetric === "comments"
          ? b.comments
          : b.views;
    return (
      (right ?? -Infinity) - (left ?? -Infinity) ||
      a.contentId.localeCompare(b.contentId)
    );
  });
  const topContent = {
    rows: ranked.slice(
      (filters.page - 1) * filters.pageSize,
      filters.page * filters.pageSize,
    ),
    total: ranked.length,
    page: filters.page,
    pageSize: filters.pageSize,
  };

  const audience = { latest: [], trends: [], growth: [], warnings: [] };
  if (audienceInput) {
    const normalizedAudience = normalizeAudienceRows(audienceInput);
    audience.warnings = normalizedAudience.warnings;
    const audienceRows = normalizedAudience.rows;
    const accounts = new Map();
    audienceRows.forEach((row) => {
      const key = `${row.platform}\u0000${row.accountId}`;
      if (!accounts.has(key)) accounts.set(key, []);
      accounts.get(key).push(row);
    });
    for (const observations of accounts.values()) {
      observations.sort((a, b) => a.snapshotDate.localeCompare(b.snapshotDate));
      const { platform, accountId } = observations[0];
      const eligible = observations.filter(
        (row) => row.snapshotDate <= filters.endDate,
      );
      const latest = eligible.at(-1);
      if (latest) {
        const metricName = platform === "YouTube" ? "subscribers" : "followers";
        const metricValue = latest[metricName];
        const ageDays = Math.floor(
          (Date.parse(`${filters.endDate}T00:00:00Z`) -
            Date.parse(`${latest.snapshotDate}T00:00:00Z`)) /
            DAY_MS,
        );
        audience.latest.push({
          platform,
          accountId,
          metricName,
          value: metricValue,
          snapshotDate: latest.snapshotDate,
          stale: ageDays > 7,
          predatesStart: latest.snapshotDate < filters.startDate,
        });
      }
      const inWindow = observations.filter(
        (row) =>
          row.snapshotDate >= filters.startDate &&
          row.snapshotDate <= filters.endDate,
      );
      const metricName = platform === "YouTube" ? "subscribers" : "followers";
      if (
        inWindow.length >= 2 &&
        inWindow[0][metricName] !== null &&
        inWindow.at(-1)[metricName] !== null
      ) {
        audience.growth.push({
          platform,
          accountId,
          fromDate: inWindow[0].snapshotDate,
          toDate: inWindow.at(-1).snapshotDate,
          change: inWindow.at(-1)[metricName] - inWindow[0][metricName],
        });
      }
      audience.trends.push(
        ...observations
          .filter((row) => row.snapshotDate <= filters.endDate)
          .map((row) => ({
            platform,
            accountId,
            period: row.snapshotDate,
            value: row[metricName],
          })),
      );
    }
    if (!audience.growth.length)
      audience.warnings.push(
        "Pertumbuhan audience memerlukan minimal dua snapshot aktual dalam rentang terpilih.",
      );
  }
  return {
    filters,
    fetchedAt: options.fetchedAt || new Date().toISOString(),
    sourceUpdatedAtByPlatform: Object.fromEntries(
      PLATFORMS.map((platform) => [
        platform,
        rows
          .filter((row) => row.platform === platform)
          .map((row) => row.lastUpdated)
          .filter(Boolean)
          .sort()
          .at(-1) || null,
      ]),
    ),
    warnings,
    kpis,
    trends,
    platforms,
    contentTypes,
    interactionBreakdown,
    audience,
    topContent,
  };
}

async function createReadOnlySheetsClient() {
  return createGoogleSheetsClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    missingMessage:
      "Konfigurasi akun layanan Google untuk dashboard belum lengkap.",
    missingPublicMessage:
      "Kredensial Google belum tersedia. Atur GOOGLE_SERVICE_ACCOUNT_EMAIL dan GOOGLE_PRIVATE_KEY pada environment Netlify.",
  });
}

export async function getSocialDashboardData(request = {}) {
  if (!SOCIAL_SHEET_ID) {
    throw Object.assign(
      new Error("GOOGLE_SOCIAL_SHEET_ID belum dikonfigurasi."),
      {
        publicMessage:
          "Variabel GOOGLE_SOCIAL_SHEET_ID belum diatur pada environment Netlify.",
      },
    );
  }
  const sheets = await createReadOnlySheetsClient();
  const readOptions = {
    spreadsheetId: SOCIAL_SHEET_ID,
    valueRenderOption: "UNFORMATTED_VALUE",
    dateTimeRenderOption: "SERIAL_NUMBER",
  };
  const [masterResult, audienceResult] = await Promise.allSettled([
    sheets.spreadsheets.values.get({ ...readOptions, range: "'master'!A:Y" }),
    sheets.spreadsheets.values.get({
      ...readOptions,
      range: "'audience_snapshot'!A:F",
    }),
  ]);
  if (masterResult.status === "rejected") {
    const code = masterResult.reason?.code;
    const publicMessage =
      Number(code) === 403
        ? "Akses ditolak. Bagikan spreadsheet ke akun layanan Google pada Netlify dengan izin Viewer."
        : Number(code) === 404
          ? "Spreadsheet atau tab master tidak ditemukan. Periksa GOOGLE_SOCIAL_SHEET_ID dan nama tab master."
          : "Tab master gagal dibaca. Periksa izin akun layanan dan konfigurasi spreadsheet di Netlify.";
    throw Object.assign(new Error("Sheet master tidak dapat dibaca."), {
      publicMessage,
    });
  }
  const masterRange = masterResult.value.data;
  const audienceRange =
    audienceResult.status === "fulfilled" ? audienceResult.value.data : null;
  if (!masterRange?.values?.length) {
    throw new Error("Sheet master kosong atau tidak dapat dibaca.");
  }
  const masterRows = rowsToObjects(
    masterRange.values,
    CONTENT_HEADERS,
    "master",
  );
  const warnings = [];
  let audienceRows = null;
  if (audienceResult.status === "rejected") {
    warnings.push(
      "Sheet audience_snapshot tidak dapat dibaca; metrik konten tetap tersedia.",
    );
  } else if (audienceRange?.values?.length) {
    try {
      audienceRows = rowsToObjects(
        audienceRange.values,
        AUDIENCE_HEADERS,
        "audience_snapshot",
      );
    } catch (error) {
      warnings.push(`Data audience tidak tersedia: ${error.message}`);
    }
  } else {
    warnings.push("Sheet audience_snapshot belum berisi data.");
  }
  return buildDashboardResponse(masterRows, audienceRows, request, {
    warnings,
  });
}
