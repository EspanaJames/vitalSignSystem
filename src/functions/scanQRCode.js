"use strict";
import { scanButton, contentBox } from "./variables.js";
export function initQRCodeScanner() {
  scanButton.addEventListener("click", async () => {
    const codeReader = new ZXing.BrowserQRCodeReader();

    try {
      const result = await codeReader.decodeOnceFromVideoDevice(
        undefined,
        "video",
      );

      const qrText = result.text;

      const parts = qrText.split(/[,;]/);
      parts.forEach((part) => {
        const p = part.trim();
        if (!p) return;
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

      contentBox.classList.add("show");
      codeReader.reset();
    } catch (err) {
      console.log("No QR detected or camera access denied", err);
    }
  });
}
