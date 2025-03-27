// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { useLocale } from "next-intl";

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string, params?: any) => {
    // Simple translation map with only the keys we need for tests
    const translations: Record<
      string,
      Record<string, string | ((params: any) => string)>
    > = {
      splash: {
        title: "Welcome to Nim Game",
        randomMode: "Random Mode",
        intelligentMode: "Intelligent Mode",
        description:
          "Take turns removing 1-3 sticks. The player who takes the last stick loses.",
      },
      game: {
        mode: (params) => `Mode: ${params.mode}`,
        currentPlayer: (params) => `Current Player: ${params.player}`,
        sticksRemaining: (params) => `Sticks remaining: ${params.count}`,
        takeSticks: (params) => `Take ${params.count}`,
        computerTook: (params) =>
          `Computer took ${params.count} stick${params.plural}`,
        computerThinking: "Computer is thinking...",
        gameOver: "Game Over!",
        youWon: "You won!",
        computerWon: "Computer won!",
        playAgain: "Play Again",
        changeMode: "Change Mode",
        exitGame: "Exit Game",
      },
    };

    return typeof translations[namespace]?.[key] === "function"
      ? translations[namespace][key](params)
      : translations[namespace]?.[key] || key;
  },
  useLocale: jest.fn().mockReturnValue("en"),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock dynamic imports
jest.mock("next/dynamic", () => (fn: any) => {
  const Component = fn();
  Component.displayName = "LoadableComponent";
  return Component;
});

// Reset locale mock before each test
beforeEach(() => {
  (useLocale as jest.Mock).mockReturnValue("en");
});
