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
  href: string;
  initials: string;
  name: string;
  description: string;
  amount: string;
  status: string;
  statusTone: "success" | "warning";
  avatarTone: "teal" | "blue";
  direction?: "incoming" | "outgoing";
};

export type DashboardNavigationItem = {
  label: string;
  href: string;
  icon: DashboardIconName;
  active?: boolean;
};

export type DashboardMemberSummary = {
  title: string;
  totalAmount: string;
  primaryMetricLabel: string;
  primaryMetricValue: string;
  secondaryMetricLabel: string;
  secondaryMetricValue: string;
};

export type DashboardCreditProfile = {
  initials: string;
  title: string;
  scoreLabel: string;
  updatedLabel: string;
};

export type DashboardSavingsTransaction = {
  id: string;
  title: string;
  dateLabel: string;
  actorLabel: string;
  dayLabel: string;
  monthLabel: string;
  amount: string;
  direction: "incoming" | "outgoing";
};

export type DashboardSavingsMonthGroup = {
  id: string;
  label: string;
  transactions: DashboardSavingsTransaction[];
};

export type DashboardCreditFactor = {
  id: string;
  label: string;
  weightLabel: string;
  score: number | null;
};

export type DashboardLoanCreditProfile = {
  score: number;
  maxScore: number;
  gradeLabel: string;
  title: string;
  subtitle: string;
  updatedLabel: string;
  explanation?: string;
  factors: DashboardCreditFactor[];
};

export type DashboardActiveLoanSummary = {
  reference: string;
  amount: string;
  installmentLabel: string;
  tenorLabel: string;
  dueDateLabel: string;
  paidProgressPercent: number;
  paidProgressLabel: string;
};

export type DashboardLoanScheduleRow = {
  amountLabel: string;
  numberLabel: string;
  scheduleLabel: string;
  statusLabel: string;
  statusTone: "success" | "muted";
};

export type DashboardLoanHistoryItem = {
  id: string;
  title: string;
  subtitle: string;
  statusLabel: string;
  statusTone: "success" | "progress";
};

export type DashboardCreditAccessItem = {
  id: string;
  title: string;
  subtitle: string;
  initials: string;
  statusLabel?: string;
  statusTone?: "active" | "inactive";
  detailHref?: string;
};

export type DashboardCreditAccessSection = {
  id: string;
  title: string;
  items: DashboardCreditAccessItem[];
};

export type DashboardCreditAccessDetail = {
  id: string;
  title: string;
  subtitle: string;
  initials: string;
  providerLabel: string;
  infoTitle: string;
  infoDescription: string;
  sharedDataItems: string[];
  hiddenDataItems: string[];
  durationOptions: string[];
  defaultDuration: string;
};

export type DashboardViewModel = {
  role: DashboardRole;
  greeting: string;
  userName: string;
  cooperativeName: string;
  period: string;
  syncLabel?: string;
  notificationCount: number;
  metrics: DashboardMetric[];
  quickActionsHref?: string;
  actions: DashboardAction[];
  transactions: DashboardTransaction[];
  navigation: DashboardNavigationItem[];
  memberSummary?: DashboardMemberSummary;
  creditProfile?: DashboardCreditProfile;
  savingsHistory?: DashboardSavingsMonthGroup[];
  loanCreditProfile?: DashboardLoanCreditProfile;
  activeLoanSummary?: DashboardActiveLoanSummary;
  loanSchedule?: DashboardLoanScheduleRow[];
  loanHistory?: DashboardLoanHistoryItem[];
  creditAccessSections?: DashboardCreditAccessSection[];
  creditAccessDetails?: DashboardCreditAccessDetail[];
};
