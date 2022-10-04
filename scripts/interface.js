const $front = "card_front";
const $back = "card_back";
const $card = "card";
const $icon = "icon";

const startGameBtn = document.getElementById('startGame');



initializeCards(game.createCards());

let clock;


function startGame() {
    initializeCards(game.createCards());
    setTimeout(() => document.querySelector('.btnStart').classList.add('btn_flip'), 2000)
    preview()
    setTimeout(() => startTimer(),3000)
    setTimeout(() => game.lockMode = false, 3500)
    startGameBtn.disabled = true;
}

function initializeCards(cards) {
    let gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    // criar as cartas
    game.cards.forEach((card => {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add($card);
        cardElement.dataset.icon = card.icon;
        
        createCardContent(card, cardElement);
        
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement)
    }))
}

function preview() {
    let cards = document.querySelectorAll('.card')
    cards.forEach(card => {
        card.classList.add('flip')
        setTimeout(() => {
            card.classList.remove('flip');
        }, 3000)
    })
}


function createCardContent(card, cardElement) {

    createCardFace($front, card, cardElement);
    createCardFace($back, card, cardElement);


}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)
    if (face == $front) {
        let iconElement = document.createElement('img')
        iconElement.classList.add($icon);
        iconElement.src = `./assets/images/${card.icon}.svg`
        iconElement.alt = `logo do ${card.icon}`
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = `<img src="./assets/images/logo.png" alt="logo dos vingadores">`
    }
    element.appendChild(cardElementFace);
}


function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add('flip');
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                hitSound.play()
                console.log('acertou');
                if (game.checkGameOver()) {
                    stopTimer();
                    showLayers();
                }
            } else {
                // desvira as cartas
                console.log('errou');
                setTimeout(function () {
                    missSound.play();

                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000)
            }
        }
    }
}

function showLayers() {
    let gameOverLayer = document.getElementById('gameOver');
    let yayLayer = document.getElementById('yay');
    let result = document.getElementById('result');

    yayLayer.style.display = 'flex';
    setTimeout(() => {
        yayLayer.style.display = 'none';
        result.innerText += timeResult;
        gameOverLayer.style.display = 'flex';
    }, 3000)
}

function restart() {
    location.reload();
}

function gg() {
    game.flipAll()
    let avengers = document.querySelectorAll('.card');
    document.querySelectorAll('.card').forEach((avenger) => {
        avenger.classList.add('flip');
        avenger.classList.add('gradient-border');
    })
    showLayers()
}


const clockDisplay = document.getElementById('clock');

let minutes = 0;
let aux = 0;
let seconds = 0
let timeResult;

function timer() {
    if (seconds < 60) {
        aux += 1;
        seconds = aux < 10 ? '0' + aux : aux
        clockDisplay.innerHTML = `0${minutes}:${seconds}`;
    } else {
        aux = 0;
        seconds = 0;
        minutes += 1;
    }
}

function startTimer(){
    clock = setInterval(timer, 1000);
}

function stopTimer() {
    clearInterval(clock);
    if (minutes < 1) {
        timeResult = `${seconds} segundos`;
    } else {
        timeResult = `0${minutes}:${seconds}`;
    }
    console.log('Tempo foi ' + timeResult);
}
