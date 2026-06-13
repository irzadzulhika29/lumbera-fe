import { ImageResponse } from "next/og";
import LumberaLogoMark from "@/src/shared/components/system/LumberaLogoMark";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0e6f6c 0%, #129490 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 34,
            borderRadius: 108,
            border: "14px solid rgba(255,255,255,0.14)",
          }}
        />
        <div
          style={{
            width: 336,
            height: 336,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 96,
            background: "rgba(255,255,255,0.1)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
          }}
        >
          <LumberaLogoMark width={240} height={260} />
        </div>
      </div>
    ),
    size,
  );
}
