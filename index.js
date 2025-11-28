let scores = {
    home: 0,
    guest: 0,
};

const scoreEls = {
    home: document.getElementById("home-score"),
    guest: document.getElementById("guest-score"),
};

document.addEventListener("click", (e) => {
    if (!e.target.dataset.team) return;

    const team = e.target.dataset.team;
    const points = Number(e.target.dataset.points);

    scores[team] += points;
    scoreEls[team].textContent = scores[team];
});

let minute = 12;
let sec = 0;
let timerText = document.getElementById("timer-text");
let timer;

function startTimer() {
    clearInterval(timer);
    if (minute === 0 && sec === 0) {
        timerText.innerHTML = "00:00";
        return;
    }

    timer = setInterval(function () {
        timerText.innerHTML = minute + ":" + (sec < 10 ? "0" + sec : sec);

        if (minute === 0 && sec === 0) {
            clearInterval(timer);
            return;
        }

        if (sec == 0) {
            sec = 59;
            minute = Math.max(0, minute - 1); // avoid negative
        } else {
            sec--;
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
}

let pauseGameBtn = document.getElementById("pause-game-btn");

pauseGameBtn.addEventListener("click", pauseTimer);

const startBtn = document.getElementById("start-game-btn");

startBtn.addEventListener("click", startTimer);

let newGameBtn = document.getElementById("new-game-btn");

newGameBtn.addEventListener("click", () => {
    for (let team in scores) {
        scores[team] = 0;
        scoreEls[team].textContent = scores[team];
    }
    pauseTimer();
    minute = 12;
    sec = 0;
    timerText.innerHTML = minute + ":0" + sec;
});
