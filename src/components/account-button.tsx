import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { User } from "@supabase/supabase-js";

export interface AccountButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  user: User | null;
}

const AccountButton = React.forwardRef<HTMLButtonElement, AccountButtonProps>(
  ({ user, className, children, ...props }, ref) => {
    return (
      <Button
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        {user ? <h6>User</h6> : <h6>Sign In</h6>}
      </Button>
    );
  }
);

AccountButton.displayName = "AccountButton";

export { AccountButton };
