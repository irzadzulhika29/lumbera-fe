"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import { compressImageFile } from "@/src/shared/utils/imageCompression";

type IdentityDetectionPayload = {
  fullName?: string;
  nik?: string;
};

type UseKtpCaptureOptions = {
  onIdentityDetected: (payload: IdentityDetectionPayload) => void;
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const [ktpPreviewUrl, setKtpPreviewUrl] = useState("");
  const [selectedKtpFile, setSelectedKtpFile] = useState("");
  const [ktpError, setKtpError] = useState("");
  const [cameraError, setCameraError] = useState("");
  const [isProcessingKtp, setIsProcessingKtp] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isStartingCamera, setIsStartingCamera] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }

      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const stopCameraStream = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (!isCameraOpen) {
      return;
    }

    let isActive = true;

    const startCamera = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("Browser ini belum mendukung akses kamera.");
        return;
      }

      setCameraError("");
      setIsStartingCamera(true);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
          },
          audio: false,
        });

        if (!isActive) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        cameraStreamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => undefined);
        }
      } catch {
        if (isActive) {
          setCameraError(
            "Kamera tidak bisa diakses. Coba pakai HTTPS atau pilih upload gambar biasa.",
          );
        }
      } finally {
        if (isActive) {
          setIsStartingCamera(false);
        }
      }
    };

    void startCamera();

    return () => {
      isActive = false;
      stopCameraStream();
    };
  }, [isCameraOpen]);

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
      const optimizedFile = await compressImageFile(selectedFile);
      onPreparedFileChange(optimizedFile);

      const formData = new FormData();
      formData.append("image", optimizedFile);

      const response = await fetch("/api/ocr/ktp", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as {
        fullName?: string;
        nik?: string;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(payload.message || "Gagal membaca data KTP");
      }

      onIdentityDetected(payload);
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

  const handleOpenCamera = () => {
    setCameraError("");
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    stopCameraStream();
    setIsStartingCamera(false);
    setIsCameraOpen(false);
  };

  const handleCaptureCamera = async () => {
    const videoElement = videoRef.current;

    if (!videoElement || !videoElement.videoWidth || !videoElement.videoHeight) {
      setCameraError("Preview kamera belum siap. Coba lagi.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      setCameraError("Gagal menyiapkan hasil foto.");
      return;
    }

    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const imageBlob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.92);
    });

    if (!imageBlob) {
      setCameraError("Gagal mengambil foto KTP.");
      return;
    }

    handleCloseCamera();

    await processSelectedKtpFile(
      new File([imageBlob], `ktp-scan-${Date.now()}.jpg`, {
        type: "image/jpeg",
      }),
    );
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
