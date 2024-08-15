/* 開啟商品選項之商品Id */
let productIdForOptionsOverlay;
const productQuantityInput = document.querySelector("form .quantity");
let productQuantity;
if (productQuantityInput) {
  productQuantity = Number(productQuantityInput.value);
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
    productIdForOptionsOverlay = productId;
    printOverlayOptions();
    document.getElementsByClassName("backdrop")[0].classList.add("gray");
  }
}

function printOverlayOptions(ifFromProductDetailPage = false, productDataFromImgClick) {
  const containerEle = document.querySelector("#product-options .options");
  /* 清除原先畫面，避免下方重複繪製 */
  containerEle.innerHTML = null;

  /* 商品狀態、價格與庫存可在此更新 */
  if (productDataFromImgClick) {
    console.log({ productDataFromImgClick });
    document.querySelector("#product-options .price .discount").innerText =
      "NT$" + productDataFromImgClick.discountPrice;
    document.querySelector("#product-options .price .original").innerText =
      "NT$" + productDataFromImgClick.originalPrice;
    document.querySelector("#product-options .stocking").innerText =
      "庫存數量：" + productDataFromImgClick.stock;
    document.querySelector("#product-options form").name = productDataFromImgClick.productId;
    document.querySelector("#product-options form input.quantity").max =
      productDataFromImgClick.stock;
  }

  /* 商品選項在此更新，Demo假資料為 productOptions 於 fakeData.js  */
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
    containerEle.append(optionCateEle);
  });

  /* 同步 遮罩內數量調整按鈕 與 遮罩外數量調整按鈕 */
  if (ifFromProductDetailPage) {
    document.querySelector("#product-options input.quantity").name = productIdForOptionsOverlay;
  }

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

