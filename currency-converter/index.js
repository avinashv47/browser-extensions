const form = document.getElementById("currency-form");
const result = document.getElementById("result");

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'api_key_here',
		'x-rapidapi-host': 'currency-converter18.p.rapidapi.com'
	}
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;

    if (amount === "" || fromCurrency === "" || toCurrency === "") {
        result.textContent = "Please fill in all fields.";
        return;
    }

    const url = `https://currency-converter18.p.rapidapi.com/api/v1/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.result) {
            const { convertedAmount } = data.result;
            result.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        } else {
            result.textContent = "Invalid currency.";
        }
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        result.textContent = "Error fetching exchange rates.";
    }
});