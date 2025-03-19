/* 已選擇貼圖 */
let stickerSrcSelected;
let stickerSelected;

/* 已購買貼圖 */
let stickerAddedToMyStickers;

function resetSelectedSticker() {
  document
    .querySelectorAll(".sticker-item.selected")
    .forEach((node) => node.classList.remove("selected"));
}

function handleSelectSticker(selector) {
  // 先清除所有選擇狀態
  resetSelectedSticker();

  // 設定新選擇
  selector.classList.add("selected");
  stickerSrcSelected = selector.querySelector("img").src;
  stickerSelected = selector;
}

// 讓每個 sticker 都能觸發 handleSelectSticker
document.querySelectorAll(".sticker-item").forEach((item) => {
  item.addEventListener("click", function () {
    handleSelectSticker(this);
  });
});

function handlePurchaseSticker() {
  handleHideComponent(".sticker-overlay");
  document.getElementById("purchased-sticker-img").src = stickerSrcSelected;
  handleShowComponent("#sticker-purchased-overlay", "flex");
}

function addPurchasedStickerToMyStickerList(ifMobile = false) {
  const myStickerListElement = ifMobile
    ? document.getElementById("m-my-stickers-list")
    : document.getElementById("my-stickers-list");
  const allStickersListElement = ifMobile
    ? document.getElementById("m-all-stickers-list")
    : document.getElementById("all-stickers-list");

  // 確保有選擇貼圖
  if (!stickerSelected) {
    console.warn("尚未選擇貼圖！");
    return;
  }

  // 隱藏所有貼圖清單
  allStickersListElement.style.display = "none";

  // 複製貼圖
  stickerAddedToMyStickers = stickerSelected.cloneNode(true);

  // 確保 .value 存在才移除，避免錯誤
  const valueElement = stickerAddedToMyStickers.querySelector(".value");
  if (valueElement) {
    stickerAddedToMyStickers.removeChild(valueElement);
  }

  // 加入我的貼圖清單
  myStickerListElement.appendChild(stickerAddedToMyStickers);

  // 顯示我的貼圖清單
  if (ifMobile) {
    showStickersDetail("m-my-stickers", true);
  } else {
    showStickersDetail("my-stickers", false);
  }

  // 重置選擇的貼圖
  resetSelectedSticker();
}

/* 切換貼圖列表 */
function showStickersDetail(tabId, ifMobile) {
  [...document.querySelectorAll(".sticker-body")].map((node) => {
    node.style.display = "none";
  });

  setActiveStatus("stickers-details", tabId);
  const selector = "#" + tabId + "-list";
  handleShowComponent(selector, "grid");

  const buyButton = ifMobile
    ? document.querySelector(".sticker-footer #m-buy-button")
    : document.querySelector(".sticker-footer #buy-button");
  const sendButton = ifMobile
    ? document.querySelector(".sticker-footer #m-send-button")
    : document.querySelector(".sticker-footer #send-button");

  if (tabId === "my-stickers" || tabId === "m-my-stickers") {
    buyButton.style.display = "none";
    sendButton.style.display = "grid";
  } else {
    buyButton.style.display = "grid";
    sendButton.style.display = "none";
  }
}

/* 個人主播頁：加貼圖至對話框 */
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

/* 僅供桌面版直播頁：加貼圖至對話框 */
function addStickerToChat() {
  if (!stickerSelected) {
    console.warn("未選擇貼圖！");
    return;
  }

  // 取得選中的貼圖內的 <img>，確保正確複製
  let imgElement = stickerSelected.querySelector("img").cloneNode(true);

  if (!imgElement || !imgElement.src) {
    console.warn("貼圖圖片無效！");
    return;
  }

  ifChatNeedNewDate();

  const newElement = document.createElement("div");
  newElement.classList.add("chat-item", "sticker-content", "my-chat");

  const nameElement = document.createElement("span");
  nameElement.classList.add("chat-name");
  nameElement.innerHTML = "貼圖發送者：";

  const contentElement = document.createElement("span");
  contentElement.classList.add("chat-content");
  contentElement.appendChild(imgElement);

  newElement.appendChild(nameElement);
  newElement.appendChild(contentElement);

  document.querySelector(".chat-body").appendChild(newElement);
  locateScrollbar();

  // 先清除所有選擇狀態
  resetSelectedSticker();
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

  const chatBox = document.querySelector(".chat-body");
  return chatBox.appendChild(dateElement);
}
