import process from "node:process"
import { fetchDocs } from "./github.mjs"
import { logger } from "./logger.mjs"
import { writeDocs } from "./write.mjs"

const SOURCE_URL = new URL("./source.mjs", import.meta.url)

function routePath(sourcePath, slug, locales) {
  const lower = sourcePath.toLowerCase()
  for (const dir of locales) {
    const dirLower = dir.toLowerCase()
    if (lower === dirLower || lower.startsWith(`${dirLower}/`)) {
      const rest = sourcePath.slice(dirLower.length + 1)
      return `${dir}/${slug}/${rest}`
    }
  }
  const def = locales[0]
  return `${def}/${slug}/${sourcePath}`
}

async function processItem(item, locales) {
  const { repo, ref, slug } = item

  try {
    const folder = await fetchDocs(repo, ref)
    const files = folder.map(f => ({ ...f, path: routePath(f.path, slug, locales) }))
    await writeDocs(files)
  }
  catch (e) {
    logger("error", `process ${repo} failed:`, e.message)
  }
}

export async function run() {
  logger("info", "syncing docs...\n")

  const mod = await import(SOURCE_URL.href)
  const { items, locales } = mod.default
  for (const item of items) {
    await processItem(item, locales)
  }
}

run().catch((err) => {
  logger("error", "sync docs failed: ", err.message)
  process.exit(1)
})
