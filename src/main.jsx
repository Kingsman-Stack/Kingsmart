import { StrictMode }  from "react";
import { createRoot }  from "react-dom/client";
import { ShopProvider } from "./context/ShopContext";
import App             from "./app";
import "./styles/global.css";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    {/* ShopProvider wraps the entire tree so every component can access shared state */}
    <ShopProvider>
      <App />
    </ShopProvider>
  </StrictMode>
);
