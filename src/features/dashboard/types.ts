export type DashboardRole = "officer" | "member";

export type DashboardIconName =
  | "home"
  | "members"
  | "reports"
  | "profile"
  | "savings"
  | "loan"
  | "installment"
  | "notification"
  | "withdraw";

export type DashboardMetric = {
  label: string;
  value: string;
  badge?: string;
  caption: string;
  tone?: "success" | "muted";
};

export type DashboardAction = {
  label: string;
  description: string;
  href: string;
  icon: DashboardIconName;
  tone: "teal" | "blue" | "green" | "orange";
};

export type DashboardTransaction = {
  id: string;
  initials: string;
  name: string;
  description: string;
  amount: string;
  status: string;
  statusTone: "success" | "warning";
  avatarTone: "teal" | "blue";
};

export type DashboardNavigationItem = {
  label: string;
  href: string;
  icon: DashboardIconName;
  active?: boolean;
};

export type DashboardViewModel = {
  role: DashboardRole;
  greeting: string;
  userName: string;
  cooperativeName: string;
  period: string;
  syncLabel: string;
  notificationCount: number;
  metrics: DashboardMetric[];
  quickActionsHref?: string;
  actions: DashboardAction[];
  transactions: DashboardTransaction[];
  navigation: DashboardNavigationItem[];
};
