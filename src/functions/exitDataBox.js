"use strict";
import {
  actionButtons,
  contentBox,
  qrImageInput,
  exitBtn,
} from "./variables.js";

export function exitDataBox() {
  contentBox.classList.remove("show");

  actionButtons.classList.remove("hidden");

  qrImageInput.value = "";

  document.getElementById("heartRateValue").innerText = "0bps";
  document.getElementById("bloodOxygenValue").innerText = "0%";
  document.getElementById("bloodPressureValue").innerText = "0 mm/Hg";
  document.getElementById("temperatureValue").innerText = "0°C";

  document.getElementById("vitalAnalysis").innerHTML = "";
}

export function initExitButton() {
  exitBtn.addEventListener("click", exitDataBox);
}
