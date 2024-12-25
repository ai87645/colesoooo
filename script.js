const wheel = document.querySelector('.wheel');
const spinButton = document.getElementById('spin-button');
const attemptsDisplay = document.getElementById('attempts');
const balanceDisplay = document.getElementById('balance');
const errorMessageDisplay = document.getElementById('error-message');
const withdrawButton = document.getElementById('withdraw-button');
let attempts = 3;
let balance = 0;
let isSpinning = false;

spinButton.addEventListener('click', () => {
    if (isSpinning) return;
    if (attempts > 0) {
        isSpinning = true;
        errorMessageDisplay.textContent = '';
        const deg = Math.floor(Math.random() * 3600) + 360 * 5;
        wheel.style.transform = `rotate(${deg}deg)`;

           setTimeout(() => {
               const segments = document.querySelectorAll('.segment');
               const segmentHeight = 360/segments.length
               const adjustedDeg = deg % 360;
               let segmentValue;

              segments.forEach((segment, index) => {
                   const startDeg =  segmentHeight * index;
                    const endDeg = segmentHeight * (index + 1);

                    if(adjustedDeg > startDeg && adjustedDeg < endDeg)
                       segmentValue = +segment.getAttribute('data-value');
               })

                balance += segmentValue;
                balanceDisplay.textContent = balance;
                attempts--;
                attemptsDisplay.textContent = attempts;
                isSpinning = false;
                 if (attempts === 0) {
                    spinButton.disabled = true;
                    errorMessageDisplay.textContent = 'Попытки закончились!';
                }
        }, 4000);
    }
});

withdrawButton.addEventListener('click', () => {
        window.location.href = "withdraw.html";
})