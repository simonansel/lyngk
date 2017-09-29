"use strict";

Lyngk.Coordinates = function (c, l) {
    const length = 9;
    this.is_valid = function () {
        var lyngk = new Array(length);
        lyngk[0] = new Array(["C"]);
        lyngk[1] = new Array(["B", "C", "D", "E"]);
        lyngk[2] = new Array(["A", "B", "C", "D", "E", "F", "G"]);
        lyngk[3] = new Array(["B", "C", "D", "E", "F", "G"]);
        lyngk[4] = new Array(["B", "C", "D", "E", "F", "G", "H"]);
        lyngk[5] = new Array(["C", "D", "E", "F", "G", "H"]);
        lyngk[6] = new Array(["C", "D", "E", "F", "G", "H", "I"]);
        lyngk[7] = new Array(["E", "F", "G", "H"]);
        lyngk[8] = new Array(["G"]);

        if (lyngk[l - 1].indexOf(c) != -1)
            return true;
        else
            return false;
    }

};
