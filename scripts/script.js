let canvas=document.getElementById("canvas");
// window.onload = function () {
//     startTimer();
// };

// let play = document.getElementById("play");

// play.addEventListener("click", startTimer);

const startTimer = () => {
    let noOfMinutes = 1;
    let duration = noOfMinutes * 60;
    let display = document.getElementById("timer");
    let timer = duration, minutes, seconds;
    let gameOver = document.getElementById("game-over");
    let time=setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerText = minutes + " : " + seconds;

        if (--timer === -1) {
            canvas.style.display="none";
            gameOver.style.display = "block";
            clearInterval(time);
        }
    }, 1000);
}

let noOfBalls = 49;
let differentBallTypes = ["red-ball", "blue-ball", "green-ball", "yellow-ball", "purple-ball"];
for (let divGenerator = 0; divGenerator < noOfBalls; divGenerator++) {
    let div = document.createElement("div");
    div.className = "ball "  + differentBallTypes[Math.floor(Math.random() * 5)];
    canvas.appendChild(div); 
}


let finalScore = document.getElementById("final-score");
finalScore.innerText += "0";

