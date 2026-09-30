import { defineAdditionalConfig } from "vitepress"
import { withSidebar } from "vitepress-sidebar"
import { localNav } from "../../.vitepress/nav"

export default defineAdditionalConfig(withSidebar({
  themeConfig: {
    nav: localNav("en"),
  },
}, [{
  documentRootPath: "docs",
  scanStartPath: "en/ohnet",
  resolvePath: "/en/ohnet/",
}]))
