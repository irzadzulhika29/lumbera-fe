"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  getAuthCooperativeProfileHref,
  getAuthProfileHref,
  type RoleOptionId,
} from "@/src/features/onboarding/content";
import PressButton from "@/src/shared/components/ui/PressButton";

const COOPERATIVE_TYPE_OPTIONS = [
  {
    id: "ksp",
    title: "KSP",
    description: "Koperasi Simpan Pinjam",
  },
  {
    id: "pangan",
    title: "Pangan",
    description: "Beras, Jagung, Bulky",
  },
  {
    id: "cold-chain",
    title: "Cold-Chain",
    description: "Sayur, Buah, Ikan",
  },
  {
    id: "toko-gerai",
    title: "Toko Gerai",
    description: "Retail, Warung Koperasi",
  },
  {
    id: "utilitas",
    title: "Utilitas",
    description: "Air, Listrik, Gas",
  },
  {
    id: "peternakan",
    title: "Peternakan",
    description: "Sapi, Kambing, Ayam",
  },
] as const;

type CooperativeTypeId = (typeof COOPERATIVE_TYPE_OPTIONS)[number]["id"];

type CooperativeTypeScreenProps = {
  roleId: RoleOptionId;
};

export default function CooperativeTypeScreen({
  roleId,
}: CooperativeTypeScreenProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedType, setSelectedType] = useState<CooperativeTypeId>("ksp");

  return (
    <>
      <div>
        <h1 className="text-[2.05rem] font-bold leading-none tracking-[-0.04em]">
          Jenis Koperasi Anda?
        </h1>
        <p className="mt-4 text-[1.08rem] leading-snug text-text/78">
          Pilih sesuai operasional utama koperasi
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-5">
        {COOPERATIVE_TYPE_OPTIONS.map((option) => {
          const isSelected = option.id === selectedType;

          return (
            <PressButton
              key={option.id}
              type="button"
              variant={isSelected ? "primary" : "outline"}
              className="flex min-h-[74px] flex-col items-center justify-center gap-1 rounded-lg px-3 py-3 text-center"
              onClick={() => setSelectedType(option.id)}
            >
              <span className="text-[0.95rem] font-bold leading-none">
                {option.title}
              </span>
              <span
                className={
                  isSelected
                    ? "whitespace-nowrap text-[0.72rem] leading-none tracking-[-0.01em] text-white/85"
                    : "whitespace-nowrap text-[0.72rem] leading-none tracking-[-0.01em] text-primary/80"
                }
              >
                {option.description}
              </span>
            </PressButton>
          );
        })}
      </div>

      <div className="mt-auto pt-12">
        <div className="flex items-center gap-3">
          <PressButton
            type="button"
            className="h-14 w-14 shrink-0 px-0 py-0 text-xl"
            aria-label="Kembali"
            onClick={() =>
              startTransition(() => {
                router.push(getAuthProfileHref(roleId));
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
                router.push(getAuthCooperativeProfileHref(roleId));
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
