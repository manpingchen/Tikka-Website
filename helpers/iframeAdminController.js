function iframeDisplayController(ifHide) {
  const iframe = document.getElementById("giftAdmin");
  if (ifHide) {
    iframe.style.display = "none";
    iframe.style.position = "unset";
    iframe.style.zIndex = "unset";
  } else {
    iframe.style.display = "block";
    iframe.style.position = "absolute";
    iframe.style.zIndex = "9999";
  }
}
