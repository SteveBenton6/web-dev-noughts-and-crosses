// JS Comments Format

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
  }
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

  const winnerID = checkForGameOver();
  console.log(winnerID);

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
