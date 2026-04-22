// ── CONFIG ──────────────────────────────────────────────────────────────
const PHONE = '9255499111';

// ── PRODUCTS ─────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1,  cat: 'tops',        title: 'ribbed tank',       price: '$28',  desc: 'Fitted ribbed tank in a soft stretch fabric. Great for layering or on its own.', img: '', emoji: '👕' },
  { id: 2,  cat: 'tops',        title: 'linen button-down', price: '$45',  desc: 'Relaxed linen button-down with a boxy cut. Natural and breathable.', img: '', emoji: '👔' },
  { id: 3,  cat: 'tops',        title: 'cropped knit',      price: '$38',  desc: 'Short and sweet cropped knit in a cozy medium-weight yarn.', img: '', emoji: '🧶' },
  { id: 4,  cat: 'bottoms',     title: 'wide-leg trousers', price: '$62',  desc: 'High-waisted wide-leg trousers with a clean drape. Effortlessly put-together.', img: '', emoji: '👖' },
  { id: 5,  cat: 'bottoms',     title: 'mini skirt',        price: '$34',  desc: 'A simple, flattering mini in a soft ponte fabric.', img: '', emoji: '🩱' },
  { id: 6,  cat: 'dresses',     title: 'slip dress',        price: '$55',  desc: 'Satin-finish slip dress with adjustable straps. Pairs with everything.', img: '', emoji: '👗' },
  { id: 7,  cat: 'dresses',     title: 'shirt dress',       price: '$68',  desc: 'Belted shirt dress in lightweight cotton. Wear open as a duster too.', img: '', emoji: '👗' },
  { id: 8,  cat: 'outerwear',   title: 'oversized blazer',  price: '$95',  desc: 'Classic oversized blazer with a relaxed silhouette. Throw over anything.', img: '', emoji: '🧥' },
  { id: 9,  cat: 'outerwear',   title: 'trench coat',       price: '$120', desc: 'A clean, minimalist trench with a modern fit and subtle belt.', img: '', emoji: '🧥' },
  { id: 10, cat: 'accessories', title: 'tote bag',          price: '$42',  desc: 'Sturdy canvas tote — roomy enough for everything, simple enough for everywhere.', img: '', emoji: '👜' },
  { id: 11, cat: 'accessories', title: 'leather belt',      price: '$30',  desc: 'Slim leather belt in black. The detail that ties everything together.', img: '', emoji: '👛' },
  { id: 12, cat: 'accessories', title: 'hair claw',         price: '$12',  desc: 'Oversized acetate claw clip. An everyday essential.', img: '', emoji: '🪮' },
  { id: 13, cat: 'apartment',   title: 'ceramic mug',       price: '$22',  desc: 'Hand-finished ceramic mug with a chunky handle. Holds a generous pour.', img: '', emoji: '☕' },
  { id: 14, cat: 'apartment',   title: 'linen throw',       price: '$58',  desc: 'Soft stonewashed linen throw. Looks good draped anywhere.', img: '', emoji: '🛋️' },
  { id: 15, cat: 'apartment',   title: 'glass vase',        price: '$35',  desc: 'Simple clear glass vase with a rounded base. Minimal and sculptural.', img: '', emoji: '🌸' },
];

// ── RENDER ───────────────────────────────────────────────────────────────
function renderGrid(cat) {
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const items = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);

  if (items.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');

  grid.innerHTML = items.map(p => `
    <article class="card" onclick="openModal(${p.id})">
      <div class="card-img-wrap">
        ${p.img
          ? `<img src="${p.img}" alt="${p.title}" loading="lazy" />`
          : `<div class="card-img-placeholder">${p.emoji}</div>`
        }
      </div>
      <div class="card-body">
        <p class="card-cat">${p.cat}</p>
        <p class="card-title">${p.title}</p>
        <p class="card-price">${p.price}</p>
      </div>
    </article>
  `).join('');
}

// ── FILTER ───────────────────────────────────────────────────────────────
function filterCat(btn, cat) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGrid(cat);
}

// ── MODAL ─────────────────────────────────────────────────────────────────
function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  document.getElementById('modal-cat').textContent = p.cat;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-price').textContent = p.price;
  document.getElementById('modal-desc').textContent = p.desc;

  const imgWrap = document.getElementById('modal-img').parentElement;
  if (p.img) {
    imgWrap.innerHTML = `<img id="modal-img" src="${p.img}" alt="${p.title}" />`;
  } else {
    imgWrap.innerHTML = `<div class="modal-img-placeholder" id="modal-img">${p.emoji}</div>`;
  }

  const body = encodeURIComponent(`hi sama! i'm interested in the ${p.title} (${p.price}) from sama shahp 🖤`);
  document.getElementById('modal-sms').href = `sms:${PHONE}&body=${body}`;

  document.getElementById('modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
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
});

// ── INIT ─────────────────────────────────────────────────────────────────
renderGrid('all');
