'use strict';

var Engine = function () {

    // private attributes and methods
    var board;
    var size;

    var initBoard = function () {
        board = new Array(size);
        for (var i = 0; i < size; ++i){
            board[i] = new Array(size);
        }

        board[0][0] = board[2][4] = board[3][1] = board[4][3] = board[5][2] = board[5][5] = 'black';
        board[0][1] = board[1][2] = board[3][3] = board[4][1] = board[4][5] = board[5][4] = 'green';
        board[1][0] = board[1][4] = board[2][1] = board[4][2] = board[4][4] = board[5][0] = 'yellow';
        board[0][2] = board[0][5] = board[1][1] = board[2][3] = board[3][5] = board[4][0] = 'white';
        board[0][4] = board[1][3] = board[2][5] = board[3][0] = board[3][2] = board[5][3] = 'red';
        board[0][3] = board[1][5] = board[2][0] = board[2][2] = board[3][4] = board[5][1] = 'blue';
    };

    var init = function () {
        size = 6;
        initBoard();
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
