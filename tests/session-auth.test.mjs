import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import {
  codeHash,
  createSessionToken,
  isSessionTokenValid,
} from "../netlify/functions/lib/session-auth.mjs";

test("access-code hashing is deterministic and preserves the existing format", () => {
  assert.equal(codeHash("sample-code"), codeHash("sample-code"));
  assert.match(codeHash("sample-code"), /^h[a-z0-9]+$/);
  assert.notEqual(codeHash("sample-code"), codeHash("another-code"));
});

test("session tokens validate signature, access hash, and expiration", () => {
  const previousSecret = process.env.API_TOKEN_SECRET;
  process.env.API_TOKEN_SECRET = "test-secret-for-session-token";

  try {
    const token = createSessionToken("expected-hash");
    assert.equal(isSessionTokenValid(token, "expected-hash"), true);
    assert.equal(isSessionTokenValid(token, "different-hash"), false);
    assert.equal(isSessionTokenValid(`${token}tampered`, "expected-hash"), false);
    assert.equal(isSessionTokenValid("malformed", "expected-hash"), false);

    const expiredPayload = Buffer.from(
      JSON.stringify({ hash: "expected-hash", exp: Date.now() - 1000 }),
    ).toString("base64url");
    const expiredSignature = crypto
      .createHmac("sha256", process.env.API_TOKEN_SECRET)
      .update(expiredPayload)
      .digest("base64url");

    assert.equal(
      isSessionTokenValid(
        `${expiredPayload}.${expiredSignature}`,
        "expected-hash",
      ),
      false,
    );
  } finally {
    if (previousSecret === undefined) delete process.env.API_TOKEN_SECRET;
    else process.env.API_TOKEN_SECRET = previousSecret;
  }
});
