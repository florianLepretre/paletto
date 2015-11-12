var Engine = function () { // jshint ignore:line
    'use strict';

    // private attributes and methods
    var board,
        size = 6,
        balls = 36,
        colors = {none: 0, bla: 1, gre: 2, whi: 3, blu: 4, red: 5, yel: 6},
        players,
        currentPlayer;

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
        board[coords.lin][coords.col] = 0;
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

    var init = function () {
        players = [
            {bla: 0, gre: 0, whi: 0, blu: 0, red: 0, yel: 0},
            {bla: 0, gre: 0, whi: 0, blu: 0, red: 0, yel: 0}
        ];
        currentPlayer = 0;

        board = [
            [colors.bla, colors.gre, colors.whi, colors.blu, colors.red, colors.whi],
            [colors.yel, colors.whi, colors.gre, colors.red, colors.yel, colors.blu],
            [colors.blu, colors.yel, colors.blu, colors.whi, colors.bla, colors.red],
            [colors.red, colors.bla, colors.red, colors.gre, colors.blu, colors.whi],
            [colors.whi, colors.gre, colors.yel, colors.bla, colors.yel, colors.gre],
            [colors.yel, colors.blu, colors.bla, colors.red, colors.gre, colors.bla]
        ];
    };

    // public methods
    this.play = function (coords) {
        pick(convertCoords(coords));
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
        if (player === 1) {
            return players[player][color];
        }
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

    init();
};
