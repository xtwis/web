import { readdir, rm } from "node:fs/promises"
import { join } from "node:path"
import process from "node:process"

const DOCS = join(process.cwd(), "docs")

const LOCALES = new Set(["en", "zh"])
const PROTECTED_LOCALE = new Set(["index.md", "config.ts", ".gitignore"])
const PROTECTED_TOP = new Set(["public", ".gitignore"])

const PROTECTED = new Set([
  ...PROTECTED_TOP,
  ...[...LOCALES].flatMap(locale =>
    [...PROTECTED_LOCALE].map(file => `${locale}/${file}`),
  ),
])

async function clean(dir, relBase = "") {
  const entries = await readdir(dir, { withFileTypes: true })
  await Promise.all(entries.map(async (entry) => {
    const relPath = `${relBase}${entry.name}`
    if (PROTECTED.has(relPath)) {
      return
    }
    if (entry.isDirectory() && LOCALES.has(entry.name)) {
      await clean(join(dir, entry.name), `${relPath}/`)
      return
    }
    await rm(join(dir, entry.name), { recursive: true, force: true })
  }))
}

clean(DOCS).catch((err) => {
  console.error(err.message)
  process.exit(1)
})
