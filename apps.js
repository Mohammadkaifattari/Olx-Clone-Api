fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((result) => product(result));

function product(result) {
  let { products } = result;
  let contain = document.getElementById("container"); 

  products.forEach((element) => {
    contain.innerHTML += `
      <div class="card">
        <div class="badge">HOT SALE</div>
        <div class="tilt">
          <div class="img">
            <img src="${element.thumbnail}" alt="${element.title}">
          </div>
        </div>
        <div class="info">
          <div class="cat">${element.category}</div>
          <h2 class="title">${element.title}</h2>
          <p class="desc">${element.description}</p>
          <div class="feats">
            <span class="feat">Brand: ${element.brand}</span>
            <span class="feat">Rating: ${element.rating}</span>
          </div>
          <div class="bottom">
            <div class="price">
              <span class="old">$${(element.price * 1.2).toFixed(2)}</span>
              <span class="new">$${element.price}</span>
            </div>
            <button class="btn">
              <span>Add to Cart</span>
            </button>
          </div>
          <div class="meta">
            <div class="stock">${element.stock > 0 ? "In Stock" : "Out of Stock"}</div>
          </div>
        </div>
      </div>`;
  });
}
