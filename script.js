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
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80",
  },
  {
    id: 2,
    name: "White Linen Blouse",
    category: "Women's Fashion",
    price: 2800,
    oldPrice: 4200,
    badge: "33% off",
    rating: 4.6,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e5b?w=500&q=80",
  },
  {
    id: 3,
    name: "Wrap Maxi Skirt",
    category: "Women's Fashion",
    price: 3800,
    oldPrice: 5500,
    badge: "31% off",
    rating: 4.6,
    reviews: 93,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80",
  },
  {
    id: 4,
    name: "Black Blazer Jacket",
    category: "Women's Fashion",
    price: 6200,
    oldPrice: 9000,
    badge: "31% off",
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&q=80",
  },
  {
    id: 5,
    name: "Flowy Summer Dress",
    category: "Women's Fashion",
    price: 3500,
    oldPrice: 5200,
    badge: "33% off",
    rating: 4.5,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1515649934662-b06095a072fe?w=500&q=80",
  },
  {
    id: 6,
    name: "Elegant Evening Gown",
    category: "Women's Fashion",
    price: 12000,
    oldPrice: 18000,
    badge: "33% off",
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1595777712802-08d01e6b6034?w=500&q=80",
  },
  {
    id: 7,
    name: "Casual T-shirt Dress",
    category: "Women's Fashion",
    price: 2200,
    oldPrice: 3300,
    badge: "33% off",
    rating: 4.4,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&q=80",
  },
  {
    id: 8,
    name: "Striped Cardigan",
    category: "Women's Fashion",
    price: 3200,
    oldPrice: 4800,
    badge: "33% off",
    rating: 4.6,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80",
  },


  {
    id: 9,
    name: "Men's Slim Fit Suit",
    category: "Men's Fashion",
    price: 18000,
    oldPrice: 25000,
    badge: "28% off",
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e5b?w=500&q=80",
  },
  {
    id: 10,
    name: "Men's Polo Shirt",
    category: "Men's Fashion",
    price: 2800,
    oldPrice: 3500,
    rating: 4.4,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&q=80",
  },
  {
    id: 11,
    name: "Casual Denim Jacket",
    category: "Men's Fashion",
    price: 5500,
    oldPrice: 8000,
    badge: "31% off",
    rating: 4.6,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&q=80",
  },
  {
    id: 12,
    name: "Formal White Shirt",
    category: "Men's Fashion",
    price: 3200,
    oldPrice: 4500,
    badge: "29% off",
    rating: 4.5,
    reviews: 102,
    image: "https://images.unsplash.com/photo-1596385109122-b56d7b3c7e6b?w=500&q=80",
  },
  {
    id: 13,
    name: "Chinos Trousers",
    category: "Men's Fashion",
    price: 4200,
    oldPrice: 6000,
    badge: "30% off",
    rating: 4.6,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1473966143000-9802de107933?w=500&q=80",
  },
  {
    id: 14,
    name: "Casual Hoodie",
    category: "Men's Fashion",
    price: 2500,
    oldPrice: 3800,
    badge: "34% off",
    rating: 4.7,
    reviews: 201,
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb12dd?w=500&q=80",
  },
  {
    id: 15,
    name: "Bomber Jacket",
    category: "Men's Fashion",
    price: 6000,
    oldPrice: 8500,
    badge: "29% off",
    rating: 4.6,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1544131519-9f1b4e97c4df?w=500&q=80",
  },
  {
    id: 16,
    name: "Oxford Button-Down Shirt",
    category: "Men's Fashion",
    price: 3800,
    oldPrice: 5200,
    badge: "27% off",
    rating: 4.5,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc432b60?w=500&q=80",
  },


  {
    id: 17,
    name: "Leather Ankle Boots",
    category: "Shoes",
    price: 9500,
    oldPrice: 13000,
    badge: "27% off",
    rating: 4.6,
    reviews: 204,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80",
  },
  {
    id: 18,
    name: "Strappy Heels",
    category: "Shoes",
    price: 7200,
    oldPrice: 10000,
    badge: "28% off",
    rating: 4.7,
    reviews: 221,
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=500&q=80",
  },
  {
    id: 19,
    name: "White Sneakers",
    category: "Shoes",
    price: 5800,
    oldPrice: 8200,
    badge: "29% off",
    rating: 4.8,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
  },
  {
    id: 20,
    name: "Formal Oxford Shoes",
    category: "Shoes",
    price: 8500,
    oldPrice: 12000,
    badge: "29% off",
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
  },
  {
    id: 21,
    name: "Comfortable Loafers",
    category: "Shoes",
    price: 6500,
    oldPrice: 9000,
    badge: "28% off",
    rating: 4.5,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1529268369560-f5f3c5b4a0c0?w=500&q=80",
  },
  {
    id: 22,
    name: "Running Trainers",
    category: "Shoes",
    price: 7800,
    oldPrice: 11000,
    badge: "29% off",
    rating: 4.7,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
  },
  {
    id: 23,
    name: "Summer Sandals",
    category: "Shoes",
    price: 2800,
    oldPrice: 4200,
    badge: "33% off",
    rating: 4.4,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1595405748375-a9a83547cd70?w=500&q=80",
  },
  {
    id: 24,
    name: "Leather Flip Flops",
    category: "Shoes",
    price: 2200,
    oldPrice: 3500,
    badge: "37% off",
    rating: 4.3,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1572821160211-efdc51a8d64f?w=500&q=80",
  },

  
  {
    id: 25,
    name: "Quilted Shoulder Bag",
    category: "Bags",
    price: 6200,
    badge: "New",
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
  },
  {
    id: 26,
    name: "Tote Handbag",
    category: "Bags",
    price: 5500,
    oldPrice: 7800,
    badge: "29% off",
    rating: 4.5,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80",
  },
  {
    id: 27,
    name: "Crossbody Leather Bag",
    category: "Bags",
    price: 7200,
    oldPrice: 10000,
    badge: "28% off",
    rating: 4.7,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
  },
  {
    id: 28,
    name: "Backpack Travel Bag",
    category: "Bags",
    price: 6800,
    oldPrice: 9500,
    badge: "28% off",
    rating: 4.6,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1553382407-98eeb64c6a62?w=500&q=80",
  },
  {
    id: 29,
    name: "Clutch Evening Bag",
    category: "Bags",
    price: 4200,
    oldPrice: 6000,
    badge: "30% off",
    rating: 4.7,
    reviews: 143,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e5b?w=500&q=80",
  },
  {
    id: 30,
    name: "Satchel Messenger Bag",
    category: "Bags",
    price: 7800,
    oldPrice: 11000,
    badge: "29% off",
    rating: 4.5,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80",
  },
  {
    id: 31,
    name: "Mini Shoulder Bag",
    category: "Bags",
    price: 3800,
    oldPrice: 5500,
    badge: "31% off",
    rating: 4.6,
    reviews: 201,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
  },
  {
    id: 32,
    name: "Laptop Backpack",
    category: "Bags",
    price: 8200,
    oldPrice: 11500,
    badge: "29% off",
    rating: 4.8,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
  },

  
  {
    id: 33,
    name: "Gold Hoop Earrings",
    category: "Accessories",
    price: 1800,
    oldPrice: 2500,
    rating: 4.5,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
  },
  {
    id: 34,
    name: "Silk Scarf",
    category: "Accessories",
    price: 2200,
    oldPrice: 3000,
    rating: 4.7,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80",
  },
  {
    id: 35,
    name: "Leather Belt",
    category: "Accessories",
    price: 2800,
    oldPrice: 4000,
    badge: "30% off",
    rating: 4.6,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1548690312-e8f50a42b67a?w=500&q=80",
  },
  {
    id: 36,
    name: "Oversized Sunglasses",
    category: "Accessories",
    price: 3500,
    oldPrice: 5000,
    badge: "30% off",
    rating: 4.7,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1572821260409-51b2b6c20072?w=500&q=80",
  },
  {
    id: 37,
    name: "Pearl Necklace",
    category: "Accessories",
    price: 4200,
    oldPrice: 6000,
    badge: "30% off",
    rating: 4.8,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
  },
  {
    id: 38,
    name: "Wool Watch Cap",
    category: "Accessories",
    price: 1800,
    oldPrice: 2500,
    rating: 4.4,
    reviews: 102,
    image: "https://images.unsplash.com/photo-1588287537226-7db58dc01d3e?w=500&q=80",
  },
  {
    id: 39,
    name: "Statement Bracelet",
    category: "Accessories",
    price: 2800,
    oldPrice: 4000,
    badge: "30% off",
    rating: 4.6,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
  },
  {
    id: 40,
    name: "Leather Gloves",
    category: "Accessories",
    price: 2500,
    oldPrice: 3500,
    badge: "29% off",
    rating: 4.5,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1520099820605-87e4680ef7de?w=500&q=80",
  },


  {
    id: 41,
    name: "Matte Lipstick Set",
    category: "Beauty",
    price: 3200,
    oldPrice: 4000,
    badge: "Bestseller",
    rating: 4.8,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1586495777744-4e6232bf2f9b?w=500&q=80",
  },
  {
    id: 42,
    name: "Facial Skincare Kit",
    category: "Beauty",
    price: 5200,
    oldPrice: 7200,
    badge: "29% off",
    rating: 4.7,
    reviews: 223,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80",
  },
  {
    id: 43,
    name: "Eye Shadow Palette",
    category: "Beauty",
    price: 2800,
    oldPrice: 4000,
    badge: "30% off",
    rating: 4.9,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1559163853-2ad2b5f908f9?w=500&q=80",
  },
  {
    id: 44,
    name: "Foundation & Primer Set",
    category: "Beauty",
    price: 4500,
    oldPrice: 6300,
    badge: "29% off",
    rating: 4.6,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&q=80",
  },
  {
    id: 45,
    name: "Mascara & Eyeliner Duo",
    category: "Beauty",
    price: 2200,
    oldPrice: 3200,
    badge: "31% off",
    rating: 4.7,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1558631291-b02b473ec92b?w=500&q=80",
  },
  {
    id: 46,
    name: "Professional Brush Set",
    category: "Beauty",
    price: 3800,
    oldPrice: 5500,
    badge: "31% off",
    rating: 4.8,
    reviews: 334,
    image: "https://images.unsplash.com/photo-1596704017254-9b4c8915c481?w=500&q=80",
  },
  {
    id: 47,
    name: "Anti-Aging Serum",
    category: "Beauty",
    price: 4800,
    oldPrice: 6800,
    badge: "29% off",
    rating: 4.7,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1608208184666-9c3d5fd2e585?w=500&q=80",
  },
  {
    id: 48,
    name: "Luxury Face Cream",
    category: "Beauty",
    price: 5500,
    oldPrice: 7800,
    badge: "29% off",
    rating: 4.9,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1608208184666-9c3d5fd2e585?w=500&q=80",
  },

  
  {
    id: 49,
    name: "Kids Sneakers",
    category: "Kids",
    price: 3500,
    oldPrice: 5000,
    rating: 4.3,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
  },
  {
    id: 50,
    name: "Colorful Kids T-shirt",
    category: "Kids",
    price: 1800,
    oldPrice: 2500,
    badge: "28% off",
    rating: 4.4,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1503342394128-c894fdcc538d?w=500&q=80",
  },
  {
    id: 51,
    name: "Kids Denim Jacket",
    category: "Kids",
    price: 3200,
    oldPrice: 4500,
    badge: "29% off",
    rating: 4.5,
    reviews: 102,
    image: "https://images.unsplash.com/photo-1503342394128-c894fdcc538d?w=500&q=80",
  },
  {
    id: 52,
    name: "Kids Hoodie Sweatshirt",
    category: "Kids",
    price: 2200,
    oldPrice: 3200,
    badge: "31% off",
    rating: 4.6,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1503342394128-c894fdcc538d?w=500&q=80",
  },
  {
    id: 53,
    name: "Kids Summer Shorts",
    category: "Kids",
    price: 1500,
    oldPrice: 2200,
    badge: "32% off",
    rating: 4.3,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1503342394128-c894fdcc538d?w=500&q=80",
  },
  {
    id: 54,
    name: "Girls Princess Dress",
    category: "Kids",
    price: 4200,
    oldPrice: 6000,
    badge: "30% off",
    rating: 4.7,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1477114905385-0e0da6b0cac3?w=500&q=80",
  },
  {
    id: 55,
    name: "Kids Backpack",
    category: "Kids",
    price: 2800,
    oldPrice: 4000,
    badge: "30% off",
    rating: 4.5,
    reviews: 123,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
  },
  {
    id: 56,
    name: "Kids Winter Boots",
    category: "Kids",
    price: 3800,
    oldPrice: 5500,
    badge: "31% off",
    rating: 4.6,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
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
  return "KSH " + value.toLocaleString();
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
        <button class="add-to-cart">Order Now</button>
      </div>
    `;
    const addButton = card.querySelector(".add-to-cart");
    addButton.addEventListener("click", () => {
      showCustomerForm(product, addButton);
    });
    productGrid.appendChild(card);
  });
}

function showOrderConfirmation(order) {
  const itemImg   = order.items?.[0]?.image   || order.productImage || '';
  const itemName  = order.items?.[0]?.name    || order.productName  || '';
  const itemPrice = order.items?.[0]?.price   || order.price        || 0;

  const modal = document.createElement('div');
  modal.className = 'order-confirmation-modal';
  modal.innerHTML = `
    <div class="order-modal-content">
      <div class="order-header">
        <h2>✓ Order Confirmed!</h2>
        <p>Order ID: <strong>${order.id}</strong></p>
      </div>
      <div class="product-confirmation">
        <img src="${itemImg}" alt="${itemName}" />
        <div>
          <h3>${itemName}</h3>
          <p class="order-price">${formatPrice(itemPrice)}</p>
          <p style="font-size:0.85rem;color:#6b7280">Hi ${order.customerName}, your order is received!</p>
        </div>
      </div>
      <div class="shipment-tracker">
        <h3>📦 Your Shipment Path</h3>
        <div class="tracking-timeline">
          <div class="tracking-step active">
            <div class="tracking-circle">✓</div>
            <div class="tracking-label">Order Confirmed</div>
            <div class="tracking-time">Now</div>
          </div>
          <div class="tracking-step">
            <div class="tracking-circle">📍</div>
            <div class="tracking-label">Processing</div>
            <div class="tracking-time">2-3 hours</div>
          </div>
          <div class="tracking-step">
            <div class="tracking-circle">🚚</div>
            <div class="tracking-label">Shipped</div>
            <div class="tracking-time">1-2 days</div>
          </div>
          <div class="tracking-step">
            <div class="tracking-circle">📦</div>
            <div class="tracking-label">Out for Delivery</div>
            <div class="tracking-time">2-3 days</div>
          </div>
          <div class="tracking-step">
            <div class="tracking-circle">🎉</div>
            <div class="tracking-label">Delivered</div>
            <div class="tracking-time">3-5 days</div>
          </div>
        </div>
      </div>
      <div class="order-info">
        <h4>Order Status: <span class="status-badge pending">PENDING</span></h4>
        <p>Your order is confirmed. The admin will send an STK Push to <strong>${order.customerPhone}</strong> to complete payment.</p>
      </div>
      <button class="close-modal-btn" onclick="this.closest('.order-confirmation-modal').remove()">
        Continue Shopping
      </button>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => { if (modal.parentNode) modal.remove(); }, 10000);
}

