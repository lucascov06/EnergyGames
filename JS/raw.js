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
