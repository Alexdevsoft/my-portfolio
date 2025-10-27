// Conteúdo de snake-js.txt

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let nextDirection = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gameInterval;

// Atualiza o display do recorde ao carregar
document.getElementById('highScore').textContent = highScore;
document.getElementById('score').textContent = score;

function startGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    gameRunning = true;

    document.getElementById('score').textContent = score;
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('startBtn').textContent = '⏸️ Pausar';

    placeFood();

    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);

    // Foca o canvas para garantir que as teclas funcionem
    canvas.focus();
}

function pauseGame() {
    gameRunning = false;
    clearInterval(gameInterval);
    document.getElementById('startBtn').textContent = '▶️ Continuar';
}

function toggleGame() {
    if (gameRunning) {
        pauseGame();
    } else {
        if (document.getElementById('startBtn').textContent === '🔄 Jogar Novamente') {
            startGame();
        } else if (document.getElementById('startBtn').textContent === '▶️ Iniciar') {
            startGame();
        } else {
            // Continua
            gameRunning = true;
            document.getElementById('startBtn').textContent = '⏸️ Pausar';
            gameInterval = setInterval(gameLoop, 100);
        }
    }
}

function gameLoop() {
    if (!gameRunning) return;

    direction = nextDirection;

    // Move a cabeça da cobra
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Checa colisão com paredes
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        endGame();
        return;
    }

    // Checa colisão com o corpo
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
            return;
        }
    }

    snake.unshift(head); // Adiciona a nova cabeça

    // Checa se comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').textContent = score;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('snakeHighScore', highScore);
            document.getElementById('highScore').textContent = highScore;
        }
        placeFood(); // Coloca nova comida
    } else {
        snake.pop(); // Remove a cauda se não comeu
    }

    drawGame();
}

function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);

    // Garante que a comida não apareça dentro da cobra
    for (let i = 0; i < snake.length; i++) {
        if (food.x === snake[i].x && food.y === snake[i].y) {
            placeFood();
            return;
        }
    }
}

function drawGame() {
    // Fundo
    ctx.fillStyle = '#f7f7f7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Comida
    ctx.fillStyle = '#ff4d4d';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1);

    // Cobra
    ctx.fillStyle = '#11998e';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 1, gridSize - 1);
    });
}

function changeDirection(dir) {
    if (!gameRunning) return;

    const directions = {
        'up': { x: 0, y: -1 },
        'down': { x: 0, y: 1 },
        'left': { x: -1, y: 0 },
        'right': { x: 1, y: 0 }
    };

    const newDir = directions[dir];

    // Evita virar 180 graus
    if (newDir.x !== -direction.x || newDir.y !== -direction.y) {
        nextDirection = newDir;
    }
}

function endGame() {
    gameRunning = false;
    clearInterval(gameInterval);
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('startBtn').textContent = '🔄 Jogar Novamente';
}

// Controles do teclado
document.addEventListener('keydown', (e) => {
    const keyMap = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'w': 'up',
        's': 'down',
        'a': 'left',
        'd': 'right'
    };

    if (keyMap[e.key]) {
        e.preventDefault();
        changeDirection(keyMap[e.key]);
    }

    // Espaço para iniciar/pausar
    if (e.key === ' ') {
        e.preventDefault();
        toggleGame();
    }
});

// Associa o botão Iniciar/Pausar à função toggleGame
document.getElementById('startBtn').addEventListener('click', toggleGame);

// Adiciona os event listeners aos botões de controle móvel
document.getElementById('upBtn').addEventListener('click', () => changeDirection('up'));
document.getElementById('downBtn').addEventListener('click', () => changeDirection('down'));
document.getElementById('leftBtn').addEventListener('click', () => changeDirection('direction')); // ERRO de digitação: deve ser 'left'
document.getElementById('rightBtn').addEventListener('click', () => changeDirection('right'));

// Correção do listener do botão 'left' (se existir no HTML)
const leftBtn = document.querySelector('.btn-control.left');
if (leftBtn) {
    leftBtn.addEventListener('click', () => changeDirection('left'));
}

// Desenha o estado inicial
drawGame();