import type { Metadata } from "next";

import OfficerStoreCashierSuccessScreen from "@/src/features/dashboard/components/officer/store/screens/OfficerStoreCashierSuccessScreen";

export const metadata: Metadata = {
  title: "Pembayaran Berhasil Officer | Lumbera",
  description: "Status sukses pembayaran kasir.",
};

export default function OfficerStoreCashierSuccessPage() {
  return <OfficerStoreCashierSuccessScreen />;
}
