const board = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];

const winningMoves = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


const game = {
    player01: {
        player: "X",
        plays: 0,
        moves: []
    },
    player02: {
        player: "O",
        plays: 0,
        moves: []
    },
    isActive: true

}
let gameState = ["", "", "", "", "", "", "", "", ""];


//DOM Variables
const boardDiv = document.getElementById('game');
const cells = document.getElementsByClassName('cell');
const playerdiv = document.getElementById('player');
//Js Variables
let currentPlayer = game.player01.player;
let gameActive = game.isActive;

//Start the Game with Player X
playerdiv.textContent = `Player: ${currentPlayer} starts`;

//1. Check that the cell is clicked
function clickOnCell() {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.dataset.index;
    cellPlayed(clickedCell, clickedCellIndex);
    resultValidation();
    //cell.removeEventListener('click', clickOnCell);
}
//2. Change the current player
function changePlayer() {
    if (currentPlayer === game.player01.player) {
        currentPlayer = game.player02.player;
    } else {
        currentPlayer = game.player01.player;
    }
    //console.log(currentPlayer);
    playerdiv.textContent = `Current player ${currentPlayer}`;

}

//3. Cell played: update internal gameState and updateUI
function cellPlayed(clickedCell, clickedCellIndex) {

    gameState[clickedCellIndex] = currentPlayer;
    const cellContent = document.createElement('p');
    cellContent.classList.add('move');
    cellContent.textContent = currentPlayer;
    clickedCell.append(cellContent);

}

//4. resultsValidation - winner or draw
function resultValidation() {
    let roundWon = false;
    //Winner
    for (move of winningMoves) {
        let a = gameState[move[0]];
        let b = gameState[move[1]];
        let c = gameState[move[2]];
        console.log("a"+a,"b"+ b,"c"+ c)
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        playerdiv.textContent = `Player ${currentPlayer} wins`;
        gameActive = false;
        return;
    }
    //Draw
    //If there are empty values on gameState;
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        playerdiv.textContent = `Draw!`;
        gameActive = false;
        return;
    }
    changePlayer();
}

//4. Reset Game
function resetGame(){
    currentPlayer = game.player01.player;
    gameActive = game.isActive;
    gameState = ["", "", "", "", "", "", "", "", ""];
    playerdiv.textContent = "";
    const cellsContent = document.getElementsByClassName('move');
    for (cellContent of cellsContent){
        cellContent.textContent = "";
    }
}


//Event listeners

for (cell of cells) {
    cell.addEventListener('click', clickOnCell);
}

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetGame);