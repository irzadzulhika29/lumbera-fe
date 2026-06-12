import Link from "next/link";

import type { DashboardTransaction } from "@/src/features/dashboard/types";

import TransactionList from "../common/TransactionList";

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

      <div className="mt-5">
        <TransactionList transactions={transactions} variant="compact" />
      </div>
    </section>
  );
}
