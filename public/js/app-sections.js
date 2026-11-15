/* ======================= CAMPAIGN ======================= */
function vCampaign() {
  const list = scoped(S.data.campaigns);
  const head = `<div class="tb"><span class="sp"></span><button class="btn pri" onclick="openEntity('Campaigns')">${ic("plus", 17)}Campaign baru</button></div>`;
  if (!list.length)
    return (
      head +
      `<div class="pn"><div class="empty"><b>Belum ada campaign</b>Kelompokkan konten berdasarkan promo atau tema.</div></div>`
    );
  return (
    head +
    `<div class="grid">${list
      .map((c) => {
        const cs = S.data.contents.filter(
            (x) => x.Campaign === c.Name && x.AccountID === c.AccountID,
          ),
          p = cs.filter((x) => x.Status === "Published").length,
          pct = cs.length ? (p / cs.length) * 100 : 0;
        const days = c.EndDate
          ? Math.round((pd(c.EndDate) - pd(TODAY)) / 864e5)
          : null;
        return `<div class="card" onclick="openEntity('Campaigns','${c.ID}')" style="border-top:4px solid ${esc(c.Color || "var(--ac)")}">
      <div class="row"><span class="chip dot" style="--c:${c.Status === "Active" ? "#16a34a" : c.Status === "Done" ? "#64748b" : "#d97706"}">${esc(c.Status || "Planning")}</span>${isAll() ? `<span class="chip dot" style="--c:${esc(accColor(c.AccountID))}">${esc((accById(c.AccountID) || {}).Name || "")}</span>` : ""}${days != null && days >= 0 && c.Status !== "Done" ? `<span class="chip plain">${days} hari lagi</span>` : ""}</div>
      <h4>${esc(c.Name)}</h4>${c.Goal ? `<p>${esc(c.Goal)}</p>` : ""}
      <div class="muted" style="font-size:12.5px">${c.StartDate ? fmtShort(c.StartDate) : "?"} – ${c.EndDate ? fmtShort(c.EndDate) : "?"}</div>
      <div class="bl" style="grid-template-columns:1fr auto"><div class="b"><i style="width:${pct}%;--c:${esc(c.Color || "var(--ac)")}"></i></div><span>${p}/${cs.length} tayang</span></div></div>`;
      })
      .join("")}</div>`
  );
}

