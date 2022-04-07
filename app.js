const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time");
const pauseBtn = document.querySelector(".pause");

let countdown;
let secondsLeft;
let timerRunning = false;

function timer(seconds) {
    timerRunning = true;
    pauseBtn.style.display = "inline-block";
    ///clear any working timer, because when anyone working and other one clicked its bug
    clearInterval(countdown);
    const now = Date.now();
    const thenTimestamp = now + seconds * 1000;
    console.log({now, thenTimestamp});
    displayTimeLeft(seconds)
    displayEndTime(thenTimestamp)

    countdown = setInterval(() => {
        secondsLeft = Math.round((thenTimestamp - Date.now()) / 1000);
        // check if we should stop it!
        if(secondsLeft < 0) {
          clearInterval(countdown);
          return;
        }
        //dipslay it
        displayTimeLeft(secondsLeft)
    }, 1000)
};

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    console.log({minutes, remainderSeconds});
    const display = `${minutes}:${remainderSeconds < 10 ? `0` : ""}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
    if (minutes === 0 && remainderSeconds === 0) {
        pauseBtn.style.transform = "rotate(0deg)";
    };
};

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
};

function startTimer() {
    const seconds = this.dataset.time;
    console.log(typeof(seconds));
    parseInt(seconds)
    timer(seconds);
};

function pause() {
    if (timerRunning) {
        clearInterval(countdown);
        timerRunning = false;
        this.style.transform = "rotate(90deg)";
        console.log("clicked");
    } else if (secondsLeft) {
        console.log("here");
        timer(secondsLeft);
        this.style.transform = "rotate(180deg)";
    }
};

pauseBtn.addEventListener("click", pause);

buttons.forEach(button => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function(e) {
    e.preventDefault()
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
});