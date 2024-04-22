document.getElementById('currency-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const source = document.getElementById('source').value;
    const target = document.getElementById('target').value;
    const amount = document.getElementById('amount').value;

    fetch(`https://v6.exchangerate-api.com/v6/6b7216d5848d3e13a72bed77/latest/${source}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.conversion_rates[target];
            const convertedAmount = amount * rate;
            const result = `${amount} ${source} = ${convertedAmount.toFixed(2)} ${target} (Rate: ${rate})`;
            document.getElementById('result').innerText = result;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerText = 'Error fetching exchange rates.';
        });
});
