const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const calculateBtn = document.querySelector('.btn');
const card = document.querySelector('.card');
// Output Selectors
const monthlyPaymentOutput = document.querySelector('#monthly-payment');
const totalPaymentOutput = document.querySelector('#total-payment');
const totalInterestOutput = document.querySelector('#total-interest');
const displayResults = document.querySelector('#results');
const displayLoading = document.querySelector('#loading');

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayOutput(a, b, c) {
  monthlyPaymentOutput.value = `$${numberWithCommas(a)}`;
  totalPaymentOutput.value = `$${numberWithCommas(b)}`;
  totalInterestOutput.value = `$${numberWithCommas(c)}`;
}

function showAlert() {
  const alert = document.createElement('div');
  alert.classList.add('alert', 'alert-danger');
  alert.textContent = 'Check the numbers entered!';

  setTimeout(function() {
    displayLoading.hidden = true;
    card.appendChild(alert);
    setTimeout(function() {
      alert.remove();
      amount.value = '';
      interest.value = '';
      years.value = '';
    }, 1000);
  }, 1000);
}

function calculate() {
  if (amount.value === '' || interest.value === '' || years.value === '') {
    showAlert();
  } else {
    // Number of Periodic Paymens
    const n = years.value * 12;
    // Periodic Interest Rate
    const ir = interest.value / 100 / 12;
    // Discount Factor
    const df = ((1 + ir) ** n - 1) / (ir * (1 + ir) ** n);
    // Loan Amount
    const loan = (Math.round((amount.value / df) * 100) / 100).toFixed(2);
    // Total Payment
    const totalPayment = (Math.round(loan * n * 100) / 100).toFixed(2);
    // Total Interest
    const totalInterest = (
      Math.round((totalPayment - amount.value) * 100) / 100
    ).toFixed(2);
    displayResults.hidden = false;
    displayLoading.hidden = true;
    displayOutput(loan, totalPayment, totalInterest);
  }
}

function loadEventListeners() {
  calculateBtn.addEventListener('click', function(e) {
    displayResults.hidden = true;
    displayLoading.hidden = false;
    setTimeout(calculate, 1000);
    e.preventDefault();
  });
}

loadEventListeners();
