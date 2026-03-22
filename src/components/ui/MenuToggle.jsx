import { useShop } from "../../context/ShopContext";

/**
 * MenuToggle
 * Animated hamburger button that collapses/expands the sidebar.
 * Active state drives CSS transform to form an ✕.
 */
export default function MenuToggle() {
  const { sidebarOpen, setSidebarOpen } = useShop();

  return (
    <button
      className={`menu-toggle ${!sidebarOpen ? "active" : ""}`}
      onClick={() => setSidebarOpen((prev) => !prev)}
      aria-label="Toggle navigation sidebar"
    >
      <span />
      <span />
      <span />
    </button>
  );
}
