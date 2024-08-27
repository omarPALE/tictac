const squares = document.querySelectorAll('.square');
const winner = document.querySelector('#winner');
const twoplayer = document.querySelector('.twoPlayer');
const ai = document.querySelector('.ai');
const rows = document.querySelectorAll('.row');
console.log(rows);
let board =  [[],[],[]];

function fullBoard(){
    for (let i = 0; i < 9; i++) {
        // get the content of the current div element
        const content = squares[i].innerHTML;
        // calculate the row and column indexes in the array
        var row = Math.floor(i / 3);
        var col = i % 3;
        // add the content to the array at the appropriate position
        board[row][col] = content;
    }

}

fullBoard();
for(let i = 0 ; i<3;i++){
    for(let j = 0 ; j<3;j++){
        console.log(board[i][j]);
    }
}
function player(human, value) {
    this.human = true;
    this.value = 'X';
}

let playerr = new player(true, 'X');

twoplayer.addEventListener("click", function() {
    winner.textContent = `Two Player`;
    squares.forEach((square) => {
        square.addEventListener('click', handleClick,{ once: true});
    });
    console.log("TWO player clicked!");
});

function handleClick(event) {
    // console.log(playerr.value);
    const square = event.target;
    square.innerHTML = playerr.value;
    square.style.color = playerr.value === 'X' ? '#1abc9c' : '#2c3e50';
    // nextTurn();
    checkWin();

    playerr.value = playerr.value === 'X' ? 'O' : 'X';
}

ai.addEventListener("click", function() {
    winner.textContent = `AI GAME`;
    squares.forEach((square) => {
        square.addEventListener('click', handleClick2, {once: true});
    });
    console.log("AI clicked!");
});

function handleClick2(event) {
    playerr.value = 'X';
    const square1 = event.target;
    square1.innerHTML = playerr.value;
    square1.style.color = playerr.value === 'O' ? '#1abc9c' : '#2c3e50';
    checkWin();
    nextTurn();
}

function nextTurn() {
    playerr.value = 'O';
    let available=[];
    for(let i = 0; i<squares.length ;i++){
        const content = squares[i].innerHTML;
        if(content === ''){
            available[i]=squares[i].id;
            content.innerHTML = "O";
            // let score = minmax()
        }
    }
  

    let move = random(available);
    const randomdiv = document.getElementById(move);
    if (randomdiv.innerHTML != null)
        randomdiv.innerHTML = "O";
    console.log(randomdiv);
    playerr.value='O'
    playerr.human = false;
    checkWin()

}

function random(available) {
    let randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
    return undefined;
}

function checkWin() {
    const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < rows.length; i++) {
        const [a, b, c] = rows[i];
        if (squares[a].innerHTML === playerr.value &&
            squares[b].innerHTML === playerr.value &&
            squares[c].innerHTML === playerr.value) {
            winner.textContent = `${playerr.value} wins!`;
            return true;
        }

    }
    return false;
}

function restart() {
    squares.forEach((square) => {
        square.innerHTML = '';
        square.style.color = '#333';
        winner.textContent = `Playing`;

    });
    playerr.value = 'X';

}
///////////////////////////////////////////////////
const squares = document.querySelectorAll('.square');
const winner = document.querySelector('#winner');
const twoplayer = document.querySelector('.twoPlayer');
const ai = document.querySelector('.ai');
const easy = document.querySelector(".easy")
const rows = document.querySelectorAll('.row');
const humanPlayer = 'X';
const aiPlayer = 'O';
let currentPlayer = humanPlayer;


const human = 'X';
const Ai = 'O';


let board =  [[],[],[]];
function fullBoard(){
    for (let i = 0; i < 9; i++) {
        // get the content of the current div element
        const content = squares[i].innerHTML;
        // calculate the row and column indexes in the array
        var row = Math.floor(i / 3);
        var col = i % 3;
        // add the content to the array at the appropriate position
        board[row][col] = content;
    }


}


function player(human,value,win) {
    this.human = true;
    this.value = 'X';
    this.win = false;
}

let playerr = new player(true);

twoplayer.addEventListener("click", function() {
    winner.textContent = `Two Player's`;
    squares.forEach((square) => {
        square.addEventListener('click', handleClick,{ once: true});
    });
    console.log("TWO player clicked!");
});

function handleClick(event) {
    fullBoard();
    console.log("hiiii");
    if (!playerr.win) {
        const square = event.target;
        square.innerHTML = playerr.value;
        square.style.color = playerr.value === 'X' ? '#1abc9c' : '#2c3e50';
        checkWin();
        playerr.value = playerr.value === 'X' ? 'O' : 'X';
        // fullBoard();
        // for(let i=0 ;i<board.length; i++) {
        //     for (let j = 0; j < board.length; j++) {
        //         console.log(board[i][j]);
        //     }
        // }
    }
} 


easy.addEventListener("click", function() {
    winner.textContent = `Easy Level`;
    squares.forEach((square) => {
        square.addEventListener('click', easyLevel, {once: true});
    });
    console.log("Easy Level");
});

