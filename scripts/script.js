let canvas=document.getElementById("canvas");
function startTimer() {
    let noOfMinutes = 1;
    let duration = noOfMinutes * 60;
    let display = document.getElementById("timer");
    let timer = duration, minutes, seconds;
    let time=setInterval(function () {
        console.log(timer);
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerText = minutes + ":" + seconds;

        if (--timer === -1) {
            canvas.style.display="none";
            clearInterval(time);
        }
    }, 1000);
}
window.onload = function () {
    startTimer();
};

let noOfBalls = 49;
let differentBallTypes = ["red-ball", "blue-ball", "green-ball", "yellow-ball", "purple-ball"];
for (let divGenerator = 0; divGenerator < noOfBalls; divGenerator++) {
    let div = document.createElement("div");
    div.className = "ball "  + differentBallTypes[Math.floor(Math.random() * 5)];
    canvas.appendChild(div); 
}
