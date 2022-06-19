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

function handleCloseComingSoon() {
  document.getElementById("coming-soon").style.display = "none";
}

/* 直播畫面 捧花不足開關 */

function handleOpenTopUp() {
  document.getElementById("top-up-overlay").style.display = "block";
}
function handleCloseTopUp() {
  document.getElementById("top-up-overlay").style.display = "none";
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

/* 直播畫面 手機版 禮物牆關閉 */
function handleCloseRewardOverlay() {
  document.getElementById("rewards-overlay-mobile").style.display = "none";
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
  document.getElementById("receiver-ranking").style.display = "block";
  document.getElementById("sender-ranking").style.display = "none";
  setActiveStatus("receiver-sender-tabs", "receiver-tab");
  switchCalendarRanking("receiver-day-btn", "receiver");
}
function openSenderRanking() {
  document.getElementById("receiver-ranking").style.display = "none";
  document.getElementById("sender-ranking").style.display = "block";
  setActiveStatus("receiver-sender-tabs", "sender-tab");
  switchCalendarRanking("sender-day-btn", "sender");
}

/* handle clear search value */
function handleClearSearchValue(event, el) {
  const element = el.parentNode.parentNode.querySelector("input");
  element.value = "";
}

/* 關閉分享Overlay */
function handleCloseShareOverlay() {
  document.getElementById("social-media-shares").style.display = "none";
}

function handleOpenShareOverlay() {
  document.getElementById("social-media-shares").style.display = "block";
}
