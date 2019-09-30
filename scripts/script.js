let canvas = document.getElementById("canvas");

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
                candy.remove();
                refill();
                score += 1;
            }
        })
    })
    console.log("score" + score);
    currentId.className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
}

let noOfBalls = 49;
let noOfBallsRow = 7;
let differentBallTypes = ["red-ball", "blue-ball", "green-ball", "yellow-ball", "purple-ball"];

window.onload = () => {
    generateCandiesRandom();
}

const refill = () => {
    let flexAll = document.querySelectorAll(".flex-column");
    console.log(flexAll);
    for (let flexInteger = 0; flexInteger < flexAll.length; flexInteger++) {
        let divAll = document.querySelectorAll(`#flex-column-${flexInteger}>div`);
        AddNewDiv(document.getElementById(`flex-column-${flexInteger}`), divAll.length);
    }
    giveNewId();
}

const giveNewId = () => {
    let divId = 0;
    let divBlocks = document.getElementsByClassName("ball");
    for (let divInteger = 0; divInteger < divBlocks.length; divInteger++) {
        divBlocks[divInteger].id = divId++;
    }
}
const AddNewDiv = (flexObject, length) => {
    if (length < 7) {
        let div = document.createElement("div");
        div.className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
        div.id = divCount++;
        div.addEventListener('click', checkBallAlgorithm);
        flexObject.appendChild(div);
    }
}

let divCount = 0;
let flexColumnId = 0;
const generateCandiesRandom = () => {
    document.querySelectorAll(".ball").forEach(div => div.remove());

    for (let divRow = 0; divRow < 7; divRow++) {
        let div = document.createElement("div");
        div.id = `flex-column-${flexColumnId++}`;
        div.className = "flex-column"
        for (let divColumn = 0; divColumn < 7; divColumn++) {
            let innerDiv = document.createElement("div");
            innerDiv.className = "ball " + differentBallTypes[Math.floor(Math.random() * 5)];
            innerDiv.id = divCount++;
            innerDiv.addEventListener('click', checkBallAlgorithm);
            div.appendChild(innerDiv);
        }
        canvas.appendChild(div);
    }
}


let replay = document.getElementById('replay');
replay.addEventListener('click', generateCandiesRandom);


let finalScore = document.getElementById("final-score");
finalScore.innerText += '0';