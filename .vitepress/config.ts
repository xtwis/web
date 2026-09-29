import { defineConfig } from "vitepress"
import { sidebar } from "./sidebar"

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
    socialLinks: [
      { icon: "github", link: "https://github.com/xtwis" },
      { icon: "x", link: "https://twitter.com/suyang_233" },
      { icon: "bilibili", link: "https://space.bilibili.com/317707977" },
    ],
  },

  locales: {
    en: {
      label: "English",
      lang: "en",
      dir: "en",
    },
    zh: {
      label: "简体中文",
      lang: "zh_CN",
      dir: "zh",
    },
  },
})
