"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { LANDING_FEATURES, LANDING_HEADLINE, START_ROUTE } from "@/src/features/onboarding/content";
import InstallQrPanel from "@/src/features/pwa/components/InstallQrPanel";

import MobileScreen from "@/src/shared/components/layout/MobileScreen";
import OnboardingStartButton from "./OnboardingStartButton";
import BrandMark from "./BrandMark";

const DESKTOP_NAV_ITEMS = [
  { id: "fitur", label: "Fitur" },
  { id: "cara-kerja", label: "Cara Kerja" },
  { id: "mitra", label: "Mitra" },
] as const;
const COOPERATIVE_REALITY_CARDS = [
  {
    id: "manual-ledger",
    accent: "82%",
    description: "Masih Catat Manual di Buku atau Excel",
    body: "Data mudah hilang, dimanipulasi, atau tidak bisa diverifikasi pihak luar.",
    className: "bg-[#e6f3f5] text-[#0f5054]",
  },
  {
    id: "unreachable-financing",
    accent: "Rp 4,7T",
    description: "Pembiayaan yang Tidak Terjangkau",
    body: "Mitra fintech tidak bisa menilai kelayakan tanpa data terstandar dan terpercaya.",
    className: "bg-[#1b9d9d] text-white",
  },
  {
    id: "credit-history-gap",
    accent: "0",
    description: "Anggota Tanpa Riwayat Kredit",
    body: "Petani disiplin bertahun-tahun tetap dianggap unbankable oleh lembaga formal.",
    className: "bg-[#0c3b3c] text-white",
  },
] as const;
const TESTIMONIAL_CARDS = [
  {
    id: "rini-1",
    quote:
      "Sebelum LUMBERA, laporan bulanan butuh 2 hari. Sekarang 5 menitan langsung sesuai format OJK.",
    name: "Rini Puspitasari",
    role: "Credit Analyst",
  },
  {
    id: "rini-2",
    quote:
      "Sebelum LUMBERA, laporan bulanan butuh 2 hari. Sekarang 5 menitan langsung sesuai format OJK.",
    name: "Rini Puspitasari",
    role: "Credit Analyst",
  },
  {
    id: "rini-3",
    quote:
      "Sebelum LUMBERA, laporan bulanan butuh 2 hari. Sekarang 5 menitan langsung sesuai format OJK.",
    name: "Rini Puspitasari",
    role: "Credit Analyst",
  },
] as const;

function DesktopSectionLabel({
  children,
  inverse = false,
}: {
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <span
      className={twMerge(
        "inline-flex rounded-[12px] px-4 py-2 text-[1.02rem] font-semibold tracking-[-0.02em]",
        inverse ? "bg-white text-[#156f70]" : "bg-[#edf7f5] text-primary",
      )}
    >
      {children}
    </span>
  );
}

function DesktopReveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{
        delay,
        duration: shouldReduceMotion ? 0.2 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function DesktopTestimonialCard({
  card,
  className,
}: {
  card: (typeof TESTIMONIAL_CARDS)[number];
  className?: string;
}) {
  return (
    <article
      className={twMerge(
        "rounded-[22px] bg-[#ebf6f8] px-8 py-7 text-[#183e47] ring-1 ring-white/24",
        className,
      )}
    >
      <div className="flex items-center gap-1 text-[#f5af00]">
        {Array.from({ length: 5 }, (_, index) => (
          <Icon key={`${card.id}-${index}`} icon="solar:star-bold" className="h-4 w-4" />
        ))}
      </div>

      <p className="mt-6 max-w-[25ch] text-[0.96rem] leading-[1.65]">
        &quot;{card.quote}&quot;
      </p>

      <div className="mt-8 flex items-center gap-3 border-t border-[#d3e6e8] pt-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2c66a5] text-xs font-semibold text-white">
          R
        </span>
        <div>
          <p className="text-[0.82rem] font-semibold leading-none">{card.name}</p>
          <p className="mt-1 text-[0.73rem] leading-none text-[#6a7f86]">
            {card.role}
          </p>
        </div>
      </div>
    </article>
  );
}

function FeatureStackCard({
  label,
  className,
  icon,
  ornamentClassName,
}: {
  label: string;
  className?: string;
  icon: string;
  ornamentClassName?: string;
}) {
  return (
    <article
      className={twMerge(
        "relative overflow-visible rounded-[32px] px-8 py-8 text-center text-[1.03rem] font-semibold leading-snug text-white shadow-[0_-18px_34px_rgba(0,0,0,0.12)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-3 bottom-4 top-3 rounded-[28px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[62%] rounded-[32px] bg-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-8 rounded-t-[32px] bg-gradient-to-b from-primary to-transparent"
      />
      {ornamentClassName ? (
        <Icon
          icon={icon}
          aria-hidden="true"
          className={twMerge(
            "pointer-events-none absolute h-11 w-11 text-white drop-shadow-[0_8px_18px_rgba(0,0,0,0.12)]",
            ornamentClassName,
          )}
        />
      ) : null}
      <p className="relative z-10">{label}</p>
    </article>
  );
}

function DesktopInstallModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/42 px-6 py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-pwa-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[380px] rounded-[30px] bg-white px-8 py-8 text-center md:px-9 md:py-9"
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

        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
          Install PWA
        </p>
        <h2
          id="install-pwa-title"
          className="mt-3 text-[2rem] font-bold leading-[1.04] tracking-[-0.05em] text-[#222b2f]"
        >
          Scan QR untuk pasang Lumbera
        </h2>
        <p className="mt-4 text-sm font-medium leading-6 text-primary">
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
      </div>
    </div>
  );
}

export default function LandingScreen() {
  const [activeDesktopNavId, setActiveDesktopNavId] =
    useState<(typeof DESKTOP_NAV_ITEMS)[number]["id"]>("fitur");
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInstallModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsInstallModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInstallModalOpen]);

  useEffect(() => {
    const desktopSections = DESKTOP_NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter((section): section is HTMLElement => section !== null);

    if (desktopSections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length === 0) {
          return;
        }

        setActiveDesktopNavId(
          visibleEntries[0].target.id as (typeof DESKTOP_NAV_ITEMS)[number]["id"],
        );
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    desktopSections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="relative hidden min-h-[100svh] w-screen scroll-smooth overflow-x-hidden bg-white sm:block [margin-left:calc(50%-50vw)]">
        <header className="fixed inset-x-0 top-0 z-40 border-b border-[#d9ece9]/80 bg-[#edf7f5]/92 backdrop-blur">
          <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-10 py-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo/icon.svg"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="text-[2rem] font-bold leading-none tracking-[-0.05em] text-primary">
                LUMBERA
              </span>
            </Link>

            <nav className="flex items-center gap-9 text-sm font-semibold text-primary">
              {DESKTOP_NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className={twMerge(
                    "pb-2 transition-colors hover:text-primary",
                    activeDesktopNavId === item.id
                      ? "border-b-[3px] border-primary"
                      : "text-primary/78",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                className="pb-2 text-primary/78 transition-colors hover:text-primary"
                onClick={() => setIsInstallModalOpen(true)}
              >
                Install PWA
              </button>
            </nav>

            <button
              type="button"
              onClick={() => setIsInstallModalOpen(true)}
              className="rounded-[14px] bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#117977]"
            >
              Install PWA
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1180px] px-10 pb-8 pt-36">
          <section id="fitur" className="flex items-center justify-between gap-16">
            <DesktopReveal className="max-w-[520px]">
              <h1 className="text-[4.4rem] font-bold leading-[0.98] tracking-[-0.08em] text-primary">
                Koperasi yang Tidak Bisa Dimanipulasi.
              </h1>

              <p className="mt-10 max-w-[360px] text-[0.98rem] leading-[1.9] text-primary/78">
                Platform pencatatan, kredit scoring &amp; kasir untuk koperasi
                Indonesia. Setiap transaksi dirantai ke blockchain. Tidak bisa
                dihapus, tidak bisa dipalsukan.
              </p>

              <div className="mt-12 flex items-center gap-5">
                <Link
                  href={START_ROUTE}
                  className="rounded-[14px] border-2 border-primary px-8 py-4 text-base font-semibold text-primary transition-colors hover:bg-primary/5"
                >
                  Daftarkan Koperasi
                </Link>

                <button
                  type="button"
                  onClick={() => setIsInstallModalOpen(true)}
                  className="rounded-[14px] bg-primary px-12 py-4 text-base font-semibold text-white transition-colors hover:bg-[#117977]"
                >
                  Lihat Demo
                </button>
              </div>
            </DesktopReveal>

            <DesktopReveal className="relative flex min-h-[500px] flex-1 items-end justify-end" delay={0.08} y={36}>
              <div
                aria-hidden="true"
                className="absolute bottom-2 right-0 h-[230px] w-[470px] rounded-[30px] bg-primary"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-14 right-16 h-[210px] w-[250px] rounded-[26px] bg-[#26a7a7]"
              />
              <Image
                src="/ornament/landing-img.webp"
                alt="Tampilan aplikasi Lumbera di ponsel"
                width={1200}
                height={1200}
                priority
                className="relative z-10 h-auto w-full max-w-[640px]"
              />
            </DesktopReveal>
          </section>

          <section id="cara-kerja" className="mt-28 pb-12">
            <DesktopReveal>
              <DesktopSectionLabel>Kenyataan hari ini</DesktopSectionLabel>

              <div className="mt-10 flex items-start justify-between gap-12">
                <h2 className="max-w-[640px] text-[3.25rem] font-bold leading-[1.06] tracking-[-0.06em] text-primary">
                  222.000 koperasi hampir tidak tersentuh digital.
                </h2>

                <p className="max-w-[300px] pt-7 text-right text-[0.95rem] font-medium leading-[1.7] text-[#163b45]">
                  Bukan karena tidak mau, tapi solusi yang ada belum pernah
                  benar-benar memahami kondisi lapangan mereka.
                </p>
              </div>
            </DesktopReveal>

            <motion.div
              className="mt-12 grid grid-cols-3 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={
                shouldReduceMotion
                  ? { hidden: {}, visible: { transition: { staggerChildren: 0 } } }
                  : { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } } }
              }
            >
              {COOPERATIVE_REALITY_CARDS.map((card, index) => (
                <motion.article
                  key={card.id}
                  variants={
                    shouldReduceMotion
                      ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
                      : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
                  }
                  transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
                  className={twMerge(
                    "min-h-[214px] rounded-[20px] px-8 py-8",
                    index === 1 ? "translate-y-3" : index === 2 ? "translate-y-6" : "",
                    card.className,
                  )}
                >
                  <p className="text-[2.2rem] font-bold leading-none tracking-[-0.05em]">
                    {card.accent}
                  </p>
                  <h3 className="mt-5 max-w-[14ch] text-[1.05rem] font-semibold leading-[1.35]">
                    {card.description}
                  </h3>
                  <p className="mt-6 max-w-[25ch] text-[0.92rem] leading-[1.55] opacity-88">
                    {card.body}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </section>

          <section
            id="mitra"
            className="relative left-1/2 right-1/2 mt-28 w-screen -translate-x-1/2 overflow-hidden bg-[#167c7a] px-10 py-20"
          >
            <div
              aria-hidden="true"
              className="absolute left-[-8rem] top-[-6rem] h-[260px] w-[260px] rounded-full bg-white/6 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-[-7rem] right-[-4rem] h-[240px] w-[240px] rounded-full bg-[#0b5959]/40 blur-3xl"
            />
            <div className="mx-auto max-w-[1180px]">
              <DesktopReveal className="flex flex-col items-center text-center">
                <DesktopSectionLabel inverse>Yang mereka katakan</DesktopSectionLabel>
                <h2 className="mt-7 text-[3.05rem] font-bold leading-none tracking-[-0.06em] text-white">
                  Bukan kata kami.
                </h2>
              </DesktopReveal>

              <motion.div
                className="mt-14 grid grid-cols-3 items-start gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={
                  shouldReduceMotion
                    ? { hidden: {}, visible: { transition: { staggerChildren: 0 } } }
                    : { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } } }
                }
              >
                {TESTIMONIAL_CARDS.map((card, index) => (
                  <motion.div
                    key={card.id}
                    variants={
                      shouldReduceMotion
                        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
                        : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
                    }
                    transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                    className={index === 1 ? "-translate-y-4" : index === 2 ? "translate-y-3" : ""}
                  >
                    <DesktopTestimonialCard card={card} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <DesktopReveal className="border-t border-[#dceceb] px-10 py-24 text-center">
            <h2 className="mx-auto max-w-[11ch] text-[3.45rem] font-bold leading-[1.08] tracking-[-0.07em] text-primary">
              Digitalkan Koperasi Anda dalam 10 Menit.
            </h2>
            <p className="mx-auto mt-5 max-w-[320px] text-[0.93rem] leading-[1.7] text-primary/72">
              Tidak butuh IT, tidak butuh server, install langsung dari browser.
            </p>

            <div className="mt-10 flex items-center justify-center gap-6">
              <Link
                href={START_ROUTE}
                className="rounded-[12px] border-2 border-primary px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                Daftarkan Koperasi
              </Link>

              <button
                type="button"
                onClick={() => setIsInstallModalOpen(true)}
                className="rounded-[12px] bg-primary px-12 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#117977]"
              >
                Lihat Demo
              </button>
            </div>
          </DesktopReveal>

          <footer className="relative left-1/2 right-1/2 mt-4 w-screen -translate-x-1/2 bg-primary px-10 py-7">
            <div className="mx-auto flex max-w-[1180px] flex-col items-start">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo/icon-invert.svg"
                  alt=""
                  width={28}
                  height={30}
                  className="h-auto w-7"
                />
                <span className="text-[1.12rem] font-bold tracking-[-0.04em] text-white">
                  LUMBERA
                </span>
              </div>

              <p className="mt-5 max-w-[300px] text-[0.9rem] font-medium leading-[1.45] text-white/92">
                Platform Multi-Koperasi Berbasis Verifiable Ledger, Innovative
                Credit Scoring &amp; Autonomous Reporting Indonesia.
              </p>
            </div>
          </footer>
        </main>

        <DesktopInstallModal
          isOpen={isInstallModalOpen}
          onClose={() => setIsInstallModalOpen(false)}
        />
      </div>

      <div className="sm:hidden">
        <MobileScreen>
          <section className="relative flex min-h-[100svh] flex-1 flex-col bg-white">
            <div className="absolute inset-x-0 bottom-[132px] top-0 overflow-hidden rounded-bl-[84px] bg-primary">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover opacity-42 saturate-[0.9]"
              >
                <source src="/video/onboard-video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-primary/68" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary via-primary/82 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-1 flex-col px-3 pb-28 pt-7">
              <header className="flex justify-center">
                <BrandMark variant="light" />
              </header>

              <div className="mt-12 px-2 text-white">
                <h1 className="text-4xl font-bold leading-[0.98] tracking-[-0.05em]">
                  {LANDING_HEADLINE.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>

                <div className="mt-1 pl-[8.4rem]">
                  <Image
                    src="/ornament/white-slash.svg"
                    alt=""
                    width={102}
                    height={10}
                    className="h-auto w-[112px]"
                  />
                </div>
              </div>

              <div className="relative -mx-3 mt-5 flex flex-1 flex-col justify-end pb-24">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-[11.5rem] top-[19.5rem]"
                />
                {LANDING_FEATURES.map((feature, index) => (
                  <FeatureStackCard
                    key={feature.id}
                    label={feature.label}
                    icon={
                      index === 0
                        ? "solar:shield-check-bold-duotone"
                        : index === 1
                          ? "solar:chart-square-bold-duotone"
                          : "solar:cloud-cross-bold-duotone"
                    }
                    className={index === 0 ? "" : "-mt-4"}
                    ornamentClassName={
                      index === 0
                        ? "right-2 top-0 rotate-[8deg]"
                        : index === 1
                          ? "left-2 top-0 -rotate-[8deg]"
                          : "right-7 top-3 rotate-[8deg]"
                    }
                  />
                ))}
              </div>
            </div>

            <footer className="absolute inset-x-0 bottom-0 z-20 bg-white px-4 pb-[calc(3.25rem+env(safe-area-inset-bottom))] pt-5">
              <OnboardingStartButton />
            </footer>
          </section>
        </MobileScreen>
      </div>
    </>
  );
}
