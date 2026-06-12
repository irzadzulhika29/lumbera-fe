import Link from "next/link";

import type { DashboardTransaction } from "@/src/features/dashboard/types";

const avatarClasses = {
  teal: "bg-[#e1f5f3] text-primary",
  blue: "bg-[#eaf2ff] text-secondary",
} as const;

const statusClasses = {
  success: "text-success before:bg-success",
  warning: "text-warning before:bg-warning",
} as const;

export default function RecentTransactions({
  transactions,
}: {
  transactions: DashboardTransaction[];
}) {
  return (
    <section aria-labelledby="recent-transactions-title" className="mt-6">
      <div className="flex items-center justify-between gap-4">
        <h2
          id="recent-transactions-title"
          className="text-[0.98rem] font-bold tracking-[-0.02em] text-text"
        >
          Transaksi Terbaru
        </h2>
        <Link
          href="/dashboard/transactions"
          className="text-[0.78rem] font-bold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="mt-3 space-y-2">
        {transactions.map((transaction) => (
          <article
            key={transaction.id}
            className="flex items-center gap-3 rounded-[14px] bg-white px-3.5 py-3 shadow-[0_3px_18px_rgba(31,41,55,0.035)]"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[0.72rem] font-bold ${avatarClasses[transaction.avatarTone]}`}
            >
              {transaction.initials}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[0.79rem] font-bold leading-tight text-text">
                {transaction.name}
              </h3>
              <p className="mt-1 truncate text-[0.67rem] font-medium text-[#9aa4b2]">
                {transaction.description}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-[0.79rem] font-bold leading-tight text-success">
                {transaction.amount}
              </p>
              <p
                className={`mt-1 flex items-center justify-end gap-1 text-[0.66rem] font-medium before:h-1.5 before:w-1.5 before:rounded-full ${statusClasses[transaction.statusTone]}`}
              >
                {transaction.status}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
