"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updatePersonalData } from "@/src/features/onboarding/api/onboardingApi";
import {
  getAuthCooperativeTypeHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import { isApiError } from "@/src/shared/api";
import { sha256Hex } from "@/src/shared/utils/hashing";
import {
  getOnboardingDraftSession,
  saveOnboardingDraftSession,
} from "../utils/onboardingDraftStorage";
import {
  POSITION_CODE_MAP,
  type PositionOptionValue,
} from "../components/profile/profileOnboardingConfig";

type UseProfileOnboardingFormOptions = {
  roleId: RoleOptionId;
  preparedKtpFile: File | null;
};

export function useProfileOnboardingForm({
  roleId,
  preparedKtpFile,
}: UseProfileOnboardingFormOptions) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [fullName, setFullName] = useState("");
  const [nik, setNik] = useState("");
  const [position, setPosition] = useState<PositionOptionValue>("ketua");
  const [koperasiCode, setKoperasiCode] = useState("");

  const clearFormError = () => {
    if (formError) {
      setFormError("");
    }
  };

  const handleSubmit = async () => {
    if (!preparedKtpFile) {
      setFormError("Upload KTP wajib dilakukan.");
      return;
    }

    if (!fullName.trim()) {
      setFormError("Nama lengkap wajib diisi.");
      return;
    }

    if (nik.length !== 16) {
      setFormError("NIK harus terdiri dari 16 digit.");
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
      const protectedNikValue = await sha256Hex(nik);

      const personalDataResponse = await updatePersonalData({
        onboardingDraftId: onboardingDraft.onboardingDraftId,
        onboardingToken: onboardingDraft.onboardingToken,
        ktpFile: preparedKtpFile,
        fullName: fullName.trim(),
        nikHash: protectedNikValue,
        nikEncrypted: protectedNikValue,
        positionCode: POSITION_CODE_MAP[position],
        existingCooperativeCode: koperasiCode,
      });

      saveOnboardingDraftSession(roleId, {
        ...onboardingDraft,
        onboardingDraftId: personalDataResponse.onboarding_draft_id,
        nextStep: personalDataResponse.next_step,
      });

      setNik("");

      startTransition(() => {
        router.push(getAuthCooperativeTypeHref(roleId));
      });
    } catch (requestError) {
      setFormError(
        isApiError(requestError)
          ? requestError.message
          : "Terjadi kesalahan saat menyimpan data diri",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isPending,
    isSubmitting,
    formError,
    fullName,
    nik,
    position,
    koperasiCode,
    setDetectedIdentity: (payload: { fullName?: string; nik?: string }) => {
      if (payload.fullName) {
        setFullName(payload.fullName);
      }

      if (payload.nik) {
        setNik(payload.nik.replace(/\D/g, "").slice(0, 16));
      }
    },
    handleFullNameChange: (value: string) => {
      setFullName(value);
      clearFormError();
    },
    handleNikChange: (value: string) => {
      setNik(value.replace(/\D/g, "").slice(0, 16));
      clearFormError();
    },
    handlePositionChange: (value: PositionOptionValue) => {
      setPosition(value);
      clearFormError();
    },
    handleKoperasiCodeChange: (value: string) => {
      setKoperasiCode(
        value
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, "")
          .slice(0, 6),
      );
      clearFormError();
    },
    clearFormError,
    handleSubmit,
  };
}
