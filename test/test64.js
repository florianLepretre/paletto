'use strict';

var PalettoTestCase64 = TestCase("PalettoTestCase64");

PalettoTestCase64.prototype.testStory8 = function () {
    var engine = new Engine(8);

    var size = engine.getSize();
    assertTrue(size === 8);

    for (var i = 0; i < size - 1; ++i) {
        for (var j = 0; j < size - 1; ++j) {
            assertNotEquals(engine.getCase(i, j), engine.getCase(i+1, j));
            assertNotEquals(engine.getCase(i, j), engine.getCase(i, j+1));
        }
    }
};

PalettoTestCase64.prototype.testStory9 = function () {
    var engine = new Engine(8);

    var possibleColors, possibleCoords;

    while (engine.getWinner() == false) {
        possibleColors = engine.getPossibleColors();
        possibleCoords = engine.getPossibleCoordinates();

        var color = possibleColors[Math.floor(Math.random() * possibleColors.length)];

        for (var coordinates in possibleCoords) {
            var line = possibleCoords[coordinates].charCodeAt(1) - 49;
            var column = possibleCoords[coordinates].charCodeAt(0) - 65;

            if (engine.getCase(line, column) === engine.getColor(color)){
                engine.play(possibleCoords[coordinates]);
            }
        }
        engine.changeTurn();
    }

    assertTrue(engine.getWinner() !== false);
};