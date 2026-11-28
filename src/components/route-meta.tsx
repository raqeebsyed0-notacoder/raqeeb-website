import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { resolveRouteMeta } from '../lib/seo'

function setMeta(attribute: 'name' | 'property', key: string, content: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export default function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = resolveRouteMeta(pathname)

    document.title = meta.title
    setMeta('name', 'description', meta.description)
    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:image', meta.image)
    setMeta('property', 'og:url', meta.url)
    setMeta('property', 'og:type', 'website')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', meta.title)
    setMeta('name', 'twitter:description', meta.description)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    // Hash-router SPA: the real per-route address is the hash URL, so canonical is origin/#pathname.
    canonical.href = meta.url
  }, [pathname])

  return null
}
