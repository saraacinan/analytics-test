/* ============================================================
   Sara's Whimsical Shop - catalog & static data
   ============================================================ */

const SHOP = {
  name: "Sara's Whimsical Shop",
  brand: "Whimsical Studio",
  currency: "USD",
  taxRate: 0.08,
  shippingFlat: 4.90
};

const CATEGORIES = [
  { slug: "bag-charms", name: "Bag Charms" },
  { slug: "bracelets",  name: "Bracelets" },
  { slug: "keychains",  name: "Keychains" },
  { slug: "necklaces",  name: "Necklaces" }
];

const PRODUCTS = [
  /* ---------- Bag Charms ---------- */
  {
    id: "BC-01", name: "Meadow Picnic Bag Charm",
    category: "Bag Charms", categorySlug: "bag-charms",
    price: 26, image: "images/products/bag-charm-01.jpg", variant: "Green / Pink",
    material: "stone chip", cord_type: "chain", finding_metal: "gold plated",
    charm_count: 6, length_cm: 14, color_family: "green", theme: "cottagecore",
    is_handmade: true, made_to_order: false, stock_status: "in_stock",
    blurb: "Rose quartz chips, a tiny ceramic mug and a hand-painted flower tag.",
    description: "Six charms on a gold plated chain: raw rose quartz and unakite chips, a miniature ceramic mug, a painted flower tag and two glass drops. Clips to a bag strap with a swivel clasp."
  },
  {
    id: "BC-02", name: "Blossom Suede Bag Charm",
    category: "Bag Charms", categorySlug: "bag-charms",
    price: 18, image: "images/products/bag-charm-02.jpg", variant: "Lilac",
    material: "ceramic", cord_type: "suede cord", finding_metal: "silver plated",
    charm_count: 3, length_cm: 12, color_family: "pink", theme: "coquette",
    is_handmade: true, made_to_order: true, stock_status: "low_stock",
    blurb: "One hand-glazed blossom on rose suede cord.",
    description: "A single hand-shaped ceramic blossom glazed in lilac and butter yellow, strung on rose suede cord with two painted barrel beads. Made to order, so the glaze pattern is never quite the same twice."
  },
  {
    id: "BC-03", name: "Moonlit Ceramic Bag Charm",
    category: "Bag Charms", categorySlug: "bag-charms",
    price: 22, image: "images/products/bag-charm-03.jpg", variant: "Pastel",
    material: "ceramic", cord_type: "suede cord", finding_metal: "gunmetal",
    charm_count: 5, length_cm: 15, color_family: "pastel", theme: "fairycore",
    is_handmade: true, made_to_order: false, stock_status: "in_stock",
    blurb: "Stacked ceramic beads under a crochet lace tassel.",
    description: "Four hand-painted ceramic beads stacked under a pearl crescent moon, finished with a vintage crochet lace tassel and pink suede ties."
  },
  {
    id: "BC-04", name: "Sakura Clock Bag Charm",
    category: "Bag Charms", categorySlug: "bag-charms",
    price: 24, image: "images/products/bag-charm-04.jpg", variant: "Pink / Gold",
    material: "enamel", cord_type: "chain", finding_metal: "gold plated",
    charm_count: 3, length_cm: 11, color_family: "pink", theme: "coquette",
    is_handmade: true, made_to_order: false, stock_status: "in_stock",
    blurb: "Two enamel blossoms and a working miniature clock face.",
    description: "Pink enamel sakura blossoms flank a working miniature clock face on a gold plated chain. The clasp is a wide swivel hook, so it sits flat against a bag."
  },

  /* ---------- Bracelets ---------- */
  {
    id: "BR-01", name: "Strawberry Sugar Bracelet",
    category: "Bracelets", categorySlug: "bracelets",
    price: 22, image: "images/products/bracelet-01.jpg", variant: "Pink",
    material: "acrylic", cord_type: "chain", finding_metal: "silver plated",
    charm_count: 4, length_cm: 18, color_family: "pink", theme: "y2k",
    is_handmade: true, made_to_order: false, stock_status: "in_stock",
    blurb: "Strawberry, bow, angel wing and a pearl heart on wire-wrapped links.",
    description: "Every bead is wire-wrapped by hand into its own link, so the bracelet drapes instead of stretching. Crackle glass, glass pearls and four acrylic charms. Adjustable from 16 to 19 cm."
  },
  {
    id: "BR-02", name: "Violet Butterfly Bracelet",
    category: "Bracelets", categorySlug: "bracelets",
    price: 20, image: "images/products/bracelet-02.jpg", variant: "Purple",
    material: "glass", cord_type: "chain", finding_metal: "silver plated",
    charm_count: 3, length_cm: 18, color_family: "purple", theme: "y2k",
    is_handmade: true, made_to_order: false, stock_status: "in_stock",
    blurb: "An iridescent butterfly between amethyst glass and pearl hearts.",
    description: "Amethyst and frosted lilac glass rounds alternate with glass pearl hearts and open heart connectors. The iridescent butterfly sits off-centre so it lands on the outside of the wrist."
  },
  {
    id: "BR-03", name: "Lily Garden Beaded Bracelet",
    category: "Bracelets", categorySlug: "bracelets",
    price: 34, image: "images/products/bracelet-03.jpg", variant: "Pink / Green",
    material: "seed bead", cord_type: "beadwork", finding_metal: "stainless steel",
    charm_count: 1, length_cm: 20, color_family: "pink", theme: "fairycore",
    is_handmade: true, made_to_order: true, stock_status: "low_stock",
    blurb: "A French-beaded lily on a strand of pearls and glass drops.",
    description: "The lily is built petal by petal in the French beading technique, roughly four hours of work, then set on a strand of freshwater pearls, quartz chips and glass leaves. Worn long on the wrist or doubled as a choker."
  },

  /* ---------- Keychains ---------- */
  {
    id: "KC-01", name: "Initials Bow Keyring",
    category: "Keychains", categorySlug: "keychains",
    price: 16, image: "images/products/keychain-01.jpg", variant: "Hot Pink",
    material: "paracord", cord_type: "paracord", finding_metal: "silver plated",
    charm_count: 4, length_cm: 13, color_family: "pink", theme: "y2k",
    is_handmade: true, made_to_order: true, stock_status: "in_stock",
    blurb: "Your letters in alphabet beads on a knotted paracord bow.",
    description: "A hand-knotted paracord bow with two beaded tails. Pick up to four alphabet beads and they are strung to order alongside star beads, a heart and a tiny peach charm."
  },
  {
    id: "KC-02", name: "Cherry Blossom Bow Keyring",
    category: "Keychains", categorySlug: "keychains",
    price: 18, image: "images/products/keychain-02.jpg", variant: "Baby Pink",
    material: "paracord", cord_type: "paracord", finding_metal: "silver plated",
    charm_count: 6, length_cm: 14, color_family: "pink", theme: "coquette",
    is_handmade: true, made_to_order: false, stock_status: "in_stock",
    blurb: "Flower beads and a cherry charm on soft pink cord.",
    description: "Baby pink paracord knotted into a double bow, with acrylic flower beads, a glass cherry and a faceted heart hanging from the tails. Pink powder-coated ring."
  },
  {
    id: "KC-03", name: "Photocard Bow Keyring Pink",
    category: "Keychains", categorySlug: "keychains",
    price: 20, image: "images/products/keychain-03.jpg", variant: "Pink",
    material: "acrylic", cord_type: "paracord", finding_metal: "silver plated",
    charm_count: 5, length_cm: 16, color_family: "pink", theme: "kpop",
    is_handmade: true, made_to_order: true, stock_status: "in_stock",
    blurb: "Holds a photocard, with a heart carabiner and butterfly charms.",
    description: "A knotted pink bow with a heart-shaped carabiner and a clear acrylic photocard holder. The side strand carries bow beads, a bunny and a frosted butterfly. Send your card size at checkout."
  },
  {
    id: "KC-04", name: "Photocard Bow Keyring Noir",
    category: "Keychains", categorySlug: "keychains",
    price: 20, image: "images/products/keychain-04.jpg", variant: "Black",
    material: "acrylic", cord_type: "paracord", finding_metal: "silver plated",
    charm_count: 5, length_cm: 16, color_family: "black", theme: "grunge",
    is_handmade: true, made_to_order: true, stock_status: "in_stock",
    blurb: "The same build in black cord with sharp silver stars.",
    description: "Black paracord, a ball chain drop and pointed silver stars around a clear photocard holder. The quiet one in the collection, for people who do not want pink on their bag."
  },
  {
    id: "KC-05", name: "STAY Letter Bead Keyring",
    category: "Keychains", categorySlug: "keychains",
    price: 14, image: "images/products/keychain-05.jpg", variant: "Clear / Pink",
    material: "acrylic", cord_type: "wire", finding_metal: "silver plated",
    charm_count: 2, length_cm: 12, color_family: "pink", theme: "y2k",
    is_handmade: true, made_to_order: true, stock_status: "in_stock",
    blurb: "A word of your choice down a double strand of clear beads.",
    description: "Two strands of clear and pink crackle beads run down to an acrylic bow, with alphabet beads spelling a short word. Butterfly bead at the clasp. Up to five letters."
  },
  {
    id: "KC-06", name: "Crystal Bow Charm",
    category: "Keychains", categorySlug: "keychains",
    price: 28, image: "images/products/keychain-06.jpg", variant: "Rose",
    material: "crystal", cord_type: "memory wire", finding_metal: "silver plated",
    charm_count: 1, length_cm: 17, color_family: "pink", theme: "coquette",
    is_handmade: true, made_to_order: false, stock_status: "out_of_stock",
    blurb: "Faceted crystal loops with long beaded ribbon tails.",
    description: "Around six hundred faceted crystal and seed beads shaped into a bow with eight falling tails. The loops hold their shape on memory wire. Sold out for now, restocked in small batches."
  },

  /* ---------- Necklaces ---------- */
  {
    id: "NL-01", name: "Wild Lily Lariat Necklace",
    category: "Necklaces", categorySlug: "necklaces",
    price: 46, image: "images/products/necklace-01.jpg", variant: "Olive / Bronze",
    material: "seed bead", cord_type: "beadwork", finding_metal: "stainless steel",
    charm_count: 1, length_cm: 60, color_family: "green", theme: "boho",
    is_handmade: true, made_to_order: true, stock_status: "in_stock",
    blurb: "An olive French-beaded lily on a wrapping bronze lariat.",
    description: "A five-petal lily beaded in olive and bronze, set on a triple strand lariat that wraps at the throat and falls open down the front. No clasp, it ties. Roughly six hours of beading."
  },
  {
    id: "NL-02", name: "Shell Lily Choker",
    category: "Necklaces", categorySlug: "necklaces",
    price: 42, image: "images/products/necklace-02.jpg", variant: "Pink / Green",
    material: "shell", cord_type: "beadwork", finding_metal: "stainless steel",
    charm_count: 1, length_cm: 38, color_family: "pink", theme: "mermaidcore",
    is_handmade: true, made_to_order: true, stock_status: "in_stock",
    blurb: "A beaded lily and two cowrie shells on a green choker.",
    description: "Pink and silver-lined seed beads worked into a lily, with black accents at the petal tips, on a triple strand of chartreuse beads. Two real cowrie shells finish the falling tails."
  },
  {
    id: "NL-03", name: "Pearl Heart Bow Necklace",
    category: "Necklaces", categorySlug: "necklaces",
    price: 32, image: "images/products/necklace-03.jpg", variant: "Pink",
    material: "acrylic", cord_type: "chain", finding_metal: "silver plated",
    charm_count: 2, length_cm: 45, color_family: "pink", theme: "y2k",
    is_handmade: true, made_to_order: false, stock_status: "in_stock",
    blurb: "A big pink heart under a bow, on hand-linked pearls.",
    description: "Glass pearls in three pinks, each wire-wrapped into its own link, holding a transparent acrylic bow and a faceted heart drop. Lobster clasp with a 5 cm extender."
  },
  {
    id: "NL-04", name: "Crystal Heart Choker",
    category: "Necklaces", categorySlug: "necklaces",
    price: 52, image: "images/products/necklace-04.jpg", variant: "Rose",
    material: "crystal", cord_type: "chain", finding_metal: "silver plated",
    charm_count: 20, length_cm: 36, color_family: "pink", theme: "y2k",
    is_handmade: true, made_to_order: false, stock_status: "low_stock",
    blurb: "Twenty drops of glass and quartz around one heavy heart.",
    description: "A two-tier choker: the top row carries stars, teardrops and rose quartz, the swag below gathers into a heavy transparent heart. Every drop is individually wrapped, about five hours of work."
  },
  {
    id: "NL-05", name: "Pearl Bow Star Choker",
    category: "Necklaces", categorySlug: "necklaces",
    price: 58, image: "images/products/necklace-05.jpg", variant: "Ivory",
    material: "freshwater pearl", cord_type: "chain", finding_metal: "stainless steel",
    charm_count: 8, length_cm: 38, color_family: "white", theme: "coquette",
    is_handmade: true, made_to_order: true, stock_status: "in_stock",
    blurb: "Freshwater pearls looped into a bow with a silver star drop.",
    description: "Real freshwater pearls threaded into two looping bow shapes over a draped chain, with mother of pearl stars and a four-pointed star pendant. The most involved piece in the shop."
  }
];