/* ======================= IDEA BANK ======================= */
function vIdeas() {
  const q = S.ideaQ.toLowerCase();
  const list = scoped(S.data.ideas).filter(
    (i) =>
      (!S.ideaSt || i.Status === S.ideaSt) &&
      (!q ||
        [i.Title, i.Pillar, i.Notes, i.Links]
          .join(" ")
          .toLowerCase()
          .includes(q)),
  );
  const prio = { High: 0, Medium: 1, Low: 2 };
  list.sort((a, b) => (prio[a.Priority] ?? 1) - (prio[b.Priority] ?? 1));
  return `<div class="capture">${ic("bulb", 20)}<input id="cap" placeholder="Tulis ide, atau tempel link referensi lalu Enter…" onkeydown="if(event.key==='Enter')quickIdea()"><button class="btn pri sm" onclick="quickIdea()">Simpan</button></div>
  <div class="filters"><div class="seg">${[["", "Semua"], ...IDEA_ST.map((s) => [s, s])].map(([k, l]) => `<button class="${S.ideaSt === k ? "on" : ""}" onclick="S.ideaSt='${k}';render()">${l}</button>`).join("")}</div>
    <label class="search" style="width:240px">${ic("search", 16)}<input placeholder="Cari ide…" value="${esc(S.ideaQ)}" oninput="S.ideaQ=this.value;clearTimeout(qT);qT=setTimeout(()=>{render();const e=document.querySelector('.filters .search input');e.focus();e.setSelectionRange(e.value.length,e.value.length)},220)"></label>
    <span class="sp" style="flex:1"></span><button class="btn" onclick="openEntity('Ideas')">${ic("plus", 17)}Ide lengkap</button></div>
  ${
    list.length
      ? `<div class="grid">${list
          .map((i) => {
            const L = pj(i.Links, []);
            return `<div class="card" onclick="openEntity('Ideas','${i.ID}')">
    <div class="row"><span class="chip dot" style="--c:${ISC[i.Status] || "#64748b"}">${esc(i.Status || "Baru")}</span><span class="chip" style="--c:${PRC[i.Priority] || "#64748b"}">${esc(i.Priority || "Medium")}</span>${i.Format ? `<span class="chip" style="--c:${FC[i.Format]}">${esc(i.Format)}</span>` : ""}${isAll() ? `<span class="chip dot" style="--c:${esc(accColor(i.AccountID))}">${esc((accById(i.AccountID) || {}).Name || "")}</span>` : ""}</div>
    <h4>${esc(i.Title)}</h4>${i.Notes ? `<p>${esc(i.Notes)}</p>` : ""}
    ${L.length ? `<div class="row">${L.map((x) => `<a class="lchip" href="${esc(x.url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="${esc(x.url)}">${ic("link", 13)}${esc(x.label || domainLabel(x.url))}</a>`).join("")}</div>` : ""}
    <div class="acts"><button class="btn sm pri" onclick="event.stopPropagation();scheduleIdea('${i.ID}')">${ic("calendar", 15)}Jadwalkan</button><button class="btn sm" onclick="event.stopPropagation();openEntity('Ideas','${i.ID}',null,null,true)">${ic("link", 15)}Tambah link</button></div></div>`;
          })
          .join("")}</div>`
      : `<div class="pn"><div class="empty"><b>${q || S.ideaSt ? "Tidak ada ide yang cocok" : "Idea bank masih kosong"}</b>${q || S.ideaSt ? "Coba filter lain." : "Ketik ide atau tempel link referensi di kolom atas."}</div></div>`
  }`;
}
function quickIdea() {
  const el = $("#cap"),
    v = el.value.trim();
  if (!v) return el.focus();
  if (!S.data.accounts.length) return toast("Buat akun dulu");
  const url = isUrl(v) ? normUrl(v) : "";
  const rec = {
    AccountID: defAcc(),
    Title: url ? `Referensi dari ${domainLabel(url)}` : v,
    Status: "Baru",
    Priority: "Medium",
    Format: "Reels",
    Platform: (curAcc() || {}).Platform || "Instagram",
    Links: url ? JSON.stringify([{ label: domainLabel(url), url }]) : "[]",
    Notes: "",
  };
  el.value = "";
  api("saveRecord", "Ideas", rec)
    .then((r) => {
      upsert(S.data.ideas, r);
      render();
      toast(url ? "Link disimpan sebagai ide" : "Ide disimpan", {
        action: ["Lengkapi", () => openEntity("Ideas", r.ID)],
      });
    })
    .catch((e) => toast(errMsg(e)));
}
function scheduleIdea(id) {
  const i = S.data.ideas.find((x) => x.ID === id);
  if (!i) return;
  openEntity(
    "Contents",
    null,
    {
      AccountID: i.AccountID,
      Title: i.Title,
      Pillar: i.Pillar,
      Format: i.Format || "Feed",
      Platform: i.Platform || "Instagram",
      Caption: i.Notes,
      Links: i.Links || "[]",
      Status: "Draft",
    },
    () => {
      api("deleteRecord", "Ideas", id).then(() => {
        S.data.ideas = S.data.ideas.filter((x) => x.ID !== id);
        render();
      });
    },
  );
}

/* ======================= RESOURCES ======================= */
function vResources() {
  const list = scoped(S.data.resources, true),
    by = {};
  list.forEach((r) =>
    (by[r.Category || "Lainnya"] = by[r.Category || "Lainnya"] || []).push(r),
  );
  const head = `<div class="tb"><span class="sp"></span><button class="btn pri" onclick="openEntity('Resources')">${ic("plus", 17)}Tambah resource</button></div>`;
  const keys = Object.keys(by).sort();
  if (!keys.length)
    return (
      head +
      `<div class="pn"><div class="empty"><b>Belum ada resource</b>Simpan link brand guideline, aset foto, atau template.</div></div>`
    );
  return (
    head +
    keys
      .map(
        (k) =>
          `<div class="sec-t">${esc(k)} · ${by[k].length}</div>${by[k]
            .map(
              (r) => `<div class="resrow">
    <span class="av sm" style="--c:${r.AccountID ? esc(accColor(r.AccountID)) : "var(--ink3)"}">${ic("link", 13)}</span>
    <div class="m"><b>${esc(r.Title)}</b><span>${r.AccountID ? "" : "Bersama · "}${esc(r.Notes || r.Url)}</span></div>
    ${r.Url ? `<a class="btn sm" href="${esc(r.Url)}" target="_blank" rel="noopener">Buka ${ic("arrow", 14)}</a>` : ""}
    <button class="ib sm" onclick="openEntity('Resources','${r.ID}')" aria-label="Edit">${ic("edit", 16)}</button></div>`,
            )
            .join("")}`,
      )
      .join("")
  );
}

