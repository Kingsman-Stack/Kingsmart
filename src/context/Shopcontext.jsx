import { createContext, useContext, useState } from "react";
import { useCart }    from "../hooks/useCart";
import { useFilters } from "../hooks/useFilters";
import { useToast }   from "../hooks/useToast";

const ShopContext = createContext(null);

/**
 * ShopProvider
 * Composes useCart, useFilters, and useToast into one context value.
 * Also owns UI open/close state for the cart drawer and checkout modal.
 * Wrap <App /> with this so every component tree node can consume the store.
 */
export function ShopProvider({ children }) {
  /* UI visibility state */
  const [cartOpen,     setCartOpen]     = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [sidebarOpen,  setSidebarOpen]  = useState(true);
  const [orderCount,   setOrderCount]   = useState(0);
  const [revenue,      setRevenue]      = useState(0);

  /* Composed hooks */
  const { toast, showToast } = useToast();
  const cartHook             = useCart(showToast);
  const filterHook           = useFilters();

  const openCart  = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const openCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };
  const closeCheckout = () => setCheckoutOpen(false);

  /** Called when user confirms order — updates dashboard stats and resets cart */
  const placeOrder = () => {
    setRevenue((prev) => prev + cartHook.subtotal);
    setOrderCount((prev) => prev + 1);
    cartHook.clearCart();
  };

  const value = {
    /* UI */
    cartOpen, checkoutOpen, sidebarOpen,
    openCart, closeCart, openCheckout, closeCheckout,
    setSidebarOpen,
    /* Stats */
    orderCount, revenue,
    placeOrder,
    /* Cart */
    ...cartHook,
    /* Filters */
    ...filterHook,
    /* Toast */
    toast,
    showToast,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

/**
 * useShop
 * Convenience hook. Throws if consumed outside ShopProvider.
 */
export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}
