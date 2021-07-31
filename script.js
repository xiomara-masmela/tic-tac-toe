//Variables
let status = document.querySelector('.status');
let playerContent = document.createElement('p');
//Player will be either X or O, starts with X
let currentplayer = "X";
//This is each box
let clickedBox = "";
//Variable that stores result
let result = "";
let resultsX = [];
let results0 = [];

//click on box and display an X or 0
const boxes = document.getElementsByClassName('box');

function clickOnBox(event) {
    clickedBox = event.target;
    //console.log(clickedBox);
    clickedBox.textContent = currentplayer;
    playerContent.textContent = `Current Player: ${currentplayer}`;
    status.append(playerContent);
    game();
    changePlayer();
    clickedBox.removeEventListener("click", clickOnBox);

}
for(let box of boxes){
    box.addEventListener('click', clickOnBox);
}


//Change the Player after every click
function changePlayer() {
    if(currentplayer === "X") {
        currentplayer = "0";
    }else {
        currentplayer = "X";
    }
    
}
//Game Status
//display the current player
const winningMoves = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 8],
    [3, 4, 5],
    [6, 7, 8]

]
function game() {
    // console.log(clickedBox.dataset.index, currentplayer);
    // result = clickedBox.dataset.index;
    // results.push(result);
    // console.log(results);
    
        // console.log(box);
        // console.log(clickedBox.dataset.index, currentplayer);
        if(currentplayer === "X") {
            result = Number(clickedBox.dataset.index);
            resultsX.push(result);
            
        }
       
        
    
    console.log('resultsX',resultsX);
    
    for(move of winningMoves) {
        console.log('move',move);
        move.includes(resultsX)
        // for(let i = 0; i < move.length; i++){
        //     console.log(move[i]);
        //     for(let j = 0; j < resultsX.length; j++){
        //         console.log(resultsX[i]);
        //     }
        // }
    }
    
    
}