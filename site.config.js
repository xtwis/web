/**
 * @typedef {object} Package
 * @property {string} path Local path segment
 * @property {string} title Package title
 * @property {string} repo Repository in "owner/name" format
 * @property {string} ref Git ref (branch, tag, or SHA)
 */

/**
 * @typedef {object} SiteConfig
 * @property {Package[]} packages Packages to sync
 * @property {string[]} locales Locale directories
 * @property {string} root Locale served at the site root
 */

/** @type {SiteConfig} */
export default {
  packages: [
    {
      path: "ohday",
      title: "OhDay",
      repo: "xtwis/ohday",
      ref: "main",
    },
    {
      path: "ohnet",
      title: "OhNet",
      repo: "xtwis/ohnet",
      ref: "main",
    },
    {
      path: "ohdoc",
      title: "OhDoc",
      repo: "xtwis/ohdoc",
      ref: "main",
    },
    {
      path: "ohstart",
      title: "OhStart",
      repo: "xtwis/ohstart",
      ref: "main",
    },
  ],
  locales: ["en", "zh"],
  root: "en",
}
