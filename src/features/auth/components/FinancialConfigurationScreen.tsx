"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";

import { getAuthCooperativeProfileHref, type RoleOptionId } from "@/src/features/onboarding/content";
import BaseInput from "@/src/shared/components/ui/BaseInput";
import CurrencyInput from "@/src/shared/components/ui/CurrencyInput";
import SelectField from "@/src/shared/components/ui/SelectField";

import AuthFooterNote from "./common/AuthFooterNote";
import AuthStepActions from "./common/AuthStepActions";
import { useFinancialConfigurationForm } from "../hooks/useFinancialConfigurationForm";

const LOAN_DURATION_OPTIONS = [
  { label: "12 Bulan", value: "12" },
  { label: "18 Bulan", value: "18" },
  { label: "24 Bulan", value: "24" },
  { label: "36 Bulan", value: "36" },
] as const;

function CurrencyAdornment() {
  return <span className="text-lg font-semibold leading-none text-text/72">Rp</span>;
}

function PercentageAdornment({ period }: { period: string }) {
  return (
    <span className="text-sm font-medium leading-none text-text/62">
      % per {period}
    </span>
  );
}

type FinancialConfigurationScreenProps = {
  roleId: RoleOptionId;
};

export default function FinancialConfigurationScreen({
  roleId,
}: FinancialConfigurationScreenProps) {
  const router = useRouter();
  const {
    isPending,
    isSubmitting,
    formError,
    loanDuration,
    maxLoanPerMember,
    loanInterestRate,
    lateFeeRate,
    monthlyMandatorySavings,
    setLoanDuration,
    setMaxLoanPerMember,
    setLoanInterestRate,
    setLateFeeRate,
    setMonthlyMandatorySavings,
    handleSubmit,
  } = useFinancialConfigurationForm(roleId);

  return (
    <>
      <div>
        <h1 className="text-[2.05rem] font-bold leading-none tracking-[-0.04em]">
          Konfigurasi Keuangan
        </h1>
        <p className="mt-4 text-[1.08rem] leading-snug text-text/78">
          Atur parameter pinjaman dan simpanan koperasi
        </p>
      </div>

      <div className="mt-10 space-y-5">
        <CurrencyInput
          label={
            <>
              Batas Pinjaman Maks per Anggota <span className="text-error">*</span>
            </>
          }
          value={maxLoanPerMember}
          onValueChange={setMaxLoanPerMember}
          fieldClassName="px-4 py-3"
          inputClassName="text-base"
          startAdornment={<CurrencyAdornment />}
        />

        <div className="grid grid-cols-2 gap-3">
          <BaseInput
            label={
              <>
                Bunga Pinjaman <span className="text-error">*</span>
              </>
            }
            fieldClassName="px-3 py-3"
            inputClassName="text-base"
            inputMode="decimal"
            endAdornment={<PercentageAdornment period="bulan" />}
            value={loanInterestRate}
            onChange={(event) =>
              setLoanInterestRate(
                event.target.value.replace(",", ".").replace(/[^0-9.]/g, ""),
              )
            }
          />

          <BaseInput
            label={
              <>
                Denda <span className="text-error">*</span>
              </>
            }
            fieldClassName="px-3 py-3"
            inputClassName="text-base"
            inputMode="decimal"
            endAdornment={<PercentageAdornment period="hari" />}
            value={lateFeeRate}
            onChange={(event) =>
              setLateFeeRate(
                event.target.value.replace(",", ".").replace(/[^0-9.]/g, ""),
              )
            }
          />
        </div>

        <SelectField
          label={
            <>
              Masa Pinjaman Maksimal <span className="text-error">*</span>
            </>
          }
          value={loanDuration}
          options={LOAN_DURATION_OPTIONS.map((option) => ({
            label: option.label,
            value: option.value,
          }))}
          onChange={setLoanDuration}
          fieldClassName="py-3"
        />

        <CurrencyInput
          label={
            <>
              Simpanan Wajib per Bulan <span className="text-error">*</span>
            </>
          }
          value={monthlyMandatorySavings}
          onValueChange={setMonthlyMandatorySavings}
          fieldClassName="px-4 py-3"
          inputClassName="text-base"
          startAdornment={<CurrencyAdornment />}
        />

        <div className="rounded-lg bg-primary-light px-4 py-3 text-[0.88rem] leading-relaxed text-primary/90">
          Pengaturan ini dapat diubah kapan saja di menu Pengaturan Koperasi
        </div>
      </div>

      <div className="mt-auto pt-12">
        <AuthStepActions
          onBack={() =>
            startTransition(() => {
              router.push(getAuthCooperativeProfileHref(roleId));
            })
          }
          onNext={handleSubmit}
          isNextDisabled={isPending || isSubmitting}
          nextLabel={isSubmitting ? "Menyimpan..." : "Lanjut"}
        />
        {formError ? <p className="mt-3 text-sm text-error">{formError}</p> : null}
        <AuthFooterNote />
      </div>
    </>
  );
}
