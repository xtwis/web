import type { LocaleConfig } from "vitepress"
import collection from "./collection"

function buildLocales(): LocaleConfig {
  const locales = collection.locales
  return Object.fromEntries(locales.map(l => [l.dir, l]))
}

export const locales: LocaleConfig = {
  ...buildLocales(),
}
