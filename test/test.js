'use strict';

var PalettoTestCase = TestCase("PalettoTestCase");

PalettoTestCase.prototype.testStory1 = function () {
    var engine = new Engine();

    var size = engine.getSize();

    for (var i = 0; i < size - 1; ++i) {
        for (var j = 0; j < size - 1; ++j) {
            assertNotEquals(engine.getCase(i, j), engine.getCase(i+1, j));
            assertNotEquals(engine.getCase(i, j), engine.getCase(i, j+1));
        }
    }
};

PalettoTestCase.prototype.testStory2 = function () {
    var engine = new Engine();

    assertEquals(engine.getCase(5,0), engine.getColor('yel'));
};

PalettoTestCase.prototype.testStory3 = function () {
    var engine = new Engine();

    engine.play('A5');

    assertEquals(engine.getCase(5,0), 0);
    assertEquals(engine.getBalls(), 35);
    assertEquals(engine.getPlayerScore(1, 'yel'), 1);
};

PalettoTestCase.prototype.testStory4 = function () {
    var engine = new Engine();

    var possibleColors = engine.getPossibleColors();
    assertTrue(possibleColors.indexOf('bla') !== -1);
    assertTrue(possibleColors.indexOf('whi') !== -1);
    assertTrue(possibleColors.indexOf('blu') !== -1);

    engine.changeTurn();
    engine.play('A1');
    engine.play('A6');
    assertEquals(engine.getPlayerScore(2, 'bla'), 2);
};