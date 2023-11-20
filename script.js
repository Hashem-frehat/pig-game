'use strict';

const score0pl = document.getElementById('score--0');
const score1pl = document.getElementById('score--1');
const diceel = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const current0el = document.getElementById('current--0');
const current1el = document.getElementById('current--1');
const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');
const score0el = document.getElementById('score--0');
const score1el = document.getElementById('score--1');

// start condition
score0pl.textContent = 0;
score1pl.textContent = 0;
diceel.classList.add('hidden');
let currentscore = 0;
let activeplayer = 0;
const scores = [0, 0];
let stillplaying = true;

// rolling dice functionality
btnroll.addEventListener('click', function () {
  // generate a random dice
  if (stillplaying) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceel.classList.remove('hidden');
    diceel.src = `dice-${dice}.png`;

    // check for rolled
    if (dice !== 1) {
      // add dice to curent score
      // very important code
      currentscore += dice;

      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
    } else {
      // switch to the next player
      document.getElementById(`current--${activeplayer}`).textContent = 0;
      activeplayer = activeplayer === 0 ? 1 : 0;
      currentscore = 0;
      player0el.classList.toggle('player--active');
      player1el.classList.toggle('player--active');
    }
  }
});
btnhold.addEventListener('click', function () {
  // add current score to score
  if (stillplaying) {
    scores[activeplayer] += currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];

    // if score >= 100

    if (scores[activeplayer] >= 100) {
      diceel.classList.add('hidden');
      stillplaying = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    }

    // switch player
    document.getElementById(`current--${activeplayer}`).textContent = 0;
    currentscore = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    player0el.classList.toggle('player--active');
    player1el.classList.toggle('player--active');
  }
});
// new game

btnnew.addEventListener('click', function () {
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');

  score0pl.textContent = 0;
  score1pl.textContent = 0;
  currentscore = 0;
  stillplaying = true;
  scores[1] = 0;
  scores[0] = 0;
});
