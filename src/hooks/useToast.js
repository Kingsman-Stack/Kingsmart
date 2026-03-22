import { useState, useRef } from "react";

/**
 * useToast
 * Manages a single toast message with automatic dismissal.
 * Uses a ref for the timer so rapid calls don't stack multiple timeouts.
 */
export function useToast() {
  const [toast, setToast]       = useState({ message: "", visible: false });
  const timerRef                = useRef(null);

  const showToast = (message) => {
    /* Clear any existing dismiss timer before starting a new one */
    if (timerRef.current) clearTimeout(timerRef.current);

    setToast({ message, visible: true });

    timerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2200);
  };

  return { toast, showToast };
}
