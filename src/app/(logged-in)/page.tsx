import { BentoBox } from "@/components/bento-box";
import { GameCategoryButton } from "@/components/game-category-button";
import { gameCategories } from "@/lib/game-categories";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="grid grid-cols-6 gap-3">
      {Object.values(gameCategories).map((category, index) => (
        <GameCategoryButton
          key={index}
          gameCategory={category}
          className="aspect-card"
        />
      ))}
    </section>
  );
}
