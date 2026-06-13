"use client";

import { Icon } from "@iconify/react";

import MobileScreen from "@/src/shared/components/layout/MobileScreen";
import { getDashboardNavigation } from "@/src/features/dashboard/data";
import DashboardBottomNavigation from "../../layout/DashboardBottomNavigation";

const accountMenus = [
  {
    label: "Edit Profil",
    icon: "solar:user-linear",
    iconBg: "bg-[#e5f3f3]",
    iconColor: "text-[#118B87]",
  },
  {
    label: "Ganti Nomor HP",
    icon: "solar:phone-linear",
    iconBg: "bg-[#f1f5f9]",
    iconColor: "text-[#3b82f6]", // Blue tint as in image
  },
  {
    label: "Keamanan & PIN",
    icon: "solar:lock-password-linear",
    iconBg: "bg-[#e5f3f3]",
    iconColor: "text-[#22c55e]", // Green tint
  },
];

const cooperativeMenus = [
  {
    label: "Info Koperasi Padiwangi",
    icon: "solar:home-smile-linear",
    iconBg: "bg-[#fef3c7]",
    iconColor: "text-[#d97706]", // Orange tint
  },
  {
    label: "Undang Pengurus Baru",
    icon: "solar:user-plus-linear",
    iconBg: "bg-[#f3e8ff]",
    iconColor: "text-[#9333ea]", // Purple tint
  },
];

export default function OfficerProfileScreen() {
  const navigationItems = getDashboardNavigation("officer", "Profil");

  return (
    <MobileScreen className="bg-[#f7f8f9]">
      <section className="flex h-[100svh] w-full flex-none flex-col overflow-hidden bg-[#f7f8f9] sm:h-[860px]">
        <div className="min-h-0 flex-1 flex flex-col overflow-y-auto overscroll-contain bg-primary [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.35)_transparent]">
          
          {/* Header Profile Section */}
          <header className="px-5 pb-6 pt-[calc(2.5rem+env(safe-area-inset-top))] flex-none">
            <div className="flex items-center gap-4">
              <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full bg-white text-[1.65rem] font-extrabold text-primary">
                AS
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="truncate text-[1.5rem] font-bold tracking-tight text-white">
                  Pak Asep Suryadi
                </h1>
                <div className="mt-1.5 inline-flex h-7 items-center justify-center rounded-full bg-white/20 px-3.5 text-[0.8rem] font-bold text-white backdrop-blur-sm">
                  Bendahara
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 rounded-[12px] bg-white/10 px-3.5 py-2.5 backdrop-blur-sm">
                <p className="text-[0.75rem] font-medium text-white/80">Koperasi</p>
                <p className="mt-0.5 text-[0.95rem] font-bold text-white">Padiwangi</p>
              </div>
              <div className="flex-1 rounded-[12px] bg-white/10 px-3.5 py-2.5 backdrop-blur-sm">
                <p className="text-[0.75rem] font-medium text-white/80">Bergabung</p>
                <p className="mt-0.5 text-[0.95rem] font-bold text-white">2018</p>
              </div>
              <div className="flex-1 rounded-[12px] bg-white/10 px-3.5 py-2.5 backdrop-blur-sm">
                <p className="text-[0.75rem] font-medium text-white/80">CHS</p>
                <p className="mt-0.5 text-[0.95rem] font-bold text-white">78 · A</p>
              </div>
            </div>
          </header>

          {/* Menus Section */}
          <div className="flex-1 rounded-t-[24px] bg-[#fafafa] px-5 pb-10 pt-6 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
            
            {/* AKUN */}
            <div className="mb-6">
              <h2 className="mb-3 pl-1 text-[0.8rem] font-bold tracking-widest text-[#94a3b8]">
                AKUN
              </h2>
              <div className="overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-white shadow-sm">
                {accountMenus.map((menu, index) => (
                  <button
                    key={menu.label}
                    className={`flex w-full items-center justify-between px-4 py-4 transition-colors hover:bg-[#f8fafc] active:bg-[#f1f5f9] ${
                      index !== accountMenus.length - 1 ? "border-b border-[#f1f5f9]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`flex h-[2.5rem] w-[2.5rem] shrink-0 items-center justify-center rounded-[10px] ${menu.iconBg}`}>
                        <Icon icon={menu.icon} className={`text-[1.25rem] ${menu.iconColor}`} />
                      </div>
                      <span className="text-[1rem] font-bold text-[#1e293b]">
                        {menu.label}
                      </span>
                    </div>
                    <Icon icon="solar:alt-arrow-right-linear" className="text-[1.2rem] text-[#cbd5e1]" />
                  </button>
                ))}
              </div>
            </div>

            {/* KOPERASI */}
            <div className="mb-6">
              <h2 className="mb-3 pl-1 text-[0.8rem] font-bold tracking-widest text-[#94a3b8]">
                KOPERASI
              </h2>
              <div className="overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-white shadow-sm">
                {cooperativeMenus.map((menu, index) => (
                  <button
                    key={menu.label}
                    className={`flex w-full items-center justify-between px-4 py-4 transition-colors hover:bg-[#f8fafc] active:bg-[#f1f5f9] ${
                      index !== cooperativeMenus.length - 1 ? "border-b border-[#f1f5f9]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`flex h-[2.5rem] w-[2.5rem] shrink-0 items-center justify-center rounded-[10px] ${menu.iconBg}`}>
                        <Icon icon={menu.icon} className={`text-[1.25rem] ${menu.iconColor}`} />
                      </div>
                      <span className="text-[1rem] font-bold text-[#1e293b]">
                        {menu.label}
                      </span>
                    </div>
                    <Icon icon="solar:alt-arrow-right-linear" className="text-[1.2rem] text-[#cbd5e1]" />
                  </button>
                ))}
              </div>
            </div>

            {/* KELUAR */}
            <button className="flex w-full items-center gap-3.5 rounded-[16px] border border-[#fecaca] bg-[#fff5f5] px-4 py-4 transition-colors hover:bg-[#fee2e2] active:bg-[#fecaca]">
              <div className="flex h-[2.5rem] w-[2.5rem] shrink-0 items-center justify-center rounded-[10px] bg-[#fee2e2]">
                <Icon icon="solar:logout-2-linear" className="text-[1.25rem] text-[#ef4444]" />
              </div>
              <span className="text-[1rem] font-bold text-[#ef4444]">
                Keluar dari Akun
              </span>
            </button>

          </div>
        </div>

        <DashboardBottomNavigation items={navigationItems} />
      </section>
    </MobileScreen>
  );
}
