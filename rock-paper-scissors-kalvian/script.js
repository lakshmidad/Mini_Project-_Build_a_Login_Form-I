/*
  Rock • Paper • Scissors — Core logic preserved, UI enhancements added
  - Core rules: rock > scissors, paper > rock, scissors > paper
  - First to 5 wins (configurable)
  - Sound and animation hooks for interactions
*/

const WIN_TARGET = 5; // core game target. Do not change game rules.

// DOM Refs
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const roundResultEl = document.getElementById('roundResult');
const playerPickImg = document.getElementById('playerPick');
const computerPickImg = document.getElementById('computerPick');
const choiceButtons = document.querySelectorAll('.choice');
const resetBtn = document.getElementById('resetBtn');

// Sound Refs
const sfxClick = document.getElementById('sfxClick');
const sfxWin = document.getElementById('sfxWin');
const sfxLose = document.getElementById('sfxLose');
const sfxDraw = document.getElementById('sfxDraw');

// Assets map for images
const ICONS = {
  rock: 'assets/img/rock.svg',
  paper: 'assets/img/paper.svg',
  scissors: 'assets/img/scissors.svg',
  question: 'assets/img/question.svg'
};

let scores = { player: 0, computer: 0 };
let isLocked = false; // prevent spamming during animations

function computerChoice() {
  const options = ['rock', 'paper', 'scissors'];
  const idx = Math.floor(Math.random() * options.length);
  return options[idx];
}

function getOutcome(player, computer) {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'win';
  }
  return 'lose';
}

function updateUI(player, computer, outcome) {
  // set picks
  playerPickImg.src = ICONS[player];
  computerPickImg.src = ICONS[computer];

  // pop animation
  playerPickImg.classList.remove('pop');
  computerPickImg.classList.remove('pop');
  void playerPickImg.offsetWidth; // reflow to restart animation
  void computerPickImg.offsetWidth;
  playerPickImg.classList.add('pop');
  computerPickImg.classList.add('pop');

  // result text + flash color
  roundResultEl.classList.remove('flash-win', 'flash-lose', 'flash-draw');
  if (outcome === 'win') {
    roundResultEl.textContent = `You win this round! ${capitalize(player)} beats ${capitalize(computer)}.`;
    roundResultEl.classList.add('flash-win');
  } else if (outcome === 'lose') {
    roundResultEl.textContent = `You lose this round! ${capitalize(computer)} beats ${capitalize(player)}.`;
    roundResultEl.classList.add('flash-lose');
  } else {
    roundResultEl.textContent = `It's a draw! You both chose ${capitalize(player)}.`;
    roundResultEl.classList.add('flash-draw');
  }
}

function playSounds(outcome) {
  // Respect browser policies: play only on user interaction
  try { sfxClick.currentTime = 0; sfxClick.play(); } catch (e) {}
  const map = { win: sfxWin, lose: sfxLose, draw: sfxDraw };
  const a = map[outcome];
  if (!a) return;
  // small delay for effect
  setTimeout(() => { try { a.currentTime = 0; a.play(); } catch (e) {} }, 120);
}

function applyOutcome(outcome) {
  if (outcome === 'win') scores.player += 1;
  else if (outcome === 'lose') scores.computer += 1;
  // draw doesn't change scores

  playerScoreEl.textContent = scores.player;
  computerScoreEl.textContent = scores.computer;
}

function checkGameEnd() {
  if (scores.player >= WIN_TARGET || scores.computer >= WIN_TARGET) {
    isLocked = true;
    const playerWon = scores.player > scores.computer;
    roundResultEl.classList.remove('flash-win', 'flash-lose', 'flash-draw');
    if (playerWon) {
      roundResultEl.textContent = 'Victory! You reached the target.';
      roundResultEl.classList.add('flash-win');
    } else {
      roundResultEl.textContent = 'Defeat! Computer reached the target.';
      roundResultEl.classList.add('flash-lose');
    }
  }
}

function onPlayerChoice(choice) {
  if (isLocked) return;
  const cpu = computerChoice();
  const outcome = getOutcome(choice, cpu);
  updateUI(choice, cpu, outcome);
  playSounds(outcome);
  applyOutcome(outcome);
  checkGameEnd();
}

function resetGame() {
  scores.player = 0;
  scores.computer = 0;
  playerScoreEl.textContent = '0';
  computerScoreEl.textContent = '0';
  playerPickImg.src = ICONS.question;
  computerPickImg.src = ICONS.question;
  roundResultEl.textContent = 'Make your move!';
  roundResultEl.classList.remove('flash-win', 'flash-lose', 'flash-draw');
  isLocked = false;
  try { sfxClick.currentTime = 0; sfxClick.play(); } catch (e) {}
}

function capitalize(s) { return s[0].toUpperCase() + s.slice(1); }

// Events
choiceButtons.forEach(btn => {
  btn.addEventListener('click', () => onPlayerChoice(btn.dataset.choice));
});
resetBtn.addEventListener('click', resetGame);

// Accessibility: allow keyboard shortcuts R, P, S, and Enter on focused button
window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (k === 'r') onPlayerChoice('rock');
  if (k === 'p') onPlayerChoice('paper');
  if (k === 's') onPlayerChoice('scissors');
});
