import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

interface ComputerMoveProps {
  currentPlayer: "player" | "computer";
  computerLastMove: number | null;
  onMakeMove: () => void;
  computerMoveDelay: number;
}

export default function ComputerMove({
  currentPlayer,
  computerLastMove,
  onMakeMove,
  computerMoveDelay,
}: ComputerMoveProps) {
  const t = useTranslations("game");
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (currentPlayer === "computer") {
      timerRef.current = window.setTimeout(onMakeMove, computerMoveDelay);
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [currentPlayer, onMakeMove, computerMoveDelay]);

  if (computerLastMove === null) return null;

  return (
    <p className="text-center text-lg">
      {t("computerTook", { count: computerLastMove })}
    </p>
  );
}
