"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  getAuthCooperativeTypeHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import BaseInput from "@/src/shared/components/ui/BaseInput";
import PressButton from "@/src/shared/components/ui/PressButton";
import SelectField from "@/src/shared/components/ui/SelectField";

const POSITION_OPTIONS = [
  { label: "Ketua", value: "ketua" },
  { label: "Sekretaris", value: "sekretaris" },
  { label: "Bendahara", value: "bendahara" },
];

const KOPERASI_CODE_OPTIONS = [
  { label: "Ketua", value: "ketua" },
  { label: "KOP-2024-01", value: "kop-2024-01" },
  { label: "KOP-2024-02", value: "kop-2024-02" },
];

type ProfileOnboardingScreenProps = {
  roleId: RoleOptionId;
};

export default function ProfileOnboardingScreen({
  roleId,
}: ProfileOnboardingScreenProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedKtpFile, setSelectedKtpFile] = useState("ktp.png");
  const [position, setPosition] = useState("ketua");
  const [koperasiCode, setKoperasiCode] = useState("ketua");

  return (
    <>
      <div>
        <h1 className="text-[2.05rem] font-bold leading-none tracking-[-0.04em]">
          Input Data Diri
        </h1>
        <p className="mt-4 text-[1.08rem] leading-snug text-text/78">
          Isi data diri Anda dengan benar
        </p>
      </div>

      <div className="mt-10 space-y-5">
        <div className="flex w-full flex-col gap-2.5">
          <label className="text-[1.05rem] leading-none font-medium text-text">
            Upload KTP <span className="text-error">*</span>
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-2 shadow-sm">
            <PressButton
              type="button"
              variant="primaryFlat"
              className="rounded-md px-5 py-3 text-sm font-semibold"
              onClick={() => setSelectedKtpFile("ktp.png")}
            >
              Upload KTP
            </PressButton>
            <span className="text-base text-text/55">{selectedKtpFile}</span>
          </div>
        </div>

        <BaseInput
          label={
            <>
              Nama Lengkap <span className="text-error">*</span>
            </>
          }
          fieldClassName="px-4 py-3"
          inputClassName="text-base"
        />

        <BaseInput
          label={
            <>
              NIK (16 Digit) <span className="text-error">*</span>
            </>
          }
          fieldClassName="px-4 py-3"
          inputClassName="text-base"
          inputMode="numeric"
        />

        <SelectField
          label={
            <>
              Jabatan di Koperasi <span className="text-error">*</span>
            </>
          }
          value={position}
          options={POSITION_OPTIONS}
          onChange={setPosition}
        />

        <SelectField
          label="Kode Koperasi (jika sudah terdaftar)"
          value={koperasiCode}
          options={KOPERASI_CODE_OPTIONS}
          onChange={setKoperasiCode}
        />
      </div>

      <div className="mt-10">
        <PressButton
          className="w-full py-3.5 text-base font-semibold"
          disabled={isPending}
          onClick={() =>
            startTransition(() => {
              router.push(getAuthCooperativeTypeHref(roleId));
            })
          }
        >
          Lanjut
        </PressButton>
      </div>

      <div className="mt-auto pt-8 text-center text-[0.82rem] text-text/22">
        Diawasi OJK - Sesuai UU PDP No.27/2022
      </div>
    </>
  );
}
