/* ======================= FORM ======================= */
const ACC_FIELD = { k: "AccountID", l: "Akun", t: "account" };
const CONTENT_FIELDS = [
  { sec: "Jadwal" },
  { k: "Title", l: "Judul konten", full: 1, req: 1 },
  ACC_FIELD,
  { k: "Status", l: "Status", t: "select", o: STATUSES },
  { k: "Date", l: "Tanggal", t: "date", req: 1 },
  { k: "Time", l: "Jam tayang", t: "time" },
  { k: "Platform", l: "Platform", t: "select", o: PLATFORMS },
  { k: "Format", l: "Format", t: "select", o: FORMATS },
  {
    k: "Campaign",
    l: "Campaign",
    t: "select",
    o: (r) => [
      "",
      ...S.data.campaigns
        .filter((c) => !r.AccountID || c.AccountID === r.AccountID)
        .map((c) => c.Name),
    ],
  },
  { k: "Pillar", l: "Content pillar" },
  { sec: "Isi konten" },
  { k: "Caption", l: "Caption / brief", t: "textarea", full: 1 },
  { k: "Hashtags", l: "Hashtag", full: 1 },
  { t: "copy" },
  { sec: "Checklist produksi" },
  { k: "Checklist", t: "checklist", full: 1 },
  { sec: "Link" },
  { k: "PostLink", l: "Link post (setelah tayang)", t: "url" },
  { k: "ResultLink", l: "Link hasil konten (Drive, dll)", t: "url" },
  { k: "Links", l: "Link referensi", t: "links", full: 1 },
  { sec: "Performa" },
  { k: "Views", l: "Views", t: "number" },
  { k: "Reach", t: "number" },
  { k: "Likes", t: "number" },
  { k: "Comments", t: "number" },
  { k: "Shares", t: "number" },
  { k: "Saves", t: "number" },
  { k: "Notes", l: "Catatan", t: "textarea", full: 1 },
];
const ENT = {
  Contents: {
    key: "contents",
    name: "konten",
    fields: CONTENT_FIELDS,
    def: () => ({
      AccountID: defAcc(),
      Date: S.sel || TODAY,
      Time: "06:00",
      Platform: (curAcc() || {}).Platform || "Instagram",
      Format: "Feed",
      Status: "Draft",
      Checklist: JSON.stringify(STEPS.map((t) => ({ t, d: false }))),
      Links: "[]",
    }),
  },
  Ideas: {
    key: "ideas",
    name: "ide",
    def: () => ({
      AccountID: defAcc(),
      Priority: "Medium",
      Status: "Baru",
      Format: "Reels",
      Platform: (curAcc() || {}).Platform || "Instagram",
      Links: "[]",
    }),
    fields: [
      { k: "Title", l: "Ide konten", full: 1, req: 1 },
      ACC_FIELD,
      { k: "Status", l: "Tahap", t: "select", o: IDEA_ST },
      {
        k: "Priority",
        l: "Prioritas",
        t: "select",
        o: ["High", "Medium", "Low"],
      },
      { k: "Pillar", l: "Pillar" },
      { k: "Format", l: "Format", t: "select", o: FORMATS },
      { k: "Platform", l: "Platform", t: "select", o: PLATFORMS },
      {
        k: "Links",
        l: "Link referensi (video, artikel, audio, moodboard…)",
        t: "links",
        full: 1,
      },
      { k: "Notes", l: "Catatan / hook", t: "textarea", full: 1 },
    ],
  },
  Campaigns: {
    key: "campaigns",
    name: "campaign",
    def: () => ({
      AccountID: defAcc(),
      Status: "Planning",
      Color: curAcc() ? curAcc().Color : "#4f46e5",
      StartDate: TODAY,
    }),
    fields: [
      { k: "Name", l: "Nama campaign", full: 1, req: 1 },
      ACC_FIELD,
      {
        k: "Status",
        l: "Status",
        t: "select",
        o: ["Planning", "Active", "Done"],
      },
      { k: "StartDate", l: "Mulai", t: "date" },
      { k: "EndDate", l: "Selesai", t: "date" },
      { k: "Color", l: "Warna", t: "color" },
      { k: "Goal", l: "Tujuan", full: 1 },
      { k: "Notes", l: "Catatan", t: "textarea", full: 1 },
    ],
  },
  Resources: {
    key: "resources",
    name: "resource",
    def: () => ({ AccountID: defAcc() }),
    fields: [
      { k: "Title", l: "Judul", full: 1, req: 1 },
      { ...ACC_FIELD, shared: 1 },
      { k: "Category", l: "Kategori" },
      { k: "Url", l: "Link", t: "url", full: 1 },
      { k: "Notes", l: "Catatan", t: "textarea", full: 1 },
    ],
  },
  Accounts: {
    key: "accounts",
    name: "akun",
    def: () => ({
      Platform: "Instagram",
      Color: ACC_COLORS[S.data.accounts.length % ACC_COLORS.length],
      TargetPerWeek: 3,
    }),
    fields: [
      { k: "Name", l: "Nama akun / brand", full: 1, req: 1 },
      { k: "Handle", l: "Username", ph: "@namaakun" },
      { k: "Platform", l: "Platform utama", t: "select", o: PLATFORMS },
      {
        k: "AvatarUrl",
        l: "Foto akun (upload atau URL gambar)",
        t: "image",
        full: 1,
      },
      { k: "Color", l: "Warna akun", t: "color" },
      { k: "TargetPerWeek", l: "Target posting / minggu", t: "number" },
      { k: "Notes", l: "Catatan", t: "textarea", full: 1 },
    ],
  },
};
const linkRow = (l = {}) =>
  `<div class="lrow"><input class="in" data-l="label" placeholder="Label (opsional)" value="${esc(l.label || "")}"><input class="in" data-l="url" type="url" inputmode="url" placeholder="https://…" value="${esc(l.url || "")}" onchange="autoLabel(this)"><button type="button" class="ib sm" onclick="this.parentElement.remove()" aria-label="Hapus link">${ic("x", 15)}</button></div>`;
