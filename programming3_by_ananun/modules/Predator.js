var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Predator extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy = 20;
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
    chooseCell1(character, character1) {
        this.getNewCoordinates();
        return super.chooseCell1(character, character1);
    }
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 2;
            let predator = new Predator(x, y);
            PredatorArr.push(predator);
            this.energy = 15;
        }
    }
    eat() {
        this.getNewCoordinates();
        let emptyCells = this.chooseCell(2);
        let newCell = random(emptyCells);

        if (newCell) {
            this.energy += 3;
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            for (var i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy > 29) {
                this.mul();
            }

        }
        else {
            this.move();
        }

    }
    move() {
        this.energy--;
        let emptyCells = this.chooseCell1(0,1);
        let newCell = random(emptyCells);

        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            if (matrix[y][x] = 1) {
                matrix[y][x] = 3;
                matrix[this.y][this.x] = 0;
                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }

                this.x = x;
                this.y = y;
            }
            else if (matrix[y][x] = 0) {
                matrix[y][x] = 3;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
            }

        }
        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in PredatorArr) {
            if (PredatorArr[i].x == this.x && PredatorArr[i].y == this.y) {
                PredatorArr.splice(i, 1)
                break;
            }
        }
    }
}