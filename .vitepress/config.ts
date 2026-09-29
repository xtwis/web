import { defineConfig } from "vitepress"
import { locales } from "./locales"
import { sidebar } from "./sidebar"
import { socialLinks } from "./socialLinks"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",

  title: "Twis Project",
  description: "Twisuki's public open-source collection",
  lastUpdated: true,

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
  ],

  themeConfig: {
    sidebar,
    socialLinks,
  },

  locales,
})
