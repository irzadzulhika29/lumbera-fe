import Image from "next/image";
import Link from "next/link";

import type { DashboardAction } from "@/src/features/dashboard/types";

const quickActionIconMap = {
  savings: "/ornament/stock.svg",
  loan: "/ornament/transaction.svg",
  reports: "/ornament/report.svg",
} as const;

export default function QuickActions({
  actions,
}: {
  actions: DashboardAction[];
}) {
  return (
    <section aria-labelledby="quick-actions-title" className="mt-6">
      <div className="flex items-center justify-between gap-4">
        <h2
          id="quick-actions-title"
          className="text-[1.05rem] font-bold tracking-[-0.03em] text-primary"
        >
          Menu Cepat
        </h2>
       
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="group flex flex-col items-center gap-3 rounded-[18px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span
              className="flex h-[82px] w-full items-center justify-center rounded-[18px] bg-[linear-gradient(180deg,#E7F1F1_0%,#ACD5D4_100%)]"
            >
              {action.icon in quickActionIconMap ? (
                <Image
                  src={quickActionIconMap[action.icon as keyof typeof quickActionIconMap]}
                  alt=""
                  aria-hidden="true"
                  width={56}
                  height={56}
                  className="h-[52px] w-[52px] object-contain"
                />
              ) : null}
            </span>
            <span className="min-w-0 text-center">
              <strong className="block text-[0.76rem] font-bold leading-tight tracking-[-0.02em] text-text">
                {action.label}
              </strong>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
