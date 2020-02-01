 function rMatrix(matrix,n,khot,khotaker,gishatich,tuyn,sev) {
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
           matrix[i][j] = 0; 

        }

    }
    for (let k = 0; k < khot; k++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        matrix[y][x] = 1;
        
    }
    for (let k = 0; k < khotaker; k++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        matrix[y][x] = 2;
        
    }
    for (let k = 0; k < gishatich; k++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        matrix[y][x] = 3;
        
    }
    for (let k = 0; k < tuyn; k++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        matrix[y][x] = 4;
        
    }
    for (let k = 0; k < sev; k++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        matrix[y][x] = 5;
        
    }
}
 
let matrix = [];
rMatrix(matrix,50,1000,100,50,10,1);
console.log(matrix);
let side = 20;
let grassArr = [];
let grassEaterArr = [];
let PredatorArr  =[];
let poisonArr =[];
let blackArr =[];

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    frameRate(10);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                var grass = new Grass(j, i);
                grassArr.push(grass);
            }
            else if (matrix[i][j] == 2) {
                var grassEat = new GrassEater(j, i);
                grassEaterArr.push(grassEat);
            }
            else if (matrix[i][j] == 3) {
                var gayl = new Predator (j, i);
                PredatorArr.push(gayl);
            }
            else if (matrix[i][j] == 4) {
                var tuyn = new PoisonGrass (j, i);
                poisonArr.push(tuyn);
            }
            else if (matrix[i][j] == 5) {
                var sev = new BlackHole (j, i);
                blackArr.push(sev);
            }

        }
    }
}
function draw() {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill('green');
                stroke(51);

            }
            else if (matrix[i][j] == 2) {
                fill('yellow');
                stroke(51);

            }
            else if (matrix[i][j] == 3) {
                fill('red');
                stroke(51);

            }
            else if (matrix[i][j] == 4) {
                fill('orange');
                stroke(51);

            }
            else if (matrix[i][j] == 5) {
                fill('black');
                stroke(51);

            }
            else {
                fill('gray');
                noStroke();

            }
            rect(j * side, i * side, side, side);



        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in PredatorArr) {
        PredatorArr[i].eat();
    }
    for (var i in poisonArr) {
        poisonArr[i].mul();
    }
     for (var i in blackArr) {
        blackArr[i].eat();
    } 

}

