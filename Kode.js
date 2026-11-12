/**
 * ============================================================
 *  CONTENT PLANNER v2.3
 *  Backend Google Apps Script (Code.gs)
 * ------------------------------------------------------------
 *  Baru v2.3 (loading cepat):
 *  • Hasil getAllData disimpan di CacheService (dibaca ulang < 1 detik), otomatis dihapus tiap ada perubahan data
 *  • saveRecord tidak lagi memanggil setNumberFormat berkali-kali
 *  • Opsional: jalankan aktifkanPemanasan() sekali agar server tidak "tidur" (tidak ada cold start)
 *  • Kode akses & catatan disimpan di sheet Settings (key AccessHash dan Notes) — tidak perlu diubah manual
 *
 *  Perbaikan v2.1 (anti loading terus):
 *  • Setup berat hanya dijalankan SEKALI (ditandai SETUP_VER di Script Properties)
 *  • Spreadsheet di-cache per eksekusi (tidak dibuka berulang)
 *  • getAllData membaca semua sheet dengan 1 koneksi & mengembalikan error jelas
 *  • doGet tidak lagi menjalankan setup berat setiap dibuka
 *  • Ada fungsi diagnose() untuk cek masalah dari editor Apps Script
 *
 *  Cara pakai:
 *  1. Tempel file ini ke Code.gs (timpa yang lama), file HTML tetap "index"
 *  2. Jalankan setup() sekali → izinkan akses
 *  3. Deploy → Manage deployments → Edit (ikon pensil) → Version: New version → Deploy
 *     (WAJIB buat versi baru, kalau tidak web app tetap memakai kode lama)
 * ============================================================
 */

const APP_NAME = 'Content Planner';
const HEADER_BG = '#1f2433';
const SETUP_VER = 'v2.1';   // ganti nilainya kalau ingin memaksa setup ulang

const SCHEMA = {
  Accounts: ['ID', 'Name', 'Handle', 'Platform', 'Color', 'TargetPerWeek', 'Notes'],
  Contents: ['ID', 'AccountID', 'Date', 'Time', 'Title', 'Platform', 'Format', 'Status', 'Campaign', 'Pillar',
             'Caption', 'Hashtags', 'Checklist', 'Links', 'PostLink', 'ResultLink',
             'Reach', 'Likes', 'Comments', 'Shares', 'Saves', 'Notes', 'UpdatedAt'],
  Campaigns: ['ID', 'AccountID', 'Name', 'StartDate', 'EndDate', 'Goal', 'Color', 'Status', 'Notes'],
  Ideas: ['ID', 'AccountID', 'Title', 'Pillar', 'Format', 'Platform', 'Priority', 'Status', 'Links', 'Notes', 'CreatedAt'],
  Resources: ['ID', 'AccountID', 'Title', 'Category', 'Url', 'Notes'],
  Settings: ['Key', 'Value']
};
const DATA_SHEETS = ['Contents', 'Campaigns', 'Ideas', 'Resources'];
const TEXT_COLS = ['Date', 'Time', 'StartDate', 'EndDate', 'CreatedAt', 'UpdatedAt', 'Handle'];
const ID_PREFIX = { Accounts: 'ACC', Contents: 'CNT', Campaigns: 'CMP', Ideas: 'IDE', Resources: 'RES' };

const LISTS = {
  Platform: ['Instagram', 'TikTok', 'YouTube', 'Facebook', 'X / Twitter', 'LinkedIn'],
  Format: ['Feed', 'Reels', 'Carousel', 'Story', 'Video'],
  Status: ['Idea', 'Draft', 'Content done', 'Scheduled', 'Published'],
  CampaignStatus: ['Planning', 'Active', 'Done'],
  Priority: ['Low', 'Medium', 'High'],
  IdeaStatus: ['Baru', 'Riset', 'Siap dibuat']
};
const STEPS = ['Brief', 'Script', 'Produksi', 'Editing', 'Caption', 'Approval'];

let _SS = null; // cache spreadsheet selama 1 eksekusi

/* ============================ WEB APP ============================ */

