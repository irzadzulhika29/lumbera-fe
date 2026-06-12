export const COOPERATIVE_TYPE_OPTIONS = [
  {
    id: "ksp",
    title: "KSP",
    description: "Koperasi Simpan Pinjam",
  },
  {
    id: "pangan",
    title: "Pangan",
    description: "Beras, Jagung, Bulky",
  },
  {
    id: "cold-chain",
    title: "Cold-Chain",
    description: "Sayur, Buah, Ikan",
  },
  {
    id: "toko-gerai",
    title: "Toko Gerai",
    description: "Retail, Warung Koperasi",
  },
  {
    id: "utilitas",
    title: "Utilitas",
    description: "Air, Listrik, Gas",
  },
  {
    id: "peternakan",
    title: "Peternakan",
    description: "Sapi, Kambing, Ayam",
  },
] as const;

export type CooperativeTypeId = (typeof COOPERATIVE_TYPE_OPTIONS)[number]["id"];

export const COOPERATIVE_TYPE_CODE_MAP = {
  ksp: "KSP",
  pangan: "PANGAN_BULKY",
  "cold-chain": "COLD_CHAIN",
  "toko-gerai": "TOKO_GERAI",
  utilitas: "UTILITY",
  peternakan: "PETERNAKAN",
} as const;
