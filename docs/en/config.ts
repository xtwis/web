import { defineAdditionalConfig } from "vitepress"
import { localNav } from "../../.vitepress/nav"

export default defineAdditionalConfig({
  themeConfig: {
    nav: localNav("en"),
  },
})
