// User database (stored in memory for demo purposes)
let users = [
  { username: "admin", password: "123", fullName: "Admin User", email: "admin@gmail.com" }
];

const products = [
  { name: "Fresh Apples", price: 50, category: "Fruits", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80" },
  { name: "Organic Bananas", price: 30, category: "Fruits", image: "https://m.media-amazon.com/images/I/414eAsDCbxL.jpg" },
  { name: "Fresh Milk", price: 60, category: "Dairy", image: "https://m.media-amazon.com/images/I/41yGvzAkqeL.jpg" },
  { name: "Whole Wheat Bread", price: 40, category: "Bakery", image: "https://assets.hyperpure.com/data/images/products/cfe05f4cfa01ed5dd51dffa9d48ef074.png" },
  { name: "Basmati Rice", price: 90, category: "Grains", image: "https://kohinoorindia.co.in/public/assets/frontend/images/blog-img1.webp" },
  { name: "Fresh Oranges", price: 45, category: "Fruits", image: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?auto=format&fit=crop&w=400&q=80" },
  { name: "Greek Yogurt", price: 55, category: "Dairy", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80" },
  { name: "Fresh Tomatoes", price: 35, category: "Vegetables", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=400&q=80" },
  { name: "Cheddar Cheese", price: 120, category: "Dairy", image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=400&q=80" },
  { name: "Fresh Carrots", price: 25, category: "Vegetables", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80" }
];

let cart = [];
let currentCategory = 'All';

function showRegister() {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("registerSection").style.display = "block";
  clearRegisterForm();
}

function showLogin() {
  document.getElementById("registerSection").style.display = "none";
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function clearRegisterForm() {
  document.getElementById("regFullName").value = "";
  document.getElementById("regEmail").value = "";
  document.getElementById("regUsername").value = "";
  document.getElementById("regPassword").value = "";
  document.getElementById("regConfirmPassword").value = "";
  document.getElementById("termsCheck").checked = false;
  document.getElementById("registerSuccess").style.display = "none";
  document.getElementById("registerError").style.display = "none";
}

function register() {
  const fullName = document.getElementById("regFullName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("regConfirmPassword").value;
  const termsChecked = document.getElementById("termsCheck").checked;

  const errorMsg = document.getElementById("registerError");
  const successMsg = document.getElementById("registerSuccess");

  errorMsg.style.display = "none";
  successMsg.style.display = "none";

  // Validation
  if (!fullName || !email || !username || !password || !confirmPassword) {
    errorMsg.textContent = "Please fill all fields!";
    errorMsg.style.display = "block";
    return;
  }

  if (!email.includes("@")) {
    errorMsg.textContent = "Please enter a valid email address!";
    errorMsg.style.display = "block";
    return;
  }

  if (password.length < 4) {
    errorMsg.textContent = "Password must be at least 4 characters!";
    errorMsg.style.display = "block";
    return;
  }

  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match!";
    errorMsg.style.display = "block";
    return;
  }

  if (!termsChecked) {
    errorMsg.textContent = "Please agree to Terms & Conditions!";
    errorMsg.style.display = "block";
    return;
  }

  // Check if username already exists
  if (users.find(u => u.username === username)) {
    errorMsg.textContent = "Username already exists!";
    errorMsg.style.display = "block";
    return;
  }

  // Check if email already exists
  if (users.find(u => u.email === email)) {
    errorMsg.textContent = "Email already registered!";
    errorMsg.style.display = "block";
    return;
  }

  // Register user
  users.push({
    username: username,
    password: password,
    fullName: fullName,
    email: email
  });

  successMsg.style.display = "block";
  
  // Redirect to login after 2 seconds
  setTimeout(() => {
    showLogin();
    document.getElementById("username").value = username;
    alert("🎉 Registration successful! You can now login with your credentials.");
  }, 2000);
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const foundUser = users.find(u => u.username === user && u.password === pass);

  if (foundUser) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("shopSection").style.display = "block";
    document.getElementById("userName").textContent = foundUser.fullName || user;
    loadProducts();
  } else {
    alert("Invalid credentials. Please try again or register a new account.");
  }
}

function logout() {
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("shopSection").style.display = "none";
  cart = [];
  updateCartDisplay();
}

function loadProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  const searchTerm = document.getElementById("searchBox").value.toLowerCase();

  products.forEach((product, index) => {
    if ((currentCategory === 'All' || product.category === currentCategory) &&
        (product.name.toLowerCase().includes(searchTerm))) {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <h3>${product.name}</h3>
          <div class="product-price">₹${product.price}</div>
          <button class="add-to-cart-btn" onclick="addToCart(${index})">Add to Cart</button>
        </div>
      `;
      productList.appendChild(div);
    }
  });
}

function filterByCategory(category) {
  currentCategory = category;
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  loadProducts();
}

function filterProducts() {
  loadProducts();
}

function addToCart(index) {
  const product = products[index];
  const existingItem = cart.find(item => item.name === product.name);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartDisplay();
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCartDisplay();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cartItems");
  const totalDisplay = document.getElementById("total");
  const cartCount = document.getElementById("cartCount");
  
  cartItems.innerHTML = "";
  let total = 0;
  let itemCount = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">🛒<br><br>Your cart is empty<br><br>Start shopping!</div>';
  } else {
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      itemCount += item.quantity;
      
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-price">₹${item.price} × ${item.quantity}</div>
        </div>
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${index})">🗑️</button>
      `;
      cartItems.appendChild(div);
    });
  }

  totalDisplay.textContent = total;
  cartCount.textContent = itemCount;
}

function toggleCart() {
  document.getElementById("cartSidebar").classList.toggle("open");
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const total = document.getElementById("total").textContent;
  alert("🎉 Thank you for shopping with FreshMart!\n\nYour order total: ₹" + total + "\n\nYour order will be delivered soon!");
  cart = [];
  updateCartDisplay();
  toggleCart();
}