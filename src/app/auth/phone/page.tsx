import PhoneAuthScreen from "@/src/features/auth/components/PhoneAuthScreen";
import {
  isAuthEntryFlow,
  isRoleOptionId,
  type AuthEntryFlow,
  type RoleOptionId,
} from "@/src/features/onboarding/content";

export default async function AuthPhonePage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; flow?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedRole = resolvedSearchParams.role;
  const requestedFlow = resolvedSearchParams.flow;
  const roleId: RoleOptionId =
    requestedRole && isRoleOptionId(requestedRole) ? requestedRole : "officer";
  const flow: AuthEntryFlow =
    requestedFlow && isAuthEntryFlow(requestedFlow) ? requestedFlow : "login";

  return <PhoneAuthScreen roleId={roleId} flow={flow} />;
}
