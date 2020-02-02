var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class PoisonGrass extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
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
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if (newCell && this.multiply > 11) {
            grassHashiv++;
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 4;
            var Pgrass = new PoisonGrass(x, y);
            grassArr.push(Pgrass);
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.multyply = 0;
        }
    }


}