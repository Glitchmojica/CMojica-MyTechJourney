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
