import Link from "next/link";

import type { DashboardAction } from "@/src/features/dashboard/types";

import DashboardIcon from "./DashboardIcon";

const toneClasses = {
  teal: "bg-[#e3f6f4] text-primary",
  blue: "bg-[#eaf2ff] text-[#3478ce]",
  green: "bg-[#eafaf2] text-[#24b86f]",
  orange: "bg-[#fff3e6] text-[#ff7b22]",
} as const;

export default function QuickActions({
  actions,
}: {
  actions: DashboardAction[];
}) {
  return (
    <section aria-labelledby="quick-actions-title" className="mt-6">
      <h2
        id="quick-actions-title"
        className="text-[0.98rem] font-bold tracking-[-0.02em] text-text"
      >
        Transaksi Cepat
      </h2>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="group flex min-h-[82px] items-center gap-3 rounded-[17px] border border-[#dde2e7] bg-white px-3.5 py-3 transition duration-150 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_8px_22px_rgba(18,148,144,0.09)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${toneClasses[action.tone]}`}
            >
              <DashboardIcon name={action.icon} className="h-[23px] w-[23px]" />
            </span>
            <span className="min-w-0">
              <strong className="block truncate text-[0.88rem] font-bold leading-tight text-text">
                {action.label}
              </strong>
              <span className="mt-1 block truncate text-[0.72rem] font-medium text-[#9aa4b2]">
                {action.description}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
