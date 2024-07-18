import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoBox } from "./bento-box";
import { GameMode } from "@/types/game-types";
import Link from "next/link";
import slugify from "slugify";

export interface GameCategoryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  gameMode: GameMode;
}

const GameModeButton = React.forwardRef<
  HTMLButtonElement,
  GameCategoryButtonProps
>(({ gameMode, className, children, ...props }, ref) => {
  return (
    <button
      className={cn("", className)}
      ref={ref}
      {...props}>
      {children}
      <Link href={`/game-mode/${slugify(gameMode.title, { lower: true })}`}>
        <BentoBox
          variant={"button"}
          backgroundColour={gameMode.colour}
          className="h-full w-full">
          <h4>{gameMode.title}</h4>
          <p>{gameMode.description}</p>
        </BentoBox>
      </Link>
    </button>
  );
});

GameModeButton.displayName = "GameModeButton";

export { GameModeButton };
