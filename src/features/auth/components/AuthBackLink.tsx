"use client";

import Link from "next/link";

type AuthBackLinkProps = {
  href?: string;
  onClick?: () => void;
};

const backLinkClassName =
  "inline-flex items-center gap-2 text-sm font-medium text-primary";

export default function AuthBackLink({ href, onClick }: AuthBackLinkProps) {
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={backLinkClassName}>
        <span aria-hidden="true" className="text-lg leading-none">
          {"<"}
        </span>
        Kembali
      </button>
    );
  }

  return (
    <Link
      href={href ?? "#"}
      className={backLinkClassName}
    >
      <span aria-hidden="true" className="text-lg leading-none">
        {"<"}
      </span>
      Kembali
    </Link>
  );
}
