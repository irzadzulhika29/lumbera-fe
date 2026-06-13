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
  financialSummary?: {
    currentInstallment?: number;
    loanNumber?: string;
    remainingLoan?: number;
    savingsBalance?: number;
  };
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
  inputLabel: string;
  amountOptions?: string[];
  icon: DashboardIconName;
  tone: DashboardAction["tone"];
};

export const officerTransactionTypeConfigs: OfficerTransactionTypeConfig[] = [
  {
    slug: "savings",
    title: "Simpanan",
    subtitle: "Sukarela",
    inputLabel: "Jenis Simpanan",
    amountOptions: ["Wajib", "Sukarela", "Pokok"],
    icon: "savings",
    tone: "teal",
  },
  {
    slug: "loans",
    title: "Pinjaman",
    subtitle: "Pengajuan",
    inputLabel: "",
    amountOptions: [],
    icon: "loan",
    tone: "blue",
  },
  {
    slug: "installments",
    title: "Angsuran",
    subtitle: "Bayar Cicilan",
    inputLabel: "",
    amountOptions: [],
    icon: "installment",
    tone: "green",
  },
  {
    slug: "stock-mutations",
    title: "Penarikan",
    subtitle: "Tarik Tunai",
    inputLabel: "",
    amountOptions: [],
    icon: "withdraw",
    tone: "orange",
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
    financialSummary: {
      currentInstallment: 350_000,
      loanNumber: "P-041",
      remainingLoan: 2_000_000,
      savingsBalance: 5_300_000,
    },
    id: "44444444-0000-0000-0000-000000000001",
    initials: "BS",
    name: "Budi Setiawan",
    meta: "No. Ang. 0012 - KSP - Grade AA",
  },
  {
    financialSummary: {
      currentInstallment: 275_000,
      loanNumber: "P-042",
      remainingLoan: 1_250_000,
      savingsBalance: 4_750_000,
    },
    id: "44444444-0000-0000-0000-000000000002",
    initials: "AS",
    name: "Aria Saputra",
    meta: "No. Ang. 0045 - KSP - Grade B",
  },
  {
    financialSummary: {
      currentInstallment: 0,
      loanNumber: "P-043",
      remainingLoan: 0,
      savingsBalance: 3_600_000,
    },
    id: "44444444-0000-0000-0000-000000000003",
    initials: "DY",
    name: "Dewi Yuliani",
    meta: "No. Ang. 0078 - KSP - Grade B",
  },
  {
    financialSummary: {
      currentInstallment: 425_000,
      loanNumber: "P-044",
      remainingLoan: 3_500_000,
      savingsBalance: 6_100_000,
    },
    id: "44444444-0000-0000-0000-000000000004",
    initials: "AR",
    name: "Arif Rahman",
    meta: "No. Ang. 0092 - KSP - Grade A",
  },
  {
    financialSummary: {
      currentInstallment: 180_000,
      loanNumber: "P-045",
      remainingLoan: 900_000,
      savingsBalance: 2_450_000,
    },
    id: "44444444-0000-0000-0000-000000000005",
    initials: "MT",
    name: "Mita Tantri",
    meta: "No. Ang. 0056 - KSP - Grade B",
  },
  {
    financialSummary: {
      currentInstallment: 120_000,
      loanNumber: "P-046",
      remainingLoan: 450_000,
      savingsBalance: 1_950_000,
    },
    id: "44444444-0000-0000-0000-000000000006",
    initials: "RS",
    name: "Rizki Santoso",
    meta: "No. Ang. 0085 - KSP - Grade C",
  },
  {
    financialSummary: {
      currentInstallment: 0,
      loanNumber: "P-047",
      remainingLoan: 0,
      savingsBalance: 7_800_000,
    },
    id: "44444444-0000-0000-0000-000000000007",
    initials: "LS",
    name: "Lina Sari",
    meta: "No. Ang. 0101 - KSP - Grade A",
  },
  {
    financialSummary: {
      currentInstallment: 310_000,
      loanNumber: "P-048",
      remainingLoan: 1_700_000,
      savingsBalance: 3_200_000,
    },
    id: "44444444-0000-0000-0000-000000000008",
    initials: "BP",
    name: "Budi Prasetyo",
    meta: "No. Ang. 0067 - KSP - Grade B",
  },
];

export function getOfficerTransactionTypeConfig(
  slug: string,
): OfficerTransactionTypeConfig | null {
  return (
    officerTransactionTypeConfigs.find((item) => item.slug === slug) ?? null
  );
}

export function getOfficerMemberById(memberId: string) {
  return officerMembers.find((member) => member.id === memberId) ?? null;
}
