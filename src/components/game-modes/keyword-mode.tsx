import * as React from "react";
import { cn } from "@/lib/utils";
import Color from "color";
import { data } from "tailwindcss/defaultTheme";
import { BentoBox } from "../bento-box";
import { MovieGuessForm } from "../forms/movie-guess-form";
import Image from "next/image";
import { Movie } from "@/types/movie-types";
import { getMovieKeywordsByID } from "@/lib/movies";
import { createClient } from "@/utils/supabase/server";

export interface KeywordModeProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  movie: Movie;
}

const KeywordMode: React.FC<KeywordModeProps> = async ({ movie }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }

  const keywords = await getMovieKeywordsByID(movie.id);
  const { data } = await supabase
    .from("correct_guesses")
    .select()
    .eq("movie_id", movie.id)
    .eq("user_id", user.id)
    .single();

  return (
    <section className={cn("grid grid-cols-4 grid-rows-4 gap-3")}>
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
};

const ForwardedKeywordMode = React.forwardRef<HTMLDivElement, KeywordModeProps>(
  (props, ref) => (
    <div ref={ref}>
      <KeywordMode {...props} />
    </div>
  )
);

ForwardedKeywordMode.displayName = "KeywordMode";

export default ForwardedKeywordMode;
