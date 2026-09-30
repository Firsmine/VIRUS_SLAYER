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
function startGameLoop() {
  gameState = "PLAYING";
  lastFrameTime = performance.now();
  // timer
  if (!gameTimerInterval) {
    gameTimerInterval = setInterval(() => {
      if (gameState === "PLAYING") {
        timeElapsed++;
        updateHUD();
      }
    }, 1000);
  }
  animationFrameId = requestAnimationFrame(gameLoop);
}
function resumeGameLoop() {
  gameState = "PLAYING";
  lastFrameTime = performance.now();
  animationFrameId = requestAnimationFrame(gameLoop);
}
function resetGame() {
  gameState = "IDLE";
  cancelAnimationFrame(animationFrameId);
  clearInterval(gameTimerInterval);
  gameTimerInterval = null;
  score = 0;
  fail = 0;
  timeElapsed = 0;
  spawnTimer = 0;
  viruses = [];
  DOM.virusContainer.innerHTML = "";
  updateHUD();
  startCountdownSequence(startGameLoop);
}
function togglePause() {
  if (gameState === "PLAYING") {
    gameState = "PAUSED";
    switchModal("pause");
  } else if (gameState === "PAUSED") {
    startCountdownSequence(resumeGameLoop);
  }
}
function triggerGameOver() {
  gameState = "GAMEOVER";
  clearInterval(gameTimerInterval);
  gameTimerInterval = null;
  DOM.finalPlayer.textContent = playerName;
  DOM.finalTime.textContent = formatTime(timeElapsed);
  DOM.finalScore.textContent = score;
  switchModal("gameover");
}

// game loop
function gameLoop(timestamp) {
  if (gameState !== "PLAYING") return;
  // kalkulasi deltatime
  const deltaTime = (timestamp - lastFrameTime) / 1000;
  lastFrameTime = timestamp;
  updateEngine(deltaTime);
  drawEngine;
  if (gameState === "PLAYING") {
    animationFrameId = requestAnimationFrame(gameLoop);
  }
}
function updateEngine(deltaTime) {
  // spawn virus setiap 1 detik
  spawnTimer += deltaTime * 1000;
  if (spawnTimer >= CONFIG.spawnInterval) {
    spawnTimer = 0;
    spawnVirus();
  }
  // pergerakan & deteksi fail
  for (let i = viruses.length - 1; i >= 0; i--) {
    let v = viruses[i];
    v.y += CONFIG.baseSpeed * deltaTime;

    if (v.y > CONFIG.dangeAreaBottom) {
      fail++;
      removeVirusDOM(v.id);
      viruses.splice(i, 1);
      updateHUD();
      if (fail >= CONFIG.maxFail) {
        triggerGameOver();
        return;
      }
    }
  }
}
function drawEngine() {
  viruses.forEach((v) => {
    const el = document.getElementById(v.id);
    if (el) {
      el.style.transform = `translateY(${v.y}px)`;
    }
  });
}
function spawnVirus() {
  const laneIndex = Math.floor(Math.random() * 4);
  const id = `virus-${virusIdCounter++}`;
  // register data ke array
  viruses.push({ id, lane: laneIndex, y: CONFIG.virusSpawnY });
  // inject elemen ke DOM
  const virusEl = document.createElement("div");
  virusEl.className = "virus";
  virusEl.id = id;
  // hitung posisi horizontal (tiap lane menempati lebar 25%)
  // offset sedikit ke tengah agar sejajar sempurna (Lane 25% = 240px -> offset 95px untuk virus 50px)
  const laneWidth = 960 / 4 - 70;
  virusEl.style.left = `${laneIndex * 240 + 240 / 2 - CONFIG.virusSize / 2}px`;
  virusEl.style.transform = `translateY(${CONFIG.virusSpawnY}px)`;
  DOM.virusContainer.appendChild(virusEl);
}

// input hit detection
function handleKeyDown(e) {
  const key = e.key.toLowerCase();
  // pause
  if (key === "escape") {
    togglePause();
    return;
  }
  if (gameState !== "PLAYING") return;

  const laneIndex = CONFIG.keys.indexOf(key);
  if (laneIndex !== -1) {
    DOM.lanes[laneIndex].classList.add("active");
    checkHit(laneIndex);
  }
}
function handleKeyUp(e) {
  const key = e.key.toLowerCase();
  const laneIndex = CONFIG.keys.indexOf(key);
  if (laneIndex !== -1) {
    DOM.lanes[laneIndex].classList.remove("active");
  }
}
function checkHit(laneIndex) {
  for (let i = 0; i < viruses.length; i++) {
    let v = viruses[i];
    if (v.lane === laneIndex) {
      const virusBottomY = v.y + CONFIG.virusSize;
      if (
        virusBottomY >= CONFIG.dangerAreaTop &&
        v.y <= CONFIG.dangeAreaBottom
      ) {
        score++;
        removeVirusDOM(v.id);
        viruses.splice(i, 1);
        updateHUD();
        break;
      }
    }
  }
}
function removeVirusDOM(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// utilities
function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
function updateHUD() {
  DOM.scoreDisplay.textContent = score;
  DOM.failDisplay.textContent = fail;
  DOM.timeDisplay.textContent = formatTime(timeElapsed);
}
window.onload = initEvents;
