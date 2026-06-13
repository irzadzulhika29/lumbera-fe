import { Icon } from "@iconify/react";
import Link from "next/link";

import type { DashboardTransaction } from "@/src/features/dashboard/types";
import NextIcon from "./NextIcon";

type TransactionListProps = {
  transactions: DashboardTransaction[];
  variant?: "compact" | "default" | "member";
};

function MemberTransactionIcon({
  direction,
}: {
  direction?: "incoming" | "outgoing";
}) {
  const outgoing = direction === "outgoing";

  return (
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white ${
        outgoing ? "bg-[#ef4444]" : "bg-primary"
      }`}
    >
      <Icon
        icon={outgoing ? "solar:arrow-down-linear" : "solar:arrow-up-linear"}
        className="text-[1.25rem]"
        aria-hidden="true"
      />
    </div>
  );
}

export default function TransactionList({
  transactions,
  variant = "default",
}: TransactionListProps) {
  const compact = variant === "compact";
  const member = variant === "member";

  return (
    <div className={compact ? "space-y-5" : "space-y-7"}>
      {transactions.map((transaction) => (
        <Link
          key={transaction.id}
          href={transaction.href}
          className={`flex items-start ${compact ? "gap-3" : "gap-3.5"} rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
        >
          {member ? (
            <MemberTransactionIcon direction={transaction.direction} />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-[0.92rem] font-bold text-white">
              {transaction.initials}
            </div>
          )}

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

          <div
            className={`shrink-0 ${compact ? "pt-0.5" : ""} flex items-start gap-2`}
          >
            <div className="text-right">
              <p
                className={`font-bold leading-tight ${
                  member
                    ? transaction.direction === "outgoing"
                      ? "text-[1.02rem] text-[#ef4444]"
                      : "text-[1.02rem] text-primary"
                    : compact
                      ? "text-[0.95rem] text-text/70"
                      : "text-[0.96rem] text-text/66"
                }`}
              >
                {transaction.amount}
              </p>

              {member ? null : (
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
              )}
            </div>

            {member ? null : <NextIcon className="mt-[1px] text-text/28" />}
          </div>
        </Link>
      ))}
    </div>
  );
}
