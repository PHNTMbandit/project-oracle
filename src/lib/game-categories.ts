import { GameCategory } from "@/types/game-types";
import Color from "color";
import { getPopularMovies, getTopRatedMovies } from "./movies";

export const gameCategories: Record<string, GameCategory> = {
  popular: {
    title: "Popular",
    description: "See what's hot and trendy",
    colour: Color("#e9c46a"),
    query: async () => await getPopularMovies(),
  },
  "top-rated": {
    title: "Top Rated",
    description: "See what's the best of all time",
    colour: Color("#2a9d8f"),
    query: async () => await getTopRatedMovies(),
  },
};
