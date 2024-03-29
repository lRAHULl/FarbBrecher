let canvas = document.getElementById("canvas");
let gameOver = document.getElementById("game-over");
let body = document.querySelector("body");
let popsound = new Audio();
popsound.src = "./resources/music/pop.mp3";
bsound = new Audio();
bsound.src = "./107.mp3";
// canvas.style.backgroundImage
// window.onload = function () {
//     startTimer();
// };

// let play = document.getElementById("play");
// play.addEventListener("click", () => {
//     startTimer(1);
// });
let user;
// window.onload = () => {
//     user=prompt("Enter your name");
// }
window.onload = () => {
    generateCandies();
    //   user = prompt("Enter your name");
    createScoreCard();
};

let time = null;
const startTimer = noOfMinutes => {
    if (time != null) {
        window.clearTimeout(time);
        time = null;
    }
    // let noOfMinutes = 1;
    document.getElementById("tutorial").style.display = "none";
    let duration = noOfMinutes * 60;
    let display = document.getElementById("timer");
    let timer = duration,
        minutes,
        seconds;

    time = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerText = minutes + " : " + seconds;

        if (--timer === -1) {
            let getDisplayBlock = document.querySelector("#immediateScore");
            if (getDisplayBlock != null) {
                getDisplayBlock.remove();
            }
            document.querySelector('body').className = "preview-covers";
            setInterval(() => {
                document.querySelector('body').className = "";
            }, 2500)
            document.getElementById("message").innerText = "Game Over";
            document.getElementById("final-score").innerText =
                "Final Score: " + Math.floor(score / 2);
            localStorage.setItem(user, Math.floor(score / 2));

            canvas.style.display = "none";
            gameOver.style.display = "block";
            window.clearTimeout(time);
            time = null;
            bsound.pause();
            play.style.display = 'block';
            pause.style.display = 'none';
        }
        if (timer < 5) {
            display.style.color = "red";
        } else {
            display.style.color = "lightgray";
        }
    }, 1000);
};

const pauseTimer = () => {
    clearInterval(time);
    delete time;
};

// let score = 0;

