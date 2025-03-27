import { getRequestConfig } from "next-intl/server";

const locales = ["en", "de"] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // If locale is invalid, fall back to English
  const validLocale =
    locale && locales.includes(locale as Locale) ? locale : "en";

  return {
    locale: validLocale,
    messages: (await import(`../app/messages/${validLocale}.json`)).default,
  };
});
