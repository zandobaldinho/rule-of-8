// Checks whether a page's blocks sit on the 8 px grid.
// Usage: node measure-grid.mjs <url> [block-selector] [container-selector]
//   e.g. node measure-grid.mjs http://localhost:3000/dashboard "[data-m]" "main"
// Needs Playwright (npm i -D playwright && npx playwright install chromium).
// Measures at 1440 dark, 1024 light and 390 dark; exits with code 1 if anything is off.
import { chromium } from 'playwright'

const [, , url, blocks = '[data-m]', container = 'main'] = process.argv
if (!url) { console.error('Usage: node measure-grid.mjs <url> [blocks] [container]'); process.exit(2) }

const viewports = [['1440 dark', 1440, 900, 'dark'], ['1024 light', 1024, 768, 'light'], ['390 dark', 390, 844, 'dark']]
const browser = await chromium.launch()
let failed = false
for (const [name, w, h, scheme] of viewports) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, colorScheme: scheme })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(url, { waitUntil: 'networkidle' })
  const r = await page.evaluate(([blocks, container]) => {
    const base = document.querySelector(container)?.getBoundingClientRect()
    if (!base) return { error: `container "${container}" not found` }
    const list = [...document.querySelectorAll(blocks)].filter((el) => el.offsetParent).map((el) => {
      const b = el.getBoundingClientRect()
      return { block: (el.getAttribute('aria-label') || el.className || el.tagName).toString().slice(0, 40), height: +b.height.toFixed(1), top: +(b.top - base.top).toFixed(1) }
    })
    return { total: list.length, off: list.filter((m) => m.height % 8 || m.top % 8), sideScroll: document.documentElement.scrollWidth > innerWidth }
  }, [blocks, container])
  if (r.error) { console.log(`${name}: ${r.error}`); failed = true; await page.close(); continue }
  console.log(`${name}: ${r.total - r.off.length}/${r.total} on the grid${r.sideScroll ? ' · HORIZONTAL SCROLL' : ''}${errors.length ? ` · ${errors.length} JS error(s)` : ''}`)
  for (const m of r.off) console.log(`   off: ${m.block} — height ${m.height}, top ${m.top}`)
  if (r.off.length || r.sideScroll || errors.length) failed = true
  await page.close()
}
await browser.close()
process.exit(failed ? 1 : 0)
