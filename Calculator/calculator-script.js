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
  
    // Calculator functionality
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
  
    calculateButton.addEventListener('click', () => {
      const num1 = parseFloat(document.getElementById('num1').value);
      const num2 = parseFloat(document.getElementById('num2').value);
      const operation = document.getElementById('operation').value;
  
      let result;
      switch (operation) {
        case 'add':
          result = num1 + num2;
          break;
        case 'subtract':
          result = num1 - num2;
          break;
        case 'multiply':
          result = num1 * num2;
          break;
        case 'divide':
          result = num1 / num2;
          break;
        default:
          result = 'Invalid operation';
      }
  
      resultDiv.textContent = `Result: ${result}`;
    });
  
    // MPG Calculator
    function calculateMPG() {
      const milesTraveled = document.getElementById("milesTraveled").value;
      const gallonsUsed = document.getElementById("gallonsUsed").value;
      const mpgResult = document.getElementById("mpgResult");
  
      if (milesTraveled > 0 && gallonsUsed > 0) {
        const mpg = milesTraveled / gallonsUsed;
        mpgResult.textContent = mpg.toFixed(2);
      } else {
        mpgResult.textContent = "0";
        alert("Please enter valid numbers for both fields.");
      }
    }
  });
  