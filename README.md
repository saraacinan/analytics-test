# Sara's Whimsical Shop

A practice storefront for analytics work. Static HTML, no build step, no backend.

## Structure

```
index.html                 home, promo banner + featured list
category.html              listing with filters, sort, search results
product.html               product detail + related list
cart.html                  bag, coupon, summary
checkout.html              shipping tier, payment type, place order
order-confirmation.html    receipt
account.html               login, favourites, orders, returns
blog.html / blog-post.html journal
assets/js/data.js          catalog, blog posts, demo accounts, coupons
assets/js/analytics.js     consent, session, hashing, GA4 dataLayer pushes
assets/js/app.js           cart, wishlist, orders, header/footer, cards
assets/css/style.css       theme
images/products/           product photos
```

## Where the GTM snippet goes

Every page has this line in `<head>`:

```html
<!-- Google Tag Manager container snippet goes here -->
```

Replace it with the container snippet. It sits after the Consent Mode default
command and before `data.js`, which is the correct order.

## Demo accounts

`sara / demo1234` and `guest2 / demo1234`. No real personal data is collected.
Email and phone are fixed placeholder values in `data.js`; only their SHA-256
hashes are pushed to the data layer.

## Coupons

`WHIMSY10` (10% off) and `BOWFRIEND` ($5 off).

## Events

Ecommerce: view_promotion, select_promotion, view_item_list, select_item,
view_item, add_to_cart, remove_from_cart, add_to_wishlist, remove_from_wishlist,
view_cart, begin_checkout, add_shipping_info, add_payment_info, purchase, refund.

Other: search, filter_products, filters_cleared, sort_products, login,
login_failed, logout, consent_update, coupon_applied, coupon_rejected,
blog_view, select_post, scroll_depth.

Every ecommerce push is preceded by `dataLayer.push({ ecommerce: null })`.
