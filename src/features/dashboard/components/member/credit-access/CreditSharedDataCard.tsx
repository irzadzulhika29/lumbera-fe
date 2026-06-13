"use client";

import { Icon } from "@iconify/react";

export default function CreditSharedDataCard({
  sharedDataItems,
  hiddenDataItems,
}: {
  sharedDataItems: string[];
  hiddenDataItems: string[];
}) {
  return (
    <section className="rounded-[14px] border border-border bg-white px-4 py-4 shadow-sm">
      <h2 className="text-[1.08rem] font-bold tracking-[-0.025em] text-primary">
        Data yang akan dibagikan
      </h2>

      <div className="mt-4 space-y-4">
        {sharedDataItems.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <Icon icon="solar:check-read-linear" className="text-[0.9rem]" />
            </span>
            <p className="text-[0.92rem] font-bold leading-snug text-text">
              {item}
            </p>
          </div>
        ))}

        {hiddenDataItems.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#CFCFCF] text-white">
              <Icon icon="solar:check-read-linear" className="text-[0.9rem]" />
            </span>
            <p className="text-[0.92rem] font-medium leading-snug text-text/34">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
