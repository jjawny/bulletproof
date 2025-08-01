import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "~/client/components/ui/input-otp";
import { cn } from "~/client/utils/cn";

const LARGE_STYLES = "w-16 h-16 text-3xl";

export type PinHelperText = {
  errorText?: string;
  helperText?: string;
};

/**
 * Simple PIN component that doesn't reference any stores
 */
export default function Pin({
  isPlayShakeAnimation = false,
  pinHelperText,
  value,
  onChange,
  onComplete,
}: {
  isPlayShakeAnimation: boolean;
  pinHelperText?: PinHelperText;
  value: string;
  onChange: (value: string) => void;
  onComplete: (value: string) => void;
}) {
  const hasError = !!pinHelperText?.errorText;
  const ariaInvalidLabel = hasError ? "true" : "false";

  return (
    <>
      <InputOTP
        maxLength={4}
        pattern={REGEXP_ONLY_DIGITS}
        value={value}
        onChange={onChange}
        onComplete={onComplete}
        autoFocus
      >
        <InputOTPGroup className={cn(isPlayShakeAnimation && "animate-shake", "shadow-sm")}>
          <InputOTPSlot aria-invalid={ariaInvalidLabel} index={0} className={LARGE_STYLES} />
          <InputOTPSlot aria-invalid={ariaInvalidLabel} index={1} className={LARGE_STYLES} />
          <InputOTPSlot aria-invalid={ariaInvalidLabel} index={2} className={LARGE_STYLES} />
          <InputOTPSlot aria-invalid={ariaInvalidLabel} index={3} className={LARGE_STYLES} />
        </InputOTPGroup>
      </InputOTP>
      <HelperText pinHelperText={pinHelperText} />
    </>
  );
}

function HelperText({ pinHelperText }: { pinHelperText?: PinHelperText }) {
  if (pinHelperText?.errorText) {
    return <span className="pt-2 text-red-500">{pinHelperText.errorText}</span>;
  }

  return <span className="pt-2 opacity-50">{pinHelperText?.helperText ?? "\u200B"}</span>;
}
