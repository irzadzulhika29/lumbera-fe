import FinancialConfigurationScreen from "@/src/features/auth/components/FinancialConfigurationScreen";
import {
  isRoleOptionId,
  type RoleOptionId,
} from "@/src/features/onboarding/content";

export default async function AuthFinancialConfigPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedRole = resolvedSearchParams.role;
  const roleId: RoleOptionId =
    requestedRole && isRoleOptionId(requestedRole) ? requestedRole : "manager";

  return <FinancialConfigurationScreen roleId={roleId} />;
}
