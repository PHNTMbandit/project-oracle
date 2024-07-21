import { GameModeButton } from "@/components/game-mode-button";
import { gameModes } from "@/lib/game-modes";

export default async function Home() {
  return (
    <section className="grid grid-cols-6 gap-3">
      {Object.values(gameModes).map((gameMode, index) => (
        <GameModeButton
          key={index}
          gameMode={gameMode}
          className="aspect-card"
        />
      ))}
    </section>
  );
}
