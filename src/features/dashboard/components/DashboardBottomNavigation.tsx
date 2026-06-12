import Link from "next/link";

import type { DashboardNavigationItem } from "@/src/features/dashboard/types";

import DashboardIcon from "./DashboardIcon";

export default function DashboardBottomNavigation({
  items,
}: {
  items: DashboardNavigationItem[];
}) {
  return (
    <nav
      aria-label="Navigasi utama"
      className="z-20 grid shrink-0 grid-cols-4 border-t border-[#e2e6ea] bg-white/96 px-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur"
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          className={`flex min-w-0 flex-col items-center gap-1 text-[0.64rem] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary ${
            item.active
              ? "text-primary"
              : "text-[#a3acba] hover:text-[#6f7b8c]"
          }`}
        >
          <DashboardIcon name={item.icon} className="h-[23px] w-[23px]" />
          <span className="truncate">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
