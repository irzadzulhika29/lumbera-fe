"use client";

import Link from "next/link";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getAuthOtpHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import PhoneInput from "@/src/features/auth/components/common/PhoneInput";
import PressButton from "@/src/shared/components/ui/PressButton";
import AuthPageFrame from "@/src/features/auth/components/AuthPageFrame";

type PhoneAuthScreenProps = {
  roleId: RoleOptionId;
};

export default function PhoneAuthScreen({ roleId }: PhoneAuthScreenProps) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const normalizedPhone = phone.replace(/\D/g, "");

    if (!normalizedPhone) {
      setError("Nomor handphone wajib diisi");
      return;
    }

    if (normalizedPhone.length < 9) {
      setError("Masukkan nomor WhatsApp yang valid");
      return;
    }

    setError("");

    startTransition(() => {
      router.push(getAuthOtpHref(roleId));
    });
  };

  return (
    <AuthPageFrame>
      <div className="mt-10">
        <Link
          href="/role-select"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {"<"}
          </span>
          Kembali
        </Link>
      </div>

      <div className="mt-14">
        <h1 className="text-[2.15rem] font-bold leading-none tracking-[-0.04em]">
          Selamat Datang
        </h1>
        <p className="mt-4 text-[1.15rem] leading-snug text-text/78">
          Masuk ke akun koperasi Anda
        </p>
      </div>

      <div className="mt-10">
        <label className="text-[1.05rem] font-medium text-text">
          No. Handphone <span className="text-error">*</span>
        </label>
        <PhoneInput
          value={phone}
          error={error}
          onChange={(event) => {
            setPhone(event.target.value);

            if (error) {
              setError("");
            }
          }}
          fieldClassName={error ? "border-error px-4 py-2.5" : "px-4 py-2.5"}
          inputClassName={
            error
              ? "text-base text-error placeholder:text-error/35"
              : "text-base"
          }
          prefixClassName="text-base"
          className="mt-3"
        />
      </div>

      <div className="mt-12">
        <PressButton
          className="w-full py-3.5 text-base font-semibold"
          onClick={handleSubmit}
        >
          Masuk
        </PressButton>
      </div>

      <p className="mt-6 text-center text-[0.95rem] text-text/78">
        Koperasi baru?{" "}
        <button type="button" className="font-semibold text-primary">
          Daftar di sini
        </button>
      </p>

      <div className="mt-auto pt-12 text-center text-[0.82rem] text-text/22">
        Diawasi OJK - Sesuai UU PDP No.27/2022
      </div>
    </AuthPageFrame>
  );
}
