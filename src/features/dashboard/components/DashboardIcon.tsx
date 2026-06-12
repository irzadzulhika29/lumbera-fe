import type { DashboardIconName } from "@/src/features/dashboard/types";

type DashboardIconProps = {
  name: DashboardIconName;
  className?: string;
};

export default function DashboardIcon({
  name,
  className = "h-6 w-6",
}: DashboardIconProps) {
  const commonProps = {
    "aria-hidden": true,
    className,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.9,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "home":
      return (
        <svg {...commonProps}>
          <path d="m3.5 10.5 8.5-7 8.5 7" />
          <path d="M5.5 9.5V21h13V9.5M9 21v-6h6v6" />
        </svg>
      );
    case "members":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="7.5" r="3.5" />
          <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
        </svg>
      );
    case "reports":
      return (
        <svg {...commonProps}>
          <rect x="5" y="3" width="14" height="18" rx="1.8" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );
    case "profile":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="7.5" r="3.5" />
          <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
        </svg>
      );
    case "savings":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="8" />
          <path d="M14.5 8.8h-3.2a1.8 1.8 0 0 0 0 3.6h1.4a1.8 1.8 0 0 1 0 3.6H9.5M12 7v2M12 16v2" />
        </svg>
      );
    case "loan":
      return (
        <svg {...commonProps}>
          <path d="M4 9h16v11H4zM8 9V6.8A2.8 2.8 0 0 1 10.8 4h2.4A2.8 2.8 0 0 1 16 6.8V9" />
          <path d="M12 12v5M9.5 14.5h5" />
        </svg>
      );
    case "installment":
      return (
        <svg {...commonProps}>
          <path d="M7 21V9.5L12 5l5 4.5V21M9.5 13h5M9.5 16h5M9.5 19h5" />
        </svg>
      );
    case "notification":
      return (
        <svg {...commonProps}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      );
  }
}
