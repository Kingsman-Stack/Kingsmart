import { useState } from "react";
import { fmt } from "../data/products";

/**
 * useCart
 * Encapsulates all cart state and operations.
 * Consumed by ShopContext so components never touch cart state directly.
 */
export function useCart(showToast) {
  const [cart, setCart] = useState([]);

  /** Add product or increment qty if already in cart */
  const addToCart = (product) => {
    if (!product.inStock) return;

    setCart((prev) => {
      const existing = prev.find((c) => c.id === product.id);
      if (existing) {
        return prev.map((c) =>
          c.id === product.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    showToast(`${product.emoji} ${product.name.split(" ").slice(0, 3).join(" ")} added to cart`);
  };

  /** Increment or decrement quantity; remove item if qty drops to 0 */
  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  };

  /** Remove a line item entirely */
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  /** Wipe cart after order completion */
  const clearCart = () => setCart([]);

  /* ── Derived values (computed, not stored) ── */
  const itemCount   = cart.reduce((sum, c) => sum + c.qty, 0);
  const subtotal    = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const shipping    = subtotal > 100000 ? 0 : subtotal === 0 ? 0 : 3500; // free above ₦100k
  const vat         = Math.round(subtotal * 0.075);                       // 7.5% VAT
  const total       = subtotal + shipping + vat;

  return {
    cart,
    itemCount,
    subtotal,
    shipping,
    vat,
    total,
    addToCart,
    changeQty,
    removeFromCart,
    clearCart,
    fmtSubtotal: fmt(subtotal),
    fmtTotal:    fmt(total),
    fmtShipping: shipping === 0 ? "Free" : fmt(shipping),
    fmtVat:      fmt(vat),
  };
}
