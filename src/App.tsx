import { useState } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import CategoryBar from "./components/CategoryBar";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import { products } from "./data/products";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="app">
      <Navbar cartCount={cartCount} onSearch={setSearchQuery} />
      <Banner />

      <main className="main-content">
        <div className="section-header">
          <h2>
            {searchQuery
              ? `Results for "${searchQuery}"`
              : activeCategory === "All"
              ? "Featured Products"
              : activeCategory}
          </h2>
          <span className="product-count">{filtered.length} items</span>
        </div>

        <CategoryBar active={activeCategory} onChange={setActiveCategory} />

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>😕 No products found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={() => setCartCount((c) => c + 1)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
