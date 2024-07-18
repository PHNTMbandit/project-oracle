import { BentoBox } from "@/components/bento-box";
import { MovieGuessForm } from "@/components/forms/movie-guess-form";
import { gameCategories } from "@/lib/game-categories";
import { getMovieKeywordsByID } from "@/lib/movies";
import { cn } from "@/lib/utils";
import { Movie } from "@/types/movie-types";
import { createClient } from "@/utils/supabase/server";
import Color from "color";
import Image from "next/image";

type GameCategoryProps = {
  params: { name: string };
};

export default async function GameCategoryPage({ params }: GameCategoryProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }

  const category = gameCategories[params.name];
  const movie: Movie = (await category.query())[0];
  const keywords = await getMovieKeywordsByID(movie.id);
  const { data } = await supabase
    .from("correct_guesses")
    .select()
    .eq("movie_id", movie.id)
    .eq("user_id", user.id)
    .single();

  return (
    <section className="grid grid-cols-4 grid-rows-4 gap-3">
      <BentoBox
        backgroundColour={Color("black")}
        className="relative aspect-card overflow-hidden row-span-4 col-start-1">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          fill
          priority
          sizes="1"
          className={cn("object-cover scale-125 blur-3xl transition-all", {
            "scale-100 blur-none": data,
          })}
        />
      </BentoBox>
      <BentoBox
        backgroundColour={Color("#f4a261")}
        className="col-span-3 row-span-3 col-start-2 row-start-1 justify-start">
        {data ? (
          <div>
            <h3>{movie.title}</h3>
          </div>
        ) : (
          <>
            <h3>???</h3>
            <h3>{keywords.length} Keywords</h3>
            <ul className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <li key={index}>
                  <p className="capitalize">{keyword.name}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </BentoBox>
      <BentoBox
        backgroundColour={Color("#e9c46a")}
        className="col-span-3 col-start-2">
        {!data && <MovieGuessForm correctAnswer={movie} />}
      </BentoBox>
    </section>
  );
}
