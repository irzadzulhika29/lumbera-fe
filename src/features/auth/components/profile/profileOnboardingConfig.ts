export const POSITION_OPTIONS = [
  { label: "Ketua", value: "ketua" },
  { label: "Sekretaris", value: "sekretaris" },
  { label: "Bendahara", value: "bendahara" },
] as const;

export type PositionOptionValue = (typeof POSITION_OPTIONS)[number]["value"];

export const POSITION_CODE_MAP = {
  ketua: "CHAIRMAN",
  sekretaris: "SECRETARY",
  bendahara: "TREASURER",
} as const;
