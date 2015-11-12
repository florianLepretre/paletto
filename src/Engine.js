var Engine = function () { // jshint ignore:line
    'use strict';

    // private attributes and methods
    var board,
        size = 6,
        balls = 36,
        colors = {bla: 1, gre: 2, whi: 3, blu: 4, red: 5, yel: 6},
        player1,
        currentPlayer;

    var convertCoords = function (coords) {
        var line   = coords.charCodeAt(1) - 48;
        var column = coords.charCodeAt(0) - 65;

        return {lin: line, col: column};
    };

    var updateScore = function (pickedColor) {
        var key, color;

        for (key in colors) {
            //noinspection JSUnfilteredForInLoop
            if (pickedColor === colors[key]) {
                color = key;
                break;
            }
        }

        currentPlayer[color] += 1;
    };

    var pick = function (coords) {
        var pickedColor = board[coords.lin][coords.col];

        updateScore(pickedColor);
        board[coords.lin][coords.col] = 0;
        balls -= 1;
    };

    var init = function () {
        player1 = {bla: 0, gre: 0, whi: 0, blu: 0, red: 0, yel: 0};
        currentPlayer = player1;

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

    this.getPlayerScore = function (color) {
        return currentPlayer[color];
    };

    init();
};
