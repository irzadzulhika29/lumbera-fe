import CooperativeBankAccountScreen from "@/src/features/auth/components/CooperativeBankAccountScreen";
import {
  isRoleOptionId,
  type RoleOptionId,
} from "@/src/features/onboarding/content";

export default async function AuthBankAccountPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedRole = resolvedSearchParams.role;
  const roleId: RoleOptionId =
    requestedRole && isRoleOptionId(requestedRole) ? requestedRole : "officer";

  return <CooperativeBankAccountScreen roleId={roleId} />;
}
