import type { AdditionalConfig } from "vitepress"
import { defineAdditionalConfig } from "vitepress"
import { withSidebar } from "vitepress-sidebar"

export function defineLocaleConfig(locale: string): AdditionalConfig {
  const addPrefix = (link: string, prefix: boolean = true): string => `${prefix ? "/" : ""}${locale}${link}`

  const config = {
    themeConfig: {
      nav: [
        { text: "Home", link: addPrefix("/") },
        {
          text: "Oh Collection",
          items: [
            { text: "ohday", link: addPrefix("/ohday") },
            { text: "ohnet", link: addPrefix("/ohnet") },
          ],
        },
      ],
    },
  }

  const sidebar = [{
    documentRootPath: "docs",
    scanStartPath: addPrefix("/ohnet", false),
    resolvePath: addPrefix("/ohnet/"),
  }]

  return defineAdditionalConfig(withSidebar(config, sidebar))
}
