document.addEventListener('DOMContentLoaded', () => {
    const startPauseBtn = document.getElementById('start-pause');
    const resetBtn = document.getElementById('reset');
    const timerDisplay = document.getElementById('time');
    const statusDisplay = document.getElementById('status');
    const timerEndSound = document.getElementById('timer-end-sound');

    let timer;
    let isRunning = false;
    let timeLeft = 25 * 60;
    let isPomodoro = true;

    const updateDisplay = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const startTimer = () => {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                timerEndSound.play();
                isPomodoro = !isPomodoro;
                timeLeft = isPomodoro ? 25 * 60 : 5 * 60;
                statusDisplay.textContent = isPomodoro ? 'Pomodoro' : 'Break';
                statusDisplay.classList.add('animate');
                setTimeout(() => {
                    statusDisplay.classList.remove('animate');
                }, 500);
                startTimer();
            }
        }, 1000);
    };

    startPauseBtn.addEventListener('click', () => {
        if (isRunning) {
            clearInterval(timer);
            startPauseBtn.textContent = 'Start';
        } else {
            startTimer();
            startPauseBtn.textContent = 'Pause';
        }
        isRunning = !isRunning;
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(timer);
        isRunning = false;
        timeLeft = 25 * 60;
        isPomodoro = true;
        statusDisplay.textContent = 'Pomodoro';
        updateDisplay();
        startPauseBtn.textContent = 'Start';
    });

    updateDisplay();
});
