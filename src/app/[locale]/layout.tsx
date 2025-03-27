import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Press_Start_2P } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import "../global_nes.scss";
import "../globals.css";

const pressStart2P = Press_Start_2P({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Nim Game",
  description: "A simple Nim game implementation",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={pressStart2P.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
