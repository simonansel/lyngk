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

    this.getActualState = function() {
        return actualState;
    };

    this.getColor = function(){
        return pieces[pieces.length-1].getColor();
    };

    this.getPieces = function(){
        return pieces;
    };

    this.setCoordinate = function(coo){
        coordinate = coo;
    };

    this.getCoordinate = function(){
        return coordinate;
    };

    this.getHeight = function(){
        return pieces.length;
    };

    this.pose = function (piece) {
        if(actualState !== Lyngk.State.FULL_STACK) {
            pieces.push(piece);
            if(pieces.length >= 3){
                actualState = pieces.length - Math.floor(pieces.length / 2);
            }else{
                actualState = pieces.length;
            }
        }
    };

    this.retire = function(intersection){
        actualState = Lyngk.State.VACANT;
        for(var i = 0 ; i < pieces.length ; i++ ) {
            intersection.pose(pieces[i]);
        }
        while(pieces.length > 0) {
            pieces.pop();
        }
    };


};
