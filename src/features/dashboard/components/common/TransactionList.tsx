import type { DashboardTransaction } from "@/src/features/dashboard/types";

type TransactionListProps = {
  transactions: DashboardTransaction[];
  variant?: "compact" | "default";
};

export default function TransactionList({
  transactions,
  variant = "default",
}: TransactionListProps) {
  const compact = variant === "compact";

  return (
    <div className={compact ? "space-y-5" : "space-y-7"}>
      {transactions.map((transaction) => (
        <article
          key={transaction.id}
          className={`flex items-start ${compact ? "gap-3" : "gap-3.5"}`}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-[0.92rem] font-bold text-white">
            {transaction.initials}
          </div>

          <div className={`min-w-0 flex-1 ${compact ? "pt-0.5" : ""}`}>
            <h3 className="truncate text-[0.98rem] font-bold leading-tight tracking-[-0.03em] text-text">
              {transaction.name}
            </h3>
            <p
              className={`mt-1 truncate font-medium ${
                compact
                  ? "text-[0.72rem] text-text/80"
                  : "text-[0.78rem] text-text/82"
              }`}
            >
              {transaction.description}
            </p>
          </div>

          <div className={`shrink-0 text-right ${compact ? "pt-0.5" : ""}`}>
            <p
              className={`font-bold leading-tight ${
                compact
                  ? "text-[0.95rem] text-text/70"
                  : "text-[0.96rem] text-text/66"
              }`}
            >
              {transaction.amount}
            </p>
            <p
              className={`mt-2 font-semibold ${
                compact ? "text-[0.72rem]" : "text-[0.76rem]"
              } ${
                transaction.statusTone === "success"
                  ? "text-primary"
                  : "text-warning"
              }`}
            >
              {transaction.status}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
