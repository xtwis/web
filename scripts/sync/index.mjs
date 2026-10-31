import process from "node:process"
import { logger } from "../logger.mjs"
import { fetchDocs } from "./github.mjs"
import { writeDocs } from "./write.mjs"

const SOURCE_URL = new URL("./source.mjs", import.meta.url)

function routePath(sourcePath, slug, source) {
  const lower = sourcePath.toLowerCase()
  for (const dir of source.locales) {
    const dirLower = dir.toLowerCase()
    if (lower === dirLower || lower.startsWith(`${dirLower}/`)) {
      const rest = sourcePath.slice(dir.length + 1)
      return dir === source.root ? `${slug}/${rest}` : `${dir}/${slug}/${rest}`
    }
  }
  return `${slug}/${sourcePath}`
}

async function processItem(item, source) {
  const { repo, ref, slug } = item

  try {
    const folder = await fetchDocs(repo, ref)
    const files = folder.map(f => ({ ...f, path: routePath(f.path, slug, source) }))
    await writeDocs(files)
  }
  catch (e) {
    logger("error", `process ${repo} failed:`, e.message)
  }
}

export async function run() {
  logger("info", "syncing docs...\n")

  const mod = await import(SOURCE_URL.href)
  const source = mod.default
  if (!source.locales.includes(source.root)) {
    throw new Error(`root "${source.root}" must be one of ${source.locales.join(", ")}`)
  }

  for (const item of source.items) {
    await processItem(item, source)
    logger("info", `sync ${item.repo} done`)
  }

  logger("info", "sync docs done\n")
}

run().catch((err) => {
  logger("error", "sync docs failed: ", err.message)
  process.exit(1)
})
