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
    alert('Please check your numbers');
    console.error('Something went wrong...');
  }

  console.log('Calculations complete.');
  

}