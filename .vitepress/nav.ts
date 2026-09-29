import type { DefaultTheme } from "vitepress"
import type { Item, NavItem } from "./collection"
import collection from "./collection"

function getItem(id: string): Item | undefined {
  return collection.items.find(i => i.id === id)
}

export function nav(locale: string): DefaultTheme.NavItem[] {
  function buildItem(navItem: NavItem): DefaultTheme.NavItem {
    if (typeof navItem === "string") {
      const item = getItem(navItem)
      if (!item) {
        return { text: navItem, link: "#" }
      }
      return { text: item.title, link: `/${locale}/${item.slug}/` }
    }
    return {
      text: navItem.title,
      items: navItem.items
        .map(id => getItem(id))
        .filter((i): i is Item => Boolean(i))
        .map(i => ({ text: i.title, link: `/${locale}/${i.slug}/` })),
    }
  }

  return [
    { text: "Home", link: `/${locale}/` },
    ...collection.nav.map(buildItem),
  ]
}
