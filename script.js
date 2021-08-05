// const board = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8]
// ];

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
        player: "",
        plays: 0,
        moves: []
    },
    player02: {
        player: "",
        plays: 0,
        moves: []
    },
    isActive: true,
    rounds: 0

}

let currentPlayer = "";
//Manipulate the Game object
function newNames() {
    game.player01.player = document.getElementById('p1').value;
    game.player02.player = document.getElementById('p2').value;
    //console.log(game.player01.player ,game.player02.player );
    currentPlayer = game.player01.player;
    //Start the Game with Player 01
    playerdiv.textContent = `Player: ${currentPlayer} starts`;

    startGame();
    return;
}



let gameState = ["", "", "", "", "", "", "", "", ""];


//DOM Variables
const boardDiv = document.getElementById('game');
const cells = document.getElementsByClassName('cell');
const playerdiv = document.getElementById('player');
const resetButton = document.getElementById('reset');





//Js Variables

let gameActive = game.isActive;



//1. Check that the cell is clicked
function clickOnCell() {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.dataset.index;
    cellPlayed(clickedCell, clickedCellIndex);
    resultValidation();
    clickedCell.removeEventListener('click', clickOnCell);
    return;
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
    
    if(currentPlayer === game.player01.player){
        clickedCell.classList.add('clickedP1');
    }
    if(currentPlayer === game.player02.player) {
        clickedCell.classList.add('clickedP2');
    }
}

//4. resultsValidation - winner or draw
function resultValidation() {
    let roundWon = false;
    let rounds = game.rounds;
    //Winner
    for (move of winningMoves) {
        let a = gameState[move[0]];
        let b = gameState[move[1]];
        let c = gameState[move[2]];
        //console.log("a"+a,"b"+ b,"c"+ c)
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        playerdiv.textContent = `Wiiner is: ${currentPlayer}`;
        if(currentPlayer === game.player01.player){
            playerdiv.classList.add('winner-P1');
        }
        if(currentPlayer === game.player02.player){
            playerdiv.classList.add('winner-P2');
        }
        gameActive = false;
        resetButton.classList.add('visible');
        for (cell of cells) {
            cell.removeEventListener('click', clickOnCell);
        }

        return;
    }
    //Draw
    //If there are empty values on gameState;
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        playerdiv.textContent = `Draw!`;
        gameActive = false;
        resetButton.classList.add('visible');
        return;
    }
    changePlayer();
    
}

//5. Reset Game
function resetGame() {
    //Variables back to initial state
    currentPlayer = game.player01.player;
    gameActive = game.isActive;
    gameState = ["", "", "", "", "", "", "", "", ""];
    playerdiv.textContent = "";
    playerdiv.classList.remove('winner-P1');
    playerdiv.classList.remove('winner-P2');

    const cellsContent = document.getElementsByClassName('move');
    for (cellContent of cellsContent) {
        cellContent.textContent = "";
    }
    //Remove Styling on Game
    const cells = document.getElementsByClassName('cell');
    for (cell of cells){
        cell.classList.remove('clickedP2');
        cell.classList.remove('clickedP1');
    }
    //Clear input values
    document.getElementById('p1').value = "";
    document.getElementById('p2').value = "";
    //Make Dissapear Reset Button
    resetButton.classList.remove('visible');
    resetButton.classList.add('invisible');
}

//Event listeners
function startGame() {
    for (cell of cells) {
        cell.addEventListener('click', clickOnCell);
    }
}



resetButton.addEventListener('click', resetGame);