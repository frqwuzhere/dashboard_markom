/* ======================= BERANDA ======================= */
function ring(p) {
  const r = 44,
    c = 2 * Math.PI * r;
  return `<svg width="112" height="112" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--line)" stroke-width="9"/><circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--ac)" stroke-width="9" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - Math.min(p, 1))}" transform="rotate(-90 50 50)"/></svg>`;
}
function liContent(c, showDate = true) {
  const d = pd(c.Date);
  return `<div class="li" onclick="openEntity('Contents','${c.ID}')"><div class="item" style="padding:0;border:0;background:none;--c:${FC[c.Format]}"><div class="when"><b>${showDate ? d.getDate() : esc(c.Time)}</b><span>${showDate ? BLN[d.getMonth()] : PSHORT[c.Platform] || ""}</span></div></div>
    <div class="m"><b>${esc(c.Title)}</b><span>${isAll() ? esc((accById(c.AccountID) || {}).Name || "") + " · " : ""}${esc(c.Time || "")} · ${esc(c.Format)}</span></div>
    <span class="chip dot" style="--c:${SC[c.Status]}">${esc(c.Status)}</span></div>`;
}
function vSched() {
  const all = scoped(S.data.contents),
    st = S.data.settings || {};
  const today = all.filter((c) => c.Date === TODAY).sort(sortDT);
  const ws = weekStart(TODAY),
    we = addD(ws, 6),
    wk = all.filter((c) => c.Date >= ws && c.Date <= we && c.Status !== "Idea");
  const wpub = wk.filter((c) => c.Status === "Published").length;
  const target = isAll()
    ? S.data.accounts.reduce((a, x) => a + (+x.TargetPerWeek || 0), 0)
    : +(curAcc() || {}).TargetPerWeek || 0;
  const mo = inMonth(all),
    cnt = (s) => mo.filter((c) => c.Status === s).length;
  const next = all
    .filter(
      (c) =>
        c.Date > TODAY && c.Date <= addD(TODAY, 7) && c.Status !== "Published",
    )
    .sort(sortDT);
  const late = all.filter(overdue).sort(sortDT);
  const ready = scoped(S.data.ideas)
    .filter((i) => i.Status === "Siap dibuat" || i.Priority === "High")
    .slice(0, 4);
  const hour = NOW.getHours(),
    greet =
      hour < 11
        ? "Selamat pagi"
        : hour < 15
          ? "Selamat siang"
          : hour < 19
            ? "Selamat sore"
            : "Selamat malam";
  return `<div class="dg">
    <div class="pn s5"><h3>${ic("calendar", 18)}Hari ini <button class="r" onclick="newContent({Date:'${TODAY}'})">+ Tambah</button></h3>
      ${today.length ? today.map((c) => liContent(c, false)).join("") : `<div class="empty" style="padding:18px 8px"><b>Tidak ada jadwal hari ini</b>Waktu yang pas untuk menyiapkan konten minggu depan.</div>`}</div>
    <div class="pn s3"><h3>${ic("target", 18)}Target minggu ini</h3>
      <div class="ringwrap"><div class="ringc">${ring(target ? wk.length / target : 0)}<div><span>${wk.length}/${target || "–"}<small>terjadwal</small></span></div></div>
      <div><div class="big">${wpub}</div><span class="muted">sudah tayang</span>${target && wk.length < target ? `<p class="muted" style="font-size:12.5px;margin-top:8px">Kurang ${target - wk.length} konten lagi</p>` : ""}</div></div></div>
    <div class="pn s4"><h3>${ic("chart", 18)}Pipeline ${BULAN[S.month.getMonth()]}</h3>
      <div class="big" style="margin-bottom:10px">${mo.length}<span class="muted" style="font-size:14px;font-family:var(--fb);font-weight:600"> konten</span></div>
      <div class="pipe">${STATUSES.map((s) => (cnt(s) ? `<i style="--s:${SC[s]};flex:${cnt(s)}" title="${s}: ${cnt(s)}"></i>` : "")).join("")}</div>
      <div class="legend">${STATUSES.map((s) => `<div><i class="sdot" style="--s:${SC[s]}"></i>${s}<b>${cnt(s)}</b></div>`).join("")}</div></div>
    ${
      late.length
        ? `<div class="pn warn s12"><h3 style="color:#dc2626">${ic("alert", 18)}${late.length} konten lewat jadwal tapi belum published <button class="r" onclick="S.cmode='list';S.range='overdue';store.set('cp2_cmode','list');go('content')">Lihat semua</button></h3>
      ${late
        .slice(0, 3)
        .map((c) => liContent(c))
        .join("")}</div>`
        : ""
    }
    <div class="pn s7"><h3>${ic("list", 18)}7 hari ke depan <button class="r" onclick="S.cmode='list';S.range='upcoming';store.set('cp2_cmode','list');go('content')">Buka list</button></h3>
      ${
        next.length
          ? next
              .slice(0, 7)
              .map((c) => liContent(c))
              .join("")
          : `<div class="empty" style="padding:18px 8px"><b>Minggu depan masih kosong</b>Jadwalkan dari Idea Bank atau buat konten baru.</div>`
      }</div>
    <div class="pn s5"><h3>${ic("bulb", 18)}Ide siap dieksekusi <button class="r" onclick="go('ideas')">Idea Bank</button></h3>
      ${ready.length ? ready.map((i) => `<div class="li" onclick="openEntity('Ideas','${i.ID}')"><div class="m"><b>${esc(i.Title)}</b><span>${esc(i.Format || "")}${pj(i.Links, []).length ? ` · ${pj(i.Links, []).length} link` : ""}</span></div><button class="btn sm" onclick="event.stopPropagation();scheduleIdea('${i.ID}')">Jadwalkan</button></div>`).join("") : `<div class="empty" style="padding:18px 8px"><b>Belum ada ide prioritas</b>Tandai ide sebagai "Siap dibuat" agar muncul di sini.</div>`}</div>
    ${isAll() ? `<div class="pn s12"><h3>${ic("users", 18)}Ringkasan per akun</h3><div class="grid">${S.data.accounts.map(accCard).join("")}</div></div>` : ""}
  </div>`;
}

