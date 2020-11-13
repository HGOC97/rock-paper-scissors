const gameOptions = document.querySelectorAll(".game-option");
const playerScoreText = document.querySelector("#player-score");
const computerScoreText = document.querySelector("#computer-score");
const roundCountText = document.querySelector("#round");
const winnerText = document.querySelector("#winner");
const computerSelectionText = document.querySelector("#computer-selection");
let tempCompSelection;
let playerScore = 0;
let computerScore = 0;
let roundCount = 0;

gameOptions.forEach((gameOption) => {
    gameOption.addEventListener("click", function(e) {
        if (roundCount < 5) {
            game(e.target.id);
            roundCount++;
            roundCountText.textContent = `Round: ${roundCount + 1}`;
            tempCompSelection = tempCompSelection === 0 ? "Rock"
            : tempCompSelection === 1 ? "Paper"
            : "scissors";
        }
        if (roundCount === 5) {
            roundCountText.textContent = "Round: 5";
            winnerText.style["display"] = "block";
            if (playerScore > computerScore) {
                winnerText.textContent = "You are the winner!";
            } else if (playerScore < computerScore) {
                winnerText.textContent = "You lost, computer won!";
            } else {
                winnerText.textContent = "It's a draw!";
            }
        }
        computerSelectionText.textContent = `Computer Chose ${tempCompSelection}`;
    })
})

// Let the computer make a random selection
function computerPlay() {
    let randomNumber = Math.random();
    if (randomNumber <= 0.33) {
        return 0; // Rock
    } else if (randomNumber > 0.33 && randomNumber <= 0.66) {
        return 1; // Paper
    } else {
        return 2; // Scissors
    }
}

// One round of rock, paper, scissors
function gameRound(playerSelection, computerSelection) {
    tempCompSelection = computerSelection;
    if (playerSelection.toLowerCase() === "rock") {
        if (computerSelection === 0) {
            return "Both chose rock, it's a draw!";
        } else if(computerSelection === 1) {
            return "Computer chose paper, you lost!";
        } else {
            return "Computer chose scissors, you won!";
        }
    } else if (playerSelection.toLowerCase() === "paper") {
        if (computerSelection === 0) {
            return "Computer chose rock, you won!";
        } else if (computerSelection === 1) {
            return "Computer chose paper, it's a draw!";
        } else {
            return "Computer chose scissors, you lost!";
        }
    } else if(playerSelection.toLowerCase() === "scissors") {
        if (computerSelection === 0) {
            return "Computer chose rock, you lost!";
        } else if (computerSelection === 1) {
            return "Computer chose paper, you won!";
        } else {
            return "Computer chose scissors, it's a draw!";
        }
    } else {
        // If the user hasn't entered rock, paper or scissors as input
        return "Invalid input!";
    }
}

// Run the game a few times and track the score
function game(playerSelection) {

    let roundResult;
    roundResult = gameRound(playerSelection, computerPlay());
    resultCheck = roundResult.slice(-4);
    if (resultCheck === "won!") {
        playerScore++;
    } else if (resultCheck === "ost!") {
        computerScore++;
    }
    playerScoreText.textContent = `Player Score: ${playerScore}`;
    computerScoreText.textContent = `Computer Score: ${computerScore}`;

}