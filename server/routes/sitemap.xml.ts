/**
 * Sitemap gerado no servidor.
 * Mantido manual porque o site tem poucas rotas — se crescer, vale usar
 * o módulo @nuxtjs/sitemap.
 */
const routes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/projetos', priority: '0.9', changefreq: 'monthly' },
  { path: '/sobre', priority: '0.8', changefreq: 'monthly' },
]

export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  const lastmod = new Date().toISOString().split('T')[0]

  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
})
