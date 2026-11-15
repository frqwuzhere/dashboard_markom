# Content Planner

Frontend biasa (HTML/CSS/JavaScript) dengan Netlify Function sebagai backend. Google Sheets dipakai sementara; akses spreadsheet dilakukan dari backend, bukan browser. Arsitektur ini menjaga agar migrasi ke Supabase nanti cukup mengganti implementasi backend.

## File utama

- `public/index.html` — markup dan struktur halaman.
- `public/css/styles.css` — seluruh styling yang sebelumnya tertanam di HTML.
- `public/js/app.js` — ikon, konstanta, state bersama, navigasi, dan helper.
- `public/js/app-content.js` — kalender, filter, dan daftar konten.
- `public/js/app-home.js` — beranda dan ringkasan akun.
- `public/js/app-sections.js` — campaign, ide, resources, analytics, akun, dan pengaturan.
- `public/js/app-forms.js` — form, editor, dan panel modal.
- `public/js/app-actions.js` — ekspor, aksi cepat, toast, dan interaksi umum.
- `public/js/app-bootstrap.js` — keyboard, akses/kunci, catatan, pemuatan data, dan inisialisasi.
- `public/js/social-dashboard.js` — dashboard media sosial dan lifecycle grafik.
- `public/css/social-dashboard.css` — style dashboard media sosial.
- `netlify/functions/api.mjs` — API dan akses Google Sheets.
- `Kode.js` — backend Apps Script lama, dipertahankan sebagai referensi.

Script browser dimuat berurutan melalui `defer` di `public/index.html`. Urutan ini
mempertahankan global function yang masih dipakai oleh inline handler di HTML dan
template. Jangan mengubah urutan script tanpa memeriksa dependensi antar-section.

## Referensi web

Repo [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance)
tersedia sebagai Git submodule di `references/modern-web-guidance`. Gunakan panduannya
saat mengubah browser APIs, performa, aksesibilitas, atau kompatibilitas. Folder ini
berada di luar `public/` sehingga tidak ikut dipublikasikan oleh Netlify.

Setelah clone pertama, ambil isi submodule dengan:

```sh
git submodule update --init --recursive
```

Perbarui hanya saat diperlukan dan tinjau perubahan commit submodule:

```sh
git -C references/modern-web-guidance pull --ff-only
git add references/modern-web-guidance
```

## Menjalankan lokal

1. Buat Google Cloud service account dan aktifkan Google Sheets API.
2. Bagikan spreadsheet `1qQsLbwGK6WnE_KV7ysswEUHIyGdmAw9uhfafM7bowXA` sebagai **Editor** ke email service account. Pastikan sheet dapat diakses oleh akun tersebut.
3. Jalankan `npm install`.
4. Salin `.env.example` menjadi `.env`. Untuk lokal, `GOOGLE_APPLICATION_CREDENTIALS` dapat menunjuk ke file JSON Service Account. Untuk deployment, masukkan `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, dan `API_TOKEN_SECRET` di Netlify → Site configuration → Environment variables (jangan upload file JSON ke frontend atau repository):
   - `GOOGLE_SHEET_ID` — ID spreadsheet.
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` — email service account.
   - `GOOGLE_PRIVATE_KEY` — private key service account; simpan sebagai secret, jangan commit.
   - `API_TOKEN_SECRET` — nilai acak panjang untuk menandatangani sesi aplikasi.
5. Jalankan `npm run dev`.

## Testing

- `npm test` menjalankan tes unit backend menggunakan Node.js test runner.
- Tes E2E/browser belum disiapkan; direncanakan untuk tahap berikutnya.

Backend akan membuat tab dan header yang belum ada (`Accounts`, `Contents`, `Campaigns`, `Ideas`, `Resources`, `Settings`) tanpa menghapus data yang sudah ada. Kode akses aplikasi tetap mengikuti `AccessHash` yang sudah tersimpan di tab `Settings`; gunakan kode akses yang saat ini berlaku.

## Batasan saat ini

- Sinkronisasi metrik media sosial belum dipindahkan dari Apps Script.
- Ekspor ke tab/file spreadsheet belum dipindahkan; unduh CSV masih tersedia.
- Sebelum deployment publik, konfigurasikan secrets dan batasi akses aplikasi sesuai kebutuhan tim.
