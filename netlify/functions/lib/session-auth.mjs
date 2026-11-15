import crypto from "node:crypto";

export const DEFAULT_CODE_HASH = "h33v3pk9m4g1uxjz375su8";

export function codeHash(code) {
  const h53 = (str, seed = 7) => {
    let h1 = 0xdeadbeef ^ seed;
    let h2 = 0x41c6ce57 ^ seed;

    for (let i = 0; i < str.length; i += 1) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }

    h1 =
      Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
      Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 =
      Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
      Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };

  return (
    "h" + h53("cp|" + code).toString(36) + h53("|" + code, 13).toString(36)
  );
}

export function createSessionToken(hash) {
  const secret = process.env.API_TOKEN_SECRET;
  if (!secret) throw new Error("API_TOKEN_SECRET belum dikonfigurasi.");

  const payload = Buffer.from(
    JSON.stringify({ hash, exp: Date.now() + 30 * 864e5 }),
  ).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function isSessionTokenValid(token, hash) {
  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return false;

    const expected = crypto
      .createHmac("sha256", process.env.API_TOKEN_SECRET || "")
      .update(payload)
      .digest();
    const actual = Buffer.from(signature, "base64url");
    if (
      actual.length !== expected.length ||
      !crypto.timingSafeEqual(actual, expected)
    ) {
      return false;
    }

    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return data.exp > Date.now() && data.hash === hash;
  } catch {
    return false;
  }
}
