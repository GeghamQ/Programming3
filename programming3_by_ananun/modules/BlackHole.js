var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class BlackHole extends LiveForm {
    constructor(x, y) {
        super(x, y);
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    move() {
        var x = Math.floor(random(matrix[0].length));
        var y = Math.floor(random(matrix.length));

        matrix[y][x] = 5;

        matrix[this.y][this.x] = 0;

        for (var i in grassArr) {
            if (x == grassArr[i].x && y == grassArr[i].y) {
                grassArr.splice(i, 1);
                break;
            }
        }
        for (var i in grassEaterArr) {
            if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
        for (var i in PredatorArr) {
            if (x == PredatorArr[i].x && y == PredatorArr[i].y) {
                PredatorArr.splice(i, 1);
                break;
            }
        }
        for (var i in poisonArr) {
            if (x == poisonArr[i].x && y == poisonArr[i].y) {
                poisonArr.splice(i, 1);
                break;
            }
        }

        this.x = x;
        this.y = y;


    }
    eat() {
        this.getNewCoordinates();
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                matrix[y][x] = 0;

                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                for (var i in grassEaterArr) {
                    if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
                for (var i in PredatorArr) {
                    if (x == PredatorArr[i].x && y == PredatorArr[i].y) {
                        PredatorArr.splice(i, 1);
                        break;
                    }
                }
                for (var i in poisonArr) {
                    if (x == poisonArr[i].x && y == poisonArr[i].y) {
                        poisonArr.splice(i, 1);
                        break;
                    }
                }
            }
        }
        this.move();
    }
}