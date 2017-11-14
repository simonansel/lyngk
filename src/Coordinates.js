"use strict";
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

Lyngk.Coordinates = function (c, l) {

    this.isValid = function () {
        return lyngk[l - 1].indexOf(c) !== -1;
    };

    this.getLetter = function () {
        return c;
    };

    this.getNumber = function () {
        return l;
    };

    this.clone = function () {
        return new Lyngk.Coordinates(this.getLetter(), this.getNumber());
    };

    this.hash = function () {
        var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
        if (this.isValid()) {
            var res = (letters.indexOf(this.getLetter()) + 1).toString() +
                this.getNumber();
            return parseInt(res);
        }
        return 0;
    };

    this.toString = function () {
        return this.isValid() ? c + l : "invalid";
    };
};
