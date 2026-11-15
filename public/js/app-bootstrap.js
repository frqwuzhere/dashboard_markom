/* ======================= Keyboard, gestur, resize ======================= */
document.addEventListener("keydown", (e) => {
  if (document.body.classList.contains("locked")) return;
  if (e.key === "Escape") {
    closeSheet();
    closePop();
    return;
  }
  if (
    e.target.closest("input,textarea,select") ||
    e.metaKey ||
    e.ctrlKey ||
    e.altKey ||
    $("#ov").classList.contains("open")
  )
    return;
  const k = e.key.toLowerCase();
  if (k === "n") {
    e.preventDefault();
    newContent();
  } else if (k === "i") {
    e.preventDefault();
    openEntity("Ideas");
  } else if (k === "/") {
    e.preventDefault();
    if (S.view !== "content") go("content");
    setTimeout(() => $("#q")?.focus(), 30);
  } else if (k === "c" && S.view === "content")
    setCMode(S.cmode === "calendar" ? "list" : "calendar");
  else if (k === "a") openAccMenu(isMob() ? null : $("#profileBtn"));
  else if (
    (k === "arrowleft" || k === "arrowright") &&
    ["content", "analytics"].includes(S.view)
  )
    shiftMonth(k === "arrowleft" ? -1 : 1);
});
let tx = 0,
  ty = 0;
document.addEventListener(
  "touchstart",
  (e) => {
    if (e.target.closest("#swipe")) {
      tx = e.touches[0].clientX;
      ty = e.touches[0].clientY;
    } else tx = 0;
  },
  { passive: true },
);
document.addEventListener(
  "touchend",
  (e) => {
    if (!tx) return;
    const dx = e.changedTouches[0].clientX - tx,
      dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5)
      shiftMonth(dx < 0 ? 1 : -1);
    tx = 0;
  },
  { passive: true },
);
let lastMob = isMob();
addEventListener("resize", () => {
  const m = isMob();
  if (m !== lastMob) {
    lastMob = m;
    closePop();
    render();
  }
});
/* ======================= Init ======================= */
/* ======================= Kunci akses ======================= */
const DEF_CODE = "admin123";
function h53(str, seed) {
  seed = seed || 7;
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
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
}
const codeHash = (c) =>
  "h" + h53("cp|" + c).toString(36) + h53("|" + c, 13).toString(36);
const accessHash = () =>
  (S.data.settings || {}).AccessHash ||
  store.get("cp2_hash", "") ||
  codeHash(DEF_CODE);
const unlockTok = () => {
  try {
    return (
      localStorage.getItem("cp2_ok") || sessionStorage.getItem("cp2_ok") || ""
    );
  } catch (e) {
    return "";
  }
};
const isUnlocked = () => !!unlockTok();
let lkTry = 0,
  lkBlock = 0;