function doGet() {
  // Setup tidak dijalankan di sini; getAllData() sudah memanggil ensureSetup_().
  // Jadi halaman langsung tampil dan error (kalau ada) muncul di layar, bukan spinner.
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle(APP_NAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover')
    .addMetaTag('mobile-web-app-capable', 'yes')
    .addMetaTag('apple-mobile-web-app-capable', 'yes')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('📅 Content Planner')
    .addItem('⚙️ Setup database', 'setupDatabase')
    .addItem('🔄 Reset ke data contoh', 'resetSampleData')
    .addSeparator()
    .addItem('📤 Export bulan ini (semua akun)', 'menuExportThisMonth')
    .addItem('🩺 Diagnosa', 'diagnose')
    .addItem('🌐 Cara membuka Web App', 'showWebAppHelp')
    .addToUi();
}

/* ============================ SETUP & MIGRASI ============================ */

/** Jalankan manual: paksa setup ulang lalu tandai selesai */
function setup() { return setupDatabase(); }

/**
 * SETUP DATABASE — jalankan sekali dari editor Apps Script (pilih setupDatabase → Run).
 * Membuat semua sheet + header (Accounts, Contents, Campaigns, Ideas, Resources, Settings),
 * validasi dropdown, warna status, data contoh (jika masih kosong), lalu mengosongkan cache.
 * Aman dijalankan berulang: data yang sudah ada tidak dihapus.
 * Kode akses awal aplikasi adalah admin123 (bisa diganti di Pengaturan aplikasi).
 */
function setupDatabase() {
  setup_();
  PropertiesService.getScriptProperties().setProperty('SETUP_VER', SETUP_VER);
  cacheClear_();
  const ss = getSS_();
  const lines = Object.keys(SCHEMA).map(n => {
    const sh = ss.getSheetByName(n);
    return '• ' + n + ': ' + Math.max((sh ? sh.getLastRow() : 1) - 1, 0) + ' baris';
  });
  const msg = 'Database siap ✅\n' + lines.join('\n') + '\nSpreadsheet: ' + ss.getUrl();
  Logger.log(msg);
  try { SpreadsheetApp.getActive().toast('Database siap ✅', APP_NAME, 5); } catch (e) {}
  return msg;
}

/** Cepat: kalau sudah pernah setup versi ini, langsung selesai. */
function ensureSetup_() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('SETUP_VER') === SETUP_VER) {
    // cek ringan: semua sheet masih ada?
    const ss = getSS_();
    const ok = Object.keys(SCHEMA).every(n => ss.getSheetByName(n));
    if (ok) return;
  }
  setup_();
  props.setProperty('SETUP_VER', SETUP_VER);
}

function getSS_() {
  if (_SS) return _SS;
  let ss = null;
  try { ss = SpreadsheetApp.getActiveSpreadsheet(); } catch (e) {}
  if (!ss) {
    const props = PropertiesService.getScriptProperties();
    const id = props.getProperty('SS_ID');
    if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) {} }
    if (!ss) {
      ss = SpreadsheetApp.create(APP_NAME + ' — Database');
      props.setProperty('SS_ID', ss.getId());
    }
  }
  _SS = ss;
  return ss;
}

function headersOf_(sh) {
  if (sh.getLastColumn() < 1) return [];
  return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String).filter(h => h !== '');
}

/** Tambahkan kolom yang belum ada tanpa menghapus data lama */
function ensureHeaders_(sh, wanted) {
  let cur = headersOf_(sh);
  if (!cur.length) {
    if (sh.getMaxColumns() < wanted.length) sh.insertColumnsAfter(sh.getMaxColumns(), wanted.length - sh.getMaxColumns());
    sh.getRange(1, 1, 1, wanted.length).setValues([wanted]);
    return wanted.slice();
  }
  const missing = wanted.filter(h => cur.indexOf(h) < 0);
  if (missing.length) {
    const need = cur.length + missing.length - sh.getMaxColumns();
    if (need > 0) sh.insertColumnsAfter(sh.getMaxColumns(), need);
    sh.getRange(1, cur.length + 1, 1, missing.length).setValues([missing]);
    cur = cur.concat(missing);
  }
  return cur;
}

