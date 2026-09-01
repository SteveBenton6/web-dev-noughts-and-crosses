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
  event.target.innerText = players[activePlayer].symbol; // players[0]
  event.target.classList.add("disabled");
  switchPlayer();
}
