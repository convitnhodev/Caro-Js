const gameBox = [...document.querySelectorAll('.box')];

let gameBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

let chessMap = {
    r: '♜',
    n: '♞',
    b: '♝',
    q: '♛',
    k: '♚',
    p: '♟',
    R: '♖',
    N: '♘',
    B: '♗',
    Q: '♕',
    K: '♔',
    P: '♙',

};

let isSelected = false;
let selectedChessIndex = null;
var turn = false;


function gameInit() {
    gameBox.forEach((box, index) => {
        if (index % 16 > 7) {
            box.classList.add((index - 1) % 2 === 0 ? 'black' : 'white');
        } else {
            box.classList.add(index % 2 === 0 ? 'black' : 'white');
        }
        box.classList.add();
        box.addEventListener('click', gameMove);
    });
}

function gameMove() {
    index = OneDIndexToTwoDIndex(gameBox.indexOf(this));
    chess = gameBoard[index[0]][index[1]];
    if (turn) {
        switch (chess) {
            case 'r':
                if (!isSelected) {
                    gameBox.forEach((box, i) => {
                        const des = OneDIndexToTwoDIndex(i);
                        if (checkRock(index, des)) {
                            box.classList.add('highlight');
                        }
                    });
                    isSelected = true;
                    selectedChessIndex = index;


                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('highlight');
                    });
                    isSelected = false;
                }
                break;
            case 'n':
                if (!isSelected) {
                    gameBox.forEach((box, i) => {
                        const des = OneDIndexToTwoDIndex(i);
                        if (checkKnight(index, des)) {
                            box.classList.add('highlight');

                        }
                    });
                    isSelected = true;
                    selectedChessIndex = index;

                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('highlight');
                    });
                    isSelected = false;
                }
                break;
            case 'b':
                if (!isSelected) {
                    gameBox.forEach((box, i) => {
                        const des = OneDIndexToTwoDIndex(i);
                        if (checkBishop(index, des)) {
                            box.classList.add('highlight');
                        }
                    });
                    isSelected = true;
                    selectedChessIndex = index;

                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('highlight');
                    });
                    isSelected = false;
                }
                break;
            case 'q':
                if (!isSelected) {
                    gameBox.forEach((box, i) => {
                        const des = OneDIndexToTwoDIndex(i);
                        if (checkQueen(index, des)) {
                            box.classList.add('highlight');

                        }
                    });
                    isSelected = true;
                    selectedChessIndex = index;

                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('highlight');
                    });
                    isSelected = false;
                }
                break;


            case 'k':

                if (!isSelected) {
                    gameBox.forEach((box, i) => {
                        const des = OneDIndexToTwoDIndex(i);
                        if (checkKing(index, des)) {
                            box.classList.add('highlight');
                        }
                    });
                    isSelected = true;
                    selectedChessIndex = index;

                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('highlight');
                    });
                    isSelected = false;
                }
                break;
            case 'p':
                if (!isSelected) {
                    gameBox.forEach((box, i) => {
                        const des = OneDIndexToTwoDIndex(i);
                        if (checkPawn(index, des, true)) {
                            box.classList.add('highlight');

                        }
                    });
                    isSelected = true;
                    selectedChessIndex = index;

                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('highlight');
                    });
                    isSelected = false;
                }
                break;
            default:
                if (isSelected) {
                    gameBoard[index[0]][index[1]] =
                        gameBoard[selectedChessIndex[0]][selectedChessIndex[1]];
                    gameBoard[selectedChessIndex[0]][selectedChessIndex[1]] = ' ';
                    selectedChessIndex = null;
                    gameBox.forEach((box) => {
                        box.classList.remove('highlight');
                    });
                    isSelected = false;

                    turn = false;
                    document.getElementById("turn").innerHTML = "Turn's White"
                    document.getElementById("turn").style.color = "rgb(255, 204, 0)";
                }


                break;
        }

    } else if (!turn) {

        switch (chess) {
            case 'R':
                if (!isSelected) {
                    gameBox.forEach((box, i) => {
                        const des = OneDIndexToTwoDIndex(i);
                        if (checkRock(index, des)) {
                            box.classList.add('highlight');

                        }
                    });
                    isSelected = true;
                    selectedChessIndex = index;

                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('highlight');
                    });
                    isSelected = false;
                }
                break;
            case 'N':
                if (!isSelected) {
                    gameBox.forEach((box, i) => {
                        const des = OneDIndexToTwoDIndex(i);
                        if (checkKnight(index, des)) {
                            box.classList.add('highlight');

                        }
                    });
                    isSelected = true;
                    selectedChessIndex = index;

                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('highlight');
                    });
                    isSelected = false;
                }
                break;
            case 'B':
                if (!isSelected) {
                    gameBox.forEach((box, i) => {
                        const des = OneDIndexToTwoDIndex(i);
                        if (checkBishop(index, des)) {
                            box.classList.add('highlight');

                        }
                    });
                    isSelected = true;
                    selectedChessIndex = index;

                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('highlight');
                    });
                    isSelected = false;
                }
                break;
            case 'Q':
                if (!isSelected) {
                    gameBox.forEach((box, i) => {
                        const des = OneDIndexToTwoDIndex(i);
                        if (checkQueen(index, des)) {
                            box.classList.add('highlight');

                        }
                    });
                    isSelected = true;
                    selectedChessIndex = index;

                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('highlight');
                    });
                    isSelected = false;
                }
                break;
            case 'K':
                if (!isSelected) {
                    gameBox.forEach((box, i) => {
                        const des = OneDIndexToTwoDIndex(i);
                        if (checkKing(index, des)) {
                            box.classList.add('highlight');
                        }
                    });
                    isSelected = true;
                    selectedChessIndex = index;

                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('highlight');
                    });
                    isSelected = false;
                }
                break;
            case 'P':
                if (!isSelected) {
                    gameBox.forEach((box, i) => {
                        const des = OneDIndexToTwoDIndex(i);
                        if (checkPawn(index, des, false)) {
                            box.classList.add('highlight');

                        }
                    });
                    isSelected = true;
                    selectedChessIndex = index;

                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('highlight');
                    });
                    isSelected = false;
                }
                break;
            default:
                if (isSelected) {
                    gameBoard[index[0]][index[1]] = gameBoard[selectedChessIndex[0]][selectedChessIndex[1]];
                    gameBoard[selectedChessIndex[0]][selectedChessIndex[1]] = ' ';
                    selectedChessIndex = null;
                    gameBox.forEach((box) => {
                        box.classList.remove('highlight');
                    });
                    isSelected = false;
                    turn = true;
                    document.getElementById("turn").innerHTML = "Turn's Black";
                    document.getElementById("turn").style.color = "rgb(0, 0, 153)";
                }

                break;
        }
    }
    console.log(gameBoard)
    gameDraw();
}

function gameUpdate() {}

function gameDraw() {
    gameBoard.forEach((row, rowIndex) => {
        row.forEach((piece, pieceIndex) => {
            if (piece !== ' ') {
                gameBox[rowIndex * 8 + pieceIndex].innerHTML = chessMap[piece][0];
            } else {
                gameBox[rowIndex * 8 + pieceIndex].innerHTML = '';
            }
        });
    });
}

gameInit();
gameUpdate();
gameDraw();