function checkBallAlgorithm() {
    document.getElementById("tutorial").style.display = "none";
    let previousScore = score;
    let differenceInScore = 0;

    let currentId = this.id;
    let row = Math.floor(currentId / 7);
    let column = (currentId % 7) - 1;
    if (column < 0) {
        column = 6;
        row = row - 1;
    }
    let currentSelectedCandy = document.getElementById(this.id);
    console.log(currentSelectedCandy);

    let colorBalls = document.getElementsByClassName("ball");
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
    let playFlag = document.getElementById("play").style.display;
    if (playFlag === "none")
        selectTheBalls(row, column, currentCandyClass, colorMatrix);
    differenceInScore = Math.floor(score / 2) - Math.floor(previousScore / 2);
    displayCombo(differenceInScore);

    document.getElementsByClassName("ball").style = "transition-duration: 0";
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
        if (colorMatrix[row][column + 1].className === currentCandyClass) {
            popsound.play();
            score++;
            flag = 1;
            // colorMatrix[row][column+1].className = "ball ball-fade";
            colorMatrix[row][column + 1].style = "transition-duration: 0.7s";
            colorMatrix[row][column + 1].className =
                "ball " + differentBallTypes[Math.floor(Math.random() * 5)];

            selectTheBalls(row, column + 1, currentCandyClass, colorMatrix);
        }
    }
    if (row < 6) {
        if (colorMatrix[row + 1][column].className === currentCandyClass) {
            flag = 1;
            popsound.play();
            score++;
            colorMatrix[row + 1][column].style = "transition-duration: 0.7s";
            colorMatrix[row + 1][column].className =
                "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
            selectTheBalls(row + 1, column, currentCandyClass, colorMatrix);
        }
    }
    if (column > 0) {
        if (colorMatrix[row][column - 1].className === currentCandyClass) {
            flag = 1;
            popsound.play();
            score++;
            colorMatrix[row][column - 1].style = "transition-duration: 0.7s";
            colorMatrix[row][column - 1].className =
                "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
            selectTheBalls(row, column - 1, currentCandyClass, colorMatrix);
        }
    }
    if (row > 0) {
        if (colorMatrix[row - 1][column].className === currentCandyClass) {
            flag = 1;
            popsound.play();
            score++;
            colorMatrix[row - 1][column].style = "transition-duration: 0.7s";
            colorMatrix[row - 1][column].className =
                "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
            selectTheBalls(row - 1, column, currentCandyClass, colorMatrix);
        }
    }
    if (row < 6 && column < 6) {
        if (colorMatrix[row + 1][column + 1].className === currentCandyClass) {
            flag = 1;
            popsound.play();
            score++;
            colorMatrix[row + 1][column + 1].style = "transition-duration: 0.7s";
            colorMatrix[row + 1][column + 1].className =
                "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
            selectTheBalls(row + 1, column + 1, currentCandyClass, colorMatrix);
        }
    }
    if (row > 0 && column < 6) {
        if (colorMatrix[row - 1][column + 1].className === currentCandyClass) {
            flag = 1;
            popsound.play();
            score++;
            colorMatrix[row - 1][column + 1].style = "transition-duration: 0.7s";
            colorMatrix[row - 1][column + 1].className =
                "ball " + differentBallTypes[Math.floor(Math.random() * 5)];

            selectTheBalls(row - 1, column + 1, currentCandyClass, colorMatrix);
        }
    }
    if (row < 6 && column > 0) {
        if (colorMatrix[row + 1][column - 1].className === currentCandyClass) {
            flag = 1;
            popsound.play();
            score++;
            colorMatrix[row + 1][column - 1].style = "transition-duration: 0.7s";
            colorMatrix[row + 1][column - 1].className =
                "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
            selectTheBalls(row + 1, column - 1, currentCandyClass, colorMatrix);
        }
    }
    if (row > 0 && column > 0) {
        if (colorMatrix[row - 1][column - 1].className === currentCandyClass) {
            flag = 1;
            score++;
            popsound.play();
            colorMatrix[row - 1][column - 1].style = "transition-duration: 0.7s";
            colorMatrix[row - 1][column - 1].className =
                "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
            selectTheBalls(row - 1, column - 1, currentCandyClass, colorMatrix);
        }
    }
    if (flag === 1) {
        score++;
        popsound.play();
        colorMatrix[row][column].style = "transition-duration: 0.7s";
        colorMatrix[row][column].className =
            "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
        // return 1;
    } else {
        console.log("here");
        // return 0;
        // score -= 10;
    }
    console.log(score);
    let currentScore = document.getElementsByClassName("current-score")[0];
    currentScore.style = "opacity: 1;transition-duration: 0.5s";
    let timer = document.getElementById("timer").innerText;
    if (timer === "" || timer === " ") {
        score = 0;
    }

    currentScore.innerText = "Score: " + Math.floor(score / 2);
}

// currentSelectedCandy.className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
// }

function getTheCandiesToChange() {
    for (let i = 0; i < colorMatrix.length; i++) {
        for (let j = 0; j < colorMatrix[i].length; j++) {
            if (colorMatrix[i][j].className === currentCandyClass) {
                colorMatrix[i][j].className =
                    "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
                score += 1;
            }
        }
    }
}

let noOfBalls = 49;
let differentBallTypes = [
    "red-ball",
    "blue-ball",
    "green-ball",
    "yellow-ball",
    "purple-ball"
];

const displayCombo = score => {
    let body = document.querySelector("body");
    let getDisplayBlock = document.querySelector("#immediateScore");
    console.log(getDisplayBlock);
    if (getDisplayBlock != null) {
        getDisplayBlock.remove();
    }
    let displayDiv = document.createElement("div");
    displayDiv.id = "immediateScore";
    let subDiv1 = document.createElement("div");
    let subDiv2 = document.createElement("div");
    if (score > 1) {
        subDiv1.innerText = "Combo";
        subDiv2.innerText = score;
    } else {
        subDiv1.innerText = "Penalty";
        subDiv1.style.color = "red";
        let icon = document.createElement("i");
        icon.className = "fas fa-skull fa-lg";
        icon.style.padding = "10%";
        icon.style.color = "white";
        subDiv2.appendChild(icon);
    }
    displayDiv.appendChild(subDiv1);
    displayDiv.appendChild(subDiv2);
    body.appendChild(displayDiv);
};
const generateCandies = () => {
    document.querySelectorAll(".ball").forEach(div => div.remove());

    for (let divGenerator = 0; divGenerator < noOfBalls; divGenerator++) {
        let div = document.createElement("div");
        div.className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
        div.id = divGenerator + 1;
        div.onclick = checkBallAlgorithm;
        canvas.appendChild(div);
    }
};

