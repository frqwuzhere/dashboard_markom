/* ======================= KONTEN: toolbar ======================= */
function vContent() {
  const showMonth = S.cmode === "calendar" || S.range === "month";
  const m = S.month;
  let h = `<div class="tb">
    <div class="seg" role="tablist"><button class="${S.cmode === "calendar" ? "on" : ""}" onclick="setCMode('calendar')">${ic("calendar", 16)}Kalender</button><button class="${S.cmode === "list" ? "on" : ""}" onclick="setCMode('list')">${ic("list", 16)}List</button></div>
    ${showMonth ? `<div class="mnav"><button class="ib bare" onclick="shiftMonth(-1)" aria-label="Bulan sebelumnya">${ic("chevL")}</button><h2>${BULAN[m.getMonth()]} ${m.getFullYear()}</h2><button class="ib bare" onclick="shiftMonth(1)" aria-label="Bulan berikutnya">${ic("chevR")}</button><button class="btn sm" onclick="goToday()">Hari ini</button></div>` : ""}
    <span class="sp"></span>
    <label class="search" style="width:260px">${ic("search", 17)}<input id="q" placeholder="Cari konten…" value="${esc(S.f.q)}" oninput="qInput(this)"></label>
  </div>
  <div class="filters">
    ${
      S.cmode === "list"
        ? `<div class="seg">${[
            ["month", "Per bulan"],
            ["upcoming", "Mendatang"],
            ["overdue", "Terlambat"],
            ["all", "Semua"],
          ]
            .map(
              ([k, l]) =>
                `<button class="${S.range === k ? "on" : ""}" onclick="setRange('${k}')">${l}</button>`,
            )
            .join("")}</div>`
        : ""
    }
    <select class="fsel ${S.f.platform ? "on" : ""}" onchange="setF('platform',this.value)" aria-label="Platform">${opts(PLATFORMS, S.f.platform, "Semua platform")}</select>
    <select class="fsel ${S.f.status ? "on" : ""}" onchange="setF('status',this.value)" aria-label="Status">${opts(STATUSES, S.f.status, "Semua status")}</select>
    <select class="fsel ${S.f.format ? "on" : ""}" onchange="setF('format',this.value)" aria-label="Format">${opts(FORMATS, S.f.format, "Semua format")}</select>
    ${S.f.platform || S.f.status || S.f.format || S.f.q ? `<button class="btn sm ghost" onclick="clearF()">Reset filter</button>` : ""}
    <span class="count" id="cnt"></span>
  </div>`;
  const body = S.cmode === "list" ? vList() : isMob() ? mCal() : dCal();
  return h + body;
}
function setCMode(m) {
  S.cmode = m;
  store.set("cp2_cmode", m);
  S.picked.clear();
  render();
}
function setRange(r) {
  S.range = r;
  S.picked.clear();
  render();
}
function clearF() {
  S.f = { q: "", platform: "", status: "", format: "" };
  render();
}
let qT;
function qInput(el) {
  S.f.q = el.value;
  clearTimeout(qT);
  qT = setTimeout(() => {
    render();
    const i = $("#q");
    if (i) {
      i.focus();
      i.setSelectionRange(i.value.length, i.value.length);
    }
  }, 220);
}
function shiftMonth(n) {
  S.month = new Date(S.month.getFullYear(), S.month.getMonth() + n, 1);
  const [a, b] = monthRange(S.month);
  S.sel = TODAY >= a && TODAY <= b ? TODAY : a;
  S.picked.clear();
  render();
}
function goToday() {
  S.month = new Date(NOW.getFullYear(), NOW.getMonth(), 1);
  S.sel = TODAY;
  render();
}
function gridDays() {
  const y = S.month.getFullYear(),
    mo = S.month.getMonth(),
    off = (new Date(y, mo, 1).getDay() + 6) % 7;
  const cells = Math.ceil((off + new Date(y, mo + 1, 0).getDate()) / 7) * 7;
  return Array.from({ length: cells }, (_, i) => new Date(y, mo, 1 - off + i));
}

