import { Product } from "../data/products";

interface Props {
  product: Product;
  onAddToCart: () => void;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars">
      {"★".repeat(Math.floor(rating))}
      {"☆".repeat(5 - Math.floor(rating))}
      <span className="rating-num"> {rating}</span>
    </span>
  );
}

export default function ProductCard({ product, onAddToCart }: Props) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} className="product-img" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className="wishlist-btn">♡</button>
      </div>
      <div className="product-info">
        <p className="product-name">{product.name}</p>
        <div className="product-pricing">
          <span className="product-price">₦{product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span className="product-old-price">₦{product.oldPrice.toLocaleString()}</span>
          )}
          {discount && <span className="product-discount">-{discount}%</span>}
        </div>
        <div className="product-meta">
          <Stars rating={product.rating} />
          <span className="product-reviews">({product.reviews})</span>
        </div>
        <button className="add-to-cart" onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
