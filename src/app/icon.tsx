import { ImageResponse } from "next/og";

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
          background: "#129490",
        }}
      >
        <svg
          width="248"
          height="268"
          viewBox="0 0 250 270"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M173.218 0L179.399 12.4513L26.2956 132.122L0 98.4502L173.218 0Z"
            fill="white"
          />
          <path
            d="M67.7677 270L62.8693 256.99L227.221 153.322L250 189.468L67.7677 270Z"
            fill="white"
          />
          <path
            d="M115.676 217.565L72.9649 243.241L73.0814 243.435H72.9649V102.82L115.676 69.4369V217.565Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M165.506 185.074L122.795 211.873L122.911 212.076H122.795V65.3144L165.506 30.4726V185.074ZM153.048 117.714C149.117 117.714 145.93 120.902 145.93 124.835C145.93 128.769 149.117 131.957 153.048 131.957C156.98 131.957 160.167 128.769 160.167 124.835C160.167 120.902 156.98 117.714 153.048 117.714Z"
            fill="white"
          />
        </svg>
      </div>
    ),
    size,
  );
}
