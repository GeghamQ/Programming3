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
        for (let i = 0; i < r; i++) {
            let emptyCells = this.chooseCell(0);
            let newCell = random(emptyCells);

            if (newCell) {
                let x = newCell[0];
                let y = newCell[1];

                var objects = [new Grass(x, y), new GrassEater(x, y), new Predator(x, y), new PoisonGrass(x, y),];
                var arrs = [grassArr, grassEaterArr, PredatorArr, poisonArr,];

                var index = random(3);
                
                
                matrix[y][x] = index += 1;
                let animal = objects[index];
                console.log(index + " " + arrs[index]);
                arrs[index].push(animal);
            }

        }
        this.move();
    }
}