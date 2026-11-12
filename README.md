# Content Planner

Frontend biasa (HTML/CSS/JavaScript) dengan Netlify Function sebagai backend. Google Sheets dipakai sementara; akses spreadsheet dilakukan dari backend, bukan browser. Arsitektur ini menjaga agar migrasi ke Supabase nanti cukup mengganti implementasi backend.

## File utama

- `public/index.html` — markup dan struktur halaman.
- `public/css/styles.css` — seluruh styling yang sebelumnya tertanam di HTML.
- `public/js/app.js` — logika aplikasi browser.
- `netlify/functions/api.mjs` — API dan akses Google Sheets.
- `Kode.js` — backend Apps Script lama, dipertahankan sebagai referensi.

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

Backend akan membuat tab dan header yang belum ada (`Accounts`, `Contents`, `Campaigns`, `Ideas`, `Resources`, `Settings`) tanpa menghapus data yang sudah ada. Kode akses aplikasi tetap mengikuti `AccessHash` yang sudah tersimpan di tab `Settings`; gunakan kode akses yang saat ini berlaku.

## Batasan saat ini

- Sinkronisasi metrik media sosial belum dipindahkan dari Apps Script.
- Ekspor ke tab/file spreadsheet belum dipindahkan; unduh CSV masih tersedia.
- Sebelum deployment publik, konfigurasikan secrets dan batasi akses aplikasi sesuai kebutuhan tim.
