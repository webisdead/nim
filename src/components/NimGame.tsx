"use client";

import { useGame } from "@/hooks/useGame";

import ComputerMove from "./ComputerMove";
import GameArea from "./GameArea";
import GameButton from "./GameButton";
import GameStatus from "./GameStatus";
import SplashScreen from "./SplashScreen";

interface NimGameProps {
  computerMoveDelay?: number;
}

const NimGame: React.FC<NimGameProps> = ({ computerMoveDelay = 1000 }) => {
  const {
    gameMode,
    sticksCount,
    currentPlayer,
    gameOver,
    winner,
    computerLastMove,
    handleModeSelect,
    removeSticks,
    makeComputerMove,
    resetGame,
    setGameMode,
  } = useGame();

  if (!gameMode) {
    return <SplashScreen onModeSelect={handleModeSelect} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <GameStatus
        gameMode={gameMode}
        currentPlayer={currentPlayer}
        gameOver={gameOver}
        winner={winner}
        onPlayAgain={resetGame}
        onChangeMode={() => setGameMode(null)}
      />

      <GameArea
        sticksCount={sticksCount}
        currentPlayer={currentPlayer}
        computerLastMove={computerLastMove}
        onTakeSticks={removeSticks}
        gameOver={gameOver}
      />

      <ComputerMove
        currentPlayer={currentPlayer}
        computerLastMove={computerLastMove}
        onMakeMove={makeComputerMove}
        computerMoveDelay={computerMoveDelay}
      />

      <div className="flex justify-center">
        <GameButton variant="error" onClick={() => setGameMode(null)}>
          Exit Game
        </GameButton>
      </div>
    </div>
  );
};

export default NimGame;
