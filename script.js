// konfigurasi
const CONFIG = {
  keys: ["d", "f", "j", "k"],
  dangerAreaTop: 400,
  dangeAreaBottom: 520,
  virusSpawnY: -60,
  virusSize: 50,
  baseSpeed: 250, //pixel per detik
  spawnInterval: 1000, //setiap 1 detik
  maxFail: 5,
};

// state
let gameState = "IDLE"; // IDLE, COUNTDOWN, PLAYING, PAUSED, GAMEOVER
let score = 0;
let fail = 0;
let timeElapsed = 0;
let playerName = "";
let viruses = [];
let virusIdCounter = 0;
// variabel loop dan timing
let lastFrameTime = 0;
let gameTimerInterval = null;
let spawnTimer = 0;
let animationFrameId = null;

// DOM elements

// event listener inisialisasi

// controller modal

// game logic

// game loop

// input hit detection

// utilities
