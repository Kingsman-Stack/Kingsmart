import MenuToggle from "../ui/MenuToggle";
import { useShop } from "../../context/ShopContext";

/**
 * TopBar
 * Fixed header containing:
 *   - MenuToggle (sidebar collapse)
 *   - Logo
 *   - Search input (drives filter state directly via setSearch)
 *   - Cart CTA with live item count badge
 *   - User avatar (placeholder — wire to auth when ready)
 */
export default function TopBar() {
  const { itemCount, openCart, setSearch, search } = useShop();

  return (
    <header className="topbar">
      <MenuToggle />

      <a href="/" className="logo">
        Kings<span>mart</span>
      </a>

      {/* Search — updates filter state on every keystroke */}
      <div className="search-wrap">
        <input
          type="text"
          value={search}
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />
        <button className="search-btn" aria-label="Submit search">⌕</button>
      </div>

      <div className="topbar-right">
        <button className="cart-btn" onClick={openCart} aria-label={`Open cart, ${itemCount} items`}>
          🛒 Cart
          <span className="cart-badge">{itemCount}</span>
        </button>

        {/* Avatar — replace initials with user data from your auth layer */}
        <div className="avatar" role="img" aria-label="User account">KS</div>
      </div>
    </header>
  );
}
