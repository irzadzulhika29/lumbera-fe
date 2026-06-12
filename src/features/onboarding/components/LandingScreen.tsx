import Image from "next/image";
import { Icon } from "@iconify/react";
import { twMerge } from "tailwind-merge";

import {
  LANDING_FEATURES,
  LANDING_HEADLINE,
} from "@/src/features/onboarding/content";

import BrandMark from "./BrandMark";
import MobileScreen from "@/src/shared/components/layout/MobileScreen";
import OnboardingStartButton from "./OnboardingStartButton";

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
            >
            </div>
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
  );
}
