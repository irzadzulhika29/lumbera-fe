"use client";

import { Icon } from "@iconify/react";
import { startTransition } from "react";
import { useRouter } from "next/navigation";

import {
  getAuthBankAccountHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";

import AuthFooterNote from "./common/AuthFooterNote";
import AuthStepActions from "./common/AuthStepActions";
import { useActivationSummary } from "../hooks/useActivationSummary";
import { useActivationSubmission } from "../hooks/useActivationSubmission";

function CheckCircleIcon() {
  return (
    <Icon
      icon="solar:check-circle-bold"
      width="18"
      height="18"
      aria-hidden="true"
      className="block"
    />
  );
}

type CooperativeActivationScreenProps = {
  roleId: RoleOptionId;
};

export default function CooperativeActivationScreen({
  roleId,
}: CooperativeActivationScreenProps) {
  const router = useRouter();
  const { personalSummary, cooperativeSummary, isLoading, summaryError } =
    useActivationSummary(roleId);
  const { isPending, isSubmitting, formError, handleActivate } =
    useActivationSubmission(roleId);

  return (
    <>
      <div>
        <h1 className="text-[2.05rem] font-bold leading-none tracking-[-0.04em]">
          Konfirmasi & Aktivasi
        </h1>
        <p className="mt-4 text-[1.08rem] leading-snug text-text/78">
          Periksa semua konfigurasi sebelum mengaktifkan
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <section className="rounded-xl border border-border bg-card px-4 py-4 shadow-sm">
          <h2 className="text-[1.02rem] font-semibold text-primary">
            Ringkasan data diri
          </h2>
          <div className="mt-4 space-y-3">
            {(isLoading ? [] : personalSummary).map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-4"
              >
                <span className="text-[1.02rem] leading-none text-text/75">
                  {item.label}
                </span>
                <span className="text-right text-[1.02rem] leading-snug font-semibold text-text/82">
                  {item.value}
                </span>
              </div>
            ))}
            {isLoading ? (
              <p className="text-sm text-text/50">Memuat ringkasan...</p>
            ) : null}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card px-4 py-4 shadow-sm">
          <h2 className="text-[1.02rem] font-semibold text-primary">
            Ringkasan data koperasi
          </h2>
          <div className="mt-4 space-y-3">
            {(isLoading ? [] : cooperativeSummary).map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start gap-4"
              >
                <span className="flex items-center gap-2 text-[1.02rem] leading-none text-text/75">
                  <span className="text-primary">
                    <CheckCircleIcon />
                  </span>
                  {item.label}
                </span>
                <span className="text-right text-[1.02rem] leading-snug font-semibold text-text/82">
                  {item.value}
                </span>
              </div>
            ))}
            {isLoading ? (
              <p className="text-sm text-text/50">Memuat ringkasan...</p>
            ) : null}
          </div>
        </section>
      </div>

      <div className="mt-auto pt-12">
        <AuthStepActions
          onBack={() =>
            startTransition(() => {
              router.push(getAuthBankAccountHref(roleId));
            })
          }
          onNext={handleActivate}
          isNextDisabled={isPending || isSubmitting}
          nextLabel={isSubmitting ? "Mengaktifkan..." : "Aktifkan Koperasi"}
        />
        {formError ? <p className="mt-3 text-sm text-error">{formError}</p> : null}
        {!formError && summaryError ? (
          <p className="mt-3 text-sm text-error">{summaryError}</p>
        ) : null}
        <AuthFooterNote />
      </div>
    </>
  );
}
