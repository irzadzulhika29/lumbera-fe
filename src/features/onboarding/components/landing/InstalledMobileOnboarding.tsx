"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

import {
  LANDING_FEATURES,
  LANDING_HEADLINE,
} from "@/src/features/onboarding/content";
import MobileScreen from "@/src/shared/components/layout/MobileScreen";

import BrandMark from "../BrandMark";
import OnboardingStartButton from "../OnboardingStartButton";

function FeatureStackCard({
  index,
  label,
}: {
  index: number;
  label: string;
}) {
  const badgeClassName =
    index === 0
      ? "right-2 top-[-0.45rem] rotate-[6deg]"
      : index === 1
        ? "left-0 top-[0.1rem] -rotate-[6deg]"
        : "right-8 top-[0.35rem] rotate-[7deg]";

  return (
    <article
      className={twMerge(
        "relative rounded-[32px] bg-primary px-7 py-7 text-center text-[1.02rem] font-semibold leading-snug text-white shadow-[0_-18px_34px_rgba(0,0,0,0.12)]",
        index === 0 ? "" : "-mt-4",
      )}
    >
      <span
        aria-hidden="true"
        className={twMerge(
          "absolute flex h-[58px] w-[48px] items-center justify-center rounded-[9px] bg-primary-shadow text-[1.55rem] font-bold leading-none text-white shadow-[0_8px_18px_rgba(0,0,0,0.14)]",
          badgeClassName,
        )}
      >
        {index + 1}
      </span>
      <p className="relative z-10 text-balance">{label}</p>
    </article>
  );
}

export default function InstalledMobileOnboarding() {
  return (
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
              {LANDING_FEATURES.map((feature, index) => (
                <FeatureStackCard
                  key={feature.id}
                  index={index}
                  label={feature.label}
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
  );
}
