import { Icon } from "@iconify/react";

import type { DashboardIconName } from "@/src/features/dashboard/types";

export type DashboardIconProps = {
  name: DashboardIconName;
  className?: string;
};

const dashboardIconMap: Record<DashboardIconName, string> = {
  home: "solar:home-angle-linear",
  members: "solar:users-group-rounded-linear",
  reports: "solar:document-text-linear",
  profile: "solar:user-rounded-linear",
  savings: "solar:wallet-money-linear",
  loan: "solar:card-transfer-linear",
  installment: "solar:calendar-mark-linear",
  notification: "solar:bell-linear",
};

export default function DashboardIcon({
  name,
  className = "h-6 w-6",
}: DashboardIconProps) {
  return (
    <Icon
      icon={dashboardIconMap[name]}
      className={className}
      aria-hidden="true"
    />
  );
}
