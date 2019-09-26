let canvas = document.getElementById("canvas");

let noOfBalls = 49;
let differentBallTypes = ["red-ball", "blue-ball", "green-ball", "yellow-ball", "purple-ball"];
for (let divGenerator = 0; divGenerator < noOfBalls; divGenerator++) {
    let div = document.createElement("div");
    div.className = "ball "  + differentBallTypes[Math.floor(Math.random() * 5)];
    canvas.appendChild(div); 
}