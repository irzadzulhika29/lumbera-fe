import Link from "next/link";

import type { DashboardTransaction } from "@/src/features/dashboard/types";

const avatarClasses = {
  teal: "bg-[#2f68ab] text-white",
  blue: "bg-[#2f68ab] text-white",
} as const;

const statusClasses = {
  success: "text-primary",
  warning: "text-warning",
} as const;

export default function RecentTransactions({
  transactions,
}: {
  transactions: DashboardTransaction[];
}) {
  return (
    <section aria-labelledby="recent-transactions-title" className="mt-10">
      <div className="flex items-center justify-between gap-4">
        <h2
          id="recent-transactions-title"
          className="text-[1.05rem] font-bold tracking-[-0.03em] text-primary"
        >
          Transaksi Terbaru
        </h2>
        <Link
          href="/dashboard/transactions"
          className="text-[0.78rem] font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Lihat semua
        </Link>
      </div>

      <div className="mt-5 space-y-5">
        {transactions.map((transaction) => (
          <article key={transaction.id} className="flex items-start gap-3">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[0.9rem] font-bold ${avatarClasses[transaction.avatarTone]}`}
            >
              {transaction.initials}
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
              <h3 className="truncate text-[0.98rem] font-bold leading-tight tracking-[-0.03em] text-text">
                {transaction.name}
              </h3>
              <p className="mt-1 truncate text-[0.72rem] font-medium text-text/80">
                {transaction.description}
              </p>
            </div>

            <div className="shrink-0 pt-0.5 text-right">
              <p className="text-[0.95rem] font-bold leading-tight text-text/70">
                {transaction.amount}
              </p>
              <p
                className={`mt-2 text-[0.72rem] font-semibold ${statusClasses[transaction.statusTone]}`}
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