function showLock() {
  $("#lock").classList.remove("hide");
  document.body.classList.add("locked");
  closeSheet();
  closePop();
  setTimeout(() => {
    const i = $("#lkIn");
    i && i.focus();
  }, 60);
}
function hideLock() {
  $("#lock").classList.add("hide");
  document.body.classList.remove("locked");
}
function lkMsg(t) {
  $("#lkErr").textContent = t || "";
}
function lkEye() {
  const i = $("#lkIn"),
    on = i.type === "password";
  i.type = on ? "text" : "password";
  $("#lkEye").innerHTML = ic(on ? "eyeoff" : "eye", 20);
}
function setToken(tok, remember) {
  try {
    if (remember) {
      localStorage.setItem("cp2_ok", tok);
      sessionStorage.removeItem("cp2_ok");
    } else {
      sessionStorage.setItem("cp2_ok", tok);
      localStorage.removeItem("cp2_ok");
    }
  } catch (e) {}
}
async function tryUnlock() {
  const inp = $("#lkIn"),
    v = inp.value;
  if (!v) return lkMsg("Masukkan kode akses.");
  if (Date.now() < lkBlock)
    return lkMsg("Terlalu banyak percobaan. Coba lagi beberapa detik lagi.");
  const go = $("#lkGo");
  go.disabled = true;
  try {
    lkMsg("Memeriksa…");
    const result = await api("authenticate", v);
    go.disabled = false;
    setToken(result.token, $("#lkRm").checked);
    inp.value = "";
    lkMsg("");
    lkTry = 0;
    hideLock();
    await reload();
  } catch (e) {
    go.disabled = false;
    lkTry++;
    if (lkTry >= 5) {
      lkBlock = Date.now() + 15000;
      lkTry = 0;
    }
    lkMsg(errMsg(e).includes("401") ? "Kode akses salah." : errMsg(e));
    const c = $("#lkCard");
    c.classList.remove("shake");
    void c.offsetWidth;
    c.classList.add("shake");
    inp.select();
  }
}
function lockNow() {
  try {
    localStorage.removeItem("cp2_ok");
    sessionStorage.removeItem("cp2_ok");
  } catch (e) {}
  window.SocialDashboard?.destroy();
  const i = $("#lkIn");
  i.value = "";
  i.type = "password";
  $("#lkEye").innerHTML = ic("eye", 20);
  lkMsg("");
  showLock();
}
function relockCheck() {
  if ($("#lock").classList.contains("hide") && !isUnlocked()) showLock();
}
function saveCode(b) {
  const o = $("#cOld").value,
    n = $("#cNew").value,
    n2 = $("#cNew2").value;
  if (codeHash(o) !== accessHash()) return toast("Kode saat ini salah");
  if (n.length < 4) return toast("Kode baru minimal 4 karakter");
  if (n !== n2) return toast("Pengulangan kode baru tidak sama");
  const h = codeHash(n);
  b.disabled = true;
  api("saveSettings", { AccessHash: h })
    .then(() => {
      S.data.settings.AccessHash = h;
      store.set("cp2_hash", h);
      const remember = !!(() => {
        try {
          return localStorage.getItem("cp2_ok");
        } catch (e) {
          return "";
        }
      })();
      return api("authenticate", n).then((r) => {
        setToken(r.token, remember);
        render();
        toast("Kode akses diganti");
      });
    })
    .catch((e) => toast("Gagal menyimpan: " + errMsg(e)))
    .finally(() => (b.disabled = false));
}

/* ======================= Catatan ======================= */
let nT;
const noteVis = () =>
  S.notes
    .filter((n) => !n.del)
    .sort(
      (a, b) => (b.pin ? 1 : 0) - (a.pin ? 1 : 0) || (b.u || 0) - (a.u || 0),
    );
