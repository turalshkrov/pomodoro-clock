// Display
const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const breakLabel = document.getElementById('break-length');
const sessionLabel = document.getElementById('session-length');
const timerLabel = document.getElementById('timer-label');

// Buttons
const startStopBtn = document.getElementById('start-stop');
const restartBtn = document.getElementById('restart');
const breakDecrementBtn = document.getElementById('break-decrement');
const breakIncrementBtn = document.getElementById('break-increment');
const sessionDecrementBtn = document.getElementById('session-decrement');
const sessionIncrementBtn = document.getElementById('session-increment');

const beepSound = document.getElementById('beep');
const tickingSound = document.getElementById('ticking');

let ticking = false;
let mode = false;
let breakLength = 5;
let sessionLength = 25;
let minutes = sessionLength;
let seconds = 0;

const breakLabelUpdate = () => {
    breakLabel.innerText = breakLength;
    if (mode) {
        minutes = breakLength;
        seconds = 0;
    }
}
const sessionLabelUpdate = () => {
    sessionLabel.innerText = sessionLength;
    if (!mode) {
        minutes = sessionLength;
        seconds = 0;
    }
}
const timerLabelUpdate = () => {
    !mode 
        ? timerLabel.innerText = 'Session'
        : timerLabel.innerText = 'Break'
}
const timerUpdate = () => {
    minutes < 10 
        ? minutesLabel.innerText = `0${minutes}`
        : minutesLabel.innerText = minutes

    seconds < 10
        ? secondsLabel.innerText = `0${seconds}`
        : secondsLabel.innerText = seconds
}

const decreaseBreakLength = () => {
    breakLength > 1 
        ? breakLength -= 1
        : null
}
const increaseBreakLength = () => {
    breakLength < 60
        ? breakLength += 1
        : null
}

const decreaseSessionLength = () => {
    sessionLength > 1
        ? sessionLength -= 1
        : null
}
const increaseSessionLength = () => {
    sessionLength < 60
        ? sessionLength += 1
        : null
}

const toggleTicking = () => {
    ticking = !ticking;

    tickingSound.currentTime = 0;
    tickingSound.volume = 0.05;

    ticking 
        ? tickingSound.play()
        : tickingSound.pause()

    if (ticking) {
        breakDecrementBtn.disabled = true;
        breakIncrementBtn.disabled = true;
        sessionDecrementBtn.disabled = true;
        sessionIncrementBtn.disabled = true;

        startStopBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

        timer = setInterval(() => {
            seconds -= 1;
            if (seconds === -1) {
                seconds = 59;
                minutes -= 1;
                if (minutes === -1) {
                    seconds = 0;
                    mode = !mode;
                    mode ? minutes = breakLength
                        : minutes = sessionLength
                    timerLabelUpdate();
                    beepSound.play();
                }
            }
            timerUpdate();
        }, 1000);
    } else {
        clearInterval(timer);

        startStopBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        
        breakDecrementBtn.disabled = false;
        breakIncrementBtn.disabled = false;
        sessionDecrementBtn.disabled = false;
        sessionIncrementBtn.disabled = false;
    }
}

const restart = () => {
    mode = false;
    breakLength = 5;
    sessionLength = 25;

    ticking ? toggleTicking()
        : null
    breakLabelUpdate();
    sessionLabelUpdate();
    timerUpdate();
    timerLabelUpdate();
}


// Add Event Listeners
const addEventListeners = () => {
    startStopBtn.addEventListener('click', () => toggleTicking());
    breakDecrementBtn.addEventListener('click', () => {
        decreaseBreakLength();
        breakLabelUpdate();
        timerUpdate();
    });
    breakIncrementBtn.addEventListener('click', () => {
        increaseBreakLength();
        breakLabelUpdate();
        timerUpdate();
    });
    sessionDecrementBtn.addEventListener('click', () => {
        decreaseSessionLength();
        sessionLabelUpdate();
        timerUpdate();
    });
    sessionIncrementBtn.addEventListener('click', () => {
        increaseSessionLength();
        sessionLabelUpdate();
        timerUpdate();
    });
    restartBtn.addEventListener('click', () => restart());
    
}

addEventListeners();
breakLabelUpdate();
sessionLabelUpdate();
timerLabelUpdate();
timerUpdate();