import * as React from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { createClient } from "@/utils/supabase/server";
import { AccountButton } from "./account-button";

export interface HeaderProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  async ({ className, children, ...props }, ref) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return (
      <nav
        className={cn(
          "sticky z-10 top-0 grid grid-cols-3 mb-6 bg-background",
          className
        )}
        ref={ref}
        {...props}>
        {children}
        <Logo />
        <div className="col-start-3 space-x-3 place-self-end">
          <AccountButton user={user} />
        </div>
      </nav>
    );
  }
);

Header.displayName = "Header";

export { Header };
