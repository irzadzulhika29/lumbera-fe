import assert from "node:assert/strict";

process.env.NEXT_PUBLIC_API_URL = "https://api.example.com/";

const { buildApiUrl } = await import("../src/shared/api/apiConfig.ts");

assert.equal(buildApiUrl("/auth/login"), "https://api.example.com/auth/login");
assert.equal(
  buildApiUrl("onboarding/profile", {
    role: "officer",
    step: 1,
    empty: "",
    ignored: undefined,
  }),
  "https://api.example.com/onboarding/profile?role=officer&step=1",
);

console.log("api config smoke test passed");
