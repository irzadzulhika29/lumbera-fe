import assert from "node:assert/strict";

import {
  formatThousandGroupedNumber,
  sanitizeDigitInput,
} from "../src/shared/utils/numberFormatting.ts";

assert.equal(sanitizeDigitInput("100.000"), "100000");
assert.equal(sanitizeDigitInput("Rp 250.500"), "250500");
assert.equal(sanitizeDigitInput("000123"), "123");
assert.equal(sanitizeDigitInput(""), "");

assert.equal(formatThousandGroupedNumber("100000"), "100.000");
assert.equal(formatThousandGroupedNumber("2505000"), "2.505.000");
assert.equal(formatThousandGroupedNumber("999"), "999");
assert.equal(formatThousandGroupedNumber(""), "");

console.log("number formatting smoke test passed");
