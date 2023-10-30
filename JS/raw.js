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


    if (keysPressed['ArrowRight'] && character.x + character.width + character.speed <= canvas.width) {
        character.x += character.speed;
    }
    if (keysPressed['ArrowLeft'] && character.x - character.speed >= 0) {
        character.x -= character.speed;
    }
    if (keysPressed['ArrowUp'] && !character.isJumping) {
        character.isJumping = true;
        jump();
    }

    for (let i = 0; i < enemies.length; i++) {
        if (!enemies[i].isDead) {
            enemies[i].x += enemies[i].speed * enemies[i].direction;

            if (enemies[i].x <= 0 || (enemies[i].x + enemies[i].width >= canvas.width) || !isOnFloor(enemies[i])) {
                enemies[i].direction *= -1;
            }

            if (
                character.x < enemies[i].x + enemies[i].width &&
                character.x + character.width > enemies[i].x &&
                character.y < enemies[i].y + enemies[i].height &&
                character.y + character.height > enemies[i].y
            ) {
                if (character.isAttacking) {
                    // Sumar 3 puntos cuando mate a un enemigo
                    score += 3;
                    enemies[i].isDead = true;
                } else {
                    resetGame();
                    return;
                }
            }
        }
    }
}

function isOnFloor(enemy) {
    for (let i = 0; i < floorCount; i++) {
        for (let j = 0; j < floors[i].structureCount; j++) {
            if (!floors[i].isBroken[j] && enemy.x + enemy.width > j * floors[i].structureWidth && enemy.x < (j + 1) * floors[i].structureWidth) {
                if (enemy.y + enemy.height === floors[i].y) {
                    return true;
                }
            }
        }
    }
    return false;
}

canvas.width = 770;
canvas.height = 600;

function jump() {
    let jumpHeight = 0;

    const jumpInterval = setInterval(() => {
        if (jumpHeight >= character.jumpHeight) {
            clearInterval(jumpInterval);
            fall();
        } else {
            character.y -= 5;
            jumpHeight += 5;
            checkCollision();
        }
    }, 20);

    function checkCollision() {
        if (character.isJumping) {
            for (let i = 0; i < floorCount; i++) {
                for (let j = 0; j < floors[i].structureCount; j++) {
                    if (!floors[i].isBroken[j] && character.x + character.width > j * floors[i].structureWidth && character.x < (j + 1) * floors[i].structureWidth) {
                        if (character.y + character.height === floors[i].y) {
                            floors[i].isBroken[j] = true;
                            character.jumpHeight = 150;
                            // Sumar un punto cuando rompa una estructura
                            score += 1;
                        }
                    }
                }
            }
        }
    }
}

function fall() {
    const fallInterval = setInterval(() => {
        let isFalling = true;

        for (let i = 0; i < floorCount; i++) {
            if (!isFalling) break;

            for (let j = 0; j < floors[i].structureCount; j++) {
                if (!floors[i].isBroken[j] && character.x + character.width > j * floors[i].structureWidth && character.x < (j + 1) * floors[i].structureWidth) {
                    if (character.y + character.height === floors[i].y) {
                        isFalling = false;
                        character.isJumping = false;
                    }
                }
            }
        }

        if (isFalling) {
            if (character.y + character.height < canvas.height) {
                character.y += 5;
            } else {
                clearInterval(fallInterval);
                character.isJumping = false;
                character.jumpHeight = 100;
            }
        }
    }, 20);
}

function resetGame() {
    character.x = initialCharacter.x;
    character.y = initialCharacter.y;
    character.isJumping = initialCharacter.isJumping;
    character.isAttacking = false;
    character.jumpHeight = initialCharacter.jumpHeight;
    for (let i = 0; i < floors.length; i++) {
        floors[i].isBroken.fill(false);
    }
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].x = Math.random() * (canvas.width - 30);
        enemies[i].direction = Math.random() < 0.5 ? -1 : 1;
        enemies[i].speed = 2 + Math.random() * 2;
        enemies[i].isDead = false;
    }

  // Reiniciar el contador de puntos
  score = 0;
}

function attack() {
    character.isAttacking = true;
    for (let i = 0; i < enemies.length; i++) {
        if (!enemies[i].isDead) {
            if (Math.abs(character.x - enemies[i].x) <= 50 && character.y + character.height === enemies[i].y) {
                // Sumar 3 puntos cuando mate a un enemigo
                score += 3;
                enemies[i].isDead = true;
            }
        }
    }
}

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();