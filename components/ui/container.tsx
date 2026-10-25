import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", children, ...props }, ref) => {
    const sizes = {
      sm: "max-w-56",
      md: "max-w-72",
      lg: "max-w-80",
      xl: "max-w-7xl",
      full: "max-w-full",
    };
    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Container.displayName = "Container";

export { Container };
