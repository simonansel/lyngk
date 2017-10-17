"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var actualState;
    var color;

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
        actualState = Lyngk.State.ONE_PIECE;
        color = piece.get_color();
    };


};
