document.addEventListener('DOMContentLoaded', () => {
    const startPauseBtn = document.getElementById('start-pause');
    const resetBtn = document.getElementById('reset');
    const timerDisplay = document.getElementById('time');
    const statusDisplay = document.getElementById('status');
    const timerEndSound = document.getElementById('timer-end-sound');
    const settingsIcon = document.getElementById('settings-icon');
    const settingsModal = document.getElementById('settings-modal');
    const closeButton = document.getElementById('close-button');
    const applySettingsBtn = document.getElementById('apply-settings');
    const pomodoroDurationInput = document.getElementById('pomodoro-duration');
    const breakDurationInput = document.getElementById('break-duration');
    const backgroundUrlInput = document.getElementById('background-url');
    const buttonColorInput = document.getElementById('button-color');

    let timer;
    let isRunning = false;
    let timeLeft = 25 * 60;
    let isPomodoro = true;

    // Set default background
    document.body.style.backgroundImage = "url('background.gif')";

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
                timeLeft = isPomodoro ? pomodoroDurationInput.value * 60 : breakDurationInput.value * 60;
                statusDisplay.textContent = isPomodoro ? 'Pomodoro' : 'Break';
                statusDisplay.classList.add('animate');
                setTimeout(() => {
                    statusDisplay.classList.remove('animate');
                }, 500);
                startTimer();
            }
        }, 1000);
    };
    document.getElementById('github-btn').addEventListener('click', () => {
        window.open('https://github.com/rikka3', '_blank');
    });

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
        timeLeft = pomodoroDurationInput.value * 60;
        isPomodoro = true;
        statusDisplay.textContent = 'Pomodoro';
        updateDisplay();
        startPauseBtn.textContent = 'Start';
    });

    settingsIcon.addEventListener('click', () => {
        settingsModal.style.display = 'flex';
    });

    closeButton.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    applySettingsBtn.addEventListener('click', () => {
        timeLeft = pomodoroDurationInput.value * 60;
        const backgroundUrl = backgroundUrlInput.value.trim();
        if (backgroundUrl) {
            document.body.style.backgroundImage = `url('${backgroundUrl}')`;
        } else {
            document.body.style.backgroundImage = "url('background.gif')";
        }
        startPauseBtn.style.backgroundColor = buttonColorInput.value;
        resetBtn.style.backgroundColor = buttonColorInput.value;
        updateDisplay();
        settingsModal.style.display = 'none';
    });

    updateDisplay();
});
