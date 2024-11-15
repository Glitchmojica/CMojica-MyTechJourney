function calculateMPG() {
    // Get input values
    var milesTraveled = parseFloat(document.getElementById("milesTraveled").value);
    var gallonsUsed = parseFloat(document.getElementById("gallonsUsed").value);

    // Check if inputs are valid
    if (isNaN(milesTraveled) || isNaN(gallonsUsed) || gallonsUsed === 0) {
        alert("Please enter valid numbers for miles and gallons.");
        return;
    }

    // Calculate miles per gallon
    var milesPerGallon = milesTraveled / gallonsUsed;

    // Display the result
    document.getElementById("mpgResult").innerText = milesPerGallon.toFixed(2);
}
