const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const playBotBtn = document.getElementById('play-bot');
const iconXSelect = document.getElementById('icon-x');
const iconOSelect = document.getElementById('icon-o');

let currentPlayer = 'X';
let gameActive = true;
let board = Array(9).fill("");
let playAgainstBot = false;
let iconX = "❌";
let iconO = "⭕";

iconXSelect.addEventListener('change', () => {
    iconX = iconXSelect.value;
});

iconOSelect.addEventListener('change', () => {
    iconO = iconOSelect.value;
});

playBotBtn.addEventListener('click', () => {
    playAgainstBot = true;
    alert('Now playing vs Bot!');
});

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.innerHTML = currentPlayer === 'X' ? iconX : iconO;

    checkWinner();

    if (playAgainstBot && currentPlayer === 'O' && gameActive) {
        setTimeout(botMove, 500);
    }
}

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

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            highlightCells(a, b, c);
            statusText.innerHTML = `🎉 ${currentPlayer === 'X' ? 'Player X' : 'Player O'} Wins! 🎉`;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "Draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `${currentPlayer === 'X' ? 'Player X' : 'Player O'}'s Turn`;
    }
}

function highlightCells(a, b, c) {
    const cells = document.querySelectorAll('.cell');
    cells[a].classList.add('highlight');
    cells[b].classList.add('highlight');
    cells[c].classList.add('highlight');
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
