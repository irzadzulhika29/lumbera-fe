import ForgotPinResetScreen from "@/src/features/auth/components/ForgotPinResetScreen";
import {
  isRoleOptionId,
  type RoleOptionId,
} from "@/src/features/onboarding/content";

export default async function ForgotPinPinPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedRole = resolvedSearchParams.role;
  const roleId: RoleOptionId =
    requestedRole && isRoleOptionId(requestedRole) ? requestedRole : "officer";

  return <ForgotPinResetScreen roleId={roleId} />;
}