/* 此為在'遮罩內'選擇商品選項後，加入購物車之功能 */
function handleAddToCartViaProductOptionOverlay() {
  const valueInput = document.querySelector("input.quantity");
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

function updateCart(productId, amount, options, addFromProductCard = true) {
  console.log("更新購物車：", { productId, amount, options });

  [...document.querySelectorAll(".cart-amount")].forEach((o) => {
    o.innerHTML = Number(o.innerHTML) + Number(amount);
  });

  productIdForOptionsOverlay = null;
  if (addFromProductCard)
    document.getElementById("add-to-cart-" + productId).classList.add("added");
}

function adjustQuantity(actionType, isAdjustInOverlay = true) {
  actionType === "add" ? productQuantity++ : productQuantity--;
  productQuantityInput.value = productQuantity;

  const max = Number(productQuantityInput.max);

  document.getElementsByClassName("reduce")[0].disabled = productQuantity === 1 ? true : false;
  document.getElementsByClassName("add")[0].disabled = productQuantity === max ? true : false;

  if (isAdjustInOverlay) checkOptionOverlayBtnDisableStatus();

  validQuantity(max);
}

function toggleSelectOption(option) {
  const classList = option.classList;
  if (classList.contains("unavailable")) return;

  classList.contains("selected") ? classList.remove("selected") : classList.add("selected");
  checkOptionOverlayBtnDisableStatus();
}

function validQuantity(max) {
  document.getElementsByClassName("quantity-reach-max")[0].style.display =
    productQuantity === max ? "block" : "none";
}

/* 商品介紹頁使用，Demo用之假資料 fakeData.js 中 fakeProductOptionsData */
function handleUpdateDetail(imgEle) {
  productQuantity = 1;

  const imgId = imgEle.id;
  const productId = fakeProductOptionsData.find(({ id }) => imgId === id).productId;
  const name = fakeProductOptionsData.find(({ id }) => imgId === id).name;
  const originalPrice = fakeProductOptionsData.find(({ id }) => imgId === id).originalPrice;
  const discountPrice = fakeProductOptionsData.find(({ id }) => imgId === id).discountPrice;
  const stock = fakeProductOptionsData.find(({ id }) => imgId === id).stock;
  const sold = fakeProductOptionsData.find(({ id }) => imgId === id).sold;
  const ifSoldOut = Number(stock) === 0;
  const ifCustomizable = fakeProductOptionsData.find(({ id }) => imgId === id).customizable;

  /* 商品文字顯示更新 */
  const summeryEle = document.querySelector(".summary");
  summeryEle.id = productId;
  ifCustomizable
    ? summeryEle.classList.add("customizable")
    : summeryEle.classList.remove("customizable");
  document.querySelector(".summary h3").innerText = name;
  document.querySelector(".summary .price .original").innerText = "NT$" + originalPrice;
  document.querySelector(".summary .price .discount").innerText = "NT$" + discountPrice;
  document.querySelector(".stock .value").innerText = stock;
  document.querySelector(".sold .value").innerText = sold;
  document.querySelector("form").name = productId;

  /* 數量狀態同步 */
  document.querySelector(".adjustment input.quantity").max = stock;
  document.querySelectorAll(".adjustment input.quantity").forEach((node) => {
    console.log(node.value);
    node.value = ifSoldOut ? 0 : 1;
  });
  document.querySelector(".adjustment button.add").disabled = ifSoldOut || Number(stock) === 1;
  document.querySelector(".adjustment button.reduce").disabled = true;

  document.querySelector(".quantity-reach-max").style.display = "none";
  document.querySelector(".sold-out-text").style.display = ifSoldOut ? "block" : "none";
  if (ifSoldOut) {
    document.querySelector("main.product-detail").classList.add("sold-out");
  } else {
    document.querySelector("main.product-detail").classList.remove("sold-out");
  }
}

function handleAddToCartInProductDetailSummary({ ifBuyNow = false }) {
  const id = document.querySelector(".summary").id;
  const productDataFromImgClick = fakeProductOptionsData.find(({ productId }) => productId === id);
  const ifProductCustomizable = document
    .querySelector(".summary")
    .classList.contains("customizable");

  if (!ifProductCustomizable) {
    handleShowComponent("#product-added-to-cart", "flex");
    updateCart(id, 1, null, false);

    if (ifBuyNow) {
      window.location.href = "purchase.html";
    }
  }

  if (ifProductCustomizable) {
    handleShowComponent("#product-options", "flex");
    productIdForOptionsOverlay = id;
    printOverlayOptions(true, productDataFromImgClick);

    document
      .querySelectorAll(`form[name="${productIdForOptionsOverlay}"] input.quantity`)
      .forEach((node) => {
        node.value = productQuantity;
      });
    document.getElementsByClassName("backdrop")[0].classList.add("gray");
  }
}

function adjustQuantityInProductDetailPageOverlay(actionType) {
  actionType === "add" ? productQuantity++ : productQuantity--;

  document
    .querySelectorAll(`form[name="${productIdForOptionsOverlay}"] input.quantity`)
    .forEach((node) => {
      node.value = productQuantity;
    });

  const max = Number(productQuantityInput.max);

  document
    .querySelectorAll(`form[name="${productIdForOptionsOverlay}"] button.reduce`)
    .forEach((node) => {
      node.disabled = productQuantity === 0 ? true : false;
    });
  document
    .querySelectorAll(`form[name="${productIdForOptionsOverlay}"] button.add`)
    .forEach((node) => {
      node.disabled = productQuantity === max ? true : false;
    });

  checkOptionOverlayBtnDisableStatus();

  document
    .querySelectorAll(`form[name="${productIdForOptionsOverlay}"] .quantity-reach-max`)
    .forEach((node) => {
      node.style.display = productQuantity === max ? "block" : "none";
    });
}

/* 購物車所有商品 */

function adjustQuantityFromCart(element, actionType) {
  const itemId = element.closest(".cart-item").id;
  const selectorName = `form[name="${itemId}"]`;
  const productQuantityInput = document.querySelector(`${selectorName} input.quantity`);
  const value = actionType === "add" ? productQuantityInput.value++ : productQuantityInput.value--;
  const max = Number(productQuantityInput.max);

  document.querySelector(`${selectorName} button.reduce`).disabled = value === 1 ? true : false;
  document.querySelector(`${selectorName} button.add`).disabled = value === max - 1 ? true : false;
  document.querySelector(`${selectorName} .quantity-reach-max`).innerText =
    value === max - 1 ? "已達購買上限" : "";
}
