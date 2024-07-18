import { GameMode } from "@/types/game-types";
import Color from "color";
import { getPopularMovies } from "./movies";
import * as GameModePages from "@/components/game-modes";

export const gameModes: Record<string, GameMode> = {
  keyword: {
    title: "Keyword",
    description: "Use keywords associated with the film",
    colour: Color("#bb3e03"),
    // change queryto getKeywordMovieOfTheDay
    component: GameModePages.KeywordMode,
    query: async () => await getPopularMovies(),
  },
};
