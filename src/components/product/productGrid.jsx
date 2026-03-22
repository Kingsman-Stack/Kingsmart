import { useShop }  from "../../context/ShopContext";
import { fmt }      from "../../data/products";
import ProductCard  from "./ProductCard";
import StatCard     from "../ui/StatCard";

/**
 * ProductGrid
 * Renders:
 *   1. Dashboard stat strip (live order count, revenue, cart value)
 *   2. Grid header with title, result count, and sort dropdown
 *   3. Filtered/sorted product cards or an empty state
 */
export default function ProductGrid() {
  const {
    filteredProducts,
    activeCategory,
    sort, setSort,
    itemCount, subtotal,
    orderCount, revenue,
  } = useShop();

  const gridTitle = activeCategory === "All" ? "All Products" : activeCategory;

  return (
    <main className="main-content">

      {/* ── Dashboard strip ── */}
      <div className="dashboard">
        <StatCard
          label="Total Products"
          value="20"
          delta="↑ 4 new this week"
        />
        <StatCard
          label="Orders Today"
          value={orderCount}
          delta={orderCount > 0 ? `↑ ${orderCount} order${orderCount > 1 ? "s" : ""} placed` : "— No orders yet"}
        />
        <StatCard
          label="Revenue"
          value={fmt(revenue)}
          delta={revenue > 0 ? `↑ ${fmt(revenue)} earned` : "— Start selling"}
        />
        <StatCard
          label="Cart Value"
          value={fmt(subtotal)}
          delta={itemCount > 0 ? `${itemCount} item${itemCount > 1 ? "s" : ""} in cart` : "— Cart is empty"}
        />
      </div>

      {/* ── Grid header ── */}
      <div className="grid-header">
        <div className="grid-title">
          {gridTitle}{" "}
          <span className="grid-count">({filteredProducts.length})</span>
        </div>

        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      {/* ── Product grid ── */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-results">No products match your current filters.</div>
        )}
      </div>

    </main>
  );
}
