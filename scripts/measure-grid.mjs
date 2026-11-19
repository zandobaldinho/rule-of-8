// Checks whether a page's blocks sit on the 8 px grid, and that text contrast (4.5:1, 3:1 for large text)
// and touch targets (48 px at phone width) hold inside the container.
// Usage: node measure-grid.mjs <url> [more urls…] [block-selector] [container-selector]
//   e.g. node measure-grid.mjs http://localhost:3000/dashboard "[data-m]" "main"
//   Pass one URL per screen or state (a page only shows one at a time):
//        node measure-grid.mjs "file://$PWD/demo.html#orders" "file://$PWD/demo.html#sales"
// Needs Playwright in the project you run it from (npm i -D playwright && npx playwright install chromium).
// Measures at 1440, 1024 and 390 px, each in dark and light; exits with code 1 if anything is off or nothing was measured.
import { createRequire } from 'node:module'
let chromium // resolved from the current folder, not from this script's folder inside the skill
try { ({ chromium } = createRequire(`${process.cwd()}/`)('playwright')) } catch {
  console.error('Playwright not found. Run: npm i -D playwright && npx playwright install chromium'); process.exit(2)
}

const args = process.argv.slice(2)
const urls = args.filter((a) => /^(https?|file):/.test(a))
const [blocks = '[data-m]', container = 'main'] = args.filter((a) => !urls.includes(a))
if (!urls.length) { console.error('Usage: node measure-grid.mjs <url> [more urls…] [blocks] [container]'); process.exit(2) }

const viewports = [[1440, 900], [1024, 768], [390, 844]].flatMap(([w, h]) => ['dark', 'light'].map((s) => [`${w} ${s}`, w, h, s]))
const browser = await chromium.launch()
let failed = false
for (const url of urls) for (const [view, w, h, scheme] of viewports) {
  const name = urls.length > 1 ? `${url.split('/').pop()} · ${view}` : view
  const phone = w < 768 // phone width runs as a touch device, so pointer: coarse styles apply
  const page = await browser.newPage({ viewport: { width: w, height: h }, colorScheme: scheme, hasTouch: phone, isMobile: phone })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(url, { waitUntil: 'networkidle' })
  const r = await page.evaluate(([blocks, container, phone]) => {
    const root = document.querySelector(container), base = root?.getBoundingClientRect()
    if (!base) return { error: `container "${container}" not found` }
    const label = (el) => (el.getAttribute('aria-label') || el.className || el.tagName).toString().slice(0, 40)
    const list = [...document.querySelectorAll(blocks)].filter((el) => el.offsetParent).map((el) => {
      const b = el.getBoundingClientRect()
      return { block: label(el), height: +b.height.toFixed(1), top: +(b.top - base.top).toFixed(1) }
    })
    const sticksOut = (el) => el.getBoundingClientRect().right > innerWidth + 1
    const wide = document.documentElement.scrollWidth > innerWidth
      ? [...document.body.querySelectorAll('*')].filter((el) => sticksOut(el) && ![...el.children].some(sticksOut)).slice(0, 3).map((el) => `${label(el)} "${el.textContent.trim().slice(0, 24)}"`)
      : []
    // Contrast: text color against the first opaque background up the tree (canvas normalizes oklch, hex, etc.)
    const cx = Object.assign(document.createElement('canvas'), { width: 1, height: 1 }).getContext('2d', { willReadFrequently: true })
    const rgba = (c) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); return [...cx.getImageData(0, 0, 1, 1).data] }
    const lum = ([r, g, b]) => [r, g, b].map((v) => (v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0)
    const bgOf = (el) => { for (; el; el = el.parentElement) { const c = rgba(getComputedStyle(el).backgroundColor); if (c[3] > 250) return c } return [255, 255, 255, 255] }
    const visible = (el) => el.offsetParent && el.getBoundingClientRect().width > 0 && getComputedStyle(el).visibility !== 'hidden'
    const lowContrast = [...root.querySelectorAll('*')].filter((el) => visible(el) && !el.closest(':disabled,[aria-disabled=true],[aria-hidden=true]')
      && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())).map((el) => {
      const st = getComputedStyle(el), a = lum(rgba(st.color)), b = lum(bgOf(el)), ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
      const large = parseFloat(st.fontSize) >= 24 || (parseFloat(st.fontSize) >= 18.6 && +st.fontWeight >= 700)
      return { text: el.textContent.trim().slice(0, 24), ratio: +ratio.toFixed(2), min: large ? 3 : 4.5 }
    }).filter((t) => t.ratio < t.min).sort((x, y) => x.ratio - y.ratio)
    const small = phone ? [...root.querySelectorAll('button, select, textarea, input:not([type=hidden]):not([type=checkbox]):not([type=radio]), [role=button], [role=tab]')]
      .filter(visible).map((el) => ({ el, b: el.getBoundingClientRect() })).filter(({ b }) => b.height < 47.5)
      .map(({ el, b }) => `${label(el)} "${(el.textContent || el.value || '').trim().slice(0, 20)}" ${Math.round(b.width)}×${Math.round(b.height)}`) : []
    return { total: list.length, off: list.filter((m) => m.height % 8 || m.top % 8), sideScroll: document.documentElement.scrollWidth > innerWidth, wide, lowContrast, small }
  }, [blocks, container, phone])
  if (r.error) { console.log(`${name}: ${r.error}`); failed = true; await page.close(); continue }
  const extra = [r.sideScroll && 'HORIZONTAL SCROLL', r.lowContrast.length && `${r.lowContrast.length} low-contrast text`, r.small.length && `${r.small.length} small touch target(s)`, errors.length && `${errors.length} JS error(s)`].filter(Boolean)
  console.log(`${name}: ${r.total - r.off.length}/${r.total} on the grid${extra.map((e) => ` · ${e}`).join('')}`)
  for (const m of r.off) console.log(`   off: ${m.block} — height ${m.height}, top ${m.top}`)
  for (const w of r.wide) console.log(`   too wide: ${w}`)
  for (const t of r.lowContrast.slice(0, 3)) console.log(`   contrast: "${t.text}" ${t.ratio}:1 (needs ${t.min}:1)`)
  for (const t of r.small.slice(0, 3)) console.log(`   small target: ${t}`)
  if (!r.total) console.log(`   nothing matched "${blocks}" — mark the blocks (data-m) or pass a selector`)
  if (!r.total || r.off.length || r.sideScroll || r.lowContrast.length || r.small.length || errors.length) failed = true
  await page.close()
}
await browser.close()
process.exit(failed ? 1 : 0)
