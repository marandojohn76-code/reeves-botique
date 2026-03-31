import { useState } from "react";

interface NavbarProps {
  cartCount: number;
  onSearch: (q: string) => void;
  onAdminClick: () => void;
}

export default function Navbar({ cartCount, onSearch, onAdminClick }: NavbarProps) {
  const [query, setQuery] = useState("");

  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="logo">
          <span>Reeves</span>
          <span className="logo-sub"> Boutique</span>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products, brands and categories"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
          />
          <button onClick={() => onSearch(query)}>🔍</button>
        </div>

        <div className="nav-actions">
          <button className="nav-btn" onClick={onAdminClick}>
            <span>⚙️</span>
            <small>Admin</small>
          </button>
          <button className="nav-btn">
            <span>👤</span>
            <small>Account</small>
          </button>
          <button className="nav-btn">
            <span>❤️</span>
            <small>Wishlist</small>
          </button>
          <button className="nav-btn">
            <span>🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            <small>Cart</small>
          </button>
        </div>
      </div>

      <nav className="navbar-bottom">
        <a href="#"> Home</a>
        <a href="#"> Flash Sales</a>
        <a href="#">New Arrivals</a>
        <a href="#">Top Deals</a>
        <a href="#">Brands</a>
        <a href="#">Help</a>
      </nav>
    </header>
  );
}
