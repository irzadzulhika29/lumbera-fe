import type { Metadata } from "next";

import OfficerStoreCashierCheckoutScreen from "@/src/features/dashboard/components/officer/store/screens/OfficerStoreCashierCheckoutScreen";

export const metadata: Metadata = {
  title: "Pembayaran Kasir Officer | Lumbera",
  description: "Ringkasan pembelian dan proses pembayaran kasir.",
};

export default function OfficerStoreCashierCheckoutPage() {
  return <OfficerStoreCashierCheckoutScreen />;
}
