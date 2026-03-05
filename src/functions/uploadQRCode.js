"use strict";

const uploadButton = document.getElementById("uploadButton");
const qrInput = document.getElementById("qrImageInput");
const canvas = document.getElementById("qrCanvas");
const ctx = canvas.getContext("2d");
const contentBox = document.getElementById("contentBox");

// Trigger file selection
uploadButton.addEventListener("click", () => qrInput.click());

// Handle file selection and QR analysis
qrInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = function () {
    // Draw the image on canvas
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const imageData = ctx.getImageData(0, 0, img.width, img.height);

    // Scan QR code
    const code = jsQR(imageData.data, img.width, img.height);

    if (code) {
      // Get text from QR (handle byte-mode)
      const qrText = code.data || String.fromCharCode(...code.binaryData);
      console.log("QR detected:", qrText);

      // Parse key=value or semicolon-delimited data
      const parts = qrText.split(/[,;]/); // split by comma or semicolon
      parts.forEach((part) => {
        const p = part.trim();
        if (!p) return;
        const eq = p.indexOf("=");
        if (eq === -1) return;

        const key = p.substring(0, eq).trim().toLowerCase();
        const value = p.substring(eq + 1).trim();

        // Update the corresponding vital sign
        if (key.includes("heart rate")) {
          document.getElementById("heartRateValue").innerText = value;
        } else if (key.includes("oxygen")) {
          document.getElementById("bloodOxygenValue").innerText = value;
        } else if (key.includes("blood pressure")) {
          document.getElementById("bloodPressureValue").innerText = value;
        } else if (key.includes("temperature")) {
          document.getElementById("temperatureValue").innerText = value;
        }
      });

      // Show the content box
      contentBox.classList.add("show");
    } else {
      console.log("No QR code detected");
      contentBox.textContent = "No QR code found in this image.";
      contentBox.classList.add("show");
    }
  };
});
