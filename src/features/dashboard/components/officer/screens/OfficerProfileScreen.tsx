"use client";

import { Icon } from "@iconify/react";

import MobileScreen from "@/src/shared/components/layout/MobileScreen";
import { getDashboardNavigation } from "@/src/features/dashboard/data";
import DashboardScreenShell from "../../layout/DashboardScreenShell";

const accountMenus = [
  {
    label: "Edit Profil",
    icon: "solar:user-rounded-bold",
  },
  {
    label: "Ganti Nomor HP",
    icon: "solar:phone-bold",
  },
  {
    label: "Keamanan & PIN",
    icon: "solar:lock-password-bold",
  },
] as const;

const cooperativeMenus = [
  {
    label: "Informasi Koperasi",
    icon: "solar:home-angle-bold",
  },
  {
    label: "Undang Pengurus Baru",
    icon: "solar:user-plus-bold",
  },
] as const;

const profileSummary: ReadonlyArray<{
  label: string;
  value: string;
  tone?: "primary";
}> = [
  { label: "Koperasi", value: "Koperasi Padiwangi" },
  { label: "Kode Koperasi", value: "Z4Q56T" },
  { label: "CHS", value: "78 · A" },
  { label: "Tanggal Bergabung", value: "12 Juni 2021", tone: "primary" },
] as const;

function ProfileMenuItem({
  label,
  icon,
}: {
  label: string;
  icon: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between px-1 py-1.5 text-left transition-colors hover:bg-[#f7f8f9]"
    >
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-primary text-white">
          <Icon icon={icon} className="text-[1.15rem]" />
        </div>
        <span className="text-[1.02rem] font-semibold tracking-[-0.02em] text-text">
          {label}
        </span>
      </div>
      <Icon
        icon="solar:alt-arrow-right-linear"
        className="text-[1.15rem] text-secondary"
      />
    </button>
  );
}

function SummaryCard() {
  return (
    <section className="rounded-[12px] border border-[#dde2e7] bg-white px-4 py-3.5 shadow-sm">
      <div className="space-y-3">
        {profileSummary.map((item, index) => (
          <div
            key={item.label}
            className={index === 2 ? "grid grid-cols-[5rem_minmax(0,1fr)] gap-4" : "grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4"}
          >
            <span className="text-[0.95rem] font-medium text-text/66">
              {item.label}
            </span>
            <span
              className={`text-right text-[0.98rem] font-semibold leading-snug ${
                item.tone === "primary" ? "text-primary" : "text-text/82"
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function MenuSection({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; icon: string }[];
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 px-1 text-[0.96rem] font-bold tracking-[-0.02em] text-primary">
        {title}
      </h2>
      <div className="space-y-1">
        {items.map((item) => (
          <ProfileMenuItem key={item.label} label={item.label} icon={item.icon} />
        ))}
      </div>
    </section>
  );
}

export default function OfficerProfileScreen() {
  const navigationItems = getDashboardNavigation("officer", "Profil");

  return (
    <MobileScreen className="bg-surface">
      <DashboardScreenShell
        background="bg-surface"
        navigationItems={navigationItems}
        contentClassName="[scrollbar-color:rgba(18,148,144,0.28)_transparent]"
      >
        <div className="bg-primary px-5 pb-14 pt-[calc(2.4rem+env(safe-area-inset-top))]">
          <div className="flex items-start gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[0.95rem] font-bold text-primary">
              BS
            </div>
            <div className="min-w-0 pt-0.5">
              <h1 className="truncate text-[1.36rem] font-bold tracking-[-0.03em] text-white">
                Udin Semleyot
              </h1>
              <p className="mt-1 text-[0.9rem] font-medium text-white/78">
                Bendahara
              </p>
            </div>
          </div>
        </div>

        <div className="-mt-7 px-4 pb-10">
          <SummaryCard />

          <MenuSection title="Akun" items={accountMenus} />
          <MenuSection title="Koperasi" items={cooperativeMenus} />

          <button
            type="button"
            className="mt-8 flex w-full items-center gap-3.5 rounded-[18px] border border-error bg-white px-4 py-3.5 text-left"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-error text-white bg-error">
              <Icon icon="solar:logout-2-bold" className="text-[1.15rem]" />
            </div>
            <span className="text-[1rem] font-semibold tracking-[-0.02em] text-error">
              Keluar dari Akun
            </span>
          </button>
        </div>
      </DashboardScreenShell>
    </MobileScreen>
  );
}
