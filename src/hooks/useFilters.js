import { useState, useMemo } from "react";
import { PRODUCTS } from "../data/products";

const PRICE_MAX_CEILING = 600000;

/**
 * useFilters
 * Manages all filter state and returns the derived filtered + sorted product list.
 * Memoised so the grid only re-renders when filter values actually change.
 */
export function useFilters() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceMin, setPriceMin]             = useState(0);
  const [priceMax, setPriceMax]             = useState(PRICE_MAX_CEILING);
  const [ratingMin, setRatingMin]           = useState(0);
  const [inStockOnly, setInStockOnly]       = useState(false);
  const [search, setSearch]                 = useState("");
  const [sort, setSort]                     = useState("default");

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchCat    = activeCategory === "All" || p.cat === activeCategory;
      const matchPrice  = p.price >= priceMin && p.price <= priceMax;
      const matchRating = p.rating >= ratingMin;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.cat.toLowerCase().includes(search.toLowerCase());
      const matchStock  = !inStockOnly || p.inStock;
      return matchCat && matchPrice && matchRating && matchSearch && matchStock;
    });

    /* Sorting */
    if (sort === "price-asc")  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating")     list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "name")       list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [activeCategory, priceMin, priceMax, ratingMin, inStockOnly, search, sort]);

  return {
    /* state */
    activeCategory, priceMin, priceMax, ratingMin,
    inStockOnly, search, sort,
    PRICE_MAX_CEILING,
    /* setters */
    setActiveCategory, setPriceMin, setPriceMax,
    setRatingMin, setInStockOnly, setSearch, setSort,
    /* derived */
    filteredProducts,
  };
}
