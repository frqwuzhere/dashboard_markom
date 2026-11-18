/* ======================= EXPORT ======================= */
const EX = { scope: "current", range: "month", target: "tab", split: false };
function openExport() {
  closePop();
  EX.target = "csv";
  if (isAll()) EX.scope = "all";
  const [a, b] = monthRange(S.month),
    cur = curAcc();
  const tg = [["csv", "Download CSV", "Untuk Excel / Sheets", false]];
  openSheet(`<div class="grab"></div><div class="sh-h"><h3>Export ke Sheet</h3><button class="ib bare" onclick="closeSheet()" aria-label="Tutup">${ic("x")}</button></div>
  <div class="sh-b"><div class="fg">
    <div class="f full"><label>Akun</label><div class="seg" id="exScope">${cur ? `<button data-v="current" class="${EX.scope === "current" ? "on" : ""}">${esc(cur.Name)}</button>` : ""}<button data-v="all" class="${EX.scope === "all" || !cur ? "on" : ""}">Semua akun (${S.data.accounts.length})</button></div></div>
    <div class="f full" id="splitW"><label class="toggle"><input type="checkbox" class="ck" id="exSplit" ${EX.split ? "checked" : ""}>Pisahkan jadi satu tab per akun</label></div>
    <div class="f full"><label>Rentang</label><div class="seg" id="exRange"><button data-v="month" class="${EX.range === "month" ? "on" : ""}">${BULAN[S.month.getMonth()]}</button><button data-v="all" class="${EX.range === "all" ? "on" : ""}">Semua</button><button data-v="custom" class="${EX.range === "custom" ? "on" : ""}">Pilih tanggal</button></div></div>
    <div class="f" id="fromW"><label for="exFrom">Dari</label><input class="in" type="date" id="exFrom" value="${a}"></div>
    <div class="f" id="toW"><label for="exTo">Sampai</label><input class="in" type="date" id="exTo" value="${b}"></div>
    <div class="f"><label for="exSt">Status</label><select class="in" id="exSt">${opts(STATUSES, "", "Semua status")}</select></div>
    <div class="f"><label for="exPl">Platform</label><select class="in" id="exPl">${opts(PLATFORMS, "", "Semua platform")}</select></div>
    <div class="f full"><label>Simpan sebagai</label><div class="opts" id="exT">${tg.map(([k, t, d, dis]) => `<button class="opt ${EX.target === k ? "on" : ""}" data-v="${k}" ${dis ? "disabled" : ""}><b>${t}</b><span>${d}</span></button>`).join("")}</div></div>
    <p class="f full hint" id="exCnt"></p>
  </div></div>
  <div class="sh-f"><span class="sp"></span><button class="btn desk" onclick="closeSheet()">Batal</button><button class="btn pri" id="exB">${ic("sheet", 17)}Export sekarang</button></div>`);
  const seg = (sel, key) =>
    ($(sel).onclick = (e) => {
      const b = e.target.closest("button");
      if (!b || b.disabled) return;
      EX[key] = b.dataset.v;
      $$(sel + " button").forEach((x) => x.classList.toggle("on", x === b));
      sync();
    });
  seg("#exScope", "scope");
  seg("#exRange", "range");
  seg("#exT", "target");
  ["#exFrom", "#exTo", "#exSt", "#exPl", "#exSplit"].forEach(
    (s) => ($(s).onchange = sync),
  );
  $("#exB").onclick = doExport;
  sync();
  function sync() {
    if (!cur) EX.scope = "all";
    $("#fromW").style.display = $("#toW").style.display =
      EX.range === "custom" ? "" : "none";
    $("#splitW").style.display =
      EX.scope === "all" && EX.target !== "csv" && S.data.accounts.length > 1
        ? ""
        : "none";
    $("#exCnt").textContent =
      `${exRows(exOpts()).length} konten akan diexport.`;
  }
}
function exOpts() {
  let from = "",
    to = "";
  if (EX.range === "month") [from, to] = monthRange(S.month);
  if (EX.range === "custom") {
    from = $("#exFrom").value;
    to = $("#exTo").value;
  }
  EX.split = $("#exSplit").checked;
  return {
    accountIds:
      EX.scope === "all" || !curAcc()
        ? S.data.accounts.map((a) => a.ID)
        : [S.acc],
    from,
    to,
    status: $("#exSt").value,
    platform: $("#exPl").value,
    target: EX.target,
    splitByAccount: EX.scope === "all" && EX.split,
  };
}
const exRows = (o) =>
  S.data.contents
    .filter(
      (c) =>
        o.accountIds.includes(c.AccountID) &&
        (!o.from || c.Date >= o.from) &&
        (!o.to || c.Date <= o.to) &&
        (!o.status || c.Status === o.status) &&
        (!o.platform || c.Platform === o.platform),
    )
    .sort(sortDT);
