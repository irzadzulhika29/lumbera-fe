import type {
  DashboardAction,
  DashboardIconName,
} from "@/src/features/dashboard/types";

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
    initials: "BS",
    name: "Budi Setiawan",
    meta: "No. Ang. 0012 · KSP · Grade AA",
  },
  {
    id: "member-002",
    initials: "AS",
    name: "Aria Saputra",
    meta: "No. Ang. 0045 · KSP · Grade B",
  },
  {
    id: "member-003",
    initials: "DY",
    name: "Dewi Yuliani",
    meta: "No. Ang. 0078 · KSP · Grade B",
  },
  {
    id: "member-004",
    initials: "AR",
    name: "Arif Rahman",
    meta: "No. Ang. 0092 · KSP · Grade A",
  },
  {
    id: "member-005",
    initials: "MT",
    name: "Mita Tantri",
    meta: "No. Ang. 0056 · KSP · Grade B",
  },
  {
    id: "member-006",
    initials: "RS",
    name: "Rizki Santoso",
    meta: "No. Ang. 0085 · KSP · Grade C",
  },
  {
    id: "member-007",
    initials: "LS",
    name: "Lina Sari",
    meta: "No. Ang. 0101 · KSP · Grade A",
  },
  {
    id: "member-008",
    initials: "BP",
    name: "Budi Prasetyo",
    meta: "No. Ang. 0067 · KSP · Grade B",
  },
];

export function getOfficerTransactionTypeConfig(
  slug: string,
): OfficerTransactionTypeConfig | null {
  return (
    officerTransactionTypeConfigs.find((item) => item.slug === slug) ?? null
  );
}
