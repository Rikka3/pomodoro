let timer;
let isRunning = false;
let isPaused = false;
let timeLeft = 1500; // 25 minutes in seconds
let sessionCount = 0;

function updateTime() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time').textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateStatus(status) {
    document.getElementById('status').textContent = status;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTime();
        if (timeLeft <= 0) {
            clearInterval(timer);
            sessionCount++;
            if (sessionCount % 2 === 0) {
                // Pomodoro session
                timeLeft = 1500; // 25 minutes
                updateStatus('Pomodoro');
            } else {
                // Break session
                if (sessionCount % 8 === 0) {
                    timeLeft = 900; // 15 minutes for long break
                    updateStatus('Long Break');
                } else {
                    timeLeft = 300; // 5 minutes for short break
                    updateStatus('Short Break');
                }
            }
            updateTime();
            startTimer(); // Auto-start the next session or break
        }
    }, 1000);
}

function startPauseTimer() {
    if (!isRunning && !isPaused) {
        isRunning = true;
        document.getElementById('start-pause').textContent = 'Pause';
        startTimer();
    } else if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        isPaused = true;
        document.getElementById('start-pause').textContent = 'Start';
    } else if (!isRunning && isPaused) {
        isRunning = true;
        isPaused = false;
        document.getElementById('start-pause').textContent = 'Pause';
        startTimer();
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;
    timeLeft = 1500; // 25 minutes in seconds
    sessionCount = 0;
    document.getElementById('start-pause').textContent = 'Start';
    updateStatus('Pomodoro');
    updateTime();
}

document.getElementById('start-pause').addEventListener('click', startPauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

// Initialize the timer display
updateStatus('Pomodoro');
updateTime();
