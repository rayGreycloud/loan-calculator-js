// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide results 
  document.getElementById('results').style.display = 'none';

  // Show loader 
  document.getElementById('loading').style.display = 'block';
  
  setTimeout(calculateResults, 2000);
  
  e.preventDefault();  
});
  
// Calculate results 
function calculateResults(e) {
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
    
    showResults();
  } else {
    // show error message
    showError('Please check your numbers');
  }
  
  // Hide loader, show results

}

// Show results 
function showResults() {
  // Hide loader, show results
  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'block';  
}

// Show error 
function showError(error) {
  // Hide loader and results 
  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'none';
  
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

