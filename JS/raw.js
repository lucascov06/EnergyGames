//movimientos
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const character = {
    x: 0,
    y: canvas.height + 420,
    width: 30,
    height: 30,
    speed: 5,
    jumpHeight: 150,
    isJumping: false,
    isAttacking: false,
};

const initialCharacter = { ...character };

const floors = [];
const enemies = [];
const floorCount = 4;

for (let i = 0; i < floorCount; i++) {
    floors.push({
        x: 0,
        y: canvas.height - i * 100 + 350,
        width: canvas.width,
        height: 20,
        structureCount: 46,
        structureWidth: canvas.width / 8,
        isBroken: Array(46).fill(false),
    });

    enemies.push({
        x: Math.random() * (canvas.width - 30),
        y: canvas.height - i * 100 + 350 - 30,
        width: 30,
        height: 30,
        direction: Math.random() < 0.5 ? -1 : 1,
        speed: 2 + Math.random() * 2,
        isDead: false,
    });
}

const keysPressed = {};

let score = 0; // Variable para llevar un registro de los puntos

document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
    if (event.key === 'ArrowDown' && !character.isAttacking) {
        character.isAttacking = true;
        attack();
    }
});

document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});

function drawCharacter() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(character.x, character.y, character.width, character.height);
}

function drawFloors() {
    for (let i = 0; i < floorCount; i++) {
        for (let j = 0; j < floors[i].structureCount; j++) {
            if (!floors[i].isBroken[j]) {
                ctx.fillStyle = 'green';
                ctx.fillRect(
                    j * floors[i].structureWidth,
                    floors[i].y,
                    floors[i].structureWidth,
                    floors[i].height
                );
            }
        }
    }
}

function drawEnemies() {
    ctx.fillStyle = 'red';
    for (let i = 0; i < enemies.length; i++) {
        if (!enemies[i].isDead) {
            ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
        }
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    clearCanvas();
    drawFloors();
    drawCharacter();
    drawEnemies();

    // Muestra el puntaje en la esquina superior izquierda del canvas
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    document.getElementById("score").textContent = score;
