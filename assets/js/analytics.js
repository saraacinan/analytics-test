/* ============================================================
   Sara's Whimsical Shop - measurement layer
   All ecommerce pushes follow the GA4 dataLayer schema.
   Every ecommerce push is preceded by { ecommerce: null }.
   ============================================================ */

window.dataLayer = window.dataLayer || [];

/* ------------------------------------------------------------
   1. Consent (Consent Mode v2)
   The default command lives inline in each page <head> so it
   runs before any tag. This section only handles updates.
------------------------------------------------------------ */
const CONSENT_KEY = "whimsy_consent";

function gtagLocal() { dataLayer.push(arguments); }

function readConsent() {
  try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); }
  catch (e) { return null; }
}

function applyConsent(state, source) {
  const granted = state === "granted";
  gtagLocal("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied"
  });
  dataLayer.push({
    event: "consent_update",
    consent_state: state,
    consent_source: source
  });
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ state: state, ts: Date.now() }));
}

function initConsentBanner() {
  const stored = readConsent();
  if (stored) {
    // Re-assert stored choice on every page load.
    const granted = stored.state === "granted";
    gtagLocal("consent", "update", {
      ad_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied"
    });
    return;
  }
  const bar = document.createElement("div");
  bar.className = "consent-bar";
  bar.innerHTML = `
    <p>This shop uses cookies to measure what people look at. Nothing here is a real order.</p>
    <div class="consent-actions">
      <button class="btn btn-ghost" data-consent="denied">Reject</button>
      <button class="btn btn-solid" data-consent="granted">Accept</button>
    </div>`;
  document.body.appendChild(bar);
  bar.addEventListener("click", function (e) {
    const choice = e.target.getAttribute("data-consent");
    if (!choice) return;
    applyConsent(choice, "banner");
    bar.remove();
  });
}

/* ------------------------------------------------------------
   2. User session
   Hashes are computed once at login and stored, so the user
   push on page load can stay synchronous.
------------------------------------------------------------ */
const SESSION_KEY = "whimsy_session";

async function sha256(value) {
  const clean = String(value).trim().toLowerCase();
  const bytes = new TextEncoder().encode(clean);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
  catch (e) { return null; }
}

function pushUserContext() {
  const s = getSession();
  dataLayer.push({
    user: {
      user_id: s ? s.user_id : undefined,
      login_state: s ? "logged_in" : "guest",
      email_sha256: s ? s.email_sha256 : undefined,
      phone_sha256: s ? s.phone_sha256 : undefined,
      customer_lifetime_orders: s ? s.customer_lifetime_orders : 0
    }
  });
}

async function doLogin(username, password) {
  const found = DEMO_USERS.find(u => u.username === username && u.password === password);
  if (!found) {
    dataLayer.push({ event: "login_failed", method: "password", failure_reason: "invalid_credentials" });
    return null;
  }
  const session = {
    user_id: found.user_id,
    display_name: found.display_name,
    customer_lifetime_orders: found.customer_lifetime_orders,
    email_sha256: await sha256(found.email),
    phone_sha256: await sha256(found.phone)
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  pushUserContext();
  dataLayer.push({ event: "login", method: "password" });
  return session;
}

function doLogout() {
  dataLayer.push({ event: "logout", method: "password" });
  localStorage.removeItem(SESSION_KEY);
  pushUserContext();
}

function customerType() {
  const s = getSession();
  return s && s.customer_lifetime_orders > 0 ? "returning" : "new";
}

/* ------------------------------------------------------------
   3. GA4 item builder
------------------------------------------------------------ */
function buildItem(product, opts) {
  opts = opts || {};
  const item = {
    item_id: product.id,
    item_name: product.name,
    affiliation: SHOP.name,
    item_brand: SHOP.brand,
    item_category: product.category,
    item_variant: product.variant,
    price: product.price,
    quantity: opts.quantity || 1,
    /* --- custom item-scoped parameters --- */
    material: product.material,
    cord_type: product.cord_type,
    finding_metal: product.finding_metal,
    charm_count: product.charm_count,
    color_family: product.color_family,
    theme: product.theme,
    is_handmade: product.is_handmade,
    made_to_order: product.made_to_order,
    stock_status: product.stock_status
  };
  if (product.length_cm) item.length_cm = product.length_cm;
  if (typeof opts.index === "number") item.index = opts.index;
  if (opts.listId) item.item_list_id = opts.listId;
  if (opts.listName) item.item_list_name = opts.listName;
  if (opts.coupon) item.coupon = opts.coupon;
  if (opts.discount) item.discount = round2(opts.discount);
  return item;
}

function round2(n) { return Math.round(n * 100) / 100; }

function itemsValue(items) {
  return round2(items.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0));
}

/* ------------------------------------------------------------
   4. Ecommerce pushes
------------------------------------------------------------ */
function ecomPush(eventName, ecommerce, extra) {
  dataLayer.push({ ecommerce: null });
  const payload = Object.assign({ event: eventName, ecommerce: ecommerce }, extra || {});
  dataLayer.push(payload);
}

function trackViewItemList(products, listId, listName) {
  const items = products.map((p, i) => buildItem(p, { index: i, listId: listId, listName: listName }));
  ecomPush("view_item_list", {
    currency: SHOP.currency,
    item_list_id: listId,
    item_list_name: listName,
    items: items
  });
}