function setup_() {
  const ss = getSS_();
  Object.keys(SCHEMA).forEach(name => {
    const sh = ss.getSheetByName(name) || ss.insertSheet(name);
    const headers = ensureHeaders_(sh, SCHEMA[name]);
    sh.getRange(1, 1, 1, headers.length).setBackground(HEADER_BG).setFontColor('#ffffff')
      .setFontWeight('bold').setVerticalAlignment('middle');
    sh.setRowHeight(1, 30);
    sh.setFrozenRows(1);
    const rowsN = Math.max(sh.getMaxRows() - 1, 1);
    headers.forEach((h, i) => {
      if (TEXT_COLS.indexOf(h) > -1) sh.getRange(2, i + 1, rowsN, 1).setNumberFormat('@');
      const w = /Title|Name|Caption|Notes|Goal|Link|Url|Hashtags|Checklist/.test(h) ? 240 : (h === 'ID' || h === 'AccountID' ? 110 : 115);
      sh.setColumnWidth(i + 1, w);
    });
  });

  const acc = ss.getSheetByName('Accounts');
  const contents = ss.getSheetByName('Contents');
  if (acc.getLastRow() < 2) {
    if (contents.getLastRow() > 1) {
      writeObjs_(acc, [{ ID: 'ACC-MAIN', Name: 'Akun Utama', Handle: '@akunutama', Platform: 'Instagram', Color: '#4f46e5', TargetPerWeek: 5 }]);
    } else {
      seedSample_(ss);
    }
  }
  migrateAccountIds_(ss);
  applyValidation_(ss);
  applyStatusColors_(ss.getSheetByName('Contents'));
  seedSettings_(ss);

  const def = ss.getSheetByName('Sheet1') || ss.getSheetByName('Sheet 1');
  if (def && def.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(def);
}

function migrateAccountIds_(ss) {
  const accs = readSheet_('Accounts');
  if (!accs.length) return;
  const first = accs[0].ID;
  ['Contents', 'Campaigns', 'Ideas'].forEach(n => {
    const sh = ss.getSheetByName(n);
    if (sh.getLastRow() < 2) return;
    const col = headersOf_(sh).indexOf('AccountID') + 1;
    if (col < 1) return;
    const rg = sh.getRange(2, col, sh.getLastRow() - 1, 1);
    const vals = rg.getValues();
    let changed = false;
    vals.forEach(r => { if (!r[0]) { r[0] = first; changed = true; } });
    if (changed) rg.setValues(vals);
  });
}

function applyValidation_(ss) {
  const rule = list => SpreadsheetApp.newDataValidation().requireValueInList(list, true).setAllowInvalid(true).build();
  const set = (sheet, header, list) => {
    const sh = ss.getSheetByName(sheet);
    const c = headersOf_(sh).indexOf(header) + 1;
    if (c > 0) sh.getRange(2, c, Math.max(sh.getMaxRows() - 1, 1), 1).setDataValidation(rule(list));
  };
  set('Contents', 'Platform', LISTS.Platform);
  set('Contents', 'Format', LISTS.Format);
  set('Contents', 'Status', LISTS.Status);
  set('Campaigns', 'Status', LISTS.CampaignStatus);
  set('Ideas', 'Priority', LISTS.Priority);
  set('Ideas', 'Status', LISTS.IdeaStatus);
  set('Ideas', 'Format', LISTS.Format);
  set('Accounts', 'Platform', LISTS.Platform);
}

function applyStatusColors_(sh, statusCol) {
  const c = statusCol || headersOf_(sh).indexOf('Status') + 1;
  if (c < 1) return;
  const range = sh.getRange(2, c, Math.max(sh.getMaxRows() - 1, 1), 1);
  const colors = {
    'Published': ['#dcfce7', '#166534'], 'Content done': ['#ccfbf1', '#115e59'],
    'Scheduled': ['#dbeafe', '#1e40af'], 'Draft': ['#f1f5f9', '#475569'], 'Idea': ['#fef3c7', '#92400e']
  };
  const keep = sh.getConditionalFormatRules().filter(r => !r.getRanges().some(rg => rg.getColumn() === c));
  const rules = Object.keys(colors).map(s => SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(s)
    .setBackground(colors[s][0]).setFontColor(colors[s][1]).setRanges([range]).build());
  sh.setConditionalFormatRules(keep.concat(rules));
}

function seedSettings_(ss) {
  const sh = ss.getSheetByName('Settings');
  if (sh.getLastRow() > 1) return;
  sh.getRange(2, 1, 4, 2).setValues([
    ['AppName', APP_NAME], ['Owner', 'Tim Kreatif'], ['CreatorName', 'Dina'], ['CreatorRole', 'Social Media Specialist']
  ]);
}

function resetSampleData() {
  const ss = getSS_();
  ['Accounts'].concat(DATA_SHEETS).forEach(n => {
    const sh = ss.getSheetByName(n);
    if (sh && sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).clearContent();
  });
  seedSample_(ss);
  try { SpreadsheetApp.getActive().toast('Data contoh dibuat ulang', APP_NAME, 4); } catch (e) {}
}

/** Jalankan dari editor Apps Script → lihat hasilnya di Execution log */
function diagnose() {
  const t0 = Date.now();
  const out = [];
  try {
    const ss = getSS_();
    out.push('Spreadsheet: ' + ss.getName() + ' | ' + ss.getUrl());
    Object.keys(SCHEMA).forEach(n => {
      const sh = ss.getSheetByName(n);
      if (!sh) { out.push('❌ Sheet hilang: ' + n); return; }
      const h = headersOf_(sh);
      const miss = SCHEMA[n].filter(x => h.indexOf(x) < 0);
      out.push((miss.length ? '⚠️ ' : '✅ ') + n + ' | baris data: ' + Math.max(sh.getLastRow() - 1, 0) +
        (miss.length ? ' | kolom kurang: ' + miss.join(', ') : ''));
    });
    out.push('SETUP_VER tersimpan: ' + PropertiesService.getScriptProperties().getProperty('SETUP_VER'));
    const d = getAllData();
    out.push('getAllData OK → akun ' + d.accounts.length + ', konten ' + d.contents.length +
      ', ukuran ' + JSON.stringify(d).length + ' karakter');
  } catch (e) {
    out.push('❌ ERROR: ' + (e && e.message || e));
  }
  out.push('Waktu: ' + (Date.now() - t0) + ' ms');
  Logger.log(out.join('\n'));
  try { SpreadsheetApp.getActive().toast(out.join(' | ').slice(0, 300), 'Diagnosa', 10); } catch (e) {}
  return out.join('\n');
}

/* ============================ DATA CONTOH ============================ */

function seedSample_(ss) {
  const tz = Session.getScriptTimeZone();
  const now = new Date(), y = now.getFullYear(), m = now.getMonth();
  const d = day => Utilities.formatDate(new Date(y, m, day), tz, 'yyyy-MM-dd');
  const stamp = Utilities.formatDate(now, tz, 'yyyy-MM-dd HH:mm');
  const SGK = 'ACC-SGK', PKC = 'ACC-PKC';
  const checklist = st => JSON.stringify(STEPS.map((t, i) => ({
    t: t, d: st === 'Published' || (st === 'Content done' && i < 5) || (st === 'Draft' && i < 2) || (st === 'Scheduled')
  })));

  writeObjs_(ss.getSheetByName('Accounts'), [
    { ID: SGK, Name: 'Studio Gerak', Handle: '@studiogerak.id', Platform: 'Instagram', Color: '#0ea5e9', TargetPerWeek: 4, Notes: 'Studio yoga dan pilates: kelas, tips, komunitas' },
    { ID: PKC, Name: 'Pustaka Kecil', Handle: '@pustakakecil', Platform: 'TikTok', Color: '#7c3aed', TargetPerWeek: 3, Notes: 'Komunitas baca dan review buku' }
  ]);

  // [akun, tanggal, jam, judul, format, status, pillar, campaign]
  const rows = [
    [SGK, 1, '06:30', 'Selamat datang di Studio Gerak: intip ruang kelasnya', 'Feed', 'Published', 'Branding', 'Kelas Perdana Pilates'],
    [SGK, 3, '18:00', 'Pilates pemula: 5 gerakan dasar yang wajib kamu tahu', 'Carousel', 'Published', 'Edukasi', 'Kelas Perdana Pilates'],
    [SGK, 5, '07:00', 'Ikut kelas perdana, begini rasanya', 'Reels', 'Published', 'Testimoni', 'Kelas Perdana Pilates'],
    [SGK, 8, '12:00', 'Jadwal kelas minggu ini', 'Story', 'Published', 'Info', ''],
    [SGK, 10, '06:30', 'Stretching 5 menit sebelum tidur', 'Reels', 'Published', 'Tips', ''],
    [SGK, 13, '17:00', 'Kenalan sama instruktur: Coach Maya', 'Feed', 'Published', 'Community', 'Kelas Perdana Pilates'],
    [SGK, 16, '06:30', 'Mulai! Challenge 21 Hari Gerak', 'Reels', 'Published', 'Promo', 'Challenge 21 Hari Gerak'],
    [SGK, 19, '18:00', 'Checklist harian challenge hari 1-7', 'Carousel', 'Published', 'Edukasi', 'Challenge 21 Hari Gerak'],
    [SGK, 22, '07:00', 'Peserta challenge cerita: minggu pertama', 'Story', 'Content done', 'Testimoni', 'Challenge 21 Hari Gerak'],
    [SGK, 24, '12:00', 'Yoga vs pilates: pilih yang mana?', 'Carousel', 'Scheduled', 'Edukasi', ''],
    [SGK, 26, '06:30', 'Gerakan ringan buat yang kerja duduk seharian', 'Reels', 'Content done', 'Tips', 'Challenge 21 Hari Gerak'],
    [SGK, 28, '17:00', 'Progres peserta di tengah challenge', 'Feed', 'Draft', 'Community', 'Challenge 21 Hari Gerak'],
    [SGK, 30, '18:00', 'Promo member baru bulan depan', 'Feed', 'Idea', 'Promo', ''],
    [PKC, 2, '20:00', 'Buku yang bikin aku lupa waktu', 'Video', 'Published', 'Review', 'Baca 12 Buku Setahun'],
    [PKC, 6, '20:00', 'Rak buku baru: tur singkat', 'Video', 'Published', 'Lifestyle', ''],
    [PKC, 10, '20:00', '3 novel pendek buat pembaca pemula', 'Video', 'Published', 'Rekomendasi', 'Baca 12 Buku Setahun'],
    [PKC, 14, '20:00', 'Cara baca 20 halaman sehari tanpa paksaan', 'Video', 'Published', 'Tips', 'Baca 12 Buku Setahun'],
    [PKC, 18, '20:00', 'Plot twist yang bikin aku teriak', 'Video', 'Published', 'Review', ''],
    [PKC, 21, '20:00', 'Book haul dari bazar buku murah', 'Video', 'Content done', 'Hiburan', ''],
    [PKC, 25, '20:00', 'Ending buku favorit: setuju atau enggak?', 'Video', 'Scheduled', 'Diskusi', 'Baca 12 Buku Setahun'],
    [PKC, 29, '20:00', 'Tag temanmu yang suka pinjam buku tapi gak balikin', 'Video', 'Draft', 'Hiburan', '']
  ];
  writeObjs_(ss.getSheetByName('Contents'), rows.map((r, i) => {
    const pub = r[5] === 'Published', reach = pub ? 700 + ((i * 283) % 2100) : '';
    const tk = r[0] === PKC;
    return {
      ID: 'CNT-' + String(i + 1).padStart(4, '0'), AccountID: r[0], Date: d(r[1]), Time: r[2], Title: r[3],
      Platform: tk ? 'TikTok' : 'Instagram', Format: r[4], Status: r[5], Campaign: r[7], Pillar: r[6],
      Caption: '', Hashtags: tk ? '#pustakakecil #bukutok' : '#studiogerak #pilatesindonesia', Checklist: checklist(r[5]), Links: '[]',
      PostLink: pub ? (tk ? 'https://www.tiktok.com/' : 'https://www.instagram.com/') : '', ResultLink: r[5] === 'Content done' ? 'https://drive.google.com/' : '',
      Reach: reach, Likes: pub ? Math.round(reach * 0.08 + i * 2) : '', Comments: pub ? Math.round(reach * 0.01) + i % 5 : '',
      Shares: pub ? (i * 3) % 17 + 4 : '', Saves: pub ? Math.round(reach * 0.03) + i % 6 : '', Notes: '', UpdatedAt: stamp
    };
  }));

  writeObjs_(ss.getSheetByName('Campaigns'), [
    { ID: 'CMP-0001', AccountID: SGK, Name: 'Kelas Perdana Pilates', StartDate: d(1), EndDate: d(14), Goal: 'Isi 40 slot kelas perdana', Color: '#0ea5e9', Status: 'Done' },
    { ID: 'CMP-0002', AccountID: SGK, Name: 'Challenge 21 Hari Gerak', StartDate: d(16), EndDate: d(30), Goal: 'Ajak 100 peserta ikut challenge', Color: '#f97316', Status: 'Active' },
    { ID: 'CMP-0003', AccountID: PKC, Name: 'Baca 12 Buku Setahun', StartDate: d(1), EndDate: d(30), Goal: 'Bangun komunitas baca 1.500 anggota', Color: '#7c3aed', Status: 'Active' }
  ]);

  const L = arr => JSON.stringify(arr.map(a => ({ label: a[0], url: a[1] })));
  writeObjs_(ss.getSheetByName('Ideas'), [
    { ID: 'IDE-0001', AccountID: SGK, Title: 'Tur 60 detik: satu hari di Studio Gerak', Pillar: 'Behind the scene', Format: 'Reels', Platform: 'Instagram', Priority: 'High', Status: 'Siap dibuat', Links: L([['Referensi Reels', 'https://www.instagram.com/reels/']]), Notes: 'Buka dengan suara kelas pagi', CreatedAt: stamp },
    { ID: 'IDE-0002', AccountID: PKC, Title: 'Audiobook vs buku cetak: mana yang lebih masuk?', Pillar: 'Diskusi', Format: 'Video', Platform: 'TikTok', Priority: 'Medium', Status: 'Riset', Links: L([['Artikel sumber', 'https://www.google.com/search?q=audiobook+vs+buku+cetak']]), Notes: 'Minta pendapat di kolom komentar', CreatedAt: stamp },
    { ID: 'IDE-0003', AccountID: SGK, Title: 'Kuis: tipe latihanmu yoga atau pilates?', Pillar: 'Edukasi', Format: 'Story', Platform: 'Instagram', Priority: 'Low', Status: 'Baru', Links: '[]', Notes: '', CreatedAt: stamp },
    { ID: 'IDE-0004', AccountID: PKC, Title: 'Tukar buku antar anggota komunitas', Pillar: 'Community', Format: 'Video', Platform: 'TikTok', Priority: 'Medium', Status: 'Baru', Links: L([['Contoh video', 'https://www.tiktok.com/']]), Notes: 'Kumpul di akhir pekan', CreatedAt: stamp }
  ]);

  writeObjs_(ss.getSheetByName('Resources'), [
    { ID: 'RES-0001', AccountID: SGK, Title: 'Panduan visual Studio Gerak', Category: 'Brand', Url: 'https://drive.google.com/', Notes: 'Logo, palet warna, font' },
    { ID: 'RES-0002', AccountID: PKC, Title: 'Daftar bacaan komunitas', Category: 'Aset', Url: 'https://drive.google.com/', Notes: '' },
    { ID: 'RES-0003', AccountID: '', Title: 'Inspirasi hook video pendek', Category: 'Referensi', Url: 'https://www.instagram.com/reels/', Notes: 'Dipakai semua akun' },
    { ID: 'RES-0004', AccountID: '', Title: 'Template caption dan CTA', Category: 'Template', Url: 'https://docs.google.com/', Notes: '' }
  ]);
}

function writeObjs_(sh, objs) {
  if (!objs.length) return;
  const headers = headersOf_(sh);
  const rows = objs.map(o => headers.map(h => o[h] === undefined ? '' : o[h]));
  const start = sh.getLastRow() + 1;
  headers.forEach((h, i) => {
    if (TEXT_COLS.indexOf(h) > -1) sh.getRange(start, i + 1, rows.length, 1).setNumberFormat('@');
  });
  sh.getRange(start, 1, rows.length, headers.length).setValues(rows);
}

/* ============================ BACA / TULIS ============================ */

function readSheet_(name) {
  const sh = getSS_().getSheetByName(name);
  if (!sh || sh.getLastRow() < 2) return [];
  const tz = Session.getScriptTimeZone();
  const headers = headersOf_(sh);
  if (!headers.length) return [];
  const values = sh.getRange(2, 1, sh.getLastRow() - 1, headers.length).getValues();
  return values.filter(r => r[0] !== '' && r[0] !== null).map(r => {
    const o = {};
    headers.forEach((h, i) => {
      let v = r[i];
      if (v instanceof Date) {
        v = h === 'Time' ? Utilities.formatDate(v, tz, 'HH:mm')
          : /At$/.test(h) ? Utilities.formatDate(v, tz, 'yyyy-MM-dd HH:mm')
          : Utilities.formatDate(v, tz, 'yyyy-MM-dd');
      } else if (typeof v === 'number' && !isFinite(v)) {
        v = '';
      }
      o[h] = v;
    });
    return o;
  });
}

/* ---------- Cache (supaya buka aplikasi cepat) ---------- */
const CACHE_KEY = 'cp_all_v1';
const CACHE_CHUNK = 30000;      // karakter per potongan (batas CacheService 100KB per kunci)
const CACHE_TTL = 21600;        // 6 jam; otomatis dihapus saat ada perubahan data

function cacheGet_() {
  try {
    const c = CacheService.getScriptCache();
    const n = Number(c.get(CACHE_KEY + ':n') || 0);
    if (!n) return null;
    const keys = [];
    for (let i = 0; i < n; i++) keys.push(CACHE_KEY + ':' + i);
    const got = c.getAll(keys);
    let s = '';
    for (let i = 0; i < n; i++) {
      const p = got[CACHE_KEY + ':' + i];
      if (p === undefined || p === null) return null;
      s += p;
    }
    return JSON.parse(s);
  } catch (e) { return null; }
}

function cachePut_(obj) {
  try {
    const s = JSON.stringify(obj);
    const parts = [];
    for (let i = 0; i < s.length; i += CACHE_CHUNK) parts.push(s.slice(i, i + CACHE_CHUNK));
    const m = {};
    parts.forEach((p, i) => m[CACHE_KEY + ':' + i] = p);
    m[CACHE_KEY + ':n'] = String(parts.length);
    CacheService.getScriptCache().putAll(m, CACHE_TTL);
  } catch (e) {}
}

function cacheClear_() {
  try {
    const c = CacheService.getScriptCache();
    const n = Number(c.get(CACHE_KEY + ':n') || 0);
    const keys = [CACHE_KEY + ':n'];
    for (let i = 0; i < n; i++) keys.push(CACHE_KEY + ':' + i);
    c.removeAll(keys);
  } catch (e) {}
}

function getAllData() {
  try {
    let d = cacheGet_();
    if (!d) {
      ensureSetup_();           // cepat setelah setup pertama
      const settings = {};
      readSheet_('Settings').forEach(r => settings[r.Key] = r.Value);
      d = {
        accounts: readSheet_('Accounts'),
        contents: readSheet_('Contents'),
        campaigns: readSheet_('Campaigns'),
        ideas: readSheet_('Ideas'),
        resources: readSheet_('Resources'),
        settings: settings, sheetUrl: getSS_().getUrl()
      };
      cachePut_(d);
    }
    let prefs = {};
    try { prefs = JSON.parse(PropertiesService.getUserProperties().getProperty('prefs') || '{}'); } catch (e) {}
    d.prefs = prefs;
    return d;
  } catch (e) {
    throw new Error('getAllData gagal: ' + (e && e.message || e));
  }
}

/** OPSIONAL: jalankan sekali dari editor. Memanaskan server tiap 5 menit supaya tidak ada cold start. */
function aktifkanPemanasan() {
  matikanPemanasan();
  ScriptApp.newTrigger('keepWarm_').timeBased().everyMinutes(5).create();
  Logger.log('Pemanasan aktif (tiap 5 menit).');
}
function matikanPemanasan() {
  ScriptApp.getProjectTriggers().forEach(t => { if (t.getHandlerFunction() === 'keepWarm_') ScriptApp.deleteTrigger(t); });
}
function keepWarm_() { try { getAllData(); } catch (e) {} }

function withLock_(fn) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try { const r = fn(); cacheClear_(); return r; } finally { lock.releaseLock(); }
}

