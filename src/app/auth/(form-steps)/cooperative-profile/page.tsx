import CooperativeProfileScreen from "@/src/features/auth/components/CooperativeProfileScreen";
import {
  isRoleOptionId,
  type RoleOptionId,
} from "@/src/features/onboarding/content";

export default async function AuthCooperativeProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedRole = resolvedSearchParams.role;
  const roleId: RoleOptionId =
    requestedRole && isRoleOptionId(requestedRole) ? requestedRole : "manager";

  return <CooperativeProfileScreen roleId={roleId} />;
}
