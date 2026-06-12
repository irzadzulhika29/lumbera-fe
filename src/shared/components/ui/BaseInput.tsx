import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  labelClassName?: string;
  hint?: string;
  error?: string;
  inputClassName?: string;
  startAdornment?: ReactNode;
};

export default function BaseInput({
  id,
  label,
  labelClassName,
  hint,
  error,
  className,
  inputClassName,
  startAdornment,
  disabled = false,
  type = "text",
  ...props
}: BaseInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = hint || error ? `${inputId}-description` : undefined;

  return (
    <div className={twMerge("flex w-full flex-col gap-2.5", className)}>
      {label ? (
        <label
          htmlFor={inputId}
          className={twMerge(
            "text-sm leading-none font-medium text-text",
            labelClassName,
          )}
        >
          {label}
        </label>
      ) : null}

      <div
        className={twMerge(
          "rounded-lg border bg-card px-5 py-3.5 shadow-sm transition-colors",
          error ? "border-error/45" : "border-border",
          disabled ? "opacity-60" : "focus-within:border-secondary/45",
        )}
      >
        <div className="flex items-center gap-4">
          {startAdornment ? (
            <>
              <span className="shrink-0">{startAdornment}</span>
              <span
                aria-hidden="true"
                className="h-8 w-px self-stretch bg-border"
              />
            </>
          ) : null}

          <input
            id={inputId}
            type={type}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={descriptionId}
            className={twMerge(
              "w-full border-0 bg-transparent text-base text-text outline-none placeholder:text-text/35",
              "disabled:cursor-not-allowed",
              inputClassName,
            )}
            {...props}
          />
        </div>
      </div>

      {error ? (
        <p id={descriptionId} className="text-sm text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={descriptionId} className="text-sm text-text/55">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
