import BaseInput from "@/src/shared/components/ui/BaseInput";
import { twMerge } from "tailwind-merge";

type PhoneInputProps = Omit<
  React.ComponentProps<typeof BaseInput>,
  "type" | "startAdornment"
> & {
  prefixClassName?: string;
};

export default function PhoneInput({
  prefixClassName,
  ...props
}: PhoneInputProps) {
  return (
    <BaseInput
      type="tel"
      placeholder="82342323218"
      labelClassName="text-base font-medium"
      startAdornment={
        <span
          className={twMerge(
            "text-lg leading-none font-semibold text-text/80",
            prefixClassName,
          )}
        >
          +62
        </span>
      }
      inputClassName="text-base placeholder:text-text/20"
      {...props}
    />
  );
}
