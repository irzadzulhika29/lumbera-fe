"use client";

import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const loanQuickActions = [
  {
    enabledKey: "history_enabled",
    label: "Riwayat Pinjaman",
    icon: "/ornament/stock.svg",
    href: "/dashboard/member/loans/history",
  },
  {
    enabledKey: "loan_application_enabled",
    label: "Pengajuan Pinjaman",
    icon: "/ornament/transaction.svg",
    href: "/dashboard/member/loans/request",
  },
  {
    enabledKey: "credit_access_enabled",
    label: "Permintaan Akses Kredit",
    icon: "/ornament/report.svg",
    href: "/dashboard/member/loans/access",
  },
] as const satisfies ReadonlyArray<{
  enabledKey:
    | "history_enabled"
    | "loan_application_enabled"
    | "credit_access_enabled";
  href: string;
  icon: string;
  label: string;
}>;

type LoanQuickActionsProps = {
  actionsState?: {
    history_enabled: boolean;
    loan_application_enabled: boolean;
    credit_access_enabled: boolean;
  };
};

export default function LoanQuickActions({
  actionsState,
}: LoanQuickActionsProps) {
  return (
    <section className="mt-6 grid grid-cols-3 gap-3">
      {loanQuickActions.map((action) => {
        const enabled = actionsState?.[action.enabledKey] ?? true;
        const sharedContent = (
          <>
            <span
              className={twMerge(
                "flex h-[82px] w-full items-center justify-center rounded-[18px] bg-[linear-gradient(180deg,#E7F1F1_0%,#ACD5D4_100%)] transition-opacity",
                enabled ? "" : "opacity-45",
              )}
            >
              <Image
                src={action.icon}
                alt=""
                aria-hidden="true"
                width={56}
                height={56}
                className="h-[52px] w-[52px] object-contain"
              />
            </span>
            <strong
              className={twMerge(
                "text-center text-[0.76rem] font-bold leading-[1.45] tracking-[-0.02em] text-text",
                enabled ? "" : "text-text/35",
              )}
            >
              {action.label}
            </strong>
          </>
        );

        return enabled ? (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-3 rounded-[18px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {sharedContent}
          </Link>
        ) : (
          <div
            key={action.label}
            aria-disabled="true"
            className="flex cursor-not-allowed flex-col items-center gap-3 rounded-[18px]"
          >
            {sharedContent}
          </div>
        );
      })}
    </section>
  );
}