/* ---------- Kalender desktop ---------- */
function ev(c) {
  const lk = c.PostLink || c.ResultLink;
  return `<div class="ev" draggable="true" data-id="${c.ID}" style="--c:${FC[c.Format] || "#64748b"}" onclick="event.stopPropagation();openEntity('Contents','${c.ID}')" title="${esc(c.Title)}">
    <div class="ev-top">${isAll() ? `<i class="adot" style="--c:${esc(accColor(c.AccountID))}" title="${esc((accById(c.AccountID) || {}).Name || "")}"></i>` : ""}${esc(c.Format || "")}<span class="tm">${esc(c.Time || "")} ${PSHORT[c.Platform] || ""}</span></div>
    <div class="ev-t">${esc(c.Title)}</div>
    <div class="ev-f"><i class="sdot" style="--s:${SC[c.Status] || "#64748b"}"></i><span class="st">${esc(c.Status)}${progress(c)[1] ? ` · ${progress(c).join("/")}` : ""}</span>${lk ? `<a class="lk" href="${esc(lk)}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="${c.PostLink ? "View post" : "View result"}">${ic("arrow", 13)}</a>` : ""}</div></div>`;
}
function dCal() {
  const items = filtered(),
    by = groupBy(items, "Date"),
    mo = S.month.getMonth();
  setTimeout(() => {
    const e = $("#cnt");
    if (e) e.textContent = `${inMonth(items).length} konten bulan ini`;
  }, 0);
  return `<div class="dow">${HARI.map((d) => `<div>${d}</div>`).join("")}</div><div class="cal7">${gridDays()
    .map((d) => {
      const k = ymd(d),
        l = by[k] || [],
        dw = d.getDay(),
        max = 4;
      return `<div class="tile ${d.getMonth() !== mo ? "out" : ""} ${k === TODAY ? "today" : ""} ${dw === 0 || dw === 6 ? "we" : ""}" data-date="${k}" onclick="newContent({Date:'${k}'})">
      <div class="dh"><span class="dn">${d.getDate()}</span><span class="plus">${ic("plus", 15)}</span></div>
      ${l.slice(0, max).map(ev).join("")}${l.length > max ? `<button class="more-ev" onclick="event.stopPropagation();S.sel='${k}';setCMode('list')">+${l.length - max} lainnya</button>` : ""}</div>`;
    })
    .join("")}</div>
  <p class="hint" style="margin-top:12px">Tip: seret kartu ke tanggal lain untuk menjadwal ulang. Tekan <span class="kbd">N</span> untuk konten baru.</p>`;
}
function bindDnD() {
  $$(".ev[draggable]").forEach((el) => {
    el.ondragstart = (e) => {
      e.dataTransfer.setData("text/plain", el.dataset.id);
      e.dataTransfer.effectAllowed = "move";
      el.classList.add("dragging");
    };
    el.ondragend = () => el.classList.remove("dragging");
  });
  $$(".tile").forEach((t) => {
    t.ondragover = (e) => {
      e.preventDefault();
      t.classList.add("drop");
    };
    t.ondragleave = () => t.classList.remove("drop");
    t.ondrop = (e) => {
      e.preventDefault();
      t.classList.remove("drop");
      reschedule(e.dataTransfer.getData("text/plain"), t.dataset.date);
    };
  });
}
function reschedule(id, date) {
  const c = S.data.contents.find((x) => x.ID === id);
  if (!c || !date || c.Date === date) return;
  const old = c.Date,
    r = { ...c, Date: date };
  upsert(S.data.contents, r);
  render();
  api("saveRecord", "Contents", r)
    .then((s) => {
      upsert(S.data.contents, s);
      toast(`Dipindah ke ${fmtShort(date)}`, {
        undo: () => reschedule(id, old),
      });
    })
    .catch((e) => {
      upsert(S.data.contents, c);
      render();
      toast(errMsg(e));
    });
}

