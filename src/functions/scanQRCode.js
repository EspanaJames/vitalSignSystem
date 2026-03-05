"use strict";

import { analyzeVitals } from "./analyzeVitals.js";

let codeReader = null;
let scanning = false;

export function initQRCodeScanner() {
  const scanButton = document.getElementById("scanButton");
  const video = document.getElementById("video");
  const vitals = document.querySelectorAll(".vital-sign");
  const contentBox = document.getElementById("contentBox");
  const exitButton = document.getElementById("exitButton");

  exitButton.addEventListener("click", () => {
    if (scanning && codeReader) {
      codeReader.reset();
    }
    scanning = false;
    video.style.display = "none";
    vitals.forEach((v) => v.classList.remove("hidden"));
    contentBox.classList.remove("show");
  });

  scanButton.addEventListener("click", async () => {
    if (scanning) return;
    scanning = true;

    contentBox.classList.add("show");
    vitals.forEach((v) => v.classList.add("hidden"));
    video.style.display = "block";

    codeReader = new ZXing.BrowserQRCodeReader(500);

    try {
      const devices = await codeReader.listVideoInputDevices();
      if (devices.length === 0) {
        alert("No camera found");
        scanning = false;
        return;
      }

      let selectedDeviceId = devices[0].deviceId;
      devices.forEach((device) => {
        const label = device.label.toLowerCase();
        if (
          label.includes("back") ||
          label.includes("rear") ||
          label.includes("environment")
        ) {
          selectedDeviceId = device.deviceId;
        }
      });

      console.log("Using camera:", selectedDeviceId);

      codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        "video",
        (result, err) => {
          if (result) {
            console.log("QR detected:", result.text);
            processQR(result.text);

            video.style.display = "none";
            vitals.forEach((v) => v.classList.remove("hidden"));

            analyzeVitals();

            codeReader.reset();
            scanning = false;
          } else if (err && !(err instanceof ZXing.NotFoundException)) {
            console.warn("QR decode warning:", err);
          } else {
            console.log("Scanning for QR code...");
          }
        },
      );
    } catch (error) {
      console.error("Camera error:", error);
      scanning = false;
    }
  });
}

function processQR(qrText) {
  const parts = qrText.split(/[,;]/);

  parts.forEach((part) => {
    const p = part.trim();
    const eq = p.indexOf("=");
    if (eq === -1) return;

    const key = p.substring(0, eq).trim().toLowerCase();
    const value = p.substring(eq + 1).trim();

    if (key.includes("heart rate"))
      document.getElementById("heartRateValue").innerText = value;
    else if (key.includes("oxygen"))
      document.getElementById("bloodOxygenValue").innerText = value;
    else if (key.includes("blood pressure"))
      document.getElementById("bloodPressureValue").innerText = value;
    else if (key.includes("temperature"))
      document.getElementById("temperatureValue").innerText = value;
  });
}
