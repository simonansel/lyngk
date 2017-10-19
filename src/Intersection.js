"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var coordinate;
    var actualState;
    var color;
    var pieces = [];

    this.init = function() {
        actualState = Lyngk.State.VACANT;
    };

    this.init();

    this.get_actualState = function() {
        return actualState;
    };

    this.set_actualState = function(state){
        actualState = state;
    };

    this.get_color = function(){
        return color;
    };

    this.get_pieces = function(){
        return pieces;
    };

    this.get_coordinate = function(){
        return coordinate;
    };

    this.set_coordinate = function(coo){
        coordinate = coo;
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
            color = piece.get_color();
        }
    };


};
