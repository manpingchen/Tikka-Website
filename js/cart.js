/* 開啟商品選項之商品Id */
let productIdForOptionsOverlay;

function handleAddToCart(element) {
  const productId = element.id.split("add-to-cart-")[1];
  const ifProductInCart = element.classList.contains("added");
  const ifProductCustomizable = document
    .getElementById(productId)
    .classList.contains("customizable");

  if (!ifProductInCart && !ifProductCustomizable) {
    handleShowComponent("#product-added-to-cart", "flex");
    updateCart(productId, 1);
  }

  if (ifProductCustomizable) {
    handleShowComponent("#product-options", "flex");
    productIdForOptionsOverlay = productId;
    document.getElementsByClassName("backdrop")[0].classList.add("gray");
  }
}

function checkOptionOverlayBtnDisableStatus() {
  const ifOptionsMissing = checkIfOptionsMissing();
  if (ifOptionsMissing) {
    document.querySelector("#product-options button.add-btn").classList.add("gray");
  } else {
    document.querySelector("#product-options button.add-btn").classList.remove("gray");
  }
}

function handleAddToCartWithOptions() {
  const valueInput = document.getElementsByClassName("quantity")[0];
  const options = [...document.querySelectorAll(".option-category")];
  const ifOptionsMissing = checkIfOptionsMissing();

  if (ifOptionsMissing) return handleShowComponent("#product-options-missing", "flex");

  const selectedOptions = options.reduce((obj, option) => {
    obj[option.id] = Array.from(option.querySelectorAll("li.selected")).map(({ id }) => id);
    return obj;
  }, {});

  updateCart(productIdForOptionsOverlay, valueInput.value, selectedOptions);
  handleHideComponent("#product-options");
}

function checkIfOptionsMissing() {
  const options = [...document.querySelectorAll(".option-category")];
  return options.find((option) => option.querySelectorAll("li.selected").length === 0);
}

function updateCart(productId, amount, options) {
  console.log("更新購物車：", { productId, amount, options });

  [...document.querySelectorAll(".cart-amount")].forEach((o) => {
    o.innerHTML = Number(o.innerHTML) + Number(amount);
  });

  productIdForOptionsOverlay = null;
  document.getElementById("add-to-cart-" + productId).classList.add("added");
}

function adjustQuantity(actionType) {
  const valueInput = document.getElementsByClassName("quantity")[0];
  let value = valueInput.value;
  let max = 7;
  if (value <= 6) {
    actionType === "add" ? value++ : value--;
    valueInput.value = value;
    document.getElementsByClassName("reduce")[0].disabled = value === 0 ? true : false;
    validQuantity(value, max);
  }
}

function validQuantity(value, max) {
  document.getElementsByClassName("quantity-reach-max")[0].style.display =
    value === max ? "block" : "none";
}

function toggleSelectOption(option) {
  const classList = option.classList;
  if (classList.contains("unavailable")) return;

  classList.contains("selected") ? classList.remove("selected") : classList.add("selected");
  checkOptionOverlayBtnDisableStatus();
}
