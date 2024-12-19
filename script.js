const game = document.getElementById('game');
const basket = document.getElementById('basket');
const hen = document.getElementById('hen');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('game-over');

let score = 0;
let missed = 0;
let basketPosition = 50; // Percentage of screen width

const basketWidth = 100;
const gameWidth = window.innerWidth;

document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    basketPosition = (x / gameWidth) * 100;
    basket.style.left = `${basketPosition}%`;
});

function dropEgg() {
    const egg = document.createElement('img');
    egg.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ6nS-Py_539FInDTfV1gFlgz0K91pXDu3g&s';
    egg.classList.add('egg');
    egg.style.left = `${Math.random() * 80 + 10}%`;
    egg.style.top = `0px`;
    game.appendChild(egg);

    const eggFallInterval = setInterval(() => {
        const eggRect = egg.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();

        egg.style.top = `${egg.offsetTop + 5}px`;

        if (eggRect.bottom >= basketRect.top && eggRect.right >= basketRect.left && eggRect.left <= basketRect.right) {
            clearInterval(eggFallInterval);
            game.removeChild(egg);
            score++;
            updateScore();
        } else if (eggRect.bottom > window.innerHeight) {
            clearInterval(eggFallInterval);
            game.removeChild(egg);
            missed++;
            displayBrokenEgg(eggRect.left, window.innerHeight - 40);
            updateScore();
            checkGameOver();
        }
    }, 30);
}

function displayBrokenEgg(x, y) {
    const brokenEgg = document.createElement('img');
    brokenEgg.src = 'https://static.vecteezy.com/system/resources/thumbnails/008/513/366/small/cracked-egg-illustration-png.png';
    brokenEgg.style.position = 'absolute';
    brokenEgg.style.width = '40px';
    brokenEgg.style.left = `${x}px`;
    brokenEgg.style.top = `${y}px`;
    game.appendChild(brokenEgg);

    setTimeout(() => game.removeChild(brokenEgg), 1000);
}

function updateScore() {
    scoreDisplay.innerText = `Score: ${score} | Missed: ${missed}`;
}

function checkGameOver() {
    if (missed > 10) {
        gameOverDisplay.style.display = 'block';
        clearInterval(eggDropInterval);
    }
}

const eggDropInterval = setInterval(dropEgg, 1000);
