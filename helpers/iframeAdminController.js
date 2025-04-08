function iframeDisplayController(ifHide) {
  const iframe = document.getElementById("giftAdmin");
  if (ifHide) {
    iframe.style.display = "none";
  } else {
    iframe.style.display = "block";
    iframe.style.position = "absolute";
    iframe.style.zIndex = "9999";
  }
}
