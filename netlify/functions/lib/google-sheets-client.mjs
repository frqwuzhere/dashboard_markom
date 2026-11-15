import { readFile } from "node:fs/promises";
import { google } from "googleapis";

/**
 * Build service-account credentials from environment values.
 * The private key may arrive with escaped newlines when it is stored as a
 * single-line environment variable.
 */
function credentialsFromEnv(env) {
  const email = String(env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "").trim();
  const rawKey = env.GOOGLE_PRIVATE_KEY;
  const privateKey = rawKey ? String(rawKey).replace(/\\n/g, "\n") : "";
  return email && privateKey.trim() ? { email, privateKey } : null;
}

/**
 * Read service-account credentials from a local JSON key file.
 * Returns null instead of throwing so callers can report one clear error.
 */
async function credentialsFromFile(env, readFileImpl) {
  const credentialsPath = String(env.GOOGLE_APPLICATION_CREDENTIALS || "").trim();
  if (!credentialsPath) return null;
  try {
    const parsed = JSON.parse(await readFileImpl(credentialsPath, "utf8"));
    if (parsed?.client_email && parsed?.private_key) {
      return { email: parsed.client_email, privateKey: parsed.private_key };
    }
    console.warn(
      "[google-sheets-client] File kredensial tidak memuat client_email/private_key.",
    );
  } catch (error) {
    // Netlify Functions have no access to the developer's local key file, so a
    // missing or unreadable file must not fail the whole request on its own.
    console.warn(
      `[google-sheets-client] GOOGLE_APPLICATION_CREDENTIALS tidak dapat dibaca (${error.code || error.name}).`,
    );
  }
  return null;
}

/**
 * Resolve service-account credentials, preferring explicit environment
 * variables over a local key file path.
 *
 * Order matters for deployment: a development-only
 * GOOGLE_APPLICATION_CREDENTIALS pointing at a local file used to override the
 * Netlify environment variables and break every request.
 *
 * @returns {Promise<{email: string, privateKey: string} | null>}
 */
export async function resolveServiceAccountCredentials({
  env = process.env,
  readFileImpl = readFile,
} = {}) {
  return credentialsFromEnv(env) || (await credentialsFromFile(env, readFileImpl));
}

/**
 * Create an authenticated Sheets client with server-side credentials.
 * Callers provide least-privilege scopes for their use case.
 */
export async function createGoogleSheetsClient({
  scopes = ["https://www.googleapis.com/auth/spreadsheets"],
  missingMessage = "Konfigurasi Google Service Account belum lengkap.",
  missingPublicMessage = "Kredensial Google belum tersedia. Atur GOOGLE_SERVICE_ACCOUNT_EMAIL dan GOOGLE_PRIVATE_KEY pada environment Netlify.",
} = {}) {
  const credentials = await resolveServiceAccountCredentials();
  if (!credentials) {
    throw Object.assign(new Error(missingMessage), {
      publicMessage: missingPublicMessage,
    });
  }

  const auth = new google.auth.JWT({
    email: credentials.email,
    key: credentials.privateKey,
    scopes,
  });
  return google.sheets({ version: "v4", auth });
}