/* ======================= ANALYTICS ======================= */
function vAnalytics() {
  const m = inMonth(scoped(S.data.contents)).filter((c) => +c.Reach > 0);
  const sum = (k) => m.reduce((a, c) => a + (+c[k] || 0), 0);
  const eng = (c) =>
    ["Likes", "Comments", "Shares", "Saves"].reduce(
      (a, k) => a + (+c[k] || 0),
      0,
    );
  const er = (c) => (+c.Reach ? (eng(c) / +c.Reach) * 100 : 0);
  const avgER = m.length ? m.reduce((a, c) => a + er(c), 0) / m.length : 0;
  const top = [...m].sort((a, b) => b.Reach - a.Reach),
    maxR = Math.max(1, ...top.map((c) => +c.Reach));
  const avgBy = (key, fn) => {
    const o = {};
    m.forEach((c) => {
      const k = fn(c);
      (o[k] = o[k] || []).push(c);
    });
    return Object.entries(o).map(([k, l]) => [
      k,
      l.reduce((a, c) => a + er(c), 0) / l.length,
      Math.round(l.reduce((a, c) => a + +c.Reach, 0) / l.length),
      l.length,
    ]);
  };
  const byF = avgBy("f", (c) => c.Format).sort((a, b) => b[2] - a[2]),
    maxF = Math.max(1, ...byF.map((x) => x[2]));
  const byT = avgBy("t", (c) => c.Time || "—").sort((a, b) => b[1] - a[1]);
  const byD = avgBy("d", (c) => HARI_F[pd(c.Date).getDay()]).sort(
    (a, b) => b[1] - a[1],
  );
  const byA = isAll()
    ? S.data.accounts.map((a) => {
        const l = m.filter((c) => c.AccountID === a.ID);
        return [a, l.reduce((s, c) => s + +c.Reach, 0), l.length];
      })
    : [];
  const maxA = Math.max(1, ...byA.map((x) => x[1]));
  const head = `<div class="tb"><div class="mnav"><button class="ib bare" onclick="shiftMonth(-1)" aria-label="Bulan sebelumnya">${ic("chevL")}</button><h2>${BULAN[S.month.getMonth()]} ${S.month.getFullYear()}</h2><button class="ib bare" onclick="shiftMonth(1)" aria-label="Bulan berikutnya">${ic("chevR")}</button></div></div>`;
  if (!m.length)
    return (
      head +
      `<div class="pn"><div class="empty"><b>Belum ada data performa bulan ini</b>Isi Reach, Likes, dan metrik lain di form konten yang sudah published.</div></div>`
    );
  return (
    head +
    `<div class="kpis">
    <div class="kpi"><span>Total reach</span><b>${cf(sum("Reach"))}</b></div><div class="kpi"><span>Likes</span><b>${cf(sum("Likes"))}</b></div>
    <div class="kpi"><span>Comments</span><b>${cf(sum("Comments"))}</b></div><div class="kpi"><span>Saves</span><b>${cf(sum("Saves"))}</b></div>
    <div class="kpi"><span>Rata-rata ER</span><b>${avgER.toFixed(1)}%</b></div><div class="kpi"><span>Konten diukur</span><b>${m.length}</b></div></div>
  <div class="dg">
    <div class="pn s7"><h3>Reach tertinggi</h3><div class="bars">${top
      .slice(0, 8)
      .map(
        (c) =>
          `<div class="bl" style="cursor:pointer" onclick="openEntity('Contents','${c.ID}')"><span title="${esc(c.Title)}">${esc(c.Title)}</span><div class="b"><i style="width:${(c.Reach / maxR) * 100}%;--c:${FC[c.Format]}"></i></div><span>${cf(c.Reach)}</span></div>`,
      )
      .join("")}</div></div>
    <div class="pn s5"><h3>Waktu terbaik (ER)</h3>
      <div class="sec-t" style="margin-top:0">Jam posting</div>${byT
        .slice(0, 3)
        .map(
          ([k, e, , n], i) =>
            `<div class="li"><span class="chip ${i ? "plain" : ""}" style="--c:var(--ac)">${i === 0 ? "Terbaik" : "#" + (i + 1)}</span><div class="m"><b>${esc(k)}</b><span>${n} konten</span></div><b>${e.toFixed(1)}%</b></div>`,
        )
        .join("")}
      <div class="sec-t">Hari posting</div>${byD
        .slice(0, 3)
        .map(
          ([k, e, , n], i) =>
            `<div class="li"><span class="chip ${i ? "plain" : ""}" style="--c:var(--ac)">${i === 0 ? "Terbaik" : "#" + (i + 1)}</span><div class="m"><b>${esc(k)}</b><span>${n} konten</span></div><b>${e.toFixed(1)}%</b></div>`,
        )
        .join("")}</div>
    <div class="pn ${isAll() ? "s6" : "s12"}"><h3>Rata-rata reach per format</h3><div class="bars">${byF.map(([f, , r]) => `<div class="bl"><span>${esc(f)}</span><div class="b"><i style="width:${(r / maxF) * 100}%;--c:${FC[f]}"></i></div><span>${cf(r)}</span></div>`).join("")}</div></div>
    ${isAll() ? `<div class="pn s6"><h3>Reach per akun</h3><div class="bars">${byA.map(([a, r, n]) => `<div class="bl"><span>${esc(a.Name)}</span><div class="b"><i style="width:${(r / maxA) * 100}%;--c:${esc(a.Color)}"></i></div><span>${cf(r)}</span></div>`).join("")}</div></div>` : ""}
    <div class="pn s12"><h3>Detail performa</h3><div class="twrap" style="border:0"><table><thead><tr><th>Konten</th>${isAll() ? "<th>Akun</th>" : ""}<th>Tanggal</th><th>Format</th><th style="text-align:right">Reach</th><th style="text-align:right">Likes</th><th style="text-align:right">Comments</th><th style="text-align:right">Saves</th><th style="text-align:right">ER</th></tr></thead><tbody>
    ${top.map((c) => `<tr onclick="openEntity('Contents','${c.ID}')"><td class="ttl"><b>${esc(c.Title)}</b></td>${isAll() ? `<td><span class="chip dot" style="--c:${esc(accColor(c.AccountID))}">${esc((accById(c.AccountID) || {}).Name || "")}</span></td>` : ""}<td>${fmtShort(c.Date)}</td><td><span class="chip" style="--c:${FC[c.Format]}">${esc(c.Format)}</span></td><td style="text-align:right">${nf(c.Reach)}</td><td style="text-align:right">${nf(c.Likes)}</td><td style="text-align:right">${nf(c.Comments)}</td><td style="text-align:right">${nf(c.Saves)}</td><td style="text-align:right"><b>${er(c).toFixed(1)}%</b></td></tr>`).join("")}
    </tbody></table></div></div>
  </div>`
  );
}

