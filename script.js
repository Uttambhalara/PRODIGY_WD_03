let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      gameActive = false;
      return boardState[a];
    }
  }

  if (!boardState.includes('')) {
    gameActive = false;
    return 'tie';
  }

  return null;
}

function handleCellClick(index) {
  if (!gameActive || boardState[index] !== '') return;

  boardState[index] = currentPlayer;
  document.getElementById(`cell${index}`).innerText = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    if (winner === 'tie') {
      alert('It\'s a tie!');
    } else {
      alert(`Player ${winner} wins!`);
    }
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function createGameBoard() {
  const gameBoard = document.getElementById('gameBoard');
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id', `cell${i}`);
    cell.addEventListener('click', () => handleCellClick(i));
    gameBoard.appendChild(cell);
  }
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  boardState = ['', '', '', '', '', '', '', '', ''];
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.innerText = '';
  });
}

window.onload = () => {
  createGameBoard();
  const restartBtn = document.getElementById('restartBtn');
  restartBtn.addEventListener('click', restartGame);
};


