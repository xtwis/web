import collection from "./collection.config.js"

export interface Item {
  /** 项目 id */
  id: string
  /** 项目标题 */
  title: string
  /** 项目仓库 */
  repo: string
  /** git 引用 */
  ref: string
  /** 路径段 */
  slug: string
}

export type NavItem = string | {
  /** 分组标题 */
  title: string
  /** 项目 id */
  items: string[]
}

export interface Collection {
  items: Item[]
  nav: NavItem[]
}

export default collection as Collection
