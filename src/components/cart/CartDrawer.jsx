import { useShop } from "../../context/ShopContext";

/**
 * CartDrawer
 * Slide-in panel from the right.
 * Manages line items with quantity controls and triggers checkout.
 * The overlay div closes the drawer when clicked outside.
 */
export default function CartDrawer() {
  const {
    cartOpen, closeCart, openCheckout,
    cart, itemCount,
    changeQty, removeFromCart,
    fmtSubtotal,
  } = useShop();

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`overlay ${cartOpen ? "open" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-label="Shopping cart">

        {/* ── Header ── */}
        <div className="drawer-head">
          <div className="drawer-title">Your Cart</div>
          <button className="close-btn" onClick={closeCart} aria-label="Close cart">✕</button>
        </div>

        {/* ── Line items ── */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <div>Your cart is empty</div>
              <div style={{ fontSize: 11 }}>Add some products to get started</div>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-icon">{item.emoji}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">
                    ₦{(item.price * item.qty).toLocaleString("en-NG")}
                  </div>

                  {/* Quantity controls */}
                  <div className="qty-ctrl">
                    <button
                      className="qty-btn"
                      onClick={() => changeQty(item.id, -1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >−</button>
                    <span className="qty-val">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => changeQty(item.id, 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >+</button>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      style={{ marginLeft: "auto" }}
                    >✕</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Footer with total and CTA ── */}
        <div className="cart-footer">
          <div className="cart-summary">
            <span className="cart-total-label">Subtotal</span>
            <span className="cart-total-val">{fmtSubtotal}</span>
          </div>
          <button
            className="checkout-cta"
            onClick={openCheckout}
            disabled={itemCount === 0}
          >
            Proceed to Checkout
          </button>
        </div>

      </aside>
    </>
  );
}
