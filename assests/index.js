const colors = [
  "#FF0000", "#00FFFF", "#00FF00", "#FF00FF", "#0000FF", "#FFFF00",
  "#FFA500", "#4169E1", "#32CD32", "#800080", "#FF1493", "#008080",
  "#FF6666", "#CC3333", "#66FFFF", "#33CCCC", "#66FF66", "#33CC33",
  "#FF66FF", "#CC33CC", "#6666FF", "#3333CC", "#FFFF66", "#CCCC33",
  "#FFCC66", "#CC9933", "#6A91F0", "#3159B0", "#66E066", "#28A745",
  "#B266B2", "#662266", "#FF66B2", "#CC337A", "#66CCCC", "#336666"
];

const elements = {
  colorBox: document.querySelector('[data-testid="colorBox"]'),
  colorOptions: document.querySelector('.color-options'),
  gameStatus: document.querySelector('[data-testid="gameStatus"]'),
  score: document.querySelector('[data-testid="score"]'),
  newGameButton: document.querySelector('[data-testid="newGameButton"]'),
  gameOverModal: document.getElementById("gameOverModal"),
  finalScore: document.getElementById("finalScore"),
  closeModalButton: document.getElementById("closeModal"),
  endGameButton: document.querySelector(".end-game")
};

let targetColor, score = 0;

const closeShadesMap = {
  "#FF0000": ["#FF6666", "#CC3333"],  
  "#00FFFF": ["#66FFFF", "#33CCCC"], 
  "#00FF00": ["#66FF66", "#33CC33"],  
  "#FF00FF": ["#FF66FF", "#CC33CC"],  
  "#0000FF": ["#6666FF", "#3333CC"],  
  "#FFFF00": ["#FFFF66", "#CCCC33"],  
  "#FFA500": ["#FFCC66", "#CC9933"],  
  "#4169E1": ["#6A91F0", "#3159B0"],  
  "#32CD32": ["#66E066", "#28A745"], 
  "#800080": ["#B266B2", "#662266"],  
  "#FF1493": ["#FF66B2", "#CC337A"],  
  "#008080": ["#66CCCC", "#336666"]   
};


// Initialize Game
function initGame() {
  score = 0;
  elements.score.textContent = score;
  elements.gameOverModal.style.display = "none"; 
  startNewRound();
}

// Start a new round
function startNewRound() {
  targetColor = Object.keys(closeShadesMap)[Math.floor(Math.random() * 12)];
  elements.colorBox.style.backgroundColor = targetColor;

  const closeShades = closeShadesMap[targetColor] || [];
  const shuffledColors = colors
    .filter(color => !closeShades.includes(color) && color !== targetColor)
    .sort(() => Math.random() - 0.5);
  
  const colorOptionsArray = [...shuffledColors.slice(0, 3), targetColor, ...closeShades]
    .sort(() => Math.random() - 0.5);
  
  elements.colorOptions.innerHTML = colorOptionsArray.map(color =>
    `<button style="background-color: ${color}" data-color="${color}" data-testid="colorOption"></button>`
  ).join("");

  elements.gameStatus.textContent = "";
}


// Handle user guess
elements.colorOptions.addEventListener("click", event => {
  if (event.target.tagName === "BUTTON") {
    const selectedColor = event.target.dataset.color;
    if (selectedColor === targetColor) {
      elements.gameStatus.textContent = "Correct!🎉";
      elements.score.textContent = ++score;
      setTimeout(startNewRound, 1000);
    } else {
      elements.gameStatus.textContent = "Wrong! Try again.😞";
    }
  }
});

// End Game
elements.endGameButton.addEventListener("click", () => {
  elements.finalScore.textContent = score;
  elements.gameOverModal.style.display = "flex";
});

// Close modal
elements.closeModalButton.addEventListener("click", () => {
  elements.gameOverModal.style.display = "none";
  initGame()
});

// Start New Game
elements.newGameButton.addEventListener("click", initGame);

// Start the game
initGame();
