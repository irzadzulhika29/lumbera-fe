import FormStepFlowShell from "@/src/features/auth/components/FormStepFlowShell";

export default function AuthFormStepsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormStepFlowShell>{children}</FormStepFlowShell>;
}
