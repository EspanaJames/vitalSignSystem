"use strict";

export function analyzeVitals() {
  const heartRate = parseInt(
    document.getElementById("heartRateValue").innerText,
  );
  const oxygen = parseInt(
    document.getElementById("bloodOxygenValue").innerText,
  );
  const temp = parseFloat(
    document.getElementById("temperatureValue").innerText,
  );
  const bp = document.getElementById("bloodPressureValue").innerText;

  const analysisBox = document.getElementById("vitalAnalysis");

  let analysis = "<h3>AI Vital Analysis</h3>";
  analysis += "<ul>";

  // Heart Rate
  if (heartRate < 60)
    analysis +=
      "<li>Low heart rate detected. Monitor for dizziness or fatigue.</li>";
  else if (heartRate > 100)
    analysis += "<li>Elevated heart rate detected. Consider resting.</li>";
  else analysis += "<li>Heart rate is within the normal range.</li>";

  // Oxygen
  if (oxygen < 95)
    analysis +=
      "<li>Low oxygen saturation detected. Seek fresh air or medical attention.</li>";
  else analysis += "<li>Oxygen level is healthy.</li>";

  // Temperature
  if (temp > 37.5)
    analysis +=
      "<li>Fever detected. Monitor temperature and stay hydrated.</li>";
  else analysis += "<li>Body temperature is normal.</li>";

  // Blood Pressure
  const bpParts = bp.split("/");
  if (bpParts.length === 2) {
    const sys = parseInt(bpParts[0]);
    const dia = parseInt(bpParts[1]);

    if (sys > 140 || dia > 90)
      analysis +=
        "<li>High blood pressure detected. Consider consulting a doctor.</li>";
    else if (sys < 90 || dia < 60)
      analysis +=
        "<li>Low blood pressure detected. Stay hydrated and monitor symptoms.</li>";
    else analysis += "<li>Blood pressure is within a healthy range.</li>";
  }

  analysis += "</ul>";

  analysisBox.innerHTML = analysis;
}
