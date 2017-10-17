"use strict";
//ivoire, bleu, rouge, noir et vert.
Lyngk.Colors = {IVOIRE : 0 , BLEU : 1 , ROUGE : 2 , NOIR : 3 , VERT : 4};

Lyngk.Piece = function () {
    var color;

    this.set_color = function(c){
        color = c;
    };

    this.get_color = function () {
        return color;
    };


};
