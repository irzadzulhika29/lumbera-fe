"use client";

import Image from "next/image";
import Link from "next/link";

const loanQuickActions = [
  {
    label: "Riwayat Pinjaman",
    icon: "/ornament/stock.svg",
    href: "/dashboard/member/loans/history",
  },
  {
    label: "Pengajuan Pinjaman",
    icon: "/ornament/transaction.svg",
    href: "/dashboard/member/loans/request",
  },
  {
    label: "Permintaan Akses Kredit",
    icon: "/ornament/report.svg",
    href: "/dashboard/member/loans/access",
  },
] as const satisfies ReadonlyArray<{
  href: string;
  icon: string;
  label: string;
}>;

export default function LoanQuickActions() {
  return (
    <section className="mt-6 grid grid-cols-3 gap-3">
      {loanQuickActions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className="flex flex-col items-center gap-3 rounded-[18px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span className="flex h-[82px] w-full items-center justify-center rounded-[18px] bg-[linear-gradient(180deg,#E7F1F1_0%,#ACD5D4_100%)]">
            <Image
              src={action.icon}
              alt=""
              aria-hidden="true"
              width={56}
              height={56}
              className="h-[52px] w-[52px] object-contain"
            />
          </span>
          <strong className="text-center text-[0.76rem] font-bold leading-[1.45] tracking-[-0.02em] text-text">
            {action.label}
          </strong>
        </Link>
      ))}
    </section>
  );
}
