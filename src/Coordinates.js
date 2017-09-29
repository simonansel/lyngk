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

};
