import data from './data.js';
import { getLetterPriorityScore } from './part1.js';

// Copied from YouDontNeedLodash repo https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_chunk
const chunk = (input, size) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};

const listOfRumstackByThree = chunk(data, 3);

const lettersInCommon = [];

listOfRumstackByThree.forEach((rumstackTrio) => {
  const [firstLine, secondLine, thirdLine] = rumstackTrio;
  for (const letter of firstLine) {
    if (secondLine.includes(letter) && thirdLine.includes(letter)) {
      lettersInCommon.push(getLetterPriorityScore(letter))
      return;
    }
  }
});

console.log('Result', lettersInCommon.reduce((sum, current) => sum + current, 0));