function saveRecord(sheetName, rec) {
  if (!ID_PREFIX[sheetName]) throw new Error('Sheet tidak dikenal: ' + sheetName);
  return withLock_(() => {
    const sh = getSS_().getSheetByName(sheetName);
    const headers = headersOf_(sh);
    const tz = Session.getScriptTimeZone();
    const stamp = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm');
    rec = Object.assign({}, rec);
    const isNew = !rec.ID;
    if (isNew) rec.ID = ID_PREFIX[sheetName] + '-' + Utilities.getUuid().slice(0, 8).toUpperCase();
    if (sheetName === 'Contents') rec.UpdatedAt = stamp;
    if (sheetName === 'Ideas' && !rec.CreatedAt) rec.CreatedAt = stamp;

    const row = headers.map(h => {
      const v = rec[h];
      if (v === undefined || v === null) return '';
      return typeof v === 'object' ? JSON.stringify(v) : v;
    });
    let rowIndex = findRow_(sh, rec.ID);
    if (rowIndex === -1) rowIndex = sh.getLastRow() + 1;
    if (rowIndex > sh.getLastRow()) {   // baris baru: atur format teks sekali jalan (bukan per kolom)
      sh.getRange(rowIndex, 1, 1, headers.length)
        .setNumberFormats([headers.map(h => TEXT_COLS.indexOf(h) > -1 ? '@' : 'General')]);
    }
    sh.getRange(rowIndex, 1, 1, headers.length).setValues([row]);
    return rec;
  });
}

