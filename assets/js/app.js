/* ============================================================
   Sara's Whimsical Shop - store logic and shared UI
   ============================================================ */

const CART_KEY = "whimsy_cart";
const WISH_KEY = "whimsy_wishlist";
const ORDERS_KEY = "whimsy_orders";

/* ---------------- storage helpers ---------------- */
function readJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch (e) { return fallback; }
}
function writeJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

function getCart()      { return readJSON(CART_KEY, []); }
function setCart(c)     { writeJSON(CART_KEY, c); updateBadges(); }
function getWishlist()  { return readJSON(WISH_KEY, []); }
function setWishlist(w) { writeJSON(WISH_KEY, w); updateBadges(); }
function getOrders()    { return readJSON(ORDERS_KEY, []); }
function setOrders(o)   { writeJSON(ORDERS_KEY, o); }

function productById(id) { return PRODUCTS.find(p => p.id === id); }
function money(n) { return "$" + Number(n).toFixed(2); }
function qs(name) { return new URLSearchParams(location.search).get(name); }

function cartCount() { return getCart().reduce((n, l) => n + l.quantity, 0); }

function cartItems(opts) {
  return getCart().map(line => buildItem(productById(line.id), Object.assign({ quantity: line.quantity }, opts || {})));
}

function cartSubtotal() {
  return round2(getCart().reduce((s, l) => s + productById(l.id).price * l.quantity, 0));
}

/* ---------------- cart actions ---------------- */
function addToCart(id, quantity, listId, listName) {
  const product = productById(id);
  if (product.stock_status === "out_of_stock") { toast("Sold out for now"); return; }
  quantity = quantity || 1;
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  if (line) line.quantity += quantity; else cart.push({ id: id, quantity: quantity });
  setCart(cart);
  trackAddToCart(product, quantity, listId, listName);
  toast(product.name + " added to bag");
}

function removeFromCart(id, quantity) {
  const product = productById(id);
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  if (!line) return;
  const removed = quantity || line.quantity;
  line.quantity -= removed;
  const next = cart.filter(l => l.quantity > 0);
  setCart(next);
  trackRemoveFromCart(product, removed);
}

function toggleWishlist(id) {
  const product = productById(id);
  const wish = getWishlist();
  const i = wish.indexOf(id);
  if (i === -1) {
    wish.push(id);
    setWishlist(wish);
    trackAddToWishlist(product);
    toast("Saved to favourites");
  } else {
    wish.splice(i, 1);
    setWishlist(wish);
    dataLayer.push({ event: "remove_from_wishlist", item_id: id, item_name: product.name });
    toast("Removed from favourites");
  }
  document.querySelectorAll('[data-wish="' + id + '"]').forEach(function (b) {
    b.classList.toggle("is-on", getWishlist().indexOf(id) !== -1);
  });
}

/* ---------------- toast ---------------- */
function toast(message) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("is-shown");
  clearTimeout(el._t);
  el._t = setTimeout(function () { el.classList.remove("is-shown"); }, 2200);
}