const clRow = (x = {}) =>
  `<div class="crow"><input type="checkbox" class="ck" ${x.d ? "checked" : ""} aria-label="Selesai"><input class="in" placeholder="Langkah" value="${esc(x.t || "")}"><button type="button" class="ib sm bare" onclick="this.parentElement.remove()" aria-label="Hapus langkah">${ic("x", 15)}</button></div>`;
function autoLabel(u) {
  const l = u.parentElement.querySelector("[data-l=label]");
  if (u.value && !l.value) l.value = domainLabel(u.value);
}
function addLinkRow(btn, focus = true) {
  const w = btn.previousElementSibling;
  w.insertAdjacentHTML("beforeend", linkRow());
  if (focus) w.lastElementChild.querySelector("[data-l=url]").focus();
}
const PERF_KEYS = ["Views", "Reach", "Likes", "Comments", "Shares", "Saves"];
function autoPanel(r) {
  const n = (v) =>
    v === "" || v == null ? "–" : Number(v).toLocaleString("id-ID");
  const eng = ["Likes", "Comments", "Shares", "Saves"].reduce(
      (a, k) => a + (+r[k] || 0),
      0,
    ),
    base = +r.Reach || 0;
  const er = base
      ? ((eng / base) * 100).toFixed(1).replace(".", ",") + "%"
      : "–",
    vr = r.ReachSrc === "views";
  const tiles = [
    ["Views", r.Views],
    [vr ? "Reach*" : "Reach", r.Reach],
    ["Likes", r.Likes],
    ["Comments", r.Comments],
    ["Shares", r.Shares],
    ["Saves", r.Saves],
  ];
  return `<div class="f full"><div class="autom">${tiles.map(([l, v]) => `<div class="kpi"><span>${l}</span><b>${n(v)}</b></div>`).join("")}<div class="kpi"><span>Engagement rate</span><b>${er}</b></div></div>
    <p class="hint">${r.PostedTime ? `Tayang ${esc(r.PostedDate)} pukul ${esc(r.PostedTime)} WIB${r.Time && r.Time !== r.PostedTime ? ` (rencana ${esc(r.Time)})` : ""}. ` : ""}Otomatis dari API ${esc(r.MetricsSrc || "")}, diperbarui ${esc(r.MetricsAt || "-")}.${vr ? " *Platform ini tidak menyediakan reach, jadi Views dipakai sebagai pembanding." : ""} Angka ini tidak diedit manual.</p></div>`;
}
function fieldHTML(f, rec) {
  if (f.sec === "Performa" && rec.ID && rec.AutoMetrics)
    return `<div class="fsec">Performa</div>${autoPanel(rec)}`;
  if (rec.ID && rec.AutoMetrics && PERF_KEYS.includes(f.k)) return "";
  if (f.sec) return `<div class="fsec">${f.sec}</div>`;
  if (f.t === "copy")
    return `<div class="f full" style="flex-direction:row"><button type="button" class="btn sm" onclick="copyCaption()">${ic("copy", 15)}Salin caption + hashtag</button></div>`;
  const v = rec[f.k] ?? "",
    id = "f_" + f.k,
    lab = `<label for="${id}">${esc(f.l || f.k)}${f.req ? " *" : ""}</label>`,
    cls = `f ${f.full ? "full" : ""}`;
  if (f.t === "image")
    return `<div class="${cls}">${lab}<div class="avatar-field"><div class="avatar-preview" id="avatarPreview">${avatar({ Name: rec.Name || "Akun", Color: rec.Color || "#4f46e5", AvatarUrl: v, Platform: rec.Platform }, "lg")}</div><div class="avatar-inputs"><input class="in" id="${id}" data-k="${f.k}" type="url" inputmode="url" placeholder="https://… atau link gambar Google Drive" value="${esc(v)}" oninput="previewAccountAvatar(this.value)"><label class="btn sm avatar-upload" for="avatarFile">${ic("image", 15)}Upload gambar</label><input id="avatarFile" class="avatar-file" type="file" accept="image/*" onchange="uploadAccountAvatar(this)"><span class="hint">Gambar otomatis diperkecil agar tersimpan di Google Sheets.</span></div></div></div>`;
  if (f.t === "account") {
    if (S.data.accounts.length < 2 && !f.shared)
      return `<input type="hidden" data-k="AccountID" value="${esc(v || defAcc())}">`;
    return `<div class="${cls}">${lab}<select class="in" id="${id}" data-k="${f.k}" onchange="accFieldChange()">${f.shared ? `<option value="" ${!v ? "selected" : ""}>Bersama (semua akun)</option>` : ""}${S.data.accounts.map((a) => `<option value="${a.ID}" ${a.ID === v ? "selected" : ""}>${esc(a.Name)}</option>`).join("")}</select></div>`;
  }
  if (f.t === "links") {
    const L = pj(v, []);
    return `<div class="${cls}">${lab}<div data-k="${f.k}" data-t="links">${(L.length ? L : [{}]).map(linkRow).join("")}</div><button type="button" class="btn sm addrow" onclick="addLinkRow(this)">${ic("plus", 15)}Tambah link</button></div>`;
  }
  if (f.t === "checklist") {
    const L = pj(v, []);
    return `<div class="${cls}"><div data-k="${f.k}" data-t="checklist">${L.map(clRow).join("")}</div><button type="button" class="btn sm addrow" onclick="this.previousElementSibling.insertAdjacentHTML('beforeend',clRow());this.previousElementSibling.lastElementChild.querySelector('.in').focus()">${ic("plus", 15)}Tambah langkah</button></div>`;
  }
  if (f.t === "select") {
    const o = typeof f.o === "function" ? f.o(rec) : f.o;
    if (v && !o.includes(v)) o.push(v);
    return `<div class="${cls}">${lab}<select class="in" id="${id}" data-k="${f.k}">${o.map((x) => `<option value="${esc(x)}" ${x === v ? "selected" : ""}>${esc(x || "— Tidak ada —")}</option>`).join("")}</select></div>`;
  }
  if (f.t === "textarea")
    return `<div class="${cls}">${lab}<textarea class="in" id="${id}" data-k="${f.k}">${esc(v)}</textarea></div>`;
  return `<div class="${cls}">${lab}<input class="in" id="${id}" data-k="${f.k}" type="${f.t || "text"}" ${f.t === "number" ? 'inputmode="numeric" min="0"' : ""} ${f.ph ? `placeholder="${esc(f.ph)}"` : ""} value="${esc(v)}"></div>`;
}
function previewAccountAvatar(value) {
  const preview = $("#avatarPreview");
  if (!preview) return;
  const name = $("#f_Name")?.value || "Akun",
    color = $("#f_Color")?.value || "#4f46e5";
  preview.innerHTML = avatar(
    {
      Name: name,
      Color: color,
      AvatarUrl: value,
      Platform: $("#f_Platform")?.value,
    },
    "lg",
  );
}
async function uploadAccountAvatar(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    toast("Pilih file gambar");
    input.value = "";
    return;
  }
  try {
    const image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Gambar tidak dapat dibaca"));
      reader.onload = () => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Format gambar tidak didukung"));
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
    const canvas = document.createElement("canvas");
    let scale = Math.min(
        1,
        256 / Math.max(image.naturalWidth, image.naturalHeight),
      ),
      data = "";
    const supportsWebp = canvas
      .toDataURL("image/webp")
      .startsWith("data:image/webp");
    for (let attempt = 0; attempt < 5; attempt++) {
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      canvas
        .getContext("2d")
        .drawImage(image, 0, 0, canvas.width, canvas.height);
      if (supportsWebp) {
        for (let quality = 0.86; quality >= 0.46; quality -= 0.1) {
          data = canvas.toDataURL("image/webp", quality);
          if (data.length <= 45000) break;
        }
      } else data = canvas.toDataURL("image/png");
      if (data.length <= 45000) break;
      scale *= 0.72;
    }
    if (data.length > 45000)
      throw new Error(
        "Gambar terlalu besar. Coba gambar lain yang lebih sederhana.",
      );
    const field = $("#f_AvatarUrl");
    field.value = data;
    previewAccountAvatar(data);
  } catch (error) {
    toast(error.message || "Gambar tidak dapat dibaca");
  } finally {
    input.value = "";
  }
}
function collect() {
  const v = {};
  $$("#ef [data-k]").forEach((el) => {
    const k = el.dataset.k,
      t = el.dataset.t;
    if (t === "links")
      v[k] = JSON.stringify(
        [...el.querySelectorAll(".lrow")]
          .map((r) => ({
            label: r.querySelector("[data-l=label]").value.trim(),
            url: r.querySelector("[data-l=url]").value.trim(),
          }))
          .filter((x) => x.url)
          .map((x) => ({
            label: x.label || domainLabel(x.url),
            url: normUrl(x.url),
          })),
      );
    else if (t === "checklist")
      v[k] = JSON.stringify(
        [...el.querySelectorAll(".crow")]
          .map((r) => ({
            t: r.querySelector(".in").value.trim(),
            d: r.querySelector(".ck").checked,
          }))
          .filter((x) => x.t),
      );
    else if (el.type === "number")
      v[k] = el.value === "" ? "" : Number(el.value);
    else v[k] = el.value.trim();
  });
  ["PostLink", "ResultLink", "Url", "AvatarUrl"].forEach((k) => {
    if (v[k] && !/^data:image\//i.test(v[k])) v[k] = normUrl(v[k]);
  });
  return v;
}
function accFieldChange() {
  const sel = $("#f_Campaign"),
    acc = $("#f_AccountID");
  if (!sel || !acc) return;
  const cur = sel.value,
    names = [
      "",
      ...S.data.campaigns
        .filter((c) => c.AccountID === acc.value)
        .map((c) => c.Name),
    ];
  sel.innerHTML = names
    .map(
      (n) =>
        `<option value="${esc(n)}" ${n === cur ? "selected" : ""}>${esc(n || "— Tidak ada —")}</option>`,
    )
    .join("");
}
function copyCaption() {
  const t = [$("#f_Caption")?.value, $("#f_Hashtags")?.value]
    .filter(Boolean)
    .join("\n\n");
  if (!t) return toast("Caption masih kosong");
  const ok = () => toast("Caption disalin");
  if (navigator.clipboard && navigator.clipboard.writeText)
    navigator.clipboard.writeText(t).then(ok).catch(fallback);
  else fallback();
  function fallback() {
    const a = document.createElement("textarea");
    a.value = t;
    document.body.appendChild(a);
    a.select();
    try {
      document.execCommand("copy");
      ok();
    } catch (e) {
      toast("Gagal menyalin");
    }
    a.remove();
  }
}
function newContent(preset) {
  if (!S.data.accounts.length) {
    toast("Tambahkan akun dulu");
    return openEntity("Accounts");
  }
  openEntity("Contents", null, preset);
}
function openEntity(sheet, id, preset, afterSave, focusLinks) {
  closePop();
  const E = ENT[sheet],
    arr = S.data[E.key];
  const rec = id
    ? arr.find((x) => x.ID === id)
    : { ...E.def(), ...(preset || {}) };
  if (!rec) return;
  const nm = E.name[0].toUpperCase() + E.name.slice(1);
  let extra = "";
  if (sheet === "Accounts" && id) {
    const n = (k) => S.data[k].filter((x) => x.AccountID === id).length;
    extra = `<p class="hint" style="margin-top:14px">Menghapus akun juga menghapus ${n("contents")} konten, ${n("ideas")} ide, ${n("campaigns")} campaign, dan ${n("resources")} resource miliknya.</p>`;
  }
  openSheet(`<div class="grab"></div><div class="sh-h"><h3>${id ? "Edit" : "Tambah"} ${E.name}</h3>${id && sheet === "Contents" ? `<button class="ib bare" onclick="dupContent('${id}')" title="Duplikat" aria-label="Duplikat">${ic("copy", 18)}</button>` : ""}<button class="ib bare" onclick="closeSheet()" aria-label="Tutup">${ic("x")}</button></div>
    <div class="sh-b"><div class="fg" id="ef">${E.fields.map((f) => fieldHTML(f, rec)).join("")}</div>${extra}</div>
    <div class="sh-f">${id && !(sheet === "Accounts" && S.data.accounts.length < 2) ? `<button class="btn danger" id="delB">${ic("trash", 16)}<span>Hapus</span></button>` : ""}<span class="sp"></span>
      <button class="btn desk" onclick="closeSheet()">Batal</button><button class="btn pri" id="saveB">${id ? "Simpan" : "Tambah " + E.name}</button></div>`);
  $("#saveB").onclick = () => {
    const v = collect(),
      miss = E.fields.find((f) => f.req && !v[f.k]);
    if (miss) {
      const el = $("#f_" + miss.k);
      el.focus();
      el.style.borderColor = "#dc2626";
      return toast(`${miss.l} wajib diisi`);
    }
    const b = $("#saveB");
    b.disabled = true;
    b.textContent = "Menyimpan…";
    api("saveRecord", sheet, { ...rec, ...v })
      .then((r) => {
        upsert(arr, r);
        if (sheet === "Contents" && r.Date) {
          S.sel = r.Date;
          const d = pd(r.Date);
          if (S.view === "content" && S.cmode === "calendar")
            S.month = new Date(d.getFullYear(), d.getMonth(), 1);
        }
        if (sheet === "Accounts" && !id) {
          S.acc = r.ID;
          store.set("cp2_acc", r.ID);
        }
        closeSheet();
        applyPrefs();
        render();
        toast(id ? "Perubahan disimpan" : `${nm} ditambahkan`);
        afterSave && afterSave(r);
      })
      .catch((e) => {
        toast(errMsg(e));
        b.disabled = false;
        b.textContent = "Coba simpan lagi";
      });
  };
  const del = $("#delB");
  if (del)
    del.onclick = () => {
      if (!del.classList.contains("arm")) {
        del.classList.add("arm");
        del.lastChild.textContent = "Tap lagi untuk hapus";
        setTimeout(() => {
          if (del.isConnected) {
            del.classList.remove("arm");
            del.lastChild.textContent = "Hapus";
          }
        }, 3000);
        return;
      }
      del.disabled = true;
      if (sheet === "Accounts")
        return api("deleteAccount", id)
          .then(() => {
            ["contents", "ideas", "campaigns", "resources"].forEach(
              (k) => (S.data[k] = S.data[k].filter((x) => x.AccountID !== id)),
            );
            S.data.accounts = S.data.accounts.filter((a) => a.ID !== id);
            if (S.acc === id) S.acc = S.data.accounts[0].ID;
            closeSheet();
            applyPrefs();
            render();
            toast("Akun dihapus");
          })
          .catch((e) => toast(errMsg(e)));
      api("deleteRecord", sheet, id)
        .then(() => {
          S.data[E.key] = S.data[E.key].filter((x) => x.ID !== id);
          closeSheet();
          render();
          toast(`${nm} dihapus`, {
            undo: () =>
              api("saveRecord", sheet, rec).then((r) => {
                upsert(S.data[E.key], r);
                render();
                toast("Dikembalikan");
              }),
          });
        })
        .catch((e) => toast(errMsg(e)));
    };
  setTimeout(() => {
    if (focusLinks) {
      const b = [...$$("#ef .addrow")].find(
        (x) => x.previousElementSibling.dataset.t === "links",
      );
      const empty =
        b &&
        [...b.previousElementSibling.querySelectorAll("[data-l=url]")].find(
          (i) => !i.value,
        );
      empty ? empty.focus() : b && addLinkRow(b);
      empty && empty.scrollIntoView({ block: "center" });
      return;
    }
    if (!isMob() && !id) $("#ef .in")?.focus();
  }, 60);
}
function dupContent(id) {
  const c = S.data.contents.find((x) => x.ID === id);
  if (!c) return;
  const l = pj(c.Checklist, []).map((x) => ({ ...x, d: false }));
  closeSheet();
  setTimeout(
    () =>
      openEntity("Contents", null, {
        ...c,
        ID: "",
        Title: c.Title + " (copy)",
        Status: "Draft",
        Date: addD(c.Date, 7),
        Checklist: JSON.stringify(l),
        PostLink: "",
        ResultLink: "",
        Reach: "",
        Views: "",
        Likes: "",
        Comments: "",
        Shares: "",
        Saves: "",
        AutoMetrics: "",
        MetricsAt: "",
        ReachSrc: "",
      }),
    40,
  );
}
function openSheet(html, cls = "") {
  const s = $("#sheet");
  s.className = "sheet " + cls;
  s.innerHTML = html;
  $("#ov").classList.add("open");
}
function closeSheet() {
  $("#ov").classList.remove("open");
}