function findRow_(sh, id) {
  if (!id || sh.getLastRow() < 2) return -1;
  const ids = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map(r => String(r[0]));
  const i = ids.indexOf(String(id));
  return i > -1 ? i + 2 : -1;
}

function deleteRecord(sheetName, id) {
  return bulkDelete(sheetName, [id]) > 0;
}

/** Ubah banyak baris sekaligus, mis. bulkUpdate('Contents', ['CNT-1','CNT-2'], {Status:'Published'}) */
function bulkUpdate(sheetName, ids, patch) {
  if (!ID_PREFIX[sheetName]) throw new Error('Sheet tidak dikenal');
  return withLock_(() => {
    const sh = getSS_().getSheetByName(sheetName);
    if (sh.getLastRow() < 2) return 0;
    const headers = headersOf_(sh);
    const rg = sh.getRange(2, 1, sh.getLastRow() - 1, headers.length);
    const data = rg.getValues();
    const set = {}; ids.forEach(i => set[String(i)] = 1);
    const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm');
    let n = 0;
    data.forEach(r => {
      if (!set[String(r[0])]) return;
      Object.keys(patch).forEach(k => { const c = headers.indexOf(k); if (c > -1) r[c] = patch[k]; });
      const u = headers.indexOf('UpdatedAt'); if (u > -1) r[u] = stamp;
      n++;
    });
    rg.setValues(data);
    return n;
  });
}

