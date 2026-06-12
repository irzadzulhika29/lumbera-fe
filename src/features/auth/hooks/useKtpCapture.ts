"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { prepareKtpFile } from "../utils/ktpOcr";
import { useCameraCapture } from "./useCameraCapture";

type UseKtpCaptureOptions = {
  onIdentityDetected: (payload: { fullName?: string; nik?: string }) => void;
  onInteraction: () => void;
  onPreparedFileChange: (file: File | null) => void;
};

export function useKtpCapture({
  onIdentityDetected,
  onInteraction,
  onPreparedFileChange,
}: UseKtpCaptureOptions) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewUrlRef = useRef("");
  const [ktpPreviewUrl, setKtpPreviewUrl] = useState("");
  const [selectedKtpFile, setSelectedKtpFile] = useState("");
  const [ktpError, setKtpError] = useState("");
  const [isProcessingKtp, setIsProcessingKtp] = useState(false);
  const {
    videoRef,
    cameraError,
    isCameraOpen,
    isStartingCamera,
    handleOpenCamera,
    handleCloseCamera,
    captureCameraImage,
  } = useCameraCapture();

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const processSelectedKtpFile = async (selectedFile: File) => {
    if (!selectedFile) {
      onPreparedFileChange(null);
      setSelectedKtpFile("");
      setKtpPreviewUrl("");
      setKtpError("");
      return false;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const nextPreviewUrl = URL.createObjectURL(selectedFile);
    previewUrlRef.current = nextPreviewUrl;

    setKtpPreviewUrl(nextPreviewUrl);
    setSelectedKtpFile(selectedFile.name);
    setKtpError("");
    onInteraction();
    setIsProcessingKtp(true);

    try {
      const { optimizedFile, identity } = await prepareKtpFile(selectedFile);
      onPreparedFileChange(optimizedFile);
      onIdentityDetected(identity);
    } catch (ocrError) {
      setKtpError(
        ocrError instanceof Error
          ? ocrError.message
          : "Terjadi kesalahan saat memproses OCR KTP",
      );
      return false;
    } finally {
      setIsProcessingKtp(false);
    }

    return true;
  };

  const handleKtpFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    event.target.value = "";

    if (!selectedFile) {
      return;
    }

    await processSelectedKtpFile(selectedFile);
  };

  const handleCaptureCamera = async () => {
    const capturedFile = await captureCameraImage();

    if (!capturedFile) {
      return;
    }

    handleCloseCamera();
    await processSelectedKtpFile(capturedFile);
  };

  return {
    fileInputRef,
    videoRef,
    ktpPreviewUrl,
    selectedKtpFile,
    ktpError,
    cameraError,
    isProcessingKtp,
    isCameraOpen,
    isStartingCamera,
    handleKtpFileChange,
    handleOpenCamera,
    handleCloseCamera,
    handleCaptureCamera,
  };
}
