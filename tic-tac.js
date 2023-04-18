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
    //playerr.value = playerr.value === 'O' ? 'X' : 'O';
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
    // for(let g = 0; g = available.length; g++){
    //     fullBoard(available[g]);
    // }
    // for(let i = 0 ; i<3;i++){
    //     for(let j = 0 ; j<3;j++){
    //         console.log(board[i][j]);
    //     }
    // }

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

// let board = [
//   ['', '', ''],
//   ['', '', ''],
//   ['', '', '']
// ];


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
  // fullBoard();
  // console.log("hiiii");
  
  
  // loop1:
  // playerr.value = playerr.value === 'X' ? 'O' : 'X';
 fullBoard(board);
  // for (let i =0 ; i<board.length ; i++){
    // for (let j=0 ; j<board.length ; j++){
      // if(board[i][j] == ''){
        if (!playerr.win && event.target.innerHTML!= "O") {
          // fullBoard(board); 
          // if (checkWin(playerr.value=humanPlayer))
          // {
          //   playerr.value=win;
          // }
          // checkWin();
          // fullBoard(board);
          playerr.value=humanPlayer;
          
          
          // while(playerr.value!=aiPlayer && ) {
            console.log("the ai player is  :"+playerr.value);
            const square = event.target;
            square.innerHTML = playerr.value;
            fullBoard(board);
            square.style.color = playerr.value == 'X' ? '#1abc9c' : '#2c3e50';
            
            playerr.value = playerr.value == 'X' ? 'O' : 'X';
            
            // checkWin();
            // checkWin(playerr.value=humanPlayer);
            // console.log("the winer is : "+checkWin(playerr.value=humanPlayer));
      
            nextTurn();
      
            // console.log("nenenenenenen "+ playerr.value);
      
              // continue loop1;
      
      
      
        }
      }
    // }
  // }
  
// }




// function findBestMove(board) {
//   let bestScore = -Infinity;
//   let move = { row: -1, col: -1 };
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board.length; j++) {
//       // If cell is empty
//       // fullBoard();
//       if (board[i][j] === "") {
//         board[i][j] = "X";
//         let score = minimax(board, 5, false, -Infinity, Infinity);
//         // let score = minimax(board,1,false);
//         board[i][j] = "";
//         if (score > bestScore) {
//           bestScore = score;
//           move.row = i;
//           move.col = j;
//         }
//       }
//     }
//   }
//   return move;
// }






function nextTurn() {
  
//   let available=[9];
//   for(let i = 0; i<squares.length ;i++){
//     const content = squares[i].innerHTML;
//     if(content === ''){
//         available[i]=squares[i].id;
//     }
// }




// console.log("the check win is ; "+checkWin());
// checkWin();




if(!checkWin(playerr.value=humanPlayer)){
  

  // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    // fullBoard();
  playerr.value=aiPlayer
  
  // fullBoard(board);

    if(playerr.value != 'X'){
    console.log("in next turn");
    let bestScore = -Infinity;
    let bestMove = { };
    // let row = -1;
    // let col = -1 ;
      fullBoard(board);
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if(board[i][j]== 'O'){
          console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        }
          // fullBoard(board);
          // console.log("after for ");
          if (board[i][j] == '') {   
          board[i][j] = aiPlayer;
          // console.log("the board is "+board[i][j]);
          const score = minimax(board , 1 , false, -Infinity, Infinity);
          console.log("the scooooooooore is : "+score);
          board[i][j] = '';
          // console.log("Before if ");
          if (score > bestScore) {
            bestScore = score;
            console.log("best" + bestScore);
            console.log("score" + score);
            bestMove = { i , j };
            console.log("best move =  i is :" + i + " and j is :" + j);
            board[i][j]=aiPlayer;   
            fullBoard();
            console.log("aiaiaiaiiaiai   "+aiPlayer);
            console.log("i   "+i);
            console.log("j   "+j);
            console.log("the player is  "+playerr.value );
            
          }
        }

        
      }
    }

    let x = bestMove.i + bestMove.j ;
    console.log("the xxx is : " +x );

    squares[x].innerHTML=aiPlayer;
    
    board[bestMove.i][bestMove.j] = aiPlayer; 
    // squares.innerHTML=board[bestMove.i][bestMove.j];
    // let currentPlayer = humanPlayer;
  

    
   
     
  } 
  // fullBoard(board);  
// }
    // fullBoard(board);
    player.value = humanPlayer;
    console.log("the human value "+humanPlayer);
    // checkWin();
 
    
    // console.log("before xxxx");
    
    // console("the after is  : "+playerr.value);

    for(let i=0 ;i<board.length;i++){
      for(let j=0 ;j<board.length;j++){
        fullBoard();
      console.log("the full board is : "+board[i][j])
    }
    }
    //  for (let i = 0; i < 3; i++) {
    //   for (let j = 0; j < 3; j++) {
    //     console.log("the board is : "+board[i][j]);
    //   }
    // }

    // playerr.value === humanPlayer;
    // nextTurn();

  }
     
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




// function checkWin2(board , playerr) {
//     for (let i = 0; i < 3; i++) {
//     if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
//         // winner.textContent = `${playerr.value} wins!`;
//         // playerr.win= true;
//         return true;
//     }
//     if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
//         // winner.textContent = `${playerr.value} wins!`;
//         // playerr.win= true;
//         return true;
//     }
//   }
//   if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
//       // winner.textContent = `${playerr.value} wins!`;
//       // playerr.win= true;
//       return true;
//   }
//   if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
//       // winner.textContent = `${playerr.value} wins!`;
//       // playerr.win= true;
//       return true;
//   }
//   return false;
// }

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
  // for (let i = 0; i < 3; i++) {
  //   for (let j = 0; j < 3; j++) {
  //     console.log("the minimax is : "+board[i][j]);
  //   }
  // }  
  // console.log("the numbr of");
 
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
          // console.log("currr"+currentScore);    
          board[i][j] = '';
          bestScore = Math.max(bestScore, currentScore);
          alpha = Math.max(alpha, bestScore);
          if (beta <= alpha) {
            break;
          }
        }
      }
    }
      // console.log("best scooooooooooooore "+ bestScore);
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






