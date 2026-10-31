import type { AdditionalConfig, DefaultTheme, UserConfig } from "vitepress"
import type { VitePressSidebarOptions } from "vitepress-sidebar/types"
import { defineAdditionalConfig } from "vitepress"
import { withSidebar } from "vitepress-sidebar"

export const ROOT_LOCALE = "en"

export function defineLocaleConfig(locale: string): AdditionalConfig {
  const isRoot = locale === ROOT_LOCALE
  const prefix = isRoot ? "" : `/${locale}`
  const toUrl = (path: string): string => `${prefix}/${path}`.replace(/\/{2,}/g, "/")
  const toDisk = (path: string): string => (isRoot ? path : `${locale}/${path}`)

  const buildNav = (title: string, path: string): DefaultTheme.NavItem => {
    return { text: title, link: toUrl(path), activeMatch: toUrl(path) }
  }

  const buildSidebar = (path: string): VitePressSidebarOptions => {
    return {
      documentRootPath: "docs",
      scanStartPath: toDisk(path),
      resolvePath: toUrl(`${path}/`),
      includeRootIndexFile: true,
      includeFolderIndexFile: true,
      sortMenusByFrontmatterOrder: true,
      useTitleFromFrontmatter: true,
    }
  }

  const config = {
    themeConfig: {
      nav: [
        { text: "Home", link: toUrl("") },
        buildNav("OhDay", "ohday"),
        buildNav("OhNet", "ohnet"),
        buildNav("OhDoc", "ohdoc"),
        buildNav("OhStart", "ohstart"),
      ] as DefaultTheme.NavItem[],
    },
  } as UserConfig

  const sidebar = [
    buildSidebar("ohday"),
    buildSidebar("ohnet"),
    buildSidebar("ohdoc"),
    buildSidebar("ohstart"),
  ] as VitePressSidebarOptions[]

  return defineAdditionalConfig(withSidebar(config, sidebar))
}
