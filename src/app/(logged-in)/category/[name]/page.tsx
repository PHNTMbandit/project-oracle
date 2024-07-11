import { gameCategories } from "@/lib/game-categories";
import { Movie } from "@/types/movie-types";
import { redirect } from "next/navigation";

type GameCategoryProps = {
  params: { name: string };
};

export default async function GameCategoryPage({ params }: GameCategoryProps) {
  const category = gameCategories[params.name];
  const movie: Movie[] = await category.query();
  redirect(`/category/${params.name}/${movie[0].id}`);
}
