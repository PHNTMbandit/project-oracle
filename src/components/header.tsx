import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface HeaderProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        className={cn(
          "sticky top-0 grid grid-cols-3 mb-6 bg-background",
          className
        )}
        ref={ref}
        {...props}>
        {children}
        <Link href={"/"}>
          <h1 className="hover:tracking-widest transition-all">
            Project Oracle
          </h1>
        </Link>
      </nav>
    );
  }
);

Header.displayName = "Header";

export { Header };
