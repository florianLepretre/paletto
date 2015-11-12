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
    assertEquals(engine.getPlayerScore('yel'), 1);
};