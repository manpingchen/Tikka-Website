/* 設定Active樣式，取消其他Active Class */
function setActiveStatus(parentId, activeElementId) {
  const activeElement = document.getElementById(activeElementId);
  const prevSelected = document.getElementById(parentId).getElementsByClassName("active")[0];
  if (prevSelected && prevSelected !== activeElement) {
    prevSelected.classList.remove("active");
  }
  activeElement.classList.add("active");
}

/* 直播畫面 對話貼圖區塊控制 */
function handleOpenStickerPanel() {
  document.getElementById("sticker-panel").classList.add("show-from-left-side");
}
function handleCloseStickerPanel() {
  document.getElementById("sticker-panel").classList.remove("show-from-left-side");
}

/* 直播畫面 確保聊天視窗滾輪對齊最下方 */
function locateScrollbar() {
  const allChatBody = document.querySelectorAll(".chat-body");
  [...allChatBody].forEach((node) => {
    node.scrollTop = node.scrollHeight - node.clientHeight;
  });
}

/* 直播畫面 禮物牆標題切換 */
function handleRewardTitleClick(id, parentId = "reward-title-buttons") {
  /* 更新Active樣式 */
  setActiveStatus(parentId, id);
  /* 更新子選單顯示 */

  if (id === "reward-gift") {
    document.getElementById("gift-details").style.display = "flex";
    document.getElementById("product-details").style.display = "none";
    document.getElementById("box-details").style.display = "none";
    showRewardDetail("gift-all", "gift-details");
  }

  if (id === "reward-product") {
    document.getElementById("product-details").style.display = "flex";
    document.getElementById("gift-details").style.display = "none";
    document.getElementById("box-details").style.display = "none";
    showRewardDetail("product-all", "product-details");
  }

  if (id === "reward-box") {
    document.getElementById("box-details").style.display = "flex";
    document.getElementById("product-details").style.display = "none";
    document.getElementById("gift-details").style.display = "none";
    showRewardDetail("box-all", "box-details");
  }

  /* MOBILE */
  if (id === "reward-gift-mobile") {
    document.getElementById("gift-details-mobile").style.display = "flex";
    document.getElementById("product-details-mobile").style.display = "none";
    document.getElementById("box-details-mobile").style.display = "none";
    showRewardDetail("gift-all-mobile", "gift-details-mobile");
  }

  if (id === "reward-product-mobile") {
    document.getElementById("product-details-mobile").style.display = "flex";
    document.getElementById("gift-details-mobile").style.display = "none";
    document.getElementById("box-details-mobile").style.display = "none";
    showRewardDetail("product-all-mobile", "product-details-mobile");
  }

  if (id === "reward-box-mobile") {
    document.getElementById("box-details-mobile").style.display = "flex";
    document.getElementById("product-details-mobile").style.display = "none";
    document.getElementById("gift-details-mobile").style.display = "none";
    showRewardDetail("box-all-mobile", "box-details-mobile");
  }
}

/* 直播畫面 網頁版 當日營收樣式 */
function handleSwitchRevenue(parentId, activeElementId) {
  setActiveStatus(parentId, activeElementId);

  const badgeElements = document.querySelectorAll("#slides-revenue .badge");

  for (var i = 0, all = badgeElements.length; i < all; i++) {
    if (activeElementId === "vip-btn") {
      badgeElements[i].classList.add("vip");
    } else {
      badgeElements[i].classList.remove("vip");
    }
  }
}

/* 直播畫面 手機版 當日營收 */
function handleOpenMobileRevenueViewerPanel(tabId, activePanelId) {
  if (window.innerWidth >= 1201) {
    return;
  }
  setActiveStatus("revenue-viewer-tabs", tabId);
  handleShowComponent(`#${activePanelId}`);

  if (tabId.includes("revenue")) {
    handleHideComponent("#viewer-overlay-mobile");
  }

  if (tabId.includes("viewer")) {
    handleHideComponent("#revenue-overlay-mobile");
  }
}

/* 直播畫面 手機版 誰來觀看關閉 */
function handleCloseViewerOverlay() {
  document.getElementById("viewer-overlay-mobile").style.display = "none";
  document.getElementById("viewer-tab").classList.remove("active");
}

