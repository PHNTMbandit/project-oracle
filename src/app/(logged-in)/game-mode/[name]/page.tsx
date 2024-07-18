import { gameModes } from "@/lib/game-modes";
import { Movie } from "@/types/movie-types";

type GameCategoryProps = {
  params: { name: string };
};

export default async function GameModePage({ params }: GameCategoryProps) {
  const gameMode = gameModes[params.name];
  const movie: Movie = (await gameMode.query())[0];

  return <gameMode.component movie={movie} />;
}
