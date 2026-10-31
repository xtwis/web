import type { HeadConfig, SiteConfig, TransformContext } from "vitepress"
import type { OutputFile } from "./sitemap"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { locales, resolveOrigin, rootLocale } from "./config"
import { collectPages, toTextPath } from "./pages"
import { buildSitemaps } from "./sitemap"

export async function emitArtifacts(siteConfig: SiteConfig): Promise<void> {
  const origin = resolveOrigin()
  const base = siteConfig.site.base
  const pages = collectPages(siteConfig)
  const files = buildSitemaps(pages, { origin, base })

  const texts = await Promise.all(pages.map(async (page) => {
    const content = await readFile(join(siteConfig.srcDir, page.source), "utf8")
    return { path: page.text, content } satisfies OutputFile
  }))
  files.push(...texts)

  const sitemaps = locales.map(locale => `${locale === rootLocale ? "" : `${locale}/`}sitemap.xml`)
  const robots = sitemaps.map(path => `Sitemap: ${origin}${base}${path}`)
  files.push({ path: "robots.txt", content: `${robots.join("\n")}\n` })

  await Promise.all(files.map(file => writeOutput(siteConfig.outDir, file)))
}

export function textAlternateHead(ctx: TransformContext): HeadConfig[] {
  if (!ctx.pageData.filePath) {
    return []
  }
  const href = `${ctx.siteConfig.site.base}${toTextPath(ctx.pageData.relativePath)}`
  return [["link", { rel: "alternate", type: "text/plain", href }]]
}

async function writeOutput(outDir: string, file: OutputFile): Promise<void> {
  const dest = join(outDir, file.path)
  await mkdir(dirname(dest), { recursive: true })
  await writeFile(dest, file.content, "utf8")
}