////////////////////////


// function equals3(a, b, c) {
//   return a == b && b == c && a != '';
// }

// function checkWinner() {
//   let winner = null;

//   // horizontal
//   for (let i = 0; i < 3; i++) {
//     if (equals3(board[i][0], board[i][1], board[i][2])) {
//       winner = board[i][0];
//     }
//   }

//   // Vertical
//   for (let i = 0; i < 3; i++) {
//     if (equals3(board[0][i], board[1][i], board[2][i])) {
//       winner = board[0][i];
//     }
//   }

//   // Diagonal
//   if (equals3(board[0][0], board[1][1], board[2][2])) {
//     winner = board[0][0];
//   }
//   if (equals3(board[2][0], board[1][1], board[0][2])) {
//     winner = board[2][0];
//   }

//   let openSpots = 0;
//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//       if (board[i][j] == '') {
//         openSpots++;
//       }
//     }
//   }

//   if (winner == null && openSpots == 0) {
//     return 'tie';
//   } else {
//     return winner;
//   }
// }


// function bestMove() {
//   // AI to make its turn
//   // playerr.value=Ai;
//   let bestScore = -Infinity;
//   let move={};
//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//       // Is the spot available?
//       if (board[i][j] == '') {
//         board[i][j] = Ai;
//         let score = minimax(board, 0, false);
//         board[i][j] = '';
//         if (score > bestScore) {
//           bestScore = score;
//           move = { i, j };
//         }
//       }
//     }
//   }
  
    
//   board[move.i][move.j] = Ai;
//   currentPlayer = human;
// }




// let scores = {
//   X: 10,
//   O: -10,
//   tie: 0
// };

// function minimax(board, depth, isMaximizing) {
//   let result = checkWinner();
//   if (result !== null) {
//     return scores[result];
//   }

//   if (isMaximizing) {
//     let bestScore = -Infinity;
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         // Is the spot available?
//         if (board[i][j] == '') {
//           board[i][j] = Ai;
//           let score = minimax(board, depth + 1, false);
//           console.log("sccscs"+score);
//           board[i][j] = '';
//           bestScore = Math.max(score, bestScore);
//         }
//       }
//     } 
//     return bestScore;
//   } else {
//     let bestScore = Infinity;
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         // Is the spot available?
//         if (board[i][j] == '') {
//           board[i][j] = human;
//           let score = minimax(board, depth + 1, true);
//           board[i][j] = '';
//           bestScore = Math.min(score, bestScore);
//         }
//       }
//     }
//     return bestScore;
//   }
// }







///////////////////


///////////////////////////////////////

// function evaluate(board) {
//   const winPositions = [
//     // horizontal
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     // vertical
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     // diagonal
//     [0, 4, 8],
//     [2, 4, 6]
//   ];

//   for (let i = 0; i < winPositions.length; i++) {
//     const [a, b, c] = winPositions[i];
//     if (board[a] === board[b] && board[b] === board[c]) {
//       if (board[a] === 'X') {
//         return 1; // maximizing player wins
//       } else if (board[a] === 'O') {
//         return -1; // minimizing player wins
//       }
//     }
//   }

//   return 0; // tie or game still in progress
// }

// function isGameOver(board) {
//   // check if there's a winner
//   const winPositions = [
//     // horizontal
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     // vertical
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     // diagonal
//     [0, 4, 8],
//     [2, 4, 6]
//   ];

//   for (let i = 0; i < winPositions.length; i++) {
//     const [a, b, c] = winPositions[i];
//     if (board[a] && board[a] === board[b] && board[b] === board[c]) {
//       return true; // there's a winner
//     }
//   }

//   // check if the board is full (i.e. tie)
//   if (board.every(cell => cell !== null)) {
//     return true; // the board is full
//   }

//   return false; // game is not over yet
// }



// function minimax(board, depth, isMaximizingPlayer) {
//   // base case: game over or reached maximum depth
//   if (checkWin(board) || depth === 0) {
//     return evaluate(playerr);
//   }
//   // const score = evaluate(playerr);
// //   if (score !== 0 || isBoardFull(board)) {
// //     return score;
// //   }

//   if (isMaximizingPlayer) {
//     let bestScore = -Infinity;
//     for (let i = 0; i < board.length; i++) {
//       for (let j = 0; j < board[i].length; j++) {
//         if (board[i][j] === null) {
//           board[i][j] = 'X';
//           const score = minimax(board, depth - 1, false);
//           console.log("The score is :- " +score);
//           board[i][j] = null;
//           bestScore = Math.max(bestScore, score);
//         }
//       }
//     }
//     return bestScore;
//   } else {
//     let bestScore = Infinity;
//     for (let i = 0; i < board.length; i++) {
//       for (let j = 0; j < board[i].length; j++) {
//         if (board[i][j] === null) {
//           board[i][j] = 'O';
//           const score = minimax(board, depth - 1, true);
//           board[i][j] = null;
//           bestScore = Math.min(bestScore, score);
//         }
//       }
//     }
//     return bestScore;
//   }
// }









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
