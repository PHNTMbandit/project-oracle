import { BentoBox } from "@/components/bento-box";
import { MovieGuessForm } from "@/components/forms/movie-guess-form";
import { getMovieByID, getMovieKeywordsByID } from "@/lib/movies";
import { createClient } from "@/utils/supabase/server";
import Color from "color";
import Image from "next/image";

type QuizProps = {
  params: { quizId: string };
};

export default async function QuizPage({ params }: QuizProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }

  const movie = await getMovieByID(Number(params.quizId));
  const keywords = await getMovieKeywordsByID(Number(params.quizId));
  const { data } = await supabase
    .from("correct_guesses")
    .select()
    .eq("movie_id", movie.id)
    .eq("user_id", user.id)
    .single();

  return (
    <section className="grid grid-cols-6 gap-3">
      {data && (
        <BentoBox
          backgroundColour={Color("white")}
          className="relative aspect-card overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={`${movie.title} Poster`}
            fill
            priority
            sizes="1"
          />
        </BentoBox>
      )}
      <BentoBox
        backgroundColour={Color("#e9c46a")}
        className="col-span-5">
        <MovieGuessForm correctAnswer={movie} />
      </BentoBox>
      <BentoBox
        backgroundColour={Color("#f4a261")}
        className="col-span-6 row-start-2">
        <ul className="flex flex-col h-full flex-wrap gap-4">
          {keywords.map((keyword, index) => (
            <li key={index}>
              <h6>{keyword.name}</h6>
            </li>
          ))}
        </ul>
      </BentoBox>
    </section>
  );
}
