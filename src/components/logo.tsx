import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "dark" | "cream";
  className?: string;
  href?: string | null;
  priority?: boolean;
};

export function Logo({
  variant = "dark",
  className = "",
  href = "/",
  priority,
}: LogoProps) {
  const image = (
    <Image
      src={
        variant === "cream" ? "/brand/logo-cream.png" : "/brand/logo-dark.png"
      }
      alt="Fofi"
      width={820}
      height={821}
      priority={priority}
      className={`w-auto max-w-none ${className}`}
    />
  );

  if (href === null) return image;

  return (
    <Link
      href={href}
      aria-label="Fofi, go to homepage"
      className="inline-flex shrink-0"
    >
      {image}
    </Link>
  );
}
