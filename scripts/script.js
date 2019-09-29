let canvas = document.getElementById("canvas");
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

let score = 0;

function checkBallAlgorithm() {
    let currentId = document.getElementById(this.id);
    console.log(currentId);

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
    let currentCandyClass = currentId.className;
    colorMatrix.forEach(colorRow => {
        colorRow.forEach(candy => {
            if (candy.className === currentCandyClass) {
                candy.className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
                score += 1;
            }
        })
    })
    console.log(score);
    // currentId.className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
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

let replay = document.getElementById('replay');
replay.addEventListener('click', generateCandies);


let finalScore = document.getElementById("final-score");
finalScore.innerText += '0';