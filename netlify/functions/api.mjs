import { createGoogleSheetsClient } from "./lib/google-sheets-client.mjs";
import { dispatchAction } from "./lib/dispatch-action.mjs";
import { createPlannerStore } from "./lib/planner-store.mjs";

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

function bearerToken(headers = {}) {
  const authorization = headers.authorization || headers.Authorization || "";
  return authorization.replace(/^Bearer\s+/i, "");
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Gunakan POST." });
  }

  let action;
  try {
    const body = JSON.parse(event.body || "{}");
    if (typeof body.action !== "string" || !Array.isArray(body.args)) {
      throw new Error("Format permintaan tidak valid.");
    }
    action = body.action;

    const sheets = await createGoogleSheetsClient({
      missingPublicMessage:
        "Kredensial Google belum tersedia pada environment Netlify.",
    });
    const store = createPlannerStore(sheets);
    const data = await dispatchAction({
      store,
      action,
      args: body.args,
      token: bearerToken(event.headers),
    });

    return jsonResponse(200, { data });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message =
      action === "getSocialDashboardData" && statusCode >= 500
        ? error.publicMessage ||
          "Data dashboard sosial gagal dibaca. Periksa konfigurasi server dan izin Viewer pada spreadsheet."
        : error.message || "Terjadi kesalahan pada server.";
    return jsonResponse(statusCode, { error: message });
  }
};
