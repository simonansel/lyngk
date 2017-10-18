"use strict";
//ivoire, bleu, rouge, noir et vert.

Lyngk.Piece = function () {
    var color;

    this.set_color = function(c){
        color = c;
    };

    this.get_color = function () {
        return color;
    };


};