function bulkDelete(sheetName, ids) {
  if (!ID_PREFIX[sheetName]) throw new Error('Sheet tidak dikenal');
  return withLock_(() => {
    const sh = getSS_().getSheetByName(sheetName);
    if (sh.getLastRow() < 2) return 0;
    const all = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map(r => String(r[0]));
    const set = {}; ids.forEach(i => set[String(i)] = 1);
    const rows = [];
    all.forEach((id, i) => { if (set[id]) rows.push(i + 2); });
    rows.reverse().forEach(r => sh.deleteRow(r));
    return rows.length;
  });
}

/** Hapus akun + semua konten, campaign, ide, resource milik akun itu */
function deleteAccount(accountId) {
  const ss = getSS_();
  return withLock_(() => {
    DATA_SHEETS.concat(['Accounts']).forEach(n => {
      const sh = ss.getSheetByName(n);
      if (sh.getLastRow() < 2) return;
      const headers = headersOf_(sh);
      const col = n === 'Accounts' ? 0 : headers.indexOf('AccountID');
      if (col < 0) return;
      const vals = sh.getRange(2, col + 1, sh.getLastRow() - 1, 1).getValues();
      for (let i = vals.length - 1; i >= 0; i--) if (String(vals[i][0]) === String(accountId)) sh.deleteRow(i + 2);
    });
    return true;
  });
}

