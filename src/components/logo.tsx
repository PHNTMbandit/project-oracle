import * as React from "react";
import { cn } from "@/lib/utils";

export interface LogoProps
  extends React.AnchorHTMLAttributes<HTMLHeadingElement> {}

const Logo = React.forwardRef<HTMLHeadingElement, LogoProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h1
        className={cn(
          "select-none bg-gradient-to-r from-primary-2 via-primary-6 to-primary-10 inline-block text-transparent bg-clip-text",
          className
        )}
        ref={ref}
        {...props}>
        {children}
        Project Oracle
      </h1>
    );
  }
);

Logo.displayName = "Logo";

export { Logo };
