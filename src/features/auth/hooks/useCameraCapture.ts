"use client";

import { useEffect, useRef, useState } from "react";

export function useCameraCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isStartingCamera, setIsStartingCamera] = useState(false);

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
    return () => {
      stopCameraStream();
    };
  }, []);

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

  const handleOpenCamera = () => {
    setCameraError("");
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    stopCameraStream();
    setIsStartingCamera(false);
    setIsCameraOpen(false);
  };

  const captureCameraImage = async () => {
    const videoElement = videoRef.current;

    if (!videoElement || !videoElement.videoWidth || !videoElement.videoHeight) {
      setCameraError("Preview kamera belum siap. Coba lagi.");
      return null;
    }

    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      setCameraError("Gagal menyiapkan hasil foto.");
      return null;
    }

    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const imageBlob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.92);
    });

    if (!imageBlob) {
      setCameraError("Gagal mengambil foto KTP.");
      return null;
    }

    return new File([imageBlob], `ktp-scan-${Date.now()}.jpg`, {
      type: "image/jpeg",
    });
  };

  return {
    videoRef,
    cameraError,
    isCameraOpen,
    isStartingCamera,
    handleOpenCamera,
    handleCloseCamera,
    captureCameraImage,
  };
}
