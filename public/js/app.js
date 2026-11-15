/* ======================= Ikon ======================= */
const ICON_NAMES = {
  home: "House",
  calendar: "Calendar",
  list: "List",
  flag: "Flag",
  bulb: "Lightbulb",
  folder: "Folder",
  chart: "ChartNoAxesColumnIncreasing",
  users: "Users",
  gear: "Settings",
  plus: "Plus",
  right: "ArrowRight",
  play: "Play",
  bell: "Bell",
  trend: "TrendingUp",
  download: "Download",
  chevL: "ChevronLeft",
  chevR: "ChevronRight",
  updown: "ArrowUpDown",
  sun: "Sun",
  moon: "Moon",
  sheet: "FileSpreadsheet",
  refresh: "RefreshCw",
  search: "Search",
  x: "X",
  check: "Check",
  more: "Ellipsis",
  arrow: "ArrowUpRight",
  link: "Link",
  edit: "Pencil",
  copy: "Copy",
  trash: "Trash2",
  palette: "Palette",
  alert: "TriangleAlert",
  target: "Target",
  file: "FileText",
  swap: "ArrowLeftRight",
  menu: "Menu",
  note: "NotebookPen",
  lock: "Lock",
  eye: "Eye",
  eyeoff: "EyeOff",
  pin: "Pin",
  dashboard: "LayoutDashboard",
  image: "Image",
};

function ic(name, size = 20) {
  const iconName = ICON_NAMES[name];
  const iconDefinition = iconName && window.lucide?.[iconName];

  if (!iconDefinition || !window.lucide?.createElement) {
    return "";
  }

  const icon = window.lucide.createElement(iconDefinition);
  const iconSize = Number(size) || 20;

  icon.setAttribute("class", "i");
  icon.setAttribute("width", String(iconSize));
  icon.setAttribute("height", String(iconSize));
  icon.setAttribute("aria-hidden", "true");

  return icon.outerHTML;
}

function setNavCollapsed(collapsed) {
  const app = document.getElementById("app"),
    button = document.getElementById("navCollapseBtn"),
    expandButton = document.getElementById("navExpandBtn");
  if (!app || !button || !expandButton) return;
  app.classList.toggle("nav-collapsed", collapsed);
  const side = document.documentElement.dataset.side || "right";
  button.innerHTML = ic(side === "right" ? "chevR" : "chevL", 18);
  button.setAttribute("aria-expanded", String(!collapsed));
  expandButton.setAttribute("aria-expanded", String(!collapsed));
  expandButton.setAttribute("aria-label", "Toggle sidebar");
  expandButton.title = "Toggle sidebar";
}
function toggleNav() {
  const collapsed = !document
    .getElementById("app")
    .classList.contains("nav-collapsed");
  setNavCollapsed(collapsed);
}
setNavCollapsed(true);

/* ======================= Konstanta & util ======================= */
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        m
      ],
  );
const BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
const BLN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];
const HARI = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const HARI_F = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const PLATFORMS = [
  "Instagram",
  "TikTok",
  "YouTube",
  "Facebook",
  "X / Twitter",
  "LinkedIn",
];
const PSHORT = {
  Instagram: "IG",
  TikTok: "TT",
  YouTube: "YT",
  Facebook: "FB",
  "X / Twitter": "X",
  LinkedIn: "IN",
};
const FORMATS = ["Feed", "Reels", "Carousel", "Story", "Video"];
const FC = {
  Feed: "#2563eb",
  Reels: "#db2777",
  Carousel: "#d97706",
  Story: "#7c3aed",
  Video: "#059669",
};
const STATUSES = ["Idea", "Draft", "Content done", "Scheduled", "Published"];
const SC = {
  Idea: "#b45309",
  Draft: "#64748b",
  "Content done": "#0d9488",
  Scheduled: "#2563eb",
  Published: "#16a34a",
};
const IDEA_ST = ["Baru", "Riset", "Siap dibuat"];
const ISC = { Baru: "#64748b", Riset: "#d97706", "Siap dibuat": "#16a34a" };
const PRC = { High: "#dc2626", Medium: "#d97706", Low: "#64748b" };
const STEPS = ["Brief", "Script", "Produksi", "Editing", "Caption", "Approval"];
const ACC_COLORS = [
  "#4f46e5",
  "#0d9488",
  "#e11d48",
  "#0369a1",
  "#7e22ce",
  "#c2410c",
  "#334155",
  "#16a34a",
];
const PLATFORM_AVATARS = {
  Instagram: "/assets/img/instagram.png",
  Facebook: "/assets/img/facebook-app-symbol.png",
  TikTok: "/assets/img/tik-tok.png",
  YouTube: "/assets/img/youtube.png",
};
const THEMES = {
  account: ["Warna akun", null],
  indigo: ["Indigo", "#4f46e5"],
  emerald: ["Emerald", "#059669"],
  rose: ["Rose", "#e11d48"],
  ocean: ["Ocean", "#1470ff"],
  grape: ["Grape", "#7e22ce"],
  amber: ["Amber", "#c2410c"],
  slate: ["Slate", "#334155"],
};
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const pd = (s) => {
  const [y, m, d] = String(s).split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
};
const addD = (s, n) => {
  const d = pd(s);
  d.setDate(d.getDate() + n);
  return ymd(d);
};
const NOW = new Date(),
  TODAY = ymd(NOW);
