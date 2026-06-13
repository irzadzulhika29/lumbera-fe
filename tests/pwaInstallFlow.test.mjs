import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const requiredFiles = [
  "src/app/install/page.tsx",
  "src/features/pwa/components/InstallExperience.tsx",
  "src/features/pwa/components/InstallQrPanel.tsx",
  "public/logo/icon-invert.svg",
];

for (const file of requiredFiles) {
  assert.equal(existsSync(resolve(file)), true, `${file} should exist`);
}

const landingSource = readFileSync(
  resolve("src/features/onboarding/components/LandingScreen.tsx"),
  "utf8",
);

assert.match(landingSource, /Fitur/);
assert.match(landingSource, /Cara Kerja/);
assert.match(landingSource, /Mitra/);
assert.match(landingSource, /Install PWA/);
assert.match(landingSource, /Koperasi yang Tidak Bisa Dimanipulasi/);
assert.match(landingSource, /Daftarkan Koperasi/);
assert.match(landingSource, /Lihat Demo/);
assert.match(landingSource, /landing-img\.webp/);
assert.match(landingSource, /Kenyataan hari ini/);
assert.match(landingSource, /222\.000 koperasi hampir tidak tersentuh digital/);
assert.match(landingSource, /82%/);
assert.match(landingSource, /Rp 4,7T/);
assert.match(landingSource, /Anggota Tanpa Riwayat Kredit/);
assert.match(landingSource, /Yang mereka katakan/);
assert.match(landingSource, /Bukan kata kami/);
assert.match(landingSource, /Sebelum LUMBERA, laporan bulanan butuh 2 hari/);
assert.match(landingSource, /Rini Puspitasari/);
assert.match(landingSource, /Digitalkan Koperasi Anda dalam 10 Menit/);
assert.match(landingSource, /Tidak butuh IT, tidak butuh server, install langsung dari browser/);
assert.match(landingSource, /Platform Multi-Koperasi Berbasis Verifiable Ledger/);
assert.match(landingSource, /icon-invert\.svg/);
assert.match(landingSource, /Pasang dulu sebelum pakai Lumbera/);
assert.match(landingSource, /Lumbera baru bisa diakses penuh setelah dipasang ke layar utama HP/);
assert.match(landingSource, /InstallQrPanel/);
assert.match(landingSource, /isInstallModalOpen|setIsInstallModalOpen/);
assert.doesNotMatch(landingSource, /OnboardingStartButton/);
assert.match(landingSource, /activeDesktopNavId|setActiveDesktopNavId/);
assert.match(landingSource, /IntersectionObserver/);
assert.match(landingSource, /path="\/install"|path='\/install'|href="\/install"|href='\/install'/);
assert.match(landingSource, /Scan QR untuk pasang Lumbera/);

const installPageSource = readFileSync(resolve("src/app/install/page.tsx"), "utf8");

assert.match(installPageSource, /Pasang Lumbera di HP kamu/);

const installExperienceSource = readFileSync(
  resolve("src/features/pwa/components/InstallExperience.tsx"),
  "utf8",
);

assert.match(installExperienceSource, /beforeinstallprompt/);
assert.match(installExperienceSource, /display-mode: standalone/);
assert.match(installExperienceSource, /Add to Home Screen/);
assert.match(installExperienceSource, /Chrome atau Safari/);
assert.match(installExperienceSource, /Cooperative Health Score|Pasang Lumbera/);

const installQrPanelSource = readFileSync(
  resolve("src/features/pwa/components/InstallQrPanel.tsx"),
  "utf8",
);

assert.match(installQrPanelSource, /create-qr-code|qrserver|QR/);
assert.match(installQrPanelSource, /\/install/);
assert.match(installQrPanelSource, /max-w-\[212px\]|max-w-\[220px\]|max-w-\[200px\]/);

const manifestSource = readFileSync(resolve("src/app/manifest.ts"), "utf8");

assert.match(manifestSource, /icon-invert\.svg/);

console.log("pwa install flow smoke test passed");
