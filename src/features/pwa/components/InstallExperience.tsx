"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { START_ROUTE } from "@/src/features/onboarding/content";
import BrandMark from "@/src/features/onboarding/components/BrandMark";
import MobileScreen from "@/src/shared/components/layout/MobileScreen";
import PressButton from "@/src/shared/components/ui/PressButton";

import InstallQrPanel from "./InstallQrPanel";

type InstallMode =
  | "loading"
  | "desktop"
  | "standalone"
  | "android-ready"
  | "android-manual"
  | "ios-manual"
  | "unsupported-browser";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isStandaloneDisplay() {
  if (typeof window === "undefined") {
    return false;
  }

  const iosStandalone =
    "standalone" in window.navigator &&
    Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);

  return (
    window.matchMedia("(display-mode: standalone)").matches || iosStandalone
  );
}

function detectInstallMode(userAgent: string) {
  const normalized = userAgent.toLowerCase();
  const isMobile =
    /android|iphone|ipad|ipod|mobile/.test(normalized) ||
    window.matchMedia("(pointer: coarse)").matches;

  if (!isMobile) {
    return "desktop" as const;
  }

  const isInAppBrowser =
    /fban|fbav|instagram|line|micromessenger|wv|tiktok|snapchat/.test(
      normalized,
    );

  if (isInAppBrowser) {
    return "unsupported-browser" as const;
  }

  const isIos = /iphone|ipad|ipod/.test(normalized);
  const isSafari =
    /safari/.test(normalized) &&
    !/crios|fxios|edgios|opios|mercury/.test(normalized);

  if (isIos) {
    return isSafari ? ("ios-manual" as const) : ("unsupported-browser" as const);
  }

  const isAndroid = /android/.test(normalized);
  const isChromeFamily = /chrome|chromium|edg|opr/.test(normalized);

  if (isAndroid && isChromeFamily) {
    return "android-manual" as const;
  }

  return "unsupported-browser" as const;
}

function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
      {label}
    </span>
  );
}

function InstructionStep({
  description,
  icon,
  title,
}: {
  description: string;
  icon: string;
  title: string;
}) {
  return (
    <li className="flex items-start gap-3 rounded-[20px] border border-[#dbe4e6] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-primary/10 text-primary">
        <Icon icon={icon} className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm font-semibold text-text">{title}</p>
        <p className="mt-1 text-sm leading-6 text-text/68">{description}</p>
      </div>
    </li>
  );
}

