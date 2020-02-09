var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class PoisonGrass extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
        this.energy = 25;
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
    mul() {
        this.getNewCoordinates();
        this.multiply++;
        this.energy--;
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);

        if (newCell && this.multiply > 11) {
            poisonHashiv++;
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 4;
            var Pgrass = new PoisonGrass(x, y);
            poisonArr.push(Pgrass);
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.multyply = 0;
        }
        if (this.energy <= 0) {
            this.die();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in poisonArr) {
            if (poisonArr[i].x == this.x && poisonArr[i].y == this.y) {
                poisonArr.splice(i, 1);
                break;
            }
        }
    }


}