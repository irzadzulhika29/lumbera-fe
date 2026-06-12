import assert from "node:assert/strict";

import {
  LANDING_FEATURES,
  LANDING_HEADLINE,
  ROLE_OPTIONS,
  START_ROUTE,
} from "../src/features/onboarding/content.ts";

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

console.log("onboarding content smoke test passed");
