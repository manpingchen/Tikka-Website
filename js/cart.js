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
    printOverlayOptions();
    productIdForOptionsOverlay = productId;
    document.getElementsByClassName("backdrop")[0].classList.add("gray");
  }
}

function printOverlayOptions() {
  productOptions.forEach(({ id, name, options }) => {
    /* 建立選項分類容器 div */
    const optionCateEle = document.createElement("div");
    optionCateEle.classList.add("option-category");
    optionCateEle.id = id;

    /* 建立選項名稱容器 h5 */
    const optionCateNameEle = document.createElement("h5");
    optionCateNameEle.innerHTML = name;
    optionCateEle.append(optionCateNameEle);

    /* 建立選項列表容器 ul, li */
    const optionListEle = document.createElement("ul");

    options.forEach(({ id, name, selected, unavailable, imgUrl }) => {
      const optionEle = document.createElement("li");
      optionEle.id = id;

      if (selected) optionEle.classList.add("selected");
      if (unavailable) {
        optionEle.classList.add("unavailable");
      } else {
        optionEle.onclick = function () {
          toggleSelectOption(optionEle);
        };
      }

      if (imgUrl) {
        const optionImgEle = document.createElement("span");
        optionImgEle.classList.add("option-img");
        optionImgEle.style.backgroundImage = "url(" + imgUrl + ")";
        optionEle.append(optionImgEle);
      }

      const optionNameEle = document.createElement("p");
      optionNameEle.innerText = name;
      optionEle.append(optionNameEle);

      optionListEle.append(optionEle);
    });
    optionCateEle.append(optionListEle);

    document.getElementsByClassName("options")[0].append(optionCateEle);
  });
}

function handleAddToCartWithOptions() {
  const valueInput = document.getElementsByClassName("quantity")[0];

  const options = [...document.querySelectorAll(".option-category")];
  const selectedOptions = options.reduce((obj, option) => {
    obj[option.id] = Array.from(option.querySelectorAll("li.selected")).map(({ id }) => id);
    return obj;
  }, {});
  updateCart(productIdForOptionsOverlay, valueInput.value, selectedOptions);
  handleHideComponent("#product-options");
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
}
