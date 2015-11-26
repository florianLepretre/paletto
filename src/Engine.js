var Engine = function (boardSize) { // jshint ignore:line
    'use strict';

    // private attributes and methods
    var board,
        size = boardSize,
        balls,
        players,
        colors,
        currentPlayer,
        winner;

    var convertColor = function (colorCode) {
        var key, color;

        for (key in colors) {
            //noinspection JSUnfilteredForInLoop
            if (colorCode === colors[key]) {
                color = key;
                break;
            }
        }

        return color;
    };

    var convertCoordinates = function (coordinates) {
        var line = coordinates.charCodeAt(1) - 49;
        var column = coordinates.charCodeAt(0) - 65;

        return {lin: line, col: column};
    };

    var updateScore = function (pickedColor) {
        players[currentPlayer][convertColor(pickedColor)] += 1;
    };

    var pick = function (coordinates) {
        var pickedColor = board[coordinates.lin][coordinates.col];

        updateScore(pickedColor);
        board[coordinates.lin][coordinates.col] = colors.none;
        balls -= 1;
    };

    var getLeft = function (i, j) {
        if (j - 1 >= 0) {
            if (board[i][j - 1] !== 0) {
                return 1;
            }
        }
        return 0;
    };

    var getRight = function (i, j) {
        if (j + 1 < size) {
            if (board[i][j + 1] !== 0) {
                return 1;
            }
        }
        return 0;
    };

    var getUp = function (i, j) {
        if (i - 1 >= 0) {
            if (board[i - 1][j] !== 0) {
                return 1;
            }
        }
        return 0;
    };

    var getDown = function (i, j) {
        if (i + 1 < size) {
            if (board[i + 1][j] !== 0) {
                return 1;
            }
        }
        return 0;
    };

    var getNeighborCount = function (i, j) {
        return getUp(i, j) + getDown(i, j) + getLeft(i, j) + getRight(i, j);
    };

    var updatePossibleColors = function (possibleColors, i, j) {
        if (possibleColors.indexOf(convertColor(board[i][j])) < 0) {
            if (getNeighborCount(i, j) <= 2) {
                possibleColors.push(convertColor(board[i][j]));
            }
        }
    };

    var getNeighborVerticalPositions = function (lin, col) {
        var verticalPosition = '';

        if (getUp(lin, col)) {
            verticalPosition += 'u';
        }
        if (getDown(lin, col)) {
            verticalPosition += 'd';
        }

        return verticalPosition;
    };

    var getNeighborHorizontalPositions = function (lin, col) {
        var horizontalPosition = '';

        if (getLeft(lin, col)) {
            horizontalPosition += 'l';
        }
        if (getRight(lin, col)) {
            horizontalPosition += 'r';
        }

        return horizontalPosition;
    };

    var getNeighborPositions = function (lin, col) {
        return (getNeighborVerticalPositions(lin, col) + getNeighborHorizontalPositions(lin, col));
    };

    var checkUpPositions = function (pos, lin, col) {
        if (pos === 'ur') {
            return board[lin - 1][col + 1] !== colors.none;
        }
        if (pos === 'ul') {
            return board[lin - 1][col - 1] !== colors.none;
        }
        return null;
    };

    var checkDownPositions = function (pos, lin, col) {
        if (pos === 'dr') {
            return board[lin + 1][col + 1] !== colors.none;
        }
        return board[lin + 1][col - 1] !== colors.none;
    };

    var checkPositions = function (pos, lin, col) {
        var check = checkUpPositions(pos, lin, col);

        if (check !== null) {
            return check;
        }

        return checkDownPositions(pos, lin, col);
    };

    var checkGameConsistency = function (lin, col) {
        var positions = getNeighborPositions(lin, col);

        if (positions === 'ud' || positions === 'lr') {
            return false;
        }

        return checkPositions(positions, lin, col);
    };

    var checkScore = function () {
        var color;
        for (color in players[currentPlayer]) {
            //noinspection JSUnfilteredForInLoop
            if (players[currentPlayer][color] === 6) {
                winner = currentPlayer;
                return;
            }
        }
    };

    var checkVictory = function () {
        checkScore();
        if (!winner) {
            if (balls === 0) {
                winner = currentPlayer;
            }
        }
    };

    var create2DArray = function () {
        var i;
        board = new Array(size);
        for (i = 0; i < size; ++i) {
            board[i] = new Array(size);
        }
    };

    var isPossible = function (pickedColor, lin, col) {
        var possible = true;

        if (lin > 0) {
            possible = possible && (board[lin - 1][col] !== pickedColor);
        }
        if (col > 0) {
            possible = possible && (board[lin][col - 1] !== pickedColor);
        }

        return possible;
    };

    var stopPuttingRandomColor = function (colorCount, pickedColor, lin, col, fail) {
        var stop = (colorCount[convertColor(pickedColor)] > 0 && isPossible(pickedColor, lin, col));
        return stop || fail >= 100;
    };

    var putRandomColor = function (lin, col, colorCount) {
        var pickedColor, fail = 0;

        do {
            fail += 1;
            pickedColor = Math.floor((Math.random() * 8)) + 1;
        } while (!(stopPuttingRandomColor(colorCount, pickedColor, lin, col, fail)));

        if (fail >= 100) {
            return true;
        }

        board[lin][col] = colors[convertColor(pickedColor)];
        colorCount[convertColor(pickedColor)] -= 1;

        return false;
    };

    var initRandomLine = function (lin, colorCount) {
        var col,
            fail;

        for (col = 0; col < size; ++col) {
            fail = putRandomColor(lin, col, colorCount);
            if (fail) {
                return true;
            }
        }

        return false;
    };

    var createRandomBoard = function (colorCount) {
        var lin,
            fail;

        for (lin = 0; lin < size; ++lin) {
            fail = initRandomLine(lin, colorCount);
            if (fail) {
                return true;
            }
        }

        return false;
    };

    var initRandomBoard = function () {
        var fail = false,
            colorCount;

        create2DArray();

        do {
            colorCount = {bla: 8, gre: 8, whi: 8, blu: 8, red: 8, yel: 8, pin: 8, ora: 8};
            fail = createRandomBoard(colorCount);
        } while (fail);
    };

    var init6 = function () {
        players = [
            {bla: 0, gre: 0, whi: 0, blu: 0, red: 0, yel: 0},
            {bla: 0, gre: 0, whi: 0, blu: 0, red: 0, yel: 0}
        ];
        currentPlayer = 0;
        balls = 36;
        colors = {none: 0, bla: 1, gre: 2, whi: 3, blu: 4, red: 5, yel: 6};
        winner = false;

        board = [
            [colors.bla, colors.gre, colors.whi, colors.blu, colors.red, colors.whi],
            [colors.yel, colors.whi, colors.gre, colors.red, colors.yel, colors.blu],
            [colors.blu, colors.yel, colors.blu, colors.whi, colors.bla, colors.red],
            [colors.red, colors.bla, colors.red, colors.gre, colors.blu, colors.whi],
            [colors.whi, colors.gre, colors.yel, colors.bla, colors.yel, colors.gre],
            [colors.yel, colors.blu, colors.bla, colors.red, colors.gre, colors.bla]
        ];
    };

    var init9 = function () {
        players = [
            {bla: 0, gre: 0, whi: 0, blu: 0, red: 0, yel: 0, pin: 0, ora: 0},
            {bla: 0, gre: 0, whi: 0, blu: 0, red: 0, yel: 0, pin: 0, ora: 0}
        ];
        currentPlayer = 0;
        balls = 36;
        colors = {none: 0, bla: 1, gre: 2, whi: 3, blu: 4, red: 5, yel: 6, pin: 7, ora: 8};
        winner = false;

        initRandomBoard();
    };

    var initIntermediateBoard = function () {
        board = [
            [colors.none, colors.none, colors.none, colors.blu, colors.red, colors.whi],
            [colors.none, colors.none, colors.none, colors.red, colors.yel, colors.none],
            [colors.none, colors.none, colors.blu, colors.whi, colors.bla, colors.none],
            [colors.red, colors.bla, colors.red, colors.none, colors.none, colors.none],
            [colors.none, colors.gre, colors.yel, colors.none, colors.none, colors.none],
            [colors.none, colors.none, colors.bla, colors.none, colors.none, colors.none]
        ];
    };

    // public methods
    this.play = function (coordinates) {
        if (this.isAllowed(coordinates)) {
            pick(convertCoordinates(coordinates));
        }
        checkVictory();
    };

    this.changeTurn = function () {
        currentPlayer = (currentPlayer === 0) ? 1 : 0;
    };

    this.getBalls = function () {
        return balls;
    };

    this.getSize = function () {
        return size;
    };

    this.getCase = function (line, column) {
        return board[line][column];
    };

    this.getColor = function (color) {
        return colors[color];
    };

    this.getPlayerScore = function (player, color) {
        return players[player][color];
    };

    this.getPossibleColors = function () {
        var i, j;
        var possibleColors = [];

        for (i = 0; i < size; ++i) {
            for (j = 0; j < size; ++j) {
                updatePossibleColors(possibleColors, i, j);
            }
        }

        return possibleColors;
    };

    this.isAllowed = function (coordinates) {
        var convertedCoordinates = convertCoordinates(coordinates);
        var neighbours = getNeighborCount(convertedCoordinates.lin, convertedCoordinates.col);

        if (neighbours >= 3) {
            return false;
        }

        if (neighbours === 2) {
            return checkGameConsistency(convertedCoordinates.lin, convertedCoordinates.col);
        }

        return (this.getCase(convertedCoordinates.lin, convertedCoordinates.col) !== colors.none);
    };

    this.getIntermediateState = function () {
        initIntermediateBoard();
    };

    this.getWinner = function () {
        return winner;
    };

    if (size === 6) {
        init6();
    } else if (size === 8) {
        init9();
    }
};