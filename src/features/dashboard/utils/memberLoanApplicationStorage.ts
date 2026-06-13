"use client";

import type { MemberLoanApplicationResponse } from "@/src/features/dashboard/api";

const MEMBER_LOAN_APPLICATION_RESULT_KEY =
  "lumbera:dashboard:member-loan-application-result";

export function saveMemberLoanApplicationResult(
  result: MemberLoanApplicationResponse["data"],
) {
  window.sessionStorage.setItem(
    MEMBER_LOAN_APPLICATION_RESULT_KEY,
    JSON.stringify(result),
  );
}

export function getMemberLoanApplicationResult():
  | MemberLoanApplicationResponse["data"]
  | null {
  const rawValue = window.sessionStorage.getItem(
    MEMBER_LOAN_APPLICATION_RESULT_KEY,
  );

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as MemberLoanApplicationResponse["data"];
  } catch {
    window.sessionStorage.removeItem(MEMBER_LOAN_APPLICATION_RESULT_KEY);
    return null;
  }
}

export function clearMemberLoanApplicationResult() {
  window.sessionStorage.removeItem(MEMBER_LOAN_APPLICATION_RESULT_KEY);
}
