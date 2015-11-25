var Engine = function () { // jshint ignore:line
    'use strict';

    // private attributes and methods
    var board,
        size = 6,
        balls = 36,
        colors = {none: 0, bla: 1, gre: 2, whi: 3, blu: 4, red: 5, yel: 6},
        players,
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

    var convertCoords = function (coords) {
        var line = coords.charCodeAt(1) - 49;
        var column = coords.charCodeAt(0) - 65;

        return {lin: line, col: column};
    };

    var updateScore = function (pickedColor) {
        players[currentPlayer][convertColor(pickedColor)] += 1;
    };

    var pick = function (coords) {
        var pickedColor = board[coords.lin][coords.col];

        updateScore(pickedColor);
        board[coords.lin][coords.col] = colors.none;
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

    var getNeigborVerticalPositions = function (lin, col) {
        var verticalPosition = '';

        if (getUp(lin, col)) {
            verticalPosition += 'u';
        }
        if (getDown(lin, col)) {
            verticalPosition += 'd';
        }

        return verticalPosition;
    };

    var getNeigborHorizontalPositions = function (lin, col) {
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
        return (getNeigborVerticalPositions(lin, col) + getNeigborHorizontalPositions(lin, col));
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

    var checkVictory = function () {
        for (var color in players[currentPlayer]) {
            if (players[currentPlayer][color] == 6) {
                winner = currentPlayer;
                return;
            }
        }
    };

    var init = function () {
        players = [
            {bla: 0, gre: 0, whi: 0, blu: 0, red: 0, yel: 0},
            {bla: 0, gre: 0, whi: 0, blu: 0, red: 0, yel: 0}
        ];
        currentPlayer = 0;
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
    this.play = function (coords) {
        if (this.isAllowed(coords)) {
            pick(convertCoords(coords));
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

    this.isAllowed = function (coords) {
        var convertedCoords = convertCoords(coords);
        var neighbours = getNeighborCount(convertedCoords.lin, convertedCoords.col);

        if (neighbours >= 3) {
            return false;
        }

        if (neighbours === 2) {
            return checkGameConsistency(convertedCoords.lin, convertedCoords.col);
        }

        return (this.getCase(convertedCoords.lin, convertedCoords.col) !== colors.none);
    };

    this.getIntermediateState = function () {
        initIntermediateBoard();
    };

    this.getWinner = function () {
        return winner;
    };

    init();
};