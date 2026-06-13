import PinSetupScreen from "@/src/features/auth/components/PinSetupScreen";
import {
  isPinSetupStep,
  isRoleOptionId,
  type PinSetupStep,
  type RoleOptionId,
} from "@/src/features/onboarding/content";

export default async function AuthPinPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; step?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedRole = resolvedSearchParams.role;
  const requestedStep = resolvedSearchParams.step;

  const roleId: RoleOptionId =
    requestedRole && isRoleOptionId(requestedRole) ? requestedRole : "officer";
  const step: PinSetupStep =
    requestedStep && isPinSetupStep(requestedStep) ? requestedStep : "login";

  return <PinSetupScreen key={`${roleId}-${step}`} roleId={roleId} step={step} />;
}
