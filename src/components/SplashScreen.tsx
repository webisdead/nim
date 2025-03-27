import { useTranslations } from "next-intl";

import GameButton from "@/components/GameButton";

interface SplashScreenProps {
  onModeSelect: (mode: "random" | "intelligent") => void;
}

export default function SplashScreen({ onModeSelect }: SplashScreenProps) {
  const t = useTranslations("splash");

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl text-center">{t("title")}</h1>
      <GameButton variant="primary" onClick={() => onModeSelect("random")}>
        {t("randomMode")}
      </GameButton>

      <GameButton variant="success" onClick={() => onModeSelect("intelligent")}>
        {t("intelligentMode")}
      </GameButton>

      <div className="nes-container is-rounded">
        <p className="text-center text-sm">{t("description")}</p>
      </div>
    </div>
  );
}
