import input from './data.js';

const exampleInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`.split('\n').filter(Boolean);

const columnCounter = {};
input[0].split('').map((n, index) => {
  columnCounter[index + 1] = { 0: 0, 1: 0 };
});

console.log('ColumnCounter', columnCounter);


console.log('INPUT LENGTH', input.length);

for (const binary of input) {
  binary
    .split('')
    .map((n, index) => {
      const columnNumber = index + 1;
      let currentColumn = columnCounter[columnNumber];

      columnCounter[columnNumber] = {
        0: +n === 0 ? currentColumn[0] + 1 : currentColumn[0],
        1: +n === 1 ? currentColumn[1] + 1 : currentColumn[1]
      }
    })
}

const getMostCommonUse = (counterObject) => {
  return counterObject[0] > counterObject[1] ? '0' : '1';
}

const getLessCommonUse = (counterObject) => {
  return counterObject[0] < counterObject[1] ? '0' : '1';
}

const buildBinary = (type, counter, currentString = '', currentColumnNumber = 1) => {
  if (currentColumnNumber > Object.keys(counter).length) return currentString;
  const newValueAddedToString = type === 'gamma' ? getMostCommonUse(counter[currentColumnNumber]) : getLessCommonUse(counter[currentColumnNumber]);
  return buildBinary(type, counter, `${currentString}${newValueAddedToString}`, currentColumnNumber + 1)
}

const gammaRate = parseInt(buildBinary('gamma', columnCounter), 2);
console.log('Gamma Rate', gammaRate);
const epsilonRate = parseInt(buildBinary('epsilon', columnCounter), 2);
console.log('Epsion Rate', epsilonRate);
const powerConsumption = epsilonRate * gammaRate;
console.log('Power', powerConsumption);