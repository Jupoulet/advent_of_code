import data from './data.js';

const matchingObject = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
  Y: 'Paper',
  X: 'Rock',
  Z: 'Scissors'
}

export const scoreObject = {
  'Rock': 1,
  'Paper': 2,
  'Scissors': 3
}



export const getScoreFromRound = (opponentPlay, myPlay) => {
 if (opponentPlay === myPlay) return 3;

 if (myPlay === 'Rock') {
  if (opponentPlay === 'Scissors') return 6;
  return 0;
 }

 if (myPlay === 'Paper') {
  if (opponentPlay === 'Rock') return 6;
  return 0;
 }

 if (myPlay === 'Scissors') {
  if (opponentPlay === 'Paper') return 6;
  return 0;
 }
}

const score = data.reduce((sum, round) => {
  const [opponentLetter, myLetter] = round;
  const opponentPlay = matchingObject[opponentLetter];
  const myPlay = matchingObject[myLetter];

  const scoreRound = getScoreFromRound(opponentPlay, myPlay);
  const scorePlay = scoreObject[myPlay];

  return sum + scoreRound + scorePlay;
  
}, 0);