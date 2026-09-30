import type { AdditionalConfig, DefaultTheme, UserConfig } from "vitepress"
import type { VitePressSidebarOptions } from "vitepress-sidebar/types"
import { defineAdditionalConfig } from "vitepress"
import { withSidebar } from "vitepress-sidebar"

export function defineLocaleConfig(locale: string): AdditionalConfig {
  const addPrefix = (link: string, prefix: boolean = true): string => `${prefix ? "/" : ""}${locale}${link}`

  const config = {
    themeConfig: {
      nav: [
        { text: "Home", link: addPrefix("/") },
        { text: "OhDay", link: addPrefix("/ohday"), activeMatch: addPrefix("/ohday") },
        { text: "OhNet", link: addPrefix("/ohnet"), activeMatch: addPrefix("/ohnet") },
      ] as DefaultTheme.NavItem[],
    },
  } as UserConfig

  const sidebar = [{
    documentRootPath: "docs",
    scanStartPath: addPrefix("/ohnet", false),
    resolvePath: addPrefix("/ohnet/"),
    includeRootIndexFile: true,
    includeFolderIndexFile: true,
    sortMenusByFrontmatterOrder: true,
    useTitleFromFrontmatter: true,
  }] as VitePressSidebarOptions[]

  return defineAdditionalConfig(withSidebar(config, sidebar))
}
