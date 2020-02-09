
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var PoisonGrass = require("./modules/PoisonGrass.js");
var BlackHole = require("./modules/BlackHole.js");
var WhiteHole = require("./modules/WhiteHole.js");
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
PredatorArr = [];
poisonArr = [];
blackArr = [];
whiteArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
PredatorHashiv = 0;
poisonHashiv = 0;
blackHashiv = 0;
whiteHashiv = 0;
weather = "summer";
weatherCount = 0;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function rMatrix(matrix, n, khot, khotaker, gishatich, tuyn, sev, spitak) {
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
    for (let k = 0; k < spitak; k++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        matrix[y][x] = 6;

    }
}
rMatrix(matrix, 50, 500, 50, 10, 9, 1, 1);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END

//Add event
function click(evt) {
    console.log(evt.pageX, evt.pageY);
}

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            } else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y);
                PredatorArr.push(pred);
                PredatorHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var poison = new PoisonGrass(x, y);
                poisonArr.push(poison);
                poisonHashiv++;
            } else if (matrix[y][x] == 5) {
                var black = new BlackHole(x, y);
                blackArr.push(black);
                blackHashiv++;
            } else if (matrix[y][x] == 6) {
                var grass = new WhiteHole(x, y);
                whiteArr.push(grass);
                whiteHashiv++;
                
            }

        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (PredatorArr[0] !== undefined) {
        for (var i in PredatorArr) {
            PredatorArr[i].eat();
        }
    }
    if (poisonArr[0] !== undefined) {
        for (var i in poisonArr) {
            poisonArr[i].mul();
        }
    }
    if (blackArr[0] !== undefined) {
        for (var i in blackArr) {
            blackArr[i].eat();
        }
    }
    if (whiteArr[0] !== undefined) {
        for (var i in whiteArr) {
            whiteArr[i].mul();
        }
    }
    // Weather
    weatherCount++;
    if (weatherCount >= 0 && weatherCount <= 15) {
        weather = "summer"
    }
    else if (weatherCount > 15 && weatherCount <= 25) {
        weather = "autumn"
    }
    else if (weatherCount > 25 && weatherCount <= 40) {
        weather = "winter"
    }
    else if (weatherCount > 40 && weatherCount <= 50) {
        weather = "spring"
    }
    else{
        weatherCount = 0;
    }


    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: PredatorHashiv,
        poisonCounter: poisonHashiv,
        blackCounter: blackHashiv,
        whiteCounter: whiteHashiv,

        grassN: grassArr.length,
        grassEaterN: grassEaterArr.length,
        predatorN: PredatorArr.length,
        poisonN: poisonArr.length,
        blackN: blackArr.length,
        whiteN: whiteArr.length,

        weather: weather,
        
    }

   

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 800);