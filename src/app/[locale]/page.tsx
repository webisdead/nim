import LanguageSwitcher from "@/components/LanguageSwitcher";
import NimGame from "@/components/NimGame";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl">Nim Game</h1>
          <LanguageSwitcher />
        </div>
        <div className="nes-container bg-white relative">
          <NimGame />
        </div>
      </div>
    </main>
  );
}
