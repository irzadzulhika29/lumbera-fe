import type { DashboardAction, DashboardIconName } from "@/src/features/dashboard/types";

export type OfficerTransactionType =
  | "savings"
  | "loans"
  | "installments"
  | "stock-mutations";

export type OfficerMember = {
  id: string;
  initials: string;
  name: string;
  meta: string;
  selected?: boolean;
};

export type OfficerTransactionTypeConfig = {
  slug: OfficerTransactionType;
  title: string;
  subtitle: string;
  icon: DashboardIconName;
  tone: DashboardAction["tone"];
};

export const officerTransactionTypeConfigs: OfficerTransactionTypeConfig[] = [
  {
    slug: "savings",
    title: "Simpanan",
    subtitle: "Sukarela",
    icon: "savings",
    tone: "teal",
  },
  {
    slug: "loans",
    title: "Pinjaman",
    subtitle: "Pengajuan",
    icon: "loan",
    tone: "blue",
  },
  {
    slug: "installments",
    title: "Angsuran",
    subtitle: "Bayar Cicilan",
    icon: "installment",
    tone: "green",
  },
];

export const officerTransactionMenus: DashboardAction[] =
  officerTransactionTypeConfigs.map((item) => ({
    label: item.title,
    description: "",
    href: `/dashboard/officer/transactions/${item.slug}/member`,
    icon: item.icon,
    tone: item.tone,
  }));

export const officerMembers: OfficerMember[] = [
  {
    id: "member-001",
    initials: "SL",
    name: "Bu Siti Lestari",
    meta: "No. Ang. 0012 · KSP · Grade AA",
    selected: true,
  },
  {
    id: "member-002",
    initials: "LW",
    name: "Bu Lestari Wahyuni",
    meta: "No. Ang. 0028 · KSP · Grade B",
  },
  {
    id: "member-003",
    initials: "LS",
    name: "Pak Lestari Susanto",
    meta: "No. Ang. 0041 · KSP · Grade A",
  },
];

export function getOfficerTransactionTypeConfig(
  slug: string,
): OfficerTransactionTypeConfig | null {
  return (
    officerTransactionTypeConfigs.find((item) => item.slug === slug) ?? null
  );
}
