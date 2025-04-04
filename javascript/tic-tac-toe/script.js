const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => [...board];
    const reset = () => board.fill('');
    const isCellEmpty = index => board[index] === '';
    
    const placeMarker = (index, marker) => {
        if (isCellEmpty(index)) {
            board[index] = marker;
            return true;
        }
        return false;
    };

    const checkWin = (marker) => {
        const winPatterns = [
            [0,1,2], [3,4,5], [6,7,8], // Rows
            [0,3,6], [1,4,7], [2,5,8], // Columns
            [0,4,8], [2,4,6] // Diagonals
        ];
        return winPatterns.some(pattern => 
            pattern.every(i => board[i] === marker)
        );
    };

    const checkTie = () => board.every(cell => cell !== '');

    return { getBoard, reset, placeMarker, isCellEmpty, checkWin, checkTie };
})();

const Player = (name, marker) => ({ name, marker });

const GameController = (() => {
    let players = [];
    let currentPlayer;
    let gameActive = false;

    const startNewGame = (p1Name = 'Player 1', p2Name = 'Player 2') => {
        players = [
            Player(p1Name, 'X'),
            Player(p2Name, 'O')
        ];
        currentPlayer = players[0];
        gameActive = true;
        Gameboard.reset();
        DisplayController.updateMessage(`${currentPlayer.name}'s turn (${currentPlayer.marker})`);
        DisplayController.render();
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        DisplayController.updateMessage(`${currentPlayer.name}'s turn (${currentPlayer.marker})`);
    };

    const handleTurn = (index) => {
        if (!gameActive || !Gameboard.isCellEmpty(index)) return;

        Gameboard.placeMarker(index, currentPlayer.marker);
        DisplayController.render();

        if (Gameboard.checkWin(currentPlayer.marker)) {
            DisplayController.updateMessage(`${currentPlayer.name} wins! 🎉`);
            gameActive = false;
        } else if (Gameboard.checkTie()) {
            DisplayController.updateMessage("It's a tie! 🤝");
            gameActive = false;
        } else {
            switchPlayer();
        }
    };

    return { startNewGame, handleTurn };
})();

const DisplayController = (() => {
    const cells = document.querySelectorAll('.cell');
    const messageEl = document.getElementById('message');
    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');

    const render = () => {
        Gameboard.getBoard().forEach((marker, index) => {
            cells[index].textContent = marker;
        });
    };

    const updateMessage = (message) => {
        messageEl.textContent = message;
    };

    const bindEvents = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                if (index !== undefined) GameController.handleTurn(parseInt(index));
            });
        });

        startBtn.addEventListener('click', () => {
            const p1 = document.getElementById('player1').value || 'Player 1';
            const p2 = document.getElementById('player2').value || 'Player 2';
            GameController.startNewGame(p1, p2);
        });

        restartBtn.addEventListener('click', () => {
            GameController.startNewGame(
                document.getElementById('player1').value || 'Player 1',
                document.getElementById('player2').value || 'Player 2'
            );
        });
    };

    return { render, updateMessage, bindEvents };
})();

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    DisplayController.bindEvents();
    DisplayController.render();
});