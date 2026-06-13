"use client";

import Image from "next/image";
import { useEffect } from "react";

import PressButton from "./PressButton";

type ConfirmationModalProps = {
  actionLabel: string;
  description: React.ReactNode;
  iconAlt: string;
  iconSrc: string;
  isOpen: boolean;
  isSubmitting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReasonChange?: (value: string) => void;
  reasonPlaceholder?: string;
  reasonValue?: string;
  title: string;
};

export default function ConfirmationModal({
  actionLabel,
  description,
  iconAlt,
  iconSrc,
  isOpen,
  isSubmitting = false,
  onClose,
  onConfirm,
  onReasonChange,
  reasonPlaceholder = "Masukkan alasan",
  reasonValue = "",
  title,
}: ConfirmationModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 px-4 py-6">
      <div className="relative w-full max-w-[830px] rounded-[42px] bg-white px-6 pb-10 pt-16 shadow-[0_24px_70px_rgba(15,23,42,0.28)] sm:px-10 sm:pb-12 sm:pt-14">
        <button
          type="button"
          aria-label="Tutup modal"
          onClick={onClose}
          className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center text-[#2f5f9d] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5f9d] sm:right-10 sm:top-8"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-9 w-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M5 5 19 19" />
            <path d="M19 5 5 19" />
          </svg>
        </button>

        <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={236}
            height={236}
            priority
            className="h-auto w-[170px] sm:w-[236px]"
          />

          <h2 className="mt-6 text-[2.1rem] font-bold tracking-[-0.04em] text-[#394653] sm:text-[3.1rem]">
            {title}
          </h2>

          <div className="mt-7 text-[1rem] font-medium leading-[1.65] tracking-[-0.03em] text-[#394653] sm:text-[1.32rem]">
            {description}
          </div>

          <input
            type="text"
            value={reasonValue}
            onChange={(event) => onReasonChange?.(event.target.value)}
            placeholder={reasonPlaceholder}
            className="mt-10 h-[76px] w-full rounded-[20px] border-4 border-[#dddddf] bg-white px-8 text-[1.2rem] font-medium text-[#394653] outline-none transition-colors placeholder:text-[#c8c8cc] focus:border-[#cfcfd3] sm:h-[92px] sm:text-[1.5rem]"
          />

          <PressButton
            type="button"
            variant="danger"
            disabled={isSubmitting}
            onClick={onConfirm}
            className="mt-9 h-[72px] w-full rounded-[18px] text-[1.25rem] font-bold shadow-[0_6px_0_0_var(--color-error-shadow)] sm:h-[82px] sm:text-[1.45rem]"
          >
            {isSubmitting ? "Memproses..." : actionLabel}
          </PressButton>
        </div>
      </div>
    </div>
  );
}
