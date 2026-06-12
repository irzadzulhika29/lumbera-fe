import BaseInput from "@/src/shared/components/ui/BaseInput";

type PhoneInputProps = Omit<
  React.ComponentProps<typeof BaseInput>,
  "type" | "startAdornment"
>;

export default function PhoneInput(props: PhoneInputProps) {
  return (
    <BaseInput
      type="tel"
      placeholder="8123456789"
      labelClassName="text-base font-medium"
      startAdornment={
        <span className="text-lg leading-none font-semibold text-text/80">
          +62
        </span>
      }
      inputClassName="text-base placeholder:text-text/20"
      {...props}
    />
  );
}
