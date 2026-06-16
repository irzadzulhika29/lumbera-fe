import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(
  resolve("src/features/onboarding/components/landing/InstalledMobileOnboarding.tsx"),
  "utf8",
);

assert.match(
  source,
  /rounded-bl-\[108px\]/,
  "mobile onboarding video backdrop should use a deeper bottom-left curve",
);

assert.match(
  source,
  /className="text-\[3\.75rem\] font-bold leading-\[0\.98\] tracking-\[-0\.05em\]"/,
  "mobile onboarding headline should be slightly larger",
);

assert.match(
  source,
  /bg-primary\/58/,
  "mobile onboarding video overlay should be lighter so the video reads through",
);

assert.doesNotMatch(
  source,
  /index \+ 1|h-\[50px\] w-\[42px\]|bg-primary-shadow/,
  "mobile onboarding feature badges should be removed",
);

console.log("onboarding mobile video polish smoke test passed");
