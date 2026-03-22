import { useShop }     from "../../context/ShopContext";
import { CATEGORIES, fmt } from "../../data/products";
import { PRODUCTS }    from "../../data/products";

/* Category item counts — computed once at module level, not on every render */
const categoryCounts = CATEGORIES.reduce((acc, cat) => {
  acc[cat] = cat === "All"
    ? PRODUCTS.length
    : PRODUCTS.filter((p) => p.cat === cat).length;
  return acc;
}, {});

const RATING_OPTIONS = [
  { value: 0,   label: "Any" },
  { value: 4,   label: "4.0+" },
  { value: 4.5, label: "4.5+" },
];

/**
 * Sidebar
 * Contains: category buttons, dual price-range sliders,
 * rating radio group, and in-stock checkbox.
 * Collapses via CSS transform when sidebarOpen === false.
 */
export default function Sidebar() {
  const {
    sidebarOpen,
    activeCategory, setActiveCategory,
    priceMin, setPriceMin,
    priceMax, setPriceMax,
    PRICE_MAX_CEILING,
    ratingMin, setRatingMin,
    inStockOnly, setInStockOnly,
  } = useShop();

  const handlePriceMin = (e) => {
    const val = Number(e.target.value);
    /* Prevent min from exceeding max */
    setPriceMin(Math.min(val, priceMax - 1000));
  };

  const handlePriceMax = (e) => {
    const val = Number(e.target.value);
    /* Prevent max from falling below min */
    setPriceMax(Math.max(val, priceMin + 1000));
  };

  return (
    <aside className={`sidebar ${!sidebarOpen ? "collapsed" : ""}`}>

      {/* ── Categories ── */}
      <div className="sidebar-section">
        <div className="sidebar-label">Categories</div>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === "All" ? "All Products" : cat}
            <span className="count">{categoryCounts[cat]}</span>
          </button>
        ))}
      </div>

      {/* ── Price Range ── */}
      <div className="sidebar-section">
        <div className="sidebar-label">Price Range</div>
        <div className="price-row">
          Min: <span>{fmt(priceMin)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={PRICE_MAX_CEILING}
          step={5000}
          value={priceMin}
          onChange={handlePriceMin}
          aria-label="Minimum price"
        />
        <div className="price-row" style={{ marginTop: 8 }}>
          Max: <span>{fmt(priceMax)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={PRICE_MAX_CEILING}
          step={5000}
          value={priceMax}
          onChange={handlePriceMax}
          aria-label="Maximum price"
        />
      </div>

      {/* ── Rating ── */}
      <div className="sidebar-section">
        <div className="sidebar-label">Minimum Rating</div>
        {RATING_OPTIONS.map((opt) => (
          <label key={opt.value} className="rating-row">
            <input
              type="radio"
              name="rating"
              value={opt.value}
              checked={ratingMin === opt.value}
              onChange={() => setRatingMin(opt.value)}
            />
            <span className="stars">★★★★★</span>
            <span className="rating-label">{opt.label}</span>
          </label>
        ))}
      </div>

      {/* ── Availability ── */}
      <div className="sidebar-section">
        <div className="sidebar-label">Availability</div>
        <label className="rating-row">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            aria-label="Show in-stock products only"
          />
          <span className="rating-label">In Stock Only</span>
        </label>
      </div>

    </aside>
  );
}
