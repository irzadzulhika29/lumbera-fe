export const DESKTOP_NAV_ITEMS = [
  { id: "fitur", label: "Fitur" },
  { id: "cara-kerja", label: "Cara Kerja" },
  { id: "mitra", label: "Mitra" },
] as const;

export const COOPERATIVE_REALITY_CARDS = [
  {
    id: "manual-ledger",
    accent: "82%",
    description: "Masih Catat Manual di Buku atau Excel",
    body: "Data mudah hilang, dimanipulasi, atau tidak bisa diverifikasi pihak luar.",
    className: "bg-[#e6f3f5] text-[#0f5054]",
  },
  {
    id: "unreachable-financing",
    accent: "Rp 4,7T",
    description: "Pembiayaan yang Tidak Terjangkau",
    body: "Mitra fintech tidak bisa menilai kelayakan tanpa data terstandar dan terpercaya.",
    className: "bg-[#1b9d9d] text-white",
  },
  {
    id: "credit-history-gap",
    accent: "0",
    description: "Anggota Tanpa Riwayat Kredit",
    body: "Petani disiplin bertahun-tahun tetap dianggap unbankable oleh lembaga formal.",
    className: "bg-[#0c3b3c] text-white",
  },
] as const;

export const TESTIMONIAL_CARDS = [
  {
    id: "rini-1",
    quote:
      "Sebelum LUMBERA, laporan bulanan butuh 2 hari. Sekarang 5 menitan langsung sesuai format OJK.",
    name: "Rini Puspitasari",
    role: "Credit Analyst",
  },
  {
    id: "rini-2",
    quote:
      "Sebelum LUMBERA, laporan bulanan butuh 2 hari. Sekarang 5 menitan langsung sesuai format OJK.",
    name: "Rini Puspitasari",
    role: "Credit Analyst",
  },
  {
    id: "rini-3",
    quote:
      "Sebelum LUMBERA, laporan bulanan butuh 2 hari. Sekarang 5 menitan langsung sesuai format OJK.",
    name: "Rini Puspitasari",
    role: "Credit Analyst",
  },
] as const;

export type DesktopNavId = (typeof DESKTOP_NAV_ITEMS)[number]["id"];
