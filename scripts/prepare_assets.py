#!/usr/bin/env python3
"""Resize/compress book images into public/img and build data/site.json.
Run from anywhere: python3 scripts/prepare_assets.py
Source: /home/claude/book (data/*.json, img/*.jpg)
"""
import json, os, re, sys
from PIL import Image, ImageFile, ImageOps
ImageFile.LOAD_TRUNCATED_IMAGES = True

BOOK = os.environ.get('BOOK_DIR', '/home/claude/book')
SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(SITE, 'public', 'img')
os.makedirs(OUT, exist_ok=True)

CHAPTER_COLORS = {1:'#C8321F',2:'#1F6F5C',3:'#2F5D8A',4:'#B7791F',5:'#8A2E2E',6:'#5A4A8A',7:'#55602C',8:'#D8342A',9:'#8A5A12',10:'#C97AA2'}
CHAPTER_LINES = {
 1:"Every sub, club and BLT you love, run through the knife so every bite gets everything.",
 2:"The salads everyone knows, chopped the way they should have been all along.",
 3:"Tuna, chicken, egg and their friends. The deli counter, minus the line.",
 4:"Salads, salsas and bowls from everywhere, built with a board and a bowl.",
 5:"Steak, chicken and shrimp arrive cooked. You do the rest.",
 6:"Pasta, noodles and rice, already cooked, ready for the chop.",
 7:"Crunchy, sour and quick. The sides that make the sandwich.",
 8:"Spoon it on, scoop it up, or eat it off the board.",
 9:"Fourteen dressings and six sauces. The whole flavor system in one chapter.",
 10:"Fruit, a knife, and something sweet to finish.",
}
FEATURED = {
 1:['italian-chopped-sub','chopped-blt','banh-mi-chop','turkey-club-chop'],
 2:['the-chopper','cobb-chop','steakhouse-chop','southwest-chop'],
 3:['classic-chicken-salad','egg-salad','shrimp-louie-chop','italian-tuna-and-white-bean-salad'],
 4:['pico-de-gallo-and-chunky-guacamole','cowboy-caviar','cucumber-wrapped-sushi-rolls','street-corn-chop','fattoush'],
 5:['steak-mexican-bowl','chicken-fajita-chop-bowl','shrimp-taco-chop'],
 6:['italian-deli-pasta-salad','california-roll-bowl','hand-roll-night'],
 7:['creamy-coleslaw','broccoli-crunch-salad','marinated-tomatoes','bowl-pickles'],
 8:[], 9:[],
 10:['watermelon-feta-and-mint','fruit-chop-with-lime-honey-and-chili','apple-nachos'],
}
HOME_FEATURED = ['italian-chopped-sub','the-chopper','cobb-chop','steak-mexican-bowl','cowboy-caviar','shrimp-taco-chop','watermelon-feta-and-mint','classic-chicken-salad','cucumber-wrapped-sushi-rolls']
STILLS = ['still-13','still-08','still-18','still-19','still-04','still-09']

def save(im, name, max_side, q=78):
    im = ImageOps.exif_transpose(im).convert('RGB')
    im.thumbnail((max_side, max_side), Image.LANCZOS)
    p = os.path.join(OUT, name)
    im.save(p, 'JPEG', quality=q, optimize=True, progressive=True)
    return im.size

