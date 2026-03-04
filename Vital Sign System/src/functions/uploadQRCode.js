"use strict";
import { uploadBtn, qrImageInput, contentBox, apiEndpoint } from "./main.js";

uploadBtn.addEventListener("click", () => {
  qrImageInput.click();
});

qrImageInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  const url = URL.createObjectURL(file);

  img.onload = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    URL.revokeObjectURL(url);

    if (!code) {
      alert("No QR code found in image.");
      return;
    }

    let vitals;
    try {
      const data = JSON.parse(code.data);
      vitals = {
        bloodPressure: data.bp,
        heartRate: data.hr,
        bloodOxygen: data.spo2,
        temperature: data.temp,
      };
    } catch {
      const text = code.data;
      vitals = {
        bloodPressure: text.match(/Blood Pressure\s*=\s*([\d/]+)/i)?.[1],
        heartRate: text.match(/Heart Rate\s*=\s*(\d+)/i)?.[1],
        bloodOxygen: text.match(/Oxygen Saturation\s*=\s*(\d+)/i)?.[1],
        temperature: text.match(/Body Temperature\s*=\s*([\d.]+)/i)?.[1],
      };
    }

    if (!vitals || Object.values(vitals).some((v) => !v)) {
      alert("QR found but data format is invalid.");
      return;
    }

    contentBox.style.display = "block";

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vitals),
      });
      const data = await response.json();
      console.log("AI result:", data);
      // You can display AI results in another element here
    } catch (err) {
      console.error("AI analysis error:", err);
    }
  };

  img.src = url;
});
