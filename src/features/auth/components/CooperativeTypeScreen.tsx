"use client";

import { useRouter } from "next/navigation";

import type { RoleOptionId } from "@/src/features/onboarding/content";
import { getAuthProfileHref } from "@/src/features/onboarding/content";
import PressButton from "@/src/shared/components/ui/PressButton";

import {
  COOPERATIVE_TYPE_OPTIONS,
} from "./cooperative-type/cooperativeTypeConfig";
import { useCooperativeTypeForm } from "../hooks/useCooperativeTypeForm";

type CooperativeTypeScreenProps = {
  roleId: RoleOptionId;
};

export default function CooperativeTypeScreen({
  roleId,
}: CooperativeTypeScreenProps) {
  const router = useRouter();
  const form = useCooperativeTypeForm(roleId);

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
          const isSelected = option.id === form.selectedType;

          return (
            <PressButton
              key={option.id}
              type="button"
              variant={isSelected ? "primary" : "outline"}
              className="flex min-h-[74px] flex-col items-center justify-center gap-1 rounded-lg px-3 py-3 text-center"
              onClick={() => form.handleSelectType(option.id)}
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
            onClick={() => router.push(getAuthProfileHref(roleId))}
          >
            {"<"}
          </PressButton>
          <PressButton
            type="button"
            className="h-14 flex-1 text-base font-semibold"
            disabled={form.isPending || form.isSubmitting}
            onClick={form.handleSubmit}
          >
            {form.isSubmitting ? "Menyimpan..." : "Lanjut"}
          </PressButton>
        </div>
        {form.formError ? (
          <p className="mt-3 text-sm text-error">{form.formError}</p>
        ) : null}

        <div className="pt-6 text-center text-[0.82rem] text-text/22">
          Diawasi OJK - Sesuai UU PDP No.27/2022
        </div>
      </div>
    </>
  );
}
