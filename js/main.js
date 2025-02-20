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
  handleShowComponent("#receiver-ranking", "block", false);
  setActiveStatus("ranking-tabs", "receiver-tab");
  switchCalendarRanking("receiver-day-btn", "receiver");
}
function openSenderRanking() {
  handleHideComponent("#receiver-ranking");
  handleHideComponent("#event-ranking");
  handleShowComponent("#sender-ranking", "block", false);
  setActiveStatus("ranking-tabs", "sender-tab");
  switchCalendarRanking("sender-day-btn", "sender");
}
function openEventRanking() {
  handleHideComponent("#receiver-ranking");
  handleHideComponent("#sender-ranking");
  handleShowComponent("#event-ranking", "block", false);
  setActiveStatus("ranking-tabs", "event-tab");
  switchCalendarRanking("event-1-btn", "event");
}

/* handle clear search value */
function handleClearSearchValue(inputId) {
  const element = document.getElementById(inputId);
  element.value = "";
}

const searchInput = document.querySelector("#search-input");
const searchContainer = document.querySelector(".search-container");

if (searchInput && searchContainer) {
  searchInput.addEventListener("focus", () => {
    searchContainer.style.borderWidth = "3px";
  });

  searchInput.addEventListener("blur", () => {
    searchContainer.style.borderWidth = "1px";
  });
}

// 遮罩以外點擊
const backdrop = document.querySelector(".backdrop");
const overlays = document.querySelectorAll(".overlay:not(.not-close-by-backdrop)");
const body = document.querySelector("body");

if (backdrop) {
  backdrop.addEventListener("click", () => {
    [...overlays].forEach((node) => {
      overlayClose(node);
    });
    backdrop.style.display = "none";
    backdrop.classList.remove("gray");
    body.style["overflow-y"] = "auto";
  });
}

/* 遮罩關閉功能 */
function overlayClose(node) {
  const classList = node.classList;
  const isNormalOverlay = classList.contains("overlay") || classList.contains("info-only");
  const isSmallOverlay = classList.contains("small") && classList.contains("overlay");
  /* 先以滑動效果退場 */
  if (isNormalOverlay) {
    const fromRight = classList.contains("from-right");
    node.style.transform = fromRight ? "translate(100%, 0)" : "translate(0, 100%)";
  }
  if (isSmallOverlay) node.style.transform = "translate(0, 100vh)";

  /* 再移除顯示css display */
  setTimeout(() => {
    node.style.display = "none";
  }, 100);
}

/* 關閉元件 */
function handleHideComponent(selector, shouldHideBackdrop = true) {
  const node = document.querySelector(selector);
  if (!node) {
    console.error(`Element ${selector} not found.`);
    return;
  }

  overlayClose(node);

  if (shouldHideBackdrop) {
    document.body.style.overflow = "auto";
    backdrop.style.display = "none";
  }
}

/* 開啟元件 */
function handleShowComponent(selector, displayValue = "block", shouldBodyOverflowHidden = true) {
  const node = document.querySelector(selector);
  if (!node) {
    console.error(`Element ${selector} not found.`);
    return;
  }

  const classList = node.classList;
  const isNormalOverlay = classList.contains("overlay") || classList.contains("info-only");

  /* 先確保元件套用css display */
  node.style.display = displayValue;
  /* 再以滑動效果出場 */
  setTimeout(() => {
    if (isNormalOverlay) node.style.transform = "translate(0, 0)";
  }, 50);

  if (shouldBodyOverflowHidden) document.body.style.overflow = "hidden";

  /* 如果元件為遮罩，則同步開啟backdrop，做為關閉遮罩之點擊範圍 */
  setTimeout(() => {
    if (
      shouldBodyOverflowHidden &&
      classList.contains("overlay") &&
      !classList.contains("full-page")
    ) {
      handleShowComponent(".backdrop");
    }
  }, 150);
}

