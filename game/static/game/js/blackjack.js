var chipSum = 1000;
var dealerSum = 0;
var playerSum = 0;

var dealerAceCount = 0;
var playerAceCount = 0; 

var hidden;
var deck;
var round;

var canHit = true;

function gameFunc(round) {
    if(round>21) scoreRedirect();
    if(chipSum>25) chipSum -= 25;
    else endGame();
    document.getElementById("round-value").innerText = "Round: " + round + "/21";
    buildDeck();
    shuffleDeck();
    startGame();
}

// if (window.location.pathname === '/specific-page') {}
window.onload = () => {
    round = 1;
    gameFunc(1);
};

function resetGame() {
    let dealerCards = document.getElementById("dealer-cards");
    while(dealerCards.childElementCount > 1){
        dealerCards.removeChild(dealerCards.lastChild);
    }
    let yourCards = document.getElementById("your-cards");
    while(yourCards.childElementCount > 0){
        yourCards.removeChild(yourCards.lastChild);
    }

    document.getElementById("hidden").src = "/static/game/cards/BACK.png";
    document.getElementById("dealer-sum").innerText = null;
    document.getElementById("your-sum").innerText = null;
    document.getElementById("results").innerText = null;

    dealerSum = 0;
    playerSum = 0;
    dealerAceCount = 0;
    playerAceCount = 0;

    canHit = true;
    const hitBtn = document.querySelector('#hit');
    const stayBtn = document.querySelector('#stay');
    hitBtn.style.backgroundColor = "rgba(50, 100, 250, 1)";
    stayBtn.style.backgroundColor = "rgba(242,22,22, 1)";
    hitBtn.style.cursor = 'pointer';
    stayBtn.style.cursor = 'pointer';
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function startGame() {

    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    while (dealerSum < 15) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "/static/game/cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "/static/game/cards/" + card + ".png";
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("chip-value").innerText = chipSum;
}

function hit() {
    if(chipSum >= 25) chipSum -= 25;
    else canHit = false;
    if (!canHit) {
        const hitBtn = document.querySelector('#hit');
        hitBtn.style.backgroundColor = "rgba(50, 100, 250, 0.35)";
        hitBtn.style.cursor = 'default';
        return;
    }
    document.getElementById("chip-value").innerText = chipSum;
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "/static/game/cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(playerSum, playerAceCount) > 21) {
        canHit = false;
    }

}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);

    canHit = false;
    const hitBtn = document.querySelector('#hit');
    const stayBtn = document.querySelector('#stay');
    hitBtn.style.backgroundColor = "rgba(50, 100, 250, 0.35)";
    stayBtn.style.backgroundColor = "rgba(242,22,22, 0.35)";
    hitBtn.style.cursor = 'default';
    stayBtn.style.cursor = 'default';

    document.getElementById("hidden").src = "/static/game/cards/" + hidden + ".png";

    let message = "";
    if (playerSum > 21) {
        message = "You Lose!";
        chipSum = chipSum>=100 ? chipSum-100 : 0;
    }
    else if (dealerSum > 21) {
        message = "You win!";
        chipSum += 100;
    }
    else if (playerSum == dealerSum) {
        message = "Tie!";
    }
    else if (playerSum > dealerSum) {
        message = "You Win!";
        chipSum += 100;
    }
    else if (playerSum < dealerSum) {
        message = "You Lose!";
        chipSum = chipSum>=100 ? chipSum-100 : 0;
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = playerSum;
    document.getElementById("results").innerText = message;

    setTimeout(function(){
        resetGame();
        gameFunc(++round);
    }, 2500);
}

function endGame(){
    let message = "Chips Over. You Lose!"
    document.getElementById("results").innerText = message;
    scoreRedirect();
    /*
    setTimeout(function(){
        location.reload();
    }, 3000);
    */
}

function scoreRedirect(){
    setTimeout(function(){
        let newPath = "/score/";
        let newScore = window.location.protocol + '//' + window.location.host + newPath;
        window.location.href = newScore;
    }, 2500);
}

function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}
