// Configuración del canvas y elementos del juego
const gameArea = document.getElementById('gameArea');
const ball = document.getElementById('ball');
const paddleLeft = document.getElementById('paddleLeft');
const paddleRight = document.getElementById('paddleRight');
const player1ScoreEl = document.getElementById('player1Score');
const player2ScoreEl = document.getElementById('player2Score');

// Variables para el juego
let ballX = 390, ballY = 190; // Posición inicial de la bola
let ballSpeedX = 4, ballSpeedY = 4; // Velocidad inicial de la bola
let paddleLeftY = 150, paddleRightY = 150; // Posición inicial de las paletas
const paddleSpeed = 6; // Velocidad de las paletas
const paddleHeight = 100, gameHeight = 400;
let player1Score = 0, player2Score = 0; // Puntuaciones iniciales

// Estado de las teclas presionadas
const keysPressed = {
    ArrowUp: false,
    ArrowDown: false,
    a: false,
    z: false
};

// Evento para detectar teclas presionadas
document.addEventListener('keydown', (event) => {
    if (keysPressed.hasOwnProperty(event.key)) {
        keysPressed[event.key] = true;
    }
});

// Evento para detectar teclas soltadas
document.addEventListener('keyup', (event) => {
    if (keysPressed.hasOwnProperty(event.key)) {
        keysPressed[event.key] = false;
    }
});

// Función principal del juego (se ejecuta cada frame)
function gameLoop() {
    movePaddles();
    moveBall();
    checkCollisions();
    updatePositions();
    requestAnimationFrame(gameLoop);
}

// Mover las paletas en función de las teclas presionadas
function movePaddles() {
    // Mover paleta izquierda (jugador 1)
    if (keysPressed['a'] && paddleLeftY > 0) {
        paddleLeftY -= paddleSpeed;
    } else if (keysPressed['z'] && paddleLeftY < gameHeight - paddleHeight) {
        paddleLeftY += paddleSpeed;
    }

    // Mover paleta derecha (jugador 2)
    if (keysPressed['ArrowUp'] && paddleRightY > 0) {
        paddleRightY -= paddleSpeed;
    } else if (keysPressed['ArrowDown'] && paddleRightY < gameHeight - paddleHeight) {
        paddleRightY += paddleSpeed;
    }
}

// Mover la bola
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Rebote en la parte superior e inferior del área de juego
    if (ballY <= 0 || ballY >= gameHeight - 20) {
        ballSpeedY = -ballSpeedY;
    }

    // Si la bola sale por la izquierda (jugador 2 anota)
    if (ballX <= 0) {
        player2Score++;
        resetBall();
    }

    // Si la bola sale por la derecha (jugador 1 anota)
    if (ballX >= 780) {
        player1Score++;
        resetBall();
    }
}

// Detectar colisiones con las paletas
function checkCollisions() {
    // Colisión con la paleta izquierda
    if (ballX <= 10 && ballY >= paddleLeftY && ballY <= paddleLeftY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Colisión con la paleta derecha
    if (ballX >= 770 && ballY >= paddleRightY && ballY <= paddleRightY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
}

// Actualizar las posiciones de los elementos en pantalla
function updatePositions() {
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    paddleLeft.style.top = paddleLeftY + 'px';
    paddleRight.style.top = paddleRightY + 'px';
    player1ScoreEl.textContent = player1Score;
    player2ScoreEl.textContent = player2Score;
}

// Reiniciar la posición de la bola después de que un jugador anote
function resetBall() {
    ballX = 390;
    ballY = 190;
    ballSpeedX = -ballSpeedX; // Cambiar dirección después de cada gol
    ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1); // Cambiar dirección vertical aleatoria
}

// Iniciar el bucle del juego
gameLoop();
