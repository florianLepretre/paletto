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

    engine.play('A6');

    assertEquals(engine.getCase(5,0), 0);
    assertEquals(engine.getBalls(), 35);
    assertEquals(engine.getPlayerScore(0, 'yel'), 1);
};

PalettoTestCase.prototype.testStory4 = function () {
    var engine = new Engine();

    engine.play('A6');

    var possibleColors = engine.getPossibleColors();
    assertTrue(possibleColors.indexOf('bla') !== -1);
    assertTrue(possibleColors.indexOf('whi') !== -1);
    assertTrue(possibleColors.indexOf('blu') !== -1);

    engine.changeTurn();
    engine.play('A1');
    engine.play('F6');
    assertEquals(engine.getPlayerScore(1, 'bla'), 2);
};

PalettoTestCase.prototype.testStory5 = function () {
    var engine = new Engine();

    engine.getIntermediateState();

    assertTrue(engine.isAllowed('D1'));
    assertTrue(engine.isAllowed('F1'));
    assertTrue(engine.isAllowed('E3'));
    assertTrue(engine.isAllowed('A4'));
    assertTrue(engine.isAllowed('B5'));
    assertTrue(engine.isAllowed('C6'));
    assertFalse(engine.isAllowed('C3'));
};