const noteTitle = (n) => {
  const l = String(n.b || "")
    .split("\n")
    .find((x) => x.trim());
  return l ? l.trim().slice(0, 70) : "Catatan baru";
};
const notePrev = (n) => {
  const l = String(n.b || "")
    .split("\n")
    .filter((x) => x.trim());
  return l[1] ? l[1].trim().slice(0, 90) : "Tidak ada teks tambahan";
};
const noteDate = (u) => {
  const d = new Date(u || Date.now()),
    t = new Date();
  return d.toDateString() === t.toDateString()
    ? pad(d.getHours()) + ":" + pad(d.getMinutes())
    : d.getDate() + " " + BLN[d.getMonth()];
};
function saveNotes() {
  S.notes = S.notes.filter((n) => !n.del || Date.now() - (n.u || 0) < 2592e6);
  store.set("cp2_notes", S.notes);
  clearTimeout(nT);
  nT = setTimeout(syncNotes, 1200);
  renderNotesW();
}
function syncNotes() {
  const j = JSON.stringify(S.notes);
  if (j.length > 45000) {
    toast(
      "Catatan terlalu panjang untuk disinkronkan, hanya tersimpan di perangkat ini",
    );
    return;
  }
  api("saveSettings", { Notes: j })
    .then(() => {
      S.data.settings.Notes = j;
    })
    .catch(() => {});
}
function mergeNotes() {
  let srv = [];
  try {
    srv = JSON.parse((S.data.settings || {}).Notes || "[]");
  } catch (e) {}
  if (!Array.isArray(srv)) srv = [];
  const map = {};
  S.notes.forEach((n) => (map[n.id] = n));
  srv.forEach((n) => {
    if (!n || !n.id) return;
    const l = map[n.id];
    if (!l || (n.u || 0) > (l.u || 0)) map[n.id] = n;
  });
  const merged = Object.values(map);
  const before = JSON.stringify(S.notes);
  S.notes = merged;
  const after = JSON.stringify(S.notes);
  if (before !== after) store.set("cp2_notes", S.notes);
  if (after !== JSON.stringify(srv) && S.notes.length) syncNotes();
}
function renderNotesW() {
  const el = $("#notesW");
  if (!el) return;
  const l = noteVis();
  el.innerHTML = `<div class="nh"><span class="ni">${ic("note", 15)}</span><b>Catatan</b><button class="nadd" onclick="newNote()" aria-label="Catatan baru" title="Catatan baru">${ic("plus", 16)}</button></div>
  <div class="nl">${
    l.length
      ? l
          .slice(0, 8)
          .map(
            (n) =>
              `<button class="nr" onclick="openNotes('${n.id}')"><b>${n.pin ? `<span class="npin">${ic("pin", 12)}</span>` : ""}${esc(noteTitle(n))}</b><small><em>${noteDate(n.u)}</em>${esc(notePrev(n))}</small></button>`,
          )
          .join("")
      : `<p class="ne">Belum ada catatan. Ketuk + untuk mulai menulis.</p>`
  }</div>
  ${l.length > 3 ? `<button class="nall" onclick="openNotes()">Lihat semua (${l.length})</button>` : ""}`;
}
function noteListHTML(q) {
  q = String(q || "")
    .trim()
    .toLowerCase();
  const l = noteVis().filter(
    (n) => !q || String(n.b).toLowerCase().includes(q),
  );
  return l.length
    ? l
        .map(
          (n) =>
            `<button class="nli" onclick="openNote('${n.id}')"><b>${n.pin ? `<span class="npin">${ic("pin", 13)}</span>` : ""}${esc(noteTitle(n))}</b><small>${noteDate(n.u)} · ${esc(notePrev(n))}</small></button>`,
        )
        .join("")
    : `<div class="empty"><b>${q ? "Tidak ada yang cocok" : "Belum ada catatan"}</b>${q ? "" : "Tulis ide, to-do, atau pengingat singkat di sini."}</div>`;
}
function noteFilter(v) {
  $("#nlist").innerHTML = noteListHTML(v);
}
function openNotes(id) {
  if (id) return openNote(id);
  openSheet(
    `<div class="grab"></div><div class="sh-h"><h3>Catatan</h3><button class="btn pri sm" onclick="newNote()">${ic("plus", 15)}Baru</button><button class="ib bare" onclick="closeSheet()" aria-label="Tutup">${ic("x")}</button></div>
  <div class="sh-b"><input class="in" id="nq" placeholder="Cari catatan…" oninput="noteFilter(this.value)" style="margin-bottom:12px"><div id="nlist" class="nlist">${noteListHTML("")}</div></div>`,
    "narrow",
  );
}
function newNote() {
  const n = {
    id: "N" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    b: "",
    u: Date.now(),
    pin: 0,
  };
  S.notes.unshift(n);
  saveNotes();
  openNote(n.id);
}
function openNote(id) {
  const n = S.notes.find((x) => x.id === id);
  if (!n || n.del) return openNotes();
  openSheet(
    `<div class="grab"></div><div class="sh-h"><button class="ib bare" onclick="noteDone('${id}')" aria-label="Kembali ke daftar">${ic("chevL")}</button><h3>Catatan</h3><button class="ib bare" id="npin" onclick="notePin('${id}')" aria-label="Sematkan" title="Sematkan">${ic("pin")}</button><button class="ib bare" onclick="noteDel('${id}',this)" aria-label="Hapus catatan" title="Hapus">${ic("trash")}</button></div>
  <div class="sh-b"><textarea class="ned" id="ned" placeholder="Judul di baris pertama, lalu isi catatan…" oninput="noteInput('${id}',this.value)">${esc(n.b)}</textarea></div>
  <div class="sh-f"><span class="muted" style="align-self:center;font-size:12.5px">Tersimpan otomatis</span><span class="sp"></span><button class="btn pri" onclick="noteDone('${id}')">Selesai</button></div>`,
    "",
  );
  $("#npin").classList.toggle("on", !!n.pin);
  setTimeout(() => {
    const t = $("#ned");
    t && t.focus();
  }, 60);
}
function noteInput(id, v) {
  const n = S.notes.find((x) => x.id === id);
  if (!n) return;
  n.b = v;
  n.u = Date.now();
  saveNotes();
}
function notePin(id) {
  const n = S.notes.find((x) => x.id === id);
  if (!n) return;
  n.pin = n.pin ? 0 : 1;
  n.u = Date.now();
  saveNotes();
  $("#npin").classList.toggle("on", !!n.pin);
}
function noteDel(id, b) {
  if (!b.dataset.arm) {
    b.dataset.arm = 1;
    b.classList.add("danger");
    toast("Tekan ikon sampah sekali lagi untuk menghapus");
    setTimeout(() => {
      delete b.dataset.arm;
      b.classList.remove("danger");
    }, 2500);
    return;
  }
  const n = S.notes.find((x) => x.id === id);
  if (n) {
    n.del = 1;
    n.b = "";
    n.u = Date.now();
    saveNotes();
  }
  toast("Catatan dihapus");
  openNotes();
}
function noteDone(id) {
  const n = S.notes.find((x) => x.id === id);
  if (n && !String(n.b).trim()) {
    n.del = 1;
    n.u = Date.now();
    saveNotes();
  }
  openNotes();
}

