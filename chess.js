const gameBox = [...document.querySelectorAll('.box')];

const gameBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const blackChess = ['r', 'n', 'b', 'q', 'k', 'p'];
const whiteChess = ['R', 'N', 'B', 'Q', 'K', 'P'];

const chessMap = {
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

const knightMovableX = [-2, -2, -1, -1, 1, 1, 2, 2];
const knightMovableY = [-1, 1, -2, 2, -2, 2, -1, 1];
const kingMovableX = [-1, -1, -1, 0, 0, 1, 1, 1];
const kingMovableY = [-1, 0, 1, -1, 1, -1, 0, 1];

let isSelected = false;
let selectedChessIndex = null;
var turn = false;


function OneDIndexToTwoDIndex(index) {
    return [Math.floor(index / 8), index % 8];
}

function TwoDIndexToOneDIndex(index) {
    return index[0] * 8 + index[1];
}


function checkType(source, des) {
    if (des == ' ') {
        return 0;
    }
    regexp = /^[A-Z]/
    if ((regexp.test(source) && regexp.test(des)) || (!regexp.test(source) && !regexp.test(des))) {
        return 1;
    }
    return 2;
}


function checkRock(source, des) {
    if (source[0] == des[0] && source[1] == des[1]) {
        return false;
    }
    return (Math.abs(source[0] - des[0]) == 0 || Math.abs(source[1] - des[1]) == 0);
}


function checkKing(source, des) {
    if (source[0] == des[0] && source[1] == des[1]) {
        return false;
    }
    return (Math.abs(source[0] - des[0]) <= 1 && Math.abs(source[1] - des[1]) <= 1);
}


function checkPawn(source, des, type) {
    if (source[0] == des[0] && source[1] == des[1]) {
        return false;
    }
    if (type === true) {
        if (checkType(gameBoard[source[0]][source[1]], gameBoard[des[0]][des[1]]) == 2) {
            return ((des[0] - source[0]) == 1 && (des[1] - source[1] == 1 || des[1] - source[1] == -1));
        }
        return ((source[0] == des[0] - 1 && source[1] == des[1]) ||
            (source[0] == des[0] - 2 && source[1] == des[1] && source[0] == 1));
    } else {
        if (checkType(gameBoard[source[0]][source[1]], gameBoard[des[0]][des[1]]) == 2) {
            return ((des[0] - source[0]) == -1 && (des[1] - source[1] == 1 || des[1] - source[1] == -1));
        }
        return ((source[0] == des[0] + 1 && source[1] == des[1]) ||
            (source[0] == des[0] + 2 && source[1] == des[1] && source[0] == 6))
    };
}


function checkKnight(source, des) {
    if (source[0] == des[0] && source[1] == des[1]) {
        return false;
    }
    return (Math.abs(source[0] - des[0]) <= 2 && (tmp2 = Math.abs(source[1] - des[1]) <= 2) &&
        Math.abs(source[0] - des[0]) >= 1 && (tmp2 = Math.abs(source[1] - des[1]) >= 1) &&
        Math.abs(source[0] - des[0]) != Math.abs(source[1] - des[1]));
}


function checkQueen(source, des) {
    if (source[0] == des[0] && source[1] == des[1]) {
        return false;
    }
    return (Math.abs(source[0] - des[0]) == 0 || Math.abs(source[1] - des[1]) == 0 ||
        (Math.abs(source[0] - des[0]) == Math.abs(source[1] - des[1]))
    );
}

function checkBishop(source, des) {
    if (source[0] == des[0] && source[1] == des[1]) {
        return false;
    }
    return (Math.abs(source[0] - des[0]) == Math.abs(source[1] - des[1]));
}

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
        // Black's Turn
        switch (chess) {
            case 'r':
                if (!isSelected) {
                    for (let i = index[0] + 1; i < 8; i++) {
                        if (gameBoard[i][index[1]] === ' ') {
                            gameBox[TwoDIndexToOneDIndex([i, index[1]])].classList.add(
                                'movable'
                            );
                        } else {
                            if (whiteChess.includes(gameBoard[i][index[1]])) {
                                gameBox[TwoDIndexToOneDIndex([i, index[1]])].classList.add(
                                    'attackable'
                                );
                            }
                            break;
                        }
                    }
                    for (let i = index[0] - 1; i >= 0; i--) {
                        if (gameBoard[i][index[1]] === ' ') {
                            gameBox[TwoDIndexToOneDIndex([i, index[1]])].classList.add(
                                'movable'
                            );
                        } else {
                            if (whiteChess.includes(gameBoard[i][index[1]])) {
                                gameBox[TwoDIndexToOneDIndex([i, index[1]])].classList.add(
                                    'attackable'
                                );
                            }
                            break;
                        }
                    }
                    for (let i = index[1] + 1; i < 8; i++) {
                        if (gameBoard[index[0]][i] === ' ') {
                            gameBox[TwoDIndexToOneDIndex([index[0], i])].classList.add(
                                'movable'
                            );
                        } else {
                            if (whiteChess.includes(gameBoard[index[0]][i])) {
                                gameBox[TwoDIndexToOneDIndex([index[0], i])].classList.add(
                                    'attackable'
                                );
                            }
                            break;
                        }
                    }
                    for (let i = index[1] - 1; i >= 0; i--) {
                        if (gameBoard[index[0]][i] === ' ') {
                            gameBox[TwoDIndexToOneDIndex([index[0], i])].classList.add(
                                'movable'
                            );
                        } else {
                            if (whiteChess.includes(gameBoard[index[0]][i])) {
                                gameBox[TwoDIndexToOneDIndex([index[0], i])].classList.add(
                                    'attackable'
                                );
                            }
                            break;
                        }
                    }
                    isSelected = true;
                    selectedChessIndex = index;
                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('movable');
                        box.classList.remove('attackable');
                    });
                    isSelected = false;
                }
                break;
            case 'n':
                if (!isSelected) {
                    for (let i = 0; i < 8; i++) {
                        if (
                            index[0] + knightMovableX[i] >= 0 &&
                            index[0] + knightMovableX[i] < 8 &&
                            index[1] + knightMovableY[i] >= 0 &&
                            index[1] + knightMovableY[i] < 8
                        ) {
                            if (
                                gameBoard[index[0] + knightMovableX[i]][
                                    index[1] + knightMovableY[i]
                                ] === ' '
                            ) {
                                gameBox[
                                    TwoDIndexToOneDIndex([
                                        index[0] + knightMovableX[i],
                                        index[1] + knightMovableY[i],
                                    ])
                                ].classList.add('movable');
                            } else {
                                if (
                                    whiteChess.includes(
                                        gameBoard[index[0] + knightMovableX[i]][
                                            index[1] + knightMovableY[i]
                                        ]
                                    )
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([
                                            index[0] + knightMovableX[i],
                                            index[1] + knightMovableY[i],
                                        ])
                                    ].classList.add('attackable');
                                }
                            }
                        }
                    }
                    isSelected = true;
                    selectedChessIndex = index;
                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('movable');
                        box.classList.remove('attackable');
                    });
                    isSelected = false;
                }
                break;
            case 'b':
                if (!isSelected) {
                    for (let i = 1; i < 8; i++) {
                        if (index[0] + i < 8 && index[1] + i < 8) {
                            if (gameBoard[index[0] + i][index[1] + i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] + i, index[1] + i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    whiteChess.includes(gameBoard[index[0] + i][index[1] + i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] + i, index[1] + i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] + i < 8 && index[1] - i >= 0) {
                            if (gameBoard[index[0] + i][index[1] - i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] + i, index[1] - i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    whiteChess.includes(gameBoard[index[0] + i][index[1] - i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] + i, index[1] - i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] - i >= 0 && index[1] + i < 8) {
                            if (gameBoard[index[0] - i][index[1] + i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] - i, index[1] + i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    whiteChess.includes(gameBoard[index[0] - i][index[1] + i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] - i, index[1] + i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] - i >= 0 && index[1] - i >= 0) {
                            if (gameBoard[index[0] - i][index[1] - i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] - i, index[1] - i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    whiteChess.includes(gameBoard[index[0] - i][index[1] - i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] - i, index[1] - i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    isSelected = true;
                    selectedChessIndex = index;
                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('movable');
                        box.classList.remove('attackable');
                    });
                    isSelected = false;
                }
                break;
            case 'q':
                if (!isSelected) {
                    for (let i = 1; i < 8; i++) {
                        if (index[0] + i < 8) {
                            if (gameBoard[index[0] + i][index[1]] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] + i, index[1]])
                                ].classList.add('movable');
                            } else {
                                if (whiteChess.includes(gameBoard[index[0] + i][index[1]])) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] + i, index[1]])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] - i >= 0) {
                            if (gameBoard[index[0] - i][index[1]] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] - i, index[1]])
                                ].classList.add('movable');
                            } else {
                                if (whiteChess.includes(gameBoard[index[0] - i][index[1]])) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] - i, index[1]])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[1] + i < 8) {
                            if (gameBoard[index[0]][index[1] + i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0], index[1] + i])
                                ].classList.add('movable');
                            } else {
                                if (whiteChess.includes(gameBoard[index[0]][index[1] + i])) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0], index[1] + i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[1] - i >= 0) {
                            if (gameBoard[index[0]][index[1] - i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0], index[1] - i])
                                ].classList.add('movable');
                            } else {
                                if (whiteChess.includes(gameBoard[index[0]][index[1] - i])) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0], index[1] - i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] + i < 8 && index[1] + i < 8) {
                            if (gameBoard[index[0] + i][index[1] + i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] + i, index[1] + i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    whiteChess.includes(gameBoard[index[0] + i][index[1] + i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] + i, index[1] + i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] - i >= 0 && index[1] - i >= 0) {
                            if (gameBoard[index[0] - i][index[1] - i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] - i, index[1] - i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    whiteChess.includes(gameBoard[index[0] - i][index[1] - i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] - i, index[1] - i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] + i < 8 && index[1] - i >= 0) {
                            if (gameBoard[index[0] + i][index[1] - i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] + i, index[1] - i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    whiteChess.includes(gameBoard[index[0] + i][index[1] - i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] + i, index[1] - i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] - i >= 0 && index[1] + i < 8) {
                            if (gameBoard[index[0] - i][index[1] + i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] - i, index[1] + i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    whiteChess.includes(gameBoard[index[0] - i][index[1] + i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] - i, index[1] + i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }

                    isSelected = true;
                    selectedChessIndex = index;
                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('movable');
                        box.classList.remove('attackable');
                    });
                    isSelected = false;
                }
                break;

            case 'k':
                if (!isSelected) {
                    for (let i = 0; i < 8; i++) {
                        if (
                            index[0] + kingMovableX[i] >= 0 &&
                            index[0] + kingMovableX[i] < 8 &&
                            index[1] + kingMovableY[i] >= 0 &&
                            index[1] + kingMovableY[i] < 8
                        ) {
                            if (
                                gameBoard[index[0] + kingMovableX[i]][
                                    index[1] + kingMovableY[i]
                                ] === ' '
                            ) {
                                gameBox[
                                    TwoDIndexToOneDIndex([
                                        index[0] + kingMovableX[i],
                                        index[1] + kingMovableY[i],
                                    ])
                                ].classList.add('movable');
                            } else {
                                if (
                                    whiteChess.includes(
                                        gameBoard[index[0] + kingMovableX[i]][
                                            index[1] + kingMovableY[i]
                                        ]
                                    )
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([
                                            index[0] + kingMovableX[i],
                                            index[1] + kingMovableY[i],
                                        ])
                                    ].classList.add('attackable');
                                }
                            }
                        }
                    }
                    isSelected = true;
                    selectedChessIndex = index;
                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('movable');
                        box.classList.remove('attackable');
                    });
                    isSelected = false;
                }
                break;
            case 'p':
                if (!isSelected) {
                    if (index[0] + 1 < 8) {
                        if (gameBoard[index[0] + 1][index[1]] === ' ') {
                            gameBox[
                                TwoDIndexToOneDIndex([index[0] + 1, index[1]])
                            ].classList.add('movable');
                        }
                        if (index[1] + 1 < 8) {
                            if (whiteChess.includes(gameBoard[index[0] + 1][index[1] + 1])) {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] + 1, index[1] + 1])
                                ].classList.add('attackable');
                            }
                        }
                        if (index[1] - 1 >= 0) {
                            if (whiteChess.includes(gameBoard[index[0] + 1][index[1] - 1])) {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] + 1, index[1] - 1])
                                ].classList.add('attackable');
                            }
                        }
                    }
                    if (index[0] === 1) {
                        if (gameBoard[index[0] + 1][index[1]] === ' ') {
                            gameBox[
                                TwoDIndexToOneDIndex([index[0] + 1, index[1]])
                            ].classList.add('movable');
                            if (gameBoard[index[0] + 2][index[1]] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] + 2, index[1]])
                                ].classList.add('movable');
                            }
                        }
                    }
                    isSelected = true;
                    selectedChessIndex = index;
                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('movable');
                        box.classList.remove('attackable');
                    });
                    isSelected = false;
                }
                break;
            default:
                if (
                    isSelected &&
                    (gameBox[TwoDIndexToOneDIndex(index)].classList.contains('movable') ||
                        gameBox[TwoDIndexToOneDIndex(index)].classList.contains(
                            'attackable'
                        ))
                ) {
                    gameBoard[index[0]][index[1]] =
                        gameBoard[selectedChessIndex[0]][selectedChessIndex[1]];
                    gameBoard[selectedChessIndex[0]][selectedChessIndex[1]] = ' ';
                    selectedChessIndex = null;
                    gameBox.forEach((box) => {
                        box.classList.remove('movable');
                        box.classList.remove('attackable');
                    });
                    isSelected = false;
                    turn = !turn;
                }
                break;
        }
    } else {
        // White's Turn
        switch (chess) {
            case 'R':
                if (!isSelected) {
                    for (let i = index[0] + 1; i < 8; i++) {
                        if (gameBoard[i][index[1]] === ' ') {
                            gameBox[TwoDIndexToOneDIndex([i, index[1]])].classList.add(
                                'movable'
                            );
                        } else {
                            if (blackChess.includes(gameBoard[i][index[1]])) {
                                gameBox[TwoDIndexToOneDIndex([i, index[1]])].classList.add(
                                    'attackable'
                                );
                            }
                            break;
                        }
                    }
                    for (let i = index[0] - 1; i >= 0; i--) {
                        if (gameBoard[i][index[1]] === ' ') {
                            gameBox[TwoDIndexToOneDIndex([i, index[1]])].classList.add(
                                'movable'
                            );
                        } else {
                            if (blackChess.includes(gameBoard[i][index[1]])) {
                                gameBox[TwoDIndexToOneDIndex([i, index[1]])].classList.add(
                                    'attackable'
                                );
                            }
                            break;
                        }
                    }
                    for (let i = index[1] + 1; i < 8; i++) {
                        if (gameBoard[index[0]][i] === ' ') {
                            gameBox[TwoDIndexToOneDIndex([index[0], i])].classList.add(
                                'movable'
                            );
                        } else {
                            if (blackChess.includes(gameBoard[index[0]][i])) {
                                gameBox[TwoDIndexToOneDIndex([index[0], i])].classList.add(
                                    'attackable'
                                );
                            }
                            break;
                        }
                    }
                    for (let i = index[1] - 1; i >= 0; i--) {
                        if (gameBoard[index[0]][i] === ' ') {
                            gameBox[TwoDIndexToOneDIndex([index[0], i])].classList.add(
                                'movable'
                            );
                        } else {
                            if (blackChess.includes(gameBoard[index[0]][i])) {
                                gameBox[TwoDIndexToOneDIndex([index[0], i])].classList.add(
                                    'attackable'
                                );
                            }
                            break;
                        }
                    }
                    isSelected = true;
                    selectedChessIndex = index;
                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('movable');
                        box.classList.remove('attackable');
                    });
                    isSelected = false;
                }
                break;
            case 'N':
                if (!isSelected) {
                    for (let i = 0; i < 8; i++) {
                        if (
                            index[0] + knightMovableX[i] >= 0 &&
                            index[0] + knightMovableX[i] < 8 &&
                            index[1] + knightMovableY[i] >= 0 &&
                            index[1] + knightMovableY[i] < 8
                        ) {
                            if (
                                gameBoard[index[0] + knightMovableX[i]][
                                    index[1] + knightMovableY[i]
                                ] === ' '
                            ) {
                                gameBox[
                                    TwoDIndexToOneDIndex([
                                        index[0] + knightMovableX[i],
                                        index[1] + knightMovableY[i],
                                    ])
                                ].classList.add('movable');
                            } else {
                                if (
                                    blackChess.includes(
                                        gameBoard[index[0] + knightMovableX[i]][
                                            index[1] + knightMovableY[i]
                                        ]
                                    )
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([
                                            index[0] + knightMovableX[i],
                                            index[1] + knightMovableY[i],
                                        ])
                                    ].classList.add('attackable');
                                }
                            }
                        }
                    }
                    isSelected = true;
                    selectedChessIndex = index;
                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('movable');
                        box.classList.remove('attackable');
                    });
                    isSelected = false;
                }
                break;
            case 'B':
                if (!isSelected) {
                    for (let i = 1; i < 8; i++) {
                        if (index[0] + i < 8 && index[1] + i < 8) {
                            if (gameBoard[index[0] + i][index[1] + i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] + i, index[1] + i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    blackChess.includes(gameBoard[index[0] + i][index[1] + i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] + i, index[1] + i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] + i < 8 && index[1] - i >= 0) {
                            if (gameBoard[index[0] + i][index[1] - i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] + i, index[1] - i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    blackChess.includes(gameBoard[index[0] + i][index[1] - i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] + i, index[1] - i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] - i >= 0 && index[1] + i < 8) {
                            if (gameBoard[index[0] - i][index[1] + i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] - i, index[1] + i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    blackChess.includes(gameBoard[index[0] - i][index[1] + i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] - i, index[1] + i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] - i >= 0 && index[1] - i >= 0) {
                            if (gameBoard[index[0] - i][index[1] - i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] - i, index[1] - i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    blackChess.includes(gameBoard[index[0] - i][index[1] - i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] - i, index[1] - i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    isSelected = true;
                    selectedChessIndex = index;
                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('movable');
                        box.classList.remove('attackable');
                    });
                    isSelected = false;
                }
                break;
            case 'Q':
                if (!isSelected) {
                    for (let i = 1; i < 8; i++) {
                        if (index[0] + i < 8) {
                            if (gameBoard[index[0] + i][index[1]] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] + i, index[1]])
                                ].classList.add('movable');
                            } else {
                                if (blackChess.includes(gameBoard[index[0] + i][index[1]])) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] + i, index[1]])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] - i >= 0) {
                            if (gameBoard[index[0] - i][index[1]] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] - i, index[1]])
                                ].classList.add('movable');
                            } else {
                                if (blackChess.includes(gameBoard[index[0] - i][index[1]])) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] - i, index[1]])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[1] + i < 8) {
                            if (gameBoard[index[0]][index[1] + i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0], index[1] + i])
                                ].classList.add('movable');
                            } else {
                                if (blackChess.includes(gameBoard[index[0]][index[1] + i])) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0], index[1] + i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[1] - i >= 0) {
                            if (gameBoard[index[0]][index[1] - i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0], index[1] - i])
                                ].classList.add('movable');
                            } else {
                                if (blackChess.includes(gameBoard[index[0]][index[1] - i])) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0], index[1] - i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] + i < 8 && index[1] + i < 8) {
                            if (gameBoard[index[0] + i][index[1] + i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] + i, index[1] + i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    blackChess.includes(gameBoard[index[0] + i][index[1] + i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] + i, index[1] + i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] - i >= 0 && index[1] - i >= 0) {
                            if (gameBoard[index[0] - i][index[1] - i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] - i, index[1] - i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    blackChess.includes(gameBoard[index[0] - i][index[1] - i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] - i, index[1] - i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] + i < 8 && index[1] - i >= 0) {
                            if (gameBoard[index[0] + i][index[1] - i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] + i, index[1] - i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    blackChess.includes(gameBoard[index[0] + i][index[1] - i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] + i, index[1] - i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }
                    for (let i = 1; i < 8; i++) {
                        if (index[0] - i >= 0 && index[1] + i < 8) {
                            if (gameBoard[index[0] - i][index[1] + i] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] - i, index[1] + i])
                                ].classList.add('movable');
                            } else {
                                if (
                                    blackChess.includes(gameBoard[index[0] - i][index[1] + i])
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([index[0] - i, index[1] + i])
                                    ].classList.add('attackable');
                                }
                                break;
                            }
                        }
                    }

                    isSelected = true;
                    selectedChessIndex = index;
                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('movable');
                        box.classList.remove('attackable');
                    });
                    isSelected = false;
                }
                break;

            case 'K':
                if (!isSelected) {
                    for (let i = 0; i < 8; i++) {
                        if (
                            index[0] + kingMovableX[i] >= 0 &&
                            index[0] + kingMovableX[i] < 8 &&
                            index[1] + kingMovableY[i] >= 0 &&
                            index[1] + kingMovableY[i] < 8
                        ) {
                            if (
                                gameBoard[index[0] + kingMovableX[i]][
                                    index[1] + kingMovableY[i]
                                ] === ' '
                            ) {
                                gameBox[
                                    TwoDIndexToOneDIndex([
                                        index[0] + kingMovableX[i],
                                        index[1] + kingMovableY[i],
                                    ])
                                ].classList.add('movable');
                            } else {
                                if (
                                    blackChess.includes(
                                        gameBoard[index[0] + kingMovableX[i]][
                                            index[1] + kingMovableY[i]
                                        ]
                                    )
                                ) {
                                    gameBox[
                                        TwoDIndexToOneDIndex([
                                            index[0] + kingMovableX[i],
                                            index[1] + kingMovableY[i],
                                        ])
                                    ].classList.add('attackable');
                                }
                            }
                        }
                    }
                    isSelected = true;
                    selectedChessIndex = index;
                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('movable');
                        box.classList.remove('attackable');
                    });
                    isSelected = false;
                }
                break;
            case 'P':
                if (!isSelected) {
                    if (index[0] - 1 >= 0) {
                        if (gameBoard[index[0] - 1][index[1]] === ' ') {
                            gameBox[
                                TwoDIndexToOneDIndex([index[0] - 1, index[1]])
                            ].classList.add('movable');
                        }
                        if (index[1] + 1 < 8) {
                            if (blackChess.includes(gameBoard[index[0] - 1][index[1] + 1])) {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] - 1, index[1] + 1])
                                ].classList.add('attackable');
                            }
                        }
                        if (index[1] - 1 >= 0) {
                            if (blackChess.includes(gameBoard[index[0] - 1][index[1] - 1])) {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] - 1, index[1] - 1])
                                ].classList.add('attackable');
                            }
                        }
                    }
                    if (index[0] === 6) {
                        if (gameBoard[index[0] - 1][index[1]] === ' ') {
                            gameBox[
                                TwoDIndexToOneDIndex([index[0] - 1, index[1]])
                            ].classList.add('movable');
                            if (gameBoard[index[0] - 2][index[1]] === ' ') {
                                gameBox[
                                    TwoDIndexToOneDIndex([index[0] - 2, index[1]])
                                ].classList.add('movable');
                            }
                        }
                    }
                    isSelected = true;
                    selectedChessIndex = index;
                } else {
                    gameBox.forEach((box) => {
                        box.classList.remove('movable');
                        box.classList.remove('attackable');
                    });
                    isSelected = false;
                }
                break;
            default:
                if (
                    isSelected &&
                    (gameBox[TwoDIndexToOneDIndex(index)].classList.contains('movable') ||
                        gameBox[TwoDIndexToOneDIndex(index)].classList.contains(
                            'attackable'
                        ))
                ) {
                    gameBoard[index[0]][index[1]] =
                        gameBoard[selectedChessIndex[0]][selectedChessIndex[1]];
                    gameBoard[selectedChessIndex[0]][selectedChessIndex[1]] = ' ';
                    selectedChessIndex = null;
                    gameBox.forEach((box) => {
                        box.classList.remove('movable');
                        box.classList.remove('attackable');
                    });
                    isSelected = false;
                    turn = !turn;
                }
                break;
        }
    }

    gameDraw();
}

function gameUpdate() {
    location.reload();
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

function gameDraw() {
    var die1 = true;
    var die2 = true;
    var count = 0;
    gameBoard.forEach((row, rowIndex) => {
        row.forEach((piece, pieceIndex) => {

            if (piece !== ' ') {
                gameBox[rowIndex * 8 + pieceIndex].innerHTML = chessMap[piece];
                count += 1;
            } else {
                gameBox[rowIndex * 8 + pieceIndex].innerHTML = '';
            }
            if (chessMap[piece] == '♚') {
                die1 = false;
            }
            if (chessMap[piece] == '♔') {
                die2 = false;
            }

        });
    });

    if (count == 2) {
        alert("Draw");
        gameUpdate();
    }

    if (die1) {
        alert("White Win");
        gameUpdate();
    }
    if (die2) {
        alert("Black Win");
        gameUpdate();
    }
    document.getElementById('turn').innerHTML = !turn ?
        "White's Turn" :
        "Black's Turn";
}

gameInit();
gameDraw();