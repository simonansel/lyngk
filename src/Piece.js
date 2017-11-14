"use strict";
Lyngk.NbColor = {BLACK: 8, IVORY: 8, BLUE: 8, RED: 8, GREEN: 8, WHITE: 3};

Lyngk.Piece = function () {
    var color;

    this.setColor = function(c){
        color = c;
    };

    this.getColor = function () {
        return color;
    };

    this.addColorInit = function(intersections){
        var nbColors = this.countColorAlreadyExist(intersections);
        var nbColorsAuthorize = [8,8,8,8,8,3];
        var test = false;
        while(!test){
            var colorAlea = Math.floor(Math.random() * (5+1));
            if(nbColors[colorAlea] < nbColorsAuthorize[colorAlea]) {
                this.setColor(colorAlea);
                test = true;
            }
        }
    };

    this.countColorAlreadyExist = function(intersections) {
        var nbColors = [0,0,0,0,0,0];
        for (var i = 0 ; i < intersections.length ; i++) {
            nbColors[intersections[i].getColor()]++;
        }
        return nbColors;
    };

};