/* ---------- Promotions ---------- */
const PROMOTIONS = [
  {
    promotion_id: "P_SPRING26",
    promotion_name: "Spring Restock",
    creative_name: "hero_banner_spring",
    creative_slot: "homepage_hero",
    headline: "Spring restock is live",
    sub: "New beaded lilies and three colours of paracord bow. Handmade in small batches.",
    cta: "See what is new",
    href: "category.html?category=necklaces&list=hero_promo",
    itemId: "NL-02"
  }
];

/* ---------- Coupons ---------- */
const COUPONS = {
  "WHIMSY10": { type: "percent", amount: 10, label: "WHIMSY10" },
  "BOWFRIEND": { type: "fixed", amount: 5, label: "BOWFRIEND" }
};

/* ---------- Demo accounts (no real personal data) ---------- */
const DEMO_USERS = [
  {
    username: "sara",
    password: "demo1234",
    user_id: "U_100241",
    display_name: "Sara",
    email: "sara.demo@example.com",
    phone: "+15550000241",
    customer_lifetime_orders: 3
  },
  {
    username: "guest2",
    password: "demo1234",
    user_id: "U_100518",
    display_name: "Ada",
    email: "ada.demo@example.com",
    phone: "+15550000518",
    customer_lifetime_orders: 0
  }
];

