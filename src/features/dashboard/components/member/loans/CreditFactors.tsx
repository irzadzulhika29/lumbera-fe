"use client";

import type { DashboardCreditFactor } from "@/src/features/dashboard/types";
import PressButton from "@/src/shared/components/ui/PressButton";

export default function CreditFactors({
  factors,
}: {
  factors: DashboardCreditFactor[];
}) {
  return (
    <div className="px-5 pt-4">
      <h3 className="text-[1.02rem] font-bold tracking-[-0.025em] text-text">
        Faktor Penilaian (5C)
      </h3>

      <div className="mt-4 grid grid-cols-5 gap-3">
        {factors.map((factor) => (
          <div key={factor.id} className="text-center">
            <div className="flex h-12 items-center justify-center rounded-[12px] bg-[#e7f2f3] text-[1.7rem] font-bold leading-none tracking-[-0.04em] text-primary">
              {factor.score ?? "-"}
            </div>
            <p className="mt-2 text-[0.74rem] font-medium leading-snug text-text">
              {factor.label}
            </p>
            <p className="mt-1 text-[0.74rem] font-medium leading-snug text-text">
              ({factor.weightLabel})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
