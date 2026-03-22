import TopBar        from "./components/layout/TopBar";
import Sidebar        from "./components/layout/Sidebar";
import ProductGrid    from "./components/product/ProductGrid";
import CartDrawer     from "./components/cart/CartDrawer";
import CheckoutModal  from "./components/checkout/CheckoutModal";
import Toast          from "./components/ui/Toast";
import { useShop }    from "./context/ShopContext";

/**
 * AppLayout
 * Inner layout shell — consumes sidebarOpen from context to shift the main area.
 * Kept separate from App so ShopProvider wraps it cleanly in main.jsx.
 */
function App() {
  const { sidebarOpen } = useShop();

  return (
    <div className="app">
      <TopBar />

      <div className="layout">
        <Sidebar />

        {/* Main content shifts right when sidebar is open */}
        <div className={`main ${!sidebarOpen ? "expanded" : ""}`}>
          <ProductGrid />
        </div>
      </div>

      {/* Global overlays */}
      <CartDrawer />
      <CheckoutModal />
      <Toast />
    </div>
  );
}

export default App;
