import puppeteer from 'puppeteer'

const [route, out, mode] = process.argv.slice(2)

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()

await page.setViewport({ width: 1440, height: 900 })

// Define o modo da página Sobre antes de carregar, para não cair no diálogo
if (mode) {
  await page.goto('http://localhost:3010/', { waitUntil: 'domcontentloaded' })
  await page.evaluate((m) => localStorage.setItem('portfolio:about-mode', m), mode)
}

await page.goto(`http://localhost:3010${route}`, { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 1200))
await page.screenshot({ path: out, fullPage: true })

await browser.close()
console.log('ok')