const nf = (n) => Number(n || 0).toLocaleString("id-ID");
const cf = (n) =>
  new Intl.NumberFormat("id-ID", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(n || 0));
const isMob = () => matchMedia("(max-width:760px)").matches;
const store = {
  get(k, d) {
    try {
      const v = localStorage.getItem(k);
      return v == null ? d : JSON.parse(v);
    } catch (e) {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  },
};
const pj = (s, d) => {
  if (Array.isArray(s)) return s;
  try {
    const v = JSON.parse(s || "");
    return Array.isArray(v) ? v : d;
  } catch (e) {
    return d;
  }
};
const fmtShort = (s) => {
  const d = pd(s);
  return `${HARI_F[d.getDay()].slice(0, 3)}, ${d.getDate()} ${BLN[d.getMonth()]}`;
};
const fmtLong = (s) => {
  const d = pd(s);
  return `${HARI_F[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
};
const monthRange = (m) => [
  ymd(new Date(m.getFullYear(), m.getMonth(), 1)),
  ymd(new Date(m.getFullYear(), m.getMonth() + 1, 0)),
];
const weekStart = (s) => {
  const d = pd(s);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return ymd(d);
};
const initials = (n) =>
  String(n || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
const normUrl = (u) => (!u ? "" : /^[a-z]+:\/\//i.test(u) ? u : "https://" + u);
function domainLabel(u) {
  try {
    const h = new URL(normUrl(u)).hostname.replace(/^www\./, "");
    const map = [
      ["instagram", "Instagram"],
      ["tiktok", "TikTok"],
      ["youtu", "YouTube"],
      ["drive.google", "Google Drive"],
      ["docs.google", "Google Docs"],
      ["pinterest", "Pinterest"],
      ["canva", "Canva"],
      ["figma", "Figma"],
      ["notion", "Notion"],
      ["twitter", "X"],
      ["x.com", "X"],
      ["facebook", "Facebook"],
      ["linkedin", "LinkedIn"],
      ["capcut", "CapCut"],
      ["spotify", "Spotify"],
    ];
    const f = map.find(([k]) => h.includes(k));
    return f ? f[1] : h;
  } catch (e) {
    return "Link";
  }
}
const isUrl = (s) =>
  /^(https?:\/\/|www\.)\S+$/i.test(String(s).trim()) ||
  /^[\w-]+\.(com|id|co|net|org|io|app|me|ly)(\/\S*)?$/i.test(String(s).trim());

/* ======================= State ======================= */
const S = {
  data: {
    accounts: [],
    contents: [],
    campaigns: [],
    ideas: [],
    resources: [],
    settings: {},
    sheetUrl: "",
  },
  acc: store.get("cp2_acc", ""),
  view: store.get("cp2_view", "dashboard"),
  cmode: store.get("cp2_cmode", "calendar"),
  range: "month",
  month: new Date(NOW.getFullYear(), NOW.getMonth(), 1),
  sel: TODAY,
  sort: { k: "Date", d: 1 },
  picked: new Set(),
  f: { q: "", platform: "", status: "", format: "" },
  ideaSt: "",
  ideaQ: "",
  prefs: Object.assign(
    { theme: "ocean", mode: "light", side: "right" },
    store.get("cp2_prefs", {}),
  ),
  ready: false,
  loading: false,
  loadErr: "",
  notes: store.get("cp2_notes", []),
};

/* ===== Loading guard and visible startup errors ===== */
window.__cpReady = false;
function cpShowErr(msg) {
  if (window.__cpReady) return;
  const lock = document.getElementById("lock");
  if (lock) lock.classList.add("hide");
  document.body.classList.remove("locked");
  const loader = document.getElementById("loader");
  if (!loader) return;
  loader.classList.remove("hide");
  loader.innerHTML = "";
  const box = document.createElement("div");
  box.className = "cperr";
  const title = document.createElement("h3");
  title.textContent = "Data belum bisa dimuat";
  const error = document.createElement("pre");
  error.textContent = String(msg);
  const steps = document.createElement("ol");
  [
    "Pastikan secrets Google Sheets sudah diatur di Netlify.",
    "Bagikan spreadsheet sebagai Editor ke email service account.",
    "Periksa log Netlify Functions dan coba muat ulang.",
  ].forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    steps.appendChild(li);
  });
  const retry = document.createElement("button");
  retry.textContent = "Coba lagi";
  retry.onclick = cpRetry;
  box.append(title, error, steps, retry);
  loader.appendChild(box);
}
function cpWatch() {
  clearTimeout(window.__cpWd);
  window.__cpWd = setTimeout(
    () =>
      cpShowErr(
        "Server tidak merespons dalam " +
          Math.round((window.CP_TIMEOUT || 45000) / 1000) +
          " detik.",
      ),
    (window.CP_TIMEOUT || 45000) + 2000,
  );
}
function cpRetry() {
  const loader = document.getElementById("loader");
  loader.innerHTML = '<div class="spin"></div>';
  cpWatch();
  if (window.reload) reload();
}
window.addEventListener("error", (e) =>
  cpShowErr(
    "Error JavaScript: " +
      (e.message || e.error) +
      (e.lineno ? " (baris " + e.lineno + ")" : ""),
  ),
);
window.addEventListener("unhandledrejection", (e) =>
  cpShowErr("Error: " + ((e.reason && e.reason.message) || e.reason)),
);
cpWatch();

/* ======================= Demo data ======================= */
const Demo = (() => {
  const y = NOW.getFullYear(),
    m = NOW.getMonth(),
    d = (n) => ymd(new Date(y, m, n));
  const SGK = "ACC-SGK",
    PKC = "ACC-PKC";
  const cl = (st) =>
    JSON.stringify(
      STEPS.map((t, i) => ({
        t,
        d:
          st === "Published" ||
          st === "Scheduled" ||
          (st === "Content done" && i < 5) ||
          (st === "Draft" && i < 2),
      })),
    );
  const raw = [
    [
      SGK,
      1,
      "06:30",
      "Selamat datang di Studio Gerak: intip ruang kelasnya",
      "Feed",
      "Published",
      "Branding",
      "Kelas Perdana Pilates",
    ],
    [
      SGK,
      3,
      "18:00",
      "Pilates pemula: 5 gerakan dasar yang wajib kamu tahu",
      "Carousel",
      "Published",
      "Edukasi",
      "Kelas Perdana Pilates",
    ],
    [
      SGK,
      5,
      "07:00",
      "Ikut kelas perdana, begini rasanya",
      "Reels",
      "Published",
      "Testimoni",
      "Kelas Perdana Pilates",
    ],
    [
      SGK,
      8,
      "12:00",
      "Jadwal kelas minggu ini",
      "Story",
      "Published",
      "Info",
      "",
    ],
    [
      SGK,
      10,
      "06:30",
      "Stretching 5 menit sebelum tidur",
      "Reels",
      "Published",
      "Tips",
      "",
    ],
    [
      SGK,
      13,
      "17:00",
      "Kenalan sama instruktur: Coach Maya",
      "Feed",
      "Published",
      "Community",
      "Kelas Perdana Pilates",
    ],
    [
      SGK,
      16,
      "06:30",
      "Mulai! Challenge 21 Hari Gerak",
      "Reels",
      "Published",
      "Promo",
      "Challenge 21 Hari Gerak",
    ],
    [
      SGK,
      19,
      "18:00",
      "Checklist harian challenge hari 1-7",
      "Carousel",
      "Published",
      "Edukasi",
      "Challenge 21 Hari Gerak",
    ],
    [
      SGK,
      22,
      "07:00",
      "Peserta challenge cerita: minggu pertama",
      "Story",
      "Content done",
      "Testimoni",
      "Challenge 21 Hari Gerak",
    ],
    [
      SGK,
      24,
      "12:00",
      "Yoga vs pilates: pilih yang mana?",
      "Carousel",
      "Scheduled",
      "Edukasi",
      "",
    ],
    [
      SGK,
      26,
      "06:30",
      "Gerakan ringan buat yang kerja duduk seharian",
      "Reels",
      "Content done",
      "Tips",
      "Challenge 21 Hari Gerak",
    ],
    [
      SGK,
      28,
      "17:00",
      "Progres peserta di tengah challenge",
      "Feed",
      "Draft",
      "Community",
      "Challenge 21 Hari Gerak",
    ],
    [
      SGK,
      30,
      "18:00",
      "Promo member baru bulan depan",
      "Feed",
      "Idea",
      "Promo",
      "",
    ],
    [
      PKC,
      2,
      "20:00",
      "Buku yang bikin aku lupa waktu",
      "Video",
      "Published",
      "Review",
      "Baca 12 Buku Setahun",
    ],
    [
      PKC,
      6,
      "20:00",
      "Rak buku baru: tur singkat",
      "Video",
      "Published",
      "Lifestyle",
      "",
    ],
    [
      PKC,
      10,
      "20:00",
      "3 novel pendek buat pembaca pemula",
      "Video",
      "Published",
      "Rekomendasi",
      "Baca 12 Buku Setahun",
    ],
    [
      PKC,
      14,
      "20:00",
      "Cara baca 20 halaman sehari tanpa paksaan",
      "Video",
      "Published",
      "Tips",
      "Baca 12 Buku Setahun",
    ],
    [
      PKC,
      18,
      "20:00",
      "Plot twist yang bikin aku teriak",
      "Video",
      "Published",
      "Review",
      "",
    ],
    [
      PKC,
      21,
      "20:00",
      "Book haul dari bazar buku murah",
      "Video",
      "Content done",
      "Hiburan",
      "",
    ],
    [
      PKC,
      25,
      "20:00",
      "Ending buku favorit: setuju atau enggak?",
      "Video",
      "Scheduled",
      "Diskusi",
      "Baca 12 Buku Setahun",
    ],
    [
      PKC,
      29,
      "20:00",
      "Tag temanmu yang suka pinjam buku tapi gak balikin",
      "Video",
      "Draft",
      "Hiburan",
      "",
    ],
  ];
  const L = (a) => JSON.stringify(a.map(([label, url]) => ({ label, url })));
  const db = {
    accounts: [
      {
        ID: SGK,
        Name: "Studio Gerak",
        Handle: "@studiogerak.id",
        Platform: "Instagram",
        Color: "#0ea5e9",
        TargetPerWeek: 4,
        Notes: "Studio yoga dan pilates: kelas, tips, komunitas",
      },
      {
        ID: PKC,
        Name: "Pustaka Kecil",
        Handle: "@pustakakecil",
        Platform: "TikTok",
        Color: "#7c3aed",
        TargetPerWeek: 3,
        Notes: "Komunitas baca dan review buku",
      },
    ],
    contents: raw.map((r, i) => {
      const pub = r[5] === "Published",
        reach = pub ? 700 + ((i * 283) % 2100) : "",
        tk = r[0] === PKC;
      return {
        ID: "CNT-" + pad(i + 1),
        AccountID: r[0],
        Date: d(r[1]),
        Time: r[2],
        Title: r[3],
        Platform: tk ? "TikTok" : "Instagram",
        Format: r[4],
        Status: r[5],
        Campaign: r[7],
        Pillar: r[6],
        Caption: "",
        Hashtags: tk
          ? "#pustakakecil #bukutok"
          : "#studiogerak #pilatesindonesia",
        Checklist: cl(r[5]),
        Links: "[]",
        PostLink: pub
          ? tk
            ? "https://www.tiktok.com/"
            : "https://www.instagram.com/"
          : "",
        ResultLink: r[5] === "Content done" ? "https://drive.google.com/" : "",
        Reach: reach,
        Likes: pub ? Math.round(reach * 0.08 + i * 2) : "",
        Comments: pub ? Math.round(reach * 0.01) + (i % 5) : "",
        Shares: pub ? ((i * 3) % 17) + 4 : "",
        Saves: pub ? Math.round(reach * 0.03) + (i % 6) : "",
        Notes: "",
      };
    }),
    campaigns: [
      {
        ID: "CMP-1",
        AccountID: SGK,
        Name: "Kelas Perdana Pilates",
        StartDate: d(1),
        EndDate: d(14),
        Goal: "Isi 40 slot kelas perdana",
        Color: "#0ea5e9",
        Status: "Done",
      },
      {
        ID: "CMP-2",
        AccountID: SGK,
        Name: "Challenge 21 Hari Gerak",
        StartDate: d(16),
        EndDate: d(30),
        Goal: "Ajak 100 peserta ikut challenge",
        Color: "#f97316",
        Status: "Active",
      },
      {
        ID: "CMP-3",
        AccountID: PKC,
        Name: "Baca 12 Buku Setahun",
        StartDate: d(1),
        EndDate: d(30),
        Goal: "Bangun komunitas baca 1.500 anggota",
        Color: "#7c3aed",
        Status: "Active",
      },
    ],
    ideas: [
      {
        ID: "IDE-1",
        AccountID: SGK,
        Title: "Tur 60 detik: satu hari di Studio Gerak",
        Pillar: "Behind the scene",
        Format: "Reels",
        Platform: "Instagram",
        Priority: "High",
        Status: "Siap dibuat",
        Links: L([["Referensi Reels", "https://www.instagram.com/reels/"]]),
        Notes: "Buka dengan suara kelas pagi",
      },
      {
        ID: "IDE-2",
        AccountID: PKC,
        Title: "Audiobook vs buku cetak: mana yang lebih masuk?",
        Pillar: "Diskusi",
        Format: "Video",
        Platform: "TikTok",
        Priority: "Medium",
        Status: "Riset",
        Links: L([
          [
            "Artikel sumber",
            "https://www.google.com/search?q=audiobook+vs+buku+cetak",
          ],
        ]),
        Notes: "Minta pendapat di kolom komentar",
      },
      {
        ID: "IDE-3",
        AccountID: SGK,
        Title: "Kuis: tipe latihanmu yoga atau pilates?",
        Pillar: "Edukasi",
        Format: "Story",
        Platform: "Instagram",
        Priority: "Low",
        Status: "Baru",
        Links: "[]",
        Notes: "",
      },
      {
        ID: "IDE-4",
        AccountID: PKC,
        Title: "Tukar buku antar anggota komunitas",
        Pillar: "Community",
        Format: "Video",
        Platform: "TikTok",
        Priority: "Medium",
        Status: "Baru",
        Links: L([["Contoh video", "https://www.tiktok.com/"]]),
        Notes: "Kumpul di akhir pekan",
      },
    ],
    resources: [
      {
        ID: "RES-1",
        AccountID: SGK,
        Title: "Panduan visual Studio Gerak",
        Category: "Brand",
        Url: "https://drive.google.com/",
        Notes: "Logo, palet warna, font",
      },
      {
        ID: "RES-2",
        AccountID: PKC,
        Title: "Daftar bacaan komunitas",
        Category: "Aset",
        Url: "https://drive.google.com/",
        Notes: "",
      },
      {
        ID: "RES-3",
        AccountID: "",
        Title: "Inspirasi hook video pendek",
        Category: "Referensi",
        Url: "https://www.instagram.com/reels/",
        Notes: "Dipakai semua akun",
      },
      {
        ID: "RES-4",
        AccountID: "",
        Title: "Template caption dan CTA",
        Category: "Template",
        Url: "https://docs.google.com/",
        Notes: "",
      },
    ],
    settings: {
      AppName: "Content Planner",
      Owner: "Tim Kreatif",
      CreatorName: "Dina",
      CreatorRole: "Social Media Specialist",
    },
  };
  const K = {
    Accounts: "accounts",
    Contents: "contents",
    Campaigns: "campaigns",
    Ideas: "ideas",
    Resources: "resources",
  };
  const P2 = {
    Accounts: "ACC",
    Contents: "CNT",
    Campaigns: "CMP",
    Ideas: "IDE",
    Resources: "RES",
  };
  return {
    getAllData: () =>
      JSON.parse(
        JSON.stringify({ ...db, prefs: {}, sheetUrl: "", demo: true }),
      ),
    saveRecord: (s, r) => {
      r = { ...r };
      if (!r.ID)
        r.ID =
          P2[s] + "-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      const a = db[K[s]],
        i = a.findIndex((x) => x.ID === r.ID);
      i > -1 ? (a[i] = r) : a.push(r);
      return r;
    },
    deleteRecord: (s, id) => {
      db[K[s]] = db[K[s]].filter((x) => x.ID !== id);
      return true;
    },
    bulkUpdate: (s, ids, p) => {
      db[K[s]].forEach((x) => {
        if (ids.includes(x.ID)) Object.assign(x, p);
      });
      return ids.length;
    },
    bulkDelete: (s, ids) => {
      db[K[s]] = db[K[s]].filter((x) => !ids.includes(x.ID));
      return ids.length;
    },
    deleteAccount: (id) => {
      ["contents", "campaigns", "ideas", "resources"].forEach(
        (k) => (db[k] = db[k].filter((x) => x.AccountID !== id)),
      );
      db.accounts = db.accounts.filter((a) => a.ID !== id);
      return true;
    },
    saveSettings: (o) => {
      Object.assign(db.settings, o);
      return true;
    },
    savePrefs: () => true,
    syncMetrics: () => {
      throw new Error(
        "Sinkronisasi metrik sosial belum tersedia pada backend baru.",
      );
    },
    exportToSheet: () => {
      throw new Error(
        "Ekspor ke tab spreadsheet belum tersedia. Gunakan Download CSV.",
      );
    },
  };
})();

/* ======================= Akun ======================= */
const accById = (id) => S.data.accounts.find((a) => a.ID === id);
const accColor = (id) => (accById(id) || {}).Color || "#64748b";
const curAcc = () => (S.acc === "all" ? null : accById(S.acc));
const isAll = () => S.acc === "all";
function fixAcc() {
  const a = S.data.accounts;
  if (!a.length) return;
  if (S.acc === "all" && a.length > 1) return;
  if (!accById(S.acc)) S.acc = a[0] ? a[0].ID : "";
}
const scoped = (arr, shared) =>
  isAll()
    ? arr
    : arr.filter((x) => x.AccountID === S.acc || (shared && !x.AccountID));
const defAcc = () => (isAll() ? (S.data.accounts[0] || {}).ID || "" : S.acc);
function avatar(a, cls = "") {
  if (!a)
    return `<span class="av all ${cls}" aria-hidden="true">${ic("users", cls === "sm" ? 13 : 16)}</span>`;
  const image = String(
    a.AvatarUrl || PLATFORM_AVATARS[a.Platform] || "",
  ).trim();
  const imageSrc = logoCandidates_(image)[0];
  if (
    imageSrc &&
    (/^https:\/\//i.test(imageSrc) ||
      /^\/assets\/img\//i.test(imageSrc) ||
      /^data:image\/(?:jpeg|png|webp|gif);base64,/i.test(imageSrc))
  )
    return `<span class="av has-image ${cls}" style="--c:${esc(a.Color || "#4f46e5")}"><img src="${esc(imageSrc)}" alt="" loading="lazy"></span>`;
  return `<span class="av ${cls}" style="--c:${esc(a.Color || "#4f46e5")}">${esc(initials(a.Name))}</span>`;
}
function switchAcc(id) {
  S.acc = id;
  store.set("cp2_acc", id);
  S.picked.clear();
  closePop();
  closeSheet();
  applyPrefs();
  render();
  const a = accById(id);
  toast(a ? `Beralih ke ${a.Name}` : "Menampilkan semua akun");
}
function accMenuHTML() {
  const list = S.data.accounts;
  const cnt = (id) =>
    S.data.contents.filter(
      (c) => c.AccountID === id && c.Date >= TODAY && c.Status !== "Published",
    ).length;
  return `<div class="menu">${list.map((a) => `<button onclick="switchAcc('${a.ID}')">${avatar(a)}<span class="t">${esc(a.Name)}<span>${esc(a.Handle || a.Platform || "")} · ${cnt(a.ID)} mendatang</span></span>${S.acc === a.ID ? ic("check", 18) : ""}</button>`).join("")}
    ${list.length > 1 ? `<button onclick="switchAcc('all')">${avatar(null)}<span class="t">Semua akun<span>Gabungan ${list.length} akun</span></span>${isAll() ? ic("check", 18) : ""}</button>` : ""}
    <hr><button onclick="closePop();closeSheet();lockNow()">${ic("lock")}<span class="t">Kunci aplikasi</span></button>
    <button onclick="closePop();closeSheet();openEntity('Accounts')">${ic("plus")}<span class="t">Tambah akun</span></button>
    <button onclick="go('accounts')">${ic("users")}<span class="t">Kelola akun</span></button></div>`;
}
function openAccMenu(btn) {
  if (isMob() || !btn) {
    openSheet(
      `<div class="grab"></div><div class="sh-h"><h3>Pilih akun sosial</h3><button class="ib bare" onclick="closeSheet()" aria-label="Tutup">${ic("x")}</button></div><div class="sh-b">${accMenuHTML()}</div>`,
      "narrow",
    );
    return;
  }
  const p = $("#pop");
  if (p.classList.contains("open") && p.dataset.k === "acc") return closePop();
  const r = btn.getBoundingClientRect();
  p.innerHTML = accMenuHTML();
  p.dataset.k = "acc";
  p.style.left = "12px";
  p.style.top = "12px";
  p.classList.add("open");
  const width = p.getBoundingClientRect().width,
    height = p.getBoundingClientRect().height;
  const left = Math.max(12, Math.min(r.left, window.innerWidth - width - 12));
  const below = window.innerHeight - r.bottom - 12;
  const top = height <= below ? r.bottom + 6 : Math.max(12, r.top - height - 6);
  p.style.left = left + "px";
  p.style.top = top + "px";
}
function closePop() {
  $("#pop").classList.remove("open");
  $("#fab").classList.remove("open");
}
document.addEventListener("click", (e) => {
  if (
    !e.target.closest("#pop") &&
    !e.target.closest("#profileBtn") &&
    !e.target.closest("#fab")
  )
    closePop();
});

const navTooltip = document.createElement("div");
navTooltip.className = "nav-tooltip";
navTooltip.setAttribute("role", "tooltip");
navTooltip.setAttribute("aria-hidden", "true");
document.body.appendChild(navTooltip);
function showNavTooltip(button) {
  if (!document.querySelector("#app.nav-collapsed") || !button) return;
  navTooltip.textContent =
    button.dataset.tooltip || button.getAttribute("aria-label") || "";
  if (!navTooltip.textContent) return;
  navTooltip.classList.remove("left");
  navTooltip.classList.add("visible");
  navTooltip.setAttribute("aria-hidden", "false");
  const rect = button.getBoundingClientRect(),
    tip = navTooltip.getBoundingClientRect();
  const onRight = document.documentElement.dataset.side === "right";
  const left = onRight ? rect.left - tip.width - 9 : rect.right + 9;
  navTooltip.classList.toggle("left", onRight);
  navTooltip.style.left = `${Math.max(8, Math.min(left, innerWidth - tip.width - 8))}px`;
  navTooltip.style.top = `${Math.max(8, Math.min(rect.top + rect.height / 2 - tip.height / 2, innerHeight - tip.height - 8))}px`;
}
function hideNavTooltip() {
  navTooltip.classList.remove("visible");
  navTooltip.setAttribute("aria-hidden", "true");
}
document.addEventListener("pointerover", (e) => {
  const button = e.target.closest("#rnav .navi");
  if (button) showNavTooltip(button);
});
document.addEventListener("pointerout", (e) => {
  if (
    e.target.closest("#rnav .navi") &&
    !e.relatedTarget?.closest("#rnav .navi")
  )
    hideNavTooltip();
});
document.addEventListener("focusin", (e) => {
  const button = e.target.closest("#rnav .navi");
  if (button) showNavTooltip(button);
});
document.addEventListener("focusout", (e) => {
  if (e.target.closest("#rnav .navi")) hideNavTooltip();
});

/* ======================= Tema ======================= */
const mq = matchMedia("(prefers-color-scheme: dark)");
function applyPrefs() {
  const r = document.documentElement,
    t = THEMES[S.prefs.theme] ? S.prefs.theme : "account";
  r.dataset.theme = t;
  r.dataset.side = S.prefs.side === "left" ? "left" : "right";
  if (t === "account")
    r.style.setProperty("--ac", curAcc() ? curAcc().Color : "#4f46e5");
  else r.style.removeProperty("--ac");
  const mode =
    S.prefs.mode === "system" ? (mq.matches ? "dark" : "light") : S.prefs.mode;
  r.dataset.mode = mode;
  const ico = ic(mode === "dark" ? "sun" : "moon");
  $("#modeBtn").innerHTML = ico;
  $("#modeBtnM").innerHTML = ico;
  const m = document.querySelector("meta[name=theme-color]");
  if (m) m.content = mode === "dark" ? "#171a22" : "#ffffff";
}
mq.addEventListener?.(
  "change",
  () => S.prefs.mode === "system" && applyPrefs(),
);
function setPref(k, v) {
  S.prefs[k] = v;
  store.set("cp2_prefs", S.prefs);
  applyPrefs();
  api("savePrefs", S.prefs).catch(() => {});
  if (S.view === "settings") render();
}
function toggleMode() {
  setPref(
    "mode",
    document.documentElement.dataset.mode === "dark" ? "light" : "dark",
  );
}

/* ======================= Navigasi ======================= */
const VIEWS = {
  dashboard: ["Beranda", "home"],
  dashboardView: ["Dashboard", "dashboard"],
  content: ["Konten", "calendar"],
  campaign: ["Campaign", "flag"],
  ideas: ["Idea Bank", "bulb"],
  resources: ["Resources", "folder"],
  analytics: ["Analytics", "chart"],
  accounts: ["Akun", "users"],
  settings: ["Pengaturan", "gear"],
};
const RNAV = [
  ["Rencana", ["dashboard", "content", "campaign"]],
  ["Bahan", ["ideas", "resources"]],
  ["Laporan", ["analytics", "dashboardView", "accounts"]],
];
const BNAV = [
  ["dashboard", "Beranda"],
  ["content", "Konten"],
  ["ideas", "Ide"],
  ["more", "Menu"],
];
/* ===== LOGO =====
 Ganti gambar logo: isi LOGO_SRC di bawah ini, ATAU isi di Pengaturan > Profil > "Logo (URL gambar)".
 Boleh: link share Google Drive, URL https gambar, atau data:image/... (base64). Kosong = logo bawaan. */
const LOGO_SRC = "";
const LOGO_SVG = `<svg viewBox="0 0 40 40" width="30" height="30" aria-hidden="true"><circle cx="20" cy="22" r="14" fill="#2f7df6"/><ellipse cx="20" cy="26" rx="9" ry="9" fill="#fff"/><circle cx="15" cy="21" r="2.6" fill="#10244f"/><circle cx="25" cy="21" r="2.6" fill="#10244f"/><circle cx="14.2" cy="20" r=".9" fill="#fff"/><circle cx="24.2" cy="20" r=".9" fill="#fff"/><path d="M17 25l3 4 3-4z" fill="#ff9a1f"/><path d="M8 14q12-12 24 0" fill="none" stroke="#7a4a24" stroke-width="3" stroke-linecap="round"/></svg>`;
function logoIds_(u) {
  u = String(u || "").trim();
  if (/drive\.google\.com|docs\.google\.com/i.test(u)) {
    const m = u.match(/\/d\/([\w-]{20,})/) || u.match(/[?&]id=([\w-]{20,})/);
    return m ? m[1] : "";
  }
  const m = u.match(/^([\w-]{25,})$/);
  return m ? m[1] : "";
}
function logoCandidates_(u) {
  u = String(u || "").trim();
  if (!u) return [];
  if (/^data:image\//i.test(u)) return [u];
  if (/^\/assets\/img\/[\w.-]+\.(?:png|jpe?g|webp|gif)$/i.test(u)) return [u];
  const id = logoIds_(u);
  if (id)
    return [
      "https://lh3.googleusercontent.com/d/" + id + "=w256",
      "https://drive.google.com/thumbnail?id=" + id + "&sz=w256",
      "https://drive.google.com/uc?export=view&id=" + id,
    ];
  return /^https?:\/\//i.test(u) ? [u] : [];
}
function applyLogo() {
  const raw = ((S.data && S.data.settings) || {}).LogoUrl || LOGO_SRC;
  const cand = logoCandidates_(raw),
    key = cand.join("|");
  [$(".mark .logo"), $("#lkLogo")].forEach((el) => {
    if (!el) return;
    if (el.dataset.src === key && el.firstChild) return;
    el.dataset.src = key;
    el.classList.toggle("img", !!cand.length);
    if (!cand.length) {
      el.innerHTML = LOGO_SVG;
      return;
    }
    let i = 0;
    const im = new Image();
    im.alt = "Logo";
    im.decoding = "async";
    im.referrerPolicy = "no-referrer";
    im.onerror = () => {
      if (++i < cand.length) {
        im.src = cand[i];
        return;
      }
      el.classList.remove("img");
      el.innerHTML = LOGO_SVG;
      if (!window.__logoWarned) {
        window.__logoWarned = 1;
        console.warn("Logo gagal dimuat:", cand);
        try {
          toast(
            'Logo gagal dimuat — pastikan file gambar (PNG/JPG/SVG) dibagikan "Siapa saja yang memiliki link"',
          );
        } catch (e) {}
      }
    };
    im.src = cand[0];
    el.innerHTML = "";
    el.appendChild(im);
  });
}
function chrome() {
  $("#icPromo").innerHTML = ic("sheet", 22);
  $("#bellBtn").innerHTML =
    ic("bell", 20) + '<i class="bdot" id="bellDot"></i>';
  $("#icNew").innerHTML = ic("plus", 18);
  $("#refBtn").innerHTML = ic("refresh");
  $("#expBtnM").innerHTML = ic("sheet");
  $("#fab").innerHTML = ic("plus", 26);
  $("#expBtnD").innerHTML = ic("sheet", 18);
  $("#topSetBtn").innerHTML = ic("gear", 18);
  applyLogo();
  $("#bnav").innerHTML = BNAV.map(
    ([v, l]) =>
      `${v === "ideas" ? '<i class="bsp"></i>' : ""}<button data-v="${v}" onclick="${v === "more" ? "openMore()" : `go('${v}')`}"><span class="pi">${ic(v === "more" ? "more" : VIEWS[v][1], 22)}</span>${l}</button>`,
  ).join("");
}
function go(v) {
  S.view = v;
  store.set("cp2_view", v);
  S.picked.clear();
  closeSheet();
  closePop();
  render();
  $("#view").scrollTop = 0;
}

/* ======================= Data helpers ======================= */
const sortDT = (a, b) =>
  (a.Date + (a.Time || "")).localeCompare(b.Date + (b.Time || ""));
function groupBy(arr, k) {
  const o = {};
  arr.forEach((x) => (o[x[k]] = o[x[k]] || []).push(x));
  Object.values(o).forEach((a) => a.sort(sortDT));
  return o;
}
function upsert(arr, r) {
  const i = arr.findIndex((x) => x.ID === r.ID);
  i > -1 ? (arr[i] = r) : arr.push(r);
}
const inMonth = (arr, m = S.month) => {
  const [a, b] = monthRange(m);
  return arr.filter((c) => c.Date >= a && c.Date <= b);
};
const overdue = (c) => c.Date < TODAY && c.Status !== "Published";
function filtered() {
  const q = S.f.q.trim().toLowerCase();
  return scoped(S.data.contents).filter(
    (c) =>
      (!S.f.platform || c.Platform === S.f.platform) &&
      (!S.f.status || c.Status === S.f.status) &&
      (!S.f.format || c.Format === S.f.format) &&
      (!q ||
        [c.Title, c.Pillar, c.Campaign, c.Caption, c.Hashtags]
          .join(" ")
          .toLowerCase()
          .includes(q)),
  );
}
function progress(c) {
  const l = pj(c.Checklist, []);
  return [l.filter((x) => x.d).length, l.length];
}
function progHTML(c) {
  const [d, t] = progress(c);
  if (!t) return "";
  return `<span class="prog ${d === t ? "full" : ""}" title="Checklist produksi"><span class="bar"><i style="width:${(d / t) * 100}%"></i></span>${d}/${t}</span>`;
}
function setF(k, v) {
  S.f[k] = v;
  S.picked.clear();
  render();
}
const opts = (arr, sel, all) =>
  (all != null ? `<option value="">${all}</option>` : "") +
  arr
    .map((o) => `<option ${o === sel ? "selected" : ""}>${esc(o)}</option>`)
    .join("");

/* ======================= Render ======================= */
function render() {
  fixAcc();
  if (!VIEWS[S.view]) S.view = "content";
  const v = S.view,
    a = curAcc(),
    st = S.data.settings || {};
  $("#appName").textContent = st.AppName || "Content Planner";
  $("#ownerLbl").textContent = "by " + (st.Owner || "Tim Kreatif");
  const accHTML = avatar(a, "sm");
  $("#profileBtn").innerHTML = accHTML;
  $("#profileBtn").title = a
    ? `${a.Name} · ${a.Platform || "Akun sosial"}`
    : "Pilih akun sosial";
  $("#profileBtn").setAttribute(
    "aria-label",
    a ? `Akun sosial: ${a.Name}, ${a.Platform || ""}` : "Pilih akun sosial",
  );
  $("#tTitle").textContent = VIEWS[v][0];
  $("#tSub").innerHTML = a
    ? `<i class="adot" style="--c:${esc(a.Color)}"></i>${esc(a.Name)} <span class="muted">${esc(a.Handle || "")}</span>`
    : `<i class="adot" style="--c:var(--ink3)"></i>Semua akun`;
  $("#tSub").style.display = "none";
  renderNotesW();
  const up = scoped(S.data.contents).filter(
    (c) => c.Date >= TODAY && c.Status !== "Published",
  ).length;
  const counts = { content: up, ideas: scoped(S.data.ideas).length };
  $("#rnav").innerHTML = RNAV.map(([g, items]) =>
    items
      .map((k) => {
        const label = VIEWS[k][0],
          icon = VIEWS[k][1];
        return `<button class="navi ${k === v ? "active" : ""}" onclick="go('${k}')" aria-label="${label}" data-tooltip="${label}">${ic(icon)}<span>${label}</span>${counts[k] ? `<span class="cnt">${counts[k]}</span>` : ""}</button>`;
      })
      .join(""),
  ).join("");
  $("#hchips").replaceChildren();
  $("#bellDot").style.display = scoped(S.data.contents).some(overdue)
    ? "block"
    : "none";
  $$("#bnav button").forEach((b) =>
    b.classList.toggle(
      "active",
      b.dataset.v === v ||
        (b.dataset.v === "more" &&
          [
            "dashboardView",
            "campaign",
            "resources",
            "accounts",
            "settings",
          ].includes(v)),
    ),
  );
  applyLogo();
  const keepSocialDashboard =
    S.ready && v === "dashboardView" && $("#socialDashboardRoot");
  const showWait = !S.ready || (S.loading && v !== "dashboardView");
  if (!keepSocialDashboard) {
    if (window.SocialDashboard) window.SocialDashboard.destroy();
    $("#view").innerHTML = showWait
      ? vWait()
      : {
          dashboard: vDash,
          dashboardView: () => '<div id="socialDashboardRoot"></div>',
          content: vContent,
          campaign: vCampaign,
          ideas: vIdeas,
          resources: vResources,
          analytics: vAnalytics,
          accounts: vAccounts,
          settings: vSettings,
        }[v]();
    if (S.ready && v === "dashboardView")
      window.SocialDashboard?.mount($("#socialDashboardRoot"), api);
  }
  if (v === "content" && S.cmode === "calendar" && !isMob()) bindDnD();
}
