"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";

import {
  getAuthFinancialConfigHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import BaseInput from "@/src/shared/components/ui/BaseInput";
import SelectField from "@/src/shared/components/ui/SelectField";

import AuthFooterNote from "./common/AuthFooterNote";
import AuthStepActions from "./common/AuthStepActions";
import { BANK_OPTIONS, useBankAccountForm } from "../hooks/useBankAccountForm";

type CooperativeBankAccountScreenProps = {
  roleId: RoleOptionId;
};

export default function CooperativeBankAccountScreen({
  roleId,
}: CooperativeBankAccountScreenProps) {
  const router = useRouter();
  const {
    isPending,
    isSubmitting,
    formError,
    bank,
    bankAccountNumber,
    bankAccountHolderName,
    handleSubmit,
    setBank,
    setBankAccountNumber,
    setBankAccountHolderName,
  } = useBankAccountForm(roleId);

  return (
    <>
      <div>
        <h1 className="text-[2.05rem] font-bold leading-none tracking-[-0.04em]">
          Rekening Koperasi
        </h1>
        <p className="mt-4 text-[1.08rem] leading-snug text-text/78">
          Untuk pencairan pinjaman dari mitra pembiayaan
        </p>
      </div>

      <div className="mt-10 space-y-5">
        <SelectField
          label="Bank"
          value={bank}
          options={BANK_OPTIONS.map((option) => ({
            label: option.label,
            value: option.value,
          }))}
          onChange={setBank}
          fieldClassName="py-3"
        />

        <BaseInput
          label={
            <>
              Nomor Rekening <span className="text-error">*</span>
            </>
          }
          placeholder="1234567890"
          fieldClassName="px-4 py-3"
          inputClassName="text-base"
          inputMode="numeric"
          value={bankAccountNumber}
          onChange={(event) => setBankAccountNumber(event.target.value)}
        />

        <BaseInput
          label={
            <>
              Nama Pemilik Rekening <span className="text-error">*</span>
            </>
          }
          placeholder="Budi Hartono"
          fieldClassName="px-4 py-3"
          inputClassName="text-base"
          value={bankAccountHolderName}
          onChange={(event) => setBankAccountHolderName(event.target.value)}
        />
      </div>

      <div className="mt-auto pt-12">
        <AuthStepActions
          onBack={() =>
            startTransition(() => {
              router.push(getAuthFinancialConfigHref(roleId));
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
