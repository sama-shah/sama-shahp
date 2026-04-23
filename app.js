// ── CONFIG ──────────────────────────────────────────────────────────────
const PHONE = '9255499111';

const haptic = (type = 'nudge') => window.__haptic?.(type);

// ── PRODUCTS ─────────────────────────────────────────────────────────────
// cat: primary category. cats: optional array for listings that span multiple categories.
const PRODUCTS = [
  {
    id: 16, cat: 'tops', cats: ['tops', 'bottoms'],
    title: 'sunset set',
    prices: { top: '$35', skirt: '$38', set: '$65' },
    desc: 'Matching sunset print crop top + midi skirt. Buy together or separately — just mention which in your message.',
    imgs: ['outfit-board/sunset-dress.png'],
    imgFit: 'contain',
    emoji: '🌅'
  },
  { id: 1,  cat: 'tops',        title: 'ribbed tank',       price: '$28',  desc: 'Fitted ribbed tank in a soft stretch fabric. Great for layering or on its own.', img: '', emoji: '👕' },
  { id: 2,  cat: 'tops',        title: 'linen button-down', price: '$45',  desc: 'Relaxed linen button-down with a boxy cut. Natural and breathable.', img: '', emoji: '👔' },
  { id: 3,  cat: 'tops',        title: 'cropped knit',      price: '$38',  desc: 'Short and sweet cropped knit in a cozy medium-weight yarn.', img: '', emoji: '🧶' },
  { id: 4,  cat: 'bottoms',     title: 'wide-leg trousers', price: '$62',  desc: 'High-waisted wide-leg trousers with a clean drape. Effortlessly put-together.', img: '', emoji: '👖' },
  { id: 5,  cat: 'bottoms',     title: 'mini skirt',        price: '$34',  desc: 'A simple, flattering mini in a soft ponte fabric.', img: '', emoji: '🩱' },
  { id: 17, cat: 'dresses', title: 'red mini dress', price: '$45', desc: 'Fitted red mini dress with spaghetti straps. Simple, bold, and perfect for a night out.', imgs: ['outfit-board/red-dress.png'], imgFit: 'contain', emoji: '🔴' },
  { id: 6,  cat: 'dresses',     title: 'slip dress',        price: '$55',  desc: 'Satin-finish slip dress with adjustable straps. Pairs with everything.', img: '', emoji: '👗' },
  { id: 7,  cat: 'dresses',     title: 'shirt dress',       price: '$68',  desc: 'Belted shirt dress in lightweight cotton. Wear open as a duster too.', img: '', emoji: '👗' },
  { id: 8,  cat: 'outerwear',   title: 'oversized blazer',  price: '$95',  desc: 'Classic oversized blazer with a relaxed silhouette. Throw over anything.', img: '', emoji: '🧥' },
  { id: 9,  cat: 'outerwear',   title: 'trench coat',       price: '$120', desc: 'A clean, minimalist trench with a modern fit and subtle belt.', img: '', emoji: '🧥' },
  { id: 18, cat: 'accessories', title: 'pash scarf', price: '$30', desc: 'Soft oversized pashimina scarf. Drapes beautifully — wear it as a wrap, shawl, or accessory.', imgs: ['outfit-board/pash.png'], emoji: '🧣' },
  { id: 10, cat: 'accessories', title: 'tote bag',          price: '$42',  desc: 'Sturdy canvas tote — roomy enough for everything, simple enough for everywhere.', img: '', emoji: '👜' },
  { id: 11, cat: 'accessories', title: 'leather belt',      price: '$30',  desc: 'Slim leather belt in black. The detail that ties everything together.', img: '', emoji: '👛' },
  { id: 12, cat: 'accessories', title: 'hair claw',         price: '$12',  desc: 'Oversized acetate claw clip. An everyday essential.', img: '', emoji: '🪮' },
  { id: 13, cat: 'apartment',   title: 'ceramic mug',       price: '$22',  desc: 'Hand-finished ceramic mug with a chunky handle. Holds a generous pour.', img: '', emoji: '☕' },
  { id: 14, cat: 'apartment',   title: 'linen throw',       price: '$58',  desc: 'Soft stonewashed linen throw. Looks good draped anywhere.', img: '', emoji: '🛋️' },
  { id: 15, cat: 'apartment',   title: 'glass vase',        price: '$35',  desc: 'Simple clear glass vase with a rounded base. Minimal and sculptural.', img: '', emoji: '🌸' },
];

