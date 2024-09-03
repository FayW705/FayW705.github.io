let timerInterval;
let nextLevelInterval;
let timeLeft;
let nextLevelTimeLeft;
let smallBlind;
let bigBlind;
let nextSmallBlind;
let nextBigBlind;
let isPaused = false;

const timeDisplay = document.getElementById('time');
const nextLevelTimer = document.getElementById('nextLevelTimer');
const smallBlindDisplay = document.getElementById('smallBlind');
const bigBlindDisplay = document.getElementById('bigBlind');
const nextLevelBlinds = document.getElementById('nextLevelBlinds');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const settingsButton = document.getElementById('settingsButton');
const rankingsList = document.getElementById('rankingsList');
const alarmSound = document.getElementById('alarmSound');
const tournamentSelect = document.getElementById('tournamentSelect');
const levelSelect = document.getElementById('levelSelect');
const customTournamentSetup = document.getElementById('customTournamentSetup');
const modal = document.getElementById('settingsModal');
const closeModal = document.getElementsByClassName('close')[0];
const tournamentNameDisplay = document.getElementById('tournamentNameDisplay');
const averageStackDisplay = document.getElementById('averageStack');
const totalBuyInsDisplay = document.getElementById('totalBuyIns');

const tournamentLevels = {
    3400: {
        1: { duration: 60, small: 1000, big: 2000, nextSmall: 2000, nextBig: 3000, break: 10 },
        2: { duration: 60, small: 2000, big: 3000, nextSmall: 0, nextBig: 0, break: 0 }
    },
    6600: {
        1: { duration: 60, small: 2000, big: 3000, nextSmall: 3000, nextBig: 6000, break: 10 },
        2: { duration: 60, small: 3000, big: 6000, nextSmall: 4000, nextBig: 8000, break: 0 },
        3: { duration: 30, small: 4000, big: 8000, nextSmall: 0, nextBig: 0, break: 0 }
    },
    11000: {
        1: { duration: 60, small: 3000, big: 6000, nextSmall: 4000, nextBig: 8000, break: 10 },
        2: { duration: 60, small: 4000, big: 8000, nextSmall: 5000, nextBig: 10000, break: 0 },
        3: { duration: 30, small: 5000, big: 10000, nextSmall: 0, nextBig: 0, break: 0 }
    },
    21500: {
        1: { duration: 60, small: 6000, big: 12000, nextSmall: 8000, nextBig: 16000, break: 10 },
        2: { duration: 60, small: 8000, big: 16000, nextSmall: 10000, nextBig: 20000, break: 10 },
        3: { duration: 60, small: 10000, big: 20000, nextSmall: 0, nextBig: 0, break: 0 }
    },
    32000: {
        1: { duration: 60, small: 9000, big: 18000, nextSmall: 12000, nextBig: 24000, break: 10 },
        2: { duration: 60, small: 12000, big: 24000, nextSmall: 15000, nextBig: 30000, break: 10 },
        3: { duration: 60, small: 15000, big: 30000, nextSmall: 0, nextBig: 0, break: 0 }
    },
    custom: {}
};

function updateTimerDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateNextLevelTimerDisplay(nextLevelTimeLeft) {
    const minutes = Math.floor(nextLevelTimeLeft / 60);
    const seconds = nextLevelTimeLeft % 60;
    nextLevelTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer(duration) {
    timeLeft = duration * 60;
    nextLevelTimeLeft = duration * 60;
    updateTimerDisplay(timeLeft);
    updateNextLevelTimerDisplay(nextLevelTimeLeft);
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            nextLevelTimeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alarmSound.play();
                alert("時間到！");
            }
            if (nextLevelTimeLeft <= 0) {
                clearInterval(nextLevelInterval);
                increaseBlinds();
                alert("進入下一個LEVEL");
            }
            updateTimerDisplay(timeLeft);
            updateNextLevelTimerDisplay(nextLevelTimeLeft);
        }
    }, 1000);
}

function increaseBlinds() {
    const selectedTournament = tournamentSelect.value;
    const selectedLevel = levelSelect.value;
    const tournamentData = tournamentLevels[selectedTournament][selectedLevel];

    smallBlind = tournamentData.nextSmall;
    bigBlind = tournamentData.nextBig;

    if (selectedLevel < Object.keys(tournamentLevels[selectedTournament]).length) {
        const nextLevelData = tournamentLevels[selectedTournament][parseInt(selectedLevel) + 1];
        nextLevelTimeLeft = nextLevelData.duration * 60;
        nextLevelBlinds.textContent  = `${nextLevelData.small}/${nextLevelData.big}`;
        nextLevelInterval = setInterval(() => {
            if (!isPaused) {
                nextLevelTimeLeft--;
                if (nextLevelTimeLeft <= 0) {
                    clearInterval(nextLevelInterval);
                    increaseBlinds();
                    alert("進入下一個LEVEL");
                }
                updateNextLevelTimerDisplay(nextLevelTimeLeft);
            }
        }, 1000);
    } else {
        nextLevelBlinds.textContent = "結束";
    }
}

function updateBlinds(selectedTournament, selectedLevel) {
    if (selectedTournament === 'custom') {
        customTournamentSetup.style.display = 'block';
        tournamentNameDisplay.textContent = document.getElementById('customTournamentName').value;
    } else {
        customTournamentSetup.style.display = 'none';
        tournamentNameDisplay.textContent = tournamentSelect.options[tournamentSelect.selectedIndex].text;
    }

    const tournamentData = tournamentLevels[selectedTournament][selectedLevel];
    smallBlind = tournamentData.small;
    bigBlind = tournamentData.big;
    nextSmallBlind = tournamentData.nextSmall;
    nextBigBlind = tournamentData.nextBig;
    startTimer(tournamentData.duration);
}

startButton.addEventListener('click', () => {
    isPaused = false;
    startTimer(timeLeft / 60);
});

pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.innerHTML = isPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
});

settingsButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

tournamentSelect.addEventListener('change', (event) => {
    updateBlinds(event.target.value, levelSelect.value);
});

levelSelect.addEventListener('change', (event) => {
    updateBlinds(tournamentSelect.value, event.target.value);
});

document.getElementById('timeInput').addEventListener('input', (event) => {
    const duration = parseInt(event.target.value);
    updateTimerDisplay(duration * 60);
});

document.getElementById('smallBlindInput').addEventListener('input', (event) => {
    smallBlindDisplay.textContent = event.target.value;
});

document.getElementById('bigBlindInput').addEventListener('input', (event) => {
    bigBlindDisplay.textContent = event.target.value;
});

document.getElementById('averageStackInput').addEventListener('input', (event) => {
    averageStackDisplay.textContent = event.target.value;
});

document.getElementById('totalBuyInsInput').addEventListener('input', (event) => {
    totalBuyInsDisplay.textContent = event.target.value;
});

document.querySelectorAll('.rankingInput').forEach(input => {
    input.addEventListener('input', () => {
        rankingsList.innerHTML = '';
        document.querySelectorAll('.rankingInput').forEach((input, index) => {
            const player = input.value.trim();
            if (player) {
                const li = document.createElement('li');
                li.textContent = `${index + 1}${getOrdinalSuffix(index + 1)}: ${player}`;
                rankingsList.appendChild(li);
            }
        });
    });
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

function getOrdinalSuffix(num) {
    if (num > 3 && num < 21) return 'th';
    switch (num % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

// Initialize with the default tournament and level
updateBlinds(tournamentSelect.value, levelSelect.value);