/* 直播畫面 手機版 當日營收關閉 */
function handleCloseRevenueOverlay() {
  document.getElementById("revenue-overlay-mobile").style.display = "none";
  document.getElementById("revenue-tab").classList.remove("active");
}

/* 榜單切換 */
function switchCalendarRanking(activeElementId, rankingType) {
  setActiveStatus(`${rankingType}-calendar-btns`, activeElementId);

  // Reset All Glide
  [".sender.glide", ".receiver.glide", ".event.glide"].forEach((selector) => {
    new Glide(selector, slidesConfig).disable();
  });

  if (!activeElementId.includes("event")) {
    if (activeElementId.includes("day")) {
      new Glide(`#${rankingType}-day-top-three-slides`, slidesConfig).enable();
      [...document.querySelectorAll(".day")].map((node) => (node.style.display = "block"));
      [...document.querySelectorAll(".month"), ...document.querySelectorAll(".week")].map(
        (node) => (node.style.display = "none")
      );
    }

    if (activeElementId.includes("week")) {
      new Glide(`#${rankingType}-week-top-three-slides`, slidesConfig).enable();
      [...document.querySelectorAll(".day"), ...document.querySelectorAll(".month")].map(
        (node) => (node.style.display = "none")
      );
      [...document.querySelectorAll(".week")].map((node) => (node.style.display = "block"));
    }

    if (activeElementId.includes("month")) {
      new Glide(`#${rankingType}-month-top-three-slides`, slidesConfig).enable();
      [...document.querySelectorAll(".day"), ...document.querySelectorAll(".week")].map(
        (node) => (node.style.display = "none")
      );
      [...document.querySelectorAll(".month")].map((node) => (node.style.display = "block"));
    }
  } else {
    const eventId = activeElementId.split("-btn")[0];
    const activeSlidesId = eventId + "-top-three-slides";

    [...document.querySelectorAll(`.glide:not(.${eventId})`)].map((node) => {
      node.style.display = "none";
    });

    [...document.querySelectorAll(`.recommend-items:not(.${eventId})`)].map((node) => {
      node.style.display = "none";
    });

    new Glide(activeSlidesId, slidesConfig).enable();
    [...document.querySelectorAll(`.event-ranking .${eventId}`)].map(
      (node) => (node.style.display = "block")
    );
  }
}

/* 榜單 收禮者與帶貨者 */
function openReceiverRanking() {
  handleHideComponent("#sender-ranking");
  handleHideComponent("#event-ranking");
  handleShowComponent("#receiver-ranking");
  setActiveStatus("ranking-tabs", "receiver-tab");
  switchCalendarRanking("receiver-day-btn", "receiver");
}
function openSenderRanking() {
  handleHideComponent("#receiver-ranking");
  handleHideComponent("#event-ranking");
  handleShowComponent("#sender-ranking");
  setActiveStatus("ranking-tabs", "sender-tab");
  switchCalendarRanking("sender-day-btn", "sender");
}
function openEventRanking() {
  handleHideComponent("#receiver-ranking");
  handleHideComponent("#sender-ranking");
  handleShowComponent("#event-ranking");
  setActiveStatus("ranking-tabs", "event-tab");
  switchCalendarRanking("event-1-btn", "event");
}

/* handle clear search value */
function handleClearSearchValue(event, el) {
  const element = el.parentNode.parentNode.querySelector("input");
  element.value = "";
}

/* 關閉元件 */
function handleHideComponent(className) {
  document.querySelector(className).style.display = "none";
}

/* 開啟元件 */
function handleShowComponent(selector, displayValue = "block") {
  const node = document.querySelector(selector);
  node.style.display = displayValue;

  /* 如果元件為遮罩，則同步開啟backdrop，做為關閉遮罩之點擊範圍 */
  if (node?.classList.contains("overlay")) {
    handleShowComponent(".backdrop");
  }
}

