"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  submitMemberLoanApplication,
  type MemberLoanApplicationResponse,
} from "@/src/features/dashboard/api";
import DashboardPageHeader from "@/src/features/dashboard/components/layout/DashboardPageHeader";
import DashboardScreenShell from "@/src/features/dashboard/components/layout/DashboardScreenShell";
import LoanBreakdownCard from "@/src/features/dashboard/components/member/loans/LoanBreakdownCard";
import LoanEligibilityBanner from "@/src/features/dashboard/components/member/loans/LoanEligibilityBanner";
import { getDashboardNavigation } from "@/src/features/dashboard/data";
import { saveMemberLoanApplicationResult } from "@/src/features/dashboard/utils/memberLoanApplicationStorage";
import { isApiError } from "@/src/shared/api";
import BaseInput from "@/src/shared/components/ui/BaseInput";
import CurrencyInput from "@/src/shared/components/ui/CurrencyInput";
import PressButton from "@/src/shared/components/ui/PressButton";
import SelectField from "@/src/shared/components/ui/SelectField";

const tenorOptions = [
  { label: "3 Bulan", value: "3" },
  { label: "6 Bulan", value: "6" },
  { label: "12 Bulan", value: "12" },
] as const;

const INTEREST_RATE_PER_MONTH = 0.015;

function formatInterestRateLabel(rate: number) {
  return `${rate.toFixed(1).replace(".", ",")}%`;
}

function getPreviewBreakdown(amount: number, termMonths: number) {
  if (!amount || !termMonths) {
    return {
      monthlyInstallment: 0,
      totalInterestAmount: 0,
    };
  }

  const totalInterestAmount = Math.round(
    amount * INTEREST_RATE_PER_MONTH * termMonths,
  );

  return {
    totalInterestAmount,
    monthlyInstallment: Math.round((amount + totalInterestAmount) / termMonths),
  };
}

export default function MemberLoanRequestScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tenor, setTenor] = useState("3");
  const [amountError, setAmountError] = useState("");
  const [purposeError, setPurposeError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const amountValue = Number(amount || "0");
  const termMonths = Number(tenor || "0");
  const preview = getPreviewBreakdown(amountValue, termMonths);

  const handleSuccess = (response: MemberLoanApplicationResponse) => {
    saveMemberLoanApplicationResult(response.data);
    router.push("/dashboard/member/loans/request/success");
  };

  const handleSubmit = async () => {
    const trimmedPurpose = purpose.trim();
    let hasError = false;

    if (!amountValue || amountValue <= 0) {
      setAmountError("Nominal pinjaman wajib diisi");
      hasError = true;
    }

    if (!trimmedPurpose) {
      setPurposeError("Tujuan pinjaman wajib diisi");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setAmountError("");
    setPurposeError("");
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await submitMemberLoanApplication({
        amount: amountValue,
        purpose: trimmedPurpose,
        termMonths,
      });

      handleSuccess(response);
    } catch (requestError) {
      setSubmitError(
        isApiError(requestError)
          ? requestError.message
          : "Terjadi kesalahan saat mengirim pengajuan pinjaman",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            onValueChange={(nextValue) => {
              setAmount(nextValue);

              if (amountError) {
                setAmountError("");
              }

              if (submitError) {
                setSubmitError("");
              }
            }}
            error={amountError}
            placeholder=""
            startAdornment={
              <span className="text-[1.05rem] font-bold text-text/72">Rp</span>
            }
          />

          <BaseInput
            label="Tujuan pinjaman"
            value={purpose}
            onChange={(event) => {
              setPurpose(event.target.value);

              if (purposeError) {
                setPurposeError("");
              }

              if (submitError) {
                setSubmitError("");
              }
            }}
            error={purposeError}
            placeholder=""
          />

          <SelectField
            label="Tenor (Jangka Waktu)"
            value={tenor}
            options={[...tenorOptions]}
            onChange={(nextValue) => {
              setTenor(nextValue);

              if (submitError) {
                setSubmitError("");
              }
            }}
            fieldClassName="py-3.5"
          />

          <LoanBreakdownCard
            monthlyInstallment={preview.monthlyInstallment}
            totalInterestAmount={preview.totalInterestAmount}
            interestRateLabel={formatInterestRateLabel(
              INTEREST_RATE_PER_MONTH * 100,
            )}
          />
        </div>

        {submitError ? (
          <p className="mt-4 text-sm text-error">{submitError}</p>
        ) : null}

        <PressButton
          type="button"
          className="mt-6 w-full rounded-[12px] py-3.5 text-[0.98rem] font-bold"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Memproses..." : "Ajukan pinjaman"}
        </PressButton>
      </div>
    </DashboardScreenShell>
  );
}
