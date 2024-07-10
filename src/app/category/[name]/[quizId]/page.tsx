import { BentoBox } from "@/components/bento-box";
import { Input } from "@/components/ui/input";
import { getMovieByID, getMovieKeywordsByID } from "@/lib/movies";
import Color from "color";
import Image from "next/image";

type QuizProps = {
  params: { quizId: string };
};

export default async function QuizPage({ params }: QuizProps) {
  const movie = await getMovieByID(Number(params.quizId));
  const keywords = await getMovieKeywordsByID(Number(params.quizId));

  return (
    <section className="grid grid-cols-6 gap-3">
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
      <BentoBox
        backgroundColour={Color("#e9c46a")}
        className="col-span-5">
        <Input placeholder={movie.title} />
      </BentoBox>
      <BentoBox
        backgroundColour={Color("#f4a261")}
        className="col-span-3 row-start-2">
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
