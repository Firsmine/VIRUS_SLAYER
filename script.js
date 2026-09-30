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
function initEvents() {
  // validasi username input
  DOM.usernameInput.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    DOM.btnPlay.disabled = val.length === 0;
  });
  // tombol navigasi modals
  DOM.btnPlay.addEventListener("click", () => {
    playerName = DOM.usernameInput.value.trim();
    DOM.playerDisplay.textContent - playerName;
    startCountdownSequence(startGameLoop);
  });
  DOM.btnContinue.addEventListener("click", () => {
    startCountdownSequence(resumeGameLoop);
  });
  DOM.btnRestartHUD.addEventListener("click", resetGame);
  DOM.btnRestartPause.addEventListener("click", resetGame);
  DOM.btnRestartGameOver.addEventListener("click", resetGame);
  DOM.btnQuit.addEventListener("click", () => location.reload());
  // keyboard input (tuts vaksin & esc pause)
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
}

// controller modal
function switchModal(modalName) {
  DOM.overlay.classList.add("active");
  Object.values(DOM.modals).forEach((m) => m.classList.remove("active"));
  if (modalName && DOM.modals[modalName]) {
    DOM.modals[modalName].classList.add("active");
  } else {
    DOM.overlay.classList.remove("active");
  }
}
function startCountdownSequence(callback) {
  gameState = "COUNTDOWN";
  switchModal("countdown");
  let count = 3;
  DOM.countdownText.textContent = count;
  const countInterval = setInterval(() => {
    count--;
    if (count > 0) {
      DOM.countdownText.textContent = count;
    } else if (count === 0) {
      DOM.countdownText.textContent = "GO!";
    } else {
      clearInterval(countInterval);
      switchModal(null);
      callback();
    }
  }, 1000);
}

// game logic

// game loop

// input hit detection

// utilities
