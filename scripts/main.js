import { initializeGame, startNewGame } from "./game.js";


const startBtn = document.getElementById('startBtn');
let mode;
document.getElementById('easy').addEventListener('click', setupColorGameEasy);
document.getElementById('medium').addEventListener('click', setupColorGameMedium);
document.getElementById('hard').addEventListener('click', setupColorGameHard);

const startScreen = document.getElementById('startScreen');



function setupColorGameEasy() {
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  gameScreen.style.display = 'flex';

  initializeGame();
  
  // Start the interval after clicking the start button
  setInterval(startNewGame, 2000);
}

function setupColorGameMedium() {
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  gameScreen.style.display = 'flex';

  initializeGame();
  
  // Start the interval after clicking the start button
  setInterval(startNewGame, 1500);
}

function setupColorGameHard() {
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  gameScreen.style.display = 'flex';

  initializeGame();
  
  // Start the interval after clicking the start button
  setInterval(startNewGame, 1000);
}
