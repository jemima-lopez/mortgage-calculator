const form = document.getElementById("mortgage-form");
const results = document.getElementById("results");

// Listener del formulario
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener valores del formulario
  const amount = parseFloat(document.getElementById("mortgage-amount").value);
  const years = parseFloat(document.getElementById("mortgage-term").value);
  const rate = parseFloat(document.getElementById("interest-rate").value) / 100;

  // Obtener tipo de pago (repayment o interest-only)
  const typeOption = document.querySelector('input[name="paymentType"]:checked');

  // Validación
  if (!amount || !years || !rate || !typeOption) {
    results.innerHTML = `<p style="color:red;">Please fill in all fields correctly.</p>`;
    return;
  }

  const type = typeOption.value;

  // Cálculos
  const months = years * 12;
  const monthlyRate = rate / 12;

  let monthlyPayment = 0;
  let totalPayment = 0;

  // Repayment: fórmula estándar
  if (type === "repayment") {
    const x = Math.pow(1 + monthlyRate, months);
    monthlyPayment = (amount * monthlyRate * x) / (x - 1);
    totalPayment = monthlyPayment * months;
  }

  // Interest only
  if (type === "interest-only") {
    monthlyPayment = amount * monthlyRate;
    totalPayment = amount + monthlyPayment * months;
  }

  // Convertir decimales
  monthlyPayment = monthlyPayment.toFixed(2);
  totalPayment = totalPayment.toFixed(2);

  // Mostrar resultados
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

// Botón Clear All
document.querySelector(".clear-btn").addEventListener("click", () => {
  results.innerHTML = `
    <img src="./assets/images/illustration-empty.svg" alt="empty">
    <h2>Results shown here</h2>
    <p>Complete the form and click “calculate repayments” to see what 
    your monthly repayments would be.</p>
  `;
});
