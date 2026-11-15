import test from "node:test";
import assert from "node:assert/strict";
import { resolveServiceAccountCredentials } from "../netlify/functions/lib/google-sheets-client.mjs";

const KEY = "-----BEGIN PRIVATE KEY-----\nsecret\n-----END PRIVATE KEY-----\n";

test("environment credentials win over an unreadable local key file", async () => {
  const unreadable = async () => {
    throw Object.assign(new Error("file missing"), { code: "ENOENT" });
  };
  const credentials = await resolveServiceAccountCredentials({
    env: {
      GOOGLE_SERVICE_ACCOUNT_EMAIL: "bot@example.iam.gserviceaccount.com",
      GOOGLE_PRIVATE_KEY: KEY.replace(/\n/g, "\\n"),
      GOOGLE_APPLICATION_CREDENTIALS: "./local-service-account.json",
    },
    readFileImpl: unreadable,
  });
  assert.equal(credentials.email, "bot@example.iam.gserviceaccount.com");
  assert.equal(credentials.privateKey, KEY);
});

test("escaped newlines in the private key are normalized", async () => {
  const credentials = await resolveServiceAccountCredentials({
    env: {
      GOOGLE_SERVICE_ACCOUNT_EMAIL: "bot@example.iam.gserviceaccount.com",
      GOOGLE_PRIVATE_KEY: "line1\\nline2",
    },
    readFileImpl: async () => "",
  });
  assert.equal(credentials.privateKey, "line1\nline2");
});

test("falls back to the local key file when environment credentials are absent", async () => {
  const credentials = await resolveServiceAccountCredentials({
    env: { GOOGLE_APPLICATION_CREDENTIALS: "./key.json" },
    readFileImpl: async () =>
      JSON.stringify({ client_email: "file@example.com", private_key: KEY }),
  });
  assert.deepEqual(credentials, { email: "file@example.com", privateKey: KEY });
});

test("returns null when the key file is unreadable so callers can report one error", async () => {
  const credentials = await resolveServiceAccountCredentials({
    env: { GOOGLE_APPLICATION_CREDENTIALS: "./missing.json" },
    readFileImpl: async () => {
      throw Object.assign(new Error("no such file"), { code: "ENOENT" });
    },
  });
  assert.equal(credentials, null);
});

test("returns null when the key file is not valid JSON or incomplete", async () => {
  const invalidJson = await resolveServiceAccountCredentials({
    env: { GOOGLE_APPLICATION_CREDENTIALS: "./key.json" },
    readFileImpl: async () => "not-json",
  });
  const incomplete = await resolveServiceAccountCredentials({
    env: { GOOGLE_APPLICATION_CREDENTIALS: "./key.json" },
    readFileImpl: async () => JSON.stringify({ client_email: "x@example.com" }),
  });
  assert.equal(invalidJson, null);
  assert.equal(incomplete, null);
});

test("returns null when no credential source is configured", async () => {
  const credentials = await resolveServiceAccountCredentials({
    env: {},
    readFileImpl: async () => "",
  });
  assert.equal(credentials, null);
});
