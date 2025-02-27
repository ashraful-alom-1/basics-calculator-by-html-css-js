// Get the display element
let display = document.getElementById('display');

// Function to append a value to the display
function appendToDisplay(value) {
  // Clear the display if it shows "Error" or "Infinity"
  if (display.value === "Error" || display.value === "Infinity") {
    clearDisplay();
  }
  // Append the value to the display
  display.value += value;
}

// Function to clear the display
function clearDisplay() {
  display.value = ""; // Set the display value to an empty string
}

// Function to calculate the result
function calculateResult() {
  try {
    // Evaluate the expression in the display
    let result = eval(display.value);

    // Check if the result is NaN (Not a Number) or infinite
    if (isNaN(result) || !isFinite(result)) {
      display.value = "Error"; // Display "Error" for invalid results
    } else {
      display.value = result; // Display the valid result
    }
  } catch (error) {
    // Handle any errors during evaluation
    display.value = "Error"; // Display "Error" if an exception occurs
  }
}