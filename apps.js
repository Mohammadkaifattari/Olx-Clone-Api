// Elements
const overlay = document.getElementById('overlay');
const loginLink = document.getElementById('loginLink');
const sellLink = document.getElementById('sellLink');
const closeBtn = document.getElementById('closeBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const sellPage = document.getElementById('sellPage');
const backBtn = document.getElementById('backBtn');
const logoutBtn = document.getElementById('logoutBtn');
const productList = document.getElementById('product-list');

let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let products = JSON.parse(localStorage.getItem('products')) || [];

// Handle Login Status
function updateUI() {
  if (currentUser) {
    loginLink.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  } else {
    loginLink.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
  }
}
updateUI();

// Open Login
loginLink.addEventListener('click', () => {
  overlay.style.display = 'flex';
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
});

// Close Modal
closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// Switch to Signup
showSignup.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
});

// Switch to Login
showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  signupForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Signup
signupBtn.addEventListener('click', () => {
  const user = {
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    email: document.getElementById('signupEmail').value.trim(),
    password: document.getElementById('signupPassword').value.trim(),
  };

  if (!user.firstName || !user.email || !user.password) {
    alert('Please fill all fields');
    return;
  }

  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  alert('Signup successful! Please login.');
  signupForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Login
loginBtn.addEventListener('click', () => {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert(`Welcome ${user.firstName}!`);
    overlay.style.display = 'none';
    updateUI();
  } else {
    alert('Invalid credentials');
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateUI();
  alert('You have logged out');
});

// SELL BUTTON
sellLink.addEventListener('click', () => {
  if (!currentUser) {
    overlay.style.display = 'flex';
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    return;
  }

  document.querySelector('main').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
  sellPage.style.display = 'block';

  sellPage.innerHTML = `
    <div class="sell-container">
      <button id="backBtn">← Back</button>
      <h2>List Your Product</h2>
      <form id="sellForm" class="sell-form">
        <input type="file" id="productImage" accept="image/*" required>
        <input type="text" id="productTitle" placeholder="Product Title" required>
        <input type="number" id="productPrice" placeholder="Price" required>
        <textarea id="productDescription" rows="4" placeholder="Description" required></textarea>
        <select id="productCategory" required>
          <option value="">Select Category</option>
          <option>Mobiles</option>
          <option>Vehicles</option>
          <option>Property</option>
          <option>Electronics</option>
          <option>Furniture</option>
        </select>
        <button type="submit">Add Product</button>
      </form>
    </div>
  `;

  // BACK BUTTON
  document.getElementById('backBtn').addEventListener('click', () => {
    sellPage.style.display = 'none';
    document.querySelector('main').style.display = 'block';
    document.querySelector('footer').style.display = 'block';
    renderProducts();
  });

  // FORM SUBMIT
  document.getElementById('sellForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const file = document.getElementById('productImage').files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const product = {
        id: Date.now(),
        title: document.getElementById('productTitle').value,
        price: document.getElementById('productPrice').value,
        description: document.getElementById('productDescription').value,
        category: document.getElementById('productCategory').value,
        image: event.target.result,
      };

      products.push(product);
      localStorage.setItem('products', JSON.stringify(products));
      alert('Product Added Successfully!');
      sellPage.style.display = 'none';
      document.querySelector('main').style.display = 'block';
      document.querySelector('footer').style.display = 'block';
      renderProducts();
    };
    reader.readAsDataURL(file);
  });
});

// Render Products Above Footer
function renderProducts() {
  const productList = document.getElementById('product-list');
  if (!productList) return;
  productList.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <div class="product-info">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <p class="price">PKR ${p.price}</p>
        <small>${p.category}</small>
      </div>
    `;
    productList.appendChild(card);
  });
}

renderProducts();
