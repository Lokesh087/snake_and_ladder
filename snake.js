document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const rollDiceButton = document.getElementById('rollDice');
    const diceResult = document.getElementById('diceResult');
    let player1Position = 0;
    let player2Position = 0;
    let currentPlayer = 1;

    // Generate the board
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        board.appendChild(cell);
    }

    // Add players to the starting position
    const player1 = document.createElement('div');
    player1.classList.add('player', 'player1');
    const player2 = document.createElement('div');
    player2.classList.add('player', 'player2');
    document.querySelector('.cell[data-index="0"]').appendChild(player1);
    document.querySelector('.cell[data-index="0"]').appendChild(player2);

    // Roll dice event
    rollDiceButton.addEventListener('click', () => {
        const diceValue = Math.floor(Math.random() * 6) + 1;
        diceResult.textContent = `Dice Result: ${diceValue}`;
        movePlayer(diceValue);
    });

    function movePlayer(diceValue) {
        let currentPlayerPosition = currentPlayer === 1 ? player1Position : player2Position;
        currentPlayerPosition += diceValue;

        if (currentPlayerPosition >= 100) {
            alert(`Player ${currentPlayer} wins!`);
            resetGame();
            return;
        }

        const currentCell = document.querySelector(`.cell[data-index="${currentPlayerPosition}"]`);
        if (currentPlayer === 1) {
            player1Position = currentPlayerPosition;
            currentCell.appendChild(player1);
        } else {
            player2Position = currentPlayerPosition;
            currentCell.appendChild(player2);
        }

        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    function resetGame() {
        player1Position = 0;
        player2Position = 0;
        currentPlayer = 1;
        document.querySelector('.cell[data-index="0"]').appendChild(player1);
        document.querySelector('.cell[data-index="0"]').appendChild(player2);
    }
});