const squares = document.querySelectorAll('.square');
const winner = document.querySelector('#winner');
const twoplayer = document.querySelector('.twoPlayer');
const ai = document.querySelector('.ai');
const easy = document.querySelector(".easy")
const rows = document.querySelectorAll('.row');
const humanPlayer = 'X';
const aiPlayer = 'O';
let currentPlayer = humanPlayer;

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



// if(id <=2){
//         board[0][id] = document.getElementById(id).innerHTML ;
// }
// else if (id > 2 && id <= 5) {
//     board[1][id-3] = document.getElementById(id).innerHTML ;
// }
// else{
//     board[2][id-6] = document.getElementById(id).innerHTML ;
// }
}


function player(human, value,win) {
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
    if(!playerr.win && event.target.innerHTML!== "O" ) {
        playerr.value = 'X';
        const square1 = event.target;
        square1.innerHTML = playerr.value;
        console.log(square1.innerHTML);
        square1.style.color = playerr.value === 'O' ? '#1abc9c' : '#2c3e50';
        fullBoard();
        checkWin();
        nextTurn(board);
    }
    //playerr.value = playerr.value === 'O' ? 'X' : 'O';
}

function nextTurn(board) {
    // fullBoard();
    console.log("in next turn");
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          console.log("after for ");

          if (board[i][j] === '') {
          board[i][j] = aiPlayer;
          const score = minimax(board, 0, false, -Infinity, Infinity);
          board[i][j] = '';
          console.log("Before if ");
          if (score > bestScore) {
            bestScore = score;
            bestMove = { i , j };
            console.log("best move =  i is :" + i + "j is :"+ j);
          }
        }
      }
    }
    board[bestMove.i][bestMove.j] = aiPlayer;
    let currentPlayer = humanPlayer;
    }




   //  let move = random(available);
   //      const randomdiv = document.getElementById(move);
   //          randomdiv.innerHTML = "O";
   //          playerr.value = 'O'
   //          playerr.human = false;
   //          checkWin();
   // }




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
            playerr.win= true;
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
        playerr.win= false;

    });
    playerr.value = 'X';

}

function random(available) {
    return  Math.floor(Math.random() * available.length);
}

function evaluate(player) {
  if (checkWin() && player.value ===aiPlayer) {
    return 1;
  }
  if (checkWin() && player.value === humanPlayer) {
    return -1;
  }
  return 0;
}

function checkWin2(board , player) {
    for (let i = 0; i < 3; i++) {
    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
        // winner.textContent = `${playerr.value} wins!`;
        // playerr.win= true;
        return true;
    }
    if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
        // winner.textContent = `${playerr.value} wins!`;
        // playerr.win= true;
        return true;
    }
  }
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      // winner.textContent = `${playerr.value} wins!`;
      // playerr.win= true;
      return true;
  }
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      // winner.textContent = `${playerr.value} wins!`;
      // playerr.win= true;
      return true;
  }
  return false;
}

function isBoardFull(board) {
fullBoard();
for (let i= 0 ; i<3;i++){
    for(let j = 0 ; j <3 ; j++){
        if(board[i][j] === '')
            return false ;
    }
}
return true;
}

function minimax(board, depth, isMaximizingPlayer, alpha, beta) {
  const score = evaluate(playerr);
  if (score !== 0 || isBoardFull(board)) {
    return score;
  }
  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = aiPlayer;
          const currentScore = minimax(board, depth + 1, false, alpha, beta);
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
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = humanPlayer;
          const currentScore = minimax(board, depth + 1, true, alpha, beta);
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