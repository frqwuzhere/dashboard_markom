const API_URL = window.CP_API_URL || "/.netlify/functions/api";

/**
 * Call the authenticated Netlify API and return its data envelope.
 * This classic script intentionally exposes `api` for the legacy app scripts.
 */
async function api(action, ...args) {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    window.CP_TIMEOUT || 45000,
  );

  try {
    const token = (() => {
      try {
        return (
          localStorage.getItem("cp2_ok") ||
          sessionStorage.getItem("cp2_ok") ||
          ""
        );
      } catch {
        return "";
      }
    })();
    const headers = { "Content-Type": "application/json" };

    if (action !== "authenticate" && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ action, args }),
      signal: controller.signal,
    });
    const result = await response
      .json()
      .catch(() => ({ error: "Respons backend tidak valid." }));

    if (!response.ok) {
      throw new Error(
        result.error || `Permintaan gagal (${response.status})`,
      );
    }
    return result.data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`Server tidak merespons (timeout) saat memanggil ${action}`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
