"use client";

import { Icon } from "@iconify/react";

export default function NextIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <Icon
      icon="solar:alt-arrow-right-linear"
      height="1em"
      className={className}
      aria-hidden="true"
    />
  );
}
