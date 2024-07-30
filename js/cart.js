function handleAddToCart(element) {
  if (!element.classList.contains("added")) {
    element.classList.add("added");
    const productId = element.id.split("add-to-cart-")[1];
    const ifProductCustomizable = document
      .getElementById(productId)
      .classList.contains("customizable");
    console.log(ifProductCustomizable);
    if (ifProductCustomizable) {
      console.log("open OPTIONS overlay");
    } else {
      console.log("open ADDED overlay");

      /* update cart*/
      updateCart(productId, 1);
    }
  }
}

function updateCart(productId, amount) {
  console.log("更新購物車：", { productId, amount });

  [...document.querySelectorAll(".cart-amount")].forEach((o) => {
    o.innerHTML = Number(o.innerHTML) + amount;
  });
}
