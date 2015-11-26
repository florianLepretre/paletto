'use strict';

var PalettoTestCase64 = TestCase("PalettoTestCase64");

PalettoTestCase64.prototype.testStory8 = function () {
    var engine = new Engine(8);

    var size = engine.getSize();
    assertTrue(size === 8);

    /*for (var i = 0; i < size - 1; ++i) {
        for (var j = 0; j < size - 1; ++j) {
            assertNotEquals(engine.getCase(i, j), engine.getCase(i+1, j));
            assertNotEquals(engine.getCase(i, j), engine.getCase(i, j+1));
        }
    }*/

    var line;

    for (var k = 0; k < size; ++k) {
        line = '';
        for (var l = 0; l < size; ++l) {
            line += engine.getCase(k,l) + ' ';
        }
        console.log(line);
    }
};