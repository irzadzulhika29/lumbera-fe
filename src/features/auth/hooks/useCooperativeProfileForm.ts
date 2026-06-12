"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateCooperativeProfile } from "@/src/features/onboarding/api/onboardingApi";
import {
  getAuthFinancialConfigHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import { isApiError } from "@/src/shared/api";
import {
  getOnboardingDraftSession,
  saveOnboardingDraftSession,
} from "../utils/onboardingDraftStorage";

export function useCooperativeProfileForm(roleId: RoleOptionId) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [cooperativeName, setCooperativeName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [address, setAddress] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");

  const clearFormError = () => {
    if (formError) {
      setFormError("");
    }
  };

  const handleSubmit = async () => {
    if (!cooperativeName.trim()) {
      setFormError("Nama koperasi wajib diisi.");
      return;
    }

    if (!registrationNumber.trim()) {
      setFormError("Nomor badan hukum wajib diisi.");
      return;
    }

    if (!address.trim()) {
      setFormError("Alamat koperasi wajib diisi.");
      return;
    }

    if (establishedYear.length !== 4) {
      setFormError("Tahun berdiri harus terdiri dari 4 digit.");
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
      const cooperativeProfileResponse = await updateCooperativeProfile({
        onboardingDraftId: onboardingDraft.onboardingDraftId,
        onboardingToken: onboardingDraft.onboardingToken,
        cooperativeName: cooperativeName.trim(),
        registrationNumber: registrationNumber.trim(),
        address: address.trim(),
        establishedYear: Number(establishedYear),
      });

      saveOnboardingDraftSession(roleId, {
        ...onboardingDraft,
        onboardingDraftId: cooperativeProfileResponse.onboarding_draft_id,
        nextStep: cooperativeProfileResponse.next_step,
      });

      startTransition(() => {
        router.push(getAuthFinancialConfigHref(roleId));
      });
    } catch (requestError) {
      setFormError(
        isApiError(requestError)
          ? requestError.message
          : "Terjadi kesalahan saat menyimpan profil koperasi",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isPending,
    isSubmitting,
    formError,
    cooperativeName,
    registrationNumber,
    address,
    establishedYear,
    handleCooperativeNameChange: (value: string) => {
      setCooperativeName(value);
      clearFormError();
    },
    handleRegistrationNumberChange: (value: string) => {
      setRegistrationNumber(value);
      clearFormError();
    },
    handleAddressChange: (value: string) => {
      setAddress(value);
      clearFormError();
    },
    handleEstablishedYearChange: (value: string) => {
      setEstablishedYear(value.replace(/\D/g, "").slice(0, 4));
      clearFormError();
    },
    handleSubmit,
  };
}