// ── HELPERS ───────────────────────────────────────────────────────────────
function getImgs(p)  { return p.imgs && p.imgs.length ? p.imgs : (p.img ? [p.img] : []); }
function getPrice(p) { return p.prices ? p.prices.set || Object.values(p.prices)[0] : p.price; }

// ── RENDER ───────────────────────────────────────────────────────────────
function renderGrid(cat) {
  const grid  = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const items = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cats ? p.cats.includes(cat) : p.cat === cat);

  if (items.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  grid.innerHTML = items.map(p => {
    const imgs = getImgs(p);
    const thumb = imgs.length
      ? `<img src="${imgs[0]}" alt="${p.title}" loading="lazy" style="${p.imgFit ? `object-fit:${p.imgFit};` : ''}" />`
      : `<div class="card-img-placeholder">${p.emoji}</div>`;
    return `
      <article class="card" ontouchstart="haptic('nudge')" onclick="openModal(${p.id})">
        <div class="card-img-wrap">${thumb}</div>
        <div class="card-body">
          <p class="card-cat">${p.cats ? p.cats.join(' · ') : p.cat}</p>
          <p class="card-title">${p.title}</p>
          <p class="card-price">${getPrice(p)}</p>
        </div>
      </article>`;
  }).join('');
}

// ── FILTER ───────────────────────────────────────────────────────────────
function filterCat(btn, cat) {
  haptic('nudge');
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGrid(cat);
}

// ── MODAL ─────────────────────────────────────────────────────────────────
let _modalImgs = [], _modalIdx = 0;

function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  _modalImgs = getImgs(p);
  _modalIdx  = 0;

  document.getElementById('modal-cat').textContent   = p.cats ? p.cats.join(' · ') : p.cat;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-desc').textContent  = p.desc;

  // price block — split or single
  const priceEl = document.getElementById('modal-price');
  if (p.prices) {
    const rows = Object.entries(p.prices).map(([k, v]) =>
      `<span class="price-row"><span class="price-label">${k}</span><span class="price-val">${v}</span></span>`
    ).join('');
    priceEl.innerHTML = rows;
  } else {
    priceEl.textContent = p.price;
  }

  renderModalImg();

  const label = p.prices ? `the ${p.title} set (${p.prices.set || getPrice(p)})` : `the ${p.title} (${p.price})`;
  const body  = encodeURIComponent(`hi sama! i'm interested in ${label} from sama shahp 🖤`);
  document.getElementById('modal-sms').href = `sms:${PHONE}&body=${body}`;

  haptic('success');
  document.getElementById('modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function renderModalImg() {
  const wrap = document.getElementById('modal-gallery');
  if (_modalImgs.length === 0) {
    wrap.innerHTML = `<div class="modal-img-placeholder">🛍️</div>`;
    return;
  }
  const dots = _modalImgs.length > 1
    ? `<div class="gallery-dots">${_modalImgs.map((_, i) =>
        `<button class="gallery-dot ${i === _modalIdx ? 'active' : ''}" onclick="goSlide(${i})"></button>`
      ).join('')}</div>`
    : '';
  const arrows = _modalImgs.length > 1
    ? `<button class="gallery-arrow left"  onclick="goSlide(${(_modalIdx - 1 + _modalImgs.length) % _modalImgs.length})">‹</button>
       <button class="gallery-arrow right" onclick="goSlide(${(_modalIdx + 1) % _modalImgs.length})">›</button>`
    : '';
  wrap.innerHTML = `
    <img src="${_modalImgs[_modalIdx]}" alt="product photo" />
    ${arrows}${dots}`;
}

function goSlide(i) {
  _modalIdx = i;
  renderModalImg();
}

function closeModal(e) {
  if (e.target === document.getElementById('modal')) closeModalBtn();
}

function closeModalBtn() {
  document.getElementById('modal').classList.add('hidden');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalBtn();
  if (e.key === 'ArrowRight' && _modalImgs.length > 1) goSlide((_modalIdx + 1) % _modalImgs.length);
  if (e.key === 'ArrowLeft'  && _modalImgs.length > 1) goSlide((_modalIdx - 1 + _modalImgs.length) % _modalImgs.length);
});

// ── INIT ─────────────────────────────────────────────────────────────────
renderGrid('all');
