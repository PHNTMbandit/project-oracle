import { Movie } from "@/types/movie-types";
import { createClient } from "@/utils/supabase/server";
import { getMovieByID } from "./movies";

export const keywordMovieOfTheDay: () => Promise<Movie | null> = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("keyword_movie_of_the_day")
    .select()
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching movie of the day:", error.message);
    return null;
  }

  if (data && data.movie_id) {
    return await getMovieByID(data.movie_id);
  } else {
    return null;
  }
};
