export const START_ROUTE = "/role-select";

export const LANDING_HEADLINE = [
  "Platform",
  "Multi-Koperasi",
  "Digital Indonesia",
] as const;

export const LANDING_FEATURES = [
  {
    id: "ledger",
    label: "Verifiable Ledger berbasis hash chain",
    tileClassName: "right-5 top-[-10px] rotate-[8deg]",
  },
  {
    id: "credit-scoring",
    label: "AI Credit Scoring Transparan & Teraudit",
    tileClassName: "left-2 top-3 -rotate-[7deg]",
  },
  {
    id: "offline-first",
    label: "Offline-First untuk Area 3T",
    tileClassName: "right-7 top-3 rotate-[8deg]",
  },
] as const;

export const ROLE_OPTIONS = [
  {
    id: "manager",
    title: "Pengurus Koperasi",
    description: "Kelola transaksi, laporan & ledger",
  },
  {
    id: "member",
    title: "Anggota Koperasi",
    description: "Pantau saldo & skor kredit Anda",
  },
] as const;
