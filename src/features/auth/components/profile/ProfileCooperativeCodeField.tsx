"use client";

import BaseInput from "@/src/shared/components/ui/BaseInput";

type ProfileCooperativeCodeFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ProfileCooperativeCodeField({
  value,
  onChange,
}: ProfileCooperativeCodeFieldProps) {
  return (
    <BaseInput
      label="Kode Koperasi (jika sudah terdaftar)"
      value={value}
      placeholder="ABC123"
      fieldClassName="px-4 py-3"
      inputClassName="text-base uppercase"
      maxLength={6}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
