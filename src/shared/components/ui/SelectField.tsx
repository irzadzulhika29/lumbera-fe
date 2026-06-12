"use client";

import { useEffect, useId, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label?: React.ReactNode;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  fieldClassName?: string;
  startAdornment?: React.ReactNode;
};

export default function SelectField({
  label,
  value,
  options,
  onChange,
  placeholder = "Pilih opsi",
  className,
  fieldClassName,
  startAdornment,
}: SelectFieldProps) {
  const generatedId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className={twMerge("flex w-full flex-col gap-2.5", className)}>
      {label ? (
        <label
          htmlFor={generatedId}
          className="text-[1.05rem] leading-none font-medium text-text"
        >
          {label}
        </label>
      ) : null}

      <div className="relative">
        <button
          id={generatedId}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={twMerge(
            "flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-left shadow-sm transition-colors",
            "focus:border-secondary/45 focus:outline-none",
            fieldClassName,
          )}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="flex min-w-0 items-center gap-3">
            {startAdornment ? (
              <span className="shrink-0 text-text/55">{startAdornment}</span>
            ) : null}
            <span
              className={twMerge(
                "truncate text-base leading-none",
                selectedOption ? "text-text/80" : "text-text/35",
              )}
            >
              {selectedOption?.label ?? placeholder}
            </span>
          </span>
          <span
            aria-hidden="true"
            className={twMerge(
              "text-base leading-none text-text/55 transition-transform duration-150",
              isOpen ? "rotate-180" : "",
            )}
          >
            v
          </span>
        </button>

        {isOpen ? (
          <div
            role="listbox"
            className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-20 rounded-lg border border-border bg-card p-2 shadow-[0_14px_34px_rgba(15,23,42,0.12)]"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={twMerge(
                  "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                  option.value === value
                    ? "bg-primary-light font-medium text-primary"
                    : "text-text/78 hover:bg-surface",
                )}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
