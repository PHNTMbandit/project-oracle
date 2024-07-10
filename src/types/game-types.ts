import Color from "color";
import { Movie } from "./movie-types";

export type GameCategory = {
  title: string;
  description: string;
  colour: Color;
  query: () => Promise<Movie[]>;
};
