"use client";

import type { DashboardSavingsMonthGroup } from "@/src/features/dashboard/types";

export default function SavingsHistoryList({
  groups,
}: {
  groups: DashboardSavingsMonthGroup[];
}) {
  return (
    <div className="mt-6 space-y-7">
      {groups.map((group) => (
        <section key={group.id}>
          <h3 className="text-[0.92rem] font-bold tracking-[-0.02em] text-primary">
            {group.label}
          </h3>

          <div className="mt-4 space-y-5">
            {group.transactions.map((transaction) => (
              <article key={transaction.id} className="flex items-start gap-3">
                <div className="w-8 shrink-0 text-center">
                  <p className="text-[1rem] font-bold leading-none text-text">
                    {transaction.dayLabel}
                  </p>
                  <p className="mt-1 text-[0.62rem] font-semibold tracking-[0.08em] text-text/38">
                    {transaction.monthLabel}
                  </p>
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-[0.98rem] font-bold leading-tight tracking-[-0.03em] text-text">
                    {transaction.title}
                  </h4>
                  <p className="mt-1 text-[0.76rem] font-medium text-text/72">
                    {transaction.dateLabel} - {transaction.actorLabel}
                  </p>
                </div>

                <p
                  className={`shrink-0 pt-1 text-[0.98rem] font-bold ${
                    transaction.direction === "outgoing"
                      ? "text-error"
                      : "text-primary"
                  }`}
                >
                  {transaction.amount}
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
