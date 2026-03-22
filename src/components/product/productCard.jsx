import { useShop } from "../../context/ShopContext";
import { fmt }     from "../../data/products";

/**
 * ProductCard
 * Displays a single product. Reads cart state to show "Added" state
 * without needing a local flag — derived from shared cart array.
 *
 * Props: product { id, name, cat, price, rating, reviews, emoji, badge, inStock }
 */
export default function ProductCard({ product }) {
  const { cart, addToCart } = useShop();

  const isInCart = cart.some((c) => c.id === product.id);

  return (
    <div className="product-card">

      {/* ── Product image / emoji ── */}
      <div className="product-img">
        <span style={{ fontSize: 44 }}>{product.emoji}</span>

        {product.badge && (
          <div className={`product-badge ${product.badge === "New" ? "new" : ""}`}>
            {product.badge}
          </div>
        )}

        {/* Out-of-stock overlay */}
        {!product.inStock && (
          <div className="out-of-stock-overlay">OUT OF STOCK</div>
        )}
      </div>

      {/* ── Product details ── */}
      <div className="product-body">
        <div className="product-cat">{product.cat}</div>
        <div className="product-name">{product.name}</div>

        <div className="product-footer">
          <div className="product-price">{fmt(product.price)}</div>
          <div className="product-rating">
            <span className="star">★</span>
            {product.rating}
            <span>({product.reviews})</span>
          </div>
        </div>

        <button
          className={`add-btn ${isInCart ? "added" : ""}`}
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          aria-label={`Add ${product.name} to cart`}
        >
          {isInCart ? "✓ Added" : "+ Add to Cart"}
        </button>
      </div>
    </div>
  );
}
