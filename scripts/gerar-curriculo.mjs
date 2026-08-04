/**
 * Gera o PDF do currículo a partir da página /curriculo.
 *
 *   npm run curriculo                      -> usa o site em produção
 *   npm run curriculo -- http://localhost:3010   -> usa um servidor local
 *
 * Por padrão aponta para produção de propósito. O conteúdo do currículo vive
 * no servidor desde que o painel existe; gerar a partir de um servidor local
 * produziria um PDF com os dados da semente, diferente do que está no ar —
 * exatamente o tipo de divergência silenciosa que a gente quer evitar.
 *
 * O arquivo sai na raiz do projeto (fora do git). Depois envie-o em
 * Painel > Currículo > Enviar novo PDF: é o upload que publica.
 */
import { mkdir, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import puppeteer from 'puppeteer'

const baseUrl = (
  process.argv[2] ||
  process.env.NUXT_PUBLIC_SITE_URL ||
  'https://weslleymattos.com.br'
).replace(/\/$/, '')

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = resolve(root, 'curriculo-weslley-mattos.pdf')

console.log(`Gerando a partir de ${baseUrl}/curriculo`)

const browser = await puppeteer.launch({ headless: 'new' })

try {
  const page = await browser.newPage()

  const resposta = await page.goto(`${baseUrl}/curriculo`, {
    waitUntil: 'networkidle0',
    timeout: 60000,
  })

  // Sem esta checagem um 404 ou 502 viraria um PDF de página de erro,
  // provavelmente descoberto so depois de enviar para o site.
  if (!resposta || !resposta.ok()) {
    throw new Error(`A pagina respondeu ${resposta?.status() ?? 'sem resposta'}`)
  }

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

  const { size } = await stat(output)
  console.log(`
PDF gerado: ${output}  (${Math.round(size / 1024)} KB)

Proximo passo: Painel > Curriculo > Enviar novo PDF.
Enquanto o arquivo nao for enviado, o site continua servindo o PDF antigo.
`)
} finally {
  await browser.close()
}
