import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoBox } from "./bento-box";
import { GameCategory } from "@/types/game-types";
import Link from "next/link";
import slugify from "slugify";

export interface GameCategoryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  gameCategory: GameCategory;
}

const GameCategoryButton = React.forwardRef<
  HTMLButtonElement,
  GameCategoryButtonProps
>(({ gameCategory, className, children, ...props }, ref) => {
  return (
    <button
      className={cn("", className)}
      ref={ref}
      {...props}>
      {children}
      <Link href={`/category/${slugify(gameCategory.title, { lower: true })}`}>
        <BentoBox
          variant={"button"}
          backgroundColour={gameCategory.colour}
          className="h-full w-full">
          <h4>{gameCategory.title}</h4>
          <p>{gameCategory.description}</p>
        </BentoBox>
      </Link>
    </button>
  );
});

GameCategoryButton.displayName = "GameCategoryButton";

export { GameCategoryButton };
