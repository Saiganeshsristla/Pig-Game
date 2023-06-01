'use strict';

//selecting elements
const player0Ele = document.querySelector('.player--0');
const player1Ele = document.querySelector('.player--1');
const score0Ele = document.querySelector('#score--0');
const score1Ele = document.querySelector('#score--1');
const diceEle = document.querySelector('.dice');
const newEle = document.querySelector('.btn--new');
const rollEle = document.querySelector('.btn--roll');
const holdEle = document.querySelector('.btn--hold');
const currentEle = document.querySelector('.current-score');

let scores, currentScore, activePlayer, canPlay;

const initialize = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  canPlay = true;

  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  diceEle.classList.add('hidden');
  player0Ele.classList.add('player--active');
  player1Ele.classList.remove('player--active');
  player0Ele.classList.remove('player--winner');
  player1Ele.classList.remove('player--winner');
};

initialize();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Ele.classList.toggle('player--active');
  player1Ele.classList.toggle('player--active');
};

//rolling dice functionality
rollEle.addEventListener('click', function () {
  if (canPlay) {
    //Generate dice number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Displaying dice image
    diceEle.classList.remove('hidden');
    diceEle.src = `dice-${dice}.png`;

    //check for rolled 1
    if (dice !== 1) {
      //adding dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//holding score functionality
holdEle.addEventListener('click', function () {
  if (canPlay) {
    //adding the current score to total score
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check the total score >= 100
    if (scores[activePlayer] >= 20) {
      canPlay = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      diceEle.classList.add('hidden');
    } else {
      //switch the player
      switchPlayer();
    }
  }
});

//reseting the game functionality
newEle.addEventListener('click', initialize);
