'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testStory1 = function () {
    var coordinates = new Lyngk.Coordinates('A', 1);

    assertFalse(coordinates.is_valid());
};

LyngkTestCase.prototype.testStory2 = function () {
    var tabLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    var tabNumber = [1,2,3,4,5,6,7,8,9];

    var nbGoodCoordinates = 0;

    for(var i = 0; i < tabLetter.length ; i++){
        for(var j = 0; j < tabNumber.length ; j++){
            var coordinates = new Lyngk.Coordinates(tabLetter[i], tabNumber[j]);

            if(coordinates.is_valid())
                nbGoodCoordinates++;
        }
    }

    assertEquals(43, nbGoodCoordinates);
};

LyngkTestCase.prototype.testStory3 = function () {
    var coordinates = new Lyngk.Coordinates('A', 3);
    assertEquals("A3", coordinates);
};

LyngkTestCase.prototype.testStory4 = function() {
    var coordinates = new Lyngk.Coordinates('A', 1);
    assertEquals("invalid", coordinates);
};

LyngkTestCase.prototype.testStory5 = function() {
    var coordinates = new Lyngk.Coordinates('A', 3);
    var coordinatesClone = coordinates.clone();
    assertEquals("A", coordinatesClone.get_letter());
    assertEquals("3", coordinatesClone.get_number());
};