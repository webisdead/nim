"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import GameButton from "@/components/GameButton";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "de" : "en";
    router.push(`/${newLocale}`);
  };

  return (
    <GameButton onClick={toggleLanguage}>
      {locale === "en" ? "DE" : "EN"}
    </GameButton>
  );
}
