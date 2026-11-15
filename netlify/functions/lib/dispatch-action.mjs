import { getSocialDashboardData } from "./social-metrics.mjs";
import {
  codeHash,
  createSessionToken,
  isSessionTokenValid,
} from "./session-auth.mjs";

function unauthorizedError(message) {
  return Object.assign(new Error(message), { statusCode: 401 });
}

export async function dispatchAction({ store, action, args, token }) {
  if (action === "authenticate") {
    await store.ensureSheets();
    const expectedHash = await store.getAccessHash();
    if (codeHash(String(args[0] || "")) !== expectedHash) {
      throw unauthorizedError("Kode akses salah.");
    }
    return { token: createSessionToken(expectedHash) };
  }

  const accessHash = await store.getAccessHash();
  if (!isSessionTokenValid(token, accessHash)) {
    throw unauthorizedError("Sesi berakhir. Masukkan kembali kode akses.");
  }

  switch (action) {
    case "getAllData":
      return store.getAllData();
    case "getSocialDashboardData":
      return getSocialDashboardData(args[0] || {});
    case "saveRecord":
      return store.saveRecord(args[0], args[1]);
    case "deleteRecord":
      return (await store.deleteRows(args[0], [args[1]])) > 0;
    case "bulkDelete":
      return store.deleteRows(args[0], args[1] || []);
    case "bulkUpdate":
      return store.bulkUpdate(args[0], args[1], args[2]);
    case "deleteAccount":
      return store.deleteAccount(args[0]);
    case "saveSettings":
      return store.saveSettings(args[0]);
    case "savePrefs":
      return true;
    case "exportToSheet":
      throw new Error(
        "Ekspor spreadsheet belum tersedia; gunakan Download CSV.",
      );
    case "syncMetrics":
      throw new Error(
        "Sinkronisasi metrik sosial perlu diimplementasikan terpisah.",
      );
    default:
      throw new Error(`Aksi tidak didukung: ${action}`);
  }
}
