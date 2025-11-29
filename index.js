// Elements

const form = document.getElementById("mortgage-form");
const results = document.getElementById("results");

// Event Listener
form.addEventListener("submit", function (e) {
e.preventDefault();

  // Get values
const amount = parseFloat(document.getElementById("mortgage-amount").value);
const years = parseFloat(document.getElementById("mortgage-term").value);
const rate = parseFloat(document.getElementById("interest-rate").value) / 100;
const type = document.getElementById("mortgage-type").value;

  // Validate
if (!amount || !years || !rate) {
    results.innerHTML = `<p style="color:red;">Please fill in all fields correctly.</p>`;
    return;
}

  const months = years * 12;
const monthlyRate = rate / 12;

let monthlyPayment = 0;
let totalPayment = 0;

if (type === "repayment") {
    const x = Math.pow(1 + monthlyRate, months);
    monthlyPayment = (amount * monthlyRate * x) / (x - 1);
    totalPayment = monthlyPayment * months;
}

if (type === "interest-only") {
    monthlyPayment = amount * monthlyRate;
    totalPayment = amount + monthlyPayment * months;
}

  // Format numbers
monthlyPayment = monthlyPayment.toFixed(2);
totalPayment = totalPayment.toFixed(2);

  // Show results
results.innerHTML = `
    <h2>Your Results</h2>
    <p>Your results are based on the information you provided.</p>

<div class="result-box">
    <h3>Monthly Repayments</h3>
    <p class="highlight">$${monthlyPayment}</p>
    </div>

    <div class="result-box">
    <h3>Total You Will Repay</h3>
    <p class="highlight">$${totalPayment}</p>
    </div>
`;
});

// Clear button functionality
document.querySelector(".clear-btn").addEventListener("click", () => {
results.innerHTML = `
    <h2>Results shown here</h2>
    <p>Complete the form and click “Calculate Repayments”.</p>
`;
});
