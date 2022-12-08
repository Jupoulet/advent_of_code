import input, { exampleInput } from './data.js';

const datastreamCopy = input;

let startingIndex = 0;
let lettersResult = '';
for (let index = 0; index < input.length; index++) {
  if (index <= 3) continue;
  const fourLetterToExamine = datastreamCopy.split('').splice(index - 4, 4);
  
  const uniqLetters = [];
  fourLetterToExamine.forEach(letter => {
    if (uniqLetters.includes(letter)) return;
    uniqLetters.push(letter);
  });

  if (uniqLetters.length === 4) {
    startingIndex = index;
    lettersResult = fourLetterToExamine.join('');
    break;
  }
}

console.log('Result', startingIndex, lettersResult)