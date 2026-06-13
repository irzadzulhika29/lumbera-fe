import { ImageResponse } from "next/og";
import LumberaLogoMark from "@/src/shared/components/system/LumberaLogoMark";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 124,
            height: 124,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 32,
            background: "rgba(255,255,255,0.1)",
          }}
        >
          <LumberaLogoMark width={92} height={100} />
        </div>
      </div>
    ),
    size,
  );
}
