"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateFinancialConfiguration } from "@/src/features/onboarding/api/onboardingApi";
import {
  getAuthBankAccountHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import { isApiError } from "@/src/shared/api";

import {
  getOnboardingDraftSession,
  saveOnboardingDraftSession,
} from "../utils/onboardingDraftStorage";

export function useFinancialConfigurationForm(roleId: RoleOptionId) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [loanDuration, setLoanDuration] = useState("24");
  const [maxLoanPerMember, setMaxLoanPerMember] = useState("");
  const [loanInterestRate, setLoanInterestRate] = useState("");
  const [lateFeeRate, setLateFeeRate] = useState("");
  const [monthlyMandatorySavings, setMonthlyMandatorySavings] = useState("");

  const clearFormError = () => {
    if (formError) {
      setFormError("");
    }
  };

  const handleSubmit = async () => {
    if (!maxLoanPerMember) {
      setFormError("Batas pinjaman maks per anggota wajib diisi.");
      return;
    }

    if (!loanInterestRate) {
      setFormError("Bunga pinjaman wajib diisi.");
      return;
    }

    if (!lateFeeRate) {
      setFormError("Denda wajib diisi.");
      return;
    }

    if (!loanDuration) {
      setFormError("Masa pinjaman maksimal wajib diisi.");
      return;
    }

    if (!monthlyMandatorySavings) {
      setFormError("Simpanan wajib per bulan wajib diisi.");
      return;
    }

    const onboardingDraft = getOnboardingDraftSession(roleId);

    if (!onboardingDraft?.onboardingDraftId || !onboardingDraft.onboardingToken) {
      setFormError("Sesi onboarding tidak ditemukan. Ulangi dari awal.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      const response = await updateFinancialConfiguration({
        onboardingDraftId: onboardingDraft.onboardingDraftId,
        onboardingToken: onboardingDraft.onboardingToken,
        maxLoanAmountPerMember: Number(maxLoanPerMember),
        loanInterestRateBpsPerMonth: Math.round(Number(loanInterestRate) * 100),
        lateFeeRateBpsPerDay: Math.round(Number(lateFeeRate) * 100),
        maxLoanTermMonths: Number(loanDuration),
        mandatorySavingsPerMonth: Number(monthlyMandatorySavings),
      });

      saveOnboardingDraftSession(roleId, {
        ...onboardingDraft,
        onboardingDraftId: response.onboarding_draft_id,
        nextStep: response.next_step,
      });

      startTransition(() => {
        router.push(getAuthBankAccountHref(roleId));
      });
    } catch (requestError) {
      setFormError(
        isApiError(requestError)
          ? requestError.message
          : "Terjadi kesalahan saat menyimpan konfigurasi keuangan",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isPending,
    isSubmitting,
    formError,
    loanDuration,
    maxLoanPerMember,
    loanInterestRate,
    lateFeeRate,
    monthlyMandatorySavings,
    setLoanDuration: (value: string) => {
      setLoanDuration(value);
      clearFormError();
    },
    setMaxLoanPerMember: (value: string) => {
      setMaxLoanPerMember(value);
      clearFormError();
    },
    setLoanInterestRate: (value: string) => {
      setLoanInterestRate(value);
      clearFormError();
    },
    setLateFeeRate: (value: string) => {
      setLateFeeRate(value);
      clearFormError();
    },
    setMonthlyMandatorySavings: (value: string) => {
      setMonthlyMandatorySavings(value);
      clearFormError();
    },
    handleSubmit,
  };
}
