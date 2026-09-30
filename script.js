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
const DOM = {
  // hud
  timeDisplay: document.getElementById("timeDisplay"),
  scoreDisplay: document.getElementById("scoreDisplay"),
  failDisplay: document.getElementById("failDisplay"),
  playerDisplay: document.getElementById("playerDisplay"),
  btnRestartHUD: document.getElementById("btnRestartHud"),
  btnQuit: document.getElementById("btnQuit"),
  // board
  lanes: document.querySelectorAll(".lane"),
  virusContainer: document.getElementById("virusContainer"),
  // modal
  overlay: document.getElementById("modalOverlay"),
  modals: {
    instruction: document.getElementById("modalInstruction"),
    countdown: document.getElementById("modalCountdown"),
    pause: document.getElementById("modalPause"),
    gameover: document.getElementById("modalGameover"),
  },
  // instruction
  usernameInput: document.getElementById("usernameInput"),
  btnPlay: document.getElementById("btnPlay"),
  // countdown
  countdownText: document.getElementById("countdownText"),
  // pause & gameover
  btnContinue: document.getElementById("btnContinue"),
  btnRestartPause: document.getElementById("btnRestartPause"),
  btnRestartGameOver: document.getElementById("btnRestartGameover"),
  // final stats
  finalTime: document.getElementById("finalTime"),
  finalScore: document.getElementById("finalScore"),
  finalPlayer: document.getElementById("finalPlayer"),
};

// event listener inisialisasi

// controller modal

// game logic

// game loop

// input hit detection

// utilities
