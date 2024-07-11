import { z } from "zod";

export const movieGuessFormSchema = z.object({
  movieTitle: z.string(),
  correctMovieTitle: z.string(),
});
