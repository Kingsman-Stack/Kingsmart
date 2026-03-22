import { useState }  from "react";
import { useShop }   from "../../context/ShopContext";
import { fmt }       from "../../data/products";

const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT — Abuja","Gombe",
  "Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara",
  "Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau",
  "Rivers","Sokoto","Taraba","Yobe","Zamfara",
];

/**
 * CheckoutModal
 * Multi-section form: contact info, delivery address, payment method.
 * Displays live order summary with subtotal, shipping, VAT, and total.
 * On submit — calls placeOrder() which updates dashboard stats + clears cart.
 */
export default function CheckoutModal() {
  const {
    checkoutOpen, closeCheckout,
    cart, subtotal, shipping, vat, total,
    fmtShipping, fmtVat, fmtTotal,
    placeOrder,
  } = useShop();

  /* Local form state — not needed in global context */
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    street: "", city: "", state: "Lagos",
    payment: "paystack",
  });
  const [ordered, setOrdered] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = () => {
    placeOrder();      // update global stats, clear cart
    setOrdered(true);  // flip to success view
  };

  const handleClose = () => {
    closeCheckout();
    /* Delay reset so success screen doesn't flash during close animation */
    setTimeout(() => setOrdered(false), 300);
  };

  if (!checkoutOpen) return null;

  return (
    <div className="modal-wrap open" role="dialog" aria-modal="true" aria-label="Checkout">
      <div className="modal">

        {/* ── Header (hidden on success) ── */}
        {!ordered && (
          <div className="modal-head">
            <div className="modal-title">Checkout</div>
            <button className="close-btn" onClick={handleClose} aria-label="Close checkout">✕</button>
          </div>
        )}

        {/* ── Success view ── */}
        {ordered ? (
          <div className="success-view">
            <div className="success-icon">✅</div>
            <div className="success-title">Order Placed!</div>
            <p className="success-sub">
              Thank you. Your order has been received and will be delivered within 2–4 business days.
            </p>
            <button className="success-btn" onClick={handleClose}>Continue Shopping</button>
          </div>
        ) : (

          /* ── Checkout form ── */
          <div className="modal-body">

            {/* Contact information */}
            <div className="form-section">
              <div className="form-section-title">Contact Information</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="firstName">First Name</label>
                  <input id="firstName" name="firstName" type="text" placeholder="Kingsman" value={form.firstName} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lastName">Last Name</label>
                  <input id="lastName" name="lastName" type="text" placeholder="Obi" value={form.lastName} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" placeholder="king@example.com" value={form.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" placeholder="+234 800 000 0000" value={form.phone} onChange={handleChange} />
              </div>
            </div>

            {/* Delivery address */}
            <div className="form-section">
              <div className="form-section-title">Delivery Address</div>
              <div className="form-group">
                <label className="form-label" htmlFor="street">Street Address</label>
                <input id="street" name="street" type="text" placeholder="15 Adeola Odeku Street" value={form.street} onChange={handleChange} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="city">City</label>
                  <input id="city" name="city" type="text" placeholder="Lagos" value={form.city} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="state">State</label>
                  <select id="state" name="state" value={form.state} onChange={handleChange}>
                    {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="form-section">
              <div className="form-section-title">Payment Method</div>
              <div className="form-group">
                <select name="payment" value={form.payment} onChange={handleChange}>
                  <option value="paystack">Paystack — Card / Transfer / USSD</option>
                  <option value="flutterwave">Flutterwave</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="pod">Pay on Delivery</option>
                </select>
              </div>
            </div>

            {/* Order summary */}
            <div className="order-review">
              {cart.map((item) => (
                <div className="order-row" key={item.id}>
                  <span>{item.emoji} {item.name.split(" ").slice(0, 3).join(" ")} ×{item.qty}</span>
                  <span>{fmt(item.price * item.qty)}</span>
                </div>
              ))}
              <div className="order-row"><span>Shipping</span><span>{fmtShipping}</span></div>
              <div className="order-row"><span>VAT (7.5%)</span><span>{fmtVat}</span></div>
              <div className="order-row total"><span>Total</span><span>{fmtTotal}</span></div>
            </div>

            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order →
            </button>

          </div>
        )}
      </div>
    </div>
  );
}
