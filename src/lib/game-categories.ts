import { GameCategory } from "@/types/game-types";
import Color from "color";
import { getPopularMovies, getTopRatedMovies } from "./movies";

export const gameCategories: Record<string, GameCategory> = {
  popular: {
    title: "Popular",
    description: "See what's hot and trendy",
    colour: Color("#bb3e03"),
    query: async () => await getPopularMovies(),
  },
  "top-rated": {
    title: "Top Rated",
    description: "See what's the best of all time",
    colour: Color("#ee9b00"),
    query: async () => await getTopRatedMovies(),
  },
};
