"use client";

import Image from "next/image";
import type { ChangeEvent, RefObject } from "react";

import PressButton from "@/src/shared/components/ui/PressButton";

type ProfileKtpFieldProps = {
  fileInputRef: RefObject<HTMLInputElement | null>;
  ktpPreviewUrl: string;
  selectedKtpFile: string;
  ktpError: string;
  isProcessingKtp: boolean;
  isCameraOpen: boolean;
  isSubmitting: boolean;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onOpenCamera: () => void;
};

export default function ProfileKtpField({
  fileInputRef,
  ktpPreviewUrl,
  selectedKtpFile,
  ktpError,
  isProcessingKtp,
  isCameraOpen,
  isSubmitting,
  onFileChange,
  onOpenCamera,
}: ProfileKtpFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <label className="text-[1.05rem] leading-none font-medium text-text">
        Upload KTP <span className="text-error">*</span>
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
      <div className="rounded-lg border border-border bg-card px-2 py-2 shadow-sm">
        <div className="flex items-center gap-2">
          <PressButton
            type="button"
            variant="primaryFlat"
            className="rounded-md px-5 py-3 text-sm font-semibold"
            disabled={isProcessingKtp || isCameraOpen || isSubmitting}
            onClick={() => fileInputRef.current?.click()}
          >
            {isProcessingKtp ? "Memproses..." : "Upload KTP"}
          </PressButton>
          <PressButton
            type="button"
            variant="outlineFlat"
            className="rounded-md px-4 py-3 text-sm font-semibold"
            disabled={isProcessingKtp || isSubmitting}
            onClick={onOpenCamera}
          >
            Scan KTP
          </PressButton>
          {ktpPreviewUrl ? (
            <Image
              src={ktpPreviewUrl}
              alt="Preview KTP"
              width={72}
              height={48}
              unoptimized
              className="h-12 w-18 shrink-0 rounded-md object-cover"
            />
          ) : null}
        </div>
        <span className="mt-2 block truncate px-2 text-base text-text/55">
          {selectedKtpFile || "Pilih atau upload gambar"}
        </span>
        {ktpError ? <p className="mt-2 px-2 text-sm text-error">{ktpError}</p> : null}
      </div>
    </div>
  );
}
