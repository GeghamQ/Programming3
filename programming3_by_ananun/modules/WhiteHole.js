var Grass = require("./Grass.js");
var GrassEater = require("./GrassEater.js");
var Predator = require("./Predator.js");
var PoisonGrass = require("./PoisonGrass.js");
var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class WhiteHole extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multyply = 0;
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
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        this.getNewCoordinates();
        var x = Math.floor(random(matrix[0].length));
        var y = Math.floor(random(matrix.length));

        matrix[y][x] = 6;

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
    mul() {
        this.getNewCoordinates();

        var r = random(4);
        for (var i = 0; i < r; i++) {
            var emptyCells = this.chooseCell(0);
            var newCell = random(emptyCells);
            var index = random(4);

            if (newCell) {
                let x = newCell[0];
                let y = newCell[1];

                if (index == 0) {
                    grassHashiv++;
                    matrix[y][x] = 1;

                    var grass = new Grass(x, y);
                    grassArr.push(grass);
                }
                else if (index == 1) {
                    grassEaterHashiv++;
                    matrix[y][x] = 2;

                    var grassEat = new GrassEater(x, y);
                    grassEaterArr.push(grassEat);
                }
                else if (index == 2) {
                    PredatorHashiv++;
                    matrix[y][x] = 3;

                    var pred = new Predator(x, y);
                    PredatorArr.push(pred);
                }
                else if (index == 3) {
                    poisonHashiv++;
                    matrix[y][x] = 4;

                    var poison = new PoisonGrass(x, y);
                    poisonArr.push(poison);
                }
            }

        }
        this.move();
    }
}