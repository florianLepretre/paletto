var Engine = function () {
    'use strict';

    // private attributes and methods
    var board,
        size,
        colors;

    var init = function () {
        size = 6;

        colors = {bla: 0, gre: 1, whi: 2, blu: 3, red: 4, yel: 5};

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
    this.getSize = function () {
        return size;
    };

    this.getCase = function (line, column) {
        return board[line][column];
    };

    init();
};
