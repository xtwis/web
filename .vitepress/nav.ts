import type { DefaultTheme } from "vitepress"
import type { Item, NavItem } from "./collection"
import collection from "./collection"

function getItem(id: string): Item | undefined {
  return collection.items.find(i => i.id === id)
}

function buildNav(nav: NavItem): DefaultTheme.NavItem {
  if (typeof nav === "string") {
    const item = getItem(nav)
    if (!item)
      return { text: nav, link: "#" }
    return { text: item.title, link: `/${item.slug}/` }
  }
  return {
    text: nav.title,
    items: nav.items
      .map(id => getItem(id))
      .filter((i): i is Item => Boolean(i))
      .map(i => ({ text: i.title, link: `/${i.slug}/` })),
  }
}

export const nav: DefaultTheme.NavItem[] = [
  { text: "Home", link: "/" },
  ...collection.nav.map(buildNav),
]
