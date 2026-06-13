"use client";

export default function CreditAccessDurationOptions({
  options,
  selected,
  disabled,
  onSelect,
}: {
  options: string[];
  selected: string;
  disabled: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-3">
      {options.map((option) => {
        const isSelected = option === selected;

        return (
          <button
            key={option}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(option)}
            className={`flex h-11 items-center justify-center rounded-[8px] text-[0.96rem] font-bold transition-colors ${
              disabled
                ? isSelected
                  ? "bg-[#CFCFCF] text-text"
                  : "bg-[#F1F1F1] text-text/24"
                : isSelected
                  ? "bg-primary text-white"
                  : "bg-[#B9E4E5] text-white"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
