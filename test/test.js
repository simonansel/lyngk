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
    assertEquals(Lyngk.State.VACANT, intersection.get_actualState());
};

LyngkTestCase.prototype.testStory8 = function(){
    var piece = new Lyngk.Piece();
    piece.set_color(Lyngk.Color.BLUE);
    var intersection = new Lyngk.Intersection();
    intersection.pose(piece);
    assertEquals(Lyngk.State.ONE_PIECE, intersection.get_actualState());
    assertEquals(Lyngk.Color.BLUE , intersection.get_color());
};

LyngkTestCase.prototype.testStory9 = function() {
    var firstPiece = new Lyngk.Piece();
    firstPiece.set_color(Lyngk.Color.BLUE);
    var secondPiece = new Lyngk.Piece();
    secondPiece.set_color(Lyngk.Color.RED);
    var intersection = new Lyngk.Intersection();
    intersection.pose(firstPiece);
    intersection.pose(secondPiece);

    assertEquals(Lyngk.State.STACK, intersection.get_actualState());
    assertEquals(Lyngk.Color.RED , intersection.get_color());
};

LyngkTestCase.prototype.testStory10 = function() {
    var piece = new Lyngk.Piece();
    piece.set_color(Lyngk.Color.BLUE);
    var intersection = new Lyngk.Intersection();
    for(var i = 0 ; i < 5 ; i++){
        intersection.pose(piece);
    }

    assertEquals(Lyngk.State.FULL_STACK, intersection.get_actualState());
};

LyngkTestCase.prototype.testStory11 = function() {
    var engine = new Lyngk.Engine();
    var intersections = engine.get_intersections();
    var test;
    for(var i = 0 ; i < intersections.length ; i++){
        if(intersections[i].get_actualState() === Lyngk.State.ONE_PIECE && intersections[i].get_pieces().length === 1)
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

    var intersections = engine.get_intersections();
    for(var i = 0 ; i < intersections.length ; i++){
        if(intersections[i].get_color() === Lyngk.Color.BLACK)
            nbBlack++;
        if(intersections[i].get_color() === Lyngk.Color.BLUE)
            nbBlue++;
        if(intersections[i].get_color() === Lyngk.Color.RED)
            nbRed++;
        if(intersections[i].get_color() === Lyngk.Color.IVORY)
            nbIvory++;
        if(intersections[i].get_color() === Lyngk.Color.GREEN)
            nbGreen++;
        if(intersections[i].get_color() === Lyngk.Color.WHITE)
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

    var intersections = engine.get_intersections();
    var test;
    for(var i = 0 ; i < intersections.length ; i++){
        if(intersections[i].get_height() === 1)
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

    var intersections = engine.get_intersections();
    var test;
    for(var i = 0 ; i < intersections.length ; i++){
        if(intersections[i].get_color() === intersections[i].get_pieces()[intersections[i].get_height() - 1]. get_color())
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
    engine.move("A3", "B3");

    var oldColorA = engine.get_intersection("A3").get_color();
    var oldHeightB = engine.get_intersection("B3").get_height();
    assertTrue(engine.get_intersection("A3").get_actualState() === Lyngk.State.VACANT
        && engine.get_intersection("B3").get_color() === oldColorA
        && engine.get_intersection("B3").get_height() === oldHeightB + 1);
};