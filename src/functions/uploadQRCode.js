"use strict";
import { uploadButton, qrImageInput, contentBox } from "./variables.js";
import { showDataBox } from "./showDataBox.js";
import { analyzeVitals } from "./analyzeVitals.js";
export function initFileUploader() {
  uploadButton.addEventListener("click", () => qrImageInput.click());
  qrImageInput.addEventListener("change", async function () {
    const file = this.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.style.display = "none";
    document.body.appendChild(img);

    img.onload = async function () {
      const codeReader = new ZXing.BrowserQRCodeReader();

      const maxSize = 1200;
      if (img.width > maxSize || img.height > maxSize) {
        const scale = maxSize / Math.max(img.width, img.height);
        img.width *= scale;
        img.height *= scale;
      }

      try {
        const result = await codeReader.decodeFromImageElement(img);
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

        showDataBox();
        analyzeVitals();
      } catch (err) {
        contentBox.textContent = "No QR code found in this image.";
        contentBox.classList.add("show");
      } finally {
        document.body.removeChild(img);
      }
    };
  });
}
