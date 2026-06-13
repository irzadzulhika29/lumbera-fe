import Image from "next/image";

import MobileScreen from "@/src/shared/components/layout/MobileScreen";

import BrandMark from "../BrandMark";
import LandingFooter from "./LandingFooter";

export default function MobileLanding({
  onOpenInstallModal,
}: {
  onOpenInstallModal: () => void;
}) {
  return (
    <div className="sm:hidden">
      <MobileScreen>
        <section className="flex min-h-[100svh] flex-1 flex-col bg-white">
          <div className="bg-primary px-5 pb-10 pt-[calc(1.4rem+env(safe-area-inset-top))] text-white">
            <header className="flex justify-center">
              <BrandMark variant="light" className="w-[118px]" />
            </header>

            <div className="mt-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/72">
                Install First
              </p>
              <h1 className="mt-4 text-[2.35rem] font-bold leading-[1.02] tracking-[-0.06em]">
                Pasang dulu sebelum pakai Lumbera.
              </h1>
              <p className="mx-auto mt-4 max-w-[300px] text-sm leading-7 text-white/82">
                Lumbera baru bisa diakses penuh setelah dipasang ke layar utama HP kamu.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <Image
                src="/ornament/landing-img.webp"
                alt="Preview aplikasi Lumbera"
                width={720}
                height={720}
                priority
                className="h-auto w-full max-w-[310px]"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col px-5 pb-0 pt-8">
            <div className="rounded-[30px] border border-[#d7ece8] bg-[#f6fbfa] px-5 py-5">
              <p className="text-sm font-semibold text-primary">Install dari browser HP dulu</p>
              <p className="mt-2 text-sm leading-6 text-text/70">
                Buka modal install untuk Android atau iPhone, lalu pasang Lumbera ke home
                screen.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenInstallModal}
              className="mt-6 flex items-center justify-center rounded-[18px] bg-primary px-5 py-4 text-base font-semibold text-white"
            >
              Install PWA
            </button>

            <p className="mt-3 text-center text-xs font-medium leading-5 text-text/54">
              Setelah terpasang, buka lagi dari ikon Lumbera di layar utama.
            </p>

            <LandingFooter mobile />
          </div>
        </section>
      </MobileScreen>
    </div>
  );
}
