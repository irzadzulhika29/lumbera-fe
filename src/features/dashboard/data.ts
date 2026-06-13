import type {
  DashboardRole,
  DashboardViewModel,
} from "@/src/features/dashboard/types";

export { getDashboardNavigation } from "./navigation";
import { memberDashboard } from "./memberDashboardData";
import { officerDashboard } from "./officerDashboardData";

export function getDashboardData(role: DashboardRole): DashboardViewModel {
  return role === "officer" ? officerDashboard : memberDashboard;
}
