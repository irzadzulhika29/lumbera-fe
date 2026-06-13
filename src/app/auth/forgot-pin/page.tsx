import ForgotPinPhoneScreen from "@/src/features/auth/components/ForgotPinPhoneScreen";
import {
  isRoleOptionId,
  type RoleOptionId,
} from "@/src/features/onboarding/content";

export default async function ForgotPinPhonePage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedRole = resolvedSearchParams.role;
  const roleId: RoleOptionId =
    requestedRole && isRoleOptionId(requestedRole) ? requestedRole : "officer";

  return <ForgotPinPhoneScreen roleId={roleId} />;
}
