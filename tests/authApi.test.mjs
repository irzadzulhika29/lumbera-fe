import assert from "node:assert/strict";

const { normalizePhoneNumberForApi } = await import(
  "../src/features/auth/api/phoneNumber.ts"
);

assert.equal(normalizePhoneNumberForApi("85706174243"), "085706174243");
assert.equal(normalizePhoneNumberForApi("085706174243"), "085706174243");
assert.equal(normalizePhoneNumberForApi("6285706174243"), "085706174243");
assert.equal(normalizePhoneNumberForApi("+62 857-0617-4243"), "085706174243");
assert.equal(normalizePhoneNumberForApi("85706174243"), "085706174243");

console.log("auth api smoke test passed");
