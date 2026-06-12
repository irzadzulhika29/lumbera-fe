"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import {
  ROLE_OPTIONS,
  getAuthPhoneHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import PressButton from "@/src/shared/components/ui/PressButton";

import BrandMark from "./BrandMark";

function RoleIcon({ roleId }: { roleId: RoleOptionId }) {
  if (roleId === "manager") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 18v-1.2A3.8 3.8 0 0 0 10.2 13H6.8A3.8 3.8 0 0 0 3 16.8V18" />
        <circle cx="8.5" cy="8" r="3.2" />
        <path d="M17 7v6" />
        <path d="M14 10h6" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 18v-0.9A4.1 4.1 0 0 1 9.1 13h5.8A4.1 4.1 0 0 1 19 17.1V18" />
    </svg>
  );
}

function RoleCard({
  title,
  description,
  roleId,
  onSelect,
}: {
  title: string;
  description: string;
  roleId: RoleOptionId;
  onSelect: (roleId: RoleOptionId) => void;
}) {
  return (
    <PressButton
      variant="outline"
      className={twMerge(
        "w-full rounded-[12px] px-4 py-4 text-left",
        "border-2 border-primary bg-white",
        "shadow-[0_5px_0_0_var(--color-primary-shadow)]",
      )}
      onClick={() => onSelect(roleId)}
    >
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 flex h-7 w-7 items-center justify-center">
          <RoleIcon roleId={roleId} />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-none tracking-[-0.03em] text-primary">
            {title}
          </h2>
          <p className="mt-3 text-[0.95rem] leading-snug text-primary/85">
            {description}
          </p>
        </div>
      </div>
    </PressButton>
  );
}

export default function RoleSelectScreen() {
  const router = useRouter();

  const handleSelectRole = (roleId: RoleOptionId) => {
    startTransition(() => {
      router.push(getAuthPhoneHref(roleId));
    });
  };

  return (
    <main className="min-h-[100svh] w-full bg-white text-text">
      <section className="mx-auto flex min-h-[100svh] w-full max-w-[430px] flex-col bg-white">
        <div className="flex w-full flex-1 flex-col px-6 pb-12 pt-7">
          <header className="flex justify-center">
            <BrandMark variant="color" className="scale-90" />
          </header>

          <div className="mt-14">
            <h1 className="max-w-xs text-3xl font-bold">
              Masuk sebagai siapa?
            </h1>
            <p className="mt-4 text-xl leading-snug text-text/80">
              Pilih peran anda di koperasi
            </p>
          </div>

          <div className="mt-14 space-y-8">
            <RoleCard
              title={ROLE_OPTIONS[0].title}
              description={ROLE_OPTIONS[0].description}
              roleId={ROLE_OPTIONS[0].id}
              onSelect={handleSelectRole}
            />

            <p className="text-center text-base italic leading-none text-text/70">
              atau masuk sebagai
            </p>

            <RoleCard
              title={ROLE_OPTIONS[1].title}
              description={ROLE_OPTIONS[1].description}
              roleId={ROLE_OPTIONS[1].id}
              onSelect={handleSelectRole}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
