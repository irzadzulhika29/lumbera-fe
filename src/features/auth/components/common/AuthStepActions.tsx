import PressButton from "@/src/shared/components/ui/PressButton";

type AuthStepActionsProps = {
  onBack: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  nextLabel: string;
  backLabel?: string;
};

export default function AuthStepActions({
  onBack,
  onNext,
  isNextDisabled,
  nextLabel,
}: AuthStepActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <PressButton
        type="button"
        className="h-14 w-14 shrink-0 px-0 py-0 text-xl"
        aria-label="Kembali"
        onClick={onBack}
      >
        {"<"}
      </PressButton>
      <PressButton
        type="button"
        className="h-14 flex-1 text-base font-semibold"
        disabled={isNextDisabled}
        onClick={onNext}
      >
        {nextLabel}
      </PressButton>
    </div>
  );
}
