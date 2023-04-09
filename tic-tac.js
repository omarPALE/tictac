const squares = document.querySelectorAll('.square');
const winner = document.querySelector('#winner');
const twoplayer = document.querySelector('.twoPlayer');
const ai = document.querySelector('.ai');
const easy = document.querySelector(".easy")
const rows = document.querySelectorAll('.row');
console.log(rows);
let board =  [[],[],[]];

for(let i=0 ; i< squares.length; i++){
    console.log("hiiiiiiiiiiiiiiii"+squares[i].innerHTML);
}

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
function player(human, value,win) {
    this.human = true;
    this.value = 'X';
    this.win = false;
}

let playerr = new player(true, 'X');

twoplayer.addEventListener("click", function() {
    winner.textContent = `Two Player's`;
    squares.forEach((square) => {
        square.addEventListener('click', handleClick,{ once: true});
    });
    console.log("TWO player clicked!");
});

function handleClick(event) {
    if (!playerr.win) {
        const square = event.target;
        square.innerHTML = playerr.value;
        square.style.color = playerr.value === 'X' ? '#1abc9c' : '#2c3e50';
        checkWin();
        playerr.value = playerr.value === 'X' ? 'O' : 'X';
    }
}

function easyLevel(event) {
    if(!playerr.win) {
        playerr.value = 'X';
        const square1 = event.target;
        square1.innerHTML = playerr.value;
        console.log(square1.innerHTML);
        square1.style.color = playerr.value === 'O' ? '#1abc9c' : '#2c3e50';
        checkWin();
        easyLevelNextTurn();
    }

}

easy.addEventListener("click", function() {
    winner.textContent = `Easy Level`;
    squares.forEach((square) => {
        square.addEventListener('click', easyLevel, {once: true});
    });
    console.log("AI clicked!");
});


function easyLevelNextTurn() {
    playerr.value = 'O';
    let available=[9];
    for(let i = 0; i<squares.length ;i++){
        const content = squares[i].innerHTML;
        if(content === ''){
            squares[i]= playerr.value;
            content.innerHTML = "O";
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
    const randomdiv = document.getElementById("move");
    randomdiv.innerHTML = "O";
    // playerr.value = 'O'
    // playerr.human = false;
    checkWin();
}





















ai.addEventListener("click", function() {
    winner.textContent = `AI GAME`;
    squares.forEach((square) => {
        square.addEventListener('click', handleClick2, {once: true});
    });
    console.log("AI clicked!");
});

function handleClick2(event) {
    if(!playerr.win) {
        playerr.value = 'X';
        const square1 = event.target;
        square1.innerHTML = playerr.value;
        console.log(square1.innerHTML);
        square1.style.color = playerr.value === 'O' ? '#1abc9c' : '#2c3e50';
        checkWin();
        nextTurn();
    }
    //playerr.value = playerr.value === 'O' ? 'X' : 'O';
}


function nextTurn() {
    playerr.value = 'O';
    let bestscore = -Infinity;
    let available=[9];
    for(let i = 0; i<squares.length ;i++){
        const content = squares[i].innerHTML;
        if(content === ''){
            squares[i]= playerr.value;
            //content.innerHTML = "O";   OLD DESIGN
             let score = alphBeta(squares);
             if(score > bestscore){
                 bestscore =score;

             }
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
        const randomdiv = document.getElementById('move');
            randomdiv.innerHTML = "O";
            playerr.value = 'O'
            playerr.human = false;
            checkWin()
   }

function random(available) {
    let randomIndex = Math.floor(Math.random() * available.length);
    return randomIndex;
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
