import puppeteer from 'puppeteer'

const out = process.argv[2]

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()

// Viewport com a proporção exata de uma folha A4 (210x297mm a 96dpi)
await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1.6 })
await page.goto('http://localhost:3010/curriculo', { waitUntil: 'networkidle0' })
await page.emulateMediaType('print')
await page.screenshot({ path: out })

await browser.close()
console.log('ok')
