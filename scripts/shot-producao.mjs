/**
 * Abre o site no servidor de produção forçando a resolução de DNS,
 * útil para conferir o deploy antes do A record ser trocado.
 */
import puppeteer from 'puppeteer'

const [out, ip = '187.77.233.7', path = '/'] = process.argv.slice(2)

const browser = await puppeteer.launch({
  headless: 'new',
  args: [
    `--host-rules=MAP weslleymattos.com.br ${ip},MAP www.weslleymattos.com.br ${ip}`,
    '--ignore-certificate-errors',
    '--no-sandbox',
  ],
})

const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto(`http://weslleymattos.com.br${path}`, { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 1500))
await page.screenshot({ path: out })

await browser.close()
console.log('ok')