/* ======================= AKUN ======================= */
function accCard(a) {
  const cs = S.data.contents.filter((c) => c.AccountID === a.ID),
    mo = inMonth(cs);
  const up = cs.filter(
      (c) => c.Date >= TODAY && c.Status !== "Published",
    ).length,
    ideas = S.data.ideas.filter((i) => i.AccountID === a.ID).length;
  const pub = mo.filter((c) => c.Status === "Published").length;
  return `<div class="card accard ${S.acc === a.ID ? "cur" : ""}" style="--c:${esc(a.Color)}" onclick="switchAcc('${a.ID}')">
    <div class="top">${avatar(a, "lg")}<div style="flex:1;min-width:0"><h4>${esc(a.Name)}</h4><span class="muted">${esc(a.Handle || "")} · ${esc(a.Platform || "")}</span></div>
      <button class="ib sm" onclick="event.stopPropagation();openEntity('Accounts','${a.ID}')" aria-label="Edit akun">${ic("edit", 16)}</button></div>
    <div class="stats"><div><b>${mo.length}</b><span>bulan ini</span></div><div><b>${pub}</b><span>published</span></div><div><b>${up}</b><span>mendatang</span></div></div>
    <div class="row"><span class="chip plain">Target ${+a.TargetPerWeek || 0}/minggu</span><span class="chip plain">${ideas} ide</span>${S.acc === a.ID ? `<span class="chip" style="--c:${esc(a.Color)}">Aktif</span>` : ""}</div></div>`;
}
function vAccounts() {
  return `<div class="tb"><p class="muted" style="flex:1;min-width:200px">Setiap akun punya kalender, ide, campaign, dan analitiknya sendiri. Klik kartu untuk beralih akun.</p>
    ${S.data.accounts.length > 1 ? `<button class="btn" onclick="switchAcc('all')">${ic("users", 17)}Lihat semua akun</button>` : ""}
    <button class="btn pri" onclick="openEntity('Accounts')">${ic("plus", 17)}Tambah akun</button></div>
  ${S.data.accounts.length ? `<div class="grid">${S.data.accounts.map(accCard).join("")}</div>` : `<div class="pn"><div class="empty"><b>Belum ada akun</b>Tambahkan akun pertama untuk mulai merencanakan konten.</div></div>`}`;
}

