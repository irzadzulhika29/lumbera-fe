import assert from "node:assert/strict";

import {
  AUTH_PHONE_ROUTE,
  AUTH_OTP_ROUTE,
  AUTH_PIN_ROUTE,
  AUTH_PROFILE_ROUTE,
  AUTH_COOPERATIVE_TYPE_ROUTE,
  AUTH_COOPERATIVE_PROFILE_ROUTE,
  AUTH_FINANCIAL_CONFIG_ROUTE,
  AUTH_BANK_ACCOUNT_ROUTE,
  AUTH_ACTIVATION_ROUTE,
  AUTH_ACTIVATION_SUCCESS_ROUTE,
  LANDING_FEATURES,
  LANDING_HEADLINE,
  ROLE_OPTIONS,
  START_ROUTE,
  getAuthActivationHref,
  getAuthActivationSuccessHref,
  getAuthBankAccountHref,
  getAuthCooperativeProfileHref,
  getAuthCooperativeTypeHref,
  getAuthFinancialConfigHref,
  getAuthOtpHref,
  getAuthPhoneHref,
  getAuthPinHref,
  getAuthProfileHref,
  getRolePhoneErrorMessage,
} from "../src/features/onboarding/content.ts";
import {
  getPendingPinStorageKey,
  validatePinConfirmation,
} from "../src/features/auth/utils/pinSetupFlow.ts";

assert.deepEqual(LANDING_HEADLINE, [
  "Platform",
  "Multi-Koperasi",
  "Digital Indonesia",
]);

assert.equal(START_ROUTE, "/role-select");

assert.deepEqual(
  LANDING_FEATURES.map((feature) => feature.label),
  [
    "Verifiable Ledger berbasis hash chain",
    "AI Credit Scoring Transparan & Teraudit",
    "Offline-First untuk Area 3T",
  ],
);

assert.deepEqual(
  ROLE_OPTIONS.map((option) => option.title),
  ["Pengurus Koperasi", "Anggota Koperasi"],
);

assert.deepEqual(
  ROLE_OPTIONS.map((option) => option.description),
  [
    "Kelola transaksi, laporan & ledger",
    "Pantau saldo & skor kredit Anda",
  ],
);

assert.equal(AUTH_PHONE_ROUTE, "/auth/phone");
assert.equal(AUTH_OTP_ROUTE, "/auth/otp");
assert.equal(AUTH_PIN_ROUTE, "/auth/pin");
assert.equal(AUTH_PROFILE_ROUTE, "/auth/profile");
assert.equal(AUTH_COOPERATIVE_TYPE_ROUTE, "/auth/cooperative-type");
assert.equal(AUTH_COOPERATIVE_PROFILE_ROUTE, "/auth/cooperative-profile");
assert.equal(AUTH_FINANCIAL_CONFIG_ROUTE, "/auth/financial-config");
assert.equal(AUTH_BANK_ACCOUNT_ROUTE, "/auth/bank-account");
assert.equal(AUTH_ACTIVATION_ROUTE, "/auth/activation");
assert.equal(AUTH_ACTIVATION_SUCCESS_ROUTE, "/auth/activation-success");

assert.equal(getAuthPhoneHref("officer"), "/auth/phone?role=officer");
assert.equal(getAuthPhoneHref("member"), "/auth/phone?role=member");
assert.equal(getAuthOtpHref("officer"), "/auth/otp?role=officer");
assert.equal(getAuthPinHref("member", "create"), "/auth/pin?role=member&step=create");
assert.equal(
  getAuthPinHref("officer", "confirm"),
  "/auth/pin?role=officer&step=confirm",
);
assert.equal(getAuthProfileHref("officer"), "/auth/profile?role=officer&step=1");
assert.equal(
  getAuthCooperativeTypeHref("member"),
  "/auth/cooperative-type?role=member",
);
assert.equal(
  getAuthCooperativeProfileHref("officer"),
  "/auth/cooperative-profile?role=officer",
);
assert.equal(
  getAuthFinancialConfigHref("member"),
  "/auth/financial-config?role=member",
);
assert.equal(
  getAuthBankAccountHref("officer"),
  "/auth/bank-account?role=officer",
);
assert.equal(
  getAuthActivationHref("member"),
  "/auth/activation?role=member",
);
assert.equal(
  getAuthActivationSuccessHref("officer"),
  "/auth/activation-success?role=officer",
);

assert.equal(
  getRolePhoneErrorMessage("officer"),
  "Nomor ini tidak terdaftar sebagai pengurus koperasi",
);

assert.equal(
  getRolePhoneErrorMessage("member"),
  "Nomor ini tidak terdaftar sebagai anggota koperasi",
);

assert.equal(getPendingPinStorageKey("officer"), "lumbera.pending-pin.officer");

assert.equal(validatePinConfirmation("", "123456"), "PIN awal tidak ditemukan. Ulangi dari awal.");
assert.equal(validatePinConfirmation("123456", "12345"), "PIN harus terdiri dari 6 digit");
assert.equal(validatePinConfirmation("123456", "654321"), "PIN tidak sesuai. Coba masukkan ulang.");
assert.equal(validatePinConfirmation("123456", "123456"), null);

console.log("onboarding content smoke test passed");
