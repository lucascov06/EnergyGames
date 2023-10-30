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
