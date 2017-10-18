"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var intersections = new Array();

    this.init = function(){
        var letters = ["A", "B", "C", "D", "E", "F", "G","H", "I"];
        for(var i = 0 ; i < 9 ; i++) {
            for (var j = 1; j <= 9; j++) {
                var coordinate = new Lyngk.Coordinates(letters[i], j);
                if (coordinate.is_valid()) {
                    var intersection = new Lyngk.Intersection();
                    intersection.set_coordinate(coordinate);;
                    intersection.pose(new Lyngk.Piece());
                    intersections.push(intersection);
                }
            }
        }
    };

    this.init();

    this.get_intersections = function(){
        return intersections;
    }
}
