/**
 * @typedef {object} Item
 * @property {string} repo Repository in "owner/name" format
 * @property {string} ref Git ref (branch, tag, or SHA)
 * @property {string} slug Local path segment
 */

/**
 * @typedef {object} Source
 * @property {Item[]} items Items to sync
 * @property {string[]} locales Locale directories
 */

/** @type {Source} */
export default {
  items: [
    {
      slug: "ohday",
      repo: "xtwis/ohday",
      ref: "main",
    },
    {
      slug: "ohnet",
      repo: "xtwis/ohnet",
      ref: "main",
    },
  ],
  locales: ["en", "zh"],
}
