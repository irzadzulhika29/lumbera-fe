"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  AUTH_ACTIVATION_ROUTE,
  AUTH_BANK_ACCOUNT_ROUTE,
  AUTH_COOPERATIVE_PROFILE_ROUTE,
  AUTH_COOPERATIVE_TYPE_ROUTE,
  AUTH_FINANCIAL_CONFIG_ROUTE,
  AUTH_PROFILE_ROUTE,
} from "@/src/features/onboarding/content";

import AuthBackLink from "./AuthBackLink";
import AuthPageFrame from "./AuthPageFrame";
import FormProgressHeader from "./FormProgressHeader";

type FormStepFlowShellProps = {
  children: React.ReactNode;
};

const FORM_STEP_CONFIG = [
  { pathname: AUTH_PROFILE_ROUTE, step: 1 },
  { pathname: AUTH_COOPERATIVE_TYPE_ROUTE, step: 2 },
  { pathname: AUTH_COOPERATIVE_PROFILE_ROUTE, step: 3 },
  { pathname: AUTH_FINANCIAL_CONFIG_ROUTE, step: 4 },
  { pathname: AUTH_BANK_ACCOUNT_ROUTE, step: 5 },
  { pathname: AUTH_ACTIVATION_ROUTE, step: 6 },
] as const;

export default function FormStepFlowShell({
  children,
}: FormStepFlowShellProps) {
  const router = useRouter();
  const pathname = usePathname();

  const currentStep = useMemo(
    () =>
      FORM_STEP_CONFIG.find((stepConfig) => stepConfig.pathname === pathname) ??
      FORM_STEP_CONFIG[0],
    [pathname],
  );

  return (
    <AuthPageFrame showBrand={false}>
      <AuthBackLink onClick={() => router.back()} />
      <FormProgressHeader currentStep={currentStep.step} totalSteps={6} />
      <div className="mt-5 flex flex-1 flex-col">{children}</div>
    </AuthPageFrame>
  );
}
