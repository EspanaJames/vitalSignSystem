"use strict";
const mainContent = document.getElementById("mainContent");
const scanBtn = document.getElementById("scanButton");
const uploadBtn = document.getElementById("uploadButton");
const contentBox = document.getElementById("contentBox");

function activateUI() {
  setTimeout(() => {
    contentBox.classList.add("show");
  }, 300);
}

scanBtn.addEventListener("click", activateUI);
uploadBtn.addEventListener("click", activateUI);
