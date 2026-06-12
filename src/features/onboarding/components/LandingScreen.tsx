import Image from "next/image";
import { twMerge } from "tailwind-merge";

import {
  LANDING_FEATURES,
  LANDING_HEADLINE,
} from "@/src/features/onboarding/content";

import BrandMark from "./BrandMark";
import MobileScreen from "./MobileScreen";
import OnboardingStartButton from "./OnboardingStartButton";

function FeatureStackCard({
  label,
  className,
  slashClassName,
}: {
  label: string;
  className?: string;
  slashClassName?: string;
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
        className="absolute inset-x-3 bottom-4 top-3 rounded-[28px] border border-white/8 bg-gradient-to-b from-white/6 via-white/[0.03] to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[62%] rounded-[32px] bg-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-8 rounded-t-[32px] bg-gradient-to-b from-primary to-transparent"
      />
      {slashClassName ? (
        <Image
          src="/ornament/white-slash.svg"
          alt=""
          width={104}
          height={16}
          aria-hidden="true"
          className={twMerge(
            "pointer-events-none absolute h-auto w-[92px] opacity-95",
            slashClassName,
          )}
        />
      ) : null}
      <p className="relative z-10 text-balance">{label}</p>
    </article>
  );
}

export default function LandingScreen() {
  return (
    <MobileScreen>
      <section className="relative flex min-h-[100svh] flex-1 flex-col bg-white">
        <div className="absolute inset-x-0 top-0 bottom-[132px] overflow-hidden rounded-bl-[84px] bg-primary">
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
            <h1 className="text-[2.45rem] font-bold leading-[0.98] tracking-[-0.05em]">
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
            >
              <div className="absolute left-[-2.5rem] top-8 h-36 w-36 rounded-full border border-white/8 bg-gradient-to-br from-white/10 to-transparent blur-[1px]" />
              <div className="absolute right-[-2rem] top-24 h-44 w-44 rounded-full border border-white/8 bg-gradient-to-bl from-white/10 to-transparent blur-[1px]" />
              <div className="absolute left-10 bottom-6 h-28 w-28 rounded-full border border-white/8 bg-gradient-to-tr from-white/8 to-transparent blur-[1px]" />
            </div>
            {LANDING_FEATURES.map((feature, index) => (
              <FeatureStackCard
                key={feature.id}
                label={feature.label}
                className={index === 0 ? "" : "-mt-4"}
                slashClassName={
                  index === 0
                    ? "right-7 top-1 rotate-[74deg]"
                    : index === 1
                      ? "left-5 top-3 -rotate-[102deg]"
                      : "right-7 top-1 rotate-[84deg]"
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
  );
}
