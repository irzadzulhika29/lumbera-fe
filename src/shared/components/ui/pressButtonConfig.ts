export type PressButtonStyle = {
  base: string;
  shadow: string;
  hoverShadow: string;
  pressShadow: string;
};

type PressButtonMotionValues = {
  y?: number;
  boxShadow?: string;
};

export type PressButtonMotionState = {
  whileHover: PressButtonMotionValues;
  whileTap: PressButtonMotionValues;
};

export const PRESS_BUTTON_VARIANTS = {
  primary: {
    base: "bg-primary text-white hover:bg-primary/95",
    shadow: "0 4px 0 0 var(--color-primary-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-primary-shadow)",
    pressShadow: "0 1px 0 0 var(--color-primary-shadow)",
  },
  primaryFlat: {
    base: "bg-primary text-white hover:bg-primary/95",
    shadow: "none",
    hoverShadow: "none",
    pressShadow: "none",
  },
  secondary: {
    base: "bg-secondary text-white hover:bg-secondary/95",
    shadow: "0 4px 0 0 var(--color-secondary-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-secondary-shadow)",
    pressShadow: "0 1px 0 0 var(--color-secondary-shadow)",
  },
  success: {
    base: "bg-success text-white hover:bg-success/95",
    shadow: "0 4px 0 0 var(--color-success-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-success-shadow)",
    pressShadow: "0 1px 0 0 var(--color-success-shadow)",
  },
  warning: {
    base: "bg-warning text-white hover:bg-warning/95",
    shadow: "0 4px 0 0 var(--color-warning-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-warning-shadow)",
    pressShadow: "0 1px 0 0 var(--color-warning-shadow)",
  },
  danger: {
    base: "bg-error text-white hover:bg-error/95",
    shadow: "0 4px 0 0 var(--color-error-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-error-shadow)",
    pressShadow: "0 1px 0 0 var(--color-error-shadow)",
  },
  outline: {
    base: "border border-primary bg-card text-primary hover:bg-primary-light",
    shadow: "0 4px 0 0 var(--color-primary-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-primary-shadow)",
    pressShadow: "0 1px 0 0 var(--color-primary-shadow)",
  },
  outlineFlat: {
    base: "border border-border bg-card text-text/80 hover:bg-surface",
    shadow: "none",
    hoverShadow: "none",
    pressShadow: "none",
  },
  "outline-orange": {
    base: "border border-warning bg-card text-warning hover:bg-warning/10",
    shadow: "0 4px 0 0 var(--color-warning-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-warning-shadow)",
    pressShadow: "0 1px 0 0 var(--color-warning-shadow)",
  },
  outlineNight: {
    base: "border border-secondary/30 bg-secondary text-white hover:bg-secondary/90",
    shadow: "0 4px 0 0 var(--color-secondary-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-secondary-shadow)",
    pressShadow: "0 1px 0 0 var(--color-secondary-shadow)",
  },
  outlineSun: {
    base: "border border-warning/40 bg-card text-warning hover:bg-warning/10",
    shadow: "0 4px 0 0 var(--color-warning-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-warning-shadow)",
    pressShadow: "0 1px 0 0 var(--color-warning-shadow)",
  },
  outlineSky: {
    base: "border border-secondary/35 bg-card text-secondary hover:bg-secondary/10",
    shadow: "0 4px 0 0 var(--color-secondary-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-secondary-shadow)",
    pressShadow: "0 1px 0 0 var(--color-secondary-shadow)",
  },
  outlineSunset: {
    base: "border border-error/35 bg-card text-error hover:bg-error/10",
    shadow: "0 4px 0 0 var(--color-error-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-error-shadow)",
    pressShadow: "0 1px 0 0 var(--color-error-shadow)",
  },
  reject: {
    base: "border border-error bg-card text-error hover:bg-error/10",
    shadow: "0 4px 0 0 var(--color-error-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-error-shadow)",
    pressShadow: "0 1px 0 0 var(--color-error-shadow)",
  },
} satisfies Record<string, PressButtonStyle>;

export type PressButtonVariant = keyof typeof PRESS_BUTTON_VARIANTS;

export const getPressButtonVariant = (variant: string): PressButtonStyle =>
  PRESS_BUTTON_VARIANTS[variant as PressButtonVariant] ?? PRESS_BUTTON_VARIANTS.primary;

export const getPressButtonMotion = (
  variant: string,
  disabled = false,
): PressButtonMotionState =>
  disabled
    ? {
        whileHover: {},
        whileTap: {},
      }
    : {
        whileHover: {
          y: 2,
          boxShadow: getPressButtonVariant(variant).hoverShadow,
        },
        whileTap: {
          y: 3,
          boxShadow: getPressButtonVariant(variant).pressShadow,
        },
      };
