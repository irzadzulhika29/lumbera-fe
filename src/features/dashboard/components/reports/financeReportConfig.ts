export type FinanceReportType = "balance" | "profit-loss" | "cash-flow";

export type FinanceTableCell = {
  amount: number;
  prefix?: "" | "+" | "-";
  tone?: "positive" | "negative" | "neutral";
};

export type FinanceTableRow = {
  label: string;
  type: "section" | "row" | "summary" | "total";
  tone?: "positive" | "negative";
  values?: Array<number | FinanceTableCell>;
};

export type FinanceTableConfig = {
  exportLabel: string;
  rows: FinanceTableRow[];
  title: string;
};

const values = [1_000_000, 1_000_000, 1_000_000];
const positiveValues: FinanceTableCell[] = values.map((amount) => ({
  amount,
  prefix: "+",
  tone: "positive",
}));
const negativeValues: FinanceTableCell[] = values.map((amount) => ({
  amount,
  prefix: "-",
  tone: "negative",
}));

export const financeTableConfigs: Record<
  FinanceReportType,
  FinanceTableConfig
> = {
  balance: {
    title: "Neraca",
    exportLabel: "Export .XLSX",
    rows: [
      { label: "AKTIVA", type: "section" },
      { label: "Uang Kas", type: "row", values },
      { label: "Simpanan di Bank", type: "row", values },
      {
        label: "Total Aktiva Lancar",
        type: "summary",
        tone: "positive",
        values,
      },
      { label: "TOTAL AKTIVA", type: "total", tone: "positive", values },
      { label: "KEWAJIBAN & MODAL", type: "section" },
      {
        label: "Utang Belum Lunas",
        type: "row",
        tone: "negative",
        values,
      },
      { label: "Modal Koperasi", type: "row", values },
      { label: "TOTAL", type: "total", tone: "positive", values },
    ],
  },
  "profit-loss": {
    title: "Laba Rugi",
    exportLabel: "Export .XLSX",
    rows: [
      { label: "PENDAPATAN USAHA", type: "section" },
      { label: "Pendapatan Bunga Pinjaman", type: "row", values },
      { label: "Pendapatan Administrasi", type: "row", values },
      { label: "Pendapatan Lain-lain", type: "row", values },
      {
        label: "Total Pendapatan",
        type: "summary",
        tone: "positive",
        values,
      },
      { label: "BEBAN USAHA", type: "section" },
      { label: "Beban Operasional", type: "row", tone: "negative", values },
      { label: "Beban Gaji Pengurus", type: "row", tone: "negative", values },
      { label: "Beban Penyusutan", type: "row", tone: "negative", values },
      { label: "Beban ATK & Umum", type: "row", tone: "negative", values },
      { label: "TOTAL", type: "total", tone: "negative", values },
    ],
  },
  "cash-flow": {
    title: "Arus Kas",
    exportLabel: "Export .XLSX",
    rows: [
      { label: "AKTIVITAS OPERASI", type: "section" },
      { label: "Penerimaan Simpanan", type: "row", values: positiveValues },
      { label: "Penerimaan Angsuran", type: "row", values: positiveValues },
      { label: "Pembayaran Pinjaman", type: "row", values: negativeValues },
      { label: "Beban Operasional", type: "row", values: negativeValues },
      {
        label: "Bersih Operasi",
        type: "summary",
        tone: "positive",
        values: positiveValues,
      },
      { label: "AKTIVITAS INVESTASI", type: "section" },
      {
        label: "Pembelian Inventaris",
        type: "row",
        values: [
          { amount: 1_000_000, prefix: "-", tone: "negative" },
          { amount: 1_000_000, tone: "negative" },
          { amount: 1_000_000, tone: "negative" },
        ],
      },
      {
        label: "Bersih Investasi",
        type: "total",
        tone: "negative",
        values: negativeValues,
      },
      { label: "AKTIVITAS PENDANAAN", type: "section" },
      { label: "Penambahan Modal", type: "row", values: positiveValues },
      {
        label: "Bersih Pendanaan",
        type: "summary",
        tone: "positive",
        values: positiveValues,
      },
    ],
  },
};

export const financeReportTabs: Array<{
  label: string;
  value: FinanceReportType;
}> = [
  { label: "Neraca", value: "balance" },
  { label: "Laba Rugi", value: "profit-loss" },
  { label: "Arus Kas", value: "cash-flow" },
];
