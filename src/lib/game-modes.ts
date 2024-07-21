import { GameMode } from "@/types/game-types";
import Color from "color";
import * as GameModePages from "@/components/game-modes";
import { keywordMovieOfTheDay } from "./supabase";

export const gameModes: Record<string, GameMode> = {
  keyword: {
    title: "Keyword",
    description: "Use keywords associated with the film",
    colour: Color("#bb3e03"),
    component: GameModePages.KeywordMode,
    query: async () => await keywordMovieOfTheDay(),
  },
};
