import data, { alphabet } from './data.js';

export const getLetterPriorityScore = (letter) => {
  return alphabet.indexOf(letter) + 1
};

const lettersInCommon = [];
data
.map(r => r.trim())
.forEach(r => {
  const firstHalf = r.slice(0, r.length / 2).split('');
  const secondHalf = r.slice(r.length / 2, r.length).split('');

  for (const letter of firstHalf) {
    if (secondHalf.includes(letter)) {
      lettersInCommon.push(letter);
      return;
    }
  }
})

// console.log(
//   lettersInCommon.reduce((sum, current) => {
//     return sum + getLetterPriorityScore(current);
//   }, 0)
// );
