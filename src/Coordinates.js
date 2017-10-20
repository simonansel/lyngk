"use strict";

Lyngk.Coordinates = function (c, l) {

    this.is_valid = function () {
        var lyngk = [];
        lyngk[0] = ["C"];
        lyngk[1] = ["B", "C", "D", "E"];
        lyngk[2] = ["A", "B", "C", "D", "E", "F", "G"];
        lyngk[3] = ["B", "C", "D", "E", "F", "G"];
        lyngk[4] = ["B", "C", "D", "E", "F", "G", "H"];
        lyngk[5] = ["C", "D", "E", "F", "G", "H"];
        lyngk[6] = ["C", "D", "E", "F", "G", "H", "I"];
        lyngk[7] = ["E", "F", "G", "H"];
        lyngk[8] = ["G"];

        return lyngk[l - 1].indexOf(c) !== -1;
    }

    this.get_letter = function(){
        return c;
    }

    this.get_number = function(){
        return l;
    }

    this.clone = function(){
        return new Lyngk.Coordinates(this.get_letter(), this.get_number());
    }

    this.hash = function(){
        var letters = ["A", "B", "C", "D", "E", "F", "G","H", "I"];
        if(this.is_valid()){
            var resultString = (letters.indexOf(this.get_letter())+1).toString()+this.get_number().toString();
            return parseInt(resultString);
        }
        return 0;
    };

    this.toString = function(){
        if(this.is_valid())
            return c + l;
        else
            return "invalid";
    };
};
