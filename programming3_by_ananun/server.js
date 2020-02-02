
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var PoisonGrass = require("./modules/PoisonGrass.js");
var BlackHole = require("./modules/BlackHole.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
PredatorArr = [];
poisonArr = [];
blackArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
PredatorHashiv = 0;
poisonHashiv = 0;
blackHashiv = 0;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
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
rMatrix(matrix,50,1000,100,50,10,1);
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



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            } else if (matrix[y][x] == 3) {
                var grass = new Predator(x, y);
                PredatorArr.push(grass);
                PredatorHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var grass = new PoisonGrass(x, y);
                poisonArr.push(grass);
                poisonHashiv++;
            }else if (matrix[y][x] == 5) {
                var grass = new BlackHole(x, y);
                blackArr.push(grass);
                blackHashiv++;
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

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: PredatorHashiv,
        poisonCounter: poisonHashiv,
        blackCounter: blackHashiv
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 200)