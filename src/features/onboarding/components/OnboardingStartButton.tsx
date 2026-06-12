"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";

import PressButton from "@/src/shared/components/ui/PressButton";
import { START_ROUTE } from "@/src/features/onboarding/content";

export default function OnboardingStartButton() {
  const router = useRouter();

  return (
    <PressButton
      className="w-full py-3.5 text-base font-semibold"
      onClick={() => {
        startTransition(() => {
          router.push(START_ROUTE);
        });
      }}
    >
      Mulai
    </PressButton>
  );
}
