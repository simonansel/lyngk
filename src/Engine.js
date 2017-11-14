"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var intersections = [];
    this.init = function(){
        for (var i = 0 ; i < 9 ; i++) {
            this.createBoard(i);
        }
    };

    this.createBoard = function(i){
        var letters = ["A", "B", "C", "D", "E", "F", "G","H", "I"];
        for (var j = 1; j <= 9; j++) {
            var coordinate = new Lyngk.Coordinates(letters[i], j);
            if (coordinate.isValid()) {
                var intersection = new Lyngk.Intersection();
                intersection.setCoordinate(coordinate);
                var piece = new Lyngk.Piece();
                piece.addColorInit(intersections);
                intersection.pose(piece);
                intersections.push(intersection);
            }
        }
    };

    this.init();

    this.getIntersections = function(){
        return intersections;
    };

    this.getIndexIntersection = function(coo){
        for(var i = 0 ; i < intersections.length ; i++){
            if(intersections[i].getCoordinate().toString() === coo)
                return i;
        }
    };

    this.move = function(coo1 , coo2){
        var intersectionCoo1 = intersections[this.getIndexIntersection(coo1)];
        var intersectionCoo2 = intersections[this.getIndexIntersection(coo2)];
        if(intersectionCoo2.getActualState() !== Lyngk.State.VACANT &&
            this.moveValid(coo1,coo2) &&
            intersectionCoo1.getActualState() !== Lyngk.State.FULL_STACK)
        {
            intersectionCoo1.retire(intersectionCoo2);
        }
    };

    this.moveValid = function(coo1,coo2){
        var difference = this.difference(coo1,coo2);
        return this.moveColumn(difference) ||
            this.moveRow(difference) ||
            this.moveDiagonal(difference);
    };
    this.moveColumn = function (difference) {
        return (Math.abs(difference[0]) === 1 && difference[1] === 0);
    };
    this.moveRow = function (difference) {
        return (difference[0] === 0 && Math.abs(difference[1]) === 1);
    };
    this.moveDiagonal = function(difference) {
        return (difference[0] === 1 && difference[1] === 1) ||
            (difference[0] === -1 && difference[1] === -1);
    };

    this.difference = function(coo1,coo2){
        var letters = ["A", "B", "C", "D", "E", "F", "G","H", "I"];
        var diffLetters = letters.indexOf(coo1[0])-letters.indexOf(coo2[0]);
        var diffNumbers = parseInt(coo1[1])-parseInt(coo2[1]);
        return [diffLetters, diffNumbers];
    };
};
