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

    var intersections = engine.get_intersections();
    var indexA3 = engine.get_indexintersection("A3");
    var indexB3 = engine.get_indexintersection("B3");

    var oldColorA = intersections[indexA3].get_color();
    var oldHeightB = intersections[indexB3].get_height();
    engine.move("A3", "B3");

    assertTrue(intersections[indexA3].get_actualState() === Lyngk.State.VACANT
        && intersections[indexB3].get_color() === oldColorA
        && intersections[indexB3].get_height() === oldHeightB + 1);
};

LyngkTestCase.prototype.testStory16 = function() {
    var engine = new Lyngk.Engine();

    var intersections = engine.get_intersections();
    var indexB3 = engine.get_indexintersection("B3");
    var indexB2 = engine.get_indexintersection("B2");

    engine.move("A3", "B3");
    var oldColorB3 = intersections[indexB3].get_color();
    var oldHeightB2 = intersections[indexB2].get_height();
    engine.move("B3", "B2");
    assertTrue(intersections[indexB3].get_actualState() === Lyngk.State.VACANT
        && intersections[indexB2].get_color() === oldColorB3
        && intersections[indexB2].get_height() === oldHeightB2 + intersections[indexB3].get_height());

};

LyngkTestCase.prototype.testStory17 = function() {
    var engine = new Lyngk.Engine();
    var b2 = "B2";
    var b3 = "B3";
    engine.move(b3, b2);
    engine.move(b2, b3);

    var intersections = engine.get_intersections();
    assertTrue(intersections[engine.get_indexintersection(b3)].get_actualState() === Lyngk.State.VACANT)
};

LyngkTestCase.prototype.testStory18 = function() {
    var engine = new Lyngk.Engine();
    var c2 = "C2";
    var b3 = "B3";
    engine.move(c2, b3);

    var intersections = engine.get_intersections();
    console.log (intersections[engine.get_indexintersection(b3)].get_actualState());
    assertTrue(intersections[engine.get_indexintersection(b3)].get_actualState() === Lyngk.State.ONE_PIECE
                && intersections[engine.get_indexintersection(c2)].get_actualState() === Lyngk.State.ONE_PIECE)
};
