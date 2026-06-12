"use client";

import { Icon } from "@iconify/react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  getAuthActivationHref,
  getAuthFinancialConfigHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import BaseInput from "@/src/shared/components/ui/BaseInput";
import PressButton from "@/src/shared/components/ui/PressButton";
import SelectField from "@/src/shared/components/ui/SelectField";

const BANK_OPTIONS = [
  { label: "Bank Rakyat Indonesia", value: "bri" },
  { label: "Bank Mandiri", value: "mandiri" },
  { label: "Bank Central Asia", value: "bca" },
  { label: "Bank Negara Indonesia", value: "bni" },
] as const;

function BankAdornment() {
  return (
    <Icon
      icon="solar:buildings-2-bold-duotone"
      width="18"
      height="18"
      aria-hidden="true"
      className="block"
    />
  );
}

type CooperativeBankAccountScreenProps = {
  roleId: RoleOptionId;
};

export default function CooperativeBankAccountScreen({
  roleId,
}: CooperativeBankAccountScreenProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [bank, setBank] = useState("bri");

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
          startAdornment={<BankAdornment />}
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
        />
      </div>

      <div className="mt-auto pt-12">
        <div className="flex items-center gap-3">
          <PressButton
            type="button"
            className="h-14 w-14 shrink-0 px-0 py-0 text-xl"
            aria-label="Kembali"
            onClick={() =>
              startTransition(() => {
                router.push(getAuthFinancialConfigHref(roleId));
              })
            }
          >
            {"<"}
          </PressButton>
          <PressButton
            type="button"
            className="h-14 flex-1 text-base font-semibold"
            disabled={isPending}
            onClick={() =>
              startTransition(() => {
                router.push(getAuthActivationHref(roleId));
              })
            }
          >
            Lanjut
          </PressButton>
        </div>

        <div className="pt-6 text-center text-[0.82rem] text-text/22">
          Diawasi OJK - Sesuai UU PDP No.27/2022
        </div>
      </div>
    </>
  );
}
