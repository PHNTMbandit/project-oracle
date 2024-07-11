import { z } from "zod";

export const movieGuessFormSchema = z.object({
  movieTitleGuess: z.string(),
  correctMovieTitle: z.string(),
  correctMovieId: z.coerce.number(),
});
