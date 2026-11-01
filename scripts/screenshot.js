// Dev-only: serve ./out and screenshot pages at mobile + desktop widths.
const { chromium } = require('playwright');
const http = require('http'); const fs = require('fs'); const path = require('path');
const OUT = path.join(__dirname, '..', 'out'); const DEST = process.argv[2] || '/tmp/shots';
fs.mkdirSync(DEST, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.ico': 'image/x-icon', '.xml': 'text/xml', '.txt': 'text/plain', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(OUT, p);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) f = path.join(OUT, p + '.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end('nf ' + p); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
(async () => {
  await new Promise(r => srv.listen(4321, r));
  const browser = await chromium.launch();
  const pages = ['/', '/recipes/', '/recipes/cobb-chop/', '/chapters/'];
  for (const [name, vp] of [['mobile', { width: 390, height: 844 }], ['desktop', { width: 1366, height: 900 }]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('requestfailed', r => errs.push('REQFAIL ' + r.url()));
    for (const p of pages) {
      const resp = await page.goto('http://localhost:4321' + p, { waitUntil: 'networkidle' });
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
      await page.waitForLoadState('networkidle');
      const fn = `${name}-${p.replace(/\W+/g, '_') || 'home'}.png`;
      await page.screenshot({ path: path.join(DEST, fn), fullPage: true });
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      console.log(name, p, resp.status(), 'scrollWidth', sw, vp.width < sw ? 'OVERFLOW!' : '');
    }
    if (errs.length) console.log(name, 'errors:', errs.slice(0, 10));
    await ctx.close();
  }
  await browser.close(); srv.close();
})();
