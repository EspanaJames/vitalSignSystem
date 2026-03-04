"use strict";
const mainContent = document.getElementById("mainContent");
const scanBtn = document.getElementById("scanButton");
const uploadBtn = document.getElementById("uploadButton");

const actionButtons = document.getElementById("actionButtons");
const qrImageInput = document.getElementById("qrImageInput");
const contentBox = document.getElementById("contentBox");

scanButton.addEventListener("click", () => {
  actionButtons.classList.add("hidden");
  buttons;
});

uploadButton.addEventListener("click", () => {
  qrImageInput.click();
  actionButtons.classList.add("hidden");
});
function activateUI() {
  setTimeout(() => {
    contentBox.classList.add("show");
  }, 300);
}

scanBtn.addEventListener("click", activateUI);
uploadBtn.addEventListener("click", activateUI);
