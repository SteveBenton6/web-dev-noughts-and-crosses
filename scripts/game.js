// JS Comments Format

function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    "You won, <span id='winner-name'>PLAYER NAME</span>!";
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.innerText = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.innerText = players[activePlayer].name;
}

function selectGameField(event) {
  if (gameIsOver) {
    return;
  }

  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select an empty field!");
    return;
  }

  selectedField.innerText = players[activePlayer].symbol; // players[0]
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  console.log(gameData);

  const winnerId = checkForGameOver();

  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  // Checking the rows for equality
  for (r = 0; r < 3; r++) {
    if (
      gameData[r][0] > 0 &&
      gameData[r][0] === gameData[r][1] &&
      gameData[r][1] === gameData[r][2]
    ) {
      return gameData[r][0];
    }
  }

  // Checking the columns for equality
  for (c = 0; c < 3; c++) {
    if (
      gameData[0][c] > 0 &&
      gameData[0][c] === gameData[1][c] &&
      gameData[1][c] === gameData[2][c]
    ) {
      return gameData[0][c];
    }
  }

  // Checking the diagonal: Top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // Checking the diagonal: Top right to bottom left
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[2][0];
  }

  // Checking for draw
  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.innerText = winnerName;
  } else {
    gameOverElement.firstElementChild.innerText = "It\'s a draw!";
  }
}