export default function InstallExperience() {
  const [mode, setMode] = useState<InstallMode>("loading");
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(
    null,
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const baseMode = isStandaloneDisplay()
        ? "standalone"
        : detectInstallMode(window.navigator.userAgent);

      setMode(baseMode);
    });

    const handleBeforeInstallPrompt = (event: Event) => {
      const installEvent = event as BeforeInstallPromptEvent;
      installEvent.preventDefault();
      setPromptEvent(installEvent);
      setMode("android-ready");
    };

    const handleAppInstalled = () => {
      setPromptEvent(null);
      setMode("standalone");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function handleInstall() {
    if (!promptEvent) {
      return;
    }

    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;

    if (choice.outcome === "accepted") {
      setMode("standalone");
      setPromptEvent(null);
      return;
    }

    setMode("android-manual");
  }

  if (mode === "desktop") {
    return (
      <main className="min-h-[100svh] bg-[#f2f5f6] px-6 py-10 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.05fr)_420px] lg:items-center">
          <section className="rounded-[40px] bg-primary px-8 py-10 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
            <BrandMark variant="light" />
            <h1 className="mt-8 text-[2.8rem] font-bold leading-[0.95] tracking-[-0.06em]">
              Pasang Lumbera
              <span className="block text-white/78">langsung dari HP kamu</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/80">
              Lumbera dirancang sebagai platform koperasi yang mobile-first.
              Scan QR ini dari HP untuk buka halaman install yang lebih pas buat
              Android atau iPhone.
            </p>
          </section>

          <InstallQrPanel
            title="Scan ulang di HP untuk pasang Lumbera"
            description="Instalasi dilakukan dari browser HP agar shortcut Lumbera bisa masuk ke layar utama."
          />
        </div>
      </main>
    );
  }

  return (
    <MobileScreen className="bg-[#f2f5f6]">
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f2f5f6]">
        <div className="absolute inset-x-0 top-0 h-[280px] rounded-b-[44px] bg-primary" />

        <div className="relative z-10 flex flex-1 flex-col px-5 pb-8 pt-[calc(1.75rem+env(safe-area-inset-top))]">
          <header className="flex justify-center">
            <BrandMark variant="light" className="w-[116px]" />
          </header>

          <div className="mt-8 rounded-[34px] bg-white px-5 py-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
            <StatusBadge
              label={
                mode === "standalone"
                  ? "Sudah terpasang"
                  : mode === "android-ready"
                    ? "Android siap install"
                    : mode === "ios-manual"
                      ? "iPhone"
                      : mode === "unsupported-browser"
                        ? "Butuh browser utama"
                        : "Siap dipasang"
              }
            />

            <h1 className="mt-4 text-[2rem] font-bold leading-[1.02] tracking-[-0.05em] text-primary">
              Pasang Lumbera di HP kamu
            </h1>
            <p className="mt-3 text-sm leading-6 text-text/70">
              Biar akses layanan koperasi lebih cepat, lebih rapi, dan terasa
              seperti aplikasi langsung dari layar utama.
            </p>

            {mode === "standalone" ? (
              <div className="mt-6 rounded-[24px] bg-primary/[0.06] p-4">
                <p className="text-sm font-semibold text-primary">
                  Lumbera sudah siap dipakai
                </p>
                <p className="mt-2 text-sm leading-6 text-text/70">
                  Shortcut aplikasi sudah aktif. Kamu bisa lanjut masuk ke
                  Lumbera kapan saja dari layar utama HP.
                </p>
                <Link
                  href={START_ROUTE}
                  className="mt-4 inline-flex rounded-[16px] bg-primary px-4 py-3 text-sm font-semibold text-white shadow-[0_4px_0_0_var(--color-primary-shadow)]"
                >
                  Buka Lumbera
                </Link>
              </div>
            ) : null}

            {mode === "android-ready" ? (
              <div className="mt-6">
                <PressButton
                  className="w-full py-3.5 text-base font-semibold"
                  onClick={() => {
                    void handleInstall();
                  }}
                >
                  Pasang Lumbera
                </PressButton>
                <p className="mt-3 text-center text-xs font-medium text-text/56">
                  Gunakan Chrome di Android untuk pemasangan paling lancar.
                </p>
              </div>
            ) : null}

            {mode === "android-manual" ? (
              <ol className="mt-6 space-y-3">
                <InstructionStep
                  icon="solar:global-bold-duotone"
                  title="Pastikan kamu membuka halaman ini di Chrome"
                  description="Kalau masih di browser lain, pindah dulu ke Chrome agar tombol install bisa muncul."
                />
                <InstructionStep
                  icon="solar:add-circle-bold-duotone"
                  title="Cari menu Install app atau Tambahkan ke layar utama"
                  description="Biasanya ada di menu titik tiga browser Android setelah halaman selesai dimuat."
                />
              </ol>
            ) : null}

            {mode === "ios-manual" ? (
              <ol className="mt-6 space-y-3">
                <InstructionStep
                  icon="solar:share-bold-duotone"
                  title="Tap tombol Share di Safari"
                  description="Buka menu bagikan Safari di bagian bawah atau atas layar iPhone kamu."
                />
                <InstructionStep
                  icon="solar:add-square-bold-duotone"
                  title="Pilih Add to Home Screen"
                  description='Setelah itu pilih "Add to Home Screen" supaya Lumbera muncul seperti aplikasi.'
                />
              </ol>
            ) : null}

            {mode === "unsupported-browser" ? (
              <div className="mt-6 rounded-[24px] border border-[#ffd9b0] bg-[#fff6ec] p-4">
                <p className="text-sm font-semibold text-[#b86500]">
                  Buka halaman ini di Chrome atau Safari
                </p>
                <p className="mt-2 text-sm leading-6 text-text/70">
                  Beberapa browser dalam aplikasi chat atau media sosial belum
                  mendukung pemasangan otomatis. Salin link ini lalu buka di
                  browser utama HP kamu.
                </p>
              </div>
            ) : null}

            {mode === "loading" ? (
              <div className="mt-6 rounded-[24px] bg-primary/[0.06] p-4">
                <p className="text-sm font-semibold text-primary">
                  Menyiapkan instruksi install
                </p>
                <p className="mt-2 text-sm leading-6 text-text/70">
                  Sebentar, kami sedang menyesuaikan panduan install Lumbera
                  untuk perangkat kamu.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </MobileScreen>
  );
}
