import process from "node:process"
import site from "../../site.config"

export type SitePackage = (typeof site.packages)[number]

export const packages: readonly SitePackage[] = site.packages

export const locales: readonly string[] = site.locales

export const rootLocale: string = site.root

const FALLBACK_ORIGIN = "http://localhost:5173"

export function resolveOrigin(): string {
  const raw = process.env.SITE_URL
    ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined)
    ?? FALLBACK_ORIGIN
  return raw.replace(/\/+$/, "")
}
