/**
 * Gera o PDF do currículo a partir da página /curriculo.
 *
 * Requer o servidor rodando (npm run dev ou npm run preview).
 * Uso: node scripts/gerar-curriculo.mjs [url-base]
 */
import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const baseUrl = process.argv[2] || 'http://localhost:3010'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = resolve(root, 'public/curriculo-weslley-mattos.pdf')

const browser = await puppeteer.launch({ headless: 'new' })

try {
  const page = await browser.newPage()

  await page.goto(`${baseUrl}/curriculo`, { waitUntil: 'networkidle0' })
  // Usa os estilos de @media print definidos na página
  await page.emulateMediaType('print')

  await mkdir(dirname(output), { recursive: true })

  // Margem zero: o padding da própria folha (.cv-sheet) já faz esse papel
  await page.pdf({
    path: output,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })

  console.log(`PDF gerado em ${output}`)
} finally {
  await browser.close()
}
