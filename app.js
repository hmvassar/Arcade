const gameBoard = document.getElementById(".gameBoard");
const cellContainer = document.getElementById("cellContainer");
const cells = document.querySelectorAll(".cell");
const messageDisplay = document.querySelector("#messageDisplay");
const restartButton = document.getElementById("restartBtn");
const submitButton = document.getElementById("submit");

let modal = document.getElementById("myModal");
let startButton = document.querySelector("button");
let span = document.getElementsByClassName("close")[0];

const playerMap = new Map();
playerMap.set('X',"Player One");
playerMap.set('O',"Player Two");

let gameIsRunning = false;
let currentPlayer = "X"; 
let nextPlayer = "O";   

function openModal(){
    modal.style.display = "block";
}
function closeModal(){
    modal.style.display = "none";
    
    gameStart();
}

let moves = ["","","","","","","","",""];
const winningCombinations = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6],
];

submitButton.addEventListener("click",submitClicked);
openModal();

function submitClicked() {
    let playerList = [document.getElementById("player-one").value, document.getElementById("player-two").value]
    let playerOneIndex = getRandomIntInclusive(0,1);
    let playerTwoIndex = playerOneIndex === 1 ? 0 : 1;
    let playerOne = playerList[playerOneIndex]
    let playerTwo = playerList[playerTwoIndex]
    playerMap.set('X',playerOne);
    playerMap.set('O',playerTwo);

    messageDisplay.textContent = `${playerMap.get(currentPlayer)}'s turn`;  
}

function gameStart(){
   cells.forEach(cell => cell.addEventListener('click', cellClicked))
   restartButton.addEventListener("click", gameRestart);
   gameIsRunning = true;
   messageDisplay.textContent = `${playerMap.get(currentPlayer)}'s turn`;
}
function cellClicked(){
    const cellNumber = this.getAttribute("cellIndex");
          messageDisplay.textContent = `${playerMap.get(nextPlayer)}'s turn`;
 
    if (moves[cellNumber] != "" || !gameIsRunning){
        return;
    }
      updateCell(this,cellNumber);
      checkForWin();
      changeTurn();
}

function updateCell(cell, index){
    moves[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changeTurn(){ 
   
    if (currentPlayer === "X" ){
    currentPlayer = "O"; 
    nextPlayer = "X";
    
   } else { currentPlayer = "X";
nextPlayer = "O"}
}

function checkForWin(){
    let roundWon = false;

    for(let i = 0; i < winningCombinations.length; i++){
        const condition = winningCombinations[i];
        const cell1 = moves[condition[0]];
        const cell2 = moves[condition[1]];
        const cell3 = moves[condition[2]];
        
        if(cell1 == "" || cell2 == "" || cell3 == ""){
            continue;
        }
        if(cell1 == cell2 && cell2 == cell3){
            roundWon = true;
            break;
        }
    }
        if(roundWon){
            messageDisplay.textContent = `${playerMap.get(currentPlayer)} wins!`; 
            gameIsRunning = false;
            gameEnd()
            setTimeout(declareWinner, 5000);
        
        }
        else if(!moves.includes("")){
            messageDisplay.textContent = `Draw!`;
            gameIsRunning = false;
            gameEnd();     
        }       
       }
       
function gameEnd(){
    if (gameIsRunning === false) {
        cells.forEach(cell => cell.removeEventListener('click', cellClicked))
    }
}

function gameRestart(cell){
    moves = ["","","","","","","","",""];
    nextPlayer = "O";
    currentPlayer = "X";
     cells.forEach(cell => cell.textContent = "");
    gameStart();
    openModal();
    playerMap.set('X',"Player One");
    playerMap.set('O',"Player Two");
    messageDisplay.textContent = "Welcome!";
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};