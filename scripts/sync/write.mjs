import { mkdir, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

/**
 * @typedef {import("./github.mjs").FileBlob} FileBlob
 */

const DOCS_DIR = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "docs",
)

/**
 * Writes file blobs to `docs/<path>` under the project root.
 * @param {FileBlob[]} files File blobs with destination paths
 *   (e.g. "en/ohday/index.md") relative to `docs/`.
 * @returns {Promise<void>}
 */
export async function writeDocs(files) {
  for (const { path, content } of files) {
    const dest = resolve(DOCS_DIR, path)
    await mkdir(dirname(dest), { recursive: true })
    await writeFile(dest, content, "utf8")
  }
}
