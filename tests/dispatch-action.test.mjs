import test from "node:test";
import assert from "node:assert/strict";
import {
  codeHash,
  isSessionTokenValid,
} from "../netlify/functions/lib/session-auth.mjs";
import { dispatchAction } from "../netlify/functions/lib/dispatch-action.mjs";

test("authentication dispatch initializes storage and returns a signed session", async () => {
  const previousSecret = process.env.API_TOKEN_SECRET;
  process.env.API_TOKEN_SECRET = "dispatch-test-secret";
  const expectedHash = codeHash("test-access-code");
  const calls = [];
  const store = {
    ensureSheets: async () => calls.push("ensure"),
    getAccessHash: async () => expectedHash,
  };

  try {
    const result = await dispatchAction({
      store,
      action: "authenticate",
      args: ["test-access-code"],
    });

    assert.deepEqual(calls, ["ensure"]);
    assert.equal(
      isSessionTokenValid(result.token, expectedHash),
      true,
    );
  } finally {
    if (previousSecret === undefined) delete process.env.API_TOKEN_SECRET;
    else process.env.API_TOKEN_SECRET = previousSecret;
  }
});

test("dispatch blocks invalid sessions before calling protected actions", async () => {
  let protectedActionCalled = false;
  const store = {
    getAccessHash: async () => "current-hash",
    getAllData: async () => {
      protectedActionCalled = true;
      return {};
    },
  };

  await assert.rejects(
    dispatchAction({
      store,
      action: "getAllData",
      args: [],
      token: "invalid-token",
    }),
    { statusCode: 401, message: "Sesi berakhir. Masukkan kembali kode akses." },
  );
  assert.equal(protectedActionCalled, false);
});
