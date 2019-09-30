let canvas = document.getElementById("canvas");
canvas.style.backgroundImage
// window.onload = function () {
//     startTimer();
// };

// let play = document.getElementById("play");

// play.addEventListener("click", startTimer);

const startTimer = () => {
    let noOfMinutes = 1;
    let duration = noOfMinutes * 60;
    let display = document.getElementById("timer");
    let timer = duration,
        minutes, seconds;
    let gameOver = document.getElementById("game-over");
    let time = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerText = minutes + " : " + seconds;

        if (--timer === -1) {
            canvas.style.display = "none";
            gameOver.style.display = "block";
            clearInterval(time);
        }
    }, 1000);
}

// let score = 0;

function checkBallAlgorithm() {
    let currentId = this.id;
    let row = Math.floor(currentId / 7);
    let column = currentId % 7 - 1;
    if (column < 0) {
        column = 6;
        row = row - 1;
    }
    let currentSelectedCandy = document.getElementById(this.id);
    console.log(currentSelectedCandy);

    let colorBalls = document.getElementsByClassName('ball');
    let colorMatrix = [];
    for (let i = 0; i < 7; i++) {
        let colorRow = [];
        for (let j = 0; j < 7; j++) {
            colorRow.push(colorBalls[i * 7 + j]);
        }
        colorMatrix.push(colorRow);
    }

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            console.log(colorMatrix[i][j].id === this.id);
        }
    }


    console.log(colorMatrix);
    let currentCandyClass = currentSelectedCandy.className;
    // colorMatrix.forEach(colorRow => {
    //     colorRow.forEach(candy => {
    //         if (candy.className === currentCandyClass) {
    //             candy.className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
    //             score += 1;
    //         }
    //     })
    // })

    // for (let i = 0; i < colorMatrix.length; i++) {
    //     for (let j = 0; j < colorMatrix[i].length; j++) {
        console.log(row, column);
        console.log(colorMatrix[row][column]);
        selectTheBalls(row, column, currentCandyClass, colorMatrix);
        }
    // }
    // console.log(score);

    let score = 0;

    function selectTheBalls(row, column, currentCandyClass, colorMatrix) {
        if (column < 0 || row < 0 || column > 6 || row > 6) {
            return;
        }
        let flag = 0;
        if (column < 6) {
            if (colorMatrix[row][column+1].className === currentCandyClass) {
                console.log('here');
                score++;
                flag = 1;
                // colorMatrix[row-1][column+1].className = "ball-fade";
                colorMatrix[row][column+1].className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
                
                selectTheBalls(row, column+1, currentCandyClass, colorMatrix);
            }
        }
        if (row < 6) {
            if (colorMatrix[row+1][column].className === currentCandyClass) {
                console.log('here');
                flag = 1;
                score++;
                colorMatrix[row+1][column].className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
                selectTheBalls(row+1, column, currentCandyClass, colorMatrix);
            }
        }
        if (column > 0) {
            if (colorMatrix[row][column-1].className === currentCandyClass) {
                console.log('here');
                flag = 1;
                score++;
                colorMatrix[row][column-1].className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
                selectTheBalls(row, column-1, currentCandyClass, colorMatrix);
            }
        }
        if (row > 0) {
            if (colorMatrix[row-1][column].className === currentCandyClass) {
                console.log('here');
                flag = 1;
                score++;
                colorMatrix[row-1][column].className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
                selectTheBalls(row-1, column, currentCandyClass, colorMatrix);
            }
        }
        if (row < 6 && column < 6) {
            if (colorMatrix[row+1][column+1].className === currentCandyClass) {
                console.log('here');
                flag = 1;
                score++;
                colorMatrix[row+1][column+1].className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
                selectTheBalls(row+1, column+1, currentCandyClass, colorMatrix);
            }
        }
        if (row > 0 && column < 6) {
            if (colorMatrix[row-1][column+1].className === currentCandyClass) {
                console.log('here');
                flag = 1;
                score++;
                colorMatrix[row-1][column+1].className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
                
                selectTheBalls(row-1, column+1, currentCandyClass, colorMatrix);
            }
        }
        if (row < 6 && column > 0) {
            if (colorMatrix[row+1][column-1].className === currentCandyClass) {
                console.log('here');
                flag = 1;
                score++;
                colorMatrix[row+1][column-1].className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
                selectTheBalls(row+1, column-1, currentCandyClass, colorMatrix);
            }
        }
        if (row > 0 && column > 0) {
            if (colorMatrix[row-1][column-1].className === currentCandyClass) {
                console.log('here');
                flag = 1;
                score++;
                colorMatrix[row-1][column-1].className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
                selectTheBalls(row-1, column-1, currentCandyClass, colorMatrix);
            }
        }
        if (flag === 1) {
            score++;
            colorMatrix[row][column].className =  "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
        } else {
            // score -= 10;
        }
        console.log(score);
        let finalScore = document.getElementById("final-score");
        finalScore.innerText = "Score: " + score;
    }
    
    // currentSelectedCandy.className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
// }

function getTheCandiesToChange() {
    for (let i = 0; i < colorMatrix.length; i++) {
        for (let j = 0; j < colorMatrix[i].length; j++) {
            if (colorMatrix[i][j].className === currentCandyClass) {
                colorMatrix[i][j].className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
                score += 1;
            }
        }
    }
}

let noOfBalls = 49;
let differentBallTypes = ["red-ball", "blue-ball", "green-ball", "yellow-ball", "purple-ball"];

window.onload = () => {
    generateCandies();
}



const generateCandies = () => {
    document.querySelectorAll('.ball').forEach(div => div.remove());

    for (let divGenerator = 0; divGenerator < noOfBalls; divGenerator++) {
        let div = document.createElement("div");
        div.className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
        div.id = divGenerator + 1;
        div.onclick = checkBallAlgorithm;
        canvas.appendChild(div);
    }
}


let calculateScope = () => {
    
}

let replay = document.getElementById('replay');
replay.addEventListener('click', generateCandies);