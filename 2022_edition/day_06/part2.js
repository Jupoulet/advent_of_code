import input, { exampleInput } from './data.js';

const NUMBERS_OF_DISTINCT_CHARS = 14;

const datastreamCopy = input;

let startingIndex = 0;
let lettersResult = '';
for (let index = 0; index < input.length; index++) {
  if (index < NUMBERS_OF_DISTINCT_CHARS) continue;
  const fourLetterToExamine = datastreamCopy.split('').splice(index - NUMBERS_OF_DISTINCT_CHARS, NUMBERS_OF_DISTINCT_CHARS);
  
  const uniqLetters = [];
  fourLetterToExamine.forEach(letter => {
    if (uniqLetters.includes(letter)) return;
    uniqLetters.push(letter);
  });

  if (uniqLetters.length === NUMBERS_OF_DISTINCT_CHARS) {
    startingIndex = index;
    lettersResult = fourLetterToExamine.join('');
    break;
  }
}

console.log('Result', startingIndex, lettersResult)