/* ---------------- header / footer ---------------- */
function renderChrome() {
  const session = getSession();
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="header-inner">
      <a class="wordmark" href="index.html">Sara&rsquo;s <em>Whimsical</em> Shop</a>

      <nav class="main-nav" aria-label="Categories">
        ${CATEGORIES.map(c => `<a href="category.html?category=${c.slug}">${c.name}</a>`).join("")}
        <a href="blog.html">Journal</a>
      </nav>

      <div class="header-tools">
        <div class="search-box">
          <input type="search" id="site-search" placeholder="Search beads, bows, charms" aria-label="Search products">
          <button class="search-go" id="site-search-go" aria-label="Search">Go</button>
        </div>
        <a class="tool-link" href="account.html">${session ? session.display_name : "Sign in"}</a>
        <a class="tool-link" href="account.html#favourites">Saved <span class="badge" id="wish-badge">0</span></a>
        <a class="tool-link tool-cart" href="cart.html">Bag <span class="badge" id="cart-badge">0</span></a>
      </div>
    </div>`;
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-inner">
      <div>
        <p class="footer-mark">Sara&rsquo;s Whimsical Shop</p>
        <p class="muted">Handmade beadwork, bows and bag charms. Small batches, made in Istanbul.</p>
      </div>
      <div>
        <p class="footer-head">Shop</p>
        ${CATEGORIES.map(c => `<a href="category.html?category=${c.slug}">${c.name}</a>`).join("")}
      </div>
      <div>
        <p class="footer-head">More</p>
        <a href="blog.html">Journal</a>
        <a href="account.html">Your account</a>
        <a href="account.html#orders">Orders and returns</a>
      </div>
      <div>
        <p class="footer-head">Demo notice</p>
        <p class="muted">This is a practice storefront built for analytics testing. No payment is taken and no personal data is stored.</p>
      </div>
    </div>`;
  document.body.appendChild(footer);

  const input = document.getElementById("site-search");
  const go = document.getElementById("site-search-go");
  function submitSearch() {
    const term = input.value.trim();
    if (!term) return;
    location.href = "category.html?q=" + encodeURIComponent(term);
  }
  go.addEventListener("click", submitSearch);
  input.addEventListener("keydown", function (e) { if (e.key === "Enter") submitSearch(); });

  updateBadges();
}

function updateBadges() {
  const c = document.getElementById("cart-badge");
  const w = document.getElementById("wish-badge");
  if (c) c.textContent = cartCount();
  if (w) w.textContent = getWishlist().length;
}

/* ---------------- product card ---------------- */
function productCard(product, index, listId, listName) {
  const saved = getWishlist().indexOf(product.id) !== -1;
  const soldOut = product.stock_status === "out_of_stock";
  const low = product.stock_status === "low_stock";
  return `
  <article class="card${soldOut ? " is-soldout" : ""}">
    <a class="card-media" href="product.html?id=${product.id}&list=${encodeURIComponent(listId)}&index=${index}"
       data-select="${product.id}" data-index="${index}">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      ${soldOut ? '<span class="sticker sticker-out">sold out</span>' : ""}
      ${low && !soldOut ? '<span class="sticker sticker-low">last few</span>' : ""}
      ${product.made_to_order && !soldOut ? '<span class="sticker sticker-mto">made to order</span>' : ""}
    </a>
    <div class="card-body">
      <p class="card-meta">${product.theme} &middot; ${product.material}</p>
      <h3 class="card-title">
        <a href="product.html?id=${product.id}&list=${encodeURIComponent(listId)}&index=${index}"
           data-select="${product.id}" data-index="${index}">${product.name}</a>
      </h3>
      <p class="card-blurb">${product.blurb}</p>
      <div class="card-foot">
        <span class="price">${money(product.price)}</span>
        <div class="card-actions">
          <button class="icon-btn${saved ? " is-on" : ""}" data-wish="${product.id}" aria-label="Save ${product.name}">&#9825;</button>
          <button class="btn btn-solid btn-sm" data-add="${product.id}" ${soldOut ? "disabled" : ""}>
            ${soldOut ? "Sold out" : "Add to bag"}
          </button>
        </div>
      </div>
    </div>
  </article>`;
}

function wireCardEvents(scope, listId, listName) {
  scope.addEventListener("click", function (e) {
    const add = e.target.closest("[data-add]");
    if (add) { addToCart(add.getAttribute("data-add"), 1, listId, listName); return; }

    const wish = e.target.closest("[data-wish]");
    if (wish) { toggleWishlist(wish.getAttribute("data-wish")); return; }

    const select = e.target.closest("[data-select]");
    if (select) {
      const id = select.getAttribute("data-select");
      const index = parseInt(select.getAttribute("data-index"), 10);
      trackSelectItem(productById(id), index, listId, listName);
    }
  });
}

/* ---------------- boot ---------------- */
function boot(pageType, extra) {
  pushUserContext();
  pushPageContext(pageType, extra);
  document.addEventListener("DOMContentLoaded", function () {
    renderChrome();
    initConsentBanner();
  });
}
