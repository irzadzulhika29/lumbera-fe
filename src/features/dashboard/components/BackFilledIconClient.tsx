"use client";

import BackFilledIcon from "@iconify-react/weui/back-filled";

export default function BackFilledIconClient({
  className,
}: {
  className?: string;
}) {
  return <BackFilledIcon height="1em" className={className} />;
}