/* ======================= BERANDA (tampilan baru) ======================= */
const timeAgo = (s) => {
  const m = /(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)/.exec(String(s || ""));
  if (!m) return "";
  const d = new Date(+m[1], m[2] - 1, +m[3], +m[4], +m[5]),
    mn = Math.max(0, Math.round((Date.now() - d) / 60000));
  if (mn < 2) return "Baru saja";
  if (mn < 60) return mn + " menit lalu";
  if (mn < 1440) return Math.floor(mn / 60) + " jam lalu";
  if (mn < 10080) return Math.floor(mn / 1440) + " hari lalu";
  return fmtShort(ymd(d));
};
const ACT_V = {
  Published: ["check", "dipublikasikan"],
  Scheduled: ["calendar", "dijadwalkan"],
  "Content done": ["file", "selesai diproduksi"],
  Draft: ["edit", "disimpan sebagai draft"],
  Idea: ["bulb", "masuk sebagai ide"],
};
const pctChg = (a, b) =>
  b ? Math.round(((a - b) / b) * 1000) / 10 : a ? 100 : 0;
const trChip = (v) =>
  `<span class="tr ${v < 0 ? "dn" : ""}">${ic("trend", 13)}${v > 0 ? "+" : ""}${v}%</span>`;
function statCard(c, icn, val, label, sub, pct, vsTxt, tr) {
  return `<div class="sc" style="--c:${c}"><div class="top"><span class="ico">${ic(icn, 22)}</span>${trChip(tr)}</div><b class="n">${val}</b><div class="lb">${label}</div><div class="sb">${sub}</div><div class="pr"><span>Progress</span><b>${Math.round(pct)}%</b></div><div class="track"><i style="width:${Math.max(0, Math.min(100, pct))}%"></i></div><div class="vs"><span>vs bulan lalu:</span><b>${vsTxt}</b></div></div>`;
}
function goOverdue() {
  S.cmode = "list";
  S.range = "overdue";
  store.set("cp2_cmode", "list");
  go("content");
}
function goDrafts() {
  S.f.status = "Draft";
  S.cmode = "list";
  S.range = "all";
  store.set("cp2_cmode", "list");
  go("content");
}
function goStatus(s) {
  S.f.status = s;
  S.cmode = "list";
  S.range = "all";
  store.set("cp2_cmode", "list");
  go("content");
}
function calcStreak(all) {
  const pub = new Set(
    all.filter((c) => c.Status === "Published").map((c) => c.Date),
  );
  let d = pub.has(TODAY) ? TODAY : addD(TODAY, -1),
    n = 0;
  while (pub.has(d)) {
    n++;
    d = addD(d, -1);
  }
  return n;
}
const ART = `<svg class="art" viewBox="0 0 560 310" preserveAspectRatio="xMaxYMax meet" style="overflow:visible" aria-hidden="true">
<defs><linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd8e8"/><stop offset="1" stop-color="#4fb6d8"/></linearGradient>
<linearGradient id="dm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5aa8ff"/><stop offset="1" stop-color="#2f7df6"/></linearGradient></defs>
<g fill="#fff" opacity=".92"><ellipse cx="470" cy="60" rx="44" ry="14"/><ellipse cx="500" cy="48" rx="28" ry="16"/><ellipse cx="90" cy="46" rx="40" ry="12"/><ellipse cx="520" cy="140" rx="30" ry="10"/></g>
<path d="M-700 300 L-700 250 Q-300 238 -100 252 T200 250 L560 250 L560 310Z" fill="url(#sea)"/>
<path d="M-60 262 Q60 226 190 246 Q260 258 330 268 L330 310 L-60 310Z" fill="#7dc88a"/>
<path d="M300 276 Q420 240 560 262 L560 310 L300 310Z" fill="#5db87a"/>
<g fill="#b8745a"><path d="M196 252 L214 160 L222 160 L240 252 L232 252 L218 190 L204 252Z"/><rect x="203" y="214" width="30" height="4"/><rect x="208" y="188" width="20" height="3"/><rect x="211" y="158" width="14" height="5" rx="2"/></g>
<g fill="#e5483f"><rect x="258" y="212" width="66" height="7" rx="3"/><rect x="266" y="196" width="50" height="6" rx="3"/><rect x="272" y="219" width="7" height="36"/><rect x="305" y="219" width="7" height="36"/></g>
<g><rect x="490" y="212" width="56" height="44" fill="#f2e1b8"/><path d="M486 212 Q518 150 550 212Z" fill="url(#dm)"/><rect x="514" y="140" width="8" height="18" fill="#f2e1b8"/><circle cx="518" cy="138" r="4" fill="#ffc933"/><rect x="496" y="224" width="8" height="22" rx="4" fill="#9ec3ee"/><rect x="514" y="224" width="8" height="22" rx="4" fill="#9ec3ee"/><rect x="532" y="224" width="8" height="22" rx="4" fill="#9ec3ee"/></g>
<g fill="#7e9fc9"><path d="M548 256 L556 256 L553 120 Z"/><rect x="544" y="196" width="18" height="4"/></g>
<path d="M310 296 Q360 258 430 262 Q490 268 500 296Z" fill="#8c7d70"/><path d="M340 296 Q380 272 430 274 Q470 278 480 296Z" fill="#a39385"/>
<g transform="translate(372 30)">
 <path d="M-8 110 q-26 4-24 54 q4 24 26 22 q10-24 6-70z" fill="#9a5a2c"/><rect x="-26" y="124" width="14" height="30" rx="5" fill="#7a4420"/>
 <ellipse cx="-30" cy="118" rx="14" ry="42" fill="#1f63e0" transform="rotate(26 -30 118)"/>
 <ellipse cx="92" cy="92" rx="13" ry="46" fill="#1f63e0" transform="rotate(-48 92 92)"/>
 <ellipse cx="32" cy="136" rx="56" ry="70" fill="#2f7df6"/>
 <ellipse cx="32" cy="152" rx="37" ry="52" fill="#fff"/>
 <circle cx="32" cy="64" r="54" fill="#2f7df6"/>
 <path d="M32 34 C8 34 -4 56 4 78 C10 96 54 96 60 78 C68 56 56 34 32 34Z" fill="#fff"/>
 <circle cx="16" cy="64" r="11" fill="#10244f"/><circle cx="48" cy="64" r="11" fill="#10244f"/>
 <circle cx="12" cy="59" r="4" fill="#fff"/><circle cx="44" cy="59" r="4" fill="#fff"/><circle cx="19" cy="68" r="1.8" fill="#fff"/><circle cx="51" cy="68" r="1.8" fill="#fff"/>
 <ellipse cx="2" cy="78" rx="7" ry="5" fill="#ffb3b3" opacity=".7"/><ellipse cx="62" cy="78" rx="7" ry="5" fill="#ffb3b3" opacity=".7"/>
 <path d="M20 78 Q32 74 44 78 Q42 94 32 96 Q22 94 20 78Z" fill="#ff9a1f"/><path d="M26 85 Q32 90 38 85" fill="none" stroke="#c4560b" stroke-width="2" stroke-linecap="round"/>
 <path d="M-20 34 Q32 -2 84 34 L80 44 Q32 20 -16 44Z" fill="#8a5a33"/>
 <rect x="-22" y="36" width="108" height="10" rx="5" fill="#6d4426"/>
 <circle cx="14" cy="38" r="13" fill="#bfe3ff" stroke="#6d4426" stroke-width="5"/><circle cx="50" cy="38" r="13" fill="#bfe3ff" stroke="#6d4426" stroke-width="5"/>
 <path d="M-12 118 Q32 148 76 118 L82 140 Q32 172 -18 140Z" fill="#ffc933"/><path d="M70 130 L112 116 L100 156Z" fill="#f5b300"/>
 <path d="M8 200 l-10 16 h28z M52 200 l-6 16 h30z" fill="#ff9a1f"/>
</g></svg>`;
const MEDAL = [
  "linear-gradient(135deg,#fbbf24,#f59e0b)",
  "linear-gradient(135deg,#cbd5e1,#94a3b8)",
  "linear-gradient(135deg,#fb923c,#ea580c)",
];
function scrollAccounts(direction) {
  const rail = $("#accountCards");
  if (!rail) return;
  const card = rail.querySelector(".kc");
  rail.scrollBy({
    left: direction * ((card?.getBoundingClientRect().width || 220) + 14),
    behavior: "smooth",
  });
}
function vDash() {
  const all = scoped(S.data.contents),
    st = S.data.settings || {};
  const hour = NOW.getHours(),
    greet =
      hour < 11
        ? "Selamat pagi"
        : hour < 15
          ? "Selamat siang"
          : hour < 19
            ? "Selamat sore"
            : "Selamat malam";
  const ws = weekStart(TODAY),
    we = addD(ws, 6),
    wk = all.filter((c) => c.Date >= ws && c.Date <= we && c.Status !== "Idea");
  const target = isAll()
    ? S.data.accounts.reduce((a, x) => a + (+x.TargetPerWeek || 0), 0)
    : +(curAcc() || {}).TargetPerWeek || 0;
  const late = all.filter(overdue);
  const M = S.month,
    mo = inMonth(all, M),
    pmo = inMonth(all, new Date(M.getFullYear(), M.getMonth() - 1, 1));
  const pubM = mo.filter((c) => c.Status === "Published"),
    ppub = pmo.filter((c) => c.Status === "Published");
  const countStatus = (list, status) =>
    list.filter((content) => content.Status === status).length;
  const planned = (list) => countStatus(list, "Scheduled");
  const inProduction = (list) =>
    countStatus(list, "Draft") + countStatus(list, "Content done");
  const ready = scoped(S.data.ideas).filter((i) => i.Status === "Siap dibuat"),
    drafts = all.filter((c) => c.Status === "Draft");
  const bln = BULAN[M.getMonth()];
  /* hero */
  const nextC = [...all]
    .filter((c) => c.Status !== "Published" && c.Status !== "Idea")
    .sort(sortDT)[0];
  const sub = target
    ? wk.length < target
      ? `Tinggal ${target - wk.length} konten lagi menuju target minggu ini!`
      : "Target minggu ini tercapai. Kerja bagus! 🎉"
    : "Satu konten lebih dekat ke target Anda!";
  const mDone = pubM.length,
    mTot = mo.length,
    mp = mTot ? Math.round((mDone / mTot) * 100) : 0,
    RR = 40,
    CC = 2 * Math.PI * RR;
  const hero = `<div class="pgc"><div class="pgr"><svg viewBox="0 0 100 100" width="124" height="124" aria-hidden="true"><circle cx="50" cy="50" r="${RR}" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="11"/><circle cx="50" cy="50" r="${RR}" fill="none" stroke="#22c55e" stroke-width="11" stroke-linecap="round" stroke-dasharray="${CC}" stroke-dashoffset="${CC * (1 - mp / 100)}" transform="rotate(-90 50 50)"/></svg><b>${mp}%</b></div>
    <div class="pgt"><small>${isAll() ? "Semua akun" : esc(curAcc().Name)}</small><h2>Progres Konten ${bln}</h2><p><em>${mDone}</em> dari ${mTot} konten <span>tayang</span></p><div class="pgb"><i style="width:${mp}%"></i></div><div class="pgs">${sub}</div></div></div>`;
  /* lanjutkan */
  let cont;
  if (nextC) {
    const [dn, tt] = progress(nextC),
      p = tt ? Math.round((dn / tt) * 100) : 0;
    cont = `<div class="cont"><div class="th" style="--c:${FC[nextC.Format] || "#2563eb"}">${ic(nextC.Format === "Reels" || nextC.Format === "Video" ? "play" : "file", 32)}<small>${esc(nextC.Format)} · ${esc(PSHORT[nextC.Platform] || "")}</small></div>
    <div class="cb"><b>${esc(nextC.Title)}</b><span>${esc(nextC.Campaign || nextC.Pillar || nextC.Status)} • ${fmtShort(nextC.Date)} ${esc(nextC.Time || "")}${overdue(nextC) ? ' • <b style="display:inline;color:#dc2626;font-size:inherit">Terlambat</b>' : ""}</span><div class="pl"><div class="track"><i style="width:${p}%;--c:var(--ac)"></i></div><em>${p}%</em></div></div>
    <button class="startb" onclick="openEntity('Contents','${nextC.ID}')">${ic("play", 15)}Buka</button></div>`;
  } else
    cont = `<div class="cont"><div class="cb"><b>Belum ada konten yang perlu dikerjakan</b><span style="margin-bottom:0">Buat konten baru atau jadwalkan dari Idea Bank.</span></div><button class="startb" onclick="newContent()">${ic("plus", 16)}Konten baru</button></div>`;
  /* pipeline */
  const SK = [
    ["Draft", "edit", "#7c5cff"],
    ["Content done", "file", "#ef5b5b"],
    ["Scheduled", "calendar", "#16a34a"],
    ["Published", "check", "#f59e0b"],
  ];
  const skills = `<div class="skg">${SK.map(([s, i, c]) => `<button class="sk" style="--c:${c}" onclick="goStatus('${s}')"><i>${ic(i, 20)}</i><span><b>${s}</b><small>${all.filter((x) => x.Status === s).length} konten</small></span><span class="go">${ic("right", 15)}</span></button>`).join("")}</div>`;
  /* akun */
  const accs = `<div class="kcs" id="accountCards">${(S.data.accounts.length > 1
    ? [null]
    : []
  )
    .concat(S.data.accounts)
    .map((a) => {
      const list = a
          ? S.data.contents.filter((c) => c.AccountID === a.ID)
          : S.data.contents,
        m = inMonth(list, M),
        p = m.length
          ? Math.round(
              (m.filter((c) => c.Status === "Published").length / m.length) *
                100,
            )
          : 0,
        on = a ? S.acc === a.ID : isAll();
      return `<button class="kc ${on ? "on" : ""}" style="--c:${esc(a ? a.Color : "#1f6feb")}" onclick="switchAcc('${a ? a.ID : "all"}')"><b>${a ? esc(a.Name) : "Semua akun"}</b><small>${m.length} konten bulan ini</small><span class="kp"><span class="kt"><i style="width:${p}%"></i></span><em>${p}%</em></span></button>`;
    })
    .join("")}</div>`;
  /* statistik */
  const stats = `<div class="sg" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr))">
    ${statCard("#1470ff", "list", mo.length, "Total Konten", bln, mo.length ? (pubM.length / mo.length) * 100 : 0, pmo.length, pctChg(mo.length, pmo.length))}
    ${statCard("#059669", "check", pubM.length, "Published", "Sudah tayang", mo.length ? (pubM.length / mo.length) * 100 : 0, ppub.length, pctChg(pubM.length, ppub.length))}
    ${statCard("#ea580c", "edit", inProduction(mo), "Dalam Produksi", "Draft + selesai produksi", mo.length ? (inProduction(mo) / mo.length) * 100 : 0, inProduction(pmo), pctChg(inProduction(mo), inProduction(pmo)))}
    ${statCard("#7e22ce", "calendar", planned(mo), "Terjadwal", "Siap dipublikasikan", mo.length ? (planned(mo) / mo.length) * 100 : 0, planned(pmo), pctChg(planned(mo), planned(pmo)))}</div>`;
  const months = [2, 1, 0].map((k) => {
    const d = new Date(M.getFullYear(), M.getMonth() - k, 1),
      l = inMonth(all, d);
    return {
      d,
      n: l.length,
      pub: l.filter((c) => c.Status === "Published").length,
    };
  });
  const maxN = Math.max(1, ...months.map((x) => x.n)),
    pubAll = all.filter((c) => c.Status === "Published").length,
    withC = months.filter((x) => x.n).length || 1,
    upcoming = all.filter(
      (c) => c.Date >= TODAY && c.Date <= addD(TODAY, 30) && c.Status !== "Published",
    ).length;
  const analytics = `<div class="pn"><div class="ph"><div><h3>Perencanaan Bulanan</h3><p>Jumlah konten dan progres publikasi, 3 bulan terakhir</p></div><button class="r" onclick="go('analytics')">Lihat Ringkasan Planner</button></div>
     ${months.map((x) => `<div class="mrow"><div class="mt"><b>${BULAN[x.d.getMonth()]}</b><span class="muted">· ${x.n} konten</span><span class="rt"><span class="tr">${x.pub} tayang</span></span></div><div class="mbar"><i style="width:${(x.n / maxN) * 100}%">${x.n ? Math.round((x.pub / x.n) * 100) : 0}%</i></div></div>`).join("")}
    <div class="tiles">
      <div class="tl4" style="--c:#1470ff">${ic("list", 20)}<b>${all.length}</b><small>Total Konten</small></div>
      <div class="tl4" style="--c:#059669">${ic("check", 20)}<b>${all.length ? Math.round((pubAll / all.length) * 100) : 0}%</b><small>Rate Tayang</small></div>
      <div class="tl4" style="--c:#7e22ce">${ic("chart", 20)}<b>${Math.round(months.reduce((a, x) => a + x.n, 0) / withC)}</b><small>Rata-rata/Bulan</small></div>
       <div class="tl4" style="--c:#ea580c">${ic("calendar", 20)}<b>${upcoming}</b><small>Jadwal 30 hari ke depan</small></div></div></div>`;
  const recent = [...all]
    .filter((c) => c.UpdatedAt)
    .sort((a, b) => String(b.UpdatedAt).localeCompare(String(a.UpdatedAt)))
    .slice(0, 5);
  const activity = `<div class="pn"><div class="ph"><div><h3>Aktivitas Terbaru</h3><p>Perubahan konten terakhir</p></div><span class="live">Terbaru</span></div>
    ${
      recent.length
        ? recent
            .map((c) => {
              const v = ACT_V[c.Status] || ["edit", "diperbarui"];
              return `<div class="act" style="--c:${SC[c.Status] || "#64748b"}" onclick="openEntity('Contents','${c.ID}')"><span class="ai">${ic(v[0], 17)}</span><div class="at"><b>${esc(c.Title)}</b> ${v[1]}<small>${timeAgo(c.UpdatedAt)}${isAll() ? " · " + esc((accById(c.AccountID) || {}).Name || "") : ""}</small></div></div>`;
            })
            .join("")
        : `<div class="empty"><b>Belum ada aktivitas</b>Buat konten pertama Anda.</div>`
    }
    <button class="more" onclick="S.cmode='list';S.range='all';store.set('cp2_cmode','list');go('content')">Lihat semua konten</button></div>`;
  const pend = late.length + ready.length + drafts.length;
  const pc = (c, icn, n, t, d, b, fn) =>
    `<div class="pc" style="--c:${c}"><div class="t2"><span class="pi2">${ic(icn, 20)}</span><span class="cn">${n}</span></div><h4>${t}</h4><p>${d}</p><button onclick="${fn}">${b}</button></div>`;
  const pending = `<div class="pn"><div class="ph"><div><h3>Perlu Perhatian</h3><p>Hal yang butuh tindakan Anda</p></div><span class="badge">${pend} Pending</span></div><div class="pa">
    ${pc("#dc2626", "alert", late.length, "Konten Terlambat", "Sudah lewat jadwal tapi belum berstatus Published", "Tinjau Sekarang", "goOverdue()")}
    ${pc("#1470ff", "bulb", ready.length, "Ide Siap Dibuat", "Ide berstatus &quot;Siap dibuat&quot; yang menunggu dijadwalkan", "Buka Idea Bank", "go('ideas')")}
    ${pc("#ea580c", "edit", drafts.length, "Draft Belum Final", "Konten draft yang perlu dilengkapi sebelum tayang", "Lihat Draft", "goDrafts()")}</div></div>`;
  /* sisi kanan */
  const R = 50,
    C = 2 * Math.PI * R,
    pw = target ? Math.min(1, wk.length / target) : 0;
  const days = [0, 1, 2, 3, 4, 5, 6].map((i) => addD(ws, i));
  const goal = `<div class="sd"><h3>Target Mingguan</h3><div class="goal"><div class="rg"><svg width="118" height="118" viewBox="0 0 120 120"><defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5bb4ff"/><stop offset="1" stop-color="#1470ff"/></linearGradient></defs><circle cx="60" cy="60" r="${R}" fill="none" stroke="var(--line)" stroke-width="11"/><circle cx="60" cy="60" r="${R}" fill="none" stroke="url(#gg)" stroke-width="11" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pw)}" transform="rotate(-90 60 60)"/></svg><div><span>🔥<br>${wk.length}/${target || "–"}<small>konten</small></span></div></div>
    <p><b>${target && wk.length >= target ? "Target tercapai!" : "Terus semangat!"}</b>${calcStreak(all)} hari beruntun posting${target && wk.length < target ? `. Kurang ${target - wk.length} konten.` : "."}</p></div>
    <div class="wd">${days
      .map((d, i) => {
        const on = all.some(
          (c) =>
            c.Date === d &&
            ["Published", "Scheduled", "Content done"].includes(c.Status),
        );
        return `<span>${HARI[i]}<i class="${on ? "on" : ""} ${d === TODAY ? "td" : ""}">${on ? ic("check", 12) : ""}</i></span>`;
      })
      .join("")}</div></div>`;
  const lead = all
    .filter((c) => c.Status !== "Published" && c.Date >= TODAY)
    .sort(sortDT)
    .slice(0, 5);
  const board = `<div class="sd"><h3>Jadwal Berikutnya<span class="r">Mendatang</span></h3>${lead.length ? lead.map((c, i) => `<div class="lbr" onclick="openEntity('Contents','${c.ID}')"><span class="rk ${i > 2 ? "n" : ""}" style="${i < 3 ? `--g:${MEDAL[i]}` : ""}">${i + 1}</span>${avatar(accById(c.AccountID), "sm")}<div class="m"><b>${esc(c.Title)}</b><small>${fmtShort(c.Date)} · ${esc(c.Time || "Waktu belum ditentukan")} · ${esc(c.Status)}</small></div><b>${esc(c.Format)}</b></div>`).join("") : `<div class="empty" style="padding:14px 6px"><b>Tidak ada jadwal mendatang</b>Tambahkan konten planner berikutnya.</div>`}</div>`;
  const left = Math.max(0, mo.length - pubM.length);
  const mission = `<div class="mis"><svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="26" width="44" height="30" rx="5" fill="#7c5cff"/><rect x="6" y="18" width="52" height="12" rx="4" fill="#a78bfa"/><rect x="29" y="18" width="6" height="38" fill="#ffc933"/><path d="M32 18c-6-12-18-6-12 0M32 18c6-12 18-6 12 0" fill="none" stroke="#ffc933" stroke-width="4" stroke-linecap="round"/></svg><div style="flex:1;min-width:0"><small>${left ? `Publish ${left} konten lagi untuk menutup bulan ${bln}` : `Semua konten ${bln} sudah tayang!`}</small><b>Misi ${bln}</b><div class="pl"><div class="track"><i style="width:${mo.length ? (pubM.length / mo.length) * 100 : 0}%;--c:var(--ac)"></i></div><em>${pubM.length}/${mo.length}</em></div></div></div>`;
  return (
    `<div class="dwrap"><div class="dmain">${hero}
    <div class="sh"><h3>Lanjutkan Bekerja</h3><button onclick="S.cmode='list';S.range='upcoming';store.set('cp2_cmode','list');go('content')">Lihat Semua</button></div>${cont}
    <div class="sh"><h3>Pipeline Konten</h3></div>${skills}
     <div class="sh"><h3>Akun Anda</h3><div class="acc-nav"><button type="button" onclick="scrollAccounts(-1)" aria-label="Akun sebelumnya" title="Akun sebelumnya">${ic("chevL", 18)}</button><button type="button" onclick="scrollAccounts(1)" aria-label="Akun berikutnya" title="Akun berikutnya">${ic("chevR", 18)}</button></div></div>${accs}
    <div class="sh"><h3>Statistik ${bln}</h3></div>${stats}${analytics}${activity}${pending}</div>
    <aside class="dside">${goal}${board}</aside></div><div class="sect">Jadwal &amp; Target</div>` +
    vSched()
  );
}
