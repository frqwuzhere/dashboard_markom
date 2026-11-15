import test from "node:test";
import assert from "node:assert/strict";
import {
  createPlannerStore,
  SCHEMA,
} from "../netlify/functions/lib/planner-store.mjs";

function createFakeSheets(initialSheets = {}) {
  const sheets = new Map(
    Object.entries(initialSheets).map(([title, values], index) => [
      title,
      { sheetId: index + 1, values: structuredClone(values) },
    ]),
  );
  const counters = { batchGet: 0, batchUpdate: 0 };

  const rangeTitle = (range) => range.match(/^'?(.+?)'?!/)?.[1];
  const readRange = (range) => {
    const title = rangeTitle(range);
    const values = sheets.get(title)?.values || [];
    return range.endsWith("!1:1") ? values.slice(0, 1) : values;
  };

  const api = {
    spreadsheets: {
      get: async () => ({
        data: {
          sheets: [...sheets].map(([title, sheet]) => ({
            properties: { title, sheetId: sheet.sheetId },
          })),
        },
      }),
      batchUpdate: async ({ requestBody }) => {
        for (const request of requestBody.requests || []) {
          const title = request.addSheet?.properties?.title;
          if (title && !sheets.has(title)) {
            sheets.set(title, {
              sheetId: sheets.size + 1,
              values: [],
            });
          }
        }
        return { data: {} };
      },
      values: {
        batchGet: async ({ ranges }) => {
          counters.batchGet += 1;
          return {
            data: {
              valueRanges: ranges.map((range) => ({
                values: readRange(range),
              })),
            },
          };
        },
        batchUpdate: async ({ requestBody }) => {
          counters.batchUpdate += 1;
          for (const update of requestBody.data || []) {
            const title = rangeTitle(update.range);
            const sheet = sheets.get(title);
            if (update.range.endsWith("!A1")) {
              sheet.values = structuredClone(update.values);
              continue;
            }
            if (/![A-Z]+1$/.test(update.range)) {
              const startColumn = update.range.match(/!([A-Z]+)1$/)?.[1] || "A";
              const columnIndex = [...startColumn].reduce(
                (value, character) => value * 26 + character.charCodeAt(0) - 64,
                0,
              ) - 1;
              sheet.values[0] ||= [];
              update.values[0].forEach((value, index) => {
                sheet.values[0][columnIndex + index] = value;
              });
            }
          }
          return { data: {} };
        },
      },
    },
  };

  return { api, counters, sheets };
}

test("planner store creates tabs and headers without replacing existing data", async () => {
  const { api, counters, sheets } = createFakeSheets({
    Accounts: [["ID", "Name", "Custom"], ["ACC-1", "Example", "keep"]],
  });
  const store = createPlannerStore(api, "test-spreadsheet");

  await store.ensureSheets();

  assert.equal(sheets.size, Object.keys(SCHEMA).length);
  assert.equal(sheets.get("Accounts").values[1][1], "Example");
  assert.equal(sheets.get("Accounts").values[0][2], "Custom");
  assert.deepEqual(
    sheets.get("Accounts").values[0].slice(3),
    SCHEMA.Accounts.filter(
      (header) => !["ID", "Name", "Custom"].includes(header),
    ),
  );
  for (const name of Object.keys(SCHEMA)) {
    assert.ok(sheets.get(name).values[0].length > 0);
  }
  assert.equal(counters.batchGet, 1);
  assert.equal(counters.batchUpdate, 1);
});

test("getAllData batches reads and maps sheet rows to the existing API shape", async () => {
  const { api, counters, sheets } = createFakeSheets();
  const store = createPlannerStore(api, "test-spreadsheet");
  await store.ensureSheets();

  sheets.get("Accounts").values.push([
    "ACC-1",
    "Example",
    "",
    "Instagram",
  ]);
  sheets.get("Settings").values.push(["AccessHash", "stored-hash"]);

  const data = await store.getAllData();

  assert.equal(data.accounts[0].ID, "ACC-1");
  assert.equal(data.accounts[0].Name, "Example");
  assert.deepEqual(data.contents, []);
  assert.equal(data.settings.AccessHash, "stored-hash");
  assert.equal(data.sheetUrl, "https://docs.google.com/spreadsheets/d/test-spreadsheet/edit");
  assert.equal(counters.batchGet, 3);
});
