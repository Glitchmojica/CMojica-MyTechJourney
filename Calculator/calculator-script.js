document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.querySelector('.input-field input');
  const mpgResult = document.getElementById("mpgResult");

  inputField.addEventListener('input', () => {
    const milesTraveled = inputField.value;
    if (milesTraveled > 0) {
      const mpg = milesTraveled / 1; // Assuming gallons used is 1 for simplicity
      mpgResult.textContent = mpg.toFixed(2);
    } else {
      mpgResult.textContent = "0";
    }
  });
});
