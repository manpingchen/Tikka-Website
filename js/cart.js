function handleAddToCart(element) {
  const ifProductInCart = element.classList.contains("added");
  const productId = element.id.split("add-to-cart-")[1];
  const ifProductCustomizable = document
    .getElementById(productId)
    .classList.contains("customizable");

  if (!ifProductInCart) {
    element.classList.add("added");

    if (ifProductCustomizable) {
      handleShowComponent("#product-options", "flex");
      document.getElementsByClassName("backdrop")[0].classList.add("gray");
    } else {
      handleShowComponent("#product-added-to-cart", "flex");
      /* update cart*/
      updateCart(productId, 1);
    }
  }

  if (ifProductInCart && ifProductCustomizable) {
    handleShowComponent("#product-options", "flex");
    document.getElementsByClassName("backdrop")[0].classList.add("gray");
  }
}

function updateCart(productId, amount) {
  console.log("更新購物車：", { productId, amount });

  [...document.querySelectorAll(".cart-amount")].forEach((o) => {
    o.innerHTML = Number(o.innerHTML) + amount;
  });
}

function adjustQuantity(actionType) {
  const valueInput = document.getElementsByClassName("quantity")[0];
  let value = valueInput.value;
  let max = 7;
  actionType === "add" ? value++ : value--;
  valueInput.value = value;

  document.getElementsByClassName("reduce")[0].disabled = value === 0 ? true : false;
  validQuantity(value, max);
}

function validQuantity(value, max) {
  document.getElementsByClassName("quantity-reach-max")[0].style.display =
    value === max ? "block" : "none";
}
