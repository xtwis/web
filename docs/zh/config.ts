import { defineAdditionalConfig } from "vitepress"
import { withSidebar } from "vitepress-sidebar"
import { localNav } from "../../.vitepress/nav"

export default defineAdditionalConfig(withSidebar({
  themeConfig: {
    nav: localNav("zh"),
  },
}, [{
  documentRootPath: "docs",
  scanStartPath: "zh/ohnet",
  resolvePath: "/zh/ohnet/",
}]))
