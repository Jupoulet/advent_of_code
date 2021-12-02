import input from './dataPart1.js';
import { sumOfLargerPreviousNumber_ } from './part1.js';

let startingIndex = 0;
let rangeIndex = 3;

const arrayInput = input;

const threeRangeInput = [];
while(startingIndex + rangeIndex <= arrayInput.length) {
  const sumOfTheFollowingThree = arrayInput
  .slice(startingIndex, startingIndex + rangeIndex)
  .reduce((sum, current) => sum + current, 0);

  threeRangeInput.push(sumOfTheFollowingThree);
  startingIndex += 1;
}

console.log(sumOfLargerPreviousNumber_(threeRangeInput)); // 1737