function easyLevel(event) {
    if(!playerr.win && event.target.innerHTML!== "O") {
        playerr.value = 'X';
        const square1 = event.target;

        square1.innerHTML = playerr.value;
        square1.style.color = playerr.value === 'O' ? '#1abc9c' : '#2c3e50';
        checkWin();
        easyLevelNextTurn();
    }
}

function easyLevelNextTurn() {
    playerr.value = 'O';
    let available=[9];
    for(let i = 0; i<squares.length ;i++){
        const content = squares[i].innerHTML;
        if(content === ''){
            available[i]=squares[i].id;
        }
    }
    let move = random(available);
    const randomdiv = document.getElementById(move);
    if(randomdiv.innerHTML === "" && playerr.win !==true && randomdiv.innerHTML!=='X') {
        randomdiv.innerHTML = "O";
        checkWin();
        fullBoard(available);
    }
    else
        easyLevelNextTurn();
}


ai.addEventListener("click", function() {
    winner.textContent = `AI GAME`;
    squares.forEach((square) => {
        square.addEventListener('click', handleClick2, {once: true});
    });
    console.log("AI clicked!");
});



function handleClick2(event) {
 fullBoard(board);

        if (!playerr.win && event.target.innerHTML!= "O") {
       
          playerr.value=humanPlayer;
            console.log("the ai player is  :"+playerr.value);
            const square = event.target;
            square.innerHTML = playerr.value;
            fullBoard(board);
            square.style.color = playerr.value == 'X' ? '#1abc9c' : '#2c3e50';
            
            playerr.value = playerr.value == 'X' ? 'O' : 'X';
            
            nextTurn();
      
           
      
      
      
        }
      }
  
function nextTurn() {
if(!checkWin(playerr.value=humanPlayer)){
  playerr.value=aiPlayer
  
  // fullBoard(board);

    if(playerr.value != 'X'){
    console.log("in next turn");
    let bestScore = -Infinity;
    let bestMove = { };
      fullBoard(board);
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if(board[i][j]== 'O'){
          console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        }
          if (board[i][j] == '') {   
          board[i][j] = aiPlayer;
          const score = minimax(board , 1 , false, -Infinity, Infinity);
          console.log("the scooooooooore is : "+score);
          board[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            console.log("best" + bestScore);
            console.log("score" + score);
            bestMove = { i , j };
            console.log("best move =  i is :" + i + " and j is :" + j);
            board[i][j]=aiPlayer;   
            fullBoard();
          }
        }

        
      }
    }

    let x = bestMove.i + bestMove.j ;
    console.log("the xxx is : " +x );

    squares[x].innerHTML=aiPlayer;
    
    board[bestMove.i][bestMove.j] = aiPlayer; 

    
   
     
  } 
    player.value = humanPlayer;
    console.log("the human value "+humanPlayer);


    for(let i=0 ;i<board.length;i++){
      for(let j=0 ;j<board.length;j++){
        fullBoard();
      console.log("the full board is : "+board[i][j])
    }
    }


  }
     
    }

function checkWin() {
    const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
   
    for (let i = 0; i < rows.length; i++) {
        const [a, b, c] = rows[i];
        if (squares[a].innerHTML == playerr.value &&
            squares[b].innerHTML == playerr.value &&
            squares[c].innerHTML == playerr.value) {
            winner.textContent = `${playerr.value} wins!`;
            playerr.win= true;
            console.log("player is wiiiiiiiiiiiiiiiiiiiiiiiiiiiiin"+playerr.win);
            return true;
        }
    }
    return false;
}



function random(available) {
    return  Math.floor(Math.random() * available.length);
}

function evaluate(player) {
  checkWin();
  if (playerr.win &&playerr.value === aiPlayer) {
    console.log("Ai is win");
    return (1 - depth);
  }
  if (playerr.win && playerr.value === humanPlayer) {
    console.log("human is win");
    return (-1 + depth);
  }
  return 0;
}


function isBoardFull(board) {
// fullBoard();
for (let i= 0 ; i<board.length;i++){
    for(let j = 0 ; j <board.length ; j++){
        if(board[i][j] == '')
            return false ;
    }
}
return true;
}



function minimax(board, depth, isMaximizingPlayer, alpha, beta) {

  const score = evaluate(playerr.value);
  if (score !== 0 || isBoardFull(board)) {
    return score;
  }
  // fullBoard();
  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] == '') {
          board[i][j] = aiPlayer;             
      
          const currentScore = minimax(board, depth - 1, false, alpha, beta);     
          board[i][j] = '';
          bestScore = Math.max(bestScore, currentScore);
          alpha = Math.max(alpha, bestScore);
          if (beta <= alpha) {
            break;
          }
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] == '') {
          board[i][j] = humanPlayer;
          const currentScore = minimax(board, depth - 1, true, alpha, beta);
          board[i][j] = '';
          bestScore = Math.min(bestScore, currentScore);
          beta = Math.min(beta, bestScore);
          if (beta <= alpha) {
            break;
          }
        }
      }
    }
    return bestScore;
  } 
}

//////////////////
function restart() {
  squares.forEach((square) => {
      square.innerHTML = '';
      square.style.color = '#333';
      winner.textContent = `Playing`;
      playerr.win= false;

  });
  playerr.value = 'X';

}
