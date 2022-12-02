import data from './data.js';
import { getScoreFromRound, scoreObject } from './part1.js';

const matchingOpponentPlaySchema = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
}

const DRAW = 'Y';
const LOSE = 'X';
const WIN = 'Z';

const getWhatShouldIPlay = (opponentPlay, endResult) => {
  if (endResult === DRAW) return opponentPlay;
  switch (opponentPlay) {
    case 'Rock':
      return endResult === LOSE ? 'Scissors' : 'Paper';
    case 'Paper':
      return endResult === LOSE ? 'Rock' : 'Scissors';
    default:
      return endResult === LOSE ? 'Paper' : 'Rock';
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