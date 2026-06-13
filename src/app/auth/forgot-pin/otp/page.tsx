import ForgotPinOtpScreen from "@/src/features/auth/components/ForgotPinOtpScreen";
import {
  isRoleOptionId,
  type RoleOptionId,
} from "@/src/features/onboarding/content";

export default async function ForgotPinOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedRole = resolvedSearchParams.role;
  const roleId: RoleOptionId =
    requestedRole && isRoleOptionId(requestedRole) ? requestedRole : "officer";

  return <ForgotPinOtpScreen roleId={roleId} />;
}
