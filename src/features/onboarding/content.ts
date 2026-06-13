export const START_ROUTE = "/role-select";
export const AUTH_PHONE_ROUTE = "/auth/phone";
export const AUTH_OTP_ROUTE = "/auth/otp";
export const AUTH_PIN_ROUTE = "/auth/pin";
export const AUTH_FORGOT_PIN_ROUTE = "/auth/forgot-pin";
export const AUTH_FORGOT_PIN_OTP_ROUTE = "/auth/forgot-pin/otp";
export const AUTH_FORGOT_PIN_PIN_ROUTE = "/auth/forgot-pin/pin";
export const AUTH_PROFILE_ROUTE = "/auth/profile";
export const AUTH_COOPERATIVE_TYPE_ROUTE = "/auth/cooperative-type";
export const AUTH_COOPERATIVE_PROFILE_ROUTE = "/auth/cooperative-profile";
export const AUTH_FINANCIAL_CONFIG_ROUTE = "/auth/financial-config";
export const AUTH_BANK_ACCOUNT_ROUTE = "/auth/bank-account";
export const AUTH_ACTIVATION_ROUTE = "/auth/activation";
export const AUTH_ACTIVATION_SUCCESS_ROUTE = "/auth/activation-success";

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

export type RoleOptionId = (typeof ROLE_OPTIONS)[number]["id"];
export type PinSetupStep = "create" | "confirm" | "login";
export type AuthEntryFlow = "login" | "register";

export const getAuthPhoneHref = (
  roleId: RoleOptionId,
  flow: AuthEntryFlow = "login",
) =>
  `${AUTH_PHONE_ROUTE}?role=${roleId}${flow === "register" ? "&flow=register" : ""}`;

export const getAuthRegisterPhoneHref = (roleId: RoleOptionId) =>
  getAuthPhoneHref(roleId, "register");

export const getAuthOtpHref = (roleId: RoleOptionId) =>
  `${AUTH_OTP_ROUTE}?role=${roleId}`;

export const getAuthPinHref = (roleId: RoleOptionId, step: PinSetupStep) =>
  `${AUTH_PIN_ROUTE}?role=${roleId}&step=${step}`;

export const getAuthProfileHref = (roleId: RoleOptionId) =>
  `${AUTH_PROFILE_ROUTE}?role=${roleId}&step=1`;

export const getForgotPinPhoneHref = (roleId: RoleOptionId) =>
  `${AUTH_FORGOT_PIN_ROUTE}?role=${roleId}`;

export const getForgotPinOtpHref = (roleId: RoleOptionId) =>
  `${AUTH_FORGOT_PIN_OTP_ROUTE}?role=${roleId}`;

export const getForgotPinPinHref = (roleId: RoleOptionId) =>
  `${AUTH_FORGOT_PIN_PIN_ROUTE}?role=${roleId}`;

export const getAuthCooperativeTypeHref = (roleId: RoleOptionId) =>
  `${AUTH_COOPERATIVE_TYPE_ROUTE}?role=${roleId}`;

export const getAuthCooperativeProfileHref = (roleId: RoleOptionId) =>
  `${AUTH_COOPERATIVE_PROFILE_ROUTE}?role=${roleId}`;

export const getAuthFinancialConfigHref = (roleId: RoleOptionId) =>
  `${AUTH_FINANCIAL_CONFIG_ROUTE}?role=${roleId}`;

export const getAuthBankAccountHref = (roleId: RoleOptionId) =>
  `${AUTH_BANK_ACCOUNT_ROUTE}?role=${roleId}`;

export const getAuthActivationHref = (roleId: RoleOptionId) =>
  `${AUTH_ACTIVATION_ROUTE}?role=${roleId}`;

export const getAuthActivationSuccessHref = (roleId: RoleOptionId) =>
  `${AUTH_ACTIVATION_SUCCESS_ROUTE}?role=${roleId}`;

export const getPostActivationHref = (roleId: RoleOptionId) =>
  roleId === "officer" ? "/dashboard" : "/transactions";

export const isRoleOptionId = (value: string): value is RoleOptionId =>
  ROLE_OPTIONS.some((option) => option.id === value);

export const isPinSetupStep = (value: string): value is PinSetupStep =>
  value === "create" || value === "confirm" || value === "login";

export const isAuthEntryFlow = (value: string): value is AuthEntryFlow =>
  value === "login" || value === "register";

export const getRolePhoneErrorMessage = (roleId: RoleOptionId) =>
  roleId === "officer"
    ? "Nomor ini tidak terdaftar sebagai pengurus koperasi"
    : "Nomor ini tidak terdaftar sebagai anggota koperasi";

export const getRoleOption = (roleId: RoleOptionId) =>
  ROLE_OPTIONS.find((option) => option.id === roleId) ?? ROLE_OPTIONS[0];

export const getPostLoginHref = (roleCode?: string | null) =>
  roleCode === "PENGURUS_KOPERASI" ? "/dashboard" : "/transactions";
