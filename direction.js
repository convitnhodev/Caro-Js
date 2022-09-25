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