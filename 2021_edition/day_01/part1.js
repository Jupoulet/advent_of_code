import input from './dataPart1.js';

export const sumOfLargerPreviousNumber_ = (array) => {
  let previousNumber = null;
  const sumOfLargerPreviousNumber = array.reduce((sum, current) => {
    if (previousNumber === null) {
      previousNumber = current;
      return sum;
    };
    if (current > previousNumber) {
      previousNumber = current;
      return sum + 1;
    }
    previousNumber = current;
    return sum;
  }, 0);

  return sumOfLargerPreviousNumber;
}

console.log(sumOfLargerPreviousNumber_(input)); // 1696