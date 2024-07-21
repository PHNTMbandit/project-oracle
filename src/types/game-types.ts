import Color from "color";
import { Movie } from "./movie-types";
import React, { ComponentType } from "react";

export type GameMode = {
  title: string;
  description: string;
  colour: Color;
  component: ComponentType<any>;
  query: () => Promise<Movie | null>;
};
