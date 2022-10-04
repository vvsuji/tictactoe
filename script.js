const statusDisplay = document.querySelector('.game-status');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn!`;

const winningMessage = () => `Congrats ${currentPlayer}! You've won!`;

const drawMessage = () => `It's a draw!`;

statusDisplay.innerText = currentPlayerTurn();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellPlayed(clickedCell, i) {
  gameState[i] = currentPlayer;
  clickedCell.innerText = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.innerText = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winningCondition = winningConditions[i]; // [0,1,2]
    let a = gameState[winningCondition[0]];
    let b = gameState[winningCondition[1]];
    let c = gameState[winningCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerText = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    statusDisplay.innerText = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const index = parseInt(clickedCell.dataset.cell);

  if (gameState[index] !== '' || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, index);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.innerText = currentPlayerTurn();
  document.querySelectorAll('.cell').forEach((cell) => (cell.innerText = ''));
}

document
  .querySelectorAll('.cell')
  .forEach((cell) => cell.addEventListener('click', handleCellClick));

document.querySelector('.restart').addEventListener('click', resetClick);

function resetClick() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.innerHTML = currentPlayerTurn();
}
