"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  getAuthFinancialConfigHref,
  getAuthCooperativeTypeHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import BaseInput from "@/src/shared/components/ui/BaseInput";
import PressButton from "@/src/shared/components/ui/PressButton";

type CooperativeProfileScreenProps = {
  roleId: RoleOptionId;
};

export default function CooperativeProfileScreen({
  roleId,
}: CooperativeProfileScreenProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <div>
        <h1 className="text-[2.05rem] font-bold leading-none tracking-[-0.04em]">
          Profil Koperasi
        </h1>
        <p className="mt-4 text-[1.08rem] leading-snug text-text/78">
          Lengkapi data koperasi Anda
        </p>
      </div>

      <div className="mt-10 space-y-5">
        <BaseInput
          label={
            <>
              Nama Koperasi <span className="text-error">*</span>
            </>
          }
          fieldClassName="px-4 py-3"
          inputClassName="text-base"
        />

        <BaseInput
          label={
            <>
              Nomor Badan Hukum <span className="text-error">*</span>
            </>
          }
          fieldClassName="px-4 py-3"
          inputClassName="text-base"
        />

        <BaseInput
          label={
            <>
              Alamat Koperasi <span className="text-error">*</span>
            </>
          }
          fieldClassName="px-4 py-3"
          inputClassName="text-base"
        />

        <BaseInput
          label={
            <>
              Tahun Berdiri <span className="text-error">*</span>
            </>
          }
          fieldClassName="px-4 py-3"
          inputClassName="text-base"
          inputMode="numeric"
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
                router.push(getAuthCooperativeTypeHref(roleId));
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
                router.push(getAuthFinancialConfigHref(roleId));
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
