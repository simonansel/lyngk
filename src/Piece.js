"use strict";
Lyngk.NbColor = {BLACK: 8, IVORY: 8, BLUE: 8, RED: 8, GREEN: 8, WHITE: 3};

Lyngk.Piece = function () {
    var color;

    this.set_color = function(c){
        color = c;
    };

    this.get_color = function () {
        return color;
    };

    this.addColorInit = function(intersections){
        var nbBlack = 0;
        var nbBlue = 0;
        var nbRed = 0;
        var nbIvory= 0;
        var nbGreen = 0;
        var nbWhite = 0;
        for (var i = 0 ; i < intersections.length ; i++) {
            if (intersections[i].get_color() === Lyngk.Color.BLACK)
                nbBlack++;
            if (intersections[i].get_color() === Lyngk.Color.BLUE)
                nbBlue++;
            if (intersections[i].get_color() === Lyngk.Color.RED)
                nbRed++;
            if (intersections[i].get_color() === Lyngk.Color.IVORY)
                nbIvory++;
            if (intersections[i].get_color() === Lyngk.Color.GREEN)
                nbGreen++;
            if (intersections[i].get_color() === Lyngk.Color.WHITE)
                nbWhite++;
        }

        var test = false;
        while(!test){
            var colorAlea = Math.floor(Math.random() * (5+1));
            if(colorAlea === Lyngk.Color.BLACK && nbBlack < Lyngk.NbColor.BLACK) {
                this.set_color(Lyngk.Color.BLACK);
                test = true;
            }
            if(colorAlea === Lyngk.Color.BLUE && nbBlue < Lyngk.NbColor.BLUE) {
                this.set_color(Lyngk.Color.BLUE);
                test = true;
            }
            if(colorAlea === Lyngk.Color.RED && nbRed < Lyngk.NbColor.RED) {
                this.set_color(Lyngk.Color.RED);
                test = true;
            }
            if(colorAlea === Lyngk.Color.IVORY && nbIvory < Lyngk.NbColor.IVORY) {
                this.set_color(Lyngk.Color.IVORY);
                test = true;
            }
            if(colorAlea === Lyngk.Color.GREEN && nbGreen < Lyngk.NbColor.GREEN) {
                this.set_color(Lyngk.Color.GREEN);
                test = true;
            }
            if(colorAlea === Lyngk.Color.WHITE && nbWhite < Lyngk.NbColor.WHITE) {
                this.set_color(Lyngk.Color.WHITE);
                test = true;
            }
        }



    };


};