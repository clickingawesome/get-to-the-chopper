// Renders 1200x630 social share cards into public/og/: site.jpg plus one per featured recipe.
// Run: node scripts/og.js   (re-run after adding recipes or changing the cover)
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const site = JSON.parse(fs.readFileSync(path.join(root, "data/site.json"), "utf8"));
const out = path.join(root, "public/og");
fs.mkdirSync(out, { recursive: true });

const f = (pkg, file) => "file://" + path.join(root, "node_modules/@fontsource", pkg, "files", file);
const img = (p) => "file://" + path.join(root, "public", p);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

const base = `
@font-face{font-family:Anton;src:url(${f("anton", "anton-latin-400-normal.woff2")})}
@font-face{font-family:Hand;src:url(${f("patrick-hand", "patrick-hand-latin-400-normal.woff2")})}
@font-face{font-family:Nunito;font-weight:800;src:url(${f("nunito-sans", "nunito-sans-latin-800-normal.woff2")})}
@font-face{font-family:Stencil;font-weight:700;src:url(${f("stardos-stencil", "stardos-stencil-latin-700-normal.woff2")})}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px;overflow:hidden}
body{font-family:Nunito;color:#1b1b1b;-webkit-font-smoothing:antialiased}
.anton{font-family:Anton;text-transform:uppercase;letter-spacing:.01em}
.hand{font-family:Hand}
.stencil{font-family:Stencil;font-weight:700;text-transform:uppercase;letter-spacing:.12em}
`;

const siteCard = () => `<!doctype html><html><head><style>${base}
body{background:#e8732a;position:relative}
.dots{position:absolute;inset:0;background-image:radial-gradient(rgba(27,27,27,.10) 2px,transparent 2.5px);background-size:22px 22px}
.left{position:absolute;left:72px;top:64px;width:600px}
.eyebrow{font-size:24px;color:rgba(27,27,27,.8)}
h1{font-size:132px;line-height:.86;margin-top:18px}
h1 span{color:#f6f1e7;-webkit-text-stroke:3px #1b1b1b;paint-order:stroke fill;text-shadow:6px 6px 0 #c8321f}
.tag{font-size:40px;line-height:1.1;margin-top:26px;max-width:540px}
.buy{position:absolute;left:72px;bottom:58px;display:flex;gap:18px;align-items:center}
.badge{background:#c8321f;color:#f6f1e7;border:3px solid #1b1b1b;box-shadow:5px 5px 0 #1b1b1b;padding:14px 20px;font-size:22px;text-transform:uppercase;letter-spacing:.12em}
.url{font-size:24px}
.cover{position:absolute;right:66px;top:58px;width:392px;transform:rotate(3deg);border:4px solid #1b1b1b;background:#fff;padding:8px;box-shadow:12px 12px 0 #1b1b1b}
.cover img{display:block;width:100%}
</style></head><body><div class="dots"></div>
<div class="left">
  <p class="stencil eyebrow">A cookbook by Nick Irmo</p>
  <h1 class="anton">Get to the <span>Chopper</span></h1>
  <p class="hand tag">115+ no-cook recipes. Knife, board, bowl. Zero cooking.</p>
</div>
<div class="buy"><span class="badge">Available on Amazon</span><span class="url">choppedrecipes.com</span></div>
<div class="cover"><img src="${img("img/cover.jpg")}"></div>
</body></html>`;

const recipeCard = (r, ch) => `<!doctype html><html><head><style>${base}
body{background:#f6f1e7;display:flex}
.photo{width:600px;height:630px;position:relative;border-right:4px solid #1b1b1b}
.photo img{width:100%;height:100%;object-fit:cover;display:block}
.chip{position:absolute;left:0;top:40px;background:${ch.color};color:#f6f1e7;padding:12px 22px;font-size:24px;letter-spacing:.14em;text-transform:uppercase}
.side{flex:1;padding:56px 56px 48px;display:flex;flex-direction:column;position:relative}
.chname{font-size:22px;color:${ch.color}}
h1{text-wrap:balance;font-size:${r.title.length > 26 ? 66 : r.title.length > 16 ? 78 : 92}px;line-height:.95;margin-top:16px}
.tag{font-size:34px;line-height:1.15;margin-top:22px;color:#4a4640;text-wrap:balance}
.foot{margin-top:auto;display:flex;align-items:center;gap:14px;border-top:3px solid #1b1b1b;padding-top:22px}
.foot img{width:54px;height:54px;border:3px solid #1b1b1b;background:#fff}
.foot b{font-family:Anton;font-weight:400;font-size:30px;text-transform:uppercase;display:block;line-height:1}
.foot span{font-size:19px;color:#4a4640}
.nocook{position:absolute;right:28px;bottom:28px;border:3px solid #f6f1e7;width:104px;height:104px;border-radius:50%;background:#1b1b1b;color:#f6f1e7;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;transform:rotate(8deg);font-size:15px;letter-spacing:.08em;line-height:1.15}
.nocook strong{font-family:Anton;font-weight:400;font-size:30px;color:#e8732a;letter-spacing:0}
</style></head><body>
<div class="photo"><img src="${img("img/r-" + r.slug + ".jpg")}"><span class="chip">Ch. ${ch.number} · ${esc(r.time)}</span><div class="nocook stencil"><strong>0</strong>burners</div></div>
<div class="side">
  <p class="stencil chname">${esc(ch.title)}</p>
  <h1 class="anton">${esc(r.title)}</h1>
  <p class="hand tag">${esc(r.tagline)}</p>
  <div class="foot"><img src="${img("icon.png")}"><div><b>Get to the Chopper</b><span>115+ no-cook recipes · choppedrecipes.com</span></div></div>
</div>
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  const shoot = async (html, name) => {
    const tmp = path.join(out, ".tmp.html");
    fs.writeFileSync(tmp, html);
    await page.goto("file://" + tmp);
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))); });
    await page.screenshot({ path: path.join(out, name), type: "jpeg", quality: 86 });
    fs.unlinkSync(tmp);
  };
  await shoot(siteCard(), "site.jpg");
  for (const r of site.recipes) {
    const ch = site.chapters.find((c) => c.number === r.chapter);
    await shoot(recipeCard(r, ch), r.slug + ".jpg");
  }
  await browser.close();
  console.log("wrote", 1 + site.recipes.length, "cards to public/og");
})();
