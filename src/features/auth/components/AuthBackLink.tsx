import Link from "next/link";

type AuthBackLinkProps = {
  href: string;
};

export default function AuthBackLink({ href }: AuthBackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-medium text-primary"
    >
      <span aria-hidden="true" className="text-lg leading-none">
        {"<"}
      </span>
      Kembali
    </Link>
  );
}