function trackSelectItem(product, index, listId, listName) {
  ecomPush("select_item", {
    currency: SHOP.currency,
    item_list_id: listId,
    item_list_name: listName,
    items: [buildItem(product, { index: index, listId: listId, listName: listName })]
  });
}

function trackViewItem(product, listId, listName) {
  const item = buildItem(product, { listId: listId, listName: listName });
  ecomPush("view_item", {
    currency: SHOP.currency,
    value: product.price,
    items: [item]
  });
}

function trackAddToCart(product, quantity, listId, listName) {
  const item = buildItem(product, { quantity: quantity, listId: listId, listName: listName });
  ecomPush("add_to_cart", {
    currency: SHOP.currency,
    value: round2(product.price * quantity),
    items: [item]
  });
}

function trackRemoveFromCart(product, quantity) {
  const item = buildItem(product, { quantity: quantity });
  ecomPush("remove_from_cart", {
    currency: SHOP.currency,
    value: round2(product.price * quantity),
    items: [item]
  });
}

function trackAddToWishlist(product) {
  const item = buildItem(product, { quantity: 1 });
  ecomPush("add_to_wishlist", {
    currency: SHOP.currency,
    value: product.price,
    items: [item]
  });
}

function trackViewCart(items) {
  ecomPush("view_cart", {
    currency: SHOP.currency,
    value: itemsValue(items),
    items: items
  });
}

function trackBeginCheckout(items, coupon) {
  ecomPush("begin_checkout", {
    currency: SHOP.currency,
    value: itemsValue(items),
    coupon: coupon || undefined,
    items: items
  });
}

function trackAddShippingInfo(items, coupon, tier) {
  ecomPush("add_shipping_info", {
    currency: SHOP.currency,
    value: itemsValue(items),
    coupon: coupon || undefined,
    shipping_tier: tier,
    items: items
  });
}

function trackAddPaymentInfo(items, coupon, paymentType) {
  ecomPush("add_payment_info", {
    currency: SHOP.currency,
    value: itemsValue(items),
    coupon: coupon || undefined,
    payment_type: paymentType,
    items: items
  });
}

function trackPurchase(order) {
  ecomPush("purchase", {
    transaction_id: order.transaction_id,
    value: order.value,
    tax: order.tax,
    shipping: order.shipping,
    currency: SHOP.currency,
    coupon: order.coupon || undefined,
    customer_type: order.customer_type,
    items: order.items
  });
}

function trackRefund(order, items, partial) {
  ecomPush("refund", {
    transaction_id: order.transaction_id,
    value: partial ? itemsValue(items) : order.value,
    tax: partial ? undefined : order.tax,
    shipping: partial ? undefined : order.shipping,
    currency: SHOP.currency,
    coupon: order.coupon || undefined,
    items: items
  }, { refund_type: partial ? "partial" : "full" });
}

function trackViewPromotion(promo, product) {
  ecomPush("view_promotion", {
    currency: SHOP.currency,
    creative_name: promo.creative_name,
    creative_slot: promo.creative_slot,
    promotion_id: promo.promotion_id,
    promotion_name: promo.promotion_name,
    items: product ? [buildItem(product)] : []
  });
}

function trackSelectPromotion(promo, product) {
  ecomPush("select_promotion", {
    currency: SHOP.currency,
    creative_name: promo.creative_name,
    creative_slot: promo.creative_slot,
    promotion_id: promo.promotion_id,
    promotion_name: promo.promotion_name,
    items: product ? [buildItem(product)] : []
  });
}

/* ------------------------------------------------------------
   5. Non-ecommerce events
------------------------------------------------------------ */
function trackSearch(term, resultCount) {
  dataLayer.push({
    event: "search",
    search_term: term,
    search_results_count: resultCount
  });
}

function trackFilter(filters, resultCount, listId) {
  dataLayer.push({
    event: "filter_products",
    filter_category: filters.category || "all",
    filter_material: filters.material || "all",
    filter_color: filters.color || "all",
    filter_theme: filters.theme || "all",
    filter_price_max: filters.priceMax,
    filter_count_applied: filters.appliedCount,
    filter_results_count: resultCount,
    item_list_id: listId
  });
}

function trackSort(sortBy, listId) {
  dataLayer.push({ event: "sort_products", sort_by: sortBy, item_list_id: listId });
}

function trackBlogView(post) {
  dataLayer.push({
    event: "blog_view",
    blog_slug: post.slug,
    blog_title: post.title,
    blog_category: post.category,
    blog_read_minutes: post.read_minutes,
    blog_author: post.author
  });
}

function trackCouponApplied(code, valid, discountValue) {
  dataLayer.push({
    event: valid ? "coupon_applied" : "coupon_rejected",
    coupon: code,
    discount_value: valid ? round2(discountValue) : undefined
  });
}

/* ------------------------------------------------------------
   6. Page context (runs before any other event)
------------------------------------------------------------ */
function pushPageContext(pageType, extra) {
  dataLayer.push(Object.assign({
    page_type: pageType,
    page_language: "en"
  }, extra || {}));
}
