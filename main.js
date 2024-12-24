console.log("JavaScript is connected!");
document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript is running!");

  // Find the subscribe button
  const subscribeButton = document.getElementById("subscribe-btn");

  // Check if the button exists
  if (subscribeButton) {
    subscribeButton.addEventListener("click", function () {
      alert("Thank you for subscribing!");
    });
  } else {
    console.error("Subscribe button not found!");
  }
});

function calculateLoanDetails() {
  // Get input values
  const loanBalance = parseFloat(document.getElementById("loanBalance").value.replace(/,/g, '')) || 0;
  const interestRate = parseFloat(document.getElementById("interestRate").value) || 0;
  const repaymentTerm = parseFloat(document.getElementById("repaymentTerm").value) || 0;
  const monthlyIncome = parseFloat(document.getElementById("monthlyIncome").value.replace(/,/g, '')) || 0;
  const monthlyExpenses = parseFloat(document.getElementById("monthlyExpenses").value.replace(/,/g, '')) || 0;

  // Validate inputs
  if (loanBalance <= 0 || repaymentTerm <= 0 || monthlyIncome <= 0) {
    document.getElementById("loanDetails").innerHTML = `
      <p style="color: red;">Please provide valid inputs for Loan Balance, Repayment Term, and Monthly Income.</p>
    `;
    return;
  }
  const form = document.getElementById('budgetForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const income = document.getElementById('income').value;
    if (!income) {
      alert('Monthly Income is required!');
      return;
    }
    // Continue processing...
  });
  

  // Calculate monthly interest rate
  const monthlyInterestRate = (interestRate / 100) / 12;

  // Calculate monthly payment using loan amortization formula
  const numberOfMonths = repaymentTerm * 12;
  const monthlyPayment = monthlyInterestRate > 0
    ? (loanBalance * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths))
    : loanBalance / numberOfMonths;

  // Calculate total interest and total payments
  const totalPaid = monthlyPayment * numberOfMonths;
  const totalInterest = totalPaid - loanBalance;

  // Calculate leftover buffer
  const leftoverBuffer = monthlyIncome - (monthlyExpenses + monthlyPayment);

  // Display loan details
  document.getElementById("loanDetails").innerHTML = `
    <h3>Loan Details</h3>
    <p>Monthly Payment: <strong>$${monthlyPayment.toFixed(2)}</strong></p>
    <p>Total Paid Over ${repaymentTerm} Years: <strong>$${totalPaid.toFixed(2)}</strong></p>
    <p>Total Interest Paid: <strong>$${totalInterest.toFixed(2)}</strong></p>
    <p>Leftover Buffer After Loan Payment: <strong>$${leftoverBuffer.toFixed(2)}</strong></p>
  `;

  // Display the chart
  displayChart(loanBalance, totalInterest);

  // Show the export button
  showExportButton();
}

function exportToCSV() {
  // Retrieve loan details
  const loanBalance = parseFloat(document.getElementById("loanBalance").value.replace(/,/g, '')) || 0;
  const interestRate = parseFloat(document.getElementById("interestRate").value) || 0;
  const repaymentTerm = parseFloat(document.getElementById("repaymentTerm").value) || 0;

  const csvContent = `data:text/csv;charset=utf-8,Category,Amount\n
Loan Balance,$${loanBalance.toFixed(2)}\n
Interest Rate,${interestRate}%\n
Repayment Term,${repaymentTerm} years\n`;

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "loan_details.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // Clean up
}

function displayChart(loanBalance, totalInterest) {
  const ctx = document.getElementById('loanChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Principal', 'Interest'],
      datasets: [{
        data: [loanBalance, totalInterest],
        backgroundColor: ['#4caf50', '#ff9800'],
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  });
}

function showExportButton() {
  document.getElementById("exportBtn").style.display = "block";
}

// Save loan details to localStorage
function saveLoanData() {
  const loanBalance = parseFloat(document.getElementById("loanBalance").value) || 0;
  const interestRate = parseFloat(document.getElementById("interestRate").value) || 0;
  const repaymentTerm = parseFloat(document.getElementById("repaymentTerm").value) || 0;

  localStorage.setItem('loanData', JSON.stringify({ loanBalance, interestRate, repaymentTerm }));
}

// Load saved loan details from localStorage
function loadLoanData() {
  const savedData = JSON.parse(localStorage.getItem('loanData'));
  if (savedData) {
    document.getElementById("loanBalance").value = savedData.loanBalance;
    document.getElementById("interestRate").value = savedData.interestRate;
    document.getElementById("repaymentTerm").value = savedData.repaymentTerm;
  }
}

// Call loadLoanData when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadLoanData);

function saveUserPreferences() {
  // Collect user inputs
  const loanBalance = document.getElementById("loanBalance").value || '';
  const interestRate = document.getElementById("interestRate").value || '';
  const repaymentTerm = document.getElementById("repaymentTerm").value || '';
  const monthlyIncome = document.getElementById("monthlyIncome").value || '';
  const monthlyExpenses = document.getElementById("monthlyExpenses").value || '';

  // Save inputs to localStorage as a JSON object
  const userPreferences = {
    loanBalance,
    interestRate,
    repaymentTerm,
    monthlyIncome,
    monthlyExpenses,
  };

  localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
}

function loadUserPreferences() {
  // Retrieve data from localStorage
  const savedPreferences = localStorage.getItem('userPreferences');

  if (savedPreferences) {
    // Parse the JSON object
    const { loanBalance, interestRate, repaymentTerm, monthlyIncome, monthlyExpenses } = JSON.parse(savedPreferences);

    // Populate the input fields
    document.getElementById("loanBalance").value = loanBalance || '';
    document.getElementById("interestRate").value = interestRate || '';
    document.getElementById("repaymentTerm").value = repaymentTerm || '';
    document.getElementById("monthlyIncome").value = monthlyIncome || '';
    document.getElementById("monthlyExpenses").value = monthlyExpenses || '';
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Load saved preferences when the page loads
  loadUserPreferences();

  // Attach event listeners to save data on change
  const inputs = document.querySelectorAll("#loanCalculatorForm input");
  inputs.forEach(input => {
    input.addEventListener("change", saveUserPreferences);
  });
});

function clearUserPreferences() {
  localStorage.removeItem('userPreferences');
  document.getElementById("loanCalculatorForm").reset();
}

document.querySelectorAll('.resource').forEach((resource) => {
  resource.addEventListener('click', () => {
    alert('You clicked on: ' + resource.querySelector('h2').innerText);
  });
});

fetch('https://newsapi.org/v2/everything?q=finance&apiKey=your-api-key')
  .then((response) => response.json())
  .then((data) => {
    const newsContainer = document.createElement('div');
    data.articles.slice(0, 5).forEach((article) => {
      const articleElement = document.createElement('div');
      articleElement.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      `;
      newsContainer.appendChild(articleElement);
    });
    document.querySelector('main').appendChild(newsContainer);
  });
