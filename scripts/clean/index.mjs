import { readdir, rm } from "node:fs/promises"
import { join } from "node:path"
import process from "node:process"
import site from "../../site.config.js"
import { logger } from "../logger.mjs"

const DOCS = join(process.cwd(), "docs")

const SECONDARY = site.locales.filter(locale => locale !== site.root)
const ROOT_KEEP = new Set(["public", ".gitignore", "index.md", "config.ts", ...SECONDARY])
const LOCALE_KEEP = new Set([".gitignore", "index.md", "config.ts"])

async function clear(dir, keep) {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  }
  catch {
    return
  }
  await Promise.all(entries.map(async (entry) => {
    if (keep.has(entry.name)) {
      return
    }
    await rm(join(dir, entry.name), { recursive: true, force: true })
  }))
}

async function run() {
  await clear(DOCS, ROOT_KEEP)
  for (const locale of SECONDARY) {
    await clear(join(DOCS, locale), LOCALE_KEEP)
  }
}

run().then(() => {
  logger("info", "clean docs done\n")
}).catch((err) => {
  logger("error", "clean docs failed: ", err.message)
  process.exit(1)
})
