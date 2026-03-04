"use strict";
const exitBtn = document.getElementById("exitButton");

function exitDataBox() {
  const contentBox = document.getElementById("contentBox");
  contentBox.classList.remove("show");
  actionButtons.classList.remove("hidden");
}
exitBtn.addEventListener("click", exitDataBox);