def hero(ch, slug):
    src = os.path.join(BOOK, 'img', f'hero-ch{ch:02d}-{slug}.jpg')
    im = Image.open(src); im.load()
    save(im, f'r-{slug}.jpg', 1200)
    # square-ish thumb, centre crop 4:5 -> 1:1 keeps the bowl
    w, h = im.size; s = min(w, h)
    sq = im.crop(((w-s)//2, (h-s)//2 + int(s*0.05), (w-s)//2 + s, (h-s)//2 + s + int(s*0.05)))
    save(sq, f't-{slug}.jpg', 480)

# cover: cover-01 with the placeholder text lines patched out using a plain patch from below
cov = Image.open(os.path.join(BOOK, 'img', 'cover-01.jpg')); cov.load()
from PIL import ImageFilter
reg = cov.crop((0, 0, 900, 480)).filter(ImageFilter.MedianFilter(41)).filter(ImageFilter.GaussianBlur(6))
cov.paste(reg, (0, 0))
save(cov, 'cover.jpg', 1200, 80)

# mascot + favicon
heli = Image.open(os.path.join(BOOK, 'img', 'cast-helicopter-alt.jpg')); heli.load()
save(heli, 'helicopter.jpg', 900)
w, h = heli.size
fav = heli.crop((0, int(h*0.12), w, int(h*0.12)+w))
fav.thumbnail((512, 512), Image.LANCZOS)
fav.save(os.path.join(SITE, 'public', 'icon.png'), 'PNG')
fav.resize((180,180), Image.LANCZOS).save(os.path.join(SITE, 'public', 'apple-icon.png'), 'PNG')
fav.resize((48,48), Image.LANCZOS).save(os.path.join(SITE, 'public', 'favicon.ico'), format='ICO', sizes=[(48,48),(32,32),(16,16)])

# pattern + spot
for n in ['spot-22', 'spot-01']:
    im = Image.open(os.path.join(BOOK, 'img', n + '.jpg')); im.load(); save(im, n + '.jpg', 1000, 72)

for i in range(1, 11):
    im = Image.open(os.path.join(BOOK, 'img', f'opener-ch{i:02d}.jpg')); im.load()
    save(im, f'opener-{i:02d}.jpg', 900, 74)
for s in STILLS:
    im = Image.open(os.path.join(BOOK, 'img', s + '.jpg')); im.load(); save(im, s + '.jpg', 1100, 74)

NOTE_RE = re.compile(r'(^\s*(\[(PHOTO|DESIGN NOTE|DIAGRAM|ILLUSTRATION|NOTE|ART)|First draft|Before publishing|Drafting note|Editorial))|compact format', re.I)
def clean(s):
    return None if (not s or NOTE_RE.search(s)) else s

chapters = []
recipes = []
for i in range(1, 11):
    d = json.load(open(os.path.join(BOOK, 'data', f'ch{i:02d}.json')))
    titles = []
    for r in d['recipes']:
        titles.append({'slug': r['slug'], 'title': r['title'], 'featured': r['slug'] in FEATURED[i]})
        if r['slug'] in FEATURED[i]:
            assert r.get('gist') and r.get('time'), r['slug']
            hero(i, r['slug'])
            recipes.append({
                'slug': r['slug'], 'title': r['title'], 'chapter': i,
                'tagline': r.get('tagline', ''), 'time': r.get('time', ''), 'serves': r.get('serves', ''),
                'level': r.get('level', ''), 'tools': r.get('tools', ''), 'protein': bool(r.get('protein')),
                'heat': r.get('heat', 0), 'gist': r['gist'], 'move_title': r.get('move_title', ''), 'move': r.get('move', ''),
                'lineup': r.get('lineup', []), 'steps': r.get('steps', []),
                'extras': [e for e in r.get('extras', []) if len(e) == 2 and clean(e[1])],
            })
    chapters.append({
        'number': i, 'title': d['title'], 'line': CHAPTER_LINES[i], 'color': CHAPTER_COLORS[i],
        'intro': [p for p in d.get('intro', []) if clean(p)], 'count': len(d['recipes']), 'recipes': titles,
    })
# order recipes by FEATURED list order
order = {s: k for k, s in enumerate([s for i in range(1, 11) for s in FEATURED[i]])}
recipes.sort(key=lambda r: order[r['slug']])

json.dump({'chapters': chapters, 'recipes': recipes, 'home': HOME_FEATURED, 'stills': STILLS},
          open(os.path.join(SITE, 'data', 'site.json'), 'w'), indent=1)
total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
print('recipes', len(recipes), 'chapters', len(chapters), 'img MB', round(total/1e6, 1))
