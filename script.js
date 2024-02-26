const cardsArray = [
    { id: 1, value: 'BEŞİKTAŞ' },
    { id: 2, value: 'BEŞİKTAŞ' },
    { id: 3, value: 'FENERBAHÇE' },
    { id: 4, value: 'FENERBAHÇE' },
    { id: 5, value: 'GALATASARAY' },
    { id: 6, value: 'GALATASARAY' },
    { id: 7, value: 'İSTANBUL' },
    { id: 8, value: 'İSTANBUL' },
    { id: 9, value: 'BAŞAKŞEHİR' },
    { id: 10, value: 'BAŞAKŞEHİR' },
    { id: 11, value: 'KASIMPAŞA' },
    { id: 12, value: 'KASIMPAŞA' },
    { id: 13, value: 'KARAGÜMRÜK' },
    { id: 14, value: 'KARAGÜMRÜK' },
    { id: 15, value: 'PENDİK' },
    { id: 16, value: 'PENDİK' }
];

const container = document.getElementById('container');
const timer = document.getElementById('timer');
let clickCount = 0;
let firstCard = null;
let secondCard = null;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(card) {
    const element = document.createElement('div');
    element.classList.add('card');
    element.dataset.id = card.id;
    element.textContent = '?';
    element.addEventListener('click', handleClick);
    return element;
}

function handleClick() {


    clickCount++;
    if (clickCount === 1) {
        firstCard = this;
        revealCard(firstCard);
    } else if (clickCount === 2) {
        secondCard = this;
        revealCard(secondCard);
        checkMatch();
    }
}

function revealCard(card) {
    card.textContent = cardsArray.find(c => c.id === parseInt(card.dataset.id)).value;
    card.classList.add('revealed');
}


function checkMatch() {
    const firstValue = firstCard.textContent;
    const secondValue = secondCard.textContent;
    if (firstValue === secondValue) {
        setTimeout(() => {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            checkWin();
        }, 500);
    } else {
        setTimeout(() => {
            firstCard.textContent = '?';
            secondCard.textContent = '?';
        }, 500);
    }
    clickCount = 0;

        

}


function checkWin(){
            // Check if all cards are paired
            const matchedCards = document.querySelectorAll('.card.matched');
            if (matchedCards.length >= 15) {
                
                    clearInterval(timerId);
                    setTimeout(() => {
                        alert('Congratulations! You won!');
                    }, 500);
                }
}



function init() {
    const shuffledCards = shuffle(cardsArray);
    shuffledCards.forEach(card => {
        container.appendChild(createCard(card));
    });
    
}


init();

const timerElement = document.getElementById('timer');
let timeLeft = 60;
let timerId;

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft} seconds`;

        if (timeLeft === 0) {
            clearInterval(timerId);
            showFailMessage();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
}

function showFailMessage() {
    timer.innerHTML = `<h4 style="color:red;text-align:center;">Başarısız! Yeniden dene...</h4>`;
}

function restartGame() {
    timeLeft = 60;
    timerElement.textContent = `Time left: ${timeLeft} seconds`;
    clearInterval(timerId);
    container.innerHTML = '';
    init();
    startTimer();
}

function startGame() {
    
    startTimer();
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('restartButton').style.display = 'inline-block';
}

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restartButton').addEventListener('click', restartGame);




