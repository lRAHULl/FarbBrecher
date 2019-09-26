let canvas=document.getElementById("canvas");
function startTimer() {
    let duration=1*10;
    let display=document.getElementById("timer");
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