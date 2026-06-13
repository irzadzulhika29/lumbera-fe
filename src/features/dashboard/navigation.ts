import type {
  DashboardNavigationItem,
  DashboardRole,
} from "@/src/features/dashboard/types";

export const officerNavigation = [
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
] as const satisfies ReadonlyArray<DashboardNavigationItem>;

export const memberNavigation = [
  {
    label: "Beranda",
    href: "/dashboard/member",
    icon: "home",
    active: true,
  },
  {
    label: "Tabungan",
    href: "/dashboard/member/savings",
    icon: "savings",
  },
  {
    label: "Pinjaman",
    href: "/dashboard/member/loans",
    icon: "loan",
  },
  {
    label: "Profil",
    href: "/dashboard/member/profile",
    icon: "profile",
  },
] as const satisfies ReadonlyArray<DashboardNavigationItem>;

export function getDashboardNavigation(
  role: DashboardRole,
  activeLabel: string = "Beranda",
) {
  const baseNavigation =
    role === "officer" ? officerNavigation : memberNavigation;

  return baseNavigation.map((item) => ({
    ...item,
    active: item.label === activeLabel,
  }));
}