/* ---------- Blog ---------- */
const POSTS = [
  {
    slug: "french-beading-basics",
    title: "French beading, explained by someone who kept getting it wrong",
    category: "Technique",
    date: "2026-07-14",
    read_minutes: 6,
    author: "Sara",
    excerpt: "The lily on the Shell Lily Choker is five petals of basic loop. Here is what nobody tells you about the first one.",
    body: [
      "French beading builds a shape out of loops of beaded wire wrapped around a central axis. It looks like a technique that needs a workshop and a tutor. It needs a spool of 26 gauge wire and patience.",
      "Start with the axis. Cut a length of wire far longer than you think, string your beads for the centre row, and leave a bare tail at both ends. The bare tail is what everyone skips, and it is what you twist at the end to hold the petal together. Skip it and the petal unravels in your hand.",
      "The loops wrap around that axis, each one a little longer than the last. Count beads for the first two rows and then stop counting: measure against the row below instead. A petal is finished when it stops looking like a petal and starts looking like a leaf, which is one row too many.",
      "Wire has a memory. If you unwrap a row and rewrap it, the kink stays and the petal sits crooked. Cut it off and start the row again. This is faster than fixing it, which took me an embarrassing number of ruined lilies to accept.",
      "The Wild Lily Lariat is five petals at about forty minutes each. The Shell Lily Choker is the same five petals in smaller beads, which doubles the time. That is most of the price difference between the two."
    ]
  },
  {
    slug: "choosing-cord",
    title: "Cord, wire or chain: how the stringing choice changes everything",
    category: "Materials",
    date: "2026-06-28",
    read_minutes: 5,
    author: "Sara",
    excerpt: "The same beads on paracord, memory wire and hand-linked chain give you three completely different objects.",
    body: [
      "People choose beads first and stringing second. It should be the other way around, because the stringing decides how the piece moves, how long it survives and roughly what it costs.",
      "Paracord is the workhorse for bag charms and keyrings. It takes a knot, it holds a bow shape, and it survives being crushed in a bag every day for a year. It cannot take a small bead, so the design has to be chunky.",
      "Memory wire holds a curve without a clasp. That is the whole appeal and the whole problem: it holds the curve you gave it, so a bow made on memory wire keeps its loops but cannot be adjusted. The Crystal Bow Charm works because it is meant to be rigid.",
      "Hand-linked chain, where every bead is wrapped into its own loop and connected to the next, is the slowest option by far. A twenty-bead bracelet is forty wraps. In exchange the piece drapes, no thread can stretch or snap, and one broken link is a repair rather than a total loss.",
      "If you are choosing for a gift, choose chain. If you are choosing for something that lives on a backpack, choose paracord."
    ]
  },
  {
    slug: "caring-for-plated-findings",
    title: "Why your silver plated clasp turned grey, and what to do",
    category: "Care",
    date: "2026-05-30",
    read_minutes: 4,
    author: "Sara",
    excerpt: "Plating is a few microns of metal over a base. Here is how long it actually lasts and how to stretch it.",
    body: [
      "Silver plated and gold plated findings are a thin layer of the good metal deposited over brass or steel. Thin means a few microns. It wears through at contact points first: the inside of a clasp, the ring that rubs on a bag strap.",
      "Three things speed that up. Perfume and hairspray, which sit on the surface and react. Sweat, which is mildly acidic. And water left to dry in a crevice.",
      "So: jewellery on last, off first. Wipe with a dry soft cloth after wearing. Store in a closed box rather than open on a dish, because the air does the slow work.",
      "Stainless steel does not plate and does not tarnish, which is why the beaded necklaces use it. It is harder to work with and comes in fewer shapes, so the smaller charms use plated findings instead.",
      "If a clasp does wear through, it is a five minute swap with a pair of pliers. Send it back and I will change it."
    ]
  }
];
