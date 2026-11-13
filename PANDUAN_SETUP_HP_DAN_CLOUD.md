# 📱 Panduan Web App Mobile (PWA) & Sinkronisasi Google Sheets

Dokumen ini berisi panduan lengkap untuk menggunakan aplikasi **Rekap Pembayaran DP & Potongan Olah Jasa** di HP (Android & iPhone), menghubungkannya ke **Google Sheets** untuk sinkronisasi data antar-karyawan, serta cara menaruhnya online di **Vercel** secara 100% gratis.

---

## 🚀 1. Cara Pasang di HP (PWA - Progressive Web App)

Setelah aplikasi di-online-kan (misal lewat link Vercel) atau saat dibuka di browser HP:

### 🤖 Untuk HP Android (Google Chrome)
1. Buka link web aplikasi di browser **Chrome**.
2. Akan muncul tombol **"📲 Pasang App"** di bagian atas, atau klik ikon **Titik Tiga (⋮)** di kanan atas Chrome.
3. Pilih menu **"Tambahkan ke Layar Utama"** (*Add to Home Screen*) atau **"Install Aplikasi"**.
4. Ikon aplikasi akan langsung terpasang di menu utama HP Anda layaknya aplikasi dari Play Store.
5. Begitu dibuka, tampilan akan *full screen* tanpa address bar browser dan bisa bekerja secara **offline**!

### 🍏 Untuk iPhone / iPad (Safari)
1. Buka link web aplikasi di browser **Safari**.
2. Tekan tombol **Share / Bagikan** (ikon kotak dengan panah ke atas di bagian bawah layar).
3. Gulir ke bawah dan pilih **"Tambah ke Layar Utama"** (*Add to Home Screen*).
4. Tekan **Tambah** (*Add*) di pojok kanan atas.
5. Ikon aplikasi siap digunakan langsung dari layar depan iPhone Anda.

---

## ☁️ 2. Cara Menghubungkan ke Google Sheets (Gratis Selamanya)

Dengan fitur ini, data yang Anda atau tim input di HP akan otomatis tersimpan ke **Google Sheet kantor** dan bisa langsung dibuka kembali dari komputer mana saja secara *real-time*.

### Langkah Setup (Hanya Sekali di Awal - Waktu: 3 Menit):
1. Buka browser di komputer, buka [Google Sheets](https://sheets.new) baru.
2. Beri nama spreadsheet tersebut, misalnya: **"Database Rekap DP Perusahaan"**.
3. Di menu atas Google Sheet, klik: **Ekstensi (Extensions)** > **Apps Script**.
4. Hapus seluruh tulisan yang ada di editor Apps Script tersebut.
5. Buka file `google_apps_script.js` yang ada di folder aplikasi ini, **salin (copy) semua isinya**, lalu **tempel (paste)** ke editor Apps Script.
6. Klik ikon **Simpan** (ikon disket / `Ctrl + S`).
7. Di pojok kanan atas, klik tombol biru **Terapkan (Deploy)** > pilih **Penerapan baru (New deployment)**.
8. Klik ikon roda gigi ⚙️ di sebelah *Pilih jenis* > pilih **Aplikasi web (Web app)**.
9. Isi konfigurasi berikut (*PENTING*):
   - **Deskripsi**: `API Rekap DP`
   - **Jalankan sebagai (Execute as)**: `Saya (email Anda)`
   - **Yang memiliki akses (Who has access)**: **`Siapa saja (Anyone)`** *(Wajib pilih ini agar HP/PC tim bisa mengirim data tanpa login akun dev)*.
10. Klik **Terapkan (Deploy)**.
11. Jika muncul peringatan izin (*Authorization Required*):
    - Klik **Review Permissions** (Tinjau Izin).
    - Pilih akun Google Anda.
    - Klik **Advanced** (Lanjutan) > klik **Go to Untitled project (unsafe)**.
    - Klik **Allow** (Izinkan).
12. Salin **URL Aplikasi Web** yang berakhiran `/exec` (Contoh: `https://script.google.com/macros/s/AKfycb.../exec`).

### Cara Mengaktifkan di Aplikasi:
1. Buka aplikasi Rekap Pembayaran di HP atau PC Anda.
2. Klik tombol **"☁️ Google Sheets"**.
3. Tempel URL yang tadi Anda salin ke kolom input, lalu klik **"Simpan URL"**.
4. Selesai! Kini setiap kali Anda klik tombol **"⬆️ Simpan Proyek ke Google Sheets"**, data akan otomatis terkirim dan tersusun rapi di tab sheet `Rekap_Proyek`.
5. Tim lain di kantor bisa langsung melihat rekapitulasi, total setoran, dan status **LUNAS / BELUM LUNAS** secara *live*!

---

## 🌐 3. Cara Meng-online-kan ke Vercel (100% Gratis)

Agar aplikasi bisa diakses dari mana saja tanpa perlu menyalakan komputer kantor:

### Cara Paling Mudah (Lewat Browser):
1. Buat akun gratis di [GitHub.com](https://github.com) (jika belum punya).
2. Buat repositori baru (*New Repository*), beri nama misalnya `rekap-pembayaran`.
3. Unggah seluruh file dari folder ini (`index.html`, `manifest.json`, `sw.js`, `icon.svg`, folder `css`, `js`, `lib`) ke repositori GitHub tersebut.
4. Buka [Vercel.com](https://vercel.com) dan login menggunakan akun GitHub Anda.
5. Klik **"Add New Project"** > pilih repositori `rekap-pembayaran` yang tadi dibuat.
6. Klik **"Deploy"**.
7. Dalam 30 detik, Anda akan mendapatkan alamat link HTTPS resmi gratis (contoh: `https://rekap-pembayaran.vercel.app`) yang siap dibagikan ke seluruh tim kantor!

---

## 💡 Fitur Spesial Mode HP di Versi Ini:
- **Navigasi Bawah**: Beralih cepat dengan satu sentuhan jempol antara **📝 Isi Formulir** dan **📄 Pratinjau Kertas**.
- **Fit Kertas Otomatis**: Tombol *Fit* di pratinjau dokumen otomatis menyesuaikan skala kertas landscape ke lebar layar HP.
- **Ekspor Cepat**: Tombol unduh **Excel** dan **PDF** langsung tersedia di menu bawah HP, siap dikirim ke WhatsApp bos/klien dalam hitungan detik.
