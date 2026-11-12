import type { ReactNode } from "react";
import { SplitWords } from "@/components/motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  action?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-5 ${
        centered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h2 className="display text-4xl text-ink md:text-6xl">
          {typeof title === "string" ? <SplitWords text={title} /> : title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-8 text-muted md:text-lg">
            {description}
          </p>
        )}
      </div>
      {action && !centered && <div className="shrink-0">{action}</div>}
    </div>
  );
}
