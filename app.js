// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);
  
// Calculate results 
function calculateResults(e) {
  e.preventDefault();
  
  console.log('Calculating...');
  // UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  // Working variables
  const principal = parseFloat(amount.value);
  const annualInterestRate = parseFloat(interest.value) / 100;
  const monthlyInterestRate = annualInterestRate / 12;
  const numberOfPayments = parseFloat(years.value) * 12;
   
  // Compute monthly payment 
  const factor = Math.pow(1 + monthlyInterestRate, numberOfPayments);
  const monthly = (principal * factor * monthlyInterestRate) / (factor - 1);
  
  // Check for valid results 
  if (isFinite(monthly)) {
    // Complete calculations and convert 
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * numberOfPayments).toFixed(2);
    totalInterest.value = ((monthly * numberOfPayments) - principal).toFixed(2);
  } else {
    // show error message
    showError('Please check your numbers');
  }
  
console.log('Calculations complete, results displayed.');
}

// Show error 
function showError(error) {
  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  
  // Create div
  const errorDiv = document.createElement('div');
  // Add class 
  errorDiv.className = 'alert alert-danger';
  // Create text node and append 
  errorDiv.appendChild(document.createTextNode(error));
  
  // Insert error above heading 
  card.insertBefore(errorDiv, heading);
  
  // Clear error after timeout 
  setTimeout(clearError, 3000);
}

// Clear error  
function clearError() {
  document.querySelector('.alert').remove();
}

