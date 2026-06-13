"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import { getDashboardData, getDashboardNavigation } from "@/src/features/dashboard/data";
import type { DashboardCreditAccessItem } from "@/src/features/dashboard/types";

function AccessListItem({ item }: { item: DashboardCreditAccessItem }) {
  const content = (
    <>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-primary text-[1rem] font-bold text-white">
          {item.initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[1.02rem] font-bold leading-none tracking-[-0.03em] text-text">
                {item.title}
              </p>
              <p className="mt-2 text-[0.92rem] font-medium text-text/78">
                {item.subtitle}
              </p>
            </div>

            {item.statusLabel ? (
              <span
                className={`shrink-0 rounded-[6px] px-4 py-1.5 text-[0.92rem] font-semibold ${
                  item.statusTone === "active"
                    ? "bg-[#e4f6f7] text-primary"
                    : "bg-[#f2f2f2] text-text/28"
                }`}
              >
                {item.statusLabel}
              </span>
            ) : null}

            {item.detailHref ? (
              <Icon
                icon="solar:alt-arrow-right-linear"
                className="mt-1 shrink-0 text-[1.25rem] text-primary"
              />
            ) : null}
          </div>

          <div className="mt-3 h-[4px] w-full rounded-full bg-warning" />
        </div>
      </div>
    </>
  );

  if (item.detailHref) {
    return (
      <Link
        href={item.detailHref}
        className="block rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
}

export default function MemberCreditAccessListScreen() {
  const dashboard = getDashboardData("member");
  const sections = dashboard.creditAccessSections ?? [];

  return (
    <DashboardScreenShell
      background="bg-white"
      navigationItems={getDashboardNavigation("member", "Pinjaman")}
    >
      <div className="bg-white px-4 pb-8 pt-[calc(0.75rem+env(safe-area-inset-top))]">
        <DashboardPageHeader
          backHref="/dashboard/member/loans"
          title="Permintaan Akses Kredit"
          subtitle="Kelola permintaan akses data untuk akseleran"
          titleClassName="text-[1.18rem]"
          variant="compact"
        />

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.id}>
              <h2 className="text-[0.98rem] font-bold tracking-[-0.02em] text-primary">
                {section.title}
              </h2>

              <div className="mt-6 space-y-6">
                {section.items.map((item, index) => (
                  <div
                    key={item.id}
                    className={index === section.items.length - 1 ? "" : "border-b border-border pb-5"}
                  >
                    <AccessListItem item={item} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </DashboardScreenShell>
  );
}
