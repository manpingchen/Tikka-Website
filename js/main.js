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

/* 直播畫面 敬請期待關閉 */
function handleOpenComingSoon() {
  document.getElementById("coming-soon").style.display = "block";
}

/* 直播畫面 捧花不足開關 */

function handleOpenTopUp() {
  document.getElementById("top-up-overlay").style.display = "block";
}

/* 直播畫面 確保聊天視窗滾輪對齊最下方 */
function locateScrollbar() {
  const chatBody = document.querySelector(".chat-body");
  chatBody.scrollTop = chatBody.scrollHeight - chatBody.clientHeight;
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

  document.getElementById(activePanelId).style.display = "block";

  if (tabId.includes("revenue")) {
    document.getElementById("viewer-overlay-mobile").style.display = "none";
  }

  if (tabId.includes("viewer")) {
    document.getElementById("revenue-overlay-mobile").style.display = "none";
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

/* 日週月榜單切換 */
function switchCalendarRanking(activeElementId, rankingType) {
  setActiveStatus(`${rankingType}-calendar-btns`, activeElementId);
  if (activeElementId.includes("day")) {
    console.log(activeElementId, rankingType);
    if (rankingType === "sender") {
      new Glide("#sender-day-top-three-slides", slidesConfig).enable();
      new Glide("#sender-week-top-three-slides", slidesConfig).disable();
      new Glide("#sender-month-top-three-slides", slidesConfig).disable();
    } else {
      new Glide("#receiver-day-top-three-slides", slidesConfig).enable();
      new Glide("#receiver-week-top-three-slides", slidesConfig).disable();
      new Glide("#receiver-month-top-three-slides", slidesConfig).disable();
    }
    [...document.querySelectorAll(".day")].map((node) => (node.style.display = "block"));
    [...document.querySelectorAll(".month")].map((node) => (node.style.display = "none"));
    [...document.querySelectorAll(".week")].map((node) => (node.style.display = "none"));
  }
  if (activeElementId.includes("week")) {
    console.log(activeElementId, rankingType);
    if (rankingType === "sender") {
      new Glide("#sender-day-top-three-slides", slidesConfig).disable();
      new Glide("#sender-week-top-three-slides", slidesConfig).enable();
      new Glide("#sender-month-top-three-slides", slidesConfig).disable();
    } else {
      new Glide("#receiver-day-top-three-slides", slidesConfig).disable();
      new Glide("#receiver-week-top-three-slides", slidesConfig).enable();
      new Glide("#receiver-month-top-three-slides", slidesConfig).disable();
    }
    [...document.querySelectorAll(".day")].map((node) => (node.style.display = "none"));
    [...document.querySelectorAll(".week")].map((node) => (node.style.display = "block"));
    [...document.querySelectorAll(".month")].map((node) => (node.style.display = "none"));
  }
  if (activeElementId.includes("month")) {
    console.log(activeElementId, rankingType);
    if (rankingType === "sender") {
      new Glide("#sender-day-top-three-slides", slidesConfig).disable();
      new Glide("#sender-week-top-three-slides", slidesConfig).disable();
      new Glide("#sender-month-top-three-slides", slidesConfig).enable();
    } else {
      new Glide("#receiver-day-top-three-slides", slidesConfig).disable();
      new Glide("#receiver-week-top-three-slides", slidesConfig).disable();
      new Glide("#receiver-month-top-three-slides", slidesConfig).enable();
    }
    [...document.querySelectorAll(".day")].map((node) => (node.style.display = "none"));
    [...document.querySelectorAll(".week")].map((node) => (node.style.display = "none"));
    [...document.querySelectorAll(".month")].map((node) => (node.style.display = "block"));
  }
}

/* 榜單 收禮者與帶貨者 */
function openReceiverRanking() {
  handleCloseComponent("#sender-ranking");
  document.getElementById("receiver-ranking").style.display = "block";
  setActiveStatus("receiver-sender-tabs", "receiver-tab");
  switchCalendarRanking("receiver-day-btn", "receiver");
}
function openSenderRanking() {
  handleCloseComponent("#receiver-ranking");
  document.getElementById("sender-ranking").style.display = "block";
  setActiveStatus("receiver-sender-tabs", "sender-tab");
  switchCalendarRanking("sender-day-btn", "sender");
}

/* handle clear search value */
function handleClearSearchValue(event, el) {
  const element = el.parentNode.parentNode.querySelector("input");
  element.value = "";
}

function handleOpenShareOverlay() {
  document.getElementById("social-media-shares").style.display = "block";
}

/* 關閉元件 */
function handleCloseComponent(className) {
  document.querySelector(className).style.display = "none";
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
