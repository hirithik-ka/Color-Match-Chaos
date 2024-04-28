// script.js

const body = document.getElementsByTagName('body');
const startBtn = document.getElementById('startBtn');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const endScreen = document.getElementById('endScreen');

const pointsBox = document.getElementById('pointsBox');
let points = 0;

const gamesBox = document.getElementById('gamesBox');
let games = 1;

const score = document.getElementById('score');
score.innerHTML = points;

const targetClrBox = document.getElementById('targetClr');
const gridClrs = document.getElementById('gridClrs');

startBtn.addEventListener('click', setupColorGame);

// Start the game loop after clicking the start button
function setupColorGame() {
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  gameScreen.style.display = 'flex';

  initializeGame();
  
  // Start the interval after clicking the start button
  setInterval(startNewGame, 2000);
}

function initializeGame() {
  const clrs = [
    'rgb(238, 82, 83)',
    'rgb(253, 57, 115)',
    'rgb(87, 101, 116)',
    'rgb(95, 39, 205)',
    'rgb(6, 152, 22)',
    'rgb(29, 209, 161)',
    'rgb(243, 104, 224)',
    'rgb(255, 159, 243)',
    'rgb(230, 126, 34)',
    'rgb(254, 202, 87)',
    'rgb(56, 14, 225)',
    'rgb(84, 160, 255)',
    'rgb(1, 163, 164)',
    'rgb(0, 210, 211)'
  ];

  const targetClr = selectTargetClr(clrs);
  targetClrBox.style.backgroundColor = targetClr;

  const shuffledGridClrs = shuffleArray(clrs);
  setDivBackgroundColors(shuffledGridClrs);
}

function selectTargetClr(clrs) {
  const clrsIndex = Math.floor(Math.random() * clrs.length);
  return clrs[clrsIndex];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setDivBackgroundColors(colors) {
  const boxes = document.querySelectorAll('.clrBoxes');
  boxes.forEach((box, index) => {
    box.style.backgroundColor = colors[index];
  });
  addBoxEventListeners();
}

function addBoxEventListeners() {
  const boxes = document.querySelectorAll('.clrBoxes');
  boxes.forEach(box => {
    box.addEventListener('click', checkColorMatch);
  }); 

}

function checkColorMatch(event) {

  const clickedColor = event.target.style.backgroundColor;
  const targetColor = targetClrBox.style.backgroundColor;

  if (clickedColor === targetColor) {
    points++;
    pointsBox.textContent = `Points: ${points}`;

    // Change background color of the body to green
    document.body.style.backgroundColor = 'green';

    // Trigger the transition effect immediately after changing to green
    transitionEffect();
  } else {
    // Change background color of the body to red
    document.body.style.backgroundColor = 'red';
    transitionEffect();
  }

  // Remove event listeners from all boxes
  const boxes = document.querySelectorAll('.clrBoxes');
  boxes.forEach(box => {
    box.removeEventListener('click', checkColorMatch);
  });

  
}

function transitionEffect() {

  // After the transition is complete, change background color to white and reset opacity
  setTimeout(() => {
    document.body.style.backgroundColor = 'aliceblue';

  }, 200);
}



// setInterval(startNewGame, 3000);

function startNewGame() {
  if (games < 10) {
    initializeGame();
    games++;
    gamesBox.textContent = `Games: ${games}`;
  } else {
    gameScreen.style.display = 'none';
    endScreen.style.display = 'block';
    const score = document.getElementById('score');
score.innerHTML = points;
  }
}
