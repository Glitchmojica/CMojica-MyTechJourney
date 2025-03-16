document.addEventListener("DOMContentLoaded", () => {
  // Dropdown menu behavior
  const dropdown = document.querySelector('.dropdown');
  if (dropdown) {
    dropdown.addEventListener('click', function (event) {
      event.stopPropagation();
      const content = this.querySelector('.dropdown-content');
      if (content) {
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function () {
      const content = dropdown.querySelector('.dropdown-content');
      if (content) content.style.display = 'none';
    });
  }

  // MPG Calculator
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