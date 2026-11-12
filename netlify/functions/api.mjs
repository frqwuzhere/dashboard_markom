import crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || '1qQsLbwGK6WnE_KV7ysswEUHIyGdmAw9uhfafM7bowXA';
const SCHEMA = {
  Accounts: ['ID', 'Name', 'Handle', 'Platform', 'Color', 'TargetPerWeek', 'Notes'],
  Contents: ['ID', 'AccountID', 'Date', 'Time', 'Title', 'Platform', 'Format', 'Status', 'Campaign', 'Pillar', 'Caption', 'Hashtags', 'Checklist', 'Links', 'PostLink', 'ResultLink', 'Reach', 'Likes', 'Comments', 'Shares', 'Saves', 'Notes', 'UpdatedAt', 'Views', 'ReachSrc', 'AutoMetrics', 'MetricsSrc', 'MetricsAt', 'PostedDate', 'PostedTime'],
  Campaigns: ['ID', 'AccountID', 'Name', 'StartDate', 'EndDate', 'Goal', 'Color', 'Status', 'Notes'],
  Ideas: ['ID', 'AccountID', 'Title', 'Pillar', 'Format', 'Platform', 'Priority', 'Status', 'Links', 'Notes', 'CreatedAt'],
  Resources: ['ID', 'AccountID', 'Title', 'Category', 'Url', 'Notes'],
  Settings: ['Key', 'Value']
};
const DATA_SHEETS = ['Contents', 'Campaigns', 'Ideas', 'Resources'];
const PREFIX = { Accounts: 'ACC', Contents: 'CNT', Campaigns: 'CMP', Ideas: 'IDE', Resources: 'RES' };
const CLIENT_KEYS = { Accounts: 'accounts', Contents: 'contents', Campaigns: 'campaigns', Ideas: 'ideas', Resources: 'resources' };
const DEFAULT_CODE_HASH = 'h33v3pk9m4g1uxjz375su8';

function codeHash(code) {
  const h53 = (str, seed = 7) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };
  return 'h' + h53('cp|' + code).toString(36) + h53('|' + code, 13).toString(36);
}

function tokenFor(hash) {
  const secret = process.env.API_TOKEN_SECRET;
  if (!secret) throw new Error('API_TOKEN_SECRET belum dikonfigurasi.');
  const payload = Buffer.from(JSON.stringify({ hash, exp: Date.now() + 30 * 864e5 })).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}
function validToken(token, hash) {
  try {
    const [payload, signature] = token.split('.');
    const expected = crypto.createHmac('sha256', process.env.API_TOKEN_SECRET || '').update(payload).digest();
    const actual = Buffer.from(signature, 'base64url');
    if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return false;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return data.exp > Date.now() && data.hash === hash;
  } catch { return false; }
}

