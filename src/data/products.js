/**
 * Static mock product catalogue.
 * Shape: { id, name, cat, price (NGN), rating, reviews, emoji, badge, inStock }
 * Replace this array with an API response to go live.
 */
export const PRODUCTS = [
  { id: 1,  name: "Sony WH-1000XM5 Headphones",        cat: "Electronics", price: 189000, rating: 4.8, reviews: 412, emoji: "🎧", badge: "Sale", inStock: true  },
  { id: 2,  name: "Apple Watch Series 9 GPS",           cat: "Electronics", price: 375000, rating: 4.9, reviews: 803, emoji: "⌚", badge: "New",  inStock: true  },
  { id: 3,  name: 'Samsung 4K Smart TV 55"',            cat: "Electronics", price: 520000, rating: 4.6, reviews: 217, emoji: "📺", badge: null,   inStock: true  },
  { id: 4,  name: "JBL Flip 6 Bluetooth Speaker",       cat: "Electronics", price: 68000,  rating: 4.7, reviews: 329, emoji: "🔊", badge: "Sale", inStock: false },
  { id: 5,  name: "Logitech MX Master 3 Mouse",         cat: "Electronics", price: 82000,  rating: 4.8, reviews: 156, emoji: "🖱️", badge: null,   inStock: true  },
  { id: 6,  name: "Agbada Embroidered Set — Royal Blue", cat: "Fashion",    price: 45000,  rating: 4.5, reviews: 88,  emoji: "👘", badge: "New",  inStock: true  },
  { id: 7,  name: "Ankara Shirt — Premium Print",       cat: "Fashion",     price: 18500,  rating: 4.3, reviews: 64,  emoji: "👕", badge: null,   inStock: true  },
  { id: 8,  name: "Italian Leather Oxford Shoes",       cat: "Fashion",     price: 95000,  rating: 4.7, reviews: 201, emoji: "👞", badge: null,   inStock: true  },
  { id: 9,  name: "Quilted Tote Bag — Tan",             cat: "Fashion",     price: 38000,  rating: 4.4, reviews: 113, emoji: "👜", badge: "Sale", inStock: true  },
  { id: 10, name: "Linen Trousers — Oatmeal",           cat: "Fashion",     price: 24000,  rating: 4.2, reviews: 47,  emoji: "👖", badge: null,   inStock: false },
  { id: 11, name: "Rattan Pendant Light",               cat: "Home",        price: 54000,  rating: 4.6, reviews: 139, emoji: "🪔", badge: "New",  inStock: true  },
  { id: 12, name: "Ceramic Dinner Set — 12 Piece",      cat: "Home",        price: 72000,  rating: 4.5, reviews: 92,  emoji: "🍽️", badge: null,   inStock: true  },
  { id: 13, name: "Memory Foam Mattress — King Size",   cat: "Home",        price: 285000, rating: 4.8, reviews: 308, emoji: "🛏️", badge: null,   inStock: true  },
  { id: 14, name: "Scented Candle Set — Oud & Amber",   cat: "Home",        price: 22000,  rating: 4.6, reviews: 175, emoji: "🕯️", badge: "Sale", inStock: true  },
  { id: 15, name: "Stainless Cookware Set 8pc",         cat: "Home",        price: 110000, rating: 4.4, reviews: 84,  emoji: "🍳", badge: null,   inStock: false },
  { id: 16, name: "Vitamin C Brightening Serum 30ml",   cat: "Beauty",      price: 28000,  rating: 4.7, reviews: 524, emoji: "💧", badge: "New",  inStock: true  },
  { id: 17, name: "Shea Butter Moisturiser 250ml",      cat: "Beauty",      price: 15500,  rating: 4.5, reviews: 341, emoji: "🧴", badge: null,   inStock: true  },
  { id: 18, name: "Matte Lipstick Kit — 6 Shades",      cat: "Beauty",      price: 21000,  rating: 4.3, reviews: 187, emoji: "💄", badge: "Sale", inStock: true  },
  { id: 19, name: "Pro Resistance Band Set",            cat: "Sports",      price: 19500,  rating: 4.6, reviews: 263, emoji: "💪", badge: null,   inStock: true  },
  { id: 20, name: "Yoga Mat — Non-Slip 6mm",            cat: "Sports",      price: 32000,  rating: 4.4, reviews: 98,  emoji: "🧘", badge: "New",  inStock: true  },
];

/** All available categories derived from data — keeps sidebar in sync automatically */
export const CATEGORIES = ["All", ...new Set(PRODUCTS.map((p) => p.cat))];

/** Naira formatter */
export const fmt = (n) => "₦" + Number(n).toLocaleString("en-NG");
