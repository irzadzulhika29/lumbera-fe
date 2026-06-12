"use client";

import BaseInput from "@/src/shared/components/ui/BaseInput";

type ProfileIdentityFieldsProps = {
  fullName: string;
  nik: string;
  onFullNameChange: (value: string) => void;
  onNikChange: (value: string) => void;
};

export default function ProfileIdentityFields({
  fullName,
  nik,
  onFullNameChange,
  onNikChange,
}: ProfileIdentityFieldsProps) {
  return (
    <>
      <BaseInput
        label={
          <>
            Nama Lengkap <span className="text-error">*</span>
          </>
        }
        fieldClassName="px-4 py-3"
        inputClassName="text-base"
        value={fullName}
        onChange={(event) => onFullNameChange(event.target.value)}
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
        value={nik}
        onChange={(event) => onNikChange(event.target.value)}
      />
    </>
  );
}
