import type { MemberLoanDashboardResponse } from "@/src/features/dashboard/api";
import type {
  DashboardActiveLoanSummary,
  DashboardLoanCreditProfile,
  DashboardLoanHistoryItem,
  DashboardLoanScheduleRow,
} from "@/src/features/dashboard/types";

function formatCurrency(amount: number) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`;
}

function formatDateLabel(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}

function formatDateTimeLabel(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  })
    .format(new Date(value))
    .replace(".", ":");
}

export function mapMemberLoanDashboardToCreditProfile(
  data: MemberLoanDashboardResponse["data"],
): DashboardLoanCreditProfile | undefined {
  if (
    !data.mcs ||
    !data.mcs.grade?.trim() ||
    !data.mcs.profile_text?.trim() ||
    !data.mcs.last_score_updated_at
  ) {
    return undefined;
  }

  return {
    score: data.mcs.score,
    maxScore: data.mcs.max_score,
    gradeLabel: `Grade ${data.mcs.grade}`,
    title: data.mcs.profile_text,
    subtitle: "Member Creditworthiness Score",
    updatedLabel: `Diperbarui ${formatDateTimeLabel(
      data.mcs.last_score_updated_at,
    )}`,
    explanation: data.mcs.explanation,
    factors: data.mcs.components.map((component) => ({
      id: component.code.toLowerCase(),
      label: component.label,
      weightLabel: `${Math.round(component.weight * 100)}%`,
      score: component.score,
    })),
  };
}

export function mapMemberLoanDashboardToActiveLoan(
  data: MemberLoanDashboardResponse["data"],
): DashboardActiveLoanSummary | undefined {
  if (!data.active_loan) {
    return undefined;
  }

  return {
    reference: `Pinjaman Aktif - #${data.active_loan.loan_number}`,
    amount: formatCurrency(data.active_loan.remaining_payable_amount),
    installmentLabel: formatCurrency(data.active_loan.monthly_installment_amount),
    tenorLabel: `${data.active_loan.paid_installment_count} / ${data.active_loan.term_months} bulan`,
    dueDateLabel: formatDateLabel(data.active_loan.next_due_date),
    paidProgressPercent: data.active_loan.paid_percentage,
    paidProgressLabel: data.active_loan.payment_status_text,
  };
}

export function mapMemberLoanDashboardToScheduleRows(
  data: MemberLoanDashboardResponse["data"],
): DashboardLoanScheduleRow[] {
  return data.installments.map((installment) => ({
    numberLabel: String(installment.installment_no),
    scheduleLabel: formatDateLabel(installment.due_date),
    amountLabel: formatCurrency(installment.due_amount),
    statusLabel: installment.status_label,
    statusTone: installment.status === "PAID" ? "success" : "muted",
  }));
}

export function mapMemberLoanDashboardToHistoryItems(
  data: MemberLoanDashboardResponse["data"],
): DashboardLoanHistoryItem[] {
  return data.loan_history.map((loan) => ({
    id: loan.loan_id,
    title: `#${loan.loan_number} - ${formatCurrency(loan.principal_amount)}`,
    subtitle: loan.description || `${loan.term_months} bulan`,
    statusLabel: loan.status_label,
    statusTone: loan.status === "PAID" ? "success" : "progress",
  }));
}