function saveSettings(obj) {
  return withLock_(() => {
    const sh = getSS_().getSheetByName('Settings');
    const data = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 2).getValues() : [];
    Object.keys(obj).forEach(k => {
      const i = data.findIndex(r => r[0] === k);
      if (i > -1) sh.getRange(i + 2, 2).setValue(obj[k]);
      else { sh.appendRow([k, obj[k]]); data.push([k, obj[k]]); }
    });
    return true;
  });
}

function savePrefs(prefs) {
  PropertiesService.getUserProperties().setProperty('prefs', JSON.stringify(prefs || {}));
  return true;
}

/* ============================ EXPORT ============================ */

/**
 * opts = { accountIds:[], from, to, status, platform, target:'tab'|'file', splitByAccount:bool }
 */
function exportToSheet(opts) {
  opts = opts || {};
  const tz = Session.getScriptTimeZone();
  const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const accs = readSheet_('Accounts');
  const accName = {}; accs.forEach(a => accName[a.ID] = a.Name);
  const ids = opts.accountIds && opts.accountIds.length ? opts.accountIds : accs.map(a => a.ID);

  const rows = readSheet_('Contents')
    .filter(c => ids.indexOf(c.AccountID) > -1)
    .filter(c => (!opts.from || c.Date >= opts.from) && (!opts.to || c.Date <= opts.to))
    .filter(c => !opts.status || c.Status === opts.status)
    .filter(c => !opts.platform || c.Platform === opts.platform)
    .sort((a, b) => (a.Date + a.Time).localeCompare(b.Date + b.Time));

  const headers = ['No', 'Akun', 'Tanggal', 'Hari', 'Jam', 'Judul', 'Platform', 'Format', 'Status', 'Progres',
                   'Campaign', 'Pillar', 'Caption', 'Hashtag', 'Link Post', 'Link Hasil',
                   'Reach', 'Likes', 'Comments', 'Shares', 'Saves', 'ER %'];
  const toRow = (c, i) => {
    const p = String(c.Date).split('-').map(Number);
    const dt = new Date(p[0], p[1] - 1, p[2]);
    let cl = []; try { cl = JSON.parse(c.Checklist || '[]'); } catch (e) {}
    const reach = Number(c.Reach) || 0;
    const eng = ['Likes', 'Comments', 'Shares', 'Saves'].reduce((a, k) => a + (Number(c[k]) || 0), 0);
    return [i + 1, accName[c.AccountID] || '', c.Date, HARI[dt.getDay()] || '', c.Time, c.Title, c.Platform, c.Format,
            c.Status, cl.length ? cl.filter(x => x.d).length + '/' + cl.length : '', c.Campaign, c.Pillar, c.Caption, c.Hashtags,
            c.PostLink, c.ResultLink, c.Reach, c.Likes, c.Comments, c.Shares, c.Saves,
            reach ? Math.round(eng / reach * 1000) / 10 : ''];
  };

  const label = (opts.from || 'awal') + ' s/d ' + (opts.to || 'akhir');
  const name = 'Export ' + Utilities.formatDate(new Date(), tz, 'dd-MM-yyyy HHmm');
  let ss, firstSheet = null;
  if (opts.target === 'file') { ss = SpreadsheetApp.create(APP_NAME + ' — ' + name); firstSheet = ss.getSheets()[0]; }
  else ss = getSS_();

  const groups = opts.splitByAccount
    ? ids.map(id => ({ title: accName[id] || id, rows: rows.filter(r => r.AccountID === id) }))
    : [{ title: ids.length === 1 ? (accName[ids[0]] || 'Akun') : 'Semua akun', rows: rows }];

  let firstGid = null;
  groups.forEach((g, gi) => {
    const tabName = (opts.splitByAccount ? g.title.slice(0, 40) + ' · ' : '') + name;
    const sh = (firstSheet && gi === 0) ? firstSheet.setName(tabName) : ss.insertSheet(tabName);
    if (firstGid === null) firstGid = sh.getSheetId();
    writeExportTab_(sh, g, headers, toRow, label, opts);
  });

  const url = opts.target === 'file' ? ss.getUrl() : ss.getUrl() + '#gid=' + firstGid;
  return { url: url, name: name, count: rows.length, tabs: groups.length };
}

