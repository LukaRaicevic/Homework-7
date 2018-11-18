function $class(cl) {
    return document.getElementsByClassName(cl);
}

let time = "";
let resetTime = "";
const showTime = $class("time")[0];
const pomodoroTab = $class("pomodoro")[0];
const shortTab = $class("short")[0];
const longTab = $class("long")[0];
const start = $class("start")[0];
const stop = $class("stop")[0];
const reset = $class("reset")[0];
const hidden = $class("hide")[0];
const title = $class("title")[0];
const audio = $class("audio")[0];
let main;


function setTime(time) {
    showTime.innerHTML = time;
}

function setTitle() {
    title.innerHTML = "("+showTime.innerHTML+")"+" PomodoroClock";
}

function changeTabBackgroundColor(elem1, elem2, elem3) {
    elem1.style.backgroundColor = "rgb(28, 135, 201)";
    elem2.style.backgroundColor = "rgb(56, 165, 233)";
    elem3.style.backgroundColor = "rgb(56, 165, 233)";
}

function addEvLisOnTab(t, elem1, elem2, elem3) {
    elem1.addEventListener("click", function() {
        time = t;
        resetTime = t;
        setTime(t);
        changeTabBackgroundColor(elem1, elem2, elem3);
        if(elem1.id === "pomod") {
            hidden.style.display = "block";
        }
        stopCountdown();
        setTitle();
    });
}

addEvLisOnTab("25:00", pomodoroTab, shortTab, longTab);
addEvLisOnTab("05:00", shortTab, pomodoroTab, longTab);
addEvLisOnTab("10:00", longTab, pomodoroTab, shortTab);

function countdown() {
    let timeArr = time.split(":");
    let minutesStr = timeArr[0];
    let secondsStr = timeArr[1];
    let minutes = Number(minutesStr);
    let seconds = Number(secondsStr);
    
    main = setInterval(function() {
        if(seconds === 0) {
            if(minutes === 0) {
                audio.play();
                stopCountdown();
                return;
            } else {
                seconds = 59;
                minutes--;
                if(minutes < 10) {
                    minutesStr = "0"+minutes;
                    secondsStr = String(seconds);
                } else {
                    minutesStr = String(minutes);
                    secondsStr = String(seconds);
                }
            }
        } else {
            seconds--;
            if(minutes === 0) {
                minutesStr = "00";
            }
            if(seconds < 10) {
                secondsStr = "0"+seconds;
            } else {
                secondsStr = String(seconds);
            }
            if(minutes < 10) {
                minutesStr = "0"+minutes;
            }
        }
        time = minutes+":"+seconds;
        showTime.innerHTML = minutesStr+":"+secondsStr;
        setTitle();
    }, 1000);
    return main;
}

function stopCountdown() {
    clearInterval(main);
}

start.addEventListener("click", countdown);

stop.addEventListener("click", stopCountdown);

reset.addEventListener("click", function() {
    stopCountdown();
    time = resetTime;
    setTime(time);
    setTitle();
});

