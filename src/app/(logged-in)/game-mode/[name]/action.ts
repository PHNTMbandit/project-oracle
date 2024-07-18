"use server";

import { movieGuessFormSchema } from "@/lib/schemas/movie-guess-schema";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitGuess(prevState: any, formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const rawFormData = Object.fromEntries(formData);
  const validation = movieGuessFormSchema.safeParse(rawFormData);
  console.log(validation.error);
  if (validation.success) {
    try {
      if (
        validation.data.movieGuessId == validation.data.correctMovieId &&
        user
      ) {
        const { data } = await supabase
          .from("keyword_correct_guesses")
          .select()
          .eq("movie_id", validation.data.correctMovieId)
          .eq("user_id", user.id)
          .single();

        if (!data) {
          await supabase.from("keyword_correct_guesses").insert({
            user_id: user?.id,
            movie_id: validation.data.correctMovieId,
          });
        }

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
