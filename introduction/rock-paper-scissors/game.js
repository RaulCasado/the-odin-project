document.addEventListener("DOMContentLoaded", () => {
    const emojis = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️'
    };

    const welcomeScreen = document.querySelector("#welcome-screen");
    const gameScreen = document.querySelector("#game-screen");
    const startGameBtn = document.querySelector("#start-game-btn");
    const replayBtn = document.querySelector("#replay-btn");
    const resultsDiv = document.querySelector("#results");
    const choiceBtns = document.querySelectorAll(".choice-btn");

    // Update button text to show emoji
    choiceBtns.forEach(btn => {
        const choice = btn.dataset.choice;
        btn.textContent = emojis[choice] || choice;
    });

    class Game {
        constructor() {
            this.state = {
                humanScore: 0,
                computerScore: 0,
                roundsPlayed: 0
            };
        }

        getComputerChoice() {
            const choices = ['rock', 'paper', 'scissors'];
            return choices[Math.floor(Math.random() * choices.length)];
        }

        playRound(humanChoice) {
            const computerChoice = this.getComputerChoice();
            const result = this.calculateResult(humanChoice, computerChoice);
            
            this.state.roundsPlayed++;
            return {
                humanChoice,
                computerChoice,
                ...result
            };
        }

        calculateResult(human, computer) {
            if (human === computer) {
                return { 
                    result: 'tie',
                    humanScore: this.state.humanScore,
                    computerScore: this.state.computerScore
                };
            }

            const winConditions = { 
                rock: 'scissors', 
                paper: 'rock', 
                scissors: 'paper' 
            };

            if (winConditions[human] === computer) {
                this.state.humanScore++;
                return {
                    result: 'win',
                    humanScore: this.state.humanScore,
                    computerScore: this.state.computerScore
                };
            }

            this.state.computerScore++;
            return {
                result: 'lose',
                humanScore: this.state.humanScore,
                computerScore: this.state.computerScore
            };
        }

        reset() {
            this.state = {
                humanScore: 0,
                computerScore: 0,
                roundsPlayed: 0
            };
        }

        isGameOver() {
            return this.state.roundsPlayed >= 5;
        }
    }

    let currentGame;

    function updateResults(result) {
        clearResults();
        
        const resultElement = document.createElement('div');
        resultElement.className = 'result';
        resultElement.innerHTML = `
            <p><strong>Round ${currentGame.state.roundsPlayed}</strong></p>
            <p>
                <span class="choice-label">You:</span> ${emojis[result.humanChoice]}<br>
                <span class="choice-label">Computer:</span> ${emojis[result.computerChoice]}
            </p>
            <p class="result-message">${getResultText(result.result)}</p>
            <p class="score">Score: You ${result.humanScore} - Computer ${result.computerScore}</p>
        `;
        resultsDiv.appendChild(resultElement);
    }

    function showFinalResults() {
        clearResults();
        
        const finalResult = document.createElement('div');
        finalResult.className = 'final-result';
        
        let resultText;
        if (currentGame.state.humanScore === currentGame.state.computerScore) {
            resultText = "It's a tie game!";
        } else if (currentGame.state.humanScore > currentGame.state.computerScore) {
            resultText = "Congratulations! You win the game!";
        } else {
            resultText = "Sorry! Computer wins the game!";
        }

        finalResult.innerHTML = `
            <h3>Game Over!</h3>
            <p>Final Score: You ${currentGame.state.humanScore} - Computer ${currentGame.state.computerScore}</p>
            <p>${resultText}</p>
        `;

        resultsDiv.appendChild(finalResult);
        replayBtn.classList.remove("hidden");
        
        console.log(`Game Over! Final Score: You ${currentGame.state.humanScore} - Computer ${currentGame.state.computerScore}`);
        console.log(resultText);
    }

    function getResultText(result) {
        return {
            win: 'You win this round!',
            lose: 'Computer wins this round!',
            tie: 'It\'s a tie!'
        }[result];
    }

    function clearResults() {
        while (resultsDiv.firstChild) {
            resultsDiv.removeChild(resultsDiv.firstChild);
        }
    }

    function handleChoiceClick(e) {
        if (!currentGame || currentGame.isGameOver()) return;

        const humanChoice = e.target.dataset.choice;
        const result = currentGame.playRound(humanChoice);
        console.log(result);
        updateResults(result);
        console.log(`Round ${currentGame.state.roundsPlayed}: You chose ${humanChoice} (${emojis[humanChoice]}), Computer chose ${result.computerChoice} (${emojis[result.computerChoice]}). Result: ${result.result}`);
        
        if (currentGame.isGameOver()) {
            showFinalResults();
        }
    }

    function initializeGame() {
        currentGame = new Game();
        clearResults();

        const placeholder = document.createElement('div');
        placeholder.className = 'results-placeholder';
        placeholder.textContent = 'Make your first move to start!';
        resultsDiv.appendChild(placeholder);

        resultsDiv.scrollTop = 0;
        replayBtn.classList.add("hidden");
        gameScreen.classList.remove("hidden");
        welcomeScreen.classList.add("hidden");
    }

    startGameBtn.addEventListener("click", initializeGame);
    replayBtn.addEventListener("click", initializeGame);
    choiceBtns.forEach(btn => {
        btn.addEventListener("click", handleChoiceClick);
    });
});