async function sheetsClient() {
  let email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const path = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const credentials = JSON.parse(await readFile(path, 'utf8'));
    email = credentials.client_email;
    privateKey = credentials.private_key;
  }
  if (!email || !privateKey) throw new Error('Konfigurasi Google Service Account belum lengkap.');
  const auth = new google.auth.JWT({ email, key: privateKey, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  return google.sheets({ version: 'v4', auth });
}
const quoteSheet = name => `'${name.replace(/'/g, "''")}'`;
async function ensureSheets(sheets) {
  const info = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  const existing = new Set((info.data.sheets || []).map(s => s.properties.title));
  const requests = [];
  for (const [name, headers] of Object.entries(SCHEMA)) {
    if (!existing.has(name)) requests.push({ addSheet: { properties: { title: name } } });
  }
  if (requests.length) await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests } });
  for (const [name, headers] of Object.entries(SCHEMA)) {
    const got = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range: `${quoteSheet(name)}!1:1` });
    const current = got.data.values?.[0] || [];
    if (!current.length) {
      await sheets.spreadsheets.values.update({ spreadsheetId: SPREADSHEET_ID, range: `${quoteSheet(name)}!A1`, valueInputOption: 'RAW', requestBody: { values: [headers] } });
    } else {
      const missing = headers.filter(h => !current.includes(h));
      if (missing.length) {
        const col = current.length + 1;
        await sheets.spreadsheets.values.update({ spreadsheetId: SPREADSHEET_ID, range: `${quoteSheet(name)}!${columnName(col)}1`, valueInputOption: 'RAW', requestBody: { values: [missing] } });
      }
    }
  }
}
function columnName(n) {
  let out = '';
  while (n) { const r = (n - 1) % 26; out = String.fromCharCode(65 + r) + out; n = Math.floor((n - 1) / 26); }
  return out;
}
async function sheetRows(sheets, name) {
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range: `${quoteSheet(name)}!A:ZZ` });
  const [headers = [], ...rows] = res.data.values || [];
  return rows.filter(row => row[0] !== undefined && row[0] !== '').map(row => Object.fromEntries(headers.map((h, i) => [h, row[i] ?? ''])));
}
const settingsObject = rows => Object.fromEntries(rows.map(row => [row.Key, row.Value]));
async function getHash(sheets) {
  const settings = settingsObject(await sheetRows(sheets, 'Settings'));
  return String(settings.AccessHash || DEFAULT_CODE_HASH);
}
async function getAllData(sheets) {
  await ensureSheets(sheets);
  const [accounts, contents, campaigns, ideas, resources, settingRows] = await Promise.all([
    ...['Accounts', 'Contents', 'Campaigns', 'Ideas', 'Resources', 'Settings'].map(n => sheetRows(sheets, n))
  ]);
  return { accounts, contents, campaigns, ideas, resources, settings: settingsObject(settingRows), sheetUrl: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit` };
}
async function saveRecord(sheets, name, rec) {
  if (!PREFIX[name]) throw new Error('Sheet tidak dikenal.');
  await ensureSheets(sheets);
  const current = await sheetRows(sheets, name);
  const headers = SCHEMA[name];
  const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const item = { ...rec };
  if (!item.ID) item.ID = `${PREFIX[name]}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  if (name === 'Contents') item.UpdatedAt = now;
  if (name === 'Ideas' && !item.CreatedAt) item.CreatedAt = now;
  const existingIndex = current.findIndex(row => String(row.ID) === String(item.ID));
  const rowNumber = existingIndex >= 0 ? existingIndex + 2 : current.length + 2;
  const values = headers.map(h => {
    const v = item[h];
    return v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : v;
  });
  await sheets.spreadsheets.values.update({ spreadsheetId: SPREADSHEET_ID, range: `${quoteSheet(name)}!A${rowNumber}`, valueInputOption: 'USER_ENTERED', requestBody: { values: [values] } });
  return item;
}
async function deleteRows(sheets, name, ids) {
  if (!PREFIX[name]) throw new Error('Sheet tidak dikenal.');
  const rows = await sheetRows(sheets, name);
  const wanted = new Set(ids.map(String));
  const info = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID, fields: 'sheets(properties(title,sheetId))' });
  const sheetId = info.data.sheets.find(s => s.properties.title === name)?.properties.sheetId;
  const indexes = rows.map((r, i) => wanted.has(String(r.ID)) ? i + 1 : -1).filter(i => i >= 0).sort((a, b) => b - a);
  if (indexes.length) await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: indexes.map(i => ({ deleteDimension: { range: { sheetId, dimension: 'ROWS', startIndex: i, endIndex: i + 1 } } })) } });
  return indexes.length;
}
async function saveSettings(sheets, values) {
  await ensureSheets(sheets);
  const rows = await sheetRows(sheets, 'Settings');
  for (const [key, value] of Object.entries(values || {})) {
    const i = rows.findIndex(r => r.Key === key);
    const row = i >= 0 ? i + 2 : rows.length + 2;
    await sheets.spreadsheets.values.update({ spreadsheetId: SPREADSHEET_ID, range: `${quoteSheet('Settings')}!A${row}:B${row}`, valueInputOption: 'RAW', requestBody: { values: [[key, value]] } });
    if (i < 0) rows.push({ Key: key, Value: value }); else rows[i].Value = value;
  }
  return true;
}
async function dispatch(sheets, action, args) {
  if (action === 'authenticate') {
    await ensureSheets(sheets);
    const expected = await getHash(sheets);
    if (codeHash(String(args[0] || '')) !== expected) throw Object.assign(new Error('Kode akses salah.'), { statusCode: 401 });
    return { token: tokenFor(expected) };
  }
  const hash = await getHash(sheets);
  if (!validToken(this.token, hash)) throw Object.assign(new Error('Sesi berakhir. Masukkan kembali kode akses.'), { statusCode: 401 });
  switch (action) {
    case 'getAllData': return getAllData(sheets);
    case 'saveRecord': return saveRecord(sheets, args[0], args[1]);
    case 'deleteRecord': return (await deleteRows(sheets, args[0], [args[1]])) > 0;
    case 'bulkDelete': return deleteRows(sheets, args[0], args[1] || []);
    case 'bulkUpdate': {
      const [name, ids, patch] = args;
      if (!PREFIX[name]) throw new Error('Sheet tidak dikenal.');
      const rows = await sheetRows(sheets, name), wanted = new Set((ids || []).map(String));
      let count = 0;
      for (let i = 0; i < rows.length; i++) if (wanted.has(String(rows[i].ID))) {
        const next = { ...rows[i], ...patch };
        if (name === 'Contents') next.UpdatedAt = new Date().toISOString().slice(0, 16).replace('T', ' ');
        await sheets.spreadsheets.values.update({ spreadsheetId: SPREADSHEET_ID, range: `${quoteSheet(name)}!A${i + 2}`, valueInputOption: 'USER_ENTERED', requestBody: { values: [SCHEMA[name].map(h => next[h] ?? '')] } });
        count++;
      }
      return count;
    }
    case 'deleteAccount':
      for (const name of [...DATA_SHEETS, 'Accounts']) {
        if (name === 'Accounts') await deleteRows(sheets, name, [args[0]]);
        else {
          const owned = (await sheetRows(sheets, name)).filter(r => r.AccountID === args[0]).map(r => r.ID);
          if (owned.length) await deleteRows(sheets, name, owned);
        }
      }
      return true;
    case 'saveSettings': return saveSettings(sheets, args[0]);
    case 'savePrefs': return true;
    case 'exportToSheet': throw new Error('Ekspor spreadsheet belum tersedia; gunakan Download CSV.');
    case 'syncMetrics': throw new Error('Sinkronisasi metrik sosial perlu diimplementasikan terpisah.');
    default: throw new Error(`Aksi tidak didukung: ${action}`);
  }
}

export const handler = async event => {
  const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Gunakan POST.' }) };
  try {
    const body = JSON.parse(event.body || '{}');
    if (typeof body.action !== 'string' || !Array.isArray(body.args)) throw new Error('Format permintaan tidak valid.');
    const sheets = await sheetsClient();
    const token = (event.headers.authorization || event.headers.Authorization || '').replace(/^Bearer\s+/i, '');
    const data = await dispatch.call({ token }, sheets, body.action, body.args);
    return { statusCode: 200, headers, body: JSON.stringify({ data }) };
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return { statusCode, headers, body: JSON.stringify({ error: statusCode === 500 ? error.message : error.message }) };
  }
};
