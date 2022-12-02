import data from './data.js';
import { getScoreFromRound, scoreObject } from './part1.js';

const matchingOpponentPlaySchema = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
}

const getWhatShouldIPlay = (opponentPlay, endResult) => {
  // draw
  if (endResult === 'Y') return opponentPlay;
  // lose
  if (endResult === 'X') {
    switch (opponentPlay) {
      case 'Rock':
        return 'Scissors';
      case 'Paper':
        return 'Rock';
      default:
        return 'Paper';
    }
  }
  // win
  if (endResult === 'Z') {
    switch (opponentPlay) {
      case 'Rock':
        return 'Paper';
      case 'Paper':
        return 'Scissors';
      default:
        return 'Rock';
    }
  }
}

const score = data.reduce((sum, round) => {
  const [opponentLetter, myLetter] = round;
  const opponentPlay = matchingOpponentPlaySchema[opponentLetter];
  const myPlay = getWhatShouldIPlay(opponentPlay, myLetter);

  const scoreRound = getScoreFromRound(opponentPlay, myPlay);
  const scorePlay = scoreObject[myPlay];

  return sum + scoreRound + scorePlay;
  
}, 0);

console.log('Score ?', score);