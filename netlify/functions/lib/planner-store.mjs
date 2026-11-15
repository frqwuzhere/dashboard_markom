import crypto from "node:crypto";
import { DEFAULT_CODE_HASH } from "./session-auth.mjs";

export const PLANNER_SPREADSHEET_ID =
  process.env.GOOGLE_SHEET_ID || "1qQsLbwGK6WnE_KV7ysswEUHIyGdmAw9uhfafM7bowXA";

export const DATA_SHEETS = ["Contents", "Campaigns", "Ideas", "Resources"];

export const SCHEMA = {
  Accounts: [
    "ID",
    "Name",
    "Handle",
    "Platform",
    "AvatarUrl",
    "Color",
    "TargetPerWeek",
    "Notes",
  ],
  Contents: [
    "ID",
    "AccountID",
    "Date",
    "Time",
    "Title",
    "Platform",
    "Format",
    "Status",
    "Campaign",
    "Pillar",
    "Caption",
    "Hashtags",
    "Checklist",
    "Links",
    "PostLink",
    "ResultLink",
    "Reach",
    "Likes",
    "Comments",
    "Shares",
    "Saves",
    "Notes",
    "UpdatedAt",
    "Views",
    "ReachSrc",
    "AutoMetrics",
    "MetricsSrc",
    "MetricsAt",
    "PostedDate",
    "PostedTime",
  ],
  Campaigns: [
    "ID",
    "AccountID",
    "Name",
    "StartDate",
    "EndDate",
    "Goal",
    "Color",
    "Status",
    "Notes",
  ],
  Ideas: [
    "ID",
    "AccountID",
    "Title",
    "Pillar",
    "Format",
    "Platform",
    "Priority",
    "Status",
    "Links",
    "Notes",
    "CreatedAt",
  ],
  Resources: ["ID", "AccountID", "Title", "Category", "Url", "Notes"],
  Settings: ["Key", "Value"],
};

const RECORD_PREFIX = {
  Accounts: "ACC",
  Contents: "CNT",
  Campaigns: "CMP",
  Ideas: "IDE",
  Resources: "RES",
};

function quoteSheet(name) {
  return `'${name.replace(/'/g, "''")}'`;
}

