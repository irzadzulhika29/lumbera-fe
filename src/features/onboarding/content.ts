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
  },
  {
    id: "credit-scoring",
    label: "AI Credit Scoring Transparan & Teraudit",
  },
  {
    id: "offline-first",
    label: "Offline-First untuk Area 3T",
  },
] as const;

export const ROLE_OPTIONS = [
  {
    id: "officer",
    title: "Pengurus Koperasi",
    description: "Kelola transaksi, laporan & ledger",
  },
  {
    id: "member",
    title: "Anggota Koperasi",
    description: "Pantau saldo & skor kredit Anda",
  },
] as const;
