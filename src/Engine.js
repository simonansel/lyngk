"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var intersections = [];

    this.init = function(){
        var letters = ["A", "B", "C", "D", "E", "F", "G","H", "I"];
        for(var i = 0 ; i < 9 ; i++) {
            for (var j = 1; j <= 9; j++) {
                var coordinate = new Lyngk.Coordinates(letters[i], j);
                if (coordinate.is_valid()) {
                    var intersection = new Lyngk.Intersection();
                    intersection.set_coordinate(coordinate);
                    var piece = new Lyngk.Piece();
                    piece.addColorInit(intersections);
                    intersection.pose(piece);
                    intersections.push(intersection);
                }
            }
        }
    };

    this.init();

    this.get_intersections = function(){
        return intersections;
    };

    this.get_indexintersection = function(coo){
        for(var i = 0 ; i < intersections.length ; i++){
            if(intersections[i].get_coordinate().toString() === coo)
                return i;
        }
    };

    this.move = function(coo1 , coo2){
        var letters = ["A", "B", "C", "D", "E", "F", "G","H", "I"];
        var letterCoo1 = coo1[0];
        var numberCoo1 = coo1[1];
        var letterCoo2 = coo2[0];
        var numberCoo2 = coo2[1];
        var diffLetters = letters.indexOf(letterCoo1)-letters.indexOf(letterCoo2);
        var diffNumbers = parseInt(numberCoo1)-parseInt(numberCoo2);
        if(intersections[this.get_indexintersection(coo2)].get_actualState() !== Lyngk.State.VACANT
            && ((Math.abs(diffLetters) === 1 && Math.abs(diffNumbers) === 0)
                || (Math.abs(diffLetters) === 0 && Math.abs(diffNumbers) === 1)
                || diffLetters === 1 && diffNumbers ===1))
            intersections[this.get_indexintersection(coo1)].retire(intersections[this.get_indexintersection(coo2)]);
    };
};
