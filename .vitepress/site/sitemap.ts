import type { SitePage } from "./pages"
import { locales, packages, rootLocale } from "./config"

export interface OutputFile {
  path: string
  content: string
}

export interface SitemapOptions {
  origin: string
  base: string
}

const XML_DECL = `<?xml version="1.0" encoding="UTF-8"?>`

export function buildSitemaps(pages: SitePage[], options: SitemapOptions): OutputFile[] {
  const files: OutputFile[] = []

  for (const locale of locales) {
    const localePages = pages.filter(page => page.locale === locale)
    if (!localePages.length) {
      continue
    }

    const prefix = locale === rootLocale ? "" : `${locale}/`
    const entryUrls: string[] = []

    for (const pkg of packages) {
      const packagePages = localePages.filter(page => page.pkg === pkg.path)
      if (!packagePages.length) {
        continue
      }

      const packageUrls = packagePages
        .flatMap(page => [urlOf(options, page.route), urlOf(options, page.text)])
      files.push({ path: `${prefix}${pkg.path}/sitemap.xml`, content: renderUrlset(packageUrls) })

      const index = packagePages.find(page => page.isIndex)
      if (index) {
        entryUrls.push(urlOf(options, index.route), urlOf(options, index.text))
      }
    }

    files.push({ path: `${prefix}sitemap.xml`, content: renderUrlset(entryUrls) })
  }

  return files
}

function renderUrlset(urls: string[]): string {
  const entries = urls.map(url => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`)
  return [XML_DECL, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`, ...entries, `</urlset>`, ``].join("\n")
}

function urlOf(options: SitemapOptions, path: string): string {
  return `${options.origin}${options.base}${path}`
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
