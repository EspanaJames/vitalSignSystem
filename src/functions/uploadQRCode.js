const uploadButton = document.getElementById("uploadButton");
const qrInput = document.getElementById("qrImageInput");
const canvas = document.getElementById("qrCanvas");
const ctx = canvas.getContext("2d");

uploadButton.addEventListener("click", () => {
  qrInput.click();
});

qrInput.addEventListener("change", function () {
  const file = this.files[0];

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = function () {
    const size = 600;
    canvas.width = size;
    canvas.height = size;

    ctx.drawImage(img, 0, 0, size, size);

    const imageData = ctx.getImageData(0, 0, size, size);

    const code = jsQR(imageData.data, size, size);

    if (code) {
      const text = String.fromCharCode(...code.binaryData);

      const parts = text.split(";");

      parts.forEach((part) => {
        const p = part.trim();
        if (!p) return;

        const eq = p.indexOf("=");
        if (eq === -1) return;

        const key = p.substring(0, eq).trim().toLowerCase();
        const value = p.substring(eq + 1).trim();

        if (key.includes("heart rate")) {
          document.getElementById("heartRateValue").innerText = value;
        }

        if (key.includes("oxygen")) {
          document.getElementById("bloodOxygenValue").innerText = value;
        }

        if (key.includes("blood pressure")) {
          document.getElementById("bloodPressureValue").innerText = value;
        }

        if (key.includes("temperature")) {
          document.getElementById("temperatureValue").innerText = value;
        }
      });
    }
  };
});
