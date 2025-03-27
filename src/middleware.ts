import createMiddleware from "next-intl/middleware";

const locales = ["en", "de"] as const;
const defaultLocale = "en";

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  localePrefix: "always",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/((?!api|_next|.*\\..*).*)"],
};
