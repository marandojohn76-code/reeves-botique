const products = [
  {
    id: 1,
    name: "Floral Midi Dress",
    category: "Women's Fashion",
    price: 4500,
    oldPrice: 7000,
    badge: "35% off",
    rating: 4.8,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&q=80",
  },
  {
    id: 2,
    name: "Men's Slim Fit Suit",
    category: "Men's Fashion",
    price: 18000,
    oldPrice: 25000,
    badge: "Hot",
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e5b?w=900&q=80",
  },
  {
    id: 3,
    name: "Leather Ankle Boots",
    category: "Shoes",
    price: 9500,
    oldPrice: 13000,
    badge: "27% off",
    rating: 4.6,
    reviews: 204,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&q=80",
  },
  {
    id: 4,
    name: "Quilted Shoulder Bag",
    category: "Bags",
    price: 6200,
    badge: "New",
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80",
  },
  {
    id: 5,
    name: "Gold Hoop Earrings",
    category: "Accessories",
    price: 1800,
    oldPrice: 2500,
    rating: 4.5,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80",
  },
  {
    id: 6,
    name: "Matte Lipstick Set",
    category: "Beauty",
    price: 3200,
    oldPrice: 4000,
    badge: "Bestseller",
    rating: 4.8,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1586495777744-4e6232bf2f9b?w=900&q=80",
  },
  {
    id: 7,
    name: "Kids Sneakers",
    category: "Kids",
    price: 3500,
    oldPrice: 5000,
    rating: 4.3,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
  },
  {
    id: 8,
    name: "Wrap Maxi Skirt",
    category: "Women's Fashion",
    price: 3800,
    oldPrice: 5500,
    badge: "31% off",
    rating: 4.6,
    reviews: 93,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=900&q=80",
  },
  {
    id: 9,
    name: "Men's Polo Shirt",
    category: "Men's Fashion",
    price: 2800,
    oldPrice: 3500,
    rating: 4.4,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=900&q=80",
  },
  {
    id: 10,
    name: "Strappy Heels",
    category: "Shoes",
    price: 7200,
    oldPrice: 10000,
    badge: "28% off",
    rating: 4.7,
    reviews: 221,
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=900&q=80",
  },
  {
    id: 11,
    name: "Tote Handbag",
    category: "Bags",
    price: 5500,
    badge: "New",
    rating: 4.5,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80",
  },
  {
    id: 12,
    name: "Silk Scarf",
    category: "Accessories",
    price: 2200,
    oldPrice: 3000,
    rating: 4.7,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=900&q=80",
  },
];

const productGrid = document.getElementById("productGrid");
const resultCount = document.getElementById("resultCount");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const categoryBar = document.getElementById("categoryBar");
let selectedCategory = "All";
let cartTotal = 0;

function formatPrice(value) {
  return "₦" + value.toLocaleString();
}

function setActiveCategory(button) {
  const buttons = categoryBar.querySelectorAll("button");
  buttons.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  selectedCategory = button.dataset.category || "All";
  renderProducts();
}

function renderProducts() {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = products.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesQuery = item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
  productGrid.innerHTML = "";
  resultCount.textContent = `${filtered.length} items`;

  filtered.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-pricing">
          <span class="product-price">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="product-old">${formatPrice(product.oldPrice)}</span>` : ""}
        </div>
        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
        <div class="product-meta">
          <span class="stars">${"★".repeat(Math.round(product.rating))}${"☆".repeat(5 - Math.round(product.rating))}</span>
          <span class="meta-text">${product.reviews} reviews</span>
        </div>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;
    const addButton = card.querySelector(".add-to-cart");
    addButton.addEventListener("click", () => {
      cartTotal += 1;
      cartCount.textContent = cartTotal;
      addButton.textContent = "Added";
      addButton.disabled = true;
    });
    productGrid.appendChild(card);
  });
}

searchButton.addEventListener("click", renderProducts);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    renderProducts();
  }
});

categoryBar.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.dataset.category) return;
  setActiveCategory(target);
});

renderProducts();