/* ======================= PENGATURAN ======================= */
function vSettings() {
  const st = S.data.settings || {},
    mode = S.prefs.mode;
  return `<div class="set"><h3>Mode tampilan</h3><p>Terang, gelap, atau ikuti pengaturan perangkat.</p>
    <div class="seg"><button class="${mode === "light" ? "on" : ""}" onclick="setPref('mode','light')">${ic("sun", 16)}Terang</button><button class="${mode === "dark" ? "on" : ""}" onclick="setPref('mode','dark')">${ic("moon", 16)}Gelap</button><button class="${mode === "system" ? "on" : ""}" onclick="setPref('mode','system')">Ikuti sistem</button></div></div>
  <div class="set"><h3>Posisi menu</h3><p>Sisi layar untuk menu navigasi di tampilan lebar.</p>
    <div class="seg"><button class="${S.prefs.side !== "left" ? "on" : ""}" onclick="setPref('side','right')">Kanan</button><button class="${S.prefs.side === "left" ? "on" : ""}" onclick="setPref('side','left')">Kiri</button></div></div>
  <div class="set"><h3>Kode akses</h3><p>Kode ini diminta saat membuka aplikasi di perangkat baru atau setelah dikunci.${accessHash() === codeHash(DEF_CODE) ? " Saat ini masih memakai kode bawaan <b>admin123</b>, sebaiknya diganti." : ""}</p>
    <div class="fg" id="sec"><div class="f"><label>Kode saat ini</label><input class="in" type="password" id="cOld" autocomplete="current-password"></div><div></div>
      <div class="f"><label>Kode baru (min. 4 karakter)</label><input class="in" type="password" id="cNew" autocomplete="new-password"></div>
      <div class="f"><label>Ulangi kode baru</label><input class="in" type="password" id="cNew2" autocomplete="new-password"></div></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button class="btn pri" onclick="saveCode(this)">${ic("lock", 16)}Simpan kode</button><button class="btn" onclick="lockNow()">Kunci sekarang</button></div></div>
  <div class="set"><h3>Tema warna</h3><p>"Warna akun" membuat aksen aplikasi berubah mengikuti warna akun yang sedang aktif, jadi kamu langsung tahu sedang mengelola akun mana.</p>
    <div class="themes">${Object.entries(THEMES)
      .map(
        ([k, [n, c]]) =>
          `<button class="th ${S.prefs.theme === k ? "on" : ""}" onclick="setPref('theme','${k}')"><i style="background:${c || `linear-gradient(90deg,${S.data.accounts.map((a) => a.Color).join(",") || "#4f46e5,#0d9488"})`}"></i><b>${n}</b></button>`,
      )
      .join("")}</div></div>
  <div class="set"><h3>Profil</h3><p>Nama yang tampil di aplikasi.</p>
    <div class="fg" id="prof">
      <div class="f"><label>Nama aplikasi</label><input class="in" data-k="AppName" value="${esc(st.AppName || "Content Planner")}"></div>
      <div class="f"><label>Pemilik</label><input class="in" data-k="Owner" value="${esc(st.Owner || "")}"></div>
      <div class="f"><label>Nama kamu</label><input class="in" data-k="CreatorName" value="${esc(st.CreatorName || "")}"></div>
      <div class="f"><label>Peran</label><input class="in" data-k="CreatorRole" value="${esc(st.CreatorRole || "")}"></div>
      <div class="f" style="grid-column:1/-1"><label>Logo (URL gambar / link Google Drive)</label><input class="in" data-k="LogoUrl" placeholder="https://… atau link share Drive; kosongkan = logo bawaan" value="${esc(st.LogoUrl || "")}"></div>
    </div><button class="btn pri" style="margin-top:12px" onclick="saveProfile(this)">Simpan profil</button></div>
  ${vSync()}
  <div class="set"><h3>Data</h3><p>Semua data tersimpan di Google Sheet. Export membuat salinan rapi untuk dibagikan ke tim atau klien.</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn pri" onclick="openExport()">${ic("sheet", 17)}Export ke Sheet</button>
    ${S.data.sheetUrl ? `<a class="btn" href="${esc(S.data.sheetUrl)}" target="_blank" rel="noopener">${ic("file", 17)}Buka spreadsheet</a>` : ""}
    <button class="btn" onclick="go('accounts')">${ic("users", 17)}Kelola akun</button><button class="btn" onclick="reload()">${ic("refresh", 17)}Muat ulang</button></div></div>
  <div class="set desk" style="display:block"><h3>Pintasan keyboard</h3><p>Berlaku saat tidak sedang mengetik.</p>
    <div class="shortcuts"><span class="kbd">N</span>Konten baru<span class="kbd">I</span>Ide baru<span class="kbd">/</span>Cari konten<span class="kbd">← →</span>Bulan sebelumnya / berikutnya<span class="kbd">C</span>Ganti Kalender ↔ List<span class="kbd">A</span>Ganti akun<span class="kbd">Esc</span>Tutup jendela</div></div>
  <div class="set"><h3>Pasang di HP</h3><p>Buka link web app di Chrome Android → menu ⋮ → <b>Add to Home screen</b>. Di iPhone: Safari → Share → <b>Add to Home Screen</b>.</p></div>`;
}
function vSync() {
  return `<div class="set"><h3>Sinkronisasi metrik sosial</h3><p>Fitur sinkronisasi otomatis dari API media sosial belum dipindahkan ke backend baru. Metrik tetap bisa diisi manual pada detail konten.</p></div>`;
}
function runSync(b) {
  const lbl = b.querySelector("span"),
    old = lbl.textContent,
    t = window.CP_TIMEOUT;
  b.disabled = true;
  lbl.textContent = "Menyinkronkan…";
  window.CP_TIMEOUT = 170000;
  api("syncMetrics")
    .then((r) =>
      reload().then(() =>
        toast(
          `Sinkron selesai: ${r.linked} dari ${r.total} postingan terhubung`,
        ),
      ),
    )
    .catch((e) => toast(errMsg(e)))
    .finally(() => {
      window.CP_TIMEOUT = t;
      b.disabled = false;
      lbl.textContent = old;
    });
}
function fromPost(key) {
  const p = (S.data.unlinked || []).find((x) => x.Key === key);
  if (!p) return;
  const a = S.data.accounts.find((x) => x.Platform === p.Platform);
  openEntity(
    "Contents",
    null,
    {
      AccountID: a ? a.ID : defAcc(),
      Title: (p.Caption || "").slice(0, 100) || "Postingan " + p.Platform,
      Date: p.Date,
      Time: p.Time || "12:00",
      Platform: p.Platform,
      Format: p.Format || "Feed",
      Status: "Published",
      Caption: p.Caption || "",
      PostLink: p.PostLink,
    },
    () => {
      S.data.unlinked = (S.data.unlinked || []).filter((x) => x.Key !== key);
      reload();
    },
  );
}
function saveProfile(b) {
  const o = {};
  $$("#prof [data-k]").forEach((i) => (o[i.dataset.k] = i.value.trim()));
  b.disabled = true;
  api("saveSettings", o)
    .then(() => {
      Object.assign(S.data.settings, o);
      render();
      toast("Profil disimpan");
    })
    .catch((e) => toast(errMsg(e)))
    .finally(() => (b.disabled = false));
}
