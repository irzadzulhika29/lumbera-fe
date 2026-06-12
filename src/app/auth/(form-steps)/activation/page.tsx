import CooperativeActivationScreen from "@/src/features/auth/components/CooperativeActivationScreen";
import {
  isRoleOptionId,
  type RoleOptionId,
} from "@/src/features/onboarding/content";

export default async function AuthActivationPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedRole = resolvedSearchParams.role;
  const roleId: RoleOptionId =
    requestedRole && isRoleOptionId(requestedRole) ? requestedRole : "officer";

  return <CooperativeActivationScreen roleId={roleId} />;
}
