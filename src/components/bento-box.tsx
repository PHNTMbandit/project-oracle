import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Color from "color";

const bentoBoxVariants = cva("shadow-lg rounded-xl text-left bg-primary p-4", {
  variants: {
    variant: {
      default: "",
      button: "hover:shadow-xl hover:scale-105 transition-all",
    },
    size: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface BentoBoxProps
  extends React.AnchorHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoBoxVariants> {
  backgroundColour?: Color;
}

const BentoBox = React.forwardRef<HTMLDivElement, BentoBoxProps>(
  ({ variant, size, backgroundColour, className, children, ...props }, ref) => {
    return (
      <div
        style={{ backgroundColor: backgroundColour?.toString() }}
        className={cn(bentoBoxVariants({ variant, size, className }))}
        ref={ref}
        {...props}>
        {children}
      </div>
    );
  }
);

BentoBox.displayName = "BentoBox";

export { BentoBox };
