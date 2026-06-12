import { twMerge } from "tailwind-merge";

import { ROLE_OPTIONS } from "@/src/features/onboarding/content";

import BrandMark from "./BrandMark";

function RoleIcon({ roleId }: { roleId: (typeof ROLE_OPTIONS)[number]["id"] }) {
  if (roleId === "officer") {
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
}: {
  title: string;
  description: string;
  roleId: (typeof ROLE_OPTIONS)[number]["id"];
}) {
  return (
    <button
      type="button"
      className={twMerge(
        "w-full rounded-[12px] border-2 border-primary bg-white px-4 py-4 text-left",
        "shadow-[0_5px_0_0_var(--color-primary-shadow)] transition-transform duration-150",
        "hover:-translate-y-0.5 active:translate-y-0.5",
      )}
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
    </button>
  );
}

export default function RoleSelectScreen() {
  return (
    <main className="min-h-[100svh] bg-white text-text">
      <section className="mx-auto flex min-h-[100svh] w-full max-w-[430px] flex-col bg-white">
        <div className="flex w-full flex-1 flex-col px-6 pb-12 pt-7">
          <header className="flex justify-center">
            <BrandMark variant="color" />
          </header>

          <div className="mt-14">
            <h1 className="max-w-[9ch] text-[2.2rem] font-bold leading-[1.02] tracking-[-0.05em]">
              Masuk sebagai siapa?
            </h1>
            <p className="mt-4 text-[1.02rem] leading-snug text-text/80">
              Pilih peran anda di koperasi
            </p>
          </div>

          <div className="mt-14 space-y-10">
            <RoleCard
              title={ROLE_OPTIONS[0].title}
              description={ROLE_OPTIONS[0].description}
              roleId={ROLE_OPTIONS[0].id}
            />

            <p className="text-center text-base italic leading-none text-text/70">
              atau masuk sebagai
            </p>

            <RoleCard
              title={ROLE_OPTIONS[1].title}
              description={ROLE_OPTIONS[1].description}
              roleId={ROLE_OPTIONS[1].id}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