function writeExportTab_(sh, g, headers, toRow, label, opts) {
  const count = s => g.rows.filter(r => r.Status === s).length;
  sh.getRange('A1').setValue(APP_NAME + ' — ' + g.title).setFontSize(16).setFontWeight('bold');
  sh.getRange('A2').setValue('Periode: ' + label + (opts.status ? ' | Status: ' + opts.status : '') +
    (opts.platform ? ' | Platform: ' + opts.platform : '')).setFontColor('#64748b');
  sh.getRange(3, 1, 1, 6).setValues([['Total: ' + g.rows.length, 'Published: ' + count('Published'),
    'Content done: ' + count('Content done'), 'Scheduled: ' + count('Scheduled'), 'Draft: ' + count('Draft'), 'Idea: ' + count('Idea')]])
    .setFontWeight('bold').setBackground('#eef2ff');
  const start = 5;
  sh.getRange(start, 1, 1, headers.length).setValues([headers]).setBackground(HEADER_BG).setFontColor('#fff').setFontWeight('bold');
  const table = g.rows.map(toRow);
  if (table.length) {
    [3, 5, 10].forEach(c => sh.getRange(start + 1, c, table.length, 1).setNumberFormat('@'));
    sh.getRange(start + 1, 1, table.length, headers.length).setValues(table);
    sh.getRange(start, 1, table.length + 1, headers.length).applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false);
    applyStatusColors_(sh, 9);
  }
  sh.setFrozenRows(start);
  sh.autoResizeColumns(1, headers.length);
  sh.setColumnWidth(6, 320);
  sh.setColumnWidth(13, 260);
}

function menuExportThisMonth() {
  const tz = Session.getScriptTimeZone(), now = new Date();
  const from = Utilities.formatDate(new Date(now.getFullYear(), now.getMonth(), 1), tz, 'yyyy-MM-dd');
  const to = Utilities.formatDate(new Date(now.getFullYear(), now.getMonth() + 1, 0), tz, 'yyyy-MM-dd');
  const r = exportToSheet({ from: from, to: to, target: 'tab' });
  SpreadsheetApp.getActive().toast(r.count + ' konten diexport ke "' + r.name + '"', APP_NAME, 6);
}

function showWebAppHelp() {
  const html = HtmlService.createHtmlOutput(
    '<div style="font-family:Arial;line-height:1.6;font-size:14px"><ol>' +
    '<li>Extensions → Apps Script</li><li>Deploy → New deployment → <b>Web app</b></li>' +
    '<li>Execute as: <b>Me</b>, akses: <b>Only myself</b> (atau Anyone)</li>' +
    '<li>Buka URL web app di browser</li><li>HP (Chrome): menu ⋮ → <b>Add to Home screen</b></li></ol></div>'
  ).setWidth(420).setHeight(230);
  SpreadsheetApp.getUi().showModalDialog(html, 'Buka sebagai aplikasi');
}