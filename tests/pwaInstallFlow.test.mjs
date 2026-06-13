import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const requiredFiles = [
  "src/app/install/page.tsx",
  "src/features/pwa/components/InstallExperience.tsx",
  "src/features/pwa/components/InstallQrPanel.tsx",
  "public/logo/icon-invert.svg",
  "src/features/onboarding/components/landing/DesktopLanding.tsx",
  "src/features/onboarding/components/landing/DesktopInstallModal.tsx",
  "src/features/onboarding/components/landing/InstalledMobileOnboarding.tsx",
  "src/features/onboarding/components/landing/MobileLanding.tsx",
  "src/features/onboarding/components/landing/LandingFooter.tsx",
  "src/features/onboarding/components/landing/landingData.ts",
];

for (const file of requiredFiles) {
  assert.equal(existsSync(resolve(file)), true, `${file} should exist`);
}

const landingSource = readFileSync(
  resolve("src/features/onboarding/components/LandingScreen.tsx"),
  "utf8",
);
const desktopLandingSource = readFileSync(
  resolve("src/features/onboarding/components/landing/DesktopLanding.tsx"),
  "utf8",
);
const desktopInstallModalSource = readFileSync(
  resolve("src/features/onboarding/components/landing/DesktopInstallModal.tsx"),
  "utf8",
);
const installedMobileOnboardingSource = readFileSync(
  resolve("src/features/onboarding/components/landing/InstalledMobileOnboarding.tsx"),
  "utf8",
);
const mobileLandingSource = readFileSync(
  resolve("src/features/onboarding/components/landing/MobileLanding.tsx"),
  "utf8",
);
const landingFooterSource = readFileSync(
  resolve("src/features/onboarding/components/landing/LandingFooter.tsx"),
  "utf8",
);
const landingDataSource = readFileSync(
  resolve("src/features/onboarding/components/landing/landingData.ts"),
  "utf8",
);
const landingModulesSource = [
  landingSource,
  desktopLandingSource,
  desktopInstallModalSource,
  installedMobileOnboardingSource,
  mobileLandingSource,
  landingFooterSource,
  landingDataSource,
].join("\n");

assert.match(landingModulesSource, /Fitur/);
assert.match(landingModulesSource, /Cara Kerja/);
assert.match(landingModulesSource, /Mitra/);
assert.match(landingModulesSource, /Install PWA/);
assert.match(landingModulesSource, /Koperasi yang Tidak Bisa Dimanipulasi/);
assert.match(landingModulesSource, /Scan QR untuk pasang Lumbera/);
assert.match(landingModulesSource, /landing-img\.webp/);
assert.match(landingModulesSource, /Kenyataan hari ini/);
assert.match(landingModulesSource, /222\.000 koperasi hampir tidak tersentuh digital/);
assert.match(landingModulesSource, /82%/);
assert.match(landingModulesSource, /Rp 4,7T/);
assert.match(landingModulesSource, /Anggota Tanpa Riwayat Kredit/);
assert.match(landingModulesSource, /Yang mereka katakan/);
assert.match(landingModulesSource, /Bukan kata kami/);
assert.match(landingModulesSource, /Sebelum LUMBERA, laporan bulanan butuh 2 hari/);
assert.match(landingModulesSource, /Rini Puspitasari/);
assert.match(landingModulesSource, /Digitalkan Koperasi Anda dalam 10 Menit/);
assert.match(landingModulesSource, /Tidak butuh IT, tidak butuh server, install langsung dari browser/);
assert.match(landingModulesSource, /icon-invert\.svg/);
assert.match(landingModulesSource, /Pasang dulu sebelum pakai Lumbera/);
assert.match(
  landingModulesSource,
  /Lumbera baru bisa diakses penuh setelah dipasang ke layar utama\s+HP/,
);
assert.match(landingModulesSource, /InstallQrPanel/);
assert.match(landingSource, /isInstallModalOpen|setIsInstallModalOpen/);
assert.doesNotMatch(landingSource, /OnboardingStartButton/);
assert.match(landingSource, /activeDesktopNavId|setActiveDesktopNavId/);
assert.match(landingSource, /IntersectionObserver/);
assert.match(landingSource, /DesktopLanding/);
assert.match(landingSource, /InstalledMobileOnboarding/);
assert.doesNotMatch(landingSource, /MobileLanding/);
assert.doesNotMatch(landingSource, /display-mode: standalone/);
assert.match(desktopInstallModalSource, /path="\/install"|path='\/install'/);
assert.match(desktopInstallModalSource, /beforeinstallprompt/);
assert.match(desktopInstallModalSource, /Add to Home Screen/);
assert.match(desktopInstallModalSource, /Chrome atau Safari|Chrome di Android/);
assert.doesNotMatch(landingModulesSource, /START_ROUTE/);
assert.doesNotMatch(landingModulesSource, /Daftarkan Koperasi/);
assert.doesNotMatch(landingModulesSource, /Buka Lumbera/);
assert.match(desktopInstallModalSource, /Setelah terpasang, buka lagi dari ikon Lumbera di layar utama/);
assert.match(installedMobileOnboardingSource, /LANDING_HEADLINE/);
assert.match(installedMobileOnboardingSource, /LANDING_FEATURES/);
assert.match(installedMobileOnboardingSource, /OnboardingStartButton/);
assert.match(installedMobileOnboardingSource, /onboard-video\.mp4/);

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