/* 切換 禮物牆 all 及 熱門 */
function showRewardDetail(id = "gift-all", parentId = "gift-details") {
  const data = () => {
    if (parentId.includes("gift-details")) {
      if (id.includes("gift-all")) return allGifts;
      if (id.includes("gift-popular")) return popularGifts;
      if (id.includes("gift-favourite")) return favouriteGifts;
      if (id.includes("gift-romantic")) return romanticGifts;
    }
    if (parentId.includes("product-details")) {
      if (id.includes("product-all")) return allProducts;
      if (id.includes("product-popular")) return popularProducts;
    }
    if (parentId.includes("box-details")) {
      return boxGifts;
    }
  };

  setActiveStatus(parentId, id);

  const containerId = parentId.includes("mobile") ? "rewards-wall-mobile" : "rewards-wall";
  const containerElement = document.getElementById(containerId);
  containerElement.innerHTML = "";

  data().forEach((item, i) => {
    const newElement = document.createElement("div");
    newElement.classList.add("reward-item");
    newElement.id = data()[i].name + i;

    const imgWrapElement = document.createElement("div");
    imgWrapElement.classList.add("img-wrap");

    const imgElement = document.createElement("img");
    imgElement.src = data()[i].imgUrl;
    const pointElement = document.createElement("span");
    pointElement.innerText = data()[i].value;

    const nameElement = document.createElement("span");
    nameElement.innerText = data()[i].name;

    pointElement.classList.add("point", "flex-row");
    nameElement.classList.add("name", "flex-row");

    imgWrapElement.append(imgElement);
    newElement.append(imgWrapElement, nameElement, pointElement);
    newElement.onclick = function () {
      setActiveStatus(containerId, newElement.id);
    };
    containerElement.appendChild(newElement);
  });
}

/*點擊購買按鈕變色 及 (＊＊＊供示意：顯示 捧花不足遮罩 、 隱藏 送出之禮物）*/
function handleBuy(id) {
  document.getElementById(id).classList.add("active");
  handleHideComponent("#gift-sent");
  handleHideComponent("#gift-full-overlay");
  handleHideComponent(".rewards.overlay");
  // handleShowComponent("#top-up-overlay");
  handleShowComponent("#purchase-overlay");
}

function stopGlidesOnMobile(slideElement) {
  if (window.innerWidth >= 769) {
    return;
  }
  slideElement.destroy();
}

function makeEleGraggable(selector) {
  const slider = document.querySelector(selector);
  slider.style.touchAction = "initial";
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });
}

function addOneItemToCart(itemId) {
  document.querySelector(`#${itemId} input[type="number"]`).value++;
}

function removeOneItemToCart(itemId) {
  if (Number(document.querySelector(`#${itemId} input[type="number"]`).value) === 0) {
    return;
  }
  document.querySelector(`#${itemId} input[type="number"]`).value--;
}

// 遮罩以外點擊

const backdrop = document.querySelector(".backdrop");
const overlays = document.querySelectorAll(".overlay:not(.full-page)");

backdrop.addEventListener("click", () => {
  [...overlays].forEach((node) => (node.style.display = "none"));
  backdrop.style.display = "none";
});


/*儲值方式, 捧花點擊變色*/
function handleOptionClick(id, parentId) {
  setActiveStatus(parentId, id);

  // 顯示發票資訊表單
  if (parentId === "invoice-types") {
    const activeElement = document.getElementById(id);
    const type = activeElement.innerText;

    handleShowComponent(".invoice-info-field");
    const labelElement = document.querySelector(".invoice-info-field label");
    const tipElement = document.querySelector("#invoice-info-tips");

    switch (type) {
      case "電子發票":
        labelElement.innerHTML = "Email";
        handleHideComponent("#invoice-info-tips");
        break;
      case "愛心捐贈":
        labelElement.innerHTML = "愛心碼";
        handleShowComponent("#invoice-info-tips");
        tipElement.innerHTML = "＊若為愛心捐贈電子發票，則無發退換貨。";

        break;
      case "統一編號":
        labelElement.innerHTML = type;
        handleHideComponent("#invoice-info-tips");
        break;
      case "載具條碼":
        labelElement.innerHTML = type;
        handleShowComponent("#invoice-info-tips");
        tipElement.innerHTML = "＊若使用載具發票，請在輸入文字最前方加入／*";
        break;
      default:
        break;
    }
  }
}

/* 結帳方式切換 */
function switchTotalByCurrency(id, parentId) {
  setActiveStatus(parentId, id);
  const pointValue = "9,999";
  const ntDollarValue = "1800";
  document.querySelector("#total-value").innerHTML =
    id === "nt-dollar" ? "NT." + ntDollarValue : pointValue;
}