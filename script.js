let timerInterval;
let running = false;
let minutes = 25;
let seconds = 0;
let breakMinutes = 5;
let longBreakMinutes = 15;
let cycles = 0;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const breakMinutesDisplay = document.getElementById("break-minutes");
const cycleCountDisplay = document.getElementById("cycle-count");

const workMinusButton = document.getElementById("work-minus");
const workPlusButton = document.getElementById("work-plus");
const breakMinusButton = document.getElementById("break-minus");
const breakPlusButton = document.getElementById("break-plus");


const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const pauseButton = document.getElementById("pause");


function updateTimerDisplay() {
    minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

function updateBreakDisplay() {
    breakMinutesDisplay.textContent = breakMinutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

function updateCycleCount() {
    cycleCountDisplay.textContent = cycles;
}

const startWork = () =>{
    timerInterval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timerInterval);
            if (cycles % 4 === 0 && cycles >= 4) {
                startLongBreak();
            } else {
                startBreak();
            }
            cycles++;
            updateCycleCount();
        } else {
            if (seconds === 0) {
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateTimerDisplay();
        }
    }, 1000);
    running = true;
}

function BreaktimeCountDown() {
    clearInterval(timerInterval); 
    timerInterval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timerInterval);
            minutes = 25;
            seconds = 0;
            startWork();
        } else {
            if (seconds === 0) {
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateTimerDisplay();
        }
    }, 10);
    running = true;
}


const startBreak = () =>{
    clearInterval(timerInterval);
    minutes = breakMinutes;
    seconds = 0;
    updateTimerDisplay();
    BreaktimeCountDown();
}

const startLongBreak = () =>  {
    clearInterval(timerInterval);
    minutes = longBreakMinutes;  // Set the long break time to 15 minutes
    seconds = 0;
    updateTimerDisplay();
    BreaktimeCountDown();
}

function adjustTime(change, elementId, currentValue, timerType) {// (-1 or +1, minutes or break-minutes ID, 25 or 5 default value, work or break)
    const updatedValue = currentValue + change;
    
    if (updatedValue >= 1) {
        currentValue = updatedValue;
        document.getElementById(elementId).textContent = currentValue;
        
        
    
        if (timerType === "work" && !running) {
        minutes = currentValue;
        seconds = 0;
        updateTimerDisplay();
    }
       else if (timerType === "break" && !running) {
        breakMinutes = currentValue;
        seconds = 0;
        updateBreakDisplay();

}
}
   
}


//---------------- call the function using addEventListener and click 


startButton.addEventListener("click", () => {
    if (!running) {
        startWork();
    } else {
        clearInterval(timerInterval);
        running = false;
    }
});


pauseButton.addEventListener("click", () => {
    if (running) {
        clearInterval(timerInterval);
        running = false;
    } 
});

resetButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    running = false;
    startButton.innerText = "Start";
    minutes = 25;
    seconds = 0;
    breakMinutes = 5;
    cycles = 0;
    updateTimerDisplay();
    updateBreakDisplay();
    updateCycleCount();
});

workMinusButton.addEventListener("click", () => adjustTime(-1, "minutes", minutes, "work"));
workPlusButton.addEventListener("click", () => adjustTime(1, "minutes", minutes, "work"));
breakMinusButton.addEventListener("click", () => adjustTime(-1, "break-minutes", breakMinutes, "break"));
breakPlusButton.addEventListener("click", () => adjustTime(1, "break-minutes", breakMinutes, "break"));
