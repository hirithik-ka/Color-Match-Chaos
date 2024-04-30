const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const endScreen = document.getElementById('endScreen');

const continueBtn = document.getElementById('continue');

continueBtn.addEventListener('click', () => {
  endScreen.style.display = 'none';
  startScreen.style.display = 'block';
});

const pointsBox = document.getElementById('pointsBox');
let points = 0;

const gamesBox = document.getElementById('gamesBox');
let games = 0;

let gamesPlayed = 0;

const score = document.getElementById('score');
score.innerHTML = points;

document.getElementById('easy').addEventListener('click', () => setupColorGame('easy', 2000));
document.getElementById('medium').addEventListener('click', () => setupColorGame('medium', 1500));
document.getElementById('hard').addEventListener('click', () => setupColorGame('hard', 1200));

const targetClrBox = document.getElementById('targetClr');

function initializeGame() {
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
    document.body.style.backgroundColor = '#171717';
  }, 200);
}

function startNewGame() {
  if (games < 10) {
    games++;
    gamesPlayed = 0;
    gamesBox.textContent = `Games: ${games}`;
    pointsBox.textContent = `Points: ${points}`;
  } else {
    gameScreen.style.display = 'none';
    endScreen.style.display = 'block';
    score.innerHTML = points;
    games = 0;
    points = 0;
    gamesPlayed = 0;
    pointsBox.textContent = `Points: ${points}`;
    gamesBox.textContent = `Games: ${games}`;
  }
}

const encourageBox = document.getElementById('encourageBox');

function setupColorGame(difficulty, intervalTime) {
  points = 0;
  games = 0;
  gamesPlayed = 0;
  pointsBox.textContent = `Points: ${points}`; 

  startScreen.style.display = 'none';
  gameScreen.classList.remove('hidden');
  gameScreen.style.display = 'flex';
  endScreen.style.display = 'none';

  gamesBox.textContent = `Games: ${games}`;

  playGame(intervalTime);

  if (difficulty === 'easy') {
    encourageBox.innerHTML = `
    You breezed through Easy mode! <br>
    Think you're up for the challenge of Medium mode?
    `;
  } else if (difficulty === 'medium') {
    encourageBox.innerHTML = `
    You're unstoppable! <br>
    Ready to test your skills against the toughest challenges in Hard mode?
    `;
  } else if (difficulty === 'hard') {
    encourageBox.innerHTML = `
    Well done! Now it's time to raise the stakes and try your luck!
    `;
  } else {
    // Default
    encourageBox.innerHTML = `Impressive!`;
  }
}

function playGame(intervalTime) {
  initializeGame(); // Initialize the game immediately
  startNewGame(); // Start the new game immediately

  let gameInterval = setInterval(() => {
    
    if (endScreen.style.display === 'block' ||   startScreen.style.display === 'block') {
      clearInterval(gameInterval); // Clear the game interval once all games are played

    }

    if (gamesPlayed < 10) {
      gamesPlayed++;
      initializeGame();
      startNewGame();
    } else {
      score.innerHTML = points;
      gameScreen.style.display = 'none';
      endScreen.style.display = 'block';
    }
  }, intervalTime);
}

