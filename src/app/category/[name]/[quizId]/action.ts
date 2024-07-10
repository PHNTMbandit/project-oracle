"use server";

import { movieGuessFormSchema } from "@/lib/schemas/movie-guess-schema";
import { revalidatePath } from "next/cache";

export async function submitGuess(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData);
  const validation = movieGuessFormSchema.safeParse(rawFormData);

  if (validation.success) {
    try {
      if (validation.data.movieTitle == validation.data.correctMovieTitle) {
        revalidatePath("/");
        return {
          message: "correct",
        };
      } else {
        return {
          message: "incorrect",
        };
      }
    } catch (error) {
      return {
        message: "failed",
      };
    }
  } else {
    return { message: "failed" };
  }
}
