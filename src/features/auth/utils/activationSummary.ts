import type { OnboardingDraftStateResponse } from "@/src/features/onboarding/api/onboardingTypes";
import { formatThousandGroupedNumber } from "@/src/shared/utils/numberFormatting";

export type SummaryItem = {
  label: string;
  value: string;
};

export type ActivationSummaryState = {
  personalSummary: SummaryItem[];
  cooperativeSummary: SummaryItem[];
};

const POSITION_LABEL_MAP: Record<string, string> = {
  CHAIRMAN: "Ketua",
  SECRETARY: "Sekretaris",
  TREASURER: "Bendahara",
  STAFF: "Staf",
};

const COOPERATIVE_TYPE_LABEL_MAP: Record<string, string> = {
  KSP: "KSP",
  PANGAN_BULKY: "Pangan",
  COLD_CHAIN: "Cold-Chain",
  TOKO_GERAI: "Toko Gerai",
  UTILITY: "Utilitas",
  PETERNAKAN: "Peternakan",
};

const toDisplayValue = (value?: string | number | null) => {
  if (value === null || value === undefined) {
    return "-";
  }

  const normalizedValue = typeof value === "string" ? value.trim() : value;
  return normalizedValue === "" ? "-" : String(normalizedValue);
};

const formatPhoneNumber = (phoneNumber?: string) => {
  if (!phoneNumber) {
    return "-";
  }

  if (phoneNumber.startsWith("62")) {
    return `0${phoneNumber.slice(2)}`;
  }

  return phoneNumber;
};

const formatCurrency = (value?: number) => {
  if (!value) {
    return "Rp 0";
  }

  return `Rp ${formatThousandGroupedNumber(String(value))}`;
};

const formatPercentFromBps = (value?: number, suffix = "") => {
  if (!value) {
    return suffix ? `0%/${suffix}` : "0%";
  }

  const percentValue = (value / 100).toLocaleString("id-ID", {
    minimumFractionDigits: value % 100 === 0 ? 0 : 1,
    maximumFractionDigits: 2,
  });

  return suffix ? `${percentValue}%/${suffix}` : `${percentValue}%`;
};

const maskBankAccountNumber = (value?: string) => {
  if (!value) {
    return "-";
  }

  const visibleDigits = value.slice(-4);
  return `xxxx-${visibleDigits}`;
};

export const buildActivationSummaryState = (
  draftState: OnboardingDraftStateResponse,
): ActivationSummaryState => {
  const personalData = draftState.draft_data.personal_data;
  const cooperativeTypeData = draftState.draft_data.cooperative_type;
  const cooperativeProfileData = draftState.draft_data.cooperative_profile;
  const financialConfigurationData = draftState.draft_data.financial_configuration;
  const bankAccountData = draftState.draft_data.bank_account;

  return {
    personalSummary: [
      {
        label: "Nama",
        value: toDisplayValue(personalData?.full_name),
      },
      {
        label: "NIK",
        value: personalData?.nik_hash ? "Terverifikasi" : "-",
      },
      {
        label: "No. HP",
        value: formatPhoneNumber(draftState.phone_number),
      },
      {
        label: "Jabatan",
        value: toDisplayValue(
          personalData?.position_code
            ? POSITION_LABEL_MAP[personalData.position_code]
            : undefined,
        ),
      },
    ],
    cooperativeSummary: [
      {
        label: "Tipe Koperasi",
        value: toDisplayValue(
          cooperativeTypeData?.cooperative_type
            ? COOPERATIVE_TYPE_LABEL_MAP[cooperativeTypeData.cooperative_type]
            : undefined,
        ),
      },
      {
        label: "Profil",
        value: toDisplayValue(cooperativeProfileData?.cooperative_name),
      },
      {
        label: "Batas Pinjaman",
        value: `${formatCurrency(
          financialConfigurationData?.max_loan_amount_per_member,
        )} - ${formatPercentFromBps(
          financialConfigurationData?.loan_interest_rate_bps_per_month,
          "bln",
        )}`,
      },
      {
        label: "Rekening",
        value:
          bankAccountData?.bank_name && bankAccountData.bank_account_number
            ? `${bankAccountData.bank_name} - ${maskBankAccountNumber(
                bankAccountData.bank_account_number,
              )}`
            : "-",
      },
    ],
  };
};
