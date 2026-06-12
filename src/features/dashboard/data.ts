import type {
  DashboardRole,
  DashboardViewModel,
} from "@/src/features/dashboard/types";

const sharedNavigation = [
  {
    label: "Beranda",
    href: "/dashboard",
    icon: "home",
    active: true,
  },
  {
    label: "Anggota",
    href: "/dashboard/members",
    icon: "members",
  },
  {
    label: "Laporan",
    href: "/dashboard/reports",
    icon: "reports",
  },
  {
    label: "Profil",
    href: "/dashboard/profile",
    icon: "profile",
  },
] as const;

const officerDashboard: DashboardViewModel = {
  role: "officer",
  greeting: "Selamat Pagi,",
  userName: "Pak Asep!",
  cooperativeName: "Koperasi Padiwangi",
  period: "KSP · Juni 2026",
  syncLabel: "Online · Sinkron 2 mnt lalu",
  notificationCount: 3,
  metrics: [
    {
      label: "CHS Score",
      value: "78",
      badge: "Grade A",
      caption: "↑ +3 bulan ini",
      tone: "success",
    },
    {
      label: "Anggota Aktif",
      value: "35",
      caption: "dari 35 terdaftar",
      tone: "muted",
    },
  ],
  actions: [
    {
      label: "Simpanan",
      description: "Setoran",
      href: "/dashboard/savings",
      icon: "savings",
      tone: "teal",
    },
    {
      label: "Pinjaman",
      description: "Pengajuan",
      href: "/dashboard/loans",
      icon: "loan",
      tone: "blue",
    },
    {
      label: "Angsuran",
      description: "Bayar cicilan",
      href: "/dashboard/installments",
      icon: "installment",
      tone: "green",
    },
    {
      label: "Laporan",
      description: "Generate",
      href: "/dashboard/reports",
      icon: "reports",
      tone: "orange",
    },
  ],
  transactions: [
    {
      id: "trx-001",
      initials: "SL",
      name: "Bu Siti Lestari",
      description: "Simpanan Sukarela · 09:12",
      amount: "+Rp500K",
      status: "Sinkron",
      statusTone: "success",
      avatarTone: "teal",
    },
    {
      id: "trx-002",
      initials: "PR",
      name: "Pak Rahman",
      description: "Angsuran Pinjaman · 08:45",
      amount: "+Rp250K",
      status: "Pending",
      statusTone: "warning",
      avatarTone: "blue",
    },
  ],
  navigation: [...sharedNavigation],
};

const memberDashboard: DashboardViewModel = {
  ...officerDashboard,
  role: "member",
  userName: "Bu Siti!",
  metrics: [
    {
      label: "CHS Score",
      value: "78",
      badge: "Grade A",
      caption: "↑ +3 bulan ini",
      tone: "success",
    },
    {
      label: "Saldo Simpanan",
      value: "Rp2,5Jt",
      caption: "aktif bulan ini",
      tone: "muted",
    },
  ],
  transactions: officerDashboard.transactions.slice(0, 1),
  navigation: sharedNavigation.map((item) =>
    item.label === "Anggota"
      ? {
          ...item,
          label: "Aktivitas",
          href: "/dashboard/activity",
        }
      : item,
  ),
};

export function getDashboardData(role: DashboardRole): DashboardViewModel {
  return role === "officer" ? officerDashboard : memberDashboard;
}
