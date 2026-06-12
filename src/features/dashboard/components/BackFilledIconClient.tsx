"use client";

import { Icon } from "@iconify/react";

export default function BackFilledIconClient({
  className,
}: {
  className?: string;
}) {
  return (
    <Icon
      icon="solar:alt-arrow-left-linear"
      height="1em"
      className={className}
      aria-hidden="true"
    />
  );
}
