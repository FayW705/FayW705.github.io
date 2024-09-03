let timerInterval;
let nextLevelInterval;
let breakInterval;
let timeLeft;
let nextLevelTimeLeft;
let smallBlind;
let bigBlind;
let nextSmallBlind;
let nextBigBlind;
let isPaused = true;
let hasPlayedMinuteSound = false;
let isBreak = false;
let hasStarted = false;


const timeDisplay = document.getElementById('time');
const nextLevelTimer = document.getElementById('nextLevelTimer');
const smallBlindDisplay = document.getElementById('smallBlind');
const bigBlindDisplay = document.getElementById('bigBlind');
const nextLevelBlinds = document.getElementById('nextLevelBlinds');
const anteDisplay = document.getElementById('ante');
const startButton = document.getElementById('startButton');
const settingsButton = document.getElementById('settingsButton');
const rankingsList = document.getElementById('rankingsList');
const startSound = document.getElementById('startSound');
const endSound = document.getElementById('endSound');
const minuteSound = document.getElementById('minuteSound');
const tournamentSelect = document.getElementById('tournamentSelect');
const levelSelect = document.getElementById('levelSelect');
const customTournamentSetup = document.getElementById('customTournamentSetup');
const modal = document.getElementById('settingsModal');
const closeModal = document.getElementsByClassName('close')[0];
const tournamentNameDisplay = document.getElementById('tournamentNameDisplay');
const averageStackDisplay = document.getElementById('averageStack');
const totalBuyInsDisplay = document.getElementById('totalBuyIns');
const currentLevel = document.getElementById('currentLevel');
const nextTitle = document.getElementById('nextTitle');
const timeTitle = document.getElementById('timeTitle');
const timeChange = document.getElementById('time');
const content = document.getElementById('content');

const tournamentLevels = {
    3400: {
        1: { duration: 60, small: 1000, big: 2000, nextSmall: 2000, nextBig: 3000, ante: 1000, break: 10 },
        2: { duration: 60, small: 2000, big: 3000, nextSmall: 0, nextBig: 0, ante: 1000, break: 0 }
    },
    6600: {
        1: { duration: 60, small: 2000, big: 3000, nextSmall: 3000, nextBig: 6000, ante: 1000, break: 10 },
        2: { duration: 60, small: 3000, big: 6000, nextSmall: 4000, nextBig: 8000, ante: 1000, break: 0 },
        3: { duration: 30, small: 4000, big: 8000, nextSmall: 0, nextBig: 0, ante: 1000, break: 0 }
    },
    11000: {
        1: { duration: 60, small: 3000, big: 6000, nextSmall: 4000, nextBig: 8000, ante: 1000, break: 10 },
        2: { duration: 60, small: 4000, big: 8000, nextSmall: 5000, nextBig: 10000, ante: 1000, break: 0 },
        3: { duration: 30, small: 5000, big: 10000, nextSmall: 0, nextBig: 0, ante: 1000, break: 0 }
    },
    21500: {
        1: { duration: 60, small: 6000, big: 12000, nextSmall: 8000, nextBig: 16000, ante: 1000, break: 10 },
        2: { duration: 60, small: 8000, big: 16000, nextSmall: 10000, nextBig: 20000, ante: 1000, break: 10 },
        3: { duration: 60, small: 10000, big: 20000, nextSmall: 0, nextBig: 0, ante: 1000, break: 0 }
    },
    32000: {
        1: { duration: 60, small: 9000, big: 18000, nextSmall: 12000, nextBig: 24000, ante: 1000, break: 10 },
        2: { duration: 60, small: 12000, big: 24000, nextSmall: 15000, nextBig: 30000, ante: 1000, break: 10 },
        3: { duration: 60, small: 15000, big: 30000, nextSmall: 0, nextBig: 0, ante: 1000, break: 0 }
    },
    custom: {}
};

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateTimerDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Play minute sound when less than one minute left in level 2 or above
    const currentLevelValue = parseInt(levelSelect.value);
    if (currentLevelValue >= 2 && timeLeft < 60 && !hasPlayedMinuteSound) {
        playSoundSafely(minuteSound);
        hasPlayedMinuteSound = true;
    }
}

function updateNextLevelTimerDisplay(nextLevelTimeLeft) {
    const minutes = Math.floor(nextLevelTimeLeft / 60);
    const seconds = nextLevelTimeLeft % 60;
    nextLevelTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startMainTimer(duration, playSound = true) {
    timeLeft = duration * 60;
    hasPlayedMinuteSound = false;  // Reset the flag when starting a new timer
    updateTimerDisplay(timeLeft);
    if (playSound) playSoundSafely(startSound); // 播放開始音效

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                playSoundSafely(endSound); // 播放結束音效
                
            }//console.log(timeLeft);
            //console.log(isPaused);
            updateTimerDisplay(timeLeft);
        }
    }, 1000);
}

