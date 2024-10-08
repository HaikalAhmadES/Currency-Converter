const api = "https://api.exchangerate-api.com/v4/latest/";

function getExchangeRate(fromCurrency, toCurrency) {
  return fetch(`${api}${fromCurrency}`)
    .then((response) => response.json())
    .then((data) => data.rates[toCurrency]);
}

let formatCurrency = (val, currency) => {
  let currencyVal = (val * 1).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  currencyVal = currencyVal.split(".");
  switch (currency) {
    case "USD":
      val = `$ ${currencyVal[0]}`;
      break;
    case "EUR":
      val = `€ ${currencyVal[0]}`;
      break;
    case "IDR":
      val = `Rp ${currencyVal[0]}`;
      break;
    default:
      throw new Error("Unknown currency format");
  }
  return val;
};

function convertCurrency(amount, fromCurrency, toCurrency) {
  getExchangeRate(fromCurrency, toCurrency)
    .then((exchangeRate) => {
      const result = amount * exchangeRate;
      const frmcur = formatCurrency(amount, fromCurrency);
      const tocur = formatCurrency(result, toCurrency);
      document.getElementById("result").textContent = `${frmcur} = ${tocur}`;
    })
    .catch((error) => console.error(error));
}

document
  .getElementById("converter-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;
    convertCurrency(amount, fromCurrency, toCurrency);
  });
