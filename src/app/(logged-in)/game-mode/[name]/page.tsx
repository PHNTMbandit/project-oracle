import { gameModes } from "@/lib/game-modes";

type GameCategoryProps = {
  params: { name: string };
};

export default async function GameModePage({ params }: GameCategoryProps) {
  const gameMode = gameModes[params.name];
  const movie = await gameMode.query();

  return <gameMode.component movie={movie} />;
}