function columnName(number) {
  let result = "";
  let current = number;

  while (current) {
    const remainder = (current - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    current = Math.floor((current - 1) / 26);
  }

  return result;
}

function rowsFromValues(values) {
  const [headers = [], ...rows] = values;
  return rows
    .filter((row) => row[0] !== undefined && row[0] !== "")
    .map((row) =>
      Object.fromEntries(
        headers.map((header, index) => [header, row[index] ?? ""]),
      ),
    );
}

function settingsObject(rows) {
  return Object.fromEntries(rows.map((row) => [row.Key, row.Value]));
}

export function createPlannerStore(
  sheets,
  spreadsheetId = PLANNER_SPREADSHEET_ID,
) {
  async function ensureSheets() {
    const info = await sheets.spreadsheets.get({ spreadsheetId });
    const existing = new Set(
      (info.data.sheets || []).map((sheet) => sheet.properties.title),
    );
    const missingSheets = Object.keys(SCHEMA).filter(
      (name) => !existing.has(name),
    );

    if (missingSheets.length) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: missingSheets.map((title) => ({
            addSheet: { properties: { title } },
          })),
        },
      });
    }

    const names = Object.keys(SCHEMA);
    const headerResult = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: names.map((name) => `${quoteSheet(name)}!1:1`),
    });
    const updates = [];

    names.forEach((name, index) => {
      const headers = SCHEMA[name];
      const current = headerResult.data.valueRanges?.[index]?.values?.[0] || [];

      if (!current.length) {
        updates.push({ range: `${quoteSheet(name)}!A1`, values: [headers] });
        return;
      }

      const missing = headers.filter((header) => !current.includes(header));
      if (missing.length) {
        updates.push({
          range: `${quoteSheet(name)}!${columnName(current.length + 1)}1`,
          values: [missing],
        });
      }
    });

    if (updates.length) {
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId,
        valueInputOption: "RAW",
        requestBody: { data: updates },
      });
    }
  }

  async function getRows(name) {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${quoteSheet(name)}!A:ZZ`,
    });
    return rowsFromValues(result.data.values || []);
  }

  async function getAccessHash() {
    const settings = settingsObject(await getRows("Settings"));
    return String(settings.AccessHash || DEFAULT_CODE_HASH);
  }

  async function getAllData() {
    await ensureSheets();
    const names = [
      "Accounts",
      "Contents",
      "Campaigns",
      "Ideas",
      "Resources",
      "Settings",
    ];
    const result = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: names.map((name) => `${quoteSheet(name)}!A:ZZ`),
    });
    const rowsByName = Object.fromEntries(
      names.map((name, index) => [
        name,
        rowsFromValues(result.data.valueRanges?.[index]?.values || []),
      ]),
    );

    return {
      accounts: rowsByName.Accounts,
      contents: rowsByName.Contents,
      campaigns: rowsByName.Campaigns,
      ideas: rowsByName.Ideas,
      resources: rowsByName.Resources,
      settings: settingsObject(rowsByName.Settings),
      sheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
    };
  }

  async function saveRecord(name, record) {
    const prefix = RECORD_PREFIX[name];
    if (!prefix) throw new Error("Sheet tidak dikenal.");

    await ensureSheets();
    const current = await getRows(name);
    const headers = SCHEMA[name];
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    const item = { ...record };

    if (!item.ID) {
      item.ID = `${prefix}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    }
    if (name === "Contents") item.UpdatedAt = now;
    if (name === "Ideas" && !item.CreatedAt) item.CreatedAt = now;

    const existingIndex = current.findIndex(
      (row) => String(row.ID) === String(item.ID),
    );
    const rowNumber =
      existingIndex >= 0 ? existingIndex + 2 : current.length + 2;
    const values = headers.map((header) => {
      const value = item[header];
      return value == null
        ? ""
        : typeof value === "object"
          ? JSON.stringify(value)
          : value;
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${quoteSheet(name)}!A${rowNumber}`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [values] },
    });
    return item;
  }

  async function deleteRows(name, ids) {
    if (!RECORD_PREFIX[name]) throw new Error("Sheet tidak dikenal.");

    const rows = await getRows(name);
    const wanted = new Set(ids.map(String));
    const info = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: "sheets(properties(title,sheetId))",
    });
    const sheetId = info.data.sheets.find(
      (sheet) => sheet.properties.title === name,
    )?.properties.sheetId;
    const indexes = rows
      .map((row, index) => (wanted.has(String(row.ID)) ? index + 1 : -1))
      .filter((index) => index >= 0)
      .sort((a, b) => b - a);

    if (indexes.length) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: indexes.map((index) => ({
            deleteDimension: {
              range: {
                sheetId,
                dimension: "ROWS",
                startIndex: index,
                endIndex: index + 1,
              },
            },
          })),
        },
      });
    }
    return indexes.length;
  }

  async function saveSettings(values) {
    await ensureSheets();
    const rows = await getRows("Settings");
    const updates = Object.entries(values || {}).map(([key, value]) => {
      const index = rows.findIndex((row) => row.Key === key);
      const rowNumber = index >= 0 ? index + 2 : rows.length + 2;
      if (index < 0) rows.push({ Key: key, Value: value });
      else rows[index].Value = value;

      return {
        range: `${quoteSheet("Settings")}!A${rowNumber}:B${rowNumber}`,
        values: [[key, value]],
      };
    });

    if (updates.length) {
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId,
        valueInputOption: "RAW",
        requestBody: { data: updates },
      });
    }
    return true;
  }

  async function bulkUpdate(name, ids, patch) {
    if (!RECORD_PREFIX[name]) throw new Error("Sheet tidak dikenal.");

    const rows = await getRows(name);
    const wanted = new Set((ids || []).map(String));
    const updates = [];
    let count = 0;

    rows.forEach((row, index) => {
      if (!wanted.has(String(row.ID))) return;

      const next = { ...row, ...patch };
      if (name === "Contents") {
        next.UpdatedAt = new Date().toISOString().slice(0, 16).replace("T", " ");
      }
      updates.push({
        range: `${quoteSheet(name)}!A${index + 2}`,
        values: [SCHEMA[name].map((header) => next[header] ?? "")],
      });
      count += 1;
    });

    if (updates.length) {
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId,
        valueInputOption: "USER_ENTERED",
        requestBody: { data: updates },
      });
    }
    return count;
  }

  async function deleteAccount(accountId) {
    for (const name of [...DATA_SHEETS, "Accounts"]) {
      if (name === "Accounts") {
        await deleteRows(name, [accountId]);
        continue;
      }

      const ownedIds = (await getRows(name))
        .filter((row) => row.AccountID === accountId)
        .map((row) => row.ID);
      if (ownedIds.length) await deleteRows(name, ownedIds);
    }
    return true;
  }

  return {
    bulkUpdate,
    deleteAccount,
    deleteRows,
    ensureSheets,
    getAccessHash,
    getAllData,
    saveRecord,
    saveSettings,
  };
}
