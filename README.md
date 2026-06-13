# Lumbera FE

Lumbera FE adalah aplikasi **PWA fintech untuk koperasi** yang dibangun dengan **Next.js 16**, **React 19**, dan **TypeScript**. Aplikasi ini dirancang untuk mendukung operasional koperasi simpan pinjam secara mobile-first, dengan dua surface utama:

- **Officer / Pengurus** untuk operasional koperasi, transaksi, laporan, anggota, dan toko koperasi.
- **Member / Anggota** untuk tabungan, pinjaman, profil kredit, dan akses data pribadi.

Aplikasi ini menggunakan pola **frontend as BFF-lite**: komponen client memanggil route internal di `src/app/api/*`, lalu route tersebut meneruskan request ke backend menggunakan bearer token dari sesi login.

## Cakupan produk

Lumbera saat ini mencakup area berikut:

- onboarding dan aktivasi pengguna koperasi
- autentikasi berbasis nomor telepon dan PIN
- dashboard role-based untuk pengurus dan anggota
- transaksi koperasi pengurus
- laporan keuangan dan audit keamanan koperasi
- dashboard toko koperasi, katalog produk, kasir, stok masuk, dan penyesuaian stok
- dashboard anggota untuk tabungan, pinjaman, riwayat cicilan, dan pengajuan pinjaman
- profile pengguna berbasis API
- instalasi PWA dan fallback offline
- sinkronisasi operasi offline ke backend saat koneksi kembali tersedia

## Fitur utama

### 1. Dashboard pengurus

Pengurus memiliki dashboard operasional yang terhubung ke API untuk:

- ringkasan CHS dan jumlah anggota aktif
- daftar transaksi terbaru
- quick action ke transaksi, laporan, dan toko koperasi
- halaman profil pengurus

API yang sudah digunakan di area ini antara lain:

- `reports/dashboard-summary`
- `profile`

### 2. Manajemen transaksi koperasi

Modul transaksi pengurus mencakup:

- simpanan
- pencairan pinjaman
- angsuran
- mutasi stok / kas terkait alur toko
- detail transaksi per item
- modal konfirmasi pembatalan

Beberapa data transaksi mendukung penyimpanan lokal untuk mode offline sebelum disinkronkan.

### 3. Laporan pengurus

Area laporan berisi:

- ringkasan laporan koperasi
- laporan keuangan
- audit keamanan koperasi / ledger report

API yang sudah dipakai:

- `reports/financial`
- `reports/financial/export`
- `reports/cooperative-health-score`

### 4. Toko koperasi

Modul toko pengurus mencakup:

- dashboard toko
- katalog produk
- tambah produk
- detail produk via modal
- kasir / penjualan
- stok masuk
- penyesuaian stok

API yang sudah dipakai:

- `store/dashboard`
- `store/products`
- `store/sales`
- `store/products/:productID/stock-in`
- `store/products/:productID/adjustments`

### 5. Dashboard anggota

Area anggota mencakup:

- dashboard tabungan
- ringkasan MCS / credit profile
- tabungan dan buku tabungan
- export Excel dan PDF buku tabungan
- dashboard pinjaman
- riwayat pinjaman
- pengajuan pinjaman
- cek profil kredit / trigger scoring MCS
- halaman profil anggota

API yang sudah dipakai:

- `cooperative-members/dashboard`
- `cooperative-members/savings-book`
- `cooperative-members/savings-book/export`
- `cooperative-members/savings-book/export/pdf`
- `cooperative-members/loan-dashboard`
- `cooperative-members/loan-applications`
- `cooperative-members/:memberID/mcs/run`
- `profile`

## Karakteristik PWA

Lumbera disiapkan sebagai Progressive Web App untuk penggunaan lapangan dan perangkat mobile.

Implementasi PWA di repo ini meliputi:

- manifest aplikasi di [src/app/manifest.ts](src/app/manifest.ts)
- service worker di [public/sw.js](public/sw.js)
- registrasi service worker di [src/shared/components/system/PwaRegistration.tsx](src/shared/components/system/PwaRegistration.tsx)
- halaman instalasi khusus di [src/app/install/page.tsx](src/app/install/page.tsx)
- halaman fallback offline di [src/app/offline/page.tsx](src/app/offline/page.tsx)

Strategi offline saat ini:

- app shell dan aset statis disimpan ke cache browser
- request `GET` untuk navigasi halaman dapat fallback ke cache atau halaman offline
- request `/api/*` tidak di-cache oleh service worker
- operasi offline tertentu disimpan lokal dan dikirim ulang saat koneksi kembali tersedia

## Sinkronisasi offline

Runtime sinkronisasi offline dijalankan dari root layout melalui [src/features/sync/offlineSyncRuntime.tsx](src/features/sync/offlineSyncRuntime.tsx).

