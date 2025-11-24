
let timerElement = document.getElementById('timer');
let seconds = parseInt(timerElement.textContent);

function updateTimer() {
    seconds--;
    
    timerElement.textContent = seconds;
    
    if (seconds <= 0) {
        clearInterval(timerInterval);
        alert('Вы победили в конкурсе!');
    }
}

let timerInterval = setInterval(updateTimer, 1000);