function doExport() {
  const o = exOpts(),
    b = $("#exB");
  if (o.target === "csv") {
    downloadCSV(exRows(o), o);
    return closeSheet();
  }
  b.disabled = true;
  b.textContent = "Mengexport…";
  api("exportToSheet", o)
    .then((r) => {
      closeSheet();
      toast(
        `${r.count} konten diexport${r.tabs > 1 ? ` ke ${r.tabs} tab` : ""}`,
        { url: r.url },
      );
    })
    .catch((e) => {
      toast(errMsg(e));
      b.disabled = false;
      b.textContent = "Coba export lagi";
    });
}
function downloadCSV(rows, o) {
  const H = [
    "Akun",
    "Tanggal",
    "Hari",
    "Jam",
    "Judul",
    "Platform",
    "Format",
    "Status",
    "Progres",
    "Campaign",
    "Pillar",
    "Caption",
    "Hashtag",
    "Link Post",
    "Link Hasil",
    "Link Referensi",
  ];
  const q = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const body = rows.map((c) => {
    const [d, t] = progress(c);
    return [
      (accById(c.AccountID) || {}).Name,
      c.Date,
      HARI_F[pd(c.Date).getDay()],
      c.Time,
      c.Title,
      c.Platform,
      c.Format,
      c.Status,
      t ? `${d}/${t}` : "",
      c.Campaign,
      c.Pillar,
      c.Caption,
      c.Hashtags,
      c.PostLink,
      c.ResultLink,
      pj(c.Links, [])
        .map((x) => x.url)
        .join(" "),
    ]
      .map(q)
      .join(",");
  });
  const csv = "\ufeff" + [H.map(q).join(","), ...body].join("\n");
  const name = `content-planner_${o.from || "semua"}${o.to ? "_" + o.to : ""}.csv`;
  try {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast(`${rows.length} konten diunduh`);
  } catch (e) {
    window.open("data:text/csv;charset=utf-8," + encodeURIComponent(csv));
  }
}

/* ======================= Quick, more, toast ======================= */
function toggleQuick(e) {
  e && e.stopPropagation();
  const p = $("#pop");
  if (p.classList.contains("open") && p.dataset.k === "quick")
    return closePop();
  p.dataset.k = "quick";
  p.style.left = "";
  p.style.top = "";
  p.innerHTML = `<div class="menu"><button onclick="closePop();newContent()">${ic("calendar")}<span class="t">Konten baru<span>Jadwalkan posting</span></span></button>
    <button onclick="closePop();go('ideas');setTimeout(()=>$('#cap')?.focus(),50)">${ic("bulb")}<span class="t">Catat ide / link<span>Simpan ke Idea Bank</span></span></button>
    <button onclick="openExport()">${ic("sheet")}<span class="t">Export ke Sheet</span></button>
    <button onclick="closePop();openAccMenu()">${ic("swap")}<span class="t">Ganti akun</span></button></div>`;
  p.classList.add("open");
  $("#fab").classList.add("open");
}
function openMore() {
  openSheet(
    `<div class="grab"></div><div class="sh-h"><h3>Menu</h3><button class="ib bare" onclick="closeSheet()" aria-label="Tutup">${ic("x")}</button></div>
  <div class="sh-b"><div class="menu">
    <button onclick="openAccMenu()">${avatar(curAcc(), "sm")}<span class="t">Ganti akun<span>${esc(curAcc() ? curAcc().Name : "Semua akun")}</span></span></button><hr>
    <button onclick="go('analytics')">${ic("chart")}<span class="t">Analytics</span></button>
    <button onclick="go('dashboardView')">${ic("dashboard")}<span class="t">Dashboard</span></button>
    <button onclick="openNotes()">${ic("note")}<span class="t">Catatan</span></button>
    <button onclick="go('campaign')">${ic("flag")}<span class="t">Campaign</span></button>
    <button onclick="go('resources')">${ic("folder")}<span class="t">Resources</span></button>
    <button onclick="go('accounts')">${ic("users")}<span class="t">Kelola akun</span></button>
    <button onclick="openExport()">${ic("sheet")}<span class="t">Export ke Sheet</span></button>
    <button onclick="go('settings')">${ic("palette")}<span class="t">Tema & pengaturan</span></button></div></div>`,
    "narrow",
  );
}
let tT, tFn;
function toast(msg, o = {}) {
  const t = $("#toast");
  tFn = o.undo || (o.action && o.action[1]) || null;
  t.innerHTML = `<span class="msg">${esc(msg)}</span>${o.url ? `<a href="${esc(o.url)}" target="_blank" rel="noopener">Buka</a>` : ""}${o.undo ? `<button onclick="runToast()">Urungkan</button>` : ""}${o.action ? `<button onclick="runToast()">${esc(o.action[0])}</button>` : ""}`;
  t.classList.add("show");
  clearTimeout(tT);
  tT = setTimeout(
    () => t.classList.remove("show"),
    o.url || o.undo || o.action ? 6500 : 2800,
  );
}
function runToast() {
  $("#toast").classList.remove("show");
  const f = tFn;
  tFn = null;
  f && f();
}
const errMsg = (e) => (e && e.message) || String(e) || "Terjadi kesalahan";
