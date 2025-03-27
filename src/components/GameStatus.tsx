import { useTranslations } from "next-intl";

import GameButton from "./GameButton";

interface GameStatusProps {
  gameMode: "random" | "intelligent";
  currentPlayer: "player" | "computer";
  gameOver: boolean;
  winner: "player" | "computer" | null;
  onPlayAgain: () => void;
  onChangeMode: () => void;
}

export default function GameStatus({
  gameMode,
  currentPlayer,
  gameOver,
  winner,
  onPlayAgain,
  onChangeMode,
}: GameStatusProps) {
  const t = useTranslations("game");

  return (
    <>
      <div className="text-center text-sm">
        {t("mode", { mode: gameMode })} <br />
        {t("currentPlayer", { player: currentPlayer })}
      </div>

      {gameOver && (
        <div className="flex flex-col text-center gap-4">
          <div className="text-3xl">
            <p className="mb-4">{t("gameOver")} </p>
            {winner === "player" ? (
              <span className="text-blue-700">
                <i className={"nes-icon is-large trophy"}></i>
                <br />
                {t("youWon")}
              </span>
            ) : (
              <span className="text-red-600">{t("computerWon")}</span>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <GameButton variant="success" onClick={onPlayAgain}>
              {t("playAgain")}
            </GameButton>
            <GameButton onClick={onChangeMode}>{t("changeMode")}</GameButton>
          </div>
        </div>
      )}
    </>
  );
}
