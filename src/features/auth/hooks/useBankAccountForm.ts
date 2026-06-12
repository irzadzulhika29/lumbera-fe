"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateBankAccount } from "@/src/features/onboarding/api/onboardingApi";
import {
  getAuthActivationHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import { isApiError } from "@/src/shared/api";

import {
  getOnboardingDraftSession,
  saveOnboardingDraftSession,
} from "../utils/onboardingDraftStorage";

export const BANK_OPTIONS = [
  { label: "Bank Rakyat Indonesia", value: "bri" },
  { label: "Bank Mandiri", value: "mandiri" },
  { label: "Bank Central Asia", value: "bca" },
  { label: "Bank Negara Indonesia", value: "bni" },
] as const;

const BANK_NAME_MAP = {
  bri: "Bank Rakyat Indonesia",
  mandiri: "Bank Mandiri",
  bca: "Bank Central Asia",
  bni: "Bank Negara Indonesia",
} as const;

export function useBankAccountForm(roleId: RoleOptionId) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [bank, setBank] = useState("bri");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountHolderName, setBankAccountHolderName] = useState("");

  const clearFormError = () => {
    if (formError) {
      setFormError("");
    }
  };

  const handleSubmit = async () => {
    if (!bank) {
      setFormError("Bank wajib dipilih.");
      return;
    }

    if (!bankAccountNumber.trim()) {
      setFormError("Nomor rekening wajib diisi.");
      return;
    }

    if (!bankAccountHolderName.trim()) {
      setFormError("Nama pemilik rekening wajib diisi.");
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
      const response = await updateBankAccount({
        onboardingDraftId: onboardingDraft.onboardingDraftId,
        onboardingToken: onboardingDraft.onboardingToken,
        bankName: BANK_NAME_MAP[bank as keyof typeof BANK_NAME_MAP],
        bankAccountNumber: bankAccountNumber.trim(),
        bankAccountHolderName: bankAccountHolderName.trim(),
      });

      saveOnboardingDraftSession(roleId, {
        ...onboardingDraft,
        onboardingDraftId: response.onboarding_draft_id,
        nextStep: response.next_step,
      });

      startTransition(() => {
        router.push(getAuthActivationHref(roleId));
      });
    } catch (requestError) {
      setFormError(
        isApiError(requestError)
          ? requestError.message
          : "Terjadi kesalahan saat menyimpan rekening koperasi",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isPending,
    isSubmitting,
    formError,
    bank,
    bankAccountNumber,
    bankAccountHolderName,
    handleSubmit,
    setBank: (value: string) => {
      setBank(value);
      clearFormError();
    },
    setBankAccountNumber: (value: string) => {
      setBankAccountNumber(value.replace(/\D/g, ""));
      clearFormError();
    },
    setBankAccountHolderName: (value: string) => {
      setBankAccountHolderName(value);
      clearFormError();
    },
  };
}
