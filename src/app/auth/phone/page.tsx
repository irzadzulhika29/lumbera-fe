import PhoneAuthScreen from "@/src/features/auth/components/PhoneAuthScreen";
import {
  isAuthEntryFlow,
  isRoleOptionId,
  supportsRoleOnboarding,
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
  const resolvedFlow: AuthEntryFlow =
    requestedFlow && isAuthEntryFlow(requestedFlow) ? requestedFlow : "login";
  const flow: AuthEntryFlow =
    resolvedFlow === "register" && !supportsRoleOnboarding(roleId)
      ? "login"
      : resolvedFlow;

  return <PhoneAuthScreen roleId={roleId} flow={flow} />;
}