Mekanisme dasarnya:

- bootstrap cache entity lokal untuk member, product, transaction, dan movement
- memulihkan operasi yang sebelumnya status `syncing`
- mengirim queue operasi `pending` atau `retryable_error` ke backend
- memperbarui cache lokal setelah status sinkron berubah

Ini penting untuk skenario koperasi yang bekerja pada jaringan tidak stabil atau intermittent.

## Arsitektur aplikasi

Struktur besar repo:

```text
src/
  app/
    api/                  # proxy route internal ke backend
    auth/                 # flow login, OTP, PIN, forgot PIN, aktivasi
    dashboard/            # route App Router untuk officer dan member
    install/              # halaman instalasi PWA
    offline/              # fallback offline
  features/
    auth/                 # komponen dan util auth
    dashboard/            # screen, API client, mapper, storage draft
    onboarding/           # flow onboarding koperasi
    pwa/                  # pengalaman instalasi PWA
    sync/                 # offline sync runtime dan storage
  shared/
    components/           # komponen layout, ui, system
    styles/               # global styles
public/
  sw.js                   # service worker
  logo/, status/, ...     # aset statis
```

Pola komunikasi data:

1. Komponen client membaca sesi dari `localStorage`.
2. Access token dikirim ke route internal `src/app/api/*`.
3. Route internal melakukan request ke backend `NEXT_PUBLIC_API_URL`.
4. Respons backend dinormalisasi di layer API client / mapper sebelum dipakai UI.

## Teknologi

- **Next.js 16.2.9**
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion**
- **Iconify**

## Menjalankan proyek

### 1. Install dependency

```bash
npm install
```

### 2. Siapkan environment

Buat atau sesuaikan file `.env`:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain/api/v1
NEXT_OCR=https://your-ocr-webhook
```

Keterangan:

- `NEXT_PUBLIC_API_URL`: base URL backend utama Lumbera
- `NEXT_OCR`: endpoint OCR / upload KTP untuk onboarding

### 3. Jalankan development server

```bash
npm run dev
```

Lalu buka:

```text
http://localhost:3000
```

### 4. Build production

```bash
npm run build
npm run start
```

## Script yang tersedia

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Route utama

### Public / auth

- `/`
- `/install`
- `/offline`
- `/role-select`
- `/auth/phone`
- `/auth/otp`
- `/auth/pin`
- `/auth/forgot-pin`
- `/auth/profile`
- `/auth/cooperative-profile`
- `/auth/cooperative-type`
- `/auth/bank-account`
- `/auth/financial-config`
- `/auth/activation`

### Dashboard pengurus

- `/dashboard`
- `/dashboard/officer/transactions`
- `/dashboard/officer/members`
- `/dashboard/officer/store`
- `/dashboard/reports`
- `/dashboard/profile`

### Dashboard anggota

- `/dashboard/member`
- `/dashboard/member/savings`
- `/dashboard/member/loans`
- `/dashboard/member/loans/history`
- `/dashboard/member/loans/request`
- `/dashboard/member/profile`

## Catatan implementasi

- proyek ini **mobile-first** dan mayoritas screen didesain untuk viewport ponsel
- session auth saat ini disimpan di `localStorage` melalui key `lumbera.auth-session`
- service worker hanya aktif pada origin aman seperti `https`, `localhost`, atau `127.0.0.1`
- route internal `/api/*` berfungsi sebagai adaptor frontend ke backend agar token tidak ditanam langsung ke semua komponen UI
- beberapa screen masih memiliki fallback data lokal untuk menjaga UI tetap hidup saat API gagal atau saat flow belum sepenuhnya tersambung

## Status saat ini

Secara fungsional, repo ini sudah berada pada tahap **frontend aplikasi koperasi digital yang cukup lengkap**, dengan integrasi API yang kuat pada area:

- dashboard officer
- dashboard member
- profile user
- pinjaman anggota
- buku tabungan anggota
- toko koperasi
- transaksi operasional pengurus

Pekerjaan lanjutan yang umumnya masih relevan untuk tahap berikutnya:

- penguatan validasi dan error state lintas form
- peningkatan test coverage
- hardening strategi offline dan conflict resolution
- observability untuk queue sync dan kegagalan API
- penyempurnaan dokumentasi backend contract per module

## Ringkasannya

Lumbera FE bukan landing page atau mockup statis. Ini adalah **frontend PWA fintech koperasi** yang sudah memuat alur nyata untuk:

- onboarding pengguna
- autentikasi
- operasional pengurus
- tabungan dan pinjaman anggota
- toko koperasi
- instalasi PWA
- fallback offline dan sinkronisasi data

README ini sebaiknya ikut diperbarui setiap kali ada modul baru, perubahan contract API, atau perubahan arsitektur offline sync.
