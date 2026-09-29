import process from "node:process"
import { fetchDocs } from "./github.mjs"
import { writeDocs } from "./write.mjs"

const CONFIG_URL = new URL(
  "../../.vitepress/collection.config.js",
  import.meta.url,
)

function routePath(sourcePath, slug, locales) {
  for (const locale of locales) {
    if (sourcePath === locale.dir || sourcePath.startsWith(`${locale.dir}/`)) {
      const rest = sourcePath.slice(locale.dir.length + 1)
      return `${locale.dir}/${slug}/${rest}`
    }
  }
  const def = locales[0]
  return `${def.dir}/${slug}/${sourcePath}`
}

async function processItem(item, locales) {
  const { repo, ref, slug } = item

  const folder = await fetchDocs(repo, ref)
  const files = folder.map(f => ({ ...f, path: routePath(f.path, slug, locales) }))
  await writeDocs(files)
}

export async function run() {
  const mod = await import(CONFIG_URL.href)
  const { items, locales } = mod.default
  for (const item of items) {
    await processItem(item, locales)
  }
}

run().catch((err) => {
  console.error(`fail: ${err.message}`)
  process.exit(1)
})
