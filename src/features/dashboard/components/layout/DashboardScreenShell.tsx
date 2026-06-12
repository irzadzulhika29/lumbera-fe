import { twMerge } from "tailwind-merge";

import type { DashboardNavigationItem } from "@/src/features/dashboard/types";

import DashboardBottomNavigation from "./DashboardBottomNavigation";

type DashboardScreenShellProps = {
  background?: string;
  children: React.ReactNode;
  contentClassName?: string;
  navigationItems?: DashboardNavigationItem[];
  scrollable?: boolean;
};

export default function DashboardScreenShell({
  background = "bg-white",
  children,
  contentClassName,
  navigationItems,
  scrollable = true,
}: DashboardScreenShellProps) {
  return (
    <section
      className={twMerge(
        "flex h-[100svh] w-full flex-none flex-col overflow-hidden sm:h-[860px]",
        background,
      )}
    >
      <div
        className={twMerge(
          "min-h-0 flex-1",
          scrollable
            ? "overflow-y-auto overscroll-contain [scrollbar-color:rgba(18,148,144,0.35)_transparent] [scrollbar-width:thin]"
            : "overflow-hidden",
          contentClassName,
        )}
      >
        {children}
      </div>

      {navigationItems ? (
        <DashboardBottomNavigation items={navigationItems} />
      ) : null}
    </section>
  );
}
