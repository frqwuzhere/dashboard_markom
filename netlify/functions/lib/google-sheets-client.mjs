import { readFile } from "node:fs/promises";
import { google } from "googleapis";

/**
 * Create an authenticated Sheets client with server-side credentials.
 * Callers provide least-privilege scopes for their use case.
 */
export async function createGoogleSheetsClient({
  scopes = ["https://www.googleapis.com/auth/spreadsheets"],
  missingMessage = "Konfigurasi Google Service Account belum lengkap.",
  missingPublicMessage = "Kredensial Google belum tersedia.",
  credentialsPublicMessage = "File kredensial lokal tidak dapat dibaca.",
} = {}) {
  let email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    try {
      const credentials = JSON.parse(
        await readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf8"),
      );
      email = credentials.client_email;
      privateKey = credentials.private_key;
    } catch {
      throw Object.assign(
        new Error("Kredensial akun layanan tidak dapat dibaca."),
        { publicMessage: credentialsPublicMessage },
      );
    }
  }

  if (!email || !privateKey) {
    throw Object.assign(new Error(missingMessage), {
      publicMessage: missingPublicMessage,
    });
  }

  const auth = new google.auth.JWT({ email, key: privateKey, scopes });
  return google.sheets({ version: "v4", auth });
}
