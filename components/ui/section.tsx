import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function SectionHeader({
  title,
  description,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn("text-center max-w-3xl mx-auto mb-16", className)}
      {...props}
    >
      {title && <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>}
      {description && (
        <p className="mt-4 text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
