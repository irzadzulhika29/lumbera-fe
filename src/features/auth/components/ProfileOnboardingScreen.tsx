"use client";

import { useState } from "react";

import type { RoleOptionId } from "@/src/features/onboarding/content";
import PressButton from "@/src/shared/components/ui/PressButton";

import ProfileCameraModal from "./profile/ProfileCameraModal";
import ProfileCooperativeCodeField from "./profile/ProfileCooperativeCodeField";
import ProfileIdentityFields from "./profile/ProfileIdentityFields";
import ProfileKtpField from "./profile/ProfileKtpField";
import ProfilePositionField from "./profile/ProfilePositionField";
import { useKtpCapture } from "../hooks/useKtpCapture";
import { useProfileOnboardingForm } from "../hooks/useProfileOnboardingForm";

type ProfileOnboardingScreenProps = {
  roleId: RoleOptionId;
};

export default function ProfileOnboardingScreen({
  roleId,
}: ProfileOnboardingScreenProps) {
  const [preparedKtpFile, setPreparedKtpFile] = useState<File | null>(null);
  const form = useProfileOnboardingForm({
    roleId,
    preparedKtpFile,
  });

  const ktpCapture = useKtpCapture({
    onIdentityDetected: form.setDetectedIdentity,
    onInteraction: form.clearFormError,
    onPreparedFileChange: setPreparedKtpFile,
  });

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
        <ProfileKtpField
          fileInputRef={ktpCapture.fileInputRef}
          ktpPreviewUrl={ktpCapture.ktpPreviewUrl}
          selectedKtpFile={ktpCapture.selectedKtpFile}
          ktpError={ktpCapture.ktpError}
          isProcessingKtp={ktpCapture.isProcessingKtp}
          isCameraOpen={ktpCapture.isCameraOpen}
          isSubmitting={form.isSubmitting}
          onFileChange={ktpCapture.handleKtpFileChange}
          onOpenCamera={ktpCapture.handleOpenCamera}
        />

        <ProfileIdentityFields
          fullName={form.fullName}
          nik={form.nik}
          onFullNameChange={form.handleFullNameChange}
          onNikChange={form.handleNikChange}
        />

        <ProfilePositionField value={form.position} onChange={form.handlePositionChange} />

        <ProfileCooperativeCodeField
          value={form.koperasiCode}
          onChange={form.handleKoperasiCodeChange}
        />
      </div>

      <div className="mt-10">
        <PressButton
          className="w-full py-3.5 text-base font-semibold"
          disabled={form.isPending || form.isSubmitting || ktpCapture.isProcessingKtp}
          onClick={form.handleSubmit}
        >
          {form.isSubmitting ? "Menyimpan..." : "Lanjut"}
        </PressButton>
        {form.formError ? (
          <p className="mt-3 text-sm text-error">{form.formError}</p>
        ) : null}
      </div>

      <div className="mt-auto pt-8 text-center text-[0.82rem] text-text/22">
        Diawasi OJK - Sesuai UU PDP No.27/2022
      </div>

      <ProfileCameraModal
        isOpen={ktpCapture.isCameraOpen}
        videoRef={ktpCapture.videoRef}
        cameraError={ktpCapture.cameraError}
        isStartingCamera={ktpCapture.isStartingCamera}
        isProcessingKtp={ktpCapture.isProcessingKtp}
        isSubmitting={form.isSubmitting}
        onClose={ktpCapture.handleCloseCamera}
        onCapture={ktpCapture.handleCaptureCamera}
      />
    </>
  );
}
