"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var coordinate;
    var actualState;
    var pieces = [];

    this.init = function() {
        actualState = Lyngk.State.VACANT;
    };

    this.init();

    this.get_actualState = function() {
        return actualState;
    };


    this.get_color = function(){
        return pieces[pieces.length-1].get_color();
    };

    this.get_pieces = function(){
        return pieces;
    };

    this.set_coordinate = function(coo){
        coordinate = coo;
    };

    this.get_coordinate = function(){
        return coordinate;
    };

    this.get_height = function(){
        return pieces.length;
    };

    this.pose = function (piece) {
        if(actualState !== Lyngk.State.FULL_STACK){
            if(actualState === Lyngk.State.VACANT){
                actualState = Lyngk.State.ONE_PIECE;
                pieces.push(piece);
            }
            else{
                actualState = Lyngk.State.STACK;
                pieces.push(piece);
                if(pieces.length === 5){
                    actualState = Lyngk.State.FULL_STACK;
                }
            }
        }
    };

    this.retire = function(intersection){
        actualState = Lyngk.State.VACANT;
        intersection.pose(pieces[pieces.length-1]);
        pieces.pop();
    };


};
