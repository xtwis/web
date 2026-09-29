import { defineAdditionalConfig } from "vitepress"
import { nav } from "../../.vitepress/nav"

export default defineAdditionalConfig({
  themeConfig: {
    nav: nav("en"),
  },
})
