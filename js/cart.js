/* 開啟商品選項之商品Id */
let productIdForOptionsOverlay;
const productQuantityInput = document.getElementsByClassName("quantity")[0];
let productQuantity;
if (productQuantityInput) {
  productQuantity = productQuantityInput.value;
}

function handleAddToCart(element) {
  const productId = element.id.split("add-to-cart-")[1];
  const ifProductInCart = element.classList.contains("added");
  const ifProductCustomizable = document
    .getElementById(productId)
    .classList.contains("customizable");

  document.getElementsByClassName("backdrop")[0].classList.remove("gray");

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
  /* 清除原先畫面，避免下方重複繪製 */
  document.getElementsByClassName("options")[0].innerHTML = null;

  /* productOptions 於 fakeData.js  */
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

    /* 選項文字排列 */
    const sortedOptions = sortByLength(options, "name");

    sortedOptions.forEach(({ id, name, selected, unavailable, imgUrl }) => {
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

  /* 決定加入購物車按鈕是否disabled */
  checkOptionOverlayBtnDisableStatus();
}

function checkOptionOverlayBtnDisableStatus() {
  const ifOptionsMissing = checkIfOptionsMissing();
  if (ifOptionsMissing || productQuantity === 0) {
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
  let max = 7;

  actionType === "add" ? productQuantity++ : productQuantity--;
  productQuantityInput.value = productQuantity;

  document.getElementsByClassName("reduce")[0].disabled = productQuantity === 0 ? true : false;
  document.getElementsByClassName("add")[0].disabled = productQuantity === max ? true : false;

  checkOptionOverlayBtnDisableStatus();
  validQuantity(max);
}

function validQuantity(max) {
  document.getElementsByClassName("quantity-reach-max")[0].style.display =
    productQuantity === max ? "block" : "none";
}

function toggleSelectOption(option) {
  const classList = option.classList;
  if (classList.contains("unavailable")) return;

  classList.contains("selected") ? classList.remove("selected") : classList.add("selected");
  checkOptionOverlayBtnDisableStatus();
}
