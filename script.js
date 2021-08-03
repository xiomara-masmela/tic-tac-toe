
const board = [
    [0,1,2],
    [3,4,5],
    [6,7,8]
];

const winningMoves = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,8],
    [3,4,5],
    [6,7,8]
];


const game = {
   player01 :{
    player: "X",
    plays: 0,
    moves: []
   },
   player02:{
    player: "O",
    plays: 0,
    moves: []
   } 

}
const gameState = ["","","","","","","","",""];  


//DOM Variables
const boardDiv = document.getElementById('game');
const cells = document.getElementsByClassName('cell');
const playerdiv = document.getElementById('player');
//Js Variables
let currentPlayer = game.player01.player;

//Start the Game with Player X
playerdiv.textContent = `Current player ${currentPlayer}`;

//1. Check that the cell is clicked
function clickOnCell() {
    const clickedCell = event.target;
    const clickedCellIndex= clickedCell.dataset.index;
    cellPlayed(clickedCell, clickedCellIndex);
    changePlayer();
    resultValidation();
    cell.removeEventListener('click', clickOnCell);
}
//2. Change the current player
function changePlayer() {
    if(currentPlayer === game.player01.player){
        currentPlayer = game.player02.player;
    }else {
        currentPlayer = game.player01.player;
    }
    //console.log(currentPlayer);
    playerdiv.textContent = `Current player ${currentPlayer}`;

}

//3. Cell played: update internal gameState and updateUI
function cellPlayed(clickedCell, clickedCellIndex) {
    
    gameState[clickedCellIndex] = currentPlayer;
    const cellContent = document.createElement('p');
    cellContent.textContent = clickedCellIndex;
    clickedCell.append(cellContent, currentPlayer);

}

//4. resultsValidation - winner or draw
function resultValidation() {
    let roundWon = false;

   for(move of winningMoves){
       let a = gameState[move[0]];
       let b = gameState[move[1]];
       let c = gameState[move[2]];
       console.log(a,b,c)
       if( a === '' || b === '' || c === ''){
           continue;
       }
       if (a === b && b === c) {
        roundWon = true;
        break
    }
   }
   console.log(`${currentPlayer}is currentplater`)
   if (roundWon) {
    playerdiv.innerHTML = `Player ${currentPlayer} wins`;
    gameActive = false;
    return;
}
}

//4. Reset Game


//Event listeners

for(cell of cells) {
    cell.addEventListener('click', clickOnCell);
}