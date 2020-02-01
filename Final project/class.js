class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;

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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.multiply > 11) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 1;
            var grass = new Grass(x, y);
            grassArr.push(grass);
            this.multyply = 0;

        }


    }

}
class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;

    }
    getCordinates() {

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
        this.getCordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }
    chooseCell1(character, character1) {
        this.getCordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character1) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }
    move() {
        this.getCordinates();
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
    }
    eat() {
        this.getCordinates();
        var newCell = random(this.chooseCell1(1, 4));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            if (matrix[y][x] == 1) {
                matrix[y][x] = 2;
                matrix[this.y][this.x] = 0;

                this.energy++;

                this.x = x;
                this.y = y;
                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }

                if (this.energy > 20) {
                    this.mul();
                }
            }
            else if (matrix[y][x] == 4) {
                matrix[y][x] = 0;
                for (var i in poisonArr) {
                    if (x == poisonArr[i].x && y == poisonArr[i].y) {
                        poisonArr.splice(i, 1);
                        break;
                    }
                }
                this.die();
            }



        }
        else {
            this.move();
        }


    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 2;
            var grass = new GrassEater(x, y);
            grassEaterArr.push(grass);
            this.energy = 8;
        }


    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}
class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.position = 0;

    }
    getCordinates() {

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
        this.getCordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }
    chooseCell1(character, character1) {
        this.getCordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character1) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }
    move() {
        this.getCordinates();
        var newCell = random(this.chooseCell1(0, 1));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            if (matrix[y][x] = 1) {
                matrix[y][x] = 3;
                matrix[this.y][this.x] = this.position;
                this.position = 1;
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
                matrix[this.y][this.x] = this.position;
                this.position = 0;

                this.x = x;
                this.y = y;
            }

        }
        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
    }
    eat() {
        this.getCordinates();
        var newCell = random(this.chooseCell(2));
        if (newCell) {
            this.energy += 2;
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

            if (this.energy > 20) {
                this.mul();
            }

        }
        else {
            this.move();
        }


    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 2;
            var gayl = new Predator(x, y);
            PredatorArr.push(gayl);
            this.energy = 15;
        }


    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in PredatorArr) {
            if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                PredatorArr.splice(i, 1);
                break;
            }
        }
    }
}
class PoisonGrass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;


    }
    getCordinates() {

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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.getCordinates();
        this.multiply++;
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if (newCell && this.multiply > 10) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 4;
            var grass = new PoisonGrass(x, y);
            poisonArr.push(grass);
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
class BlackHole {
    constructor(x, y) {
        this.x = x;
        this.y = y;

    }
    getCordinates() {

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
        this.getCordinates();
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