/* 切換 禮物牆 all 及 熱門 */
function showRewardDetail(id = "gift-all", parentId = "gift-details") {
  const data = () => {
    if (parentId.includes("gift-details")) {
      if (id.includes("gift-all")) return allGifts;
      if (id.includes("gift-popular")) return popularGifts;
      if (id.includes("gift-favourite")) return favouriteGifts;
      if (id.includes("gift-romantic")) return romanticGifts;
      if (id.includes("gift-vip")) return vipGifts;
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

  const ifProductWall = parentId === "product-details";
  const containerId = parentId.includes("mobile") ? "rewards-wall-mobile" : "rewards-wall";
  const containerElement = document.getElementById(containerId);
  containerElement.innerHTML = "";

  data().forEach((item, i) => {
    const newElement = document.createElement("div");
    newElement.classList.add("reward-item");
    if (ifProductWall) newElement.classList.add("product-item");
    newElement.id = data()[i].name + i;

    const imgWrapElement = document.createElement("div");
    imgWrapElement.classList.add("img-wrap");

    const imgElement = document.createElement("img");
    imgElement.src = data()[i].imgUrl;

    /* VIP禮物牆 會員儲值未滿20萬 加上鎖頭圖檔 */
    if (id.includes("gift-vip")) {
      const imgOverlayElement = document.createElement("img");
      imgOverlayElement.src = "images/lock.svg";
      imgOverlayElement.classList.add("lock");
      imgWrapElement.append(imgOverlayElement);

      imgElement.classList.add("locked");
    }

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

  /* 按鈕更新 */
  document.querySelectorAll(".buy-button").forEach((e) => {
    e.style.display = id.includes("gift-vip") ? "none" : "block";
  });
  document.querySelectorAll(".send-button").forEach((e) => {
    e.style.display = !id.includes("gift-vip") ? "none" : "block";
  });
}

/*點擊購買按鈕變色 及 (＊＊＊供示意：顯示 捧花不足遮罩 、 隱藏 送出之禮物）*/
function handleBuy(id) {
  document.getElementById(id).classList.add("active");

  // 先關閉任何開啟的遮罩
  handleHideComponent("#gift-sent");
  handleHideComponent("#gift-full-overlay");
  handleHideComponent(".rewards.overlay");

  // 開啟當次送出之禮物動畫
  setTimeout(() => {
    const ifProductListActive = document
      .querySelector("#reward-product")
      .classList.contains("active");

    const ifMobileProductListActive = document
      .querySelector("#reward-product-mobile")
      .classList.contains("active");

    if (ifProductListActive || ifMobileProductListActive) {
      handleShowComponent("#purchase-overlay", "block", true);
    }
    if (!ifProductListActive && !ifMobileProductListActive) {
      handleShowPurchaseAnimation();
    }
  }, 500);
}

/*點擊贈送禮物按鈕變色 ）*/
function handleSend(id, ifQualified = true) {
  document.getElementById(id).classList.add("active");

  // 先關閉任何開啟的遮罩
  handleHideComponent("#gift-sent");
  handleHideComponent("#gift-full-overlay");
  handleHideComponent(".rewards.overlay");

  if (!ifQualified) {
    handleShowComponent("#be-vip-overlay", "block", false);
  } else {
    // 開啟當次送出之禮物動畫
    setTimeout(() => {
      handleShowPurchaseAnimation();
    }, 500);
  }
}

/*呈現購買後動畫按鈕 (＊＊＊供示意）*/
function handleShowPurchaseAnimation() {
  handleHideComponent("#rewards-overlay-mobile");
  handleShowComponent("#gift-sent", "flex", false);
  handleShowComponent("#gift-full-overlay", "block", false);
  setTimeout(() => {
    handleHideComponent("#gift-sent");
  }, 5000);

  /*設計沒有做到滿版帖圖關閉的環節，先以10秒後關閉*/
  setTimeout(() => {
    handleHideComponent("#gift-full-overlay");
  }, 10000);
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

/*儲值方式, 捧花點擊變色*/
function handleOptionClick(id, parentId) {
  setActiveStatus(parentId, id);

  // 顯示發票資訊表單
  if (parentId === "invoice-types") {
    const activeElement = document.getElementById(id);
    const type = activeElement.innerText;

    handleShowComponent(".invoice-info-field", "block", false);
    const labelElement = document.querySelector(".invoice-info-field label");
    const tipElement = document.querySelector("#invoice-info-tips");

    switch (type) {
      case "電子發票":
        labelElement.innerHTML = "Email";
        handleHideComponent("#invoice-info-tips");
        break;
      case "愛心捐贈":
        labelElement.innerHTML = "愛心碼";
        handleShowComponent("#invoice-info-tips", "block", false);
        tipElement.innerHTML = "＊若為愛心捐贈電子發票，則無發退換貨。";

        break;
      case "統一編號":
        labelElement.innerHTML = type;
        handleHideComponent("#invoice-info-tips");
        break;
      case "載具條碼":
        labelElement.innerHTML = type;
        handleShowComponent("#invoice-info-tips", "block", false);
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

/* Like / Follow */

function handleFollow(element) {
  const innerText = element.querySelector(".follow-text")?.innerText;
  if (element.classList.contains("pink")) {
    if (innerText) innerText = "追蹤";
    element.classList.remove("pink");
  } else {
    element.classList.add("pink");
    if (innerText) innerText = "已追蹤";
  }
}

function handleFollowByFocusBtn(element) {
  const profileFollowEle = document.getElementById("streamer-profile-follow-icon");
  if (element.classList.contains("pink")) {
    element.classList.remove("pink");
    profileFollowEle.classList.remove("pink");
  } else {
    element.classList.add("pink");
    profileFollowEle.classList.add("pink");
  }
}

function handleLike(element) {
  if (element.classList.contains("pink")) {
    element.classList.remove("pink");
  } else {
    element.classList.add("pink");
  }
}

function handleLikeByPost(postId) {
  const element = document.getElementById(postId);
  const likeEle = element.querySelector(".like-button");

  if (likeEle.classList.contains("pink")) {
    likeEle.classList.remove("pink");
  } else {
    likeEle.classList.add("pink");
  }
}

function handleAddFavorite(element) {
  if (element.classList.contains("added")) {
    element.classList.remove("added");
  } else {
    element.classList.add("added");
  }
}

/* 點擊單一主播圖片，開啟新頁面 */
function handleLiveItemClick(target) {
  const ifOnLive = target.classList.value.includes("on");
  if (ifOnLive) {
    location.href = "live-on.html";
  }
  if (!ifOnLive) {
    location.href = "streamer-profile.html";
  }
}

//加入購物車 By 產品Id
function handleAddProductToCart(target) {
  const productId = target.parentNode.id;
  console.log({ productId });
}

///////////// 貼圖、對話相關功能 ///////////
/* 切換貼圖列表 */
function showStickersDetail(tabId, tabParentId) {
  [...document.querySelectorAll(".sticker-body")].map((node) => {
    node.style.display = "none";
  });

  setActiveStatus(tabParentId, tabId);
  const selector = "#" + tabId + "-list";
  handleShowComponent(selector, "grid");

  const buyButton = document.querySelector(".sticker-footer #buy-button");
  const sendButton = document.querySelector(".sticker-footer #send-button");

  if (tabId === "my-stickers") {
    buyButton.style.display = "none";
    sendButton.style.display = "block";
  } else {
    buyButton.style.display = "block";
    sendButton.style.display = "none";
  }
}

/* 加貼圖至對話框 */
function handleAddStickerToChat() {
  const imgElement = document.getElementsByClassName("selected-sticker")[0].outerHTML;

  if (imgElement) {
    ifChatNeedNewDate();

    const newElement = document.createElement("div");
    newElement.classList.add("chat-item", "sticker-content", "my-chat");

    const avatarElement = buildAvatar();

    const contentElement = document.createElement("span");
    contentElement.classList.add("chat-content");
    contentElement.innerHTML = imgElement;

    newElement.append(avatarElement);
    newElement.append(contentElement);

    document.getElementById("followers-chat-items").appendChild(newElement);
    handleHideComponent(".sticker-overlay");
    handleShowComponent("#followers-chat-overlay");
    locateScrollbar();
  }
}

/* 確認對話是否需加入日期分割元件 */
function ifChatNeedNewDate() {
  const allDates = document.querySelectorAll(".date-value");
  const datesArray = [...allDates];
  const date = new Date();
  const today = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();

  const isNewDate = datesArray.filter(({ innerText }) => innerText === today).length === 0;

  if (!isNewDate) return false;

  const dateElement = document.createElement("div");
  dateElement.classList.add("chat-date");
  const dateValueElement = document.createElement("p");
  dateValueElement.classList.add("date-value");
  dateValueElement.innerHTML = today;

  dateElement.append(dateValueElement);

  const chatBox = document.querySelector("#followers-chat-overlay .chat-body");
  return chatBox.appendChild(dateElement);
}

/* 建立Avatar */
function buildAvatar() {
  const avatarElement = document.createElement("div");
  avatarElement.classList.add("avatar-wrapper");

  const avatarImgElement = document.createElement("img");
  avatarImgElement.classList.add("avatar");
  avatarImgElement.src = "images/s2.jpg";

  avatarElement.append(avatarImgElement);
  return avatarElement;
}

/* 競賽內容遮罩展開 */
function handleShowCompetitionDetail(competitionId, overlayClassName) {
  handleShowComponent(overlayClassName);
  document.querySelector(overlayClassName).dataset.id = competitionId;
}

function scrollToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
