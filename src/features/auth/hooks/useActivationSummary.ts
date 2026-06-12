"use client";

import { useEffect, useState } from "react";

import { getOnboardingState } from "@/src/features/onboarding/api/onboardingApi";
import { isApiError } from "@/src/shared/api";
import { buildActivationSummaryState, type ActivationSummaryState } from "../utils/activationSummary";
import {
  getOnboardingDraftSession,
  type OnboardingDraftSession,
} from "../utils/onboardingDraftStorage";

export const useActivationSummary = (roleId: OnboardingDraftSession["roleId"]) => {
  const [summaryState, setSummaryState] = useState<ActivationSummaryState>({
    personalSummary: [],
    cooperativeSummary: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [summaryError, setSummaryError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    const loadState = async () => {
      setIsLoading(true);

      const onboardingDraft = getOnboardingDraftSession(roleId);

      if (!onboardingDraft?.onboardingDraftId || !onboardingDraft.onboardingToken) {
        if (!isCancelled) {
          setSummaryError("Ringkasan onboarding tidak ditemukan.");
          setIsLoading(false);
        }
        return;
      }

      try {
        const draftState = await getOnboardingState({
          onboardingDraftId: onboardingDraft.onboardingDraftId,
          onboardingToken: onboardingDraft.onboardingToken,
        });

        if (!isCancelled) {
          setSummaryState(buildActivationSummaryState(draftState));
          setSummaryError("");
        }
      } catch (requestError) {
        if (!isCancelled) {
          setSummaryError(
            isApiError(requestError)
              ? requestError.message
              : "Terjadi kesalahan saat memuat ringkasan onboarding",
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadState();

    return () => {
      isCancelled = true;
    };
  }, [roleId]);

  return {
    ...summaryState,
    isLoading,
    summaryError,
  };
};
