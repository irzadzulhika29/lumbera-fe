"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import LoanBreakdownCard from "@/src/features/dashboard/components/member/loans/LoanBreakdownCard";
import LoanEligibilityBanner from "@/src/features/dashboard/components/member/loans/LoanEligibilityBanner";
import { getDashboardNavigation } from "@/src/features/dashboard/data";
import BaseInput from "@/src/shared/components/ui/BaseInput";
import CurrencyInput from "@/src/shared/components/ui/CurrencyInput";
import PressButton from "@/src/shared/components/ui/PressButton";
import SelectField from "@/src/shared/components/ui/SelectField";

const tenorOptions = [
  { label: "3 Bulan", value: "3" },
  { label: "6 Bulan", value: "6" },
  { label: "12 Bulan", value: "12" },
] as const;

export default function MemberLoanRequestScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tenor, setTenor] = useState("3");

  return (
    <DashboardScreenShell
      background="bg-white"
      navigationItems={getDashboardNavigation("member", "Pinjaman")}
    >
      <div className="bg-white px-4 pb-7 pt-[calc(0.75rem+env(safe-area-inset-top))]">
        <DashboardPageHeader
          backHref="/dashboard/member/loans"
          title="Pengajuan Pinjaman"
          subtitle="Ajukan pinjaman untuk operasional anda"
          titleClassName="text-[1.18rem]"
          variant="compact"
        />

        <div className="mt-5">
          <LoanEligibilityBanner />
        </div>

        <div className="mt-6 space-y-5">
          <CurrencyInput
            label="Nominal pinjaman"
            value={amount}
            onValueChange={setAmount}
            placeholder=""
            startAdornment={
              <span className="text-[1.05rem] font-bold text-text/72">Rp</span>
            }
          />

          <BaseInput
            label="Tujuan pinjaman"
            value={purpose}
            onChange={(event) => setPurpose(event.target.value)}
            placeholder=""
          />

          <SelectField
            label="Tenor (Jangka Waktu)"
            value={tenor}
            options={[...tenorOptions]}
            onChange={setTenor}
            fieldClassName="py-3.5"
          />

          <LoanBreakdownCard />
        </div>

        <PressButton
          type="button"
          className="mt-6 w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
          onClick={() => router.push("/dashboard/member/loans/request/success")}
        >
          Ajukan pinjaman
        </PressButton>
      </div>
    </DashboardScreenShell>
  );
}
