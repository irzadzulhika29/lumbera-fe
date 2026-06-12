const MAX_DIMENSION = 1600;

const loadImageBitmap = async (file: File) => {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const nextImage = new Image();
      nextImage.onload = () => resolve(nextImage);
      nextImage.onerror = () => reject(new Error("Gagal memuat gambar"));
      nextImage.src = objectUrl;
    });

    return image;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

const getResizedDimensions = (width: number, height: number) => {
  const longestSide = Math.max(width, height);

  if (longestSide <= MAX_DIMENSION) {
    return { width, height };
  }

  const scale = MAX_DIMENSION / longestSide;

  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
};

const canvasToBlob = (canvas: HTMLCanvasElement, quality: number) =>
  new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", quality);
  });

export const compressImageFile = async (
  file: File,
  maxBytes = 1024 * 1024,
) => {
  if (file.size <= maxBytes) {
    return file;
  }

  const image = await loadImageBitmap(file);
  const { width, height } = getResizedDimensions(image.width, image.height);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Gagal menyiapkan kompresi gambar");
  }

  context.drawImage(image, 0, 0, width, height);

  let quality = 0.9;
  let outputBlob = await canvasToBlob(canvas, quality);

  while (outputBlob && outputBlob.size > maxBytes && quality > 0.45) {
    quality -= 0.1;
    outputBlob = await canvasToBlob(canvas, quality);
  }

  if (!outputBlob) {
    throw new Error("Gagal mengompres gambar");
  }

  return new File([outputBlob], file.name.replace(/\.\w+$/, "") + ".jpg", {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
};
