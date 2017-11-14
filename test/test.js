'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testStory1 = function () {
    var coordinates = new Lyngk.Coordinates('A', 1);

    assertFalse(coordinates.isValid());
};

LyngkTestCase.prototype.testStory2 = function () {
    var tabLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    var tabNumber = [1,2,3,4,5,6,7,8,9];

    var nbGoodCoordinates = 0;

    for(var i = 0; i < tabLetter.length ; i++){
        for(var j = 0; j < tabNumber.length ; j++){
            var coordinates = new Lyngk.Coordinates(tabLetter[i], tabNumber[j]);

            if(coordinates.isValid())
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
    assertEquals("A", coordinatesClone.getLetter());
    assertEquals("3", coordinatesClone.getNumber());
};

LyngkTestCase.prototype.testStory6 = function(){
    var letters = ["A", "B", "C", "D", "E", "F", "G","H", "I"];
    var tabEntier = [];
    for(var i = 0 ; i < 9 ; i++) {
        for (var j = 1; j <= 9; j++) {
            var entierTest = (new Lyngk.Coordinates(letters[i], j)).hash();
            if (entierTest !== 0 && tabEntier.indexOf(entierTest) === -1) {
                tabEntier.push(entierTest);
            }
        }
    }
    assertEquals(43, tabEntier.length);
};

LyngkTestCase.prototype.testStory7 = function(){
    var intersection = new Lyngk.Intersection();
    assertEquals(Lyngk.State.VACANT, intersection.getActualState());
};

LyngkTestCase.prototype.testStory8 = function(){
    var piece = new Lyngk.Piece();
    piece.setColor(Lyngk.Color.BLUE);
    var intersection = new Lyngk.Intersection();
    intersection.pose(piece);
    assertEquals(Lyngk.State.ONE_PIECE, intersection.getActualState());
    assertEquals(Lyngk.Color.BLUE , intersection.getColor());
};

LyngkTestCase.prototype.testStory9 = function() {
    var firstPiece = new Lyngk.Piece();
    firstPiece.setColor(Lyngk.Color.BLUE);
    var secondPiece = new Lyngk.Piece();
    secondPiece.setColor(Lyngk.Color.RED);
    var intersection = new Lyngk.Intersection();
    intersection.pose(firstPiece);
    intersection.pose(secondPiece);

    assertEquals(Lyngk.State.STACK, intersection.getActualState());
    assertEquals(Lyngk.Color.RED , intersection.getColor());
};

LyngkTestCase.prototype.testStory10 = function() {
    var piece = new Lyngk.Piece();
    piece.setColor(Lyngk.Color.BLUE);
    var intersection = new Lyngk.Intersection();
    for(var i = 0 ; i < 5 ; i++){
        intersection.pose(piece);
    }

    assertEquals(Lyngk.State.FULL_STACK, intersection.getActualState());
};

LyngkTestCase.prototype.testStory11 = function() {
    var engine = new Lyngk.Engine();
    var intersections = engine.getIntersections();
    var test;
    for(var i = 0 ; i < intersections.length ; i++){
        if(intersections[i].getActualState() === Lyngk.State.ONE_PIECE && intersections[i].getPieces().length === 1)
            test = true;
        else{
            test = false;
            break;
        }

    }

    assertEquals(true,test);
};

LyngkTestCase.prototype.testStory12 = function() {
    var engine = new Lyngk.Engine();
    var nbBlack = 0;
    var nbBlue = 0;
    var nbRed = 0;
    var nbIvory= 0;
    var nbGreen = 0;
    var nbWhite = 0;

    var intersections = engine.getIntersections();
    for(var i = 0 ; i < intersections.length ; i++){
        if(intersections[i].getColor() === Lyngk.Color.BLACK)
            nbBlack++;
        if(intersections[i].getColor() === Lyngk.Color.BLUE)
            nbBlue++;
        if(intersections[i].getColor() === Lyngk.Color.RED)
            nbRed++;
        if(intersections[i].getColor() === Lyngk.Color.IVORY)
            nbIvory++;
        if(intersections[i].getColor() === Lyngk.Color.GREEN)
            nbGreen++;
        if(intersections[i].getColor() === Lyngk.Color.WHITE)
            nbWhite++;
    }
    var test = false;
    if(intersections.length === 43) {
        if (nbBlack === Lyngk.NbColor.BLACK
            && nbBlue === Lyngk.NbColor.BLUE
            && nbRed === Lyngk.NbColor.RED
            && nbIvory === Lyngk.NbColor.IVORY
            && nbGreen === Lyngk.NbColor.GREEN
            && nbWhite === Lyngk.NbColor.WHITE)
            test = true;
    }
    assertEquals(true,test);
};

LyngkTestCase.prototype.testStory13 = function() {
    var engine = new Lyngk.Engine();

    var intersections = engine.getIntersections();
    var test;
    for(var i = 0 ; i < intersections.length ; i++){
        if(intersections[i].getHeight() === 1)
            test = true;
        else{
            test = false;
            break;
        }
    }

    assertTrue(test);
};

LyngkTestCase.prototype.testStory14 = function() {
    var engine = new Lyngk.Engine();

    var intersections = engine.getIntersections();
    var test;
    for(var i = 0 ; i < intersections.length ; i++){
        if(intersections[i].getColor() === intersections[i].getPieces()[intersections[i].getHeight() - 1]. getColor())
            test = true;
        else{
            test = false;
            break;
        }
    }
    assertTrue(test);
};

LyngkTestCase.prototype.testStory15 = function() {
    var engine = new Lyngk.Engine();

    var intersections = engine.getIntersections();
    var indexA3 = engine.getIndexIntersection("A3");
    var indexB3 = engine.getIndexIntersection("B3");

    var oldColorA = intersections[indexA3].getColor();
    var oldHeightB = intersections[indexB3].getHeight();
    engine.move("A3", "B3");
    assertTrue(intersections[indexA3].getActualState() === Lyngk.State.VACANT
        && intersections[indexB3].getColor() === oldColorA
        && intersections[indexB3].getHeight() === oldHeightB + 1);
};

LyngkTestCase.prototype.testStory16 = function() {
    var engine = new Lyngk.Engine();

    var intersections = engine.getIntersections();
    var indexB3 = engine.getIndexIntersection("B3");
    var indexB2 = engine.getIndexIntersection("B2");

    engine.move("A3", "B3");
    var oldColorB3 = intersections[indexB3].getColor();
    var oldHeightB2 = intersections[indexB2].getHeight();
    engine.move("B3", "B2");
    assertTrue(intersections[indexB3].getActualState() === Lyngk.State.VACANT
        && intersections[indexB2].getColor() === oldColorB3
        && intersections[indexB2].getHeight() === 3);

};

LyngkTestCase.prototype.testStory17 = function() {
    var engine = new Lyngk.Engine();
    var b2 = "B2";
    var b3 = "B3";
    engine.move(b3, b2);
    engine.move(b2, b3);

    var intersections = engine.getIntersections();
    assertTrue(intersections[engine.getIndexIntersection(b3)].getActualState() === Lyngk.State.VACANT)
};

LyngkTestCase.prototype.testStory18 = function() {
    var engine = new Lyngk.Engine();
    var c2 = "C2";
    var b3 = "B3";
    engine.move(c2, b3);

    var intersections = engine.getIntersections();
    assertTrue(intersections[engine.getIndexIntersection(b3)].getActualState() === Lyngk.State.ONE_PIECE
                && intersections[engine.getIndexIntersection(c2)].getActualState() === Lyngk.State.ONE_PIECE)
};

LyngkTestCase.prototype.testStory19 = function() {
    var engine = new Lyngk.Engine();
    engine.move("I7","H6");
    engine.move("H6","H5");
    var intersections = engine.getIntersections();
    var stateH5 = intersections[engine.getIndexIntersection("H5")].getActualState();
    engine.move("H5","H8");
    assertTrue(intersections[engine.getIndexIntersection("H5")].getActualState() === stateH5);
    engine.move("H5","F5");
    assertTrue(intersections[engine.getIndexIntersection("H5")].getActualState() === stateH5);
    engine.move("H5","F3");
    assertTrue(intersections[engine.getIndexIntersection("H5")].getActualState() === stateH5);
};

LyngkTestCase.prototype.testStory20 = function() {
    var engine = new Lyngk.Engine();
    var intersections = engine.getIntersections();
    engine.move("A3", "B3");
    engine.move("B3", "B2");
    engine.move("B2", "C2");
    engine.move("C2", "D2");
    engine.move("D2", "E2");
    assertTrue(intersections[engine.getIndexIntersection("E2")].getActualState() === Lyngk.State.ONE_PIECE);

};