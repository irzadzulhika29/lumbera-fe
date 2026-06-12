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
}: {
  label: string;
  className?: string;
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
        className="absolute inset-x-0 top-0 h-[62%] rounded-[32px] bg-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-8 rounded-t-[32px] bg-gradient-to-b from-primary to-transparent"
      />
      {/* <div
        aria-hidden="true"
        className={twMerge(
          "absolute h-[46px] w-[46px] rounded-[10px]  shadow-[0_8px_12px_rgba(0,0,0,0.12)]",
          tileClassName,
        )}
      /> */}
      <p className="relative z-10 text-balance">{label}</p>
    </article>
  );
}

export default function LandingScreen() {
  return (
    <MobileScreen>
      <section className="relative flex min-h-[100svh] flex-1 flex-col bg-white">
        <div className="absolute inset-x-0 top-0 bottom-[132px] overflow-hidden rounded-bl-[54px] bg-primary">
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

          <div className="mt-7 px-2 text-white">
            <h1 className="text-[2.45rem] font-bold leading-[0.98] tracking-[-0.05em]">
              {LANDING_HEADLINE.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <div className="mt-1 flex justify-end pr-4">
              <Image
                src="/ornament/white-slash.svg"
                alt=""
                width={102}
                height={10}
                className="h-auto w-[112px]"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-1 flex-col justify-end px-1 pb-16">
            {LANDING_FEATURES.map((feature, index) => (
              <FeatureStackCard
                key={feature.id}
                label={feature.label}
                className={index === 0 ? "" : "-mt-4"}
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
