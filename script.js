
  
//Game Logic from https://dev.to/bornasepic/pure-and-simple-tic-tac-toe-with-javascript-4pgn

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

//Game object
const game = {
    player01: {
        player: "",
        plays: {
            wins: 0,
            losses: 0,
        },
        moves: [],
    },
    player02: {
        player: "",
        plays: {
            wins: 0,
            losses: 0,
        },
        moves: [],
        
    },
    isActive: true,
    rounds: 0

}

//Game Variables
let currentPlayer = "";
let gameState = ["", "", "", "", "", "", "", "", ""];


//DOM Variables
const boardDiv = document.getElementById('game');
const cells = document.getElementsByClassName('cell');
const playerdiv = document.getElementById('player');
const resetButton = document.getElementById('reset');



//Js Variables
let gameActive = game.isActive;

//0.0 Add Names Based on input

function newNames() {
    game.player01.player = document.getElementById('p1').value;
    game.player02.player = document.getElementById('p2').value;
    // debugger;
    //do not accept empty values or same value on both input fields
    if(game.player01.player !== game.player02.player){
        if(game.player01.player !== "" && game.player02.player !== "") {
            currentPlayer = game.player01.player;
            //Start the Game with Player 01
            playerdiv.textContent = `Player: ${currentPlayer} starts`;
        }else if(game.player01.player !== "" || game.player02.player !== "") {
            //if either of the input fields is empty
            alert("Pick a name");
        }
        
    }else {
        alert("Players can't have same name");
        document.getElementById('p1').value = "";
        document.getElementById('p2').value = "";
    }

    startGame();
    return;
}



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
    playerdiv.textContent = `Current player: ${currentPlayer}`;
}

//3. Cell played: update gameState and updateUI
function cellPlayed(clickedCell, clickedCellIndex) {
    //Add username to the gameState array[cellindex]
    gameState[clickedCellIndex] = currentPlayer;
    //Display the username on the clicked cell
    const cellContent = document.createElement('p');
    cellContent.classList.add('move');
    cellContent.textContent = currentPlayer;
    clickedCell.append(cellContent);
    
    //Add classes - styling- depending of P1 or P2
    if(currentPlayer === game.player01.player){
        clickedCell.classList.add('clickedP1');
    }
    if(currentPlayer === game.player02.player) {
        clickedCell.classList.add('clickedP2');
    }
}

//4. resultsValidation - winner or draw
function resultValidation() {
    //Starts with no winners
    let roundWon = false;
    let rounds = game.rounds;
    //Winner
    for (move of winningMoves) {
        //move if each winning move
        //adds the username to the gameState on the specific index = to the cell clicked
        //console.log(gameState, "move0",move[0], "move1", move[1], "move2", move[2]);
        //loops thought the moves and compare the State to the moves
        let a = gameState[move[0]];
        let b = gameState[move[1]];
        let c = gameState[move[2]];
        //The continue statement breaks one iteration (in the loop) if a specified condition occurs, and continues with the next iteration in the loop.
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        playerdiv.textContent = `Winner is: ${currentPlayer}`;
        if(currentPlayer === game.player01.player){
            playerdiv.classList.add('winnerP1');
            console.log(cells);
            for(cell of cells){
                if(currentPlayer === game.player01.player) {
                    if(cell.classList.contains('clickedP1')){
                        console.log(cell);
                        cell.classList.add('winner');
                    }
                }
                
            }
        }
        if(currentPlayer === game.player02.player){
            playerdiv.classList.add('winnerP2');
            for(cell of cells){
                if(currentPlayer === game.player02.player) {
                    if(cell.classList.contains('clickedP2')){
                        console.log(cell);
                        cell.classList.add('winner');
                    }
                }
                
            }
        }
        
        //End the Game after there is a winner reset button appears
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
// * Start the Game
function startGame() {
    for (cell of cells) {
        cell.addEventListener('click', clickOnCell);
    }
}


//Reset Game
resetButton.addEventListener('click', resetGame);




//Change theme
//From https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/#using-separate-stylesheets

const changeThemeButton = document.getElementById('changeTheme');
const theme = document.getElementById("theme-link");

changeThemeButton.addEventListener('click', function() {
    if (theme.getAttribute("href") == "./style/dark-theme.css") {
        theme.href = "./style/light-theme.css";
        changeThemeButton.innerText = "Dark Theme"
    } else {
        theme.href = "./style/dark-theme.css"
        changeThemeButton.innerText = "Light Theme"
    }
})