searchButton.addEventListener("click", renderProducts);

function showCustomerForm(product, addButton) {
  const modal = document.createElement('div');
  modal.className = 'order-confirmation-modal';
  modal.innerHTML = `
    <div class="order-modal-content">
      <div class="order-header">
        <h2>Complete Your Order</h2>
        <p>Enter your details to place the order</p>
      </div>
      <div class="product-confirmation">
        <img src="${product.image}" alt="${product.name}" />
        <div>
          <h3>${product.name}</h3>
          <p class="order-price">${formatPrice(product.price)}</p>
          <p style="font-size:0.85rem;color:#6b7280">${product.category}</p>
        </div>
      </div>
      <form id="customerOrderForm" style="display:grid;gap:14px;margin-top:16px">
        <div class="form-field">
          <label style="display:block;margin-bottom:6px;font-weight:600">Full Name *</label>
          <input id="custName" type="text" placeholder="e.g. Jane Wanjiku" required
            style="width:100%;padding:12px;border:1px solid #d1d5db;border-radius:10px;font-size:1rem" />
        </div>
        <div class="form-field">
          <label style="display:block;margin-bottom:6px;font-weight:600">Phone Number *</label>
          <input id="custPhone" type="tel" placeholder="e.g. 0712345678" required
            style="width:100%;padding:12px;border:1px solid #d1d5db;border-radius:10px;font-size:1rem" />
        </div>
        <div class="form-field">
          <label style="display:block;margin-bottom:6px;font-weight:600">Email (optional)</label>
          <input id="custEmail" type="email" placeholder="e.g. jane@email.com"
            style="width:100%;padding:12px;border:1px solid #d1d5db;border-radius:10px;font-size:1rem" />
        </div>
        <div id="custFormError" style="color:#dc2626;font-size:0.9rem;display:none"></div>
        <button type="submit" class="primary-button" style="margin-top:4px">Confirm Order — ${formatPrice(product.price)}</button>
        <button type="button" class="secondary-button" onclick="this.closest('.order-confirmation-modal').remove()">Cancel</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector('#customerOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = modal.querySelector('#custName').value.trim();
    const phone = modal.querySelector('#custPhone').value.trim();
    const email = modal.querySelector('#custEmail').value.trim();
    const errEl = modal.querySelector('#custFormError');

    if (!name) { errEl.textContent = 'Please enter your name'; errEl.style.display = 'block'; return; }
    if (!phone || !/^(?:0|254|\+254)7\d{8}$/.test(phone.replace(/\s/g, ''))) {
      errEl.textContent = 'Please enter a valid Kenyan phone number'; errEl.style.display = 'block'; return;
    }

    const order = {
      id: 'ORD-' + Date.now(),
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      productCategory: product.category,
      price: product.price,
      total: product.price,
      customerName: name,
      customerPhone: phone,
      customerEmail: email || '',
      items: [{ name: product.name, price: product.price, quantity: 1, image: product.image }],
      status: 'pending',
      createdAt: new Date().toISOString(),
      date: new Date().toISOString(),
      shipmentStatus: 'order_confirmed'
    };

    const existingOrders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
    existingOrders.unshift(order);
    localStorage.setItem('customerOrders', JSON.stringify(existingOrders));

    modal.remove();
    showOrderConfirmation(order);

    cartTotal += 1;
    cartCount.textContent = cartTotal;
    addButton.textContent = 'Order Placed ✓';
    addButton.disabled = true;
  });
}


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

function filterByCategory(categoryName) {
  const categoryBtn = Array.from(document.querySelectorAll('.category-pill')).find(
    btn => btn.dataset.category === categoryName
  );
  if (categoryBtn) {
    setActiveCategory(categoryBtn);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.querySelector('input[type="email"]').value;
  alert(`Thank you for subscribing with ${email}! Check your inbox for exclusive offers.`);
  this.reset();
});

renderProducts();




