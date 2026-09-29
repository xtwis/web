import process from "node:process"

/**
 * @typedef {{ path: string, content: string }} FileBlob
 */

const GITHUB_API = "https://api.github.com"
const RAW_BASE = "https://raw.githubusercontent.com"
const DOCS_DIR = "docs"

const API_HEADERS = {
  "User-Agent": "xtwis-web-sync",
  "Accept": "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
}

const RAW_HEADERS = { "User-Agent": "xtwis-web-sync" }

async function getJson(url) {
  const res = await fetch(url, { headers: API_HEADERS })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} for ${url}`)
  }
  return res.json()
}

async function getText(url) {
  const res = await fetch(url, { headers: RAW_HEADERS })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} for ${url}`)
  }
  return res.text()
}

/**
 * Fetches every blob under `<repo>/<ref>/docs/...` along with its content.
 * @param {string} repo Repository in "owner/name" format.
 * @param {string} ref Git ref (branch, tag, or SHA).
 * @returns {Promise<FileBlob[]>} File blobs with paths relative to
 *   `<repo>/<ref>/docs/` (e.g. "en/index.md", "zh/guide/foo.md").
 */
export async function fetchDocs(repo, ref) {
  const [owner, name] = repo.split("/")
  if (!owner || !name) {
    throw new Error(`invalid repo "${repo}", expected "owner/name"`)
  }

  const treeUrl = `${GITHUB_API}/repos/${owner}/${name}/git/trees/${ref}?recursive=1`
  const data = await getJson(treeUrl)
  if (data.truncated) {
    throw new Error(
      `tree for ${repo}@${ref} was truncated by GitHub; `
      + `repo is too large for the recursive tree API`,
    )
  }

  const prefix = `${DOCS_DIR}/`
  const blobs = data.tree.filter(e => e.type === "blob" && e.path.startsWith(prefix))

  const files = []
  for (const blob of blobs) {
    const rawUrl = `${RAW_BASE}/${owner}/${name}/${ref}/${blob.path}`
    const content = await getText(rawUrl)
    files.push({ path: blob.path.slice(prefix.length), content })
  }

  return files
}
