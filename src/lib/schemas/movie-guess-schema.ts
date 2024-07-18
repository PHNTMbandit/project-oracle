import { z } from "zod";

export const movieGuessFormSchema = z.object({
  movieGuessId: z.coerce.number(),
  correctMovieId: z.coerce.number(),
});
