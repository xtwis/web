import type { AdditionalConfig, DefaultTheme, UserConfig } from "vitepress"
import type { VitePressSidebarOptions } from "vitepress-sidebar/types"
import { defineAdditionalConfig } from "vitepress"
import { withSidebar } from "vitepress-sidebar"

export function defineLocaleConfig(locale: string): AdditionalConfig {
  const addPrefix = (link: string, prefix: boolean = true): string => `${prefix ? "/" : ""}${locale}${link}`

  const buildNav = (title: string, path: string): DefaultTheme.NavItem => {
    return { text: title, link: addPrefix(`/${path}`), activeMatch: addPrefix(`/${path}`) }
  }

  const buildSidebar = (path: string): VitePressSidebarOptions => {
    return {
      documentRootPath: "docs",
      scanStartPath: addPrefix(`/${path}`, false),
      resolvePath: addPrefix(`/${path}/`),
      includeRootIndexFile: true,
      includeFolderIndexFile: true,
      sortMenusByFrontmatterOrder: true,
      useTitleFromFrontmatter: true,
    }
  }

  const config = {
    themeConfig: {
      nav: [
        { text: "Home", link: addPrefix("/") },
        buildNav("OhDay", "ohday"),
        buildNav("OhNet", "ohnet"),
        buildNav("OhDoc", "ohdoc"),
      ] as DefaultTheme.NavItem[],
    },
  } as UserConfig

  const sidebar = [
    buildSidebar("ohday"),
    buildSidebar("ohnet"),
    buildSidebar("ohdoc"),
  ] as VitePressSidebarOptions[]

  return defineAdditionalConfig(withSidebar(config, sidebar))
}
