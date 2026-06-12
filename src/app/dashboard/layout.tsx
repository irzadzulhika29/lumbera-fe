import MobileScreen from "@/src/shared/components/layout/MobileScreen";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileScreen>{children}</MobileScreen>;
}