let play = document.getElementById("play");
play.addEventListener("click", () => {
    bsound.play();
    let getDisplayBlock = document.querySelector("#immediateScore");
    if (getDisplayBlock != null) {
        getDisplayBlock.remove();
    }
    play.style.display = "none";
    pause.style.display = "block";
    canvas.style.display = "block";
    gameOver.style.display = "none";
    let timer = document.getElementById("timer").innerText;
    if (timer === "01 : 00" || timer === "00 : 00" || timer === "" || timer === " " || timer === null) {
        console.log("play");
        startTimer(1);
    } else {
        let minutes = timer.split(":")[1];
        console.log(minutes);
        console.log((minutes - 1) / 60);
        startTimer((minutes - 1) / 60);
    }
});

let pause = document.getElementById("pause");
pause.addEventListener("click", () => {
    bsound.pause();
    let getDisplayBlock = document.querySelector("#immediateScore");
    if (getDisplayBlock != null) {
        getDisplayBlock.remove();
    }
    pause.style.display = "none";
    play.style.display = "block";
    canvas.style.display = "none";
    gameOver.style.display = "block";
    let message = document.getElementById("message");
    message.innerText = "Paused";
    let pausedScore = document.getElementById("final-score");
    pausedScore.innerText = "Score: " + Math.floor(score / 2);
    pauseTimer();
});

let calculateScope = () => {};

let replay = document.getElementById("replay");
replay.addEventListener("click", () => {
    bsound.play();
    let getDisplayBlock = document.querySelector("#immediateScore");
    if (getDisplayBlock != null) {
        getDisplayBlock.remove();
    }
    generateCandies();
    window.clearTimeout(time);
    play.style.display = "none";
    pause.style.display = "block";
    canvas.style.display = "block";
    gameOver.style.display = "none";
    score = 0;
    let currentScore = document.getElementsByClassName("current-score")[0];
    currentScore.style = "opacity: 0";
    // currentScore.innerText = "Score: 0";
    startTimer(1);
});

const createScoreCard = () => {
    let mainDiv = document.querySelector(".side-bottom");
    let mainDivContent = document.querySelectorAll(".side-bottom>div");
    for (let init = 0; init < mainDivContent.length; init++) {
        mainDivContent[init].remove();
    }
    // let uArr = [];

    let userArr = [{
            name: "Senapathi",
            value: 861
        },
        {
            name: "Vishnu",
            value: 762
        },
        {
            name: "Vishali",
            value: 653
        }
    ];
    for (var count = 0; count < userArr.length; count++) {
        var key = userArr[count].name;
        console.log(key);
        var value = userArr[count].value;
        // var obj = {name: key, score: value};
        // uArr.push(obj);
        // console.log(uArr);
        let div = document.createElement("div");
        let icon = document.createElement("i");
        let innerDiv1 = document.createElement("div");
        let innerDiv2 = document.createElement("div");
        let innerDiv3 = document.createElement("div");
        icon.className = "fas fa-crown gold";
        if (count % 2 == 0) {
            div.className = "side-column even";
        } else {
            div.className = "side-column odd";
        }

        if (count == 0) {
            innerDiv1.appendChild(icon);
        } else {
            innerDiv1.innerText = count + 1;
        }
        div.appendChild(innerDiv1);
        innerDiv2.innerText = key;
        div.appendChild(innerDiv2);
        innerDiv3.innerText = value;
        div.appendChild(innerDiv3);
        mainDiv.appendChild(div);
    }
};