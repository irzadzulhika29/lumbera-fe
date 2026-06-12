"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  getAuthActivationSuccessHref,
  getAuthBankAccountHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import PressButton from "@/src/shared/components/ui/PressButton";

const PERSONAL_SUMMARY = [
  { label: "Nama", value: "Asep Suryadi" },
  { label: "NIK", value: "3215 **** **** 0003" },
  { label: "No. HP", value: "081234567890" },
  { label: "Jabatan", value: "Bendahara" },
] as const;

const COOPERATIVE_SUMMARY = [
  { label: "Tipe Koperasi", value: "KSP" },
  { label: "Profil", value: "Koperasi Padiwangi" },
  { label: "Batas Pinjaman", value: "Rp 5.000.000 - 1,5%/bln" },
  { label: "Rekening", value: "BRI - xxxx-4321" },
] as const;

function CheckCircleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="block"
    >
      <circle cx="10" cy="10" r="9" fill="currentColor" />
      <path
        d="M6.2 10.1L8.7 12.6L13.8 7.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CooperativeActivationScreenProps = {
  roleId: RoleOptionId;
};

export default function CooperativeActivationScreen({
  roleId,
}: CooperativeActivationScreenProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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
            {PERSONAL_SUMMARY.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-[1.02rem] leading-none text-text/75">
                  {item.label}
                </span>
                <span className="text-[1.02rem] leading-none font-semibold text-text/82">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card px-4 py-4 shadow-sm">
          <h2 className="text-[1.02rem] font-semibold text-primary">
            Ringkasan data koperasi
          </h2>
          <div className="mt-4 space-y-3">
            {COOPERATIVE_SUMMARY.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4"
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
          </div>
        </section>
      </div>

      <div className="mt-auto pt-12">
        <div className="flex items-center gap-3">
          <PressButton
            type="button"
            className="h-14 w-14 shrink-0 px-0 py-0 text-xl"
            aria-label="Kembali"
            onClick={() =>
              startTransition(() => {
                router.push(getAuthBankAccountHref(roleId));
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
                router.push(getAuthActivationSuccessHref(roleId));
              })
            }
          >
            Aktifkan Koperasi
          </PressButton>
        </div>

        <div className="pt-6 text-center text-[0.82rem] text-text/22">
          Diawasi OJK - Sesuai UU PDP No.27/2022
        </div>
      </div>
    </>
  );
}
