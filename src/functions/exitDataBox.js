"use strict";
const exitBtn = document.getElementById("exitButton");
const actionButtons = document.getElementById("actionButtons");
const qrImageInput = document.getElementById("qrImageInput");

function exitDataBox() {
  const contentBox = document.getElementById("contentBox");
  contentBox.classList.remove("show");

  actionButtons.classList.remove("hidden");

  qrImageInput.value = "";

  document.getElementById("heartRateValue").innerText = "0bps";
  document.getElementById("bloodOxygenValue").innerText = "0%";
  document.getElementById("bloodPressureValue").innerText = "0 mm/Hg";
  document.getElementById("temperatureValue").innerText = "0°C";
}

exitBtn.addEventListener("click", exitDataBox);
