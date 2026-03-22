import { useShop } from "../../context/ShopContext";

/**
 * Toast
 * Fixed position notification bar.
 * Visibility is driven by `toast.visible` from ShopContext.
 * CSS class swap handles the slide-in/out animation.
 */
export default function Toast() {
  const { toast } = useShop();

  return (
    <div className={`toast ${toast.visible ? "show" : ""}`} role="status" aria-live="polite">
      {toast.message}
    </div>
  );
}