/* ======================= Muat data (cepat: pakai cache dulu) ======================= */
function vWait() {
  if (S.loadErr)
    return `<div class="pn"><h3>Data belum bisa dimuat</h3><p style="color:var(--ink2);margin-bottom:12px;white-space:pre-wrap">${esc(S.loadErr)}</p><p style="color:var(--ink3);font-size:13px;margin-bottom:14px">Pastikan konfigurasi Google Sheets di Netlify sudah benar dan akses Editor sudah diberikan ke service account.</p><button class="btn pri" onclick="S.loadErr='';render();reload()">Coba lagi</button></div>`;
  return `<div class="skel"><i style="height:190px"></i><i style="height:110px"></i><i style="height:110px"></i></div>`;
}
function saveCache() {
  try {
    localStorage.setItem("cp2_cache", JSON.stringify(S.data));
  } catch (e) {}
}
S.firstLoad = new Promise((r) => {
  S._fl = r;
});
function reload() {
  const b = $("#refBtn");
  b.style.opacity = 0.5;
  if (S.ready && S.view !== "dashboardView") {
    S.loading = true;
    render();
  }
  return api("getAllData")
    .then((d) => {
      if (!d || !Array.isArray(d.accounts))
        throw new Error(
          "Server mengembalikan data kosong/rusak. Pastikan Code.gs terbaru sudah di-deploy sebagai New version.",
        );
      Object.assign(S.data, d);
      let hasLocal = false;
      try {
        hasLocal = !!localStorage.getItem("cp2_prefs");
      } catch (e) {}
      if (d.prefs && d.prefs.theme && !hasLocal)
        Object.assign(S.prefs, d.prefs);
      S.ready = true;
      S.loading = false;
      S.loadErr = "";
      mergeNotes();
      fixAcc();
      applyPrefs();
      $("#demoBox").innerHTML = "";
      render();
      saveCache();
      relockCheck();
    })
    .catch((e) => {
      S.loading = false;
      if (errMsg(e).includes("Sesi berakhir")) {
        try {
          localStorage.removeItem("cp2_ok");
          sessionStorage.removeItem("cp2_ok");
        } catch (_) {}
        showLock();
      }
      if (S.ready) {
        render();
        toast("Gagal memuat data: " + errMsg(e));
      }
      else {
        S.loadErr = "Gagal memuat data:\n" + errMsg(e);
        render();
      }
    })
    .finally(() => {
      b.style.opacity = 1;
      S._fl();
    });
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden && S.ready) saveCache();
});
try {
  const c = store.get("cp2_cache", null);
  if (c && Array.isArray(c.accounts)) {
    Object.assign(S.data, c);
    S.ready = true;
    fixAcc();
  }
  chrome();
  applyPrefs();
  applyLogo();
  $("#lkIc").innerHTML = ic("lock", 20);
  $("#lkEye").innerHTML = ic("eye", 20);
  $("#lkArr").innerHTML = ic("right", 18);
  const nm = (S.data.settings || {}).AppName;
  if (nm) $("#lkT").textContent = nm;
  render();
  if (isUnlocked()) hideLock();
  else showLock();
  window.__cpReady = true;
  clearTimeout(window.__cpWd);
} catch (e) {
  cpShowErr("Gagal menyiapkan tampilan: " + errMsg(e));
}
reload();
