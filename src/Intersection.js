"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var actualState;
    var color;
    var nbPiece;

    this.init = function() {
        actualState = Lyngk.State.VACANT;
    };

    this.init();

    this.get_actualState = function() {
        return actualState;
    };

    this.get_color = function(){
        return color;
    }

    this.pose = function (piece) {
        if(actualState != Lyngk.State.FULL_STACK){
            if(actualState == Lyngk.State.VACANT){
                actualState = Lyngk.State.ONE_PIECE;
                nbPiece = 1;
            }
            else{
                actualState = Lyngk.State.STACK;
                nbPiece++;
                if(nbPiece == 5){
                    actualState = Lyngk.State.FULL_STACK;
                }
            }
            color = piece.get_color();
        }
    };


};
