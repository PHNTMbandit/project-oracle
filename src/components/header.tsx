import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export interface HeaderProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  async ({ className, children, ...props }, ref) => {
    const supabase = createClient();
    const user = await supabase.auth.getUser();

    return (
      <nav
        className={cn(
          "sticky z-10 top-0 grid grid-cols-3 mb-6 bg-background",
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
        {user.data.user?.email}
      </nav>
    );
  }
);

Header.displayName = "Header";

export { Header };
