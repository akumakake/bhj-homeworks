let dead = 0;
let lost = 0;

function getHole(index) {
    return document.getElementById(`hole${index}`);
}

function updateStats() {
    document.getElementById('dead').textContent = dead;
    document.getElementById('lost').textContent = lost;
}

function checkGameEnd() {
    if (dead >= 10) {
        alert('Победа! Вы убили 10 кротов!');
        resetGame();
        return true;
    }
    if (lost >= 5) {
        alert('Поражение! Слишком много промахов!');
        resetGame();
        return true;
    }
    return false;
}

function resetGame() {
    dead = 0;
    lost = 0;
    updateStats();
}

function holeClick(event) {
    const hole = event.target;
    
    if (!hole.classList.contains('hole')) {
        return;
    }
    
    if (hole.classList.contains('hole_has-mole')) {
        dead++;
    } else {
        lost++;
    }
    
    updateStats();
    
    checkGameEnd();
}

for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);
    hole.addEventListener('click', holeClick);
}

document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    console.log('Игра "Убей крота" инициализирована!');
});