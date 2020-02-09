
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 10;

    var matrix = [];

    //! Getting DOM objects (HTML elements
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let poisonCountElement = document.getElementById('poisonCount');
    let blackCountElement = document.getElementById('blackCount');
    let whiteCountElement = document.getElementById('whiteCount');

    let grassN = document.getElementById('grassN');
    let grassEaterN = document.getElementById('grassEaterN');
    let predatorN = document.getElementById('predatorN');
    let poisonN = document.getElementById('poisonN');
    let blackN = document.getElementById('blackN');
    let whiteN = document.getElementById('whiteN');

    let weatherInfo = document.getElementById('weather');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        poisonCountElement.innerText = data.poisonCounter;
        blackCountElement.innerText = data.blackCounter;
        whiteCountElement.innerText = data.whiteCounter;

        grassN.innerText = data.grassN;
        grassEaterN.innerText = data.grassEaterN;
        predatorN.innerText = data.predatorN;
        poisonN.innerText = data.poisonN;
        blackN.innerText = data.blackN;
        whiteN.innerText = data.whiteN;

        weatherInfo.innerText = data.weather;

        weather = data.weather;


        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side);
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                rect(j * side, i * side, side, side);
                if (matrix[i][j] == 1) {
                    if (weather == "summer") {
                        fill("green");
                    }
                    else if (weather == "autumn") {
                        fill("#4D8000");
                    }
                    else if (weather == "winter") {
                        fill("#41C141");
                    }
                    else if (weather == "spring") {
                        fill("#003E14");
                    }
                } else if (matrix[i][j] == 2) {
                    if (weather == "summer") {
                        fill("yellow");
                    }
                    else if (weather == "autumn") {
                        fill("#BEC900");
                    }
                    else if (weather == "winter") {
                        fill("#DB8E00");
                    }
                    else if (weather == "spring") {
                        fill("#A3A300");
                    }
                } else if (matrix[i][j] == 0) {
                    noStroke();
                    fill('#acacac')
                } else if (matrix[i][j] == 3) {
                    if (weather == "summer") {
                        fill("red");
                    }
                    else if (weather == "autumn") {
                        fill("#A9001E");
                    }
                    else if (weather == "winter") {
                        fill("#FF3B3B");
                    }
                    else if (weather == "spring") {
                        fill("#800000");
                    }
                } else if (matrix[i][j] == 4) {
                    if (weather == "summer") {
                        fill("orange");
                    }
                    else if (weather == "autumn") {
                        fill("#FF5600");
                    }
                    else if (weather == "winter") {
                        fill("#FFBF47");
                    }
                    else if (weather == "spring") {
                        fill("#C07100");
                    }
                } else if (matrix[i][j] == 5) {
                    if (weather == "summer") {
                        fill("black");
                    }
                    else if (weather == "autumn") {
                        fill("#212121");
                    }
                    else if (weather == "winter") {
                        fill("#6B6B6B");
                    }
                    else if (weather == "spring") {
                        fill("#212121");
                    }
                } else if (matrix[i][j] == 6) {
                    if (weather == "summer") {
                        fill("white");
                    }
                    else if (weather == "autumn") {
                        fill("white");
                    }
                    else if (weather == "winter") {
                        fill("white");
                    }
                    else if (weather == "spring") {
                        fill("white");
                    }
                }
            }
        }
    }

}