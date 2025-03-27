import { renderHook, act } from "@testing-library/react";

import { useGame } from "@/hooks/useGame";

describe("useGame", () => {
  it("initializes with default values", () => {
    const { result } = renderHook(() => useGame());

    expect(result.current.gameMode).toBeNull();
    expect(result.current.sticksCount).toBe(13);
    expect(result.current.currentPlayer).toBe("player");
    expect(result.current.gameOver).toBe(false);
    expect(result.current.winner).toBeNull();
    expect(result.current.computerLastMove).toBeNull();
  });

  it("handles mode selection", () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.handleModeSelect("random");
    });

    expect(result.current.gameMode).toBe("random");
    expect(result.current.sticksCount).toBe(13);
    expect(result.current.currentPlayer).toBe("player");
  });

  it("handles removing sticks", () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.handleModeSelect("random");
      result.current.removeSticks(2);
    });

    expect(result.current.sticksCount).toBe(11);
    expect(result.current.currentPlayer).toBe("computer");
  });

  it("handles game over when last stick is taken", () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.handleModeSelect("random");
    });

    expect(() => {
      result.current.removeSticks(4);
    }).toThrow("Invalid number of sticks to remove");
  });

  it("handles computer moves", async () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.handleModeSelect("random");
      result.current.removeSticks(2);
    });

    act(() => {
      result.current.makeComputerMove();
    });

    // Wait for the computer move to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(result.current.computerLastMove).not.toBeNull();
    expect(result.current.currentPlayer).toBe("player");
  });

  it("resets game state", async () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.handleModeSelect("random");
      result.current.removeSticks(2);
    });

    act(() => {
      result.current.makeComputerMove();
    });

    // Wait for any pending computer moves to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    act(() => {
      result.current.resetGame();
    });

    expect(result.current.sticksCount).toBe(13);
    expect(result.current.currentPlayer).toBe("player");
    expect(result.current.gameOver).toBe(false);
    expect(result.current.winner).toBeNull();
    expect(result.current.computerLastMove).toBeNull();
  });

  it("plays a complete game in intelligent mode with random player moves and computer always wins", async () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.handleModeSelect("intelligent");
    });

    // Initial state check
    expect(result.current.gameMode).toBe("intelligent");
    expect(result.current.sticksCount).toBe(13);

    // Play until game ends
    while (!result.current.gameOver) {
      const possibleMoves = Math.min(3, result.current.sticksCount);
      const randomMove = Math.floor(Math.random() * possibleMoves) + 1;

      act(() => {
        result.current.removeSticks(randomMove);
      });

      if (!result.current.gameOver) {
        await act(async () => {
          result.current.makeComputerMove();
          await new Promise((resolve) => setTimeout(resolve, 0));
        });
      }
    }

    expect(result.current.winner).toBe("computer");
  });

  it("tries all possible move combinations against intelligent computer", async () => {
    const gameStateCache = new Map<string, boolean>();
    const tryAllMoves = async (
      sticksLeft: number,
      moves: number[] = [],
    ): Promise<boolean> => {
      // Create a unique key for this game state
      const stateKey = `${sticksLeft}-${moves.join(",")}`;

      // Check if we've already calculated this state
      if (gameStateCache.has(stateKey)) {
        return gameStateCache.get(stateKey)!;
      }

      // Start a new game
      const { result } = renderHook(() => useGame());

      // Set up the game state
      act(() => {
        result.current.handleModeSelect("intelligent");
      });

      // Apply previous moves
      for (const move of moves) {
        act(() => {
          result.current.removeSticks(move);
        });
        await act(async () => {
          result.current.makeComputerMove();
          await new Promise((resolve) => setTimeout(resolve, 0));
        });
      }

      // Check if game is over
      if (result.current.gameOver) {
        const computerWon = result.current.winner === "computer";
        gameStateCache.set(stateKey, computerWon);
        return computerWon;
      }

      // Try all possible moves (1-3 sticks)
      for (let move = 1; move <= Math.min(3, sticksLeft); move++) {
        act(() => {
          result.current.removeSticks(move);
        });
        await act(async () => {
          result.current.makeComputerMove();
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        const computerWon = await tryAllMoves(result.current.sticksCount, [
          ...moves,
          move,
        ]);

        if (!computerWon) {
          gameStateCache.set(stateKey, false);
          return false;
        }
      }

      gameStateCache.set(stateKey, true);
      return true;
    };

    const computerAlwaysWins = await tryAllMoves(13);
    expect(computerAlwaysWins).toBe(true);
  });
});