/* ---------- Kalender mobile ---------- */
function mCal() {
  const items = filtered(),
    by = groupBy(items, "Date"),
    mo = S.month.getMonth(),
    list = by[S.sel] || [];
  return `<div class="mcal" id="swipe"><div class="dow">${HARI.map((d) => `<div>${d}</div>`).join("")}</div><div class="mg">${gridDays()
    .map((d) => {
      const k = ymd(d),
        l = by[k] || [];
      return `<button class="md ${d.getMonth() !== mo ? "out" : ""} ${k === TODAY ? "today" : ""} ${k === S.sel ? "sel" : ""}" onclick="pickDay('${k}')">${d.getDate()}<span class="dots">${l
        .slice(0, 4)
        .map(
          (c) =>
            `<i style="--c:${isAll() ? esc(accColor(c.AccountID)) : FC[c.Format]}"></i>`,
        )
        .join("")}</span></button>`;
    })
    .join("")}</div></div>
  <div class="dayhd"><h3>${fmtLong(S.sel)}</h3><button class="btn sm" onclick="newContent({Date:'${S.sel}'})">${ic("plus", 16)}Tambah</button></div>
  <div class="mlist">${list.length ? list.map((c) => item(c, false)).join("") : `<div class="empty"><b>Belum ada jadwal</b>Tap "Tambah" untuk mengisi tanggal ini.</div>`}</div>`;
}
function pickDay(k) {
  const d = pd(k);
  if (d.getMonth() !== S.month.getMonth())
    S.month = new Date(d.getFullYear(), d.getMonth(), 1);
  S.sel = k;
  render();
}
function item(c, withCheck = true) {
  const d = pd(c.Date),
    lk = c.PostLink || c.ResultLink;
  return `<div class="item" onclick="openEntity('Contents','${c.ID}')" style="--c:${FC[c.Format]}">
    ${withCheck ? `<input type="checkbox" class="ck" ${S.picked.has(c.ID) ? "checked" : ""} onclick="event.stopPropagation();pick('${c.ID}',this.checked)" aria-label="Pilih">` : ""}
    <div class="when"><b>${withCheck ? d.getDate() : esc(c.Time || "--")}</b><span>${withCheck ? BLN[d.getMonth()] : PSHORT[c.Platform] || ""}</span></div>
    <div class="m"><b>${esc(c.Title)}</b><div class="row">
      ${isAll() ? `<span class="chip dot" style="--c:${esc(accColor(c.AccountID))}">${esc((accById(c.AccountID) || {}).Name || "")}</span>` : ""}
      <span class="chip" style="--c:${FC[c.Format]}">${esc(c.Format)}</span>
      <select class="ssel" style="--s:${SC[c.Status]}" onclick="event.stopPropagation()" onchange="setStatus('${c.ID}',this.value)" aria-label="Ubah status">${opts(STATUSES, c.Status)}</select>
      ${progHTML(c)}${lk ? `<a class="lchip" href="${esc(lk)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${ic("arrow", 12)}${c.PostLink ? "Post" : "Hasil"}</a>` : ""}
      ${overdue(c) ? `<span class="chip" style="--c:#dc2626">Terlambat</span>` : ""}</div></div></div>`;
}

/* ---------- List ---------- */
function listItems() {
  let l = filtered();
  if (S.range === "month") l = inMonth(l);
  else if (S.range === "upcoming") l = l.filter((c) => c.Date >= TODAY);
  else if (S.range === "overdue") l = l.filter(overdue);
  const { k, d } = S.sort;
  const val = (c) =>
    k === "Date"
      ? c.Date + (c.Time || "")
      : k === "Status"
        ? STATUSES.indexOf(c.Status)
        : k === "Prog"
          ? progress(c)[1]
            ? progress(c)[0] / progress(c)[1]
            : -1
          : String(c[k] || "").toLowerCase();
  return l.sort((a, b) => {
    const x = val(a),
      y = val(b);
    return (x > y ? 1 : x < y ? -1 : 0) * d;
  });
}
function sortBy(k) {
  S.sort = S.sort.k === k ? { k, d: -S.sort.d } : { k, d: 1 };
  render();
}
function vList() {
  const l = listItems();
  setTimeout(() => {
    const e = $("#cnt");
    if (e) e.textContent = `${l.length} konten`;
  }, 0);
  const bulk = S.picked.size
    ? `<div class="bulk"><b>${S.picked.size} dipilih</b>
    <select class="fsel" onchange="if(this.value)bulkStatus(this.value)" aria-label="Ubah status"><option value="">Ubah status…</option>${opts(STATUSES)}</select>
    ${S.data.accounts.length > 1 ? `<select class="fsel" onchange="if(this.value)bulkMove(this.value)" aria-label="Pindah akun"><option value="">Pindah akun…</option>${S.data.accounts.map((a) => `<option value="${a.ID}">${esc(a.Name)}</option>`).join("")}</select>` : ""}
    <button class="btn sm" onclick="bulkShift(7)">+7 hari</button>
    <button class="btn sm danger" id="bulkDel" onclick="bulkDel(this)">${ic("trash", 15)}Hapus</button>
    <button class="ib sm bare" style="color:inherit" onclick="S.picked.clear();render()" aria-label="Batal pilih">${ic("x", 16)}</button></div>`
    : "";
  if (!l.length)
    return (
      bulk +
      `<div class="pn"><div class="empty"><b>${S.range === "overdue" ? "Tidak ada konten terlambat" : "Belum ada konten di sini"}</b>${S.range === "overdue" ? "Semua jadwal yang lewat sudah published." : "Ubah filter, atau buat konten baru."}<br><button class="btn pri" onclick="newContent()">${ic("plus", 17)}Konten baru</button></div></div>`
    );
  const grouped = S.sort.k === "Date";
  if (isMob()) {
    let last = "";
    return (
      bulk +
      `<div class="mlist">${l
        .map((c) => {
          const wk = weekStart(c.Date);
          const g =
            grouped && wk !== last
              ? `<div class="grp-m">${weekLabel(wk)}</div>`
              : "";
          last = wk;
          return g + item(c);
        })
        .join("")}</div>`
    );
  }
  const all = l.every((c) => S.picked.has(c.ID));
  const th = (k, lab) =>
    `<th class="sort ${S.sort.k === k ? "on" : ""}" onclick="sortBy('${k}')">${lab} <span class="arr">${S.sort.k === k ? (S.sort.d > 0 ? "▲" : "▼") : "▲"}</span></th>`;
  let last = "";
  return (
    bulk +
    `<div class="twrap"><table><thead><tr><th style="width:36px"><input type="checkbox" class="ck" ${all ? "checked" : ""} onchange="pickAll(this.checked)" aria-label="Pilih semua"></th>
    ${th("Date", "Jadwal")}${th("Title", "Konten")}${isAll() ? th("AccountID", "Akun") : ""}${th("Format", "Format")}<th>Platform</th>${th("Status", "Status")}${th("Prog", "Produksi")}<th>Link</th></tr></thead><tbody>
    ${l
      .map((c) => {
        const wk = weekStart(c.Date),
          g =
            grouped && wk !== last
              ? `<tr class="grp"><td colspan="${isAll() ? 9 : 8}">${weekLabel(wk)}</td></tr>`
              : "";
        last = wk;
        const links = [
          ...pj(c.Links, [])
            .slice(0, 2)
            .map((x) => [x.url, x.label]),
          c.PostLink ? [c.PostLink, "Post"] : null,
          c.ResultLink ? [c.ResultLink, "Hasil"] : null,
        ].filter(Boolean);
        const a = accById(c.AccountID);
        return (
          g +
          `<tr class="${S.picked.has(c.ID) ? "sel" : ""}" onclick="openEntity('Contents','${c.ID}')">
      <td onclick="event.stopPropagation()"><input type="checkbox" class="ck" ${S.picked.has(c.ID) ? "checked" : ""} onchange="pick('${c.ID}',this.checked)" aria-label="Pilih"></td>
      <td class="dt ${overdue(c) ? "over" : ""}"><b>${fmtShort(c.Date)}</b><span>${esc(c.Time || "")}${overdue(c) ? " · terlambat" : ""}</span></td>
      <td class="ttl"><b title="${esc(c.Title)}">${esc(c.Title)}</b><span>${[c.Pillar, c.Campaign].filter(Boolean).map(esc).join(" · ") || "—"}</span></td>
      ${isAll() ? `<td><span class="chip dot" style="--c:${esc(accColor(c.AccountID))}">${esc(a ? a.Name : "—")}</span></td>` : ""}
      <td><span class="chip" style="--c:${FC[c.Format]}">${esc(c.Format)}</span></td>
      <td>${esc(c.Platform)}</td>
      <td onclick="event.stopPropagation()"><select class="ssel" style="--s:${SC[c.Status]}" onchange="setStatus('${c.ID}',this.value)" aria-label="Ubah status">${opts(STATUSES, c.Status)}</select></td>
      <td>${progHTML(c) || '<span class="muted">—</span>'}</td>
      <td onclick="event.stopPropagation()"><div class="links">${links.length ? links.map(([u, lb]) => `<a class="lchip" href="${esc(u)}" target="_blank" rel="noopener" title="${esc(u)}">${esc(lb)}</a>`).join("") : '<span class="muted">—</span>'}</div></td></tr>`
        );
      })
      .join("")}
  </tbody></table></div>`
  );
}
function weekLabel(ws) {
  const we = addD(ws, 6),
    cur = weekStart(TODAY);
  const tag =
    ws === cur
      ? "Minggu ini · "
      : ws === addD(cur, 7)
        ? "Minggu depan · "
        : ws === addD(cur, -7)
          ? "Minggu lalu · "
          : "";
  const a = pd(ws),
    b = pd(we);
  return `${tag}${a.getDate()} ${BLN[a.getMonth()]} – ${b.getDate()} ${BLN[b.getMonth()]}`;
}
function pick(id, on) {
  on ? S.picked.add(id) : S.picked.delete(id);
  render();
}
function pickAll(on) {
  listItems().forEach((c) => (on ? S.picked.add(c.ID) : S.picked.delete(c.ID)));
  render();
}
function setStatus(id, v) {
  const c = S.data.contents.find((x) => x.ID === id);
  if (!c) return;
  const r = { ...c, Status: v };
  if (v === "Published") {
    const l = pj(c.Checklist, []);
    if (l.length)
      r.Checklist = JSON.stringify(l.map((x) => ({ ...x, d: true })));
  }
  upsert(S.data.contents, r);
  render();
  api("saveRecord", "Contents", r)
    .then((s) => {
      upsert(S.data.contents, s);
      toast(`Status: ${v}`, { undo: () => setStatus(id, c.Status) });
    })
    .catch((e) => {
      upsert(S.data.contents, c);
      render();
      toast(errMsg(e));
    });
}
function bulkRun(patchFn, msg) {
  const ids = [...S.picked],
    before = ids.map((id) => ({ ...S.data.contents.find((x) => x.ID === id) }));
  // kelompokkan per patch yang sama agar 1 request
  const groups = {};
  ids.forEach((id) => {
    const c = S.data.contents.find((x) => x.ID === id),
      p = patchFn(c),
      k = JSON.stringify(p);
    (groups[k] = groups[k] || { p, ids: [] }).ids.push(id);
    Object.assign(c, p);
  });
  S.picked.clear();
  render();
  Promise.all(
    Object.values(groups).map((g) => api("bulkUpdate", "Contents", g.ids, g.p)),
  )
    .then(() => toast(msg(ids.length)))
    .catch((e) => {
      before.forEach((b) => upsert(S.data.contents, b));
      render();
      toast(errMsg(e));
    });
}
const bulkStatus = (v) =>
  bulkRun(
    () => ({ Status: v }),
    (n) => `${n} konten → ${v}`,
  );
const bulkMove = (a) =>
  bulkRun(
    () => ({ AccountID: a }),
    (n) => `${n} konten dipindah ke ${(accById(a) || {}).Name}`,
  );
const bulkShift = (d) =>
  bulkRun(
    (c) => ({ Date: addD(c.Date, d) }),
    (n) => `${n} konten digeser ${d} hari`,
  );
function bulkDel(b) {
  if (!b.classList.contains("arm")) {
    b.classList.add("arm");
    b.lastChild.textContent = "Yakin hapus?";
    setTimeout(() => {
      if (b.isConnected) {
        b.classList.remove("arm");
        b.lastChild.textContent = "Hapus";
      }
    }, 3000);
    return;
  }
  const ids = [...S.picked],
    recs = S.data.contents.filter((c) => ids.includes(c.ID));
  S.data.contents = S.data.contents.filter((c) => !ids.includes(c.ID));
  S.picked.clear();
  render();
  api("bulkDelete", "Contents", ids)
    .then(() =>
      toast(`${ids.length} konten dihapus`, {
        undo: () =>
          Promise.all(recs.map((r) => api("saveRecord", "Contents", r))).then(
            () => {
              recs.forEach((r) => upsert(S.data.contents, r));
              render();
              toast("Dikembalikan");
            },
          ),
      }),
    )
    .catch((e) => {
      recs.forEach((r) => upsert(S.data.contents, r));
      render();
      toast(errMsg(e));
    });
}
