"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

import InstallQrPanel from "@/src/features/pwa/components/InstallQrPanel";
import PressButton from "@/src/shared/components/ui/PressButton";

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
    /fban|fbav|instagram|line|micromessenger|wv|tiktok|snapchat/.test(normalized);

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

export default function DesktopInstallModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<InstallMode>("loading");
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

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
  }, [isOpen]);

  async function handleInstall() {
    if (!promptEvent) {
      return;
    }

    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;

    if (choice.outcome === "accepted") {
      setPromptEvent(null);
      setMode("standalone");
      return;
    }

    setMode("android-manual");
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/42 px-0 py-0 sm:items-center sm:px-6 sm:py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-pwa-title"
      onClick={onClose}
    >
      <div
        className="relative w-full overflow-y-auto rounded-t-[30px] bg-white px-5 pb-7 pt-8 text-center sm:max-w-[360px] sm:rounded-[30px] sm:px-8 sm:py-8 md:px-9 md:py-9"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Tutup modal install"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-text/62 transition-colors hover:bg-[#f4f7f6] hover:text-text"
        >
          <Icon icon="solar:close-circle-linear" className="h-7 w-7" />
        </button>

        {mode === "desktop" ? (
          <>
            <h2
              id="install-pwa-title"
              className="mx-auto max-w-[10ch] text-[2rem] font-bold leading-[1.04] tracking-[-0.05em] text-[#222b2f]"
            >
              Scan QR untuk pasang Lumbera
            </h2>
            <p className="mx-auto mt-4 max-w-[20ch] text-sm font-medium leading-6 text-primary">
              Buka dari HP untuk lanjut install.
            </p>

            <InstallQrPanel
              className="mt-8"
              path="/install"
              showDescription={false}
              showInstallUrl={false}
              showTitle={false}
              variant="plain"
            />
          </>
        ) : (
          <div className="text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/60">
              Install PWA
            </p>
            <h2
              id="install-pwa-title"
              className="mt-3 max-w-[11ch] text-[2rem] font-bold leading-[1.04] tracking-[-0.05em] text-[#222b2f]"
            >
              Pasang Lumbera di HP kamu
            </h2>
            <p className="mt-4 max-w-[30ch] text-sm leading-6 text-text/72">
              Install dari browser HP supaya Lumbera masuk ke home screen dan lebih
              nyaman dipakai harian.
            </p>

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
              <div className="mt-6 rounded-[24px] border border-[#dbe4e6] bg-[#f7fbfb] p-4">
                <p className="text-sm font-semibold text-primary">
                  Android belum menampilkan tombol install
                </p>
                <p className="mt-2 text-sm leading-6 text-text/70">
                  Buka halaman ini di Chrome, lalu cari menu Install app atau
                  Tambahkan ke layar utama.
                </p>
              </div>
            ) : null}

            {mode === "ios-manual" ? (
              <div className="mt-6 rounded-[24px] border border-[#dbe4e6] bg-[#f7fbfb] p-4">
                <p className="text-sm font-semibold text-primary">
                  Install lewat Add to Home Screen
                </p>
                <p className="mt-2 text-sm leading-6 text-text/70">
                  Buka di Safari, tap tombol Share, lalu pilih Add to Home Screen.
                </p>
              </div>
            ) : null}

            {mode === "unsupported-browser" ? (
              <div className="mt-6 rounded-[24px] border border-[#ffd9b0] bg-[#fff6ec] p-4">
                <p className="text-sm font-semibold text-[#b86500]">
                  Buka halaman ini di Chrome atau Safari
                </p>
                <p className="mt-2 text-sm leading-6 text-text/70">
                  Browser dalam aplikasi chat atau media sosial sering tidak bisa
                  memasang PWA dengan baik.
                </p>
              </div>
            ) : null}

            {mode === "standalone" ? (
              <div className="mt-6 rounded-[24px] border border-[#dbe4e6] bg-[#f7fbfb] p-4">
                <p className="text-sm font-semibold text-primary">
                  Lumbera sudah terpasang
                </p>
                <p className="mt-2 text-sm leading-6 text-text/70">
                  Setelah terpasang, buka lagi dari ikon Lumbera di layar utama.
                </p>
              </div>
            ) : null}

            {mode === "loading" ? (
              <div className="mt-6 rounded-[24px] border border-[#dbe4e6] bg-[#f7fbfb] p-4">
                <p className="text-sm font-semibold text-primary">
                  Menyiapkan panduan install
                </p>
                <p className="mt-2 text-sm leading-6 text-text/70">
                  Sebentar, kami sedang menyesuaikan instruksi untuk perangkat kamu.
                </p>
              </div>
            ) : null}

            {mode !== "standalone" ? (
              <p className="mt-4 text-center text-xs font-medium leading-5 text-text/54">
                Setelah terpasang, buka lagi dari ikon Lumbera di layar utama.
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
