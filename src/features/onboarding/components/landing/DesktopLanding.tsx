"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import {
  COOPERATIVE_REALITY_CARDS,
  DESKTOP_NAV_ITEMS,
  TESTIMONIAL_CARDS,
  type DesktopNavId,
} from "./landingData";
import {
  DesktopReveal,
  DesktopSectionLabel,
  DesktopTestimonialCard,
} from "./LandingPrimitives";
import LandingFooter from "./LandingFooter";

export default function DesktopLanding({
  activeDesktopNavId,
  onOpenInstallModal,
}: {
  activeDesktopNavId: DesktopNavId;
  onOpenInstallModal: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative hidden min-h-[100svh] w-screen scroll-smooth overflow-x-hidden bg-white sm:block [margin-left:calc(50%-50vw)]">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#d9ece9]/80 bg-[#edf7f5]/92 backdrop-blur">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-5 lg:px-10 lg:py-6">
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

          <nav className="flex items-center gap-7 text-sm font-semibold text-primary lg:gap-9">
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
              onClick={onOpenInstallModal}
            >
              Install PWA
            </button>
          </nav>

          <button
            type="button"
            onClick={onOpenInstallModal}
            className="rounded-[14px] bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#117977]"
          >
            Install PWA
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-6 pb-0 pt-32 lg:px-10 lg:pt-36">
        <section
          id="fitur"
          className="grid items-center gap-12 pb-10 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-16"
        >
          <DesktopReveal className="max-w-[520px]">
            <h1 className="text-[3.8rem] font-bold leading-[0.96] tracking-[-0.08em] text-primary xl:text-[4.4rem]">
              Koperasi yang Tidak Bisa Dimanipulasi.
            </h1>

            <p className="mt-8 max-w-[360px] text-[0.95rem] leading-[1.9] text-primary/78 lg:mt-10 lg:text-[0.98rem]">
              Platform pencatatan, kredit scoring &amp; kasir untuk koperasi
              Indonesia. Setiap transaksi dirantai ke blockchain. Tidak bisa
              dihapus, tidak bisa dipalsukan.
            </p>

            <div className="mt-10 flex items-center gap-4 lg:mt-12 lg:gap-5">
              <button
                type="button"
                onClick={onOpenInstallModal}
                className="rounded-[14px] bg-primary px-10 py-4 text-base font-semibold text-white transition-colors hover:bg-[#117977]"
              >
                Install PWA
              </button>

              <Link
                href="#cara-kerja"
                className="rounded-[14px] border-2 border-primary px-7 py-4 text-base font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                Lihat Cara Kerja
              </Link>
            </div>
          </DesktopReveal>

          <DesktopReveal
            className="relative flex min-h-[420px] items-end justify-end lg:min-h-[500px]"
            delay={0.08}
            y={36}
          >
            <div
              aria-hidden="true"
              className="absolute bottom-2 right-0 h-[200px] w-full max-w-[470px] rounded-[30px] bg-primary"
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

        <section id="cara-kerja" className="mt-20 pb-12 lg:mt-28">
          <DesktopReveal>
            <DesktopSectionLabel>Kenyataan hari ini</DesktopSectionLabel>

            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,640px)_minmax(0,300px)] lg:items-start lg:justify-between lg:gap-12">
              <h2 className="max-w-[640px] text-[2.7rem] font-bold leading-[1.04] tracking-[-0.06em] text-primary lg:text-[3.25rem]">
                222.000 koperasi hampir tidak tersentuh digital.
              </h2>

              <p className="max-w-[300px] text-[0.95rem] font-medium leading-[1.7] text-[#163b45] lg:justify-self-end lg:pt-7 lg:text-right">
                Bukan karena tidak mau, tapi solusi yang ada belum pernah
                benar-benar memahami kondisi lapangan mereka.
              </p>
            </div>
          </DesktopReveal>

          <motion.div
            className="mt-12 grid gap-5 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={
              shouldReduceMotion
                ? { hidden: {}, visible: { transition: { staggerChildren: 0 } } }
                : {
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
                  }
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
                  index === 1 ? "lg:translate-y-3" : index === 2 ? "lg:translate-y-6" : "",
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
          className="relative left-1/2 right-1/2 mt-20 w-screen -translate-x-1/2 overflow-hidden bg-[#167c7a] px-6 py-16 lg:mt-28 lg:px-10 lg:py-20"
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
              <h2 className="mt-7 text-[2.6rem] font-bold leading-none tracking-[-0.06em] text-white lg:text-[3.05rem]">
                Bukan kata kami.
              </h2>
            </DesktopReveal>

            <motion.div
              className="mt-14 grid items-start gap-4 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={
                shouldReduceMotion
                  ? { hidden: {}, visible: { transition: { staggerChildren: 0 } } }
                  : {
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
                    }
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
                  className={
                    index === 1 ? "lg:-translate-y-4" : index === 2 ? "lg:translate-y-3" : ""
                  }
                >
                  <DesktopTestimonialCard card={card} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <DesktopReveal className="px-6 py-20 text-center lg:px-10 lg:py-24">
          <div className="border-t border-[#dceceb] pt-20 lg:pt-24">
            <h2 className="mx-auto max-w-[11ch] text-[3rem] font-bold leading-[1.08] tracking-[-0.07em] text-primary lg:text-[3.45rem]">
              Digitalkan Koperasi Anda dalam 10 Menit.
            </h2>
            <p className="mx-auto mt-5 max-w-[320px] text-[0.93rem] leading-[1.7] text-primary/72">
              Tidak butuh IT, tidak butuh server, install langsung dari browser.
            </p>

            <div className="mt-10 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={onOpenInstallModal}
                className="rounded-[12px] bg-primary px-12 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#117977]"
              >
                Install PWA
              </button>
            </div>
          </div>
        </DesktopReveal>
      </main>

      <LandingFooter />
    </div>
  );
}
