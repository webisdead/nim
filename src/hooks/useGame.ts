import { useState, useCallback } from "react";

type GameMode = "random" | "intelligent" | null;
type Player = "player" | "computer";

interface GameState {
  gameMode: GameMode;
  sticksCount: number;
  currentPlayer: Player;
  gameOver: boolean;
  winner: Player | null;
  computerLastMove: number | null;
}

const INITIAL_STATE: GameState = {
  gameMode: null,
  sticksCount: 13,
  currentPlayer: "player",
  gameOver: false,
  winner: null,
  computerLastMove: null,
};

/**
 * Finds the optimal move for the computer in intelligent mode
 * @param currentSticks - Current number of sticks on the table
 * @returns Number of sticks to take
 */
function findOptimalMove(currentSticks: number): number {
  if (currentSticks <= 0) {
    throw new Error("Invalid number of sticks");
  }
  if (currentSticks <= 4) {
    return currentSticks === 1 ? 1 : currentSticks - 1;
  }
  const remainder = currentSticks % 4;
  return remainder === 1 ? 1 : remainder === 0 ? 3 : remainder - 1;
}

/**
 * Calculates the computer's move based on the game mode
 * @param sticksCount - Current number of sticks
 * @param gameMode - Current game mode
 * @returns Number of sticks to take
 */
function calculateComputerMove(
  sticksCount: number,
  gameMode: GameMode,
): number {
  if (!gameMode) {
    throw new Error("Game mode not selected");
  }
  if (sticksCount <= 0) {
    throw new Error("Invalid number of sticks");
  }
  return gameMode === "intelligent"
    ? findOptimalMove(sticksCount)
    : Math.floor(Math.random() * Math.min(3, sticksCount)) + 1;
}

/**
 * Custom hook for managing the Nim game state and logic
 * @returns Game state and control functions
 */
export function useGame() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE);
  }, []);

  const handleModeSelect = useCallback(
    (mode: "random" | "intelligent") => {
      resetGame();
      setGameState((prev) => ({ ...prev, gameMode: mode }));
    },
    [resetGame],
  );

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  }, []);

  const removeSticks = useCallback(
    (amount: number) => {
      if (amount <= 0 || amount > 3) {
        throw new Error("Invalid number of sticks to remove");
      }
      if (gameState.gameOver) return;

      setGameState((prev) => {
        const newCount = Math.max(0, prev.sticksCount - amount);
        const updates: Partial<GameState> = {
          sticksCount: newCount,
        };

        if (newCount === 0) {
          updates.gameOver = true;
          updates.winner =
            prev.currentPlayer === "player" ? "computer" : "player";
        } else if (prev.currentPlayer === "player") {
          updates.currentPlayer = "computer";
        }

        return { ...prev, ...updates };
      });
    },
    [gameState.gameOver],
  );

  const makeComputerMove = useCallback(() => {
    if (
      gameState.sticksCount > 0 &&
      gameState.currentPlayer === "computer" &&
      !gameState.gameOver
    ) {
      try {
        const sticksToTake = calculateComputerMove(
          gameState.sticksCount,
          gameState.gameMode,
        );

        setGameState((prev) => {
          const newCount = Math.max(0, prev.sticksCount - sticksToTake);
          const updates: Partial<GameState> = {
            computerLastMove: sticksToTake,
            sticksCount: newCount,
          };

          if (newCount === 0) {
            updates.gameOver = true;
            updates.winner = "player";
          } else {
            updates.currentPlayer = "player";
          }

          return { ...prev, ...updates };
        });
      } catch (error) {
        console.error("Error making computer move:", error);
        // Reset game on error
        resetGame();
      }
    }
  }, [
    gameState.sticksCount,
    gameState.currentPlayer,
    gameState.gameOver,
    gameState.gameMode,
    resetGame,
  ]);

  return {
    ...gameState,
    handleModeSelect,
    removeSticks,
    makeComputerMove,
    resetGame,
    setGameMode: (mode: GameMode) => updateGameState({ gameMode: mode }),
  };
}
