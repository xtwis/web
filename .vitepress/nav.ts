import type { DefaultTheme } from "vitepress"

export function localNav(locale: string): DefaultTheme.NavItem[] {
  const addPrefix = (link: string): string => `/${locale}${link}`

  return [
    { text: "Home", link: addPrefix("/") },
    {
      text: "Oh Collection",
      items: [
        { text: "ohday", link: addPrefix("/ohday") },
        { text: "ohnet", link: addPrefix("/ohnet") },
      ],
    },
  ]
}
