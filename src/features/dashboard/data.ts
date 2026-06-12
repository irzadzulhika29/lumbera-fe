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
    href: "/dashboard/officer/members",
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
  userName: "Amba!",
  cooperativeName: "Koperasi Padiwangi",
  period: "KSP · Juni 2026",
  syncLabel: "Online · Sinkron 2 menit lalu",
  notificationCount: 3,
  quickActionsHref: "/dashboard/officer/transactions",
  metrics: [
    {
      label: "CHS Score",
      value: "97",
      badge: "Grade A",
      caption: "↑ +3 bulan ini",
      tone: "success",
    },
    {
      label: "Anggota Aktif",
      value: "35 Anggota",
      caption: "dari 40 terdaftar",
      tone: "muted",
    },
  ],
  actions: [
    {
      label: "Atur Stok",
      description: "",
      href: "/dashboard/officer/transactions",
      icon: "savings",
      tone: "teal",
    },
    {
      label: "Transaksi",
      description: "",
      href: "/dashboard/officer/transactions",
      icon: "loan",
      tone: "blue",
    },
    {
      label: "Laporan",
      description: "",
      href: "/dashboard/reports",
      icon: "reports",
      tone: "orange",
    },
  ],
  transactions: [
    {
      id: "trx-001",
      initials: "BS",
      name: "Budi Setiawan",
      description: "Simpanan Wajib · 09.12",
      amount: "+Rp50.000",
      status: "Sinkron",
      statusTone: "success",
      avatarTone: "blue",
    },
    {
      id: "trx-002",
      initials: "RP",
      name: "Rahmad Pambudi",
      description: "Angsuran Pinjaman · 02.12",
      amount: "+Rp50.000",
      status: "Pending",
      statusTone: "warning",
      avatarTone: "blue",
    },
    {
      id: "trx-003",
      initials: "RP",
      name: "Rahmad Pambudi",
      description: "Simpanan Wajib · 01.12",
      amount: "+Rp50.000",
      status: "Sinkron",
      statusTone: "success",
      avatarTone: "blue",
    },
    {
      id: "trx-004",
      initials: "RP",
      name: "Rahmad Pambudi",
      description: "Simpanan Wajib · 01.12",
      amount: "+Rp50.000",
      status: "Sinkron",
      statusTone: "success",
      avatarTone: "blue",
    },
  ],
  navigation: [...sharedNavigation],
};

const memberDashboard: DashboardViewModel = {
  ...officerDashboard,
  role: "member",
  userName: "Bu Siti!",
  quickActionsHref: undefined,
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

export function getDashboardNavigation(
  role: DashboardRole,
  activeLabel: string = "Beranda",
) {
  const baseNavigation =
    role === "officer" ? officerDashboard.navigation : memberDashboard.navigation;

  return baseNavigation.map((item) => ({
    ...item,
    active: item.label === activeLabel,
  }));
}

export function getDashboardData(role: DashboardRole): DashboardViewModel {
  return role === "officer" ? officerDashboard : memberDashboard;
}
