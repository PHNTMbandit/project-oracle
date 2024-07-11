import { GameCategoryButton } from "@/components/game-category-button";
import { gameCategories } from "@/lib/game-categories";

export default async function Home() {
  return (
    <section className="grid grid-cols-3 gap-3">
      {Object.values(gameCategories).map((category, index) => (
        <GameCategoryButton
          key={index}
          gameCategory={category}
        />
      ))}
    </section>
  );
}
