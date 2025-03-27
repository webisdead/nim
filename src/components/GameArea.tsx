import { clsx } from "clsx";
import { useTranslations } from "next-intl";

import GameButton from "./GameButton";
import SticksDisplay from "./SticksDisplay";

interface GameAreaProps {
  sticksCount: number;
  currentPlayer: "player" | "computer";
  computerLastMove: number | null;
  onTakeSticks: (amount: number) => void;
  gameOver: boolean;
}

export default function GameArea({
  sticksCount,
  currentPlayer,
  onTakeSticks,
  gameOver,
}: GameAreaProps) {
  const t = useTranslations("game");

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl text-center">
        {t("sticksRemaining", { count: sticksCount })}
      </h2>

      {currentPlayer === "computer" && !gameOver && (
        <p className="absolute left-0 right-0 top-0 bottom-0 text-center text-lg flex justify-center items-center z-10 bg-white/90">
          {t("computerThinking")}
        </p>
      )}

      {!!sticksCount && <SticksDisplay count={sticksCount} />}

      {!gameOver && (
        <div className="flex gap-6 justify-center">
          <GameButton
            variant="warning"
            className={clsx(currentPlayer === "computer" && "is-disabled")}
            disabled={currentPlayer === "computer"}
            onClick={() => onTakeSticks(1)}
          >
            {t("takeSticks", { count: 1 })}
          </GameButton>
          {sticksCount >= 2 && (
            <GameButton
              variant="warning"
              className={clsx(currentPlayer === "computer" && "is-disabled")}
              disabled={currentPlayer === "computer"}
              onClick={() => onTakeSticks(2)}
            >
              {t("takeSticks", { count: 2 })}
            </GameButton>
          )}
          {sticksCount >= 3 && (
            <GameButton
              className={clsx(currentPlayer === "computer" && "is-disabled")}
              disabled={currentPlayer === "computer"}
              variant="warning"
              onClick={() => onTakeSticks(3)}
            >
              {t("takeSticks", { count: 3 })}
            </GameButton>
          )}
        </div>
      )}
    </div>
  );
}
