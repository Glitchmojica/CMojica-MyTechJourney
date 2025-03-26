document.addEventListener("DOMContentLoaded", () => {
  const milesTraveledInput = document.getElementById('milesTraveled');
  const gallonsUsedInput = document.getElementById('gallonsUsed');
  const mpgResult = document.getElementById("mpgResult");

  function calculateMPG() {
      const milesTraveled = parseFloat(milesTraveledInput.value);
      const gallonsUsed = parseFloat(gallonsUsedInput.value);

      if (milesTraveled > 0 && gallonsUsed > 0) {
          const mpg = milesTraveled / gallonsUsed;
          mpgResult.textContent = mpg.toFixed(2);
      } else {
          mpgResult.textContent = "0";
      }
  }

  // Add event listeners for real-time calculation
  milesTraveledInput.addEventListener('input', calculateMPG);
  gallonsUsedInput.addEventListener('input', calculateMPG);

  // Make calculateMPG available globally for the button click
  window.calculateMPG = calculateMPG;
});
