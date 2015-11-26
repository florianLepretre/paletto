'use strict';

var PalettoTestCase64 = TestCase("PalettoTestCase64");

PalettoTestCase64.prototype.testStory8 = function () {
    var engine = new Engine(64);

    var size = engine.getSize();
    assertTrue(size === 8);

    for (var i = 0; i < size - 1; ++i) {
        for (var j = 0; j < size - 1; ++j) {
            assertNotEquals(engine.getCase(i, j), engine.getCase(i+1, j));
            assertNotEquals(engine.getCase(i, j), engine.getCase(i, j+1));
        }
    }
};