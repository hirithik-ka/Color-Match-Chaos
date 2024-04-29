export const startScreen = document.getElementById('startScreen');
export const gameScreen = document.getElementById('gameScreen');
export const endScreen = document.getElementById('endScreen');

const continueBtn = document.getElementById('continue');

continueBtn.addEventListener('click', () => {
  endScreen.style.display = 'none';
  startScreen.style.display = 'block';
});

const pointsBox = document.getElementById('pointsBox');
let points = 0;

const gamesBox = document.getElementById('gamesBox');
let games = 1;

let gamesPlayed = 0;

const score = document.getElementById('score');
score.innerHTML = points;

document.getElementById('easy').addEventListener('click', () => setupColorGame('easy', 2000));
document.getElementById('medium').addEventListener('click', () => setupColorGame('medium', 1500));
document.getElementById('hard').addEventListener('click', () => setupColorGame('hard', 1300));

const targetClrBox = document.getElementById('targetClr');

export function initializeGame() {
  const clrs = [
    'rgb(238, 82, 83)',
    'rgb(87, 101, 116)',
    'rgb(253, 57, 115)',
    'rgb(95, 39, 205)',
    'rgb(84, 160, 255)',
    'rgb(243, 104, 224)',
    'rgb(6, 152, 22)',
    'rgb(29, 209, 161)',
    'rgb(255, 159, 243)',
    'rgb(230, 126, 34)',
    'rgb(1, 163, 164)',
    'rgb(254, 202, 87)',
    'rgb(56, 14, 225)',
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
    document.body.style.backgroundColor = 'green';
    transitionEffect();
  } else {
    document.body.style.backgroundColor = 'red';
    transitionEffect();
  }

  const boxes = document.querySelectorAll('.clrBoxes');
  boxes.forEach(box => {
    box.removeEventListener('click', checkColorMatch);
  });
}

function transitionEffect() {
  setTimeout(() => {
    document.body.style.backgroundColor = 'aliceblue';
  }, 200);
}

export function startNewGame() {
  console.log('Starting new game...'); // Add this line to check if startNewGame is called
  if (games < 10) {
    games++;
    gamesPlayed = 0;
    console.log(`Games: ${games}`); // Add this line to check the value of games
    gamesBox.textContent = `Games: ${games}`;
    pointsBox.textContent = `Points: ${points}`;
  } else {
    gameScreen.style.display = 'none';
    endScreen.style.display = 'block';
    score.innerHTML = points;
    games = 1;
    points = 0;
    gamesPlayed = 0;
    pointsBox.textContent = `Points: ${points}`;
    gamesBox.textContent = `Games: ${games}`;
  }
}

console.log(gamesBox);

let gameInterval; // Define game interval variable

export function setupColorGame(difficulty, intervalTime) {
  clearInterval(gameInterval); // Clear any existing game interval

  points = 0;
  games = 0;
  gamesPlayed = 0;
  pointsBox.textContent = `Points: ${points}`; 

  startScreen.style.display = 'none';
  gameScreen.classList.remove('hidden');
  gameScreen.style.display = 'flex';
  endScreen.style.display = 'none';

  gamesBox.textContent = `Games: ${games}`;

  // Start a new game immediately after setting up the game
  initializeGame();
  
  // Start a new game interval
  gameInterval = setInterval(() => {
    gamesPlayed++;
    startNewGame(); // Call startNewGame() after initializing the game
    initializeGame(); // Initialize the game for the next round
  }, intervalTime);
}
