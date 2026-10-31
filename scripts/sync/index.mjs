import process from "node:process"
import site from "../../site.config.js"
import { logger } from "../logger.mjs"
import { fetchDocs } from "./github.mjs"
import { writeDocs } from "./write.mjs"

function routePath(sourcePath, path, config) {
  const lower = sourcePath.toLowerCase()
  for (const dir of config.locales) {
    const dirLower = dir.toLowerCase()
    if (lower === dirLower || lower.startsWith(`${dirLower}/`)) {
      const rest = sourcePath.slice(dir.length + 1)
      return dir === config.root ? `${path}/${rest}` : `${dir}/${path}/${rest}`
    }
  }
  return `${path}/${sourcePath}`
}

async function processPackage(item, config) {
  const { repo, ref, path } = item

  try {
    const folder = await fetchDocs(repo, ref)
    const files = folder.map(f => ({ ...f, path: routePath(f.path, path, config) }))
    await writeDocs(files)
  }
  catch (e) {
    logger("error", `process ${repo} failed:`, e.message)
  }
}

export async function run() {
  logger("info", "syncing docs...\n")

  if (!site.locales.includes(site.root)) {
    throw new Error(`root "${site.root}" must be one of ${site.locales.join(", ")}`)
  }

  for (const item of site.packages) {
    await processPackage(item, site)
    logger("info", `sync ${item.repo} done`)
  }

  logger("info", "sync docs done\n")
}

run().catch((err) => {
  logger("error", "sync docs failed: ", err.message)
  process.exit(1)
})
