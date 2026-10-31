import type { UserConfig } from "vitepress"
import { defineConfig } from "vitepress"
import { withSidebar } from "vitepress-sidebar"
import { emitArtifacts, textAlternateHead } from "./site"

const option = {
  srcDir: "docs",

  title: "Twis Project",
  description: "Twisuki's public open-source collection",
  lastUpdated: true,

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
  ],

  themeConfig: {
    socialLinks: [
      { icon: "github", link: "https://github.com/xtwis" },
      { icon: "x", link: "https://twitter.com/suyang_233" },
      { icon: "bilibili", link: "https://space.bilibili.com/317707977" },
    ],
  },

  locales: {
    root: {
      label: "English",
      lang: "en",
    },
    zh: {
      label: "简体中文",
      lang: "zh-CN",
    },
  },

  markdown: {
    html: false,
  },

  transformHead: textAlternateHead,
  buildEnd: emitArtifacts,
} as const satisfies UserConfig

// https://vitepress.dev/reference/site-config
export default defineConfig(withSidebar(option))
