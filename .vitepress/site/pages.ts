import type { SiteConfig } from "vitepress"
import { locales, packages, rootLocale } from "./config"

export interface SitePage {
  source: string
  route: string
  text: string
  locale: string
  pkg: string | undefined
  isIndex: boolean
}

const NON_ROOT_LOCALES = new Set(locales.filter(locale => locale !== rootLocale))
const PACKAGE_PATHS = new Set(packages.map(pkg => pkg.path))

function toRoute(page: string, cleanUrls: boolean): string {
  return page
    .replace(/(^|\/)index\.md$/, "$1")
    .replace(/\.md$/, cleanUrls ? "" : ".html")
}

export function toTextPath(page: string): string {
  return page.replace(/\.md$/, ".txt")
}

export function collectPages(siteConfig: SiteConfig): SitePage[] {
  const cleanUrls = siteConfig.cleanUrls ?? false
  const pages: SitePage[] = []

  for (const source of siteConfig.pages) {
    const page = (siteConfig.rewrites.map[source] ?? source).replace(/\\/g, "/")
    if (!page.endsWith(".md")) {
      continue
    }

    const segments = page.split("/")
    const head = segments[0] ?? ""
    const locale = NON_ROOT_LOCALES.has(head) ? head : rootLocale
    const rest = locale === rootLocale ? segments : segments.slice(1)
    const first = rest[0] ?? ""

    pages.push({
      source,
      route: toRoute(page, cleanUrls),
      text: toTextPath(page),
      locale,
      pkg: rest.length > 1 && PACKAGE_PATHS.has(first) ? first : undefined,
      isIndex: rest[rest.length - 1] === "index.md",
    })
  }

  return pages.sort((a, b) => a.route.localeCompare(b.route))
}
