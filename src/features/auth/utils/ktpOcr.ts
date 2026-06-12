import { compressImageFile } from "@/src/shared/utils/imageCompression";

export type IdentityDetectionPayload = {
  fullName?: string;
  nik?: string;
};

export const prepareKtpFile = async (selectedFile: File) => {
  const optimizedFile = await compressImageFile(selectedFile);

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

  return {
    optimizedFile,
    identity: payload satisfies IdentityDetectionPayload,
  };
};