function startNextLevelTimer(duration) {
    nextLevelTimeLeft = duration * 60;
    updateNextLevelTimerDisplay(nextLevelTimeLeft);

    clearInterval(nextLevelInterval);
    nextLevelInterval = setInterval(() => {
        if (!isPaused) {
            nextLevelTimeLeft--;
            if (nextLevelTimeLeft <= 0) {
                clearInterval(nextLevelInterval);
                increaseBlinds();
            }
            updateNextLevelTimerDisplay(nextLevelTimeLeft);
        }
    }, 1000);
}

function increaseBlinds() {
    const selectedTournament = tournamentSelect.value;
    const selectedLevel = parseInt(levelSelect.value);
    const tournamentData = tournamentLevels[selectedTournament][selectedLevel];

    clearInterval(timerInterval);
    clearInterval(nextLevelInterval);
    clearInterval(breakInterval);

    smallBlind = tournamentData.nextSmall;
    bigBlind = tournamentData.nextBig;

    if (selectedLevel < Object.keys(tournamentLevels[selectedTournament]).length) { //判斷 是否有下個level
        const nextLevelData = tournamentLevels[selectedTournament][selectedLevel + 1];
        nextLevelBlinds.textContent = `${formatNumber(nextLevelData.small)}/${formatNumber(nextLevelData.big)}`;

        if (tournamentData.break > 0) { //如果有 且有休息時間
            nextLevelTimeLeft = tournamentData.break;
            updateNextLevelTimerDisplay(nextLevelTimeLeft);
            timeLeft = tournamentData.break;
            updateTimerDisplay(timeLeft);

            startMainTimer(timeLeft, false);// 休息時間計時
            startNextLevelTimer(nextLevelTimeLeft);
            isBreak = true;
            nextTitle.textContent = "NEXT LEVEL IN";
            timeChange.classList.add('breakTime');
            breakInterval = setInterval(() => {
                if (!isPaused) {
                    
                    if (nextLevelTimeLeft <= 0) {
                        clearInterval(breakInterval);
                        // 休息時間結束後開始新的等級計時
                        nextTitle.textContent = "NEXT BREAK IN";
                        timeChange.classList.remove('breakTime');
                        isBreak = false;
                        levelSelect.value = selectedLevel + 1;
                        console.log(levelSelect.value);
                        updateBlinds(selectedTournament, levelSelect.value);
                        startMainTimer(nextLevelData.duration, true);
                        startNextLevelTimer(nextLevelData.duration);
                    }
                    updateNextLevelTimerDisplay(nextLevelTimeLeft);
                    updateTimerDisplay(timeLeft);
                }
            }, 1000);
            
        } else { //如果有 但沒休息時間
            nextTitle.textContent = "NEXT LEVEL IN";
            timeChange.classList.remove('breakTime');
            levelSelect.value = selectedLevel + 1;
            isBreak = false;
            updateBlinds(selectedTournament, levelSelect.value);
            startMainTimer(nextLevelData.duration, true);
            startNextLevelTimer(nextLevelData.duration);
        }
    } else { //沒有下個level 結束
        
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
    if (selectedTournament === '3400'){
        content.textContent = "獎池提撥 第一名 $500 第二名 $300 第三名 $200";
    }else{
        content.textContent = "獎池提撥 第一名 $1000 第二名 $600 第三名 $400";
        
    }
    
    const tournamentData = tournamentLevels[selectedTournament][selectedLevel];
    smallBlind = tournamentData.small;
    bigBlind = tournamentData.big;
    ante = parseInt(document.getElementById('anteInput').value);
    nextSmallBlind = tournamentData.nextSmall;
    nextBigBlind = tournamentData.nextBig;
    
    const durationInput = document.getElementById('timeInput');

    // 更新 timeInput 的值為選定賽程的 duration，如果用戶手動輸入了不同於預設的時間，則顯示用戶輸入的時間
    if (durationInput.value !== tournamentData.duration) {
        durationInput.value = tournamentData.duration;
        startMainTimer(durationInput.value, false);
        startNextLevelTimer(durationInput.value);
    }

    // 更新計時器
    if(isBreak){
        
        timeChange.classList.remove('breakTime');
        isBreak = !isBreak;
    }

    // 更新顯示的賽程信息
    smallBlind = tournamentData.small;
    bigBlind = tournamentData.big;
    ante = parseInt(document.getElementById('anteInput').value);
    nextSmallBlind = tournamentData.nextSmall;
    nextBigBlind = tournamentData.nextBig;

    if(tournamentData.break > 0){
        nextTitle.textContent = "NEXT BREAK IN";
    }else{
        nextTitle.textContent = "NEXT LEVEL IN";
    }
    hasStarted = false;
    smallBlindDisplay.textContent = formatNumber(smallBlind);
    bigBlindDisplay.textContent = formatNumber(bigBlind);
    anteDisplay.textContent = formatNumber(ante);
    nextLevelBlinds.textContent = `${formatNumber(nextSmallBlind)} / ${formatNumber(nextBigBlind)}`;

    document.getElementById('smallBlindInput').value = smallBlind;
    document.getElementById('bigBlindInput').value = bigBlind;
    document.getElementById('anteInput').value = ante;
    document.getElementById('currentLevel').textContent = selectedLevel;
    averageStackDisplay.textContent = formatNumber(document.getElementById('averageStackInput').value);
    totalBuyInsDisplay.textContent = formatNumber(document.getElementById('totalBuyInsInput').value);
}

// function applySettings() {
//     clearInterval(timerInterval);
//     clearInterval(nextLevelInterval);
//     clearInterval(breakInterval);

//     const selectedTournament = tournamentSelect.value;
//     const selectedLevel = levelSelect.value;
//     const customTournamentName = document.getElementById('customTournamentName').value;
//     const timeInput = parseInt(document.getElementById('timeInput').value);
//     const smallBlindInput = parseInt(document.getElementById('smallBlindInput').value);
//     const bigBlindInput = parseInt(document.getElementById('bigBlindInput').value);
//     const averageStackInput = parseInt(document.getElementById('averageStackInput').value);
//     const totalBuyInsInput = parseInt(document.getElementById('totalBuyInsInput').value);
//     const anteInput = parseInt(document.getElementById('anteInput').value);

//     tournamentLevels['custom'][selectedLevel] = {
//         duration: timeInput,
//         small: smallBlindInput,
//         big: bigBlindInput,
//         nextSmall: smallBlindInput * 2,
//         nextBig: bigBlindInput * 2,
//         ante: anteInput,
//         break: 10
//     };
//     console.log('apply:'+timeInput);
//     averageStackDisplay.textContent = formatNumber(averageStackInput);
//     anteDisplay.textContent = formatNumber(ante); // 更新顯示的ante值
//     updateBlinds(selectedTournament, selectedLevel);
// }

tournamentSelect.addEventListener('change', (event) => {
    updateBlinds(event.target.value, levelSelect.value);
});

levelSelect.addEventListener('change', (event) => {
    updateBlinds(tournamentSelect.value, event.target.value);
});

startButton.addEventListener('click', () => {
    isPaused = !isPaused;
    const startIcon = document.getElementById('startIcon');
    if (!isPaused) {
        startIcon.classList.remove('typcn-media-play');
        startIcon.classList.add('typcn-media-pause');
        if(hasStarted){
            startMainTimer(timeLeft / 60, false);
        }else{
            startMainTimer(timeLeft / 60, true);
            hasStarted = true;
        }
        startNextLevelTimer(nextLevelTimeLeft / 60);
        //console.log('click '+hasStarted);
    } else {
        startIcon.classList.remove('typcn-media-pause');
        startIcon.classList.add('typcn-media-play');
        clearInterval(timerInterval);
        clearInterval(nextLevelInterval);
        clearInterval(breakInterval);
    }
});

settingsButton.addEventListener('click', () => {
    modal.style.display = 'block';
    if (!isPaused) {
        
        startIcon.classList.remove('typcn-media-pause');
        startIcon.classList.add('typcn-media-play');
        
        isPaused = !isPaused;
    }
    
});



closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

document.getElementById('timeInput').addEventListener('input', (event) => {
    hasStarted = false;
    console.log(hasStarted);
    const duration = parseInt(event.target.value);
    updateTimerDisplay(duration * 60);
    updateNextLevelTimerDisplay(duration * 60);
    startMainTimer(duration, false);
    startNextLevelTimer(duration);
});

document.getElementById('smallBlindInput').addEventListener('input', (event) => {
    smallBlindDisplay.textContent = formatNumber(event.target.value);
});

document.getElementById('bigBlindInput').addEventListener('input', (event) => {
    bigBlindDisplay.textContent = formatNumber(event.target.value);
});

document.getElementById('anteInput').addEventListener('input', (event) => {
    anteDisplay.textContent = formatNumber(event.target.value);
});

document.getElementById('averageStackInput').addEventListener('input', (event) => {
    averageStackDisplay.textContent = formatNumber(event.target.value);
});

document.getElementById('totalBuyInsInput').addEventListener('input', (event) => {
    totalBuyInsDisplay.textContent = formatNumber(event.target.value);
});
document.getElementById('customTournamentName').addEventListener('input', (event) => {
    tournamentNameDisplay.textContent = event.target.value;
    nextLevelBlinds.textContent = "--";
});
document.querySelectorAll('.rankingInput').forEach(input => {
    input.addEventListener('input', () => {
        rankingsList.innerHTML = '';
        document.querySelectorAll('.rankingInput').forEach((input, index) => {
            const player = input.value.trim();
            if (player) {
                const li = document.createElement('li');
                li.textContent = `${player}`;
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

// 播放音效
function playSoundSafely(sound) {
    if (sound.paused) {
        sound.play().catch(error => {
            console.log('Sound play failed:', error);
        });
    }
}

// Initialize with the default tournament and level
updateBlinds(tournamentSelect.value, levelSelect.value);