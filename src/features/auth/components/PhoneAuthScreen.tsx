"use client";

import Link from "next/link";

import {
  getAuthPhoneHref,
  getAuthRegisterPhoneHref,
  type AuthEntryFlow,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import PressButton from "@/src/shared/components/ui/PressButton";

import AuthFooterNote from "./common/AuthFooterNote";
import AuthPageFrame from "./common/AuthPageFrame";
import PhoneInput from "./common/PhoneInput";
import { usePhoneAuthFlow } from "../hooks/usePhoneAuthFlow";

type PhoneAuthScreenProps = {
  roleId: RoleOptionId;
  flow: AuthEntryFlow;
};

export default function PhoneAuthScreen({
  roleId,
  flow,
}: PhoneAuthScreenProps) {
  const {
    phone,
    error,
    isSubmitting,
    isRegisterFlow,
    handlePhoneChange,
    handleSubmit,
  } = usePhoneAuthFlow(roleId, flow);

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
          {isRegisterFlow ? "Daftar Koperasi" : "Selamat Datang"}
        </h1>
        <p className="mt-4 text-[1.15rem] leading-snug text-text/78">
          {isRegisterFlow
            ? "Mulai registrasi koperasi Anda"
            : "Masuk ke akun koperasi Anda"}
        </p>
      </div>

      <div className="mt-10">
        <label className="text-[1.05rem] font-medium text-text">
          No. Handphone <span className="text-error">*</span>
        </label>
        <PhoneInput
          value={phone}
          error={error}
          onChange={(event) => handlePhoneChange(event.target.value)}
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
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isRegisterFlow ? "Lanjut" : "Masuk"}
        </PressButton>
      </div>

      <p className="mt-6 text-center text-[0.95rem] text-text/78">
        {isRegisterFlow ? "Sudah punya akun? " : "Koperasi baru? "}
        <Link
          href={
            isRegisterFlow
              ? getAuthPhoneHref(roleId)
              : getAuthRegisterPhoneHref(roleId)
          }
          className="font-semibold text-primary"
        >
          {isRegisterFlow ? "Masuk di sini" : "Daftar di sini"}
        </Link>
      </p>

      <div className="mt-auto pt-12">
        <AuthFooterNote />
      </div>
    </AuthPageFrame>
  );
}
