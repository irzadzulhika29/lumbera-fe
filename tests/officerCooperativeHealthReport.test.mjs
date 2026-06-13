import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const reportScreenSource = readFileSync(
  resolve(
    "src/features/dashboard/components/officer/screens/OfficerReportScreen.tsx",
  ),
  "utf8",
);

assert.match(reportScreenSource, /Kesehatan Koperasi/);
assert.match(reportScreenSource, /Keuangan \(35%\)/);
assert.match(reportScreenSource, /Operasional \(25%\)/);
assert.match(reportScreenSource, /Data \(20%\)/);
assert.match(reportScreenSource, /Kepatuhan \(20%\)/);
assert.match(reportScreenSource, /87/);
assert.match(reportScreenSource, /75/);
assert.match(reportScreenSource, /80/);
assert.match(reportScreenSource, /72/);
assert.match(reportScreenSource, />\s*A\s*</);
assert.match(reportScreenSource, /87\/100/);
assert.match(reportScreenSource, /Cooperative Health Score/);
assert.match(reportScreenSource, /Laporan Keuangan/);
assert.match(reportScreenSource, /Cek keamanan/);
assert.match(reportScreenSource, /SelectField/);
assert.match(reportScreenSource, /dashboard\/reports\/finance\?period=/);

assert.doesNotMatch(reportScreenSource, /CooperativeHealthCard/);
assert.doesNotMatch(reportScreenSource, /Ringkasan Keuangan/);
assert.doesNotMatch(reportScreenSource, /Total Aktiva/);
assert.doesNotMatch(reportScreenSource, /Simpanan Anggota/);
assert.doesNotMatch(reportScreenSource, /Rp\s/);

console.log("officer cooperative health